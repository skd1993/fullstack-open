import * as ACTIONS from '../actions/actionTypes';

const notificationReducer = (state = '', action) => {
  console.log('state now: ', state);
  console.log('action', action);

  switch (action.type) {
    case ACTIONS.SHOW_NOTIFICATION:
    case ACTIONS.HIDE_NOTIFICATION:
      return action.data;
    default:
      return state;
  }
};

export default notificationReducer;
