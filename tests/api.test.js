import { createMocks } from 'node-mocks-http';
import userHandler from '../pages/api/users/[id]';
import userMock from '../__mocks__/userMock';

/* eslint-disable no-underscore-dangle */

describe('API Routes', () => {
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
});
