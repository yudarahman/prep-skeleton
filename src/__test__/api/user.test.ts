import {
  describe,
  expect,
  it,
  vi
} from 'vitest';
import {
  act,
  renderHook,
  waitFor
} from '@testing-library/react';

import Database from '@/store/database/base';
import {
  useLazyGetMeQuery,
  useGetUsersQuery,
  useGetUserByIdQuery,
  usePostUserMutation,
  usePutUserMutation,
  usePatchUserMutation
} from '@/api/user';
import { wrapper } from '@/mocks/ReduxProviderMock';

describe('@/api/user.ts', () => {
  it('should render expected value when "useLazyGetMeQuery" succeed', async () => {
    // setup token for "prepareHeaders"
    vi.spyOn(Database.prototype, 'getData')
      .mockResolvedValue({
        _id: 'some-auth-id',
        value: { token: 'some-token' }
      });
    
    vi.spyOn(Database.prototype, 'putData')
      .mockResolvedValue({
        id: 'some-user-id',
        rev: 'some-user-rev',
        ok: true
      });

    // because "getMe" call RTKQ "Middleware"
    // so we should mock data from database
    vi.spyOn(Database.prototype, 'getData')
      .mockResolvedValue({
        _id: 'some-user-id',
        value: {
          id: 'some-id',
          isActive: true,
          username: 'some_name',
          lastLogin: '',
          domain: null,
          defaultLandingPage: null,
          fullname: 'Some Name',
          email: 'some-user@email.com',
          roles: [{ id: 'some-user-id', name: 'Some Role Name' }]
        }
      });
    
    const { result } = renderHook(() => useLazyGetMeQuery(), { wrapper });
    const [getMe] = result.current;

    await act(async () => {
      const data = await vi.waitUntil(() => getMe(undefined).unwrap());
      expect(data.fullname).toBe('Some Name');
    });
  });

  it('should render expected value when "useGetUsersQuery" without "params" succeed', async () => {
    vi.spyOn(Database.prototype, 'getData')
      .mockResolvedValue({
        _id: 'some-auth-id',
        value: { token: 'some-token' }
      });

    const { result } = renderHook(() => useGetUsersQuery(undefined), { wrapper });

    await waitFor(() => {
      const { data } = result.current;
      expect(data?.data[0].fullname).toBe('Some Name');
    });
  });

  it('should render expected value when "useGetUsersQuery" with "params" succeed', async () => {
    vi.spyOn(Database.prototype, 'getData')
      .mockResolvedValue({
        _id: 'some-auth-id',
        value: { token: 'some-token' }
      });

    const { result } = renderHook(() => useGetUsersQuery({ filters: 'name@=some-filtered-name' }), { wrapper });

    await waitFor(() => {
      const { data } = result.current;
      expect(data?.data[0].fullname).toBe('Some Filtered Name');
    });
  });

  it('should return expected value when "useGetUserByIdQuery" called without params', async () => {
    vi.spyOn(Database.prototype, 'getData')
      .mockResolvedValue({
        _id: 'some-auth-id',
        value: { token: 'some-token' }
      });

    const { result } = renderHook(() => useGetUserByIdQuery({ id: 'some-id' }), { wrapper });

    await waitFor(() => {
      const { data } = result.current;
      expect(data?.fullname).toBe('Some Fullname');
    });
  });

  it('should return expected value when "useGetUserByIdQuery" called with params', async () => {
    vi.spyOn(Database.prototype, 'getData')
      .mockResolvedValue({
        _id: 'some-auth-id',
        value: { token: 'some-token' }
      });

    const { result } = renderHook(() => useGetUserByIdQuery({ id: 'some-id', params: { filters: 'name@=some-name' } }), { wrapper });

    await waitFor(() => {
      const { data } = result.current;
      expect(data?.fullname).toBe('Some Fullname with filter');
    });
  });

  it('should return expected value when "usePostUserMutation" called', async () => {
    vi.spyOn(Database.prototype, 'getData')
      .mockResolvedValue({
        _id: 'some-auth-id',
        value: { token: 'some-token' }
      });

    const { result } = renderHook(() => usePostUserMutation(), { wrapper });
    const [postUser] = result.current;

    await act(async () => {
      const { data } = await vi.waitUntil(() => postUser({
        username: 'test-username',
        fullname: 'Test Name',
        email: 'test@email.com',
        domain: '',
        userRoles: [{ id: 'some-role-id', name: 'Some Role Name' }],
        isActive: false
      }));

      expect(data!.title).toBe('Success!');
    });
  });

  it('should return expected value when "usePutUserMutation" called', async () => {
    vi.spyOn(Database.prototype, 'getData')
      .mockResolvedValue({
        _id: 'some-auth-id',
        value: { token: 'some-token' }
      });

    const { result } = renderHook(() => usePutUserMutation(), { wrapper });
    const [putUser] = result.current;

    await act(async () => {
      const { data } = await vi.waitUntil(() => putUser({
        id: 'some-id',
        body: {
          username: 'test-username',
          fullname: 'Test Name',
          email: 'test@email.com',
          domain: '',
          userRoles: [{id: 'some-role-id', name: 'Some Role Name'}],
          isActive: false
        }
      }));

      expect(data!.title).toBe('Success!');
    });
  });

  it('should return expected value when "usePatchUserMutation" called', async () => {
    vi.spyOn(Database.prototype, 'getData')
      .mockResolvedValue({
        _id: 'some-auth-id',
        value: { token: 'some-token' }
      });

    const { result } = renderHook(() => usePatchUserMutation(), { wrapper });
    const [patchUser] = result.current;

    await act(async () => {
      const { data } = await vi.waitUntil(() => patchUser({
        id: 'some-id',
        body: { isActive: false }
      }));
      
      expect(data!.title).toBe('Success!');
    });
  });
});