const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  watchlist: [{ type: Number }], // TMDB film ID'lerini dizi olarak tutar
  role: { type: String, enum: ['user', 'admin'], default: 'user' }
}, { timestamps: true }); // createdAt ve updatedAt alanlarını otomatik ekler

module.exports = mongoose.model('User', userSchema);