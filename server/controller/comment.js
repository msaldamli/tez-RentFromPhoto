const comment = require('../models/comment');
const { findOne } = require('../models/comment');
const Comment = require('../models/comment');

const createComment = async (req, res) => {
  try {
    const reqComment = req.body;
    // console.log(req.body);
    const {
      userId,
      ilanId,
      lat,
      lng,
      likeLocation,
      image,
      apartment,
      apartmentRating,
      owner,
      ownerRating,
    } = reqComment;

    const commentadd = await Comment.create({
      userId,
      ilanId,
      lat,
      lng,
      likeLocation,
      image,
      apartment,
      apartmentRating,
      owner,
      ownerRating,
    });
    res.status(201).json({ commentadd, message: 'success' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

const getCommentbyIlanId = async (req, res) => {
  try {
    const { locationId } = req.params;
    // console.log(locationId + '   lokasyon id 22');
    const comments = await Comment.find({ ilanId: locationId });
    // console.log(comments);
    return res.status(200).send(comments);
  } catch (error) {
    console.log(error);
  }
};

module.exports = { createComment, getCommentbyIlanId };
