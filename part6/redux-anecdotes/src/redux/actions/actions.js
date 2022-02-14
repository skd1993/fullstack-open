import * as ACTIONS from './actionTypes';
import anecdotesService from '../../services/anecdotesService';

export const getId = () => (100000 * Math.random()).toFixed(0);

export const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0,
  };
};

export const addVote = (to) => {
  return async (dispatch) => {
    const v = await anecdotesService.postVote(to);
    dispatch(giveVote(v));
    dispatch(setNotification(`You voted: "${v.content}"`, 3));
  };
};

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const a = await anecdotesService.getAnecdotes();
    dispatch(setAnecdotes(a));
  };
};

export const newAnecdote = (toCreate) => {
  return async (dispatch) => {
    const n = await anecdotesService.postAnecdote(toCreate);
    dispatch(createAnecdote(n));
    dispatch(setNotification(`Added new anecdote: "${n.content}"`, 3));
  };
};

const setAnecdotes = (data) => {
  return {
    type: ACTIONS.FETCH_ANECDOTES,
    data,
  };
};

export const setFilter = (filter) => {
  return {
    type: ACTIONS.FILTER,
    data: filter,
  };
};

export const hideNotification = () => {
  return {
    type: ACTIONS.HIDE_NOTIFICATION,
    data: '',
  };
};

const setNotification = (notification, t) => {
  return (dispatch) => {
    dispatch(showNotification(notification));
    setTimeout(() => {
      dispatch(hideNotification());
    }, t * 1000);
  };
};

const showNotification = (notification) => {
  return {
    type: ACTIONS.SHOW_NOTIFICATION,
    data: notification,
  };
};

const createAnecdote = (anecdote) => {
  return {
    type: ACTIONS.CREATE,
    // data: asObject(anecdote),
    data: anecdote,
  };
};

const giveVote = (anecdote) => {
  return {
    type: ACTIONS.VOTE,
    data: anecdote,
  };
};
