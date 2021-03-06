import uuidv4 from 'uuid/v4';

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
    id: uuidv4(),
    description,
    duration,
    remaining: duration,
  };
}

export function startTimer(id) {
  const TICK_INTERVAL = 100;
  return (dispatch, getState) => {
    // first we find any running timer and pause/reset it to make sure only
    // 1 timer is running at any time
    getState()
      .timers.filter(timer => timer.id !== id && timer.timerInterval)
      .forEach(timer => {
        dispatch(pauseTimer(timer.id));
        dispatch(resetTimer(timer.id));
      });
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
