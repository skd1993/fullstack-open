const mongoose = require('mongoose');

if (process.argv.length < 5) {
  console.log('please provide all arguments');
  process.exit(1);
}

const password = process.argv[2];
const name = process.argv[3];
const number = process.argv[4];

const url = `mongodb+srv://fullstack:${password}@cluster0.nswhe.mongodb.net/persons?retryWrites=true&w=majority`;

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

const note = new Person({
  name: name,
  number: number,
  id: Math.floor(Math.random() * 1000),
});

note.save().then((result) => {
  console.log(`added ${name} number ${number} to phonebook `);
  mongoose.connection.close();
});
