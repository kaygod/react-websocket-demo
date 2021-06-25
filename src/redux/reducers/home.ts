import { actionType } from '../types';
const defaultState = {
  list: [],
};

export default (state = defaultState, action: actionType) => {
  switch (action.type) {
    case 'REQUEST_LIST':
      return state;
      break;
    default:
      return state;
  }
};
