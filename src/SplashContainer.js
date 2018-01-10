import { connect } from 'react-redux';
import Splash from './Splash';

const SplashContainer = connect(
  state => ({ showAppProp: state.showApp }),
  dispatch => ({
    showApp: () => {
      dispatch({ type: 'SHOW_APP' });
    },
  }),
)(Splash);

export default SplashContainer;
