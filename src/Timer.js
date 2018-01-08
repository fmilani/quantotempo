import React from 'react';
import Sound from './Sound';

const Timer = ({
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
}) => (
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
    {soundPlaying ? <Sound /> : null}
  </div>
);

export default Timer;
