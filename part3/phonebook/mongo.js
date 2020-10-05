const mongoose = require('mongoose');
require('dotenv').config();
// if (process.argv.length < 5) {
//   console.log('please provide all arguments');
//   process.exit(1);
// }

// const password = process.argv[2];
// const name = process.argv[3];
// const number = process.argv[4];

const url = process.env.MONGODB_URI;

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
  id: Number,
});

const Person = mongoose.model('Persons', personSchema);

// const personToAdd = new Person({
//   name: name,
//   number: number,
//   id: Math.floor(Math.random() * 1000),
// });

// personToAdd.save().then((result) => {
//   console.log(`added ${name} number ${number} to phonebook `);
//   mongoose.connection.close();
// });

Person.find({})
  .then((persons) => {
    if (persons) {
      console.log('all good======', persons);
    } else {
      console.log('Persons do not exist');
    }
  })
  .catch((error) => {
    console.log('Some error occurred in fetching', error.message);
  });
