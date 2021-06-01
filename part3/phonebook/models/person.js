const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

require('dotenv').config();

// mongo code
const url = process.env.MONGODB_URI;

console.log('Connecting to ', url);

mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then((result) => {
    console.log('Connected to MongoDb');
  })
  .catch((error) => {
    console.log('Error connecting to MongoDb', error.message);
  });

const personSchema = new mongoose.Schema({
  name: {type: String, required: true, unique: true, minlength: 3},
  number: {type: String, required: true, unique: false, minlength: 8},
  id: Number,
});

personSchema.plugin(uniqueValidator);

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model('Persons', personSchema);
// end mongo code
