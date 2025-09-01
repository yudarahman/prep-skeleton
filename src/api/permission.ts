import { apiEndpoint } from '@/constants/endpoints';
import { API_METHOD } from '@/constants/apiMethod';

import { base } from './base';

const permissions = base.injectEndpoints({
  endpoints: (builder) => ({
    getPermissions: builder.query<AResponsePermissions, unknown>({
      query: (params?: AParams<string>) => ({
        url: apiEndpoint.permission.list,
        method: API_METHOD.GET,
        params: params
          ? { ...params }
          : undefined
      })
    }),
    getPermissionByRoleId: builder.query<
      APermissions,
      {
        roleId?: string,
        params?: AParams<string>
      }
    >({
      query: ({ roleId, params }) => ({
        url: `${apiEndpoint.permission.list}/${roleId}`,
        method: API_METHOD.GET,
        params: params
          ? { ...params }
          : undefined
      })
    }),
    putPermissionByRoleId: builder.mutation<
      ABaseSuccessResponse,
      {
        roleId: string,
        body: APermissions
      }
    >({
      query: ({ roleId, body }) => ({
        url: `${apiEndpoint.permission.list}/${roleId}`,
        method: API_METHOD.PUT,
        body
      })
    })
  })
});

export const {
  useGetPermissionsQuery,
  useGetPermissionByRoleIdQuery,
  usePutPermissionByRoleIdMutation
} = permissions;