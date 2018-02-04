import React from 'react';
import moment from 'moment';
import { withStyles } from 'material-ui/styles';
import Link from './Link';
import Typography from 'material-ui/Typography';
import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';
import PlayIcon from 'material-ui-icons/PlayArrow';
import PauseIcon from 'material-ui-icons/Pause';
import StopIcon from 'material-ui-icons/Stop';

import Sound from './Sound';

const styles = theme => ({
  wrapper: { textAlign: 'center', height: '100vh' },
  description: {
    fontWeight: 300,
  },
  section: { maxWidth: '100%' },
});
const TimerPage = ({
  id,
  description,
  duration,
  remaining,
  timerInterval,
  onStartTimerClick,
  onPauseTimerClick,
  onResetTimerClick,
  classes,
}) => {
  const now = moment();
  const end = moment(now).add(remaining, 'milliseconds');
  const cd = now.countdown(end, null, 2, 20);
  // rounding the units so the user only sees '0' time left
  // when the timer is really over
  cd.hours = Math.floor(cd.hours);
  cd.minutes = Math.floor(cd.minutes);
  if (cd.value > 0) {
    cd.seconds = Math.ceil(cd.seconds);
  } else {
    cd.seconds = Math.floor(cd.seconds);
  }
  return (
    <div>
      <Grid
        container
        direction="column"
        justify="space-around"
        alignItems="stretch"
        spacing={0}
        className={classes.wrapper}
      >
        <Grid
          item
          container
          justify="center"
          alignItems="center"
          spacing={0}
          xs={3}
          className={classes.section}
        >
          <div>
            <Typography
              type="headline"
              gutterBottom
              className={classes.description}
            >
              {description}
            </Typography>
          </div>
        </Grid>
        <Grid
          item
          container
          justify="center"
          alignItems="center"
          spacing={0}
          xs={7}
          className={classes.section}
        >
          <Typography type="display3" className={classes.description}>
            {(cd.value < 0 && cd.seconds ? '- ' : '') + cd.toString()}
          </Typography>
        </Grid>
        <Grid
          item
          container
          spacing={0}
          justify="space-between"
          alignItems="center"
          xs={2}
          className={classes.section}
        >
          <Button>
            <Link to="/">Back</Link>
          </Button>
          {!timerInterval ? (
            <Button
              aria-label="Start timer"
              fab
              mini
              color="secondary"
              onClick={onStartTimerClick}
            >
              <PlayIcon />
            </Button>
          ) : remaining < 0 ? (
            <Button
              aria-label="Stop timer"
              fab
              mini
              color="secondary"
              onClick={() => {
                onPauseTimerClick();
                onResetTimerClick();
              }}
            >
              <Sound play={remaining < 0} />
              <StopIcon />
            </Button>
          ) : (
            <Button
              aria-label="Pause timer"
              fab
              mini
              color="secondary"
              onClick={onPauseTimerClick}
            >
              <Sound play={remaining < 0} />
              <PauseIcon />
            </Button>
          )}
          <Button onClick={onResetTimerClick}>Reset</Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default withStyles(styles)(TimerPage);
