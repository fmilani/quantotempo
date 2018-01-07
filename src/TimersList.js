import React from 'react';
import moment from 'moment';
import 'moment-countdown';
import Timer from './Timer';

const TimersList = props => {
  const now = moment();

  return (
    <div>
      <button
        onClick={() => {
          props.onAddTimerClick();
        }}
      >
        + Add a timer
      </button>
      {props.timers.map(timer => {
        const end = moment(now).add(timer.remaining, 'seconds');
        return (
          <Timer
            key={timer.id}
            id={timer.id}
            description={timer.description}
            duration={timer.duration}
            remaining={now.countdown(end).toString()}
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
          />
        );
      })}
    </div>
  );
};

export default TimersList;
