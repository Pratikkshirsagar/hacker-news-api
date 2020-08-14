const express = require('express');
const {
  getTopStories,
  getPastTopStories,
} = require('../controllers/storiesController');

const router = express.Router();

router.get('/top-stories', getTopStories);
router.get('/past-stories', getPastTopStories);

module.exports = router;
