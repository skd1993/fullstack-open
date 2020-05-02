import React, { useState } from 'react';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-0123467' },
  ]);
  const [newName, setNewName] = useState({ name: '', number: '' });

  const hasName = (n) => {
    let i = null;
    for (i = 0; i < persons.length; i++) {
      if (persons[i].name === n) {
        return true;
      }
    }
    return false;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (hasName(newName.name) === false) {
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

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name:{' '}
          <input name='name' value={newName.name} onChange={handleChange} />
          number:{' '}
          <input name='number' value={newName.number} onChange={handleChange} />
        </div>
        <div>
          <button type='submit'>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((x) => (
        <p key={x.name}>
          {x.name} {x.number}
        </p>
      ))}
    </div>
  );
};

export default App;
