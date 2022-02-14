import * as ACTIONS from '../actions/actionTypes';

const filterReducer = (state = '', action) => {
  console.log('state now: ', state);
  console.log('action', action);

  switch (action.type) {
    case ACTIONS.FILTER:
      return action.data;
    default:
      return state;
  }
};

export default filterReducer;
