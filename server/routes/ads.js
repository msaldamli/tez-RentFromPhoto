const express = require('express');
const router = express.Router();
const {
  createLocation,
  getAllLocation,
  getLocationById,
  setLocationById,
  findForComment,
  numberOfLocations,
  getFindLocation,
  getUserLocation,
} = require('../controller/ad');

router.post('/createLocation', createLocation);
router.get('/', getAllLocation);
router.get('/:locationId', getLocationById);
router.put('/:locationId', setLocationById);
router.post('/getUserLocation', getUserLocation);
router.post('/findForComment', findForComment);
router.post('/numberOflocations', numberOfLocations);
router.post('/getFindLocation', getFindLocation);
module.exports = router;
