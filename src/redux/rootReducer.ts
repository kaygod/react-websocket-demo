import { combineReducers } from 'redux';
import home from './reducers/home';
import login from './reducers/login';
import global from './reducers/global';

const rootReducer = combineReducers({
  home,
  login,
  global,
});

export default rootReducer;
