import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import moment from 'moment';
import 'moment-countdown';
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import IconButton from 'material-ui/IconButton';
import DeleteForeverIcon from 'material-ui-icons/DeleteForever';
import Typography from 'material-ui/Typography';

// We create this higher-order function because we need to stop event
// propagation for the button clicks so the click on the grid isn't
// triggered
const handlerWithoutEventPropagation = (event, handler) => () => {
  event.stopPropagation();
  handler();
};

const styles = theme => ({
  infoWrapper: {
    padding: `${2 * theme.spacing.unit}px ${2 * theme.spacing.unit}px`,
  },
  description: {
    fontWeight: 300,
  },
  running: {
    fontStyle: 'italic',
  },
});

class TimerSummary extends Component {
  render() {
    const {
      id,
      description,
      duration,
      timerInterval,
      onRemoveClick,
      classes,
      history,
    } = this.props;

    return (
      <Grid
        container
        justify="space-between"
        alignItems="center"
        spacing={0}
        onClick={() => {
          history.push(`/timer/${id}`);
        }}
      >
        <Grid
          item
          xs={10}
          container
          spacing={0}
          direction="column"
          className={classes.infoWrapper}
        >
          <Typography noWrap type="headline" className={classes.description}>
            {description}
          </Typography>
          <Typography noWrap type="subheading" className={classes.description}>
            {moment()
              .countdown(moment().add(duration, 'milliseconds'))
              .toString()}
          </Typography>
          <Typography noWrap type="caption" className={classes.running}>
            {timerInterval ? '(running)' : null}
          </Typography>
        </Grid>
        <Grid item>
          <IconButton
            onClick={e => handlerWithoutEventPropagation(e, onRemoveClick)()}
          >
            <DeleteForeverIcon />
          </IconButton>
        </Grid>
      </Grid>
    );
  }
}

export { TimerSummary };
export default withRouter(withStyles(styles)(TimerSummary));
