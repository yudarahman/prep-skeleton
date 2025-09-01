import { createApi } from '@reduxjs/toolkit/query/react';

import { coreQuery } from '@/api/core';

const base = createApi({
  // TODO : Change this path to your project's name
  reducerPath: 'boilerplate-api',
  refetchOnMountOrArgChange: true,
  keepUnusedDataFor: 0,
  baseQuery: coreQuery,
  endpoints: () => ({})
});

export { base };