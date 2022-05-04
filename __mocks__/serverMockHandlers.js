/**
 * Shared mock server API handlers shared between all tests
 */
import { rest } from 'msw';
import userMock from './userMock';
import usersDataMock from './usersDataMock';

const { API_URL } = process.env;

const serverMockHandlers = [
  /* Test/mock get users route */
  rest.get('/api/users', async (req, res, ctx) =>
    /* No need to test auth cookie, assume auth cookie present */
    res(ctx.status(200), ctx.json(usersDataMock))
  ),
  /* Test/mock get user by ID route */
  rest.get('/api/users/:id', async (req, res, ctx) => {
    const { id } = req.params;
    if (!id || id === undefined || id !== '7')
      return res(ctx.status(400), ctx.json({ message: 'User ID not found.' }));
    return res(ctx.status(200), ctx.json({ data: userMock }));
  }),
  /* Test/mock delete user by ID route */
  rest.delete('/api/users/:id', async (req, res, ctx) => {
    const { id } = req.params;
    if (!id || id === undefined || id !== '7')
      return res(ctx.status(400), ctx.json({ message: 'No user ID provided.' }));
    return res(ctx.status(204));
  }),
  /* Test/mock edit user by ID route */
  rest.put('/api/users/:id', async (req, res, ctx) => {
    const { id } = req.params;
    if (!id || id === undefined || id !== '7')
      return res(ctx.status(400), ctx.json({ message: 'No user ID provided.' }));
    return res(ctx.status(200));
  }),
  /* Test/mock create user route */
  rest.post('/api/users', async (req, res, ctx) => {
    const { fields } = req.body;
    if (!fields) res(ctx.status(400), ctx.json({ message: 'No user details provided.' }));
    return res(ctx.status(200));
  }),

  /* Test/mock get users route */
  rest.get(`${API_URL}/users`, async (req, res, ctx) =>
    /* No need to test auth cookie, assume auth cookie present */
    res(ctx.status(200), ctx.json(usersDataMock))
  ),
  /* Test/mock get user by ID route (remote) */
  rest.get(`${API_URL}/users/:id`, async (req, res, ctx) => {
    const { id } = req.params;
    if (!id || id === undefined || id !== '7') {
      return res(ctx.status(400), ctx.json({ message: 'User ID not found.' }));
    }
    return res(ctx.status(200), ctx.json({ data: userMock }));
  }),
  /* Test/mock delete user by ID route */
  rest.delete(`${API_URL}/users/:id`, async (req, res, ctx) => {
    const { id } = req.params;
    if (!id || id === undefined || id !== '7')
      return res(ctx.status(400), ctx.json({ message: 'User ID not found.' }));
    return res(ctx.status(204));
  }),
  /* Test/mock edit user by ID route */
  rest.put(`${API_URL}/users/:id`, async (req, res, ctx) => {
    const { id } = req.params;
    if (!id || id === undefined || id !== '7')
      return res(ctx.status(400), ctx.json({ message: 'User ID not found.' }));
    return res(ctx.status(200));
  }),
];

/* eslint-disable import/prefer-default-export */
export { serverMockHandlers };
