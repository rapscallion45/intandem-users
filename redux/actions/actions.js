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

const userActions = {
  getUsersByPage,
};
export default userActions;
