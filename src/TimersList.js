import React from 'react';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import Divider from 'material-ui/Divider';
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
  title: {
    fontWeight: 300,
    paddingLeft: 2 * theme.spacing.unit,
    paddingTop: 2 * theme.spacing.unit,
  },
});
const TimersList = props => {
  return (
    <div className={props.classes.wrapperForFab}>
      <Typography type="display3" gutterBottom className={props.classes.title}>
        My timers
      </Typography>
      <Divider />
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
                onRemoveClick={() => {
                  props.onRemoveTimerClick(timer.id);
                }}
              />
              <Divider />
            </div>
          );
        })}
      </FlipMove>
    </div>
  );
};

export default withStyles(styles)(TimersList);
