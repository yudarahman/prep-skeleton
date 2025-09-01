import {
  HttpResponse,
  PathParams,
  http
} from 'msw';

import { apiEndpoint } from '@/constants/endpoints';

const auth = [
  http.post<PathParams>(
    `*/api/v1/${apiEndpoint.auth.login}`,
    async ({ request }) => {
      const body = await request.json() as AAuthBody;
      const { username } = body;
      
      switch (username) {
        case 'not-user': {
          return HttpResponse.json(
              {
                code: 401,
                status: 401,
                title: 'Unauthorized',
                message: 'You dont have access to this server',
                detail: null
              } satisfies ABaseErrorResponse,
              { status: 401 }
          );
        }
        case 'user': {
          return HttpResponse.json(
              {
                userId: 'some-user-id',
                token: 'some-token-for-user',
                refreshToken: 'some-refresh-token-for-user'
              } satisfies AAuthResponse,
              { status: 200 });
        }
        default: {
          return HttpResponse.json({}, { status: 404 });
        }
      }
    }
  ),
  http.post<PathParams>(
    `*/api/v1/${apiEndpoint.auth.logout}`,
    async () => {
      return HttpResponse.json(
        undefined,
        { status: 201 }
      );
    }
  )
];

export { auth };