import * as ACTIONS from '../actions/actionTypes';

const filterReducer = (state = '', action) => {

  switch (action.type) {
    case ACTIONS.FILTER:
      return action.data;
    default:
      return state;
  }
};

export default filterReducer;
