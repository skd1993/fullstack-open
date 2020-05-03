import React from 'react';

const Persons = (props) => {
  return (
    <div>
      {props.persons.map((x) => (
        <p key={x.name}>
          {x.name} {x.number}
        </p>
      ))}
    </div>
  );
};

export default Persons;
