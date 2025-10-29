const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const web = require('./routes/web')
const cors = require('cors');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Define the allowed origins for CORS
const allowedOrigins = [
    // 1. Your Netlify Frontend URL
    "https://fitclient1.netlify.app", 
    // 2. Your Local Development URL (default for Vite/React)
    "http://localhost:5173",
    // 3. YOUR RENDER BACKEND URL: Add the official domain Render assigns you here 
    //    (e.g., "https://your-backend-name.onrender.com"). This allows the backend to talk to itself.
    //    *** IMPORTANT: Remember to update and redeploy this file after Render gives you the final URL. ***
];

// Middleware
app.use(express.json());

// CORS Configuration
app.use(
    cors({
        origin: (origin, callback) => {
            // Allow requests with no origin (like mobile apps or postman)
            if (!origin) return callback(null, true); 
            
            if (allowedOrigins.indexOf(origin) === -1) {
                const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
                return callback(new Error(msg), false);
            }
            return callback(null, true);
        },
        credentials: true,     // allow cookies/auth headers
    })
);


app.use('/api', web)

// Database Connection
mongoose.connect(process.env.LIVE_URL)
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.error('MongoDB connection error:', err));


app.listen(PORT, // Use PORT variable (5000 or process.env.PORT from Render)
  () =>
      console.log(`Server running on port ${PORT}`));
