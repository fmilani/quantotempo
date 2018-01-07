import moment from 'moment';
import { connect } from 'react-redux';
import { v4 } from 'node-uuid';

import TimersList from './TimersList';

const mapStateToProps = state => ({
  timers: state.timers,
});

const mapDispatchToProps = dispatch => ({
  onAddTimerClick: () => {
    dispatch({
      type: 'ADD_TIMER',
      id: v4(),
      description: 'Teste',
      duration: 15,
      remaining: 15,
    });
  },
  onStartTimerClick: id => {
    const timerInterval = setInterval(() => {
      dispatch({
        type: 'TICK_TIMER',
        ammount: 1,
        id,
      });
    }, 1000);
    dispatch({
      type: 'START_TIMER',
      id,
      timerInterval,
    });
  },
  onPauseTimerClick: id => {
    dispatch({
      type: 'PAUSE_TIMER',
      id,
    });
  },
  onResetTimerClick: id => {
    dispatch({
      type: 'RESET_TIMER',
      id,
    });
  },
  onRemoveTimerClick: id => {
    dispatch({
      type: 'REMOVE_TIMER',
      id,
    });
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

// export default class TimerContainer extends Component {
//   state = {
//     timerInterval: null,
//     remaining: null,
//   };
//   render() {
//     const now = moment();
//     const end = moment(now).add(this.state.remaining, 'seconds');

//     return (
//       <div>
//         <Timer
//           description="Eggs overeasy"
//           duration={60}
//           remaining={this.state.remaining ? now.countdown(end).value : '--'}
//         />
//         {this.state.remaining === null ? (
//           <button
//             onClick={() => {
//               this.setState({ remaining: 60 });
//               const timerInterval = setInterval(() => {
//                 this.setState({
//                   remaining: this.state.remaining - 1,
//                 });
//               }, 1000);
//               this.setState({ timerInterval });
//             }}
//           >
//             Start
//           </button>
//         ) : (
//           <button
//             onClick={() => {
//               clearInterval(this.state.timerInterval);
//               this.setState({ remaining: 60 });
//               const timerInterval = setInterval(() => {
//                 this.setState({
//                   remaining: this.state.remaining - 1,
//                 });
//               }, 1000);
//               this.setState({ timerInterval });
//             }}
//           >
//             Reset
//           </button>
//         )}
//         <button
//           onClick={() => {
//             clearInterval(this.state.timerInterval);
//             this.setState({
//               timerInterval: null,
//               remaining: null,
//             });
//           }}
//         >
//           Stop
//         </button>
//       </div>
//     );
//   }
// }
