const mongoose = require("mongoose");

const MovieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  image: { type: String, required: true },
  rating: { type: Number, default: 0 },
  category: { type: String },
  releaseDate: { type: String }
}, { timestamps: true });

module.exports = mongoose.model("Movie", MovieSchema);