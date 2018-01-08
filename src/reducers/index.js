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
const appReducers = combineReducers({
  timers,
});

export default appReducers;
