import React from 'react';

const PersonForm = (props) => {
  const { name, number, handleChange, onSubmit } = props;

  return (
    <form onSubmit={onSubmit}>
      <div>
        name:
        <input name='name' value={name} onChange={handleChange} />
        number:
        <input name='number' value={number} onChange={handleChange} />
      </div>
      <div>
        <button type='submit'>add</button>
      </div>
    </form>
  );
};

export default PersonForm;
