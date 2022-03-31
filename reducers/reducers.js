import { combineReducers } from 'redux';
import * as types from '../constants/types';

// COUNTER REDUCER
const counterReducer = (state = 0, { type }) => {
  switch (type) {
    case types.INCREMENT:
      return state + 1;
    case types.DECREMENT:
      return state - 1;
    case types.RESET:
      return 0;
    default:
      return state;
  }
};

// COMBINED REDUCERS
const reducers = {
  counter: counterReducer,
};

export default combineReducers(reducers);
