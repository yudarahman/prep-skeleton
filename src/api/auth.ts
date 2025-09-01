import { encrypt } from '@/lib/encryptor';

import { apiEndpoint } from '@/constants/endpoints';
import { API_METHOD } from '@/constants/apiMethod';
import { DATABASE_KEY } from '@/constants/database';

import { base } from './base';

const auth = base.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<AAuthResponse, AAuthBody>({
      query: (body) => ({
        url: apiEndpoint.auth.login,
        /**
         * @prop headers
         * @requires { _id: string }
         * as its value if you want to save the response to database
         * don't forget to `encrypt` it, because header is exposed
         * */
        headers: { _id: encrypt(DATABASE_KEY.AUTH) },
        method: API_METHOD.POST,
        body
      })
    }),
    logout: builder.mutation<unknown, undefined>({
      query: () => ({
        url: apiEndpoint.auth.logout,
        method: API_METHOD.POST
      })
    })
  })
});

export const {
  useLoginMutation,
  useLogoutMutation
} = auth;