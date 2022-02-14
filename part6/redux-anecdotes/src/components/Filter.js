import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilter } from '../redux/actions/actions';

const Filter = (props) => {
  const dispatch = useDispatch();
  const filter = useSelector((state) => state.filter);
  const [filterVal, setFilterVal] = useState(filter);

  const style = {
    paddingTop: 10,
    paddingBottom: 10,
  };

  const filterChangeHandler = (event) => {
    const toFilter = event.target.value;
    setFilterVal(toFilter);
    dispatch(setFilter(toFilter));
  };

  return (
    <div style={style}>
      Filter: <input type='text' value={filterVal} onChange={filterChangeHandler} />
    </div>
  );
};

export default Filter;
