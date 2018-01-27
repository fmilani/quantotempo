import { combineReducers } from 'redux';

const timer = (state, action) => {
  switch (action.type) {
    case 'ADD_TIMER':
      return {
        id: action.id,
        description: action.description,
        duration: action.duration,
        remaining: action.remaining,
        timerInterval: null,
      };
    case 'TICK_TIMER':
      if (state.id !== action.id) {
        return state;
      }
      return { ...state, remaining: state.remaining - action.ammount };
    case 'START_TIMER':
      if (state.id !== action.id) {
        return state;
      }
      return { ...state, timerInterval: action.timerInterval };
    case 'PAUSE_TIMER':
      if (state.id !== action.id) {
        return state;
      }
      return { ...state, timerInterval: null };
    case 'RESET_TIMER':
      if (state.id !== action.id) {
        return state;
      }
      return { ...state, remaining: state.duration, soundPlaying: false };
    case 'START_SOUND':
      if (state.id !== action.id) {
        return state;
      }
      return { ...state, soundPlaying: true };
    case 'STOP_SOUND':
      if (state.id !== action.id) {
        return state;
      }
      return { ...state, soundPlaying: false };
    default:
      return state;
  }
};
const timers = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TIMER':
      return [...state, timer(undefined, action)];
    case 'TICK_TIMER':
    case 'START_TIMER':
    case 'PAUSE_TIMER':
    case 'RESET_TIMER':
    case 'START_SOUND':
    case 'STOP_SOUND':
      return state.map(t => timer(t, action));
    case 'REMOVE_TIMER':
      return state.filter(t => t.id !== action.id);
    default:
      return state;
  }
};

const newTimerDescription = (state = '', action) => {
  switch (action.type) {
    case 'CHANGE_NEW_TIMER_DESCRIPTION':
      return action.newDescription;
    default:
      return state;
  }
};

const newTimerDuration = (state = '000000', action) => {
  switch (action.type) {
    case 'CHANGE_NEW_TIMER_DURATION':
      if (!action.newDuration) return '000000';
      return action.newDuration;
    default:
      return state;
  }
};

const showApp = (state = false, action) => {
  switch (action.type) {
    case 'SHOW_APP':
      return true;
    default:
      return state;
  }
};
const appReducers = combineReducers({
  timers,
  newTimerDescription,
  newTimerDuration,
  showApp,
});

export default appReducers;
