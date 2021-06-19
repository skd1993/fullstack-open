const mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

const blogSchema = new mongoose.Schema({
  title: {type: String, required: true, unique: false},
  author: {type: String, required: true, unique: false},
  url: {type: String, required: true, unique: false},
  likes: {type: Number, required: true, unique: false, default: 0},
});

blogSchema.plugin(uniqueValidator);

blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model('Blog', blogSchema);
