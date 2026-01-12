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
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(404).json("User not found!");

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).json("Wrong password!");

    const accessToken = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT_SECRET,
      { expiresIn: "5d" }
    );

    // Admin durumuna göre dinamik mesaj
    const welcomeMessage = user.isAdmin 
      ? `Yönetici Paneline Hoş Geldiniz, Sayın Admin ${user.username}. Tüm yetkiler aktif.` 
      : `Giriş başarılı! Hoş geldin, ${user.username}`;

    const { password, ...info } = user._doc;

    res.status(200).json({
      ...info,
      message: welcomeMessage,
      accessToken,
      isAdmin: user.isAdmin,
      username: user.username
    });

  } catch (err) {
    res.status(500).json({ mesaj: "Sunucu Hatası", detay: err.message });
  }
});


module.exports = router;