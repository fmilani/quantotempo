import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import moment from 'moment';
import Card from 'material-ui/Card';
import IconButton from 'material-ui/IconButton';
import DeleteForeverIcon from 'material-ui-icons/DeleteForever';
import PlayIcon from 'material-ui-icons/PlayArrow';
import ReplayIcon from 'material-ui-icons/Replay';
import PauseIcon from 'material-ui-icons/Pause';
import StopIcon from 'material-ui-icons/Stop';
import Typography from 'material-ui/Typography';
import { LinearProgress } from 'material-ui/Progress';

import Sound from './Sound';

// We create this higher-order function because we need to stop event
// propagation for the button clicks so the click on the card isn't
// triggered
const handlerWithoutEventPropagation = (event, handler) => () => {
  event.stopPropagation();
  handler();
};

class TimerSummary extends Component {
  shouldComponentUpdate(nextProps) {
    const remainingHasChanged = nextProps.remaining !== this.props.remaining;
    if (
      !nextProps.timerInterval &&
      !this.props.timerInterval &&
      !remainingHasChanged
    ) {
      return false;
    }

    return true;
  }
  render() {
    const {
      id,
      description,
      duration,
      remaining,
      timerInterval,
      onStartClick,
      onPauseClick,
      onResetClick,
      onRemoveClick,
      style,
    } = this.props;

    const now = moment();
    const end = moment(now).add(remaining, 'milliseconds');
    const cd = now.countdown(end, null, 1, 20);
    // rounding the units so the user only sees '0' time left
    // when the timer is really over
    cd.minutes = Math.floor(cd.minutes);
    if (cd.value > 0) {
      cd.seconds = Math.ceil(cd.seconds);
    } else {
      cd.seconds = Math.floor(cd.seconds);
    }

    return (
      <Card
        onClick={() => {
          this.props.history.push(`/timer/${id}`);
        }}
        square
        style={{
          textAlign: 'center',
          ...style,
        }}
      >
        <LinearProgress
          color="secondary"
          mode="determinate"
          value={Math.ceil(100 * remaining / duration)}
        />
        <Typography type="headline" gutterBottom>
          {(cd.value < 0 && cd.seconds ? '- ' : '') + cd.toString()}
        </Typography>
        <Typography type="subheading" gutterBottom>
          {description}
        </Typography>
        {timerInterval === null ? (
          <IconButton
            onClick={e => handlerWithoutEventPropagation(e, onStartClick)()}
          >
            <PlayIcon />
          </IconButton>
        ) : remaining < 0 ? (
          <IconButton
            onClick={e =>
              handlerWithoutEventPropagation(e, () => {
                onPauseClick();
                onResetClick();
              })()
            }
          >
            <Sound play={remaining < 0} />
            <StopIcon />
          </IconButton>
        ) : (
          <IconButton
            onClick={e => handlerWithoutEventPropagation(e, onPauseClick)()}
          >
            <Sound play={remaining < 0} />
            <PauseIcon />
          </IconButton>
        )}
        {!(remaining < 0) ? (
          <IconButton
            onClick={e => handlerWithoutEventPropagation(e, onResetClick)()}
          >
            <ReplayIcon />
          </IconButton>
        ) : null}
        <div>
          <IconButton
            onClick={e => handlerWithoutEventPropagation(e, onRemoveClick)()}
          >
            <DeleteForeverIcon />
          </IconButton>
        </div>
      </Card>
    );
  }
}

export default withRouter(TimerSummary);
