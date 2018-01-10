import { connect } from 'react-redux';
import App from './App';

const AppContainer = connect(state => ({ showApp: state.showApp }))(App);

export default AppContainer;
