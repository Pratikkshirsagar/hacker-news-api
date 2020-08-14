const Stories = require('../models/storiesModel');
const PastStories = require('../models/pastStoriesModel');

exports.getTopStories = async (req, res) => {
  try {
    const data = await Stories.find();

    if (data.length === 0) {
      return res.status(404).json({ status: 'fail', msg: 'stories not found' });
    }

    res.status(200).json({
      status: 'success',
      count: data[0].stories.length,
      data: data[0].stories,
    });
  } catch (err) {
    res.status(400).json({ status: 'fail', msg: err });
  }
};

exports.getPastTopStories = async (req, res) => {
  try {
    const data = await PastStories.find();

    if (data.length === 0) {
      return res
        .status(404)
        .json({ status: 'fail', msg: 'past stories not found' });
    }

    res.status(200).json({
      status: 'success',
      count: data[0].stories.length,
      data: data[0].stories,
    });
  } catch (err) {
    res.status(400).json({ status: 'fail', msg: err });
  }
};
