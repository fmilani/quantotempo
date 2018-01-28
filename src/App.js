import React from 'react';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import Reboot from 'material-ui/Reboot';
import cyan from 'material-ui/colors/cyan';
import lime from 'material-ui/colors/lime';

import SplashContainer from './SplashContainer';
import TimersListContainer from './TimersListContainer';
import AddTimerContainer from './AddTimerContainer';

const theme = createMuiTheme({
  palette: {
    primary: cyan,
    secondary: lime,
  },
});

document.getElementsByTagName('body')[0].style.backgroundColor = cyan[500];

const App = props => (
  <MuiThemeProvider theme={theme}>
    <Reboot />
    <SplashContainer />
    {props.showApp ? (
      <div>
        <AddTimerContainer />
        <TimersListContainer />
      </div>
    ) : null}
  </MuiThemeProvider>
);

export default App;
