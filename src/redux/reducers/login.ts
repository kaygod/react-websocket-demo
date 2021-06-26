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
    case "UPDATE_INPUT":
      const { type,data } = action.value;
      return {...state,[type]:data};
      break;  
    default:
      return state;
  }
};
