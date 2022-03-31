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

const userActions = {
  getUsersByPage,
  deleteUser,
};
export default userActions;