const express = require('express');
const router = express.Router();

const { createComment, getCommentbyIlanId } = require('../controller/comment');

router.post('/createComment', createComment);
router.get('/:locationId', getCommentbyIlanId);

module.exports = router;
