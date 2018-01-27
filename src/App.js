import React from 'react';

import SplashContainer from './SplashContainer';
import TimersListContainer from './TimersListContainer';
import AddTimerContainer from './AddTimerContainer';

const App = props => (
  <div style={{ textAlign: 'center' }}>
    <SplashContainer />
    <AddTimerContainer />
    {props.showApp ? <TimersListContainer /> : null}
  </div>
);

export default App;
