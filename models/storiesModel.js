const mongoose = require('mongoose');

const storiesSchema = new mongoose.Schema({
  stories: [],
});

const Stories = mongoose.model('Stories', storiesSchema);
module.exports = Stories;
