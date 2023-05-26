const mongoose = require('mongoose');

const user = new mongoose.Schema(
  {
    name: { type: String, require: true },
    password: { type: String, require: true },
    telefon: { type: String, require: true },
    email: { type: String, require: true, unique: true },
    token: { type: String },
    userRating: { type: Number, require: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', user);
