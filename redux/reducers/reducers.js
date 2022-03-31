import { combineReducers } from 'redux';
import * as types from '../constants/types';

// USERS REDUCER
const usersReducer = (state = {}, action) => {
  switch (action.type) {
    case types.GETUSERSBYPAGE_REQUEST:
      return {
        loading: true,
      };
    case types.GETUSERSBYPAGE_SUCCESS:
      return {
        users: action.usersData,
        loaded: true,
      };
    case types.GETUSERSBYPAGE_FAILURE:
      return {
        error: action.error,
        loaded: false,
      };
    default:
      return state;
  }
};

// COMBINED REDUCERS
const reducers = {
  counter: usersReducer,
};

export default combineReducers(reducers);
