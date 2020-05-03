import React, { useState } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' },
  ]);

  const [newName, setNewName] = useState({ name: '', number: '' });
  const [personsFiltered, setPersonsFiltered] = useState(persons);

  const handleSubmit = (event) => {
    event.preventDefault();
    let flag = false;
    let i = null;
    for (i = 0; i < persons.length; i++) {
      if (persons[i].name.toLowerCase() === newName.name.toLowerCase()) {
        flag = true;
      }
    }

    if (flag === false) {
      const toBeAdded = { name: newName.name, number: newName.number };
      const addPerson = persons.concat(toBeAdded);
      setPersons(addPerson);
    } else {
      alert(newName.name + ' is already added to phonebook');
    }
  };

  const handleChange = (event) => {
    setNewName({
      ...newName,
      [event.target.name]: event.target.value,
    });
  };

  const filterChange = (event) => {
    const f = persons.filter(
      (p) => p.name.toLowerCase().indexOf(event.target.value) > -1
    );
    console.log(f);
    setPersonsFiltered(f);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter onChange={filterChange} />
      <h3>Add a new</h3>
      <PersonForm
        name={newName.name}
        number={newName.number}
        handleChange={handleChange}
        onSubmit={handleSubmit}
      />
      <h3>Numbers</h3>
      <Persons persons={personsFiltered} />
    </div>
  );
};

export default App;
