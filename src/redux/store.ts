import { applyMiddleware, createStore, compose } from 'redux';
import thunk from 'redux-thunk';
import wsMiddleware from '../middleware/websoket';
import rootReducer from './rootReducer';

// 创建store实例
const store = createStore(
  rootReducer,
  compose(applyMiddleware(thunk, wsMiddleware))
);

export default store;
