import React from 'react';
import moment from 'moment';
import 'moment-countdown';
import countdown from 'countdown';
import Timer from './Timer';

const TimersList = props => {
  const now = moment();

  return (
    <div>
      {props.timers.map(timer => {
        const end = moment(now).add(timer.remaining, 'milliseconds');
        return (
          <Timer
            key={timer.id}
            id={timer.id}
            description={timer.description}
            duration={timer.duration}
            remaining={now
              .countdown(
                end,
                countdown.HOURS |
                  countdown.MINUTES |
                  countdown.SECONDS |
                  countdown.MILLISECONDS,
              )
              .toString()}
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
          />
        );
      })}
    </div>
  );
};

export default TimersList;
