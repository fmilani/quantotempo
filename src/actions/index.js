import { v4 } from 'node-uuid';

export function addTimer(duration) {
  return {
    type: 'ADD_TIMER',
    id: v4(),
    description: 'Teste',
    duration,
    remaining: duration,
    soundPlaying: false,
  };
}

export function startTimer(id) {
  return (dispatch, getState) => {
    const timerInterval = setInterval(() => {
      dispatch(tickTimer(id, 10));
    }, 10);
    dispatch({
      type: 'START_TIMER',
      id,
      timerInterval,
    });
  };
}

export function tickTimer(id, ammount) {
  return (dispatch, getState) => {
    const timer = getState().timers.find(timer => timer.id === id);
    if (timer.remaining <= 0 && !timer.soundPlaying) {
      dispatch(startSound(id));
    }
    dispatch({
      type: 'TICK_TIMER',
      ammount,
      id,
    });
  };
}

export function pauseTimer(id) {
  return (dispatch, getState) => {
    clearInterval(
      getState().timers.find(timer => timer.id === id).timerInterval,
    );
    dispatch({
      type: 'PAUSE_TIMER',
      id,
    });
  };
}

export function resetTimer(id) {
  return {
    type: 'RESET_TIMER',
    id,
  };
}

export function removeTimer(id) {
  return (dispatch, getState) => {
    clearInterval(
      getState().timers.find(timer => timer.id === id).timerInterval,
    );
    dispatch({
      type: 'REMOVE_TIMER',
      id,
    });
  };
}

export function startSound(id) {
  return {
    type: 'START_SOUND',
    id,
  };
}
