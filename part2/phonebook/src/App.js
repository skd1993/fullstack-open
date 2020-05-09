import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [personsFiltered, setPersonsFiltered] = useState(persons);
  const [newName, setNewName] = useState({ name: '', number: '' });

  useEffect(() => {
    axios.get('http://localhost:3001/persons').then((response) => {
      console.log(response.data);
      setPersons(response.data);
      setPersonsFiltered(response.data);
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
