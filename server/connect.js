/*
*
*   BU DOSYA KULLANILMIYOR !!!
*
* */


const mongoose = require('mongoose');
const config = require('config');

const mongoUri = config.get('MONGO_URI2');

console.log(mongoUri);

const connect = async () => {
  try {
    await mongoose.connect(mongoUri, {autoIndex: false});
    console.log('mongodb connected');
  } catch (err) {
    console.log(err);
    console.log(err.message);
  }
};

module.exports = connect;
