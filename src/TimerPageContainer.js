import { connect } from 'react-redux';
import { startTimer, pauseTimer, resetTimer } from './actions';

import TimerPage from './TimerPage';

const mapStateToProps = (state, ownProps) => {
  const timer = state.timers.find(timer => timer.id === ownProps.timerId);
  return { ...timer };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  onStartTimerClick: () => {
    dispatch(startTimer(ownProps.timerId));
  },
  onPauseTimerClick: () => {
    dispatch(pauseTimer(ownProps.timerId));
  },
  onResetTimerClick: () => {
    dispatch(resetTimer(ownProps.timerId));
  },
});

const TimerPageContainer = connect(mapStateToProps, mapDispatchToProps)(
  TimerPage,
);
export default TimerPageContainer;
