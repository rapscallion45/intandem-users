import { getUsersByPage, createUser } from '../../lib/api';

export default async function handler(req, res) {
  /* get req params */
  const { query, method } = req;

  /* determine which request type this is */
  switch (method) {
    case 'GET':
      /* call api */
      try {
        const response = await getUsersByPage(query.page, query.perPage);
        const data = await response.json();

        /* send back server response */
        if (response.status === 200) {
          return res.status(200).json(data);
        }
        return res.status(400).json(data);
      } catch (error) {
        return res.status(501).json({
          message: 'Oops, something went wrong with the request.',
          error,
        });
      }
    case 'POST':
      /* call api */
      try {
        const response = await createUser({
          first_name: query.first_name,
          last_name: query.last_name,
          email: query.email,
        });
        const data = await response.json();

        /* send back server response */
        if (response.status === 200) {
          return res.status(200).json(data);
        }
        return res.status(400).json(data);
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
