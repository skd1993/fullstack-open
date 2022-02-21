import * as ACTIONS from '../actions/actionTypes';
import { userInitialState } from './initialState';

export const userReducer = (state = userInitialState, action) => {
  // console.log(action.type, action.payload);
  switch (action.type) {
    case ACTIONS.LOGIN:
      return { ...action.payload };
    case ACTIONS.LOGOUT:
      return userInitialState;
    default:
      return state;
  }
};
