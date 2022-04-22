const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
    minlength: 2,
  },
  published: {
    type: Number,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Author',
  },
  genres: [{ type: String, required: true }],
});

const authorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    minlength: 4,
  },
  born: {
    type: Number,
  },
  bookCount: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Book',
    },
  ],
});

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 6,
  },
  token: {
    type: String,
  },
  passwordHash: {
    type: String,
    required: true,
  },
  favoriteGenre: {
    type: String,
  },
});

const Book = mongoose.model('Book', bookSchema);
const Author = mongoose.model('Author', authorSchema);
const User = mongoose.model('User', userSchema);

module.exports = { Book, Author, User };
