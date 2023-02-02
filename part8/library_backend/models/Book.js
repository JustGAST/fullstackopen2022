const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  published: {
    type: Number,
    required: true,
  },
  author: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Author',
  },
  genres: [String]
})

const Book = mongoose.model('Book', bookSchema)

module.exports = Book