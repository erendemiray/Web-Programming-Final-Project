const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// REGISTER
router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    const user = await newUser.save();
    res.status(200).json(user);
  } catch (err) {
    console.log("KAYIT HATASI:", err); // Terminale yaz
    res.status(500).json({ hata: err.message });
  }
});

// LOGIN (Hata Dedektifli Versiyon)
router.post('/login', async (req, res) => {
  try {
    console.log("1. Login isteği geldi. Body:", req.body); // Gelen veriyi görelim

    // Kullanıcıyı bul
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      console.log("2. Kullanıcı bulunamadı!");
      return res.status(404).json("User not found!");
    }

    // Şifreyi kontrol et
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) {
      console.log("3. Şifre yanlış!");
      return res.status(400).json("Wrong password!");
    }

    // Token oluştur
    const accessToken = jwt.sign(
      { id: user._id, role: user.role }, 
      process.env.JWT_SECRET,
      { expiresIn: "5d" }
    );

    console.log("4. Giriş başarılı, Token üretildi.");
    const { password, ...info } = user._doc; 

    res.status(200).json({ ...info, accessToken });

  } catch (err) {
    // !!! İŞTE BURASI HATAYI GÖSTERECEK !!!
    console.error("❌ LOGIN SİSTEM HATASI:", err); 
    res.status(500).json({ mesaj: "Sunucu Hatası", detay: err.message });
  }
});

module.exports = router;