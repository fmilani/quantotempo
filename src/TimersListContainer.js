import moment from 'moment';
import { connect } from 'react-redux';
import {
  addTimer,
  startTimer,
  tickTimer,
  pauseTimer,
  resetTimer,
  removeTimer,
} from './actions';

import TimersList from './TimersList';

const mapStateToProps = state => ({
  timers: state.timers,
});

const mapDispatchToProps = dispatch => ({
  onAddTimerClick: () => {
    dispatch(addTimer(15 * 1000));
  },
  onStartTimerClick: id => {
    const timerInterval = setInterval(() => {
      dispatch(tickTimer(id, 10));
    }, 10);
    dispatch(startTimer(id, timerInterval));
  },
  onPauseTimerClick: id => {
    dispatch(pauseTimer(id));
  },
  onResetTimerClick: id => {
    dispatch(resetTimer(id));
  },
  onRemoveTimerClick: id => {
    dispatch(removeTimer(id));
  },
});

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...ownProps,
  ...stateProps,
  ...dispatchProps,
  onPauseTimerClick: id => {
    // we find the timer to be paused so we can clear the interval here and not in the reducer
    const timerToBePaused = stateProps.timers.find(stateProp => {
      return stateProp.id === id;
    });
    clearInterval(timerToBePaused.timerInterval);
    dispatchProps.onPauseTimerClick(id);
  },
  onResetTimerClick: id => {
    // we find the timer to be paused so we can clear the interval here and not in the reducer
    const timerToBePaused = stateProps.timers.find(stateProp => {
      return stateProp.id === id;
    });
    clearInterval(timerToBePaused.timerInterval);
    dispatchProps.onResetTimerClick(id);
    if (timerToBePaused.timerInterval) {
      // the timer was running before, start running again
      dispatchProps.onStartTimerClick(id);
    }
  },
});

const TimersListContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
)(TimersList);
export default TimersListContainer;
