import React from 'react';
import ReactDOM from 'react-dom';
import 'typeface-roboto';
import AppRoot from './AppRoot';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<AppRoot />, document.getElementById('root'));
registerServiceWorker();
