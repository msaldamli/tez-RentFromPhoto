const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const register = async (req, res) => {
  try {
    const reqUser = JSON.parse(req.body.user);
    const { name, password, telefon, email } = reqUser;
    const userRating = 0;
    console.log(reqUser);

    // check all fields are valid
    if (!(name && password && telefon && email)) {
      res.status(400).send('All inputs are required');
    }
    console.log(name, password);

    // check user if user already exists
    const oldUser = await User.findOne({ email });
    if (oldUser) {
      console.log(email, 'already exists');
      return res.status(409).send('User already exist, please login');
    }

    // encrypt password
    // password burada güçlendirilir.
    const encryptedPassword = await bcrypt.hash(password, 10);

    // save new user to database
    const user = await User.create({
      name,
      password: encryptedPassword,
      email,
      telefon,
      userRating,
    });

    // Create token
    const token = jwt.sign(
      {
        userId: user._id,
      },
      process.env.JWT_SECRET,
      { expiresIn: '2h' }
    );

    // save token
    user.token = token;

    // return new user with success message
    return res.status(201).json({ user, message: 'success' });
  } catch (err) {
    console.log(err);
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.find().sort({ userRating: -1 });
    res.status(200).send(users);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

const earnPoint = async (req, res) => {
  try {
    const reqPoint = JSON.parse(req.body.point);
    const { userId, point } = reqPoint;
    const getUser = await User.findOne({ _id: userId });

    const rating = getUser.userRating;
    const rating2 = rating + point;

    const upgradeUser = await User.updateOne(
      { _id: userId },
      { userRating: rating2 }
    );
    console.log(upgradeUser);
  } catch (error) {
    console.log(error);
  }
};
const getOneUser = async (req, res) => {
  try {
    const { userId } = req.body;
    console.log(userId);

    const user = await User.findOne({ _id: userId });

    console.log(userId);
    console.log(user);
    user.password = '';
    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
  }
};

const login = async (req, res) => {
  try {
    console.log(req.body);
    // istek içerisindeki alanlar çekilir.
    const reqUser = JSON.parse(req.body.user);

    const { email, password } = reqUser;

    // alanlar kontrol edilir, boş ise mesaj döndürülür.
    if (!(email && password)) {
      res.status(400).send('All inputs are required');
    }

    // DB'de gönderilen email'e sahip user var mı?
    const user = await User.findOne({ email });

    const token = bcrypt.compare(password, user.password);
    // bir üst satırdaki user bulunursa, aşağıda password karşılaştırılması yapılır.
    // user var mı && varsa istek ile gönderilen ve DB'den çekilen user'ın şifrelerini karşılaştır
    if (user && token) {
      // şifreler aynı ise token oluşturulur.
      const token = jwt.sign(
        {
          userId: user._id,
          email,
        },
        process.env.JWT_SECRET,
        { expiresIn: '1m' }
      );

      // DB'den dönen user içerisine token eklenir ve user cevap olarak döndürülür.
      user.token = token;
      user.password = '';
      return res.status(200).json(user);
    }
    res.status(400).send('Invalid credentials');
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = { getUsers, register, login, earnPoint, getOneUser };
