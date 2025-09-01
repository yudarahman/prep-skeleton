import { apiEndpoint } from '@/constants/endpoints';
import { API_METHOD } from '@/constants/apiMethod';

import { base } from './base';

const menus = base.injectEndpoints({
  endpoints: (builder) => ({
    getMenus: builder.query<AResponseMenus, unknown>({
      query: (params?: AParams<string>) => ({
        url: apiEndpoint.menu.list,
        method: API_METHOD.GET,
        params
      })
    })
  })
});

export const { useGetMenusQuery } = menus;