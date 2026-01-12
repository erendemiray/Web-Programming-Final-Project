const router = require('express').Router();
const User = require('../models/User');
const Admin = require('../models/admin');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// REGISTER - Sorun yok dediğin kısım, dokunmadık.
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

    await newUser.save();
    res.status(200).json({ message: "Registration successful" });
  } catch (err) {
    res.status(500).json({ hata: err.message });
  }
});

// LOGIN - Sadece User eşleşmesini tamir eden kısım
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. ADIM: Admin Kontrolü (Burası zaten çalışıyor)
    let account = await Admin.findOne({ email: email });
    let type = "admin";

    // 2. ADIM: User Kontrolü (Hata buradaydı, sağlamlaştırdık)
    if (!account) {
      account = await User.findOne({ email: email });
      type = "user";
    }

    // 3. ADIM: Hesap kontrolü
    if (!account) {
      return res.status(404).json("Account not found!");
    }

    // 4. ADIM: Şifre Eşleştirme (Bcrypt karşılaştırması)
    // DB'deki hashlenmiş şifre ile inputtan gelen düz şifreyi kıyaslar
    const isPasswordCorrect = await bcrypt.compare(password, account.password);
    
    if (!isPasswordCorrect) {
      return res.status(400).json("Wrong password!");
    }

    // 5. ADIM: Token Üretimi
    const accessToken = jwt.sign(
      { id: account._id, userType: type },
      process.env.JWT_SECRET || "default_secret",
      { expiresIn: "5d" }
    );

    // 6. ADIM: Veriyi Düzeltme ve Gönderme
    // Şifreyi objeden çıkarıp geri kalan her şeyi gönderiyoruz
    const userObject = account.toObject();
    const { password: userPassword, ...otherInfo } = userObject;

    res.status(200).json({
      ...otherInfo,
      accessToken,
      userType: type,
      username: account.username
    });

  } catch (err) {
    console.error("Login hatası detay:", err);
    res.status(500).json({ message: "Server error", detail: err.message });
  }
});

module.exports = router;