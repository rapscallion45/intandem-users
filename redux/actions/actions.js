import * as types from '../constants/types';
import services from '../services/services';

/* Get users data from endpoint by page */
function getUsersByPage(pageNum, perPage) {
  function request() {
    return { type: types.GETUSERSBYPAGE_REQUEST };
  }
  function success(usersData) {
    return { type: types.GETUSERSBYPAGE_SUCCESS, usersData };
  }
  function failure(error) {
    return { type: types.GETUSERSBYPAGE_FAILURE, error };
  }

  return (dispatch) => {
    dispatch(request());

    services.getUsersByPage(pageNum, perPage).then(
      (usersData) => dispatch(success(usersData)),
      (error) => {
        dispatch(failure(error.toString()));
      }
    );
  };
}

/* Get user profile data from endpoint by ID */
function getUserById(id) {
  function request() {
    return { type: types.GETUSERBYID_REQUEST };
  }
  function success(usersData) {
    return { type: types.GETUSERBYID_SUCCESS, usersData };
  }
  function failure(error) {
    return { type: types.GETUSERBYID_FAILURE, error };
  }

  return (dispatch) => {
    dispatch(request());

    services.getUserById(id).then(
      (usersData) => dispatch(success(usersData)),
      (error) => {
        dispatch(failure(error.toString()));
      }
    );
  };
}

function deleteUser(id) {
  function request() {
    return { type: types.DELETEUSER_REQUEST };
  }
  function success() {
    return { type: types.DELETEUSER_SUCCESS, id };
  }
  function failure(error) {
    return { type: types.DELETEUSER_FAILURE, error };
  }

  return (dispatch) => {
    dispatch(request());

    services.deleteUser(id).then(
      () => dispatch(success(id)),
      (error) => {
        dispatch(failure(error.toString()));
      }
    );
  };
}

function editUser(id, fields) {
  function request() {
    return { type: types.EDITUSER_REQUEST };
  }
  function success(userId, userFields) {
    return { type: types.EDITUSER_SUCCESS, userId, userFields };
  }
  function failure(error) {
    return { type: types.EDITUSER_FAILURE, error };
  }

  return (dispatch) => {
    dispatch(request(fields));

    services.editUser(id, fields).then(
      () => dispatch(success(id, fields)),
      (error) => {
        dispatch(failure(error.toString()));
      }
    );
  };
}

const userActions = {
  getUsersByPage,
  getUserById,
  deleteUser,
  editUser,
};
export default userActions;
