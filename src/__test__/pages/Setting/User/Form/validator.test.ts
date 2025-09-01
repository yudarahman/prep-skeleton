import {
  describe,
  expect,
  it
} from 'vitest';

import { validation } from '@/pages/Setting/User/Form/validator';

describe('@/pages/Setting/User/Form/validator.ts', () => {
  it('should resolve with expected value in "create" mode', async () => {
    const source = {
      username: 'some_username',
      password: 'some_password',
      fullname: 'Some Full Name',
      email: 'some_email@email.com',
      userRoles: [{ id: 'some-role-id', name: 'Some Role' }]
    };
    
    const result = validation('create').validate(source);
    
    await expect(result).resolves.toBeTruthy();
  });

  it('should reject in "create" mode', async () => {
    const source = {
      username: '',
      fullname: 'Some Full Name',
      email: 'some_email',
      userRoles: [{ id: 'some-role-id', name: 'Some Role' }]
    };

    const result = validation('create').validate(source);

    await expect(result).rejects.toThrow();
  });

  it('should resolve with expected value in "edit" mode', async () => {
    const source = {
      username: 'some_username',
      fullname: 'Some Full Name',
      email: 'some_email@email.com',
      userRoles: [{ id: 'some-role-id', name: 'Some Role' }]
    };

    const result = validation('edit').validate(source);

    await expect(result).resolves.toBeTruthy();
  });

  it('should reject in "edit" mode', async () => {
    const source = {
      username: '',
      fullname: 'Some Full Name',
      email: 'some_email',
      userRoles: [{ id: 'some-role-id', name: 'Some Role' }]
    };

    const result = validation('edit').validate(source);

    await expect(result).rejects.toThrow();
  });
});