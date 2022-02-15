import React, { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
import { connect } from 'react-redux';
import { setFilter } from '../redux/actions/actions';

const Filter = (props) => {
  // const dispatch = useDispatch();
  // const filter = useSelector((state) => state.filter);
  const filter = props.filter;
  const [filterVal, setFilterVal] = useState(filter);

  const style = {
    paddingTop: 10,
    paddingBottom: 10,
  };

  const filterChangeHandler = (event) => {
    const toFilter = event.target.value;
    setFilterVal(toFilter);
    // dispatch(setFilter(toFilter));
    props.setFilter(toFilter);
  };

  return (
    <div style={style}>
      Filter:{' '}
      <input type='text' value={filterVal} onChange={filterChangeHandler} />
    </div>
  );
};

const mapDispatchToProps = { setFilter };

const mapStateToProps = (state) => {
  return {
    filter: state.filter,
  };
};

const CFilter = connect(mapStateToProps, mapDispatchToProps)(Filter);

export default CFilter;
