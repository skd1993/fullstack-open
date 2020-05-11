import React from 'react';

const Persons = ({ persons, onDelete }) => {

  return (
    <div>
      {persons.map((x) => (
        <p key={x.name}>
          {x.name} {x.number}
          <button onClick={() => onDelete(x)}>delete</button>
        </p>
      ))}
    </div>
  );
};

export default Persons;
