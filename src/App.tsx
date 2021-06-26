import React from 'react';
import './App.global.css';
import Router from './route';
import { Provider } from 'react-redux';
import store from './redux/store';
import WsConnect from "./components/WsConnect/index";

export default function App() {
  return (
    <Provider store={store}>
      <WsConnect>
        <Router />
      </WsConnect>
    </Provider>
  );
}
