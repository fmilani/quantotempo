import React from 'react';
import moment from 'moment';
import 'moment-countdown';
import countdown from 'countdown';
import Timer from './Timer';

countdown.setLabels(null, null, null, null, "Time's up");
const TimersList = props => {
  const now = moment();

  return (
    <div>
      {props.timers.map(timer => {
        const end = moment(now).add(timer.remaining, 'milliseconds');
        const remaining = now.countdown(end);
        return (
          <Timer
            key={timer.id}
            id={timer.id}
            description={timer.description}
            duration={timer.duration}
            remaining={(remaining.value < 0 ? '- ' : '') + remaining.toString()}
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
            soundPlaying={timer.soundPlaying}
            style={{
              margin: '10px',
            }}
          />
        );
      })}
    </div>
  );
};

export default TimersList;
