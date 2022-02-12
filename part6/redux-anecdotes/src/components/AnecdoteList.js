import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { giveVote } from '../reducers/anecdoteReducer';


const AnecdoteList = (props) => {
  const anecdotes = useSelector((state) => state);
  const dispatch = useDispatch();

  const vote = (anecdote) => {
    console.log('vote', anecdote.id);
    dispatch(giveVote(anecdote));
  };

  return ( 
    <>
    {anecdotes
      .sort((a, b) => b.votes - a.votes)
      .map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button
              onClick={() => {
                vote(anecdote);
              }}
            >
              vote
            </button>
          </div>
        </div>
      ))
    }</>
  );
}
 
export default AnecdoteList;