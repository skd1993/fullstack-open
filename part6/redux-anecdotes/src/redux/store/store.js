import { combineReducers, applyMiddleware, createStore, compose } from 'redux';
import anecdoteReducer from '../reducers/anecdoteReducer';
import notificationReducer from '../reducers/notificationReducer';
import filterReducer from '../reducers/filterReducer';
import thunk from 'redux-thunk';

const reducer = combineReducers({
  anecdotes: anecdoteReducer,
  notification: notificationReducer,
  filter: filterReducer,
});

export const store = createStore(
  reducer,
  compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
      window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);
