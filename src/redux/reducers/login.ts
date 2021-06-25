import { actionType } from '../types';
const defaultState = {
  username: '',
  password: '',
};

export default (state = defaultState, action: actionType) => {
  switch (action.type) {
    case 'LOGIN':
      return state;
      break;
    default:
      return state;
  }
};
