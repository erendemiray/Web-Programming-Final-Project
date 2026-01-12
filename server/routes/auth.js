const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// REGISTER
router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    
    // Şifreyi güvenli hale getir
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(200).json({ message: "Registration successful" });
  } catch (err) {
    res.status(500).json({ hata: err.message });
  }
});

// LOGIN (Conflict Çözülmüş Versiyon)
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Kullanıcıyı bul (Tek model üzerinden kontrol)
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(404).json("Account not found!");
    }

    // 2. Şifre kontrolü
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json("Wrong password!");
    }

    // 3. Token Üretimi (isAdmin veya role bilgisini içine gömüyoruz)
    const accessToken = jwt.sign(
      { id: user._id, isAdmin: user.role === "admin" }, 
      process.env.JWT_SECRET || "default_secret",
      { expiresIn: "5d" }
    );

    // 4. Admin durumuna göre dinamik mesaj oluşturma
    const isAdmin = user.role === "admin";
    const welcomeMessage = isAdmin 
      ? `Yönetici Paneline Hoş Geldiniz, Sayın Admin ${user.username}. Tüm yetkiler aktif.` 
      : `Giriş başarılı! Hoş geldin, ${user.username}`;

    // 5. Şifreyi gizleyip veriyi gönder
    const { password: userPassword, ...otherInfo } = user._doc;

    res.status(200).json({
      ...otherInfo,
      message: welcomeMessage,
      accessToken,
      isAdmin: isAdmin,
      username: user.username
    });

  } catch (err) {
    console.error("Login hatası detay:", err);
    res.status(500).json({ message: "Server error", detail: err.message });
  }
});

module.exports = router;