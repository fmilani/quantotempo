import React from 'react';
import { withStyles } from 'material-ui/styles';
import 'moment-countdown';
import countdown from 'countdown';
import FlipMove from 'react-flip-move';

import Timer from './Timer';

countdown.setLabels(null, null, null, null, "Time's up");

const styles = theme => ({
  wrapperForFab: {
    // TODO: find a way to get the height(56px)
    // of the fab button from theme or somewhere else
    marginBottom: 56 + 2 * (2 * theme.spacing.unit),
  },
});
const TimersList = props => {
  return (
    <div className={props.classes.wrapperForFab}>
      <FlipMove>
        {props.timers.map(timer => {
          return (
            <Timer
              key={timer.id}
              id={timer.id}
              description={timer.description}
              duration={timer.duration}
              remaining={timer.remaining}
              timerInterval={timer.timerInterval}
              onStartClick={() => {
                props.onStartTimerClick(timer.id);
              }}
              onPauseClick={() => {
                props.onPauseTimerClick(timer.id);
              }}
              onResetClick={() => {
                props.onResetTimerClick(timer.id);
              }}
              onRemoveClick={() => {
                props.onRemoveTimerClick(timer.id);
              }}
              style={{
                margin: '10px 0',
              }}
            />
          );
        })}
      </FlipMove>
    </div>
  );
};

export default withStyles(styles)(TimersList);
