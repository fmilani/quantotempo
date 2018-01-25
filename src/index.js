import React from 'react';
import ReactDOM from 'react-dom';
import AppRoot from './AppRoot';
import registerServiceWorker from './registerServiceWorker';

const bodyHtmlElement = document.getElementsByTagName('body')[0];
bodyHtmlElement.style.margin = 0;
bodyHtmlElement.style.padding = 0;
ReactDOM.render(<AppRoot />, document.getElementById('root'));
registerServiceWorker();
