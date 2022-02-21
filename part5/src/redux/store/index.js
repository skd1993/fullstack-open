import { applyMiddleware, combineReducers, createStore, compose } from 'redux';
import { notificationReducer } from '../reducers/notificationReducer';
import thunk from 'redux-thunk';
import { userReducer } from '../reducers/userReducer';
import { blogsReducer } from '../reducers/blogsReducer';

const reducer = combineReducers({
  notification: notificationReducer,
  user: userReducer,
  blogs: blogsReducer,
});

export const store = createStore(
  reducer,
  compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);
