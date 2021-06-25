import React from 'react';
import './App.global.css';
import Router from './route';
import { Provider } from 'react-redux';
import store from './redux/store';

export default function App() {
  return (
    <Provider store={store}>
      <Router />
    </Provider>
  );
}
