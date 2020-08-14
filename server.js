const dotenv = require('dotenv');
const express = require('express');
const connectDB = require('./config/db');
const morgan = require('morgan');
const getTopStories = require('./utils/topStoriesHelper');
const storiesRouter = require('./routes/storiesRouter');
const commentsRouter = require('./routes/commentsRouter');
//Load env vars
dotenv.config({ path: './config/config.env' });

// Connect to database
connectDB();

const app = express();

// invoke the initial function
getTopStories();

//Global Middlewares

// body parser
app.use(express.json({ limit: '10kb' }));

// loging the api
app.use(morgan('dev'));

// Routes
app.use('/api/v1', storiesRouter);

app.use('/api/v1/comments', commentsRouter);

// handlin unknown routes
app.all('*', (req, res) => {
  res.status(404).json({ msg: 'Route not found' });
});

// START SERVER
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
