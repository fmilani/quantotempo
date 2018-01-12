import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import throttle from 'lodash/throttle';

import appReducers from './reducers';
import AppContainer from './AppContainer';
import { loadState, saveState } from './localStorage';
import './App.css';

const store = createStore(appReducers, loadState(), applyMiddleware(thunk));

store.subscribe(
  throttle(() => {
    saveState({
      timers: store.getState().timers.map(timer => ({
        ...timer,
        // for now we wont save the 'running' state of the timers
        // we will probably need to dispatch an action on app load
        // to check for running timers and restore their 'setInterval'
        // state
        timerInterval: null,
        remaining: timer.duration,
      })),
    });
  }, 1000),
);

class AppRoot extends Component {
  render() {
    return (
      <Provider store={store}>
        <AppContainer />
      </Provider>
    );
  }
}

export default AppRoot;
