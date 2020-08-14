const axios = require('axios');
const Stories = require('../models/storiesModel');
const PastStories = require('../models/pastStoriesModel');

async function getTopStories() {
  try {
    console.log('Invoke');
    const { data } = await axios.get(
      `https://hacker-news.firebaseio.com/v0/topstories.json`
    );

    getStoryData(data);
  } catch (err) {
    console.log(err);
  }
}

async function getStoryData(idArry) {
  try {
    const stories = idArry.map(async (id) => {
      const { data } = await axios.get(
        `https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`
      );

      return data;
    });

    Promise.all(stories)
      .then((data) => {
        console.log(data);
        getTopStoriesSorted(data);
      })
      .catch((err) => {
        console.log(err, '****');
      });
  } catch (err) {
    console.log(err);
  }
}

async function getTopStoriesSorted(storiesArr) {
  try {
    const sortedArr = storiesArr.sort((a, b) => b.score - a.score);
    const topTenStories = sortedArr.slice(0, 10);
    const filterStory = topTenStories.map((story) => {
      console.log(story.id);
      delete story.descendants;
      delete story.kids;
      delete story.id;
      delete story.type;
      return story;
    });

    const data = await Stories.find();

    if (data.length === 0) {
      await Stories.create({ stories: filterStory });
      console.log('DATA BASE CREATED');
    } else {
      await Stories.updateOne({ stories: filterStory });

      const pastData = await PastStories.find();

      console.log(pastData);

      if (pastData.length === 0) {
        await PastStories.create({ stories: data[0].stories });
        console.log('PAST DB CREATED');
      } else {
        await PastStories.updateOne({ stories: data[0].stories });
        console.log('PAST DB UPDATE');
      }
      console.log('DB UPDATE');
    }
  } catch (err) {
    console.log(err);
  }
}

module.exports = getTopStories;
