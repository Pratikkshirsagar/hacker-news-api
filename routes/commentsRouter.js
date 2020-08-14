const express = require('express');
const { getTopComments } = require('../controllers/commentsController');

const router = express.Router();

router.get('/:id', getTopComments);

module.exports = router;
