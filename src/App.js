import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import Reboot from 'material-ui/Reboot';
import cyan from 'material-ui/colors/cyan';
import lime from 'material-ui/colors/lime';

import TimersListContainer from './TimersListContainer';
import AddTimerContainer from './AddTimerContainer';
import throttle from 'lodash/throttle';
import appReducers from './reducers';
import { loadState, saveState } from './localStorage';

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

const theme = createMuiTheme({
  palette: {
    primary: cyan,
    secondary: lime,
  },
});

document.getElementsByTagName('body')[0].style.backgroundColor = cyan[500];

const App = () => (
  <Provider store={store}>
    <MuiThemeProvider theme={theme}>
      <Reboot />
      <AddTimerContainer />
      <TimersListContainer />
    </MuiThemeProvider>
  </Provider>
);

export default App;
