import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import appReducers from './reducers';
import AppContainer from './AppContainer';

import './App.css';

// mock preloaded state
const persistedState = {
  timers: [
    {
      id: 1,
      description: 'Test timer',
      duration: 3 * 1000,
      remaining: 3 * 1000,
      timerInterval: null,
      soundPlaying: false,
    },
  ],
  showApp: false,
};

class AppRoot extends Component {
  render() {
    return (
      <Provider
        store={createStore(appReducers, persistedState, applyMiddleware(thunk))}
      >
        <AppContainer />
      </Provider>
    );
  }
}

export default AppRoot;
