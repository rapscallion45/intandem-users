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

  return fetch(`/api/users?page=${page || 1}&per_page=${perPage}`, requestOptions).then(
    handleResponse
  );
}

function getUserById(id) {
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  };

  return fetch(`/api/users/${id}`, requestOptions).then(handleResponse);
}

function deleteUser(id) {
  const requestOptions = {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  };

  return fetch(`/api/users/${id}`, requestOptions).then(handleResponse);
}

function editUser(id, fields) {
  const requestOptions = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(fields),
  };

  return fetch(`/api/users/${id}`, requestOptions).then(handleResponse);
}

function createUser(fields) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(fields),
  };

  return fetch(`/api/users`, requestOptions).then(handleResponse);
}

const services = {
  getUsersByPage,
  getUserById,
  deleteUser,
  editUser,
  createUser,
};
export default services;
