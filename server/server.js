const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// --- MODELS ---
const Movie = require("./models/movie");
const Admin = require("./models/admin");
const User = require("./models/User"); // EKSİK OLAN BUYDU: User modelini ekledik

// --- ROUTES ---
const authRoute = require('./routes/auth'); 

dotenv.config();
const app = express();

// --- MIDDLEWARES ---
app.use(cors());
app.use(express.json());

// Auth (Register & Login)
app.use('/api/auth', authRoute); 

// --- MONGODB CONNECTION ---
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB Atlas connection successful!');
    createFirstAdmin(); 
    seedMovies();      
  })
  .catch((err) => console.error('❌ Connection error:', err));

// --- GÜVENLİK: Admin Token Doğrulama Middleware ---
const verifyAdminToken = (req, res, next) => {
  const authHeader = req.headers.token;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) return res.status(403).json("Token is not valid!");
      if (user && user.userType === "admin") {
        next();
      } else {
        res.status(403).json("Only admins can perform this action!");
      }
    });
  } else {
    return res.status(401).json("You are not authenticated!");
  }
};

// --- MOVIE ROUTES ---

// Tüm filmleri getir
app.get("/api/movies", async (req, res) => {
  try {
    const movies = await Movie.find().sort({ createdAt: -1 });
    res.status(200).json(movies);
  } catch (err) {
    res.status(500).json({ message: "Could not fetch movies", error: err });
  }
});

// Yeni film ekle (Admin Korumalı)
app.post("/api/movies/add", verifyAdminToken, async (req, res) => {
  try {
    const newMovie = new Movie({
      ...req.body,
      rating: Number(req.body.rating)
    });
    const savedMovie = await newMovie.save();
    console.log("✅ Movie saved:", savedMovie.title);
    res.status(201).json(savedMovie);
  } catch (err) {
    console.error("❌ Save Error:", err);
    res.status(500).json({ message: "Failed to save movie", detail: err.message });
  }
});

// --- SEED FUNCTIONS ---

const createFirstAdmin = async () => {
  try {
    const adminCount = await Admin.countDocuments();
    if (adminCount === 0) {
      const hashedPassword = await bcrypt.hash("123456", 10);
      const firstAdmin = new Admin({
        username: "AdminEsma",
        email: "esma@admin.com",
        password: hashedPassword,
        userType: "admin"
      });
      await firstAdmin.save();
      console.log("👤 Default admin created: esma@admin.com / 123456");
    }
  } catch (err) {
    console.error("Admin Seed Error:", err);
  }
};


const Comment = require("./models/comment");

// Belirli bir filme ait yorumları getir
app.get("/api/comments/:movieId", async (req, res) => {
  try {
    const comments = await Comment.find({ movieId: req.params.movieId }).sort({ createdAt: -1 });
    res.status(200).json(comments);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Yorum ekle
app.post("/api/comments/add", async (req, res) => {
  try {
    const newComment = new Comment(req.body);
    const savedComment = await newComment.save();
    res.status(201).json(savedComment);
  } catch (err) {
    res.status(500).json(err);
  }
});

// --- START SERVER ---
const PORT = process.env.PORT || 5000;

const Movie = require("./models/movie");

const seedMovies = async () => {
  const count = await Movie.countDocuments();
  if (count === 0) {
    await Movie.create([
      { title: "Inception", rating: 8.8, image: "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_.jpg", category: "Sci-Fi" },
      { title: "The Dark Knight", rating: 9.0, image: "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_.jpg", category: "Action" },
      { title: "Interstellar", rating: 8.7, image: "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/gEU2QniE6EJBQwvBv2fQ1oI6vCW.jpg", category: "Sci-Fi" },
      { title: "Pulp Fiction", rating: 8.9, image: "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/d5iIl9h9btztp90YjYVcbzx6P5h.jpg", category: "Crime" },
      { title: "The Godfather", rating: 9.2, image: "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/3bhkrj9PecneUfsMvS0s36G0EBK.jpg", category: "Drama" }
    ]);
    console.log("Filmler veritabanına eklendi!");
  }
};
seedMovies();
const verifyAdmin = (req, res, next) => {
  // Burada normalde Token doğrulaması yapılır ama şimdilik mantığı kuralım
  // Eğer giriş yapan kullanıcı admin değilse hata döndür
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(403).json("Bu işlem için admin yetkiniz yok!");
  }
};

// Film ekleme route'una bu korumayı ekle:
app.post("/api/movies/add", verifyAdmin, async (req, res) => {
  // ... film ekleme kodları
});
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));