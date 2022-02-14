import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import CAnecdoteForm from './components/AnecdoteForm';
import CAnecdoteList from './components/AnecdoteList';
import CFilter from './components/Filter';
import CNotification from './components/Notification';
import { initializeAnecdotes } from './redux/actions/actions';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeAnecdotes());
  }, [dispatch]);

  return (
    <div>
      <h2>Anecdotes</h2>
      <CNotification />
      <CFilter />
      <CAnecdoteList />
      <CAnecdoteForm />
    </div>
  );
};

export default App;
