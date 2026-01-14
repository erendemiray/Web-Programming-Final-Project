const mongoose = require("mongoose");

const AdminSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  userType: { type: String, default: "admin" }
}, { timestamps: true });

module.exports = mongoose.models.Admin || mongoose.model("Admin", AdminSchema);