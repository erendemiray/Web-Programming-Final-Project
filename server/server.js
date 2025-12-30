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
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));