import { createMocks } from 'node-mocks-http';
import userHandler from '../pages/api/users/[id]';
import usersHandler from '../pages/api/users';
import userMock from '../__mocks__/userMock';
import usersDataMock from '../__mocks__/usersDataMock';

/* eslint-disable no-underscore-dangle */

describe('API Routes', () => {
  describe('GET /api/users', () => {
    it('returns user data list', async () => {
      const { req, res } = createMocks({
        method: 'GET',
      });

      await usersHandler(req, res);

      expect(res._getStatusCode()).toBe(200);
      expect(JSON.parse(res._getData())).toEqual(expect.objectContaining(usersDataMock));
    });
  });

  describe('POST /api/users', () => {
    it('returns success message upon new user creation', async () => {
      const { req, res } = createMocks({
        method: 'POST',
        query: {
          first_name: 'John',
          last_name: 'Smith',
          email: 'john.smith@test.com',
        },
      });

      await usersHandler(req, res);

      expect(res._getStatusCode()).toBe(200);
      expect(JSON.parse(res._getData())).toEqual(
        expect.objectContaining({
          id: '811',
          createdAt: '2022-05-05T12:48:36.842Z',
        })
      );
    });

    it('returns error message if missing param', async () => {
      const { req, res } = createMocks({
        method: 'POST',
        query: {
          first_name: 'John',
          last_name: 'Smith',
          email: '',
        },
      });

      await usersHandler(req, res);

      expect(res._getStatusCode()).toBe(400);
      expect(JSON.parse(res._getData())).toEqual(
        expect.objectContaining({
          message: 'Missing param.',
        })
      );
    });
  });

  describe('GET /api/users/[id]', () => {
    it('returns specified user data from passed ID', async () => {
      const { req, res } = createMocks({
        method: 'GET',
        query: {
          id: '7',
        },
      });

      await userHandler(req, res);

      expect(res._getStatusCode()).toBe(200);
      expect(JSON.parse(res._getData())).toEqual(
        expect.objectContaining({
          data: userMock,
        })
      );
    });

    it('returns error if user ID not found', async () => {
      const { req, res } = createMocks({
        method: 'GET',
        query: {
          id: '8',
        },
      });

      await userHandler(req, res);

      expect(res._getStatusCode()).toBe(400);
      expect(JSON.parse(res._getData())).toEqual(
        expect.objectContaining({
          message: 'User ID not found.',
        })
      );
    });
  });

  describe('PUT /api/users/[id]', () => {
    it('returns updated user message for passed User ID', async () => {
      const { req, res } = createMocks({
        method: 'PUT',
        query: {
          id: '7',
          fields: { email: 'michael.lawson@reqres.in', first_name: 'Michael', last_name: 'Lawson' },
        },
      });

      await userHandler(req, res);

      expect(res._getStatusCode()).toBe(200);
      expect(JSON.parse(res._getData())).toEqual(
        expect.objectContaining({
          message: 'User updated.',
        })
      );
    });

    it('returns error message if no passed User ID', async () => {
      const { req, res } = createMocks({
        method: 'PUT',
        query: {
          id: '8',
          fields: { email: 'michael.lawson@reqres.in', first_name: 'Michael', last_name: 'Lawson' },
        },
      });

      await userHandler(req, res);

      expect(res._getStatusCode()).toBe(400);
      expect(JSON.parse(res._getData())).toEqual(
        expect.objectContaining({
          message: 'User ID not found.',
        })
      );
    });
  });

  describe('DELETE /api/users/[id]', () => {
    it('returns deleted user message for passed User ID', async () => {
      const { req, res } = createMocks({
        method: 'DELETE',
        query: {
          id: '7',
        },
      });

      await userHandler(req, res);

      expect(res._getStatusCode()).toBe(200);
      expect(JSON.parse(res._getData())).toEqual(
        expect.objectContaining({
          message: 'User deleted.',
        })
      );
    });

    it('returns error message if no passed User ID', async () => {
      const { req, res } = createMocks({
        method: 'DELETE',
        query: {
          id: '8',
        },
      });

      await userHandler(req, res);

      expect(res._getStatusCode()).toBe(400);
      expect(JSON.parse(res._getData())).toEqual(
        expect.objectContaining({
          message: 'User ID not found.',
        })
      );
    });
  });

  describe('POST /api/users/[id]', () => {
    it('returns 404 for unsupported method', async () => {
      const { req, res } = createMocks({
        method: 'POST',
        query: {
          id: '7',
        },
      });

      await userHandler(req, res);

      expect(res._getStatusCode()).toBe(404);
    });
  });

  describe('DELETE /api/users', () => {
    it('returns 404 for unsupported method', async () => {
      const { req, res } = createMocks({
        method: 'DELETE',
        query: {
          id: '7',
        },
      });

      await usersHandler(req, res);

      expect(res._getStatusCode()).toBe(404);
    });
  });

  describe('PUT /api/users', () => {
    it('returns 404 for unsupported method', async () => {
      const { req, res } = createMocks({
        method: 'PUT',
        query: {
          id: '7',
        },
      });

      await usersHandler(req, res);

      expect(res._getStatusCode()).toBe(404);
    });
  });
});
