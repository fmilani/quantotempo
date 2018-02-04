import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import throttle from 'lodash/throttle';
import appReducers from './reducers';
import { loadState, saveState } from './localStorage';

const store = createStore(appReducers, loadState(), applyMiddleware(thunk));

store.subscribe(
  throttle(() => {
    saveState({
      timers: store.getState().timers.map(timer => ({
        ...timer,
        // for now we wont save the 'running' state of the timers
        // we will probably need to dispatch an action on app load
        // to check for running timers and restore their 'setInterval'
        // state
        timerInterval: null,
        remaining: timer.duration,
      })),
    });
  }, 1000),
);

export default store;
