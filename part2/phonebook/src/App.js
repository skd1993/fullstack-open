import React, { useState, useEffect } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import server from './services/server';

const Notification = (props) => {
  if(props.msg === null) {
    return null;
  }
  const type = props.msg.startsWith('The') ? 'red' : 'green';
  const notificationStyle = {
    color: type,
    backgroundColor: '#D3D3D3',
    width: '100%',
    fontSize: 20,
    border: `2px solid ${type}`,
    borderRadius: 5
  }
  return (
    <div style={notificationStyle}>
      <p>{props.msg}</p>
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState({ name: '', number: '' });
  const [filterVal, setFilterVal] = useState('');
  const [statusMsg, setStatusMsg] = useState(null);

  useEffect(() => {
    server.getAll().then((personsData) => {
      setPersons(personsData);
    });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    let idx = persons.length === 0 ? 1 : persons[persons.length - 1].id + 1;
    const isExisting = persons.findIndex(
      (p) => p.name.toLowerCase() === newName.name.toLowerCase()
    );
    if (isExisting > -1) {
      if (
        window.confirm(
          `${persons[isExisting].name} is already added to the phonebook, replace the old number with a new one?`
        )
      ) {
        server
          .update(persons[isExisting].id, {
            ...persons[isExisting],
            number: newName.number,
          })
          .then((response) => {
            const newPersons = [...persons];
            newPersons[isExisting].number = newName.number;
            setPersons(newPersons);
            setStatusMsg(`Added ${newName.name}`);
            setTimeout(() => { 
              setStatusMsg(null);
            }, 3000);
          })
          .catch((err) => console.log(err));
      }
    } else {
      server
        .create({ name: newName.name, number: newName.number, id: idx })
        .then((response) => {
          setPersons(
            persons.concat({
              name: newName.name,
              number: newName.number,
              id: idx,
            })
          );
          setStatusMsg(`Added ${newName.name}`);
          setTimeout(() => { 
            setStatusMsg(null);
          }, 3000);
        });
    }
  };

  const handleChange = (event) => {
    setNewName({
      ...newName,
      [event.target.name]: event.target.value,
    });
  };

  const filterChange = (event) => {
    const toFilter = event.target.value;
    setFilterVal(toFilter);
  };

  const confirmDelete = (x) => {
    const res = window.confirm(`Delete ${x.name}?`);
    if (res === true) {
      server.remove(x.id).then(response => {
        const f = persons.filter((p) => p.id !== x.id);
        setPersons(f);
      })
      .catch (err => {
        console.log(err);
        setStatusMsg(`The information of ${x.name} has already been removed from the server`);
        setTimeout(() => { 
          setStatusMsg(null);
        }, 3000)
      });
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification msg={statusMsg}/>
      <Filter onChange={filterChange} />
      <h3>Add a new</h3>
      <PersonForm
        name={newName.name}
        number={newName.number}
        handleChange={handleChange}
        onSubmit={handleSubmit}
      />
      <h3>Numbers</h3>
      <Persons
        persons={persons.filter(
          (p) => p.name.toLowerCase().indexOf(filterVal) > -1
        )}
        onDelete={confirmDelete}
      />
    </div>
  );
};

export default App;
