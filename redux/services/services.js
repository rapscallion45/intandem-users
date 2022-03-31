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

export function getUsersByPage(page, perPage) {
  const requestOptions = {
    method: 'GET',
  };

  return fetch(
    `https://reqres.in/api/users?page=${page || 1}&per_page=${perPage}`,
    requestOptions
  ).then(handleResponse);
}

const services = {
  getUsersByPage,
};
export default services;
