import * as ACTIONS from '../actions/actionTypes';
import { notificationInitialState } from './initialState';

export const notificationReducer = (
  state = notificationInitialState,
  action
) => {
  switch (action.type) {
    case ACTIONS.SHOW_NOTIFICATION:
      return action.payload;
    case ACTIONS.HIDE_NOTIFICATION:
      return notificationInitialState;
    default:
      return state;
  }
};
