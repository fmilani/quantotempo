import React from 'react';

import SplashContainer from './SplashContainer';
import TimersListContainer from './TimersListContainer';

const App = props => (
  <div className="App">
    <SplashContainer />
    {props.showApp ? <TimersListContainer /> : null}
  </div>
);

export default App;
