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
  useGetRolesQuery,
  useGetRoleByIdQuery,
  usePostRoleMutation,
  usePutRoleMutation,
  usePatchRoleMutation
} from '@/api/roles';
import { wrapper } from '@/mocks/ReduxProviderMock';

describe('@/api/roles.ts', () => {
  it('should return expected value when "useGetRolesQuery" called without params', async () => {
    vi.spyOn(Database.prototype, 'getData')
      .mockResolvedValue({
        _id: 'some-auth-id',
        value: { token: 'some-token' }
      });

    const { result } = renderHook(() => useGetRolesQuery(undefined), { wrapper });
    
    await waitFor(() => {
      const { data } = result.current;
      expect(data?.data[0].name).toBe('Some Name 1');
    });
  });

  it('should return expected value when "useGetRolesQuery" called with params', async () => {
    vi.spyOn(Database.prototype, 'getData')
      .mockResolvedValue({
        _id: 'some-auth-id',
        value: { token: 'some-token' }
      });

    const { result } = renderHook(() => useGetRolesQuery({ filters: 'name@=some-name-1' }), { wrapper });

    await waitFor(() => {
      const { data } = result.current;
      expect(data?.data[0].name).toBe('Some Name 1');
    });
  });

  it('should return expected value when "useGetRoleByIdQuery" called without params', async () => {
    vi.spyOn(Database.prototype, 'getData')
      .mockResolvedValue({
        _id: 'some-auth-id',
        value: { token: 'some-token' }
      });

    const { result } = renderHook(() => useGetRoleByIdQuery({ id: 'some-id' }), { wrapper });

    await waitFor(() => {
      const { data } = result.current;
      expect(data?.name).toBe('Some Role Name');
    });
  });

  it('should return expected value when "useGetRoleByIdQuery" called with params', async () => {
    vi.spyOn(Database.prototype, 'getData')
      .mockResolvedValue({
        _id: 'some-auth-id',
        value: { token: 'some-token' }
      });

    const { result } = renderHook(() => useGetRoleByIdQuery({ id: 'some-id', params: { filters: 'name@=some-name-1' } }), { wrapper });

    await waitFor(() => {
      const { data } = result.current;
      expect(data?.name).toBe('Some Role Name With Filters');
    });
  });

  it('should return expected value when "usePostRoleMutation" called', async () => {
    vi.spyOn(Database.prototype, 'getData')
      .mockResolvedValue({
        _id: 'some-auth-id',
        value: { token: 'some-token' }
      });

    const { result } = renderHook(() => usePostRoleMutation(), { wrapper });
    const [postRole] = result.current;

    await act(async () => {
      const { data } = await vi.waitUntil(() => postRole({ name: 'Some Role Again', isActive: true }));
      expect(data!.title).toBe('Success!');
    });
  });

  it('should return expected value when "usePutRoleMutation" called', async () => {
    vi.spyOn(Database.prototype, 'getData')
      .mockResolvedValue({
        _id: 'some-auth-id',
        value: { token: 'some-token' }
      });

    const { result } = renderHook(() => usePutRoleMutation(), { wrapper });
    const [putRole] = result.current;

    await act(async () => {
      const { data } = await vi.waitUntil(() => putRole({
        id: 'some-id',
        body: { name: 'Some Role Again', isActive: true }
      }));
      expect(data!.title).toBe('Success!');
    });
  });

  it('should return expected value when "usePatchRoleMutation" called', async () => {
    vi.spyOn(Database.prototype, 'getData')
      .mockResolvedValue({
        _id: 'some-auth-id',
        value: { token: 'some-token' }
      });

    const { result } = renderHook(() => usePatchRoleMutation(), { wrapper });
    const [patchRole] = result.current;

    await act(async () => {
      const { data } = await vi.waitUntil(() => patchRole({
        id: 'some-id',
        body: { name: 'Some Role Again', isActive: false }
      }));
      expect(data!.title).toBe('Success!');
    });
  });
});