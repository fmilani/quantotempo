import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import appReducers from './reducers';
import TimersListContainer from './TimersListContainer';
import './App.css';

// mock preloaded state
const persistedState = {
  timers: [
    {
      id: 1,
      description: 'Test timer',
      duration: 120 * 1000,
      remaining: 120 * 1000,
      timerInterval: null,
    },
  ],
};
class App extends Component {
  render() {
    return (
      <Provider store={createStore(appReducers, persistedState)}>
        <div className="App">
          <header className="App-header">
            <h1 className="App-title">Welcome to React</h1>
          </header>
          <TimersListContainer />
        </div>
      </Provider>
    );
  }
}

export default App;
