import React, { useState } from 'react';

const App = () => {
  const [persons, setPersons] = useState([{ name: 'Arto Hellas' }]);
  const [newName, setNewName] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const toBeAdded = { name: newName };
    const addPerson = persons.concat(toBeAdded);
    setPersons(addPerson);
  };

  const handleChange = (event) => {
    setNewName(event.target.value);
  };

  return (
    <div>
      <div>debug: {newName}</div>
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
