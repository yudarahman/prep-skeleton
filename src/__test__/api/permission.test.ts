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
  useGetPermissionsQuery,
  useGetPermissionByRoleIdQuery,
  usePutPermissionByRoleIdMutation
} from '@/api/permission';
import { wrapper } from '@/mocks/ReduxProviderMock';

describe('@/api/permission.ts', () => {
  it('should return expected value when "useGetPermissionsQuery" called without params', async () => {
    vi.spyOn(Database.prototype, 'getData')
      .mockResolvedValue({
        _id: 'some-auth-id',
        value: { token: 'some-token' }
      });

    const { result } = renderHook(() => useGetPermissionsQuery(undefined), { wrapper });

    await waitFor(() => {
      const { data } = result.current;
      expect(data?.data[0].name).toBe('Some Permission 1');
    });
  });

  it('should return expected value when "useGetPermissionsQuery" called with params', async () => {
    vi.spyOn(Database.prototype, 'getData')
      .mockResolvedValue({
        _id: 'some-auth-id',
        value: { token: 'some-token' }
      });

    const { result } = renderHook(() => useGetPermissionsQuery({ filters: 'name@=some-permission' }), { wrapper });

    await waitFor(() => {
      const { data } = result.current;
      expect(data?.data[0].name).toBe('Some Permission 1');
    });
  });

  it('should return expected value when "useGetPermissionByRoleIdQuery" called without params', async () => {
    vi.spyOn(Database.prototype, 'getData')
      .mockResolvedValue({
        _id: 'some-auth-id',
        value: { token: 'some-token' }
      });

    const { result } = renderHook(() => useGetPermissionByRoleIdQuery({ roleId: 'some-role-id' }), { wrapper });

    await waitFor(() => {
      const { data } = result.current;
      expect(data?.name).toBe('Some Permission 1');
    });
  });

  it('should return expected value when "useGetPermissionByRoleIdQuery" called with params', async () => {
    vi.spyOn(Database.prototype, 'getData')
      .mockResolvedValue({
        _id: 'some-auth-id',
        value: { token: 'some-token' }
      });

    const { result } = renderHook(() => useGetPermissionByRoleIdQuery({
      roleId: 'some-role-id',
      params: { filters: 'name@=some-permission' }
    }), { wrapper });

    await waitFor(() => {
      const { data } = result.current;
      expect(data?.name).toBe('Some Permission 1');
    });
  });
  
  it('should return expected value when "usePutPermissionByRoleIdMutation" called', async () => {
    vi.spyOn(Database.prototype, 'getData')
      .mockResolvedValue({
        _id: 'some-auth-id',
        value: { token: 'some-token' }
      });
    
    const { result } = renderHook(() => usePutPermissionByRoleIdMutation(), { wrapper });
    const [putPermission] = result.current;

    await act(async () => {
      const { data } = await vi.waitUntil(() => putPermission({
        roleId: 'some-id',
        body: {
          'name': 'Developer',
          'isActive': true,
          'id': '388ce90c-976f-4c83-1131-08dcd163bb75',
          'createdAt': '',
          'createdBy': '',
          'permissions': [
            {
              'id': '1ddc3557-ade3-42a2-1b83-08dce8e6525c',
              'menuId': '8f735cdf-bd01-4ae3-89c6-b122bdd59b8b',
              'parentMenuId': null,
              'menuLabel': 'Dashboard',
              'menuSlug': null,
              'menuLevel': 0,
              'menuOrder': 0,
              'canView': true,
              'canUpdate': false,
              'canCreate': false,
              'canDelete': false,
              'level': 1,
              'children': []
            },
            {
              'id': 'be1af7a2-9e2e-46c3-1b84-08dce8e6525c',
              'menuId': 'f0663ca2-ffb8-42c2-b022-38479c7c84af',
              'parentMenuId': null,
              'menuLabel': 'Settings',
              'menuSlug': null,
              'menuLevel': 0,
              'menuOrder': 5,
              'level': 1,
              'canView': true,
              'canUpdate': false,
              'canCreate': false,
              'canDelete': false,
              'children': [
                {
                  'id': '2e6a0c7c-17f7-40e9-1b85-08dce8e6525c',
                  'menuId': '5026c85e-04f4-4d65-9fd2-bff26ad90013',
                  'parentMenuId': 'f0663ca2-ffb8-42c2-b022-38479c7c84af',
                  'menuLabel': 'User',
                  'menuSlug': null,
                  'menuLevel': 1,
                  'menuOrder': 0,
                  'level': 1,
                  'canView': true,
                  'canUpdate': false,
                  'canCreate': false,
                  'canDelete': false
                },
                {
                  'id': '210b24ae-ad1a-4d90-1b86-08dce8e6525c',
                  'menuId': 'f45e2f20-e6c3-4d82-b0d9-e91469103672',
                  'parentMenuId': 'f0663ca2-ffb8-42c2-b022-38479c7c84af',
                  'menuLabel': 'Role & Permission',
                  'menuSlug': null,
                  'menuLevel': 1,
                  'menuOrder': 2,
                  'level': 1,
                  'canView': true,
                  'canUpdate': false,
                  'canCreate': false,
                  'canDelete': false
                }
              ]
            }
          ]
        }
      }));

      expect(data!.title).toBe('Success!');
    });
  });
});