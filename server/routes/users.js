const express = require('express');
const router = express.Router();
const {
  getUsers,
  register,
  login,
  earnPoint,
  getOneUser,
} = require('../controller/user');

router.post('/register', register);
router.post('/login', login);
router.get('/', getUsers);
router.post('/earnPoint', earnPoint);
router.post('/getOneUser', getOneUser);

module.exports = router;
