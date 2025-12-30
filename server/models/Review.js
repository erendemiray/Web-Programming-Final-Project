const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  movieId: { type: Number, required: true }, // TMDB'den gelen film ID'si
  movieTitle: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 10 },
  content: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Review', reviewSchema);