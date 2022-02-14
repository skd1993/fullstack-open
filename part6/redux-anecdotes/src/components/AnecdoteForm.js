import React, { useRef } from 'react';
import { connect } from 'react-redux';
// import { useDispatch } from 'react-redux';
import { newAnecdote } from '../redux/actions/actions';

const AnecdoteForm = (props) => {
  // const dispatch = useDispatch();
  const inpRef = useRef();

  const create = async (event) => {
    event.preventDefault();
    const toCreate = inpRef.current.value;
    // dispatch(newAnecdote(toCreate));
    props.newAnecdote(toCreate);
    inpRef.current.value = '';
  };

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={create}>
        <div>
          <input ref={inpRef} />
        </div>
        <button>create</button>
      </form>
    </>
  );
};

const mapDispatchToProps = { newAnecdote };

const CAnecdoteForm = connect(null, mapDispatchToProps)(AnecdoteForm);

export default CAnecdoteForm;
