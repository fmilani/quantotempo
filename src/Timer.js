import React, { Component } from 'react';
import moment from 'moment';
import Card from 'material-ui/Card';
import IconButton from 'material-ui/IconButton';
import DeleteForeverIcon from 'material-ui-icons/DeleteForever';
import PlayIcon from 'material-ui-icons/PlayArrow';
import ReplayIcon from 'material-ui-icons/Replay';
import PauseIcon from 'material-ui-icons/Pause';
import StopIcon from 'material-ui-icons/Stop';
import Typography from 'material-ui/Typography';
import { LinearProgress, CircularProgress } from 'material-ui/Progress';

import Sound from './Sound';

class Timer extends Component {
  shouldComponentUpdate(nextProps) {
    if (!nextProps.timerInterval && !this.props.timerInterval) {
      return false;
    }

    return true;
  }
  render() {
    const {
      description,
      duration,
      remaining,
      timerInterval,
      onStartClick,
      onPauseClick,
      onResetClick,
      onRemoveClick,
      soundPlaying,
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
          <IconButton onClick={onStartClick}>
            <PlayIcon />
          </IconButton>
        ) : soundPlaying ? (
          <IconButton
            onClick={() => {
              onPauseClick();
              onResetClick();
            }}
          >
            <StopIcon />
          </IconButton>
        ) : (
          <IconButton onClick={onPauseClick}>
            <PauseIcon />
          </IconButton>
        )}
        {!soundPlaying ? (
          <IconButton onClick={onResetClick}>
            <ReplayIcon />
          </IconButton>
        ) : null}
        <div>
          <IconButton onClick={onRemoveClick}>
            <DeleteForeverIcon />
          </IconButton>
        </div>
        <Sound play={soundPlaying} />
      </Card>
    );
  }
}

export default Timer;
