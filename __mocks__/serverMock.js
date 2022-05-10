import { setupServer } from 'msw/node';
import { serverMockHandlers } from './serverMockHandlers';

const server = setupServer(...serverMockHandlers);
export default server;
