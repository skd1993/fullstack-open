import * as ACTIONS from '../actions/actionTypes';

const notificationReducer = (state = '', action) => {

  switch (action.type) {
    case ACTIONS.SHOW_NOTIFICATION:
    case ACTIONS.HIDE_NOTIFICATION:
      return action.data;
    default:
      return state;
  }
};

export default notificationReducer;
