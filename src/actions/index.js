import { v4 } from 'node-uuid';

export function changeNewTimerDescription(newDescription) {
  return {
    type: 'CHANGE_NEW_TIMER_DESCRIPTION',
    newDescription,
  };
}

export function changeNewTimerDuration(newDuration) {
  return {
    type: 'CHANGE_NEW_TIMER_DURATION',
    newDuration,
  };
}

export function addTimer({ description, duration }) {
  return {
    type: 'ADD_TIMER',
    id: v4(),
    description,
    duration,
    remaining: duration,
  };
}

export function startTimer(id) {
  const TICK_INTERVAL = 100;
  return (dispatch, getState) => {
    const timerInterval = setInterval(() => {
      dispatch(tickTimer(id, TICK_INTERVAL));
    }, TICK_INTERVAL);
    dispatch({
      type: 'START_TIMER',
      id,
      timerInterval,
    });
  };
}

export function tickTimer(id, ammount) {
  return {
    type: 'TICK_TIMER',
    ammount,
    id,
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
