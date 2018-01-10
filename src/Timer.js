import React, { Component } from 'react';
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
      id,
      description,
      duration,
      remaining,
      timerInterval,
      onStartClick,
      onPauseClick,
      onResetClick,
      onRemoveClick,
      soundPlaying,
    } = this.props;

    return (
      <div
        style={{
          border: '1px solid',
        }}
      >
        <span style={{ float: 'right' }} onClick={onRemoveClick}>
          X
        </span>
        <div>{description}</div>
        <div>duration: {duration}</div>
        <div>remaining: {remaining}</div>
        <div>Sound playing: {soundPlaying ? 'yes' : 'no'}</div>
        {timerInterval === null ? (
          <button onClick={onStartClick}>Start</button>
        ) : soundPlaying ? (
          <button
            onClick={() => {
              onPauseClick();
              onResetClick();
            }}
          >
            Stop
          </button>
        ) : (
          <button onClick={onPauseClick}>Pause</button>
        )}
        <button onClick={onResetClick}>Reset</button>
        <Sound play={soundPlaying} />
      </div>
    );
  }
}

export default Timer;
