const router = require('express').Router();
const User = require('../models/User'); // User modelini çağır
const bcrypt = require('bcryptjs'); // Şifreleme kütüphanesi

// KAYIT OLMA (REGISTER) İŞLEMİ
router.post('/register', async (req, res) => {
  try {
    // 1. Kullanıcıdan gelen verileri al
    const { username, email, password } = req.body;

    // 2. Şifreyi güvenlik için karmaşık hale getir (Hash)
    // "10" sayısı karmaşıklık seviyesidir (Salt)
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 3. Yeni kullanıcıyı oluştur
    const newUser = new User({
      username: username,
      email: email,
      password: hashedPassword, // Şifreli halini kaydediyoruz
    });

    // 4. Veritabanına kaydet
    const user = await newUser.save();

    // 5. Başarılı cevabı döndür
    res.status(200).json(user);

  } catch (err) {
    // Eğer hata olursa (mesela aynı kullanıcı adı varsa)
    res.status(500).json(err);
  }
});

module.exports = router;