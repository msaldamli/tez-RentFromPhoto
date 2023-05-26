const mongoose = require('mongoose');

const ad = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.ObjectId, ref: 'User' },
    lat: { type: String, required: true, trim: true },
    lng: { type: String, required: true, trim: true },
    phone: { type: String, trim: true },
    image: { type: String, require: true },
    adres: { type: String, required: false },
    apartment: { type: String, required: false },
    owner: { type: String, required: false },
    apartmentRating: { type: Number, required: false },
    ownerRating: { type: Number, required: false },
    likeLocation: { type: String, required: false },
    postType: { type: String, required: false },
    postRating: { type: Number, required: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Ad', ad);
