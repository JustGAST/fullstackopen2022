const mongoose = require('mongoose');
require('dotenv').config()

const MONGODB_URL = process.env.MONGODB_URL;

mongoose.set('strictQuery', false)
const connect = () => {
  mongoose.connect(MONGODB_URL)
    .then(() => {
      console.log('Connected to MongoDB');
    })
    .catch((error) => {
      console.error('Error connecting to MongoDB', error);
    });
};

module.exports = {connect}