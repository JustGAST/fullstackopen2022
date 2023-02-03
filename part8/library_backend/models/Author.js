const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  born: Number,
  bookCount: Number,
})

const Author = mongoose.model('Author', authorSchema)

module.exports = Author;