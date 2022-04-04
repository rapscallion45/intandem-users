import { combineReducers } from 'redux';
import * as types from '../types/types';

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
        deleted: false,
      };
    case types.DELETEUSER_SUCCESS:
      return {
        ...state,
        users: {
          ...state.users,
          data: state.users.data.filter((item) => item.id !== action.id),
        },
        deleting: false,
        deleted: true,
      };
    case types.DELETEUSER_FAILURE:
      return {
        ...state,
        deleteError: action.error,
        deleting: false,
        deleted: false,
      };
    case types.CREATEUSER_REQUEST:
      return {
        ...state,
        creating: true,
        created: false,
      };
    case types.CREATEUSER_SUCCESS:
      return {
        ...state,
        creating: false,
        created: true,
      };
    case types.CREATEUSER_FAILURE:
      return {
        ...state,
        createError: action.error,
        creating: false,
        created: false,
      };
    case types.EDITUSER_REQUEST:
      return {
        ...state,
        updating: true,
        updated: false,
      };
    case types.EDITUSER_SUCCESS:
      return {
        ...state,
        users: {
          ...state.users,
          data: state.users.data.map((item) => {
            if (item.id === action.userId) {
              return {
                ...item,
                first_name: action.userFields.first_name,
                last_name: action.userFields.last_name,
                email: action.userFields.email,
              };
            }
            return item;
          }),
        },
        updating: false,
        updated: true,
      };
    case types.EDITUSER_FAILURE:
      return {
        ...state,
        updateError: action.error,
        updating: false,
        updated: false,
      };
    default:
      return state;
  }
};

// USER PROFILE REDUCER
const userProfileReducer = (state = {}, action) => {
  switch (action.type) {
    case types.GETUSERBYID_REQUEST:
      return {
        loading: true,
      };
    case types.GETUSERBYID_SUCCESS:
      return {
        user: action.usersData,
        loaded: true,
      };
    case types.GETUSERBYID_FAILURE:
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
  users: usersReducer,
  userProfile: userProfileReducer,
};

export default combineReducers(reducers);
