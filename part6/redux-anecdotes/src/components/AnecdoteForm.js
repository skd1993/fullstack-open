import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { createAnecdote, showNotification } from '../redux/actions/actions';

const AnecdoteForm = (props) => {
  const dispatch = useDispatch();
  const inpRef = useRef();

  const create = (event) => {
    event.preventDefault();
    const toCreate = inpRef.current.value;
    console.log('submit', toCreate);
    dispatch(createAnecdote(toCreate));
    dispatch(showNotification(`Added new anecdote: "${toCreate}"`))
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

export default AnecdoteForm;
