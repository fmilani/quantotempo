import React from 'react';

const Splash = props => (
  <div
    style={{
      backgroundColor: 'lightyellow',
      height: '100vh',
      display: !props.showAppProp ? 'block' : 'none',
    }}
    onClick={() => {
      props.showApp();
    }}
  >
    <div>Splash</div>
  </div>
);

export default Splash;
