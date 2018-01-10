import { connect } from 'react-redux';
import {
  addTimer,
  startTimer,
  pauseTimer,
  resetTimer,
  removeTimer,
} from './actions';

import TimersList from './TimersList';

const mapStateToProps = state => ({
  timers: state.timers,
  beep: state.beep,
});

const mapDispatchToProps = dispatch => ({
  onAddTimerClick: () => {
    dispatch(addTimer(2 * 1000));
  },
  onStartTimerClick: id => {
    dispatch(startTimer(id));
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

const TimersListContainer = connect(mapStateToProps, mapDispatchToProps)(
  TimersList,
);
export default TimersListContainer;
