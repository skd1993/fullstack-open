import React from 'react';

const Filter = (props) => {
  return (
    <div>
      filter shown with
      <input name='filter' onChange={props.onChange} />
    </div>
  );
}

export default Filter;
