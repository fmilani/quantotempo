import React from 'react';

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
    {timerInterval === null ? (
      <button onClick={onStartClick}>Start</button>
    ) : (
      <button onClick={onPauseClick}>Pause</button>
    )}
    <button onClick={onResetClick}>Reset</button>
  </div>
);

export default Timer;
