import { combineReducers } from 'redux';
import { createStore } from 'redux';
import anecdoteReducer from '../reducers/anecdoteReducer';
import notificationReducer from '../reducers/notificationReducer';
import filterReducer from '../reducers/filterReducer';

const reducer = combineReducers({
  anecdotes: anecdoteReducer,
  notification: notificationReducer,
  filter: filterReducer
})

export const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);