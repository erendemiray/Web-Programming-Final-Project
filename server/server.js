const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Import routes
const authRoute = require('./routes/auth'); 

dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Route Middlewares
// Redirects requests to /api/auth to the authRoute file
app.use('/api/auth', authRoute); 

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB Atlas connection successful!'))
  .catch((err) => console.error('❌ Connection error:', err));

// Start Server
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