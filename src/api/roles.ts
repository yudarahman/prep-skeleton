import { apiEndpoint } from '@/constants/endpoints';
import { API_METHOD } from '@/constants/apiMethod';

import { base } from './base';

const roles = base.injectEndpoints({
  endpoints: (builder) => ({
    getRoles: builder.query<AResponseRoles, unknown>({
      query: (params?: AParams<string>) => ({
        url: apiEndpoint.roles.list,
        method: API_METHOD.GET,
        params: params
          ? { ...params }
          : undefined
      })
    }),
    getRoleById: builder.query<
      ARoles,
      {
        id?: string,
        params?: AParams<string>
      }
    >({
      query: ({ id, params }) => ({
        url: `${apiEndpoint.roles.list}/${id}`,
        method: API_METHOD.GET,
        params: params
          ? { ...params }
          : undefined
      })
    }),
    postRole: builder.mutation<ABaseSuccessResponse, ARoleBody>({
      query: (body) => ({
        url: apiEndpoint.roles.list,
        method: API_METHOD.POST,
        body
      })
    }),
    putRole: builder.mutation<
      ABaseSuccessResponse,
      {
        id: string,
        body: ARoleBody
      }
    >({
      query: ({ id, body }) => ({
        url: `${apiEndpoint.roles.list}/${id}`,
        method: API_METHOD.PUT,
        body
      })
    }),
    patchRole: builder.mutation<
      ABaseSuccessResponse,
      {
        id: string,
        body: ARoleBody
      }
    >({
      query: ({ id, body }) => ({
        url: `${apiEndpoint.roles.list}/${id}`,
        method: API_METHOD.PATCH,
        body
      })
    })
  })
});

export const {
  useGetRolesQuery,
  useGetRoleByIdQuery,
  usePostRoleMutation,
  usePutRoleMutation,
  usePatchRoleMutation
} = roles;