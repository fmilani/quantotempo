import React from 'react';
import Reboot from 'material-ui/Reboot';

import SplashContainer from './SplashContainer';
import TimersListContainer from './TimersListContainer';
import AddTimerContainer from './AddTimerContainer';

const App = props => (
  <div style={{ textAlign: 'center' }}>
    <Reboot />
    <SplashContainer />
    {props.showApp ? (
      <div>
        <AddTimerContainer />
        <TimersListContainer />
      </div>
    ) : null}
  </div>
);

export default App;
