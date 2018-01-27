import React from 'react';

import SplashContainer from './SplashContainer';
import TimersListContainer from './TimersListContainer';
import AddTimerContainer from './AddTimerContainer';

const App = props => (
  <div style={{ textAlign: 'center' }}>
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
