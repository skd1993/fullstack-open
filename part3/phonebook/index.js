const express = require('express');
const morgan = require('morgan');
const app = express();

app.use(express.json());

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
  res.json(persons);
});

app.get('/info', (req, res) => {
  let len = persons.length;
  let dt = new Date();
  res.send(`<p>Phonebook has info for ${len} people</p><p>${dt}</p>`);
});

app.get('/api/persons/:id', (req, res) => {
  let id = Number(req.params.id);
  const result = persons.find((person) => id === person.id);
  if (result) {
    res.json(result);
  } else {
    res.status(400).send('Nothing found, error 400').end();
  }
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
  const duplicateName = persons
    .map((person) => person.name)
    .includes(body.name);
  if (duplicateName) {
    res.status(400).send({ error: 'name must be unique' }).end();
  } else {
    let new_id = Math.floor(Math.random() * 1000);
    body.id = new_id;
    persons = persons.concat(body);
    res.json(persons);
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
