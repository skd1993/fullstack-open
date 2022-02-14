import React from 'react';
// import { useSelector, useDispatch } from 'react-redux';
import { connect } from 'react-redux';
import { addVote } from '../redux/actions/actions';

const AnecdoteList = (props) => {
  // const anecdotes = useSelector((state) => state.anecdotes);
  // const filter = useSelector((state) => state.filter);
  // const dispatch = useDispatch();

  const anecdotes = props.anecdotes;
  const filter = props.filter;

  const vote = (anecdote) => {
    console.log('vote', anecdote.id);
    // dispatch(addVote(anecdote));
    props.addVote(anecdote);
  };

  const anecdotesToShow =
    filter.length > 0
      ? anecdotes.filter(
          (a) => a.content.toLowerCase().indexOf(filter.toLowerCase()) > -1
        )
      : anecdotes;

  return (
    <>
      {anecdotesToShow
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
        ))}
    </>
  );
};

const mapDispatchToProps = { addVote };

const mapStateToProps = (state) => {
  return {
    filter: state.filter,
    anecdotes: state.anecdotes,
  };
};

const CAnecdoteList = connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList);

export default CAnecdoteList;
