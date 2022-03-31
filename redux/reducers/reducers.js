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
    case types.DELETEUSER_REQUEST:
      return {
        ...state,
        deleting: true,
      };
    case types.DELETEUSER_SUCCESS:
      return {
        ...state,
        users: {
          ...state.users,
          data: state.users.data.filter((item) => item.id !== action.id),
        },
        deleted: true,
      };
    case types.DELETEUSER_FAILURE:
      return {
        ...state,
        deleteError: action.error,
        deleted: false,
      };
    default:
      return state;
  }
};

// COMBINED REDUCERS
const reducers = {
  users: usersReducer,
};

export default combineReducers(reducers);
