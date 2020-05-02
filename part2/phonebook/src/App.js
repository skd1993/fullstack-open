import React, { useState } from 'react';

const App = () => {
  const [persons, setPersons] = useState([{ name: 'Arto Hellas' }]);
  const [newName, setNewName] = useState('');

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
    if (hasName(newName) === false) {
      const toBeAdded = { name: newName };
      const addPerson = persons.concat(toBeAdded);
      setPersons(addPerson);
    } else {
      alert(newName + ' is already added to phonebook');
    }
  };

  const handleChange = (event) => {
    setNewName(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name: <input value={newName} onChange={handleChange} />
        </div>
        <div>
          <button type='submit'>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((x) => (
        <p>{x.name}</p>
      ))}
    </div>
  );
};

export default App;
