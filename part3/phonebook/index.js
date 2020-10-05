require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const app = express();
const Persons = require('./models/person');

app.use(cors());
app.use(express.json());
app.use(express.static('build'));

morgan.token('host', function (req, res) {
  return req.hostname;
});

app.use(morgan('tiny'));

let persons = [
  {
    name: 'Shobhit',
    number: '12132313',
    id: 1,
  },
  {
    name: 'Brij',
    number: '1212',
    id: 2,
  },
  {
    name: 'Shrey',
    number: '12321',
    id: 3,
  },
  {
    name: 'Aditya',
    number: '12312',
    id: 4,
  },
  {
    name: 'Arun',
    number: '232',
    id: 4,
  },
  {
    name: 'Himanshu',
    number: '31231',
    id: 5,
  },
  {
    name: 'Pranav',
    number: '12123',
    id: 6,
  },
];

app.get('/api/persons', (req, res) => {
  // res.json(persons);
  Persons.find({})
    .then((persons) => {
      if (persons) {
        console.log('all good======', persons);
        res.json(persons);
      } else {
        console.log('Persons do not exist');
      }
    })
    .catch((error) => {
      console.log('Some error occurred in fetching', error.message);
    });
});

app.get('/info', (req, res) => {
  let len = persons.length;
  let dt = new Date();
  res.send(`<p>Phonebook has info for ${len} people</p><p>${dt}</p>`);
});

app.get('/api/persons/:id', (req, res) => {
  let id = Number(req.params.id);
  // const result = persons.find((person) => id === person.id);
  // if (result) {
  //   res.json(result);
  // } else {
  //   res.status(400).send('Nothing found, error 400').end();
  // }
  Persons.findById(req.param.id).then((person) => {
    res.json(person);
  });
});

app.delete('/api/persons/:id', (req, res) => {
  let id = Number(req.params.id);
  const result = persons.filter((person) => id !== person.id);
  persons = result;
  res.status(204).send(`Deleted id ${id}`).end();
});

app.post('/api/persons', (req, res) => {
  let body = req.body;
  console.log(req);
  if (!body.name || !body.number) {
    res.status(400).send('name or number cannot be empty').end();
  }
  // const duplicateName = persons
  //   .map((person) => person.name)
  //   .includes(body.name);
  // if (duplicateName) {
  //   res.status(400).send({ error: 'name must be unique' }).end();
  // } else {
  //   let new_id = Math.floor(Math.random() * 1000);
  //   body.id = new_id;
  //   persons = persons.concat(body);
  //   res.json(persons);
  // }
  const person = new Persons({
    name: body.name,
    number: body.number,
    id: Math.floor(Math.random() * 1000),
  });

  person.save().then((savedPerson) => {
    res.json(savedPerson);
  });
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
