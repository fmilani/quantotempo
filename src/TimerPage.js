import React from 'react';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';
import PlayArrow from 'material-ui-icons/PlayArrow';

const styles = theme => ({
  wrapper: { textAlign: 'center', height: '100vh' },
  description: {
    fontWeight: 300,
  },
  section: { border: '2px red solid', maxWidth: '100%' },
});
const TimerPage = ({ description, duration, remaining, classes }) => (
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
        <Typography
          type="headline"
          gutterBottom
          className={classes.description}
        >
          Some really really really big description for a timer that still fits
          the screen
        </Typography>
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
          <div>1 hour</div>
          <div>3 minutes</div>
          {/* <div>59 seconds</div> */}
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
          Back
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

export default withStyles(styles)(TimerPage);
