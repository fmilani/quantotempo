import { v4 } from 'node-uuid';

export function addTimer(duration) {
  return {
    type: 'ADD_TIMER',
    id: v4(),
    description: 'Teste',
    duration,
    remaining: duration,
  };
}

export function startTimer(id, timerInterval) {
  return {
    type: 'START_TIMER',
    id,
    timerInterval,
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
  return {
    type: 'PAUSE_TIMER',
    id,
  };
}

export function resetTimer(id) {
  return {
    type: 'RESET_TIMER',
    id,
  };
}

export function removeTimer(id) {
  return {
    type: 'REMOVE_TIMER',
    id,
  };
}
