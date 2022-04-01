const { API_URL } = process.env;

export async function getUsersByPage(page, perPage) {
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  };

  return fetch(`${API_URL}/users?page=${page || 1}&per_page=${perPage || 6}`, requestOptions);
}

export async function getUserById(id) {
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  };

  return fetch(`${API_URL}/users/${id}`, requestOptions);
}

export async function deleteUser(id) {
  const requestOptions = {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  };

  return fetch(`${API_URL}/users/${id}`, requestOptions);
}

export async function editUser(id, fields) {
  const requestOptions = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(fields),
  };

  return fetch(`${API_URL}/users/${id}`, requestOptions);
}
