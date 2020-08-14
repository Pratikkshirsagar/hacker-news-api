const mongoose = require('mongoose');

const pastStoriesSchema = new mongoose.Schema({
  stories: [],
});

const PastStories = mongoose.model('PastStories', pastStoriesSchema);
module.exports = PastStories;
