import { getUserById, editUser, deleteUser } from '../../../lib/api';

export default async function handler(req, res) {
  /* get req params */
  const { query, method } = req;

  /* determine which request type this is */
  switch (method) {
    case 'GET':
      /* call api with GET request */
      try {
        const response = await getUserById(query.id);
        const data = await response.json();

        /* send back server response */
        if (data) {
          return res.status(200).json(data);
        }
        return res.status(400).json({ message: 'User request failed.' });
      } catch (error) {
        return res.status(501).json({
          message: 'Oops, something went wrong with the request.',
          error,
        });
      }
    case 'PUT':
      /* call api with PUT request */
      try {
        const response = await editUser(query.id, query.fields);

        /* send back server response */
        if (response.status === 200) {
          return res.status(200).json({ message: 'User updated.' });
        }
        return res.status(400).json({ message: 'Failed to edit user.' });
      } catch (error) {
        return res.status(501).json({
          message: 'Oops, something went wrong with the request.',
          error,
        });
      }
    case 'DELETE':
      /* call api with DELETE request */
      try {
        const response = await deleteUser(query.id);

        /* send back server response */
        if (response.status === 204) {
          return res.status(200).json({ message: 'User deleted.' });
        }
        return res.status(400).json({ message: 'Failed to delete user.' });
      } catch (error) {
        return res.status(501).json({
          message: 'Oops, something went wrong with the request.',
          error,
        });
      }
    default:
      /* Return 404 if someone pings the API with an unsupported method */
      return res.status(404).send('Not found');
  }
}
