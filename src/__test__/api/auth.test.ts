import {
  describe,
  expect,
  it,
  vi
} from 'vitest';
import {
  act,
  renderHook
} from '@testing-library/react';

import Database from '@/store/database/base';
import {
  useLoginMutation,
  useLogoutMutation
} from '@/api/auth';
import { wrapper } from '@/mocks/ReduxProviderMock';

describe('@/api/auth.ts', () => {
  it('should render expected value when "login" succeed', async () => {
    vi.spyOn(Database.prototype, 'putData')
      .mockResolvedValue({
        id: 'some-login-id',
        rev: 'some-login-rev',
        ok: true
      });
    
    vi.spyOn(Database.prototype, 'getData')
      .mockResolvedValue({
        _id: 'some-login-id',
        value: {
          userId: 'some-user-id',
          token: 'some-token-for-user',
          refreshToken: 'some-refresh-token-for-user'   
        }
      });
    
    const { result } = renderHook(() => useLoginMutation(), { wrapper });
    const [login] = result.current;
    
    await act(async () => {
      const { data } = await vi.waitUntil(
        () => login({
          username: 'user',
          password: 'user-password'
        })
      );

      expect(data!.token).toBe('some-token-for-user');
    });
  });

  it('should render expected element when "logout" fired', async () => {
    vi.spyOn(Database.prototype, 'getData')
      .mockResolvedValue({
        _id: 'some-login-id',
        value: { token: 'some-token' }
      });

    const { result } = renderHook(() => useLogoutMutation(), { wrapper });
    const [logout] = result.current;
    
    await act(async () => {
      const { data } = await vi.waitUntil(() => logout(undefined));
      expect(data).toBeNull();
    });
  });
});