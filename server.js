const dotenv = require('dotenv');
const express = require('express');
const connectDB = require('./config/db');

//Load env vars
dotenv.config({ path: './config/config.env' });

// Connect to database
connectDB();

const app = express();

// 1) Global Middlewares

// body parser
app.use(express.json({ limit: '10kb' }));

// Routes
app.use('/api/v1/top-stories', (req, res) => {
  res.status(200).json({ msg: 'top stories' });
});

app.use('/api/v1/comments', (req, res) => {
  res.status(200).json({ msg: 'comments' });
});

app.use('/api/v1/past-stories', (req, res) => {
  res.status(200).json({ msg: 'past stories' });
});

// 4) START SERVER
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
