import * as ACTIONS from '../actions/actionTypes';
import { blogsInitialState } from './initialState';

export const blogsReducer = (state = blogsInitialState, action) => {
  // console.log('Blog reducer', action.type, action.payload);
  switch (action.type) {
    case ACTIONS.SET_BLOGS:
      return action.payload;
    case ACTIONS.NEW_BLOG:
      return [...state, action.payload];
    case ACTIONS.LIKE_BLOG:
      return state;
    case ACTIONS.DELETE_BLOG:
      return state;
    case ACTIONS.UNLOAD_BLOGS:
      return blogsInitialState;
    default:
      return state;
  }
};
