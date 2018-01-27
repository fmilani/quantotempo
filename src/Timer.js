import React, { Component } from 'react';
import Card, { CardHeader } from 'material-ui/Card';
import IconButton from 'material-ui/IconButton';
import DeleteForeverIcon from 'material-ui-icons/DeleteForever';
import PlayIcon from 'material-ui-icons/PlayArrow';
import ReplayIcon from 'material-ui-icons/Replay';
import PauseIcon from 'material-ui-icons/Pause';
import StopIcon from 'material-ui-icons/Stop';
import Typography from 'material-ui/Typography';

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

    return (
      <Card
        style={{
          padding: 10,
          ...style,
        }}
      >
        <Typography type="headline" gutterBottom>
          {description}
        </Typography>
        <div>{remaining}</div>
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
