import { asObject } from '../actions/actions';
import * as ACTIONS from '../actions/actionTypes';
import { anecdotesAtStart } from './initialState';

const initialState = anecdotesAtStart.map(asObject);

const anecdoteReducer = (state = initialState, action) => {

  switch (action.type) {
    case ACTIONS.VOTE:
      const filtered = state.filter((s) => action.data.id !== s.id);
      return [...filtered, action.data];
    case ACTIONS.CREATE:
      return [...state, action.data];
    case ACTIONS.FETCH_ANECDOTES:
      return action.data;
    default:
      return state;
  }
};

export default anecdoteReducer;
