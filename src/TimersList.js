import React from 'react';
import { withStyles } from 'material-ui/styles';
import 'moment-countdown';
import countdown from 'countdown';
import FlipMove from 'react-flip-move';

import TimerSummary from './TimerSummary';

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
          /* div needed for FlipMove to work after we used withRouter
             HOC on Timer */
          return (
            <div key={timer.id}>
              <TimerSummary
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
            </div>
          );
        })}
      </FlipMove>
    </div>
  );
};

export default withStyles(styles)(TimersList);
