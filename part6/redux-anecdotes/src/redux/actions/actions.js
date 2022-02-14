import * as ACTIONS from './actionTypes';

export const getId = () => (100000 * Math.random()).toFixed(0);

export const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0,
  };
};

export const setFilter = (filter) => {
  return {
    type: ACTIONS.FILTER,
    data: filter
  }
}

export const hideNotification = () => {
  return {
    type: ACTIONS.HIDE_NOTIFICATION,
    data: '',
  };
};

export const showNotification = (notification) => {
  return {
    type: ACTIONS.SHOW_NOTIFICATION,
    data: notification,
  };
};

export const createAnecdote = (anecdote) => {
  return {
    type: ACTIONS.CREATE,
    data: asObject(anecdote),
  };
};

export const giveVote = (anecdote) => {
  return {
    type: ACTIONS.VOTE,
    data: {
      content: anecdote.content,
      id: anecdote.id,
      votes: anecdote.votes + 1,
    },
  };
};
