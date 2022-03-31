function handleResponse(response) {
  return response.text().then((text) => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }

    /* check if there's a response message from server */
    if (data.message) {
      return data && data.message;
    }
    return data;
  });
}

function getUsersByPage(page, perPage) {
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  };

  return fetch(
    `https://reqres.in/api/users?page=${page || 1}&per_page=${perPage}`,
    requestOptions
  ).then(handleResponse);
}

function deleteUser(id) {
  const requestOptions = {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  };

  return fetch(`https://reqres.in/api/users/${id}`, requestOptions).then(handleResponse);
}

function editUser(id) {
  const requestOptions = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
  };

  return fetch(`https://reqres.in/api/users/${id}`, requestOptions).then(handleResponse);
}

const services = {
  getUsersByPage,
  deleteUser,
  editUser,
};
export default services;
