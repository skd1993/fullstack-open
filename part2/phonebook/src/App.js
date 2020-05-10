import React, { useState, useEffect } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import server from './services/server';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState({ name: '', number: '' });
  const [filterVal, setFilterVal] = useState('');

  useEffect(() => {
    server.getAll().then((personsData) => {
      console.log(personsData);
      setPersons(personsData);
    });
  }, []);

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
      const idx = persons[persons.length - 1].id + 1;
      const toBeAdded = { name: newName.name, number: newName.number, id: idx };
      server.create(toBeAdded).then((response) => {
        const addPerson = persons.concat(toBeAdded);
        setPersons(addPerson);
        console.log(response);
      });
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
    setFilterVal(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={filterVal} onChange={filterChange} />
      <h3>Add a new</h3>
      <PersonForm
        name={newName.name}
        number={newName.number}
        handleChange={handleChange}
        onSubmit={handleSubmit}
      />
      <h3>Numbers</h3>
      <Persons persons={persons} toFilter={filterVal} />
    </div>
  );
};

export default App;
