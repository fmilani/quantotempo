import React from 'react';
import moment from 'moment';
import { withStyles } from 'material-ui/styles';
import Link from './Link';
import Typography from 'material-ui/Typography';
import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';
import PlayArrow from 'material-ui-icons/PlayArrow';

const styles = theme => ({
  wrapper: { textAlign: 'center', height: '100vh' },
  description: {
    fontWeight: 300,
  },
  section: { maxWidth: '100%' },
});
const TimerPage = ({ description, duration, remaining, classes }) => {
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
            {cd.toString()}
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
          <Button
            onClick={() => {
              console.log('click');
            }}
          >
            <Link to="/">Back</Link>
          </Button>
          <Button
            aria-label="Add new timer"
            fab
            mini
            color="secondary"
            onClick={e => {
              e.preventDefault();
              // this.openModalForm();
            }}
          >
            <PlayArrow />
          </Button>
          <Button>Reset</Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default withStyles(styles)(TimerPage);
