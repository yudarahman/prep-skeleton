import { encrypt } from '@/lib/encryptor';

import { apiEndpoint } from '@/constants/endpoints';
import { API_METHOD } from '@/constants/apiMethod';
import { DATABASE_KEY } from '@/constants/database';

import { base } from './base';

const user = base.injectEndpoints({
  endpoints: (builder) => ({
    getMe: builder.query<AUserMeResponse, undefined>({
      query: () => ({
        url: apiEndpoint.user.getMe,
        headers: { _id: encrypt(DATABASE_KEY.ME) },
        method: API_METHOD.GET
      })
    }),
    getUsers: builder.query<AResponseUsers, unknown>({
      query: (params?: AParams<string>) => ({
        url: apiEndpoint.user.list,
        method: API_METHOD.GET,
        params: params
          ? { ...params }
          : undefined
      })
    }),
    getUserById: builder.query<
      AUser,
      {
        id?: string,
        params?: AParams<string>
      }
    >({
      query: ({ id, params }) => ({
        url: `${apiEndpoint.user.list}/${id}`,
        method: API_METHOD.GET,
        params: params
          ? { ...params }
          : undefined
      })
    }),
    postUser: builder.mutation<ABaseSuccessResponse, AUserBody>({
      query: (body: AUserBody) => ({
        url: apiEndpoint.user.list,
        method: API_METHOD.POST,
        body
      })
    }),
    putUser: builder.mutation<
      ABaseSuccessResponse,
      {
        id: string,
        body: AUserBody
      }
    >({
      query: ({ id, body }) => ({
        url: `${apiEndpoint.user.list}/${id}`,
        method: API_METHOD.PUT,
        body
      })
    }),
    patchUser: builder.mutation<
      ABaseSuccessResponse,
      {
        id: string,
        body: AUserBody
      }
    >({
      query: ({ id, body }) => ({
        url: `${apiEndpoint.user.list}/${id}`,
        method: API_METHOD.PATCH,
        body
      })
    })
  })
});

export const {
  useLazyGetMeQuery,
  useGetUsersQuery,
  useGetUserByIdQuery,
  usePostUserMutation,
  usePutUserMutation,
  usePatchUserMutation
} = user;