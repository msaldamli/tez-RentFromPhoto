const { get } = require('mongoose');
const Ad = require('../models/ad');
// const Comment = require('../models/comment');

const createLocation = async (req, res) => {
  try {
    // console.log(req.body);

    const reqAd = req.body;

    const {
      userId,
      lat,
      lng,
      phone,
      image,
      adres,
      apartment,
      likeLocation,
      owner,
      apartmentRating,
      ownerRating,
      postType,
    } = reqAd;
    const postRating = apartmentRating;
    const ratingCount = 1;
    if (!(userId && image && lat && lng)) {
      return res.status(400).send('All inputs are required');
    }

    // const oldAd = await Ad.findOne({ lat: lat, lng: lng });
    // if (oldAd) {
    //   // const sendAd = JSON.stringify(oldAd);
    //   return res.status(200).json({ status: 200, message: oldAd });
    // }

    const ad = await Ad.create({
      userId,
      lat,
      lng,
      phone,
      image,
      adres,
      apartment,
      likeLocation,
      owner,
      apartmentRating,
      ownerRating,
      postType,
      postRating,
      ratingCount,
    });
    res.status(201).json({ ad, message: 'success' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};
const getFindLocation = async (req, res) => {
  try {
    // console.log(req.body);
    // console.log('1111111');
    const { lat, lng } = req.body;
    const locations = await Ad.find({
      lat: {
        $gt: Number(lat) - 0.02,
        $lt: Number(lat) + 0.02,
      },
      lng: {
        $gt: Number(lng) - 0.02,
        $lt: Number(lng) + 0.02,
      },
    });

    return res.status(200).send(locations);
  } catch (error) {
    console.log(error);
  }
};

const getAllLocation = async (req, res) => {
  try {
    const locations = await Ad.find();
    return res.status(200).send(locations);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

const getLocationById = async (req, res) => {
  try {
    const { locationId } = req.params;
    // console.log(locationId + '   lokasyon id ');
    const location = await Ad.findOne({ _id: locationId });
    return res.status(200).send(location);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

const setLocationById = async (req, res) => {
  try {
    const { locationId } = req.params;
    const { postRating } = req.body;
    const numberRating = Number(postRating);
    // console.log(locationId);
    // console.log(req.body);
    // console.log(postRating);
    const getRating = await Ad.findOne({ _id: locationId });
    // console.log(getRating + '1000000000');
    const getRating2 = getRating.postRating;
    const count = getRating.ratingCount;
    console.log(count);
    count = count + 1;

    const rating = (Number(getRating2) * 5 + Number(postRating)) / 6;
    const ratingtoFixed = rating.toFixed(2);
    console.log(rating);
    const location = await Ad.updateOne(
      { _id: locationId },
      { postRating: ratingtoFixed, ratingCount: count },
      { new: true }
    );

    return res.status(200).send(location);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};
// const { locationId } = req.params;
// const { adres } = req.body;
// console.log(locationId);
// console.log(adres);
// const location = await Ad.updateOne(
//   { locationId },
//   { adres: adres },
//   { new: true }
// );
// return res.status(200).send(location);

const findForComment = async (req, res) => {
  try {
    const location = req.body;

    const { lat, lng } = location;
    const sendLocation = await Ad.findOne({ lat: lat, lng: lng });

    res.status(200).send(sendLocation);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};
const numberOfLocations = async (req, res) => {
  try {
    const { userId } = req.body;
    const locations = await Ad.find({ userId: userId });
    res.status(200).send(locations);
  } catch (error) {
    console.log(error);
  }
};
const getUserLocation = async (req, res) => {
  try {
    const { userId } = req.body;
    // console.log(userId);
    const locations = await Ad.find({ userId: userId });
    res.status(200).send(locations);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  // createComents,
  createLocation,
  getAllLocation,
  getLocationById,
  setLocationById,
  findForComment,
  numberOfLocations,
  getFindLocation,
  getUserLocation,
};
