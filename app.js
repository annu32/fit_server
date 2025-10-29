const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const web = require('./routes/web')
const cors = require('cors');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());



app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true,    // allow credentials (cookies)
    })
);



app.use('/api',web)

// Database Connection
mongoose.connect(process.env.LIVE_URL)
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.error(err));


app.listen(process.env.PORT, 
  () =>
     console.log(`Server running on port ${PORT}`));