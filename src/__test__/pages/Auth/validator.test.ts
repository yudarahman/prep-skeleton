import {
  describe,
  expect,
  it
} from 'vitest';

import { validation } from '@/pages/Auth/validator';

describe('pages/Auth/validator.ts', () => {
  it('should match with validation', async () => {
    const source = { username: 'user', password: 'user-password' };
    const result = validation.validate(source);

    await expect(result).resolves.toBeTruthy();
  });

  it('should throw error when username is empty', () => {
    const source = { username: '', password: 'user-password' };
    const result = validation.validate(source);

    expect(result).rejects.toThrow();
  });

  it('should throw error when password is empty', () => {
    const source = { username: 'user', password: '' };
    const result = validation.validate(source);

    expect(result).rejects.toThrow();
  });
});