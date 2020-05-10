import React from 'react';

const Persons = ({ persons, toFilter }) => {
  let filteredPersons = persons;

  if (toFilter.length > 0) {
    filteredPersons = persons.filter(
      (p) => p.name.toLowerCase().indexOf(toFilter) > -1
    );
  }

  return (
    <div>
      {filteredPersons.map((x) => (
        <p key={x.name}>
          {x.name} {x.number}
        </p>
      ))}
    </div>
  );
};

export default Persons;
