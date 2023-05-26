const mongoose = require('mongoose');

const comment = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.ObjectId, ref: 'User' },
    ilanId: { type: String, require: true },
    lat: { type: String },
    lng: { type: String },
    likeLocation: { type: String },
    image: { type: String, require: true },
    apartment: { type: String },
    apartmentRating: { type: String },
    owner: { type: String },
    ownerRating: { type: String },
  },
  { timestamps: true }
);
module.exports = mongoose.model('Comment', comment);
