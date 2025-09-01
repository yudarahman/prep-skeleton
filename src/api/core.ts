import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  fetchBaseQuery
} from '@reduxjs/toolkit/query/react';

import Database from '@/store/database/base';
import { encrypt } from '@/lib/encryptor';

import { apiEndpoint } from '@/constants/endpoints';
import { API_METHOD } from '@/constants/apiMethod';
import { DATABASE_KEY } from '@/constants/database';

const db = new Database<Record<string, string>>();

const rtkqBase = fetchBaseQuery({
  baseUrl: `${import.meta.env.VITE_BASE_URL}`,
  timeout: 30000,
  prepareHeaders: async (headers, { endpoint }) => {
    if (endpoint !== 'login') {
      const { value: { token } } = await db.getData(DATABASE_KEY.AUTH);
      headers.set('Authorization', `Bearer ${token}`);

      return headers;
    }

    return headers;
  }
});

const coreQuery: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let response = await rtkqBase(args, api, extraOptions);
  
  switch (true) {
    // Expired Token
    case Boolean(response.error) && response.error?.status === 401: {
      switch (true) {
        // Do not try to 'refresh-token' if path pointed to 'auth/login'
        case (args as FetchArgs)?.url === apiEndpoint.auth.login:
          return response;
        default: {
          const {
            value: {
              token,
              refreshToken
            }
          } = await db.getData(DATABASE_KEY.AUTH);

          const refreshResponse = await rtkqBase(
            {
              url: apiEndpoint.auth.refreshToken,
              /**
               * @prop headers
               * @requires { _id: string }
               * as its value if you want to save the response to database
               * don't forget to `encrypt` it, because header is exposed
               * */
              headers: { _id: encrypt(DATABASE_KEY.AUTH) },
              method: API_METHOD.POST,
              body: { token, refreshToken }
            },
            api,
            extraOptions
          );

          if (refreshResponse.error) {
            const logoutResponse = await rtkqBase(
              {
                url: apiEndpoint.auth.logout,
                method: API_METHOD.POST
              },
              api,
              extraOptions
            );
            await db.deleteDatabase();
            window.location.replace('/login');

            return logoutResponse;
          }

          response = await rtkqBase(args, api, extraOptions);

          return response;
        }
      }
    }
    default:
      return response;
  }
};

export { coreQuery };