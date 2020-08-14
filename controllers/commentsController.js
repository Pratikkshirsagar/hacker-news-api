const axios = require('axios');

// filter the to ten comments
exports.getTopComments = async (req, res) => {
  try {
    const storyId = req.params.id;

    const { data } = await axios.get(
      `https://hacker-news.firebaseio.com/v0/item/${storyId}.json`
    );

    const parentCommentsId = data.kids;

    let commentsData;

    if (parentCommentsId) {
      commentsData = parentCommentsId.map(async (commentId) => {
        const { data } = await axios.get(
          `https://hacker-news.firebaseio.com/v0/item/${commentId}.json`
        );
        return data;
      });
    } else {
      return res
        .status(404)
        .json({ status: 'error', msg: 'Comments not found' });
    }

    Promise.all(commentsData)
      .then(async (data) => {
        const result = await filterComments(data);

        if (!result) {
          return res
            .status(404)
            .json({ status: 'fail', msg: 'Comments not found' });
        }

        res
          .status(200)
          .json({ status: 'success', count: result.length, data: result });
      })
      .catch((err) => {
        res.status(400).json({ status: 'fail', msg: err });
      });
  } catch (err) {
    res.status(400).json({ status: 'fail', msg: err });
  }
};

// filter the comments
async function filterComments(commentsArr) {
  try {
    const filtersComments = commentsArr.filter((comment) => {
      if (comment.kids && comment.kids !== undefined) {
        return comment;
      }
    });

    const sortedComments = filtersComments.sort(
      (a, b) => b.kids.length - a.kids.length
    );

    const remainingComments = commentsArr.filter(
      (comment) => !comment.hasOwnProperty('kids')
    );

    let finalSortedComments = [];

    if (sortedComments.length <= 10 && remainingComments.length > 1) {
      const sortedArrayLength = sortedComments.length;

      const arrayLength = 10 - sortedArrayLength;

      if (remainingComments.length <= arrayLength) {
        finalSortedComments.push(sortedComments.concat(remainingComments));
      } else {
        const remainingAddedArray = remainingComments.slice(0, arrayLength);
        finalSortedComments.push(sortedComments.concat(remainingAddedArray));
      }
    } else {
      finalSortedComments.push(sortedComments.slice(0, 10));
    }

    return finalSortedComments[0];
  } catch (err) {
    res.status(400).json({ status: 'fail', msg: err });
  }
}
