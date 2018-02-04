import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import Reboot from 'material-ui/Reboot';
import cyan from 'material-ui/colors/cyan';
import lime from 'material-ui/colors/lime';

import store from './store';
import TimersListContainer from './TimersListContainer';
import AddTimerContainer from './AddTimerContainer';
import TimerPageContainer from './TimerPageContainer';

const theme = createMuiTheme({
  palette: {
    primary: cyan,
    secondary: lime,
  },
});

document.getElementsByTagName('body')[0].style.backgroundColor = cyan[500];

const App = () => (
  <Provider store={store}>
    <Router>
      <MuiThemeProvider theme={theme}>
        <Reboot />
        <Route
          exact
          path="/(|index.html)"
          render={() => [
            <TimersListContainer key="timers-list" />,
            <AddTimerContainer key="add-timer" />,
          ]}
        />
        <Route
          path="/timer/:id"
          render={({ match }) => (
            <TimerPageContainer timerId={match.params.id} />
          )}
        />
      </MuiThemeProvider>
    </Router>
  </Provider>
);

export default App;
