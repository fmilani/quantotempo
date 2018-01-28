import React from 'react';
import 'moment-countdown';
import countdown from 'countdown';
import FlipMove from 'react-flip-move';

import Timer from './Timer';

countdown.setLabels(null, null, null, null, "Time's up");
const TimersList = props => {
  return (
    <FlipMove>
      {props.timers.map(timer => {
        return (
          <Timer
            key={timer.id}
            id={timer.id}
            description={timer.description}
            duration={timer.duration}
            remaining={timer.remaining}
            timerInterval={timer.timerInterval}
            onStartClick={() => {
              props.onStartTimerClick(timer.id);
            }}
            onPauseClick={() => {
              props.onPauseTimerClick(timer.id);
            }}
            onResetClick={() => {
              props.onResetTimerClick(timer.id);
            }}
            onRemoveClick={() => {
              props.onRemoveTimerClick(timer.id);
            }}
            style={{
              margin: '10px 0',
            }}
          />
        );
      })}
    </FlipMove>
  );
};

export default TimersList;
