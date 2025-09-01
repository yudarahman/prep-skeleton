import { setupServer } from 'msw/node';

import { auth } from './auth';
import { roles } from './roles';
import { user } from './user';
import { permissions } from './permission';
import { menus } from './menu';

const mockServer = setupServer(
  ...auth,
  ...roles,
  ...user,
  ...permissions,
  ...menus
);

export { mockServer };
