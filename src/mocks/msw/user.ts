import {
  HttpResponse,
  PathParams,
  http
} from 'msw';
import { isEmpty } from 'lodash';

import { apiEndpoint } from '@/constants/endpoints';

const user = [
  http.get<PathParams>(
    `*/api/v1/${apiEndpoint.user.getMe}`,
    async () => {
      return HttpResponse.json(
        {
          id: 'some-id',
          isActive: true,
          username: 'some_name',
          lastLogin: '',
          domain: null,
          defaultLandingPage: null,
          fullname: 'Some Name',
          email: 'some-user@email.com',
          roles: [{ id: 'some-user-id', name: 'Some Role Name' }]
        } satisfies AUserMeResponse,
        { status: 200 }
      );
    }
  ),
  http.get<PathParams>(
    `*/api/v1/${apiEndpoint.user.list}`,
    async ({ request }) => {
      const url = new URL(request.url);
      const filters = url.searchParams.get('filters');
      
      if (!isEmpty(filters)) {
        return HttpResponse.json(
            {
              page: 1,
              totalPages: 1,
              totalData: 1,
              data: [
                {
                  id: 'some-filtered-id-1',
                  isActive: true,
                  email: 'some-filtered-email@email.com',
                  username: 'some-filtered-user',
                  password: 'some-password',
                  domain: 'some filtered domain',
                  division: null,
                  department: null,
                  workLocation: null,
                  company: null,
                  fullname: 'Some Filtered Name',
                  lastLogin: '2024-01-01T08:00:00.000Z',
                  userRoles: [
                    {
                      id: 'some-id-1',
                      role: { id: 'some-role-id', name: 'Some Role Name'  }
                    }
                  ]
                }
              ]
            } satisfies AResponseUsers,
            { status: 200 }
        );
      }
      
      return HttpResponse.json(
          {
            page: 1,
            totalPages: 1,
            totalData: 1,
            data: [
              {
                id: 'some-id-1',
                isActive: true,
                email: 'some-email@email.com',
                username: 'some-user',
                password: 'some-password',
                domain: 'some domain',
                division: null,
                department: null,
                workLocation: null,
                company: null,
                fullname: 'Some Name',
                lastLogin: '2024-01-01T08:00:00.000Z',
                userRoles: [
                  {
                    id: 'some-role-id-1',
                    role: { id: 'some-role-id', name: 'Some Role Name'  }
                  }
                ]
              }
            ]
          } satisfies AResponseUsers,
          { status: 200 }
      );
    }
  ),
  http.get<PathParams>(
    `*/api/v1/${apiEndpoint.user.list}/:id`,
    async ({ params, request }) => {
      const { id } = params;
      const url = new URL(request.url);
      const filters = url.searchParams.get('filters');

      if (!isEmpty(filters)) {
        return HttpResponse.json(
            {
              id: id as string,
              isActive: true,
              email: 'some-email-with-filter@email.com',
              username: 'some-username-with-filter',
              password: 'some-password-with-filter',
              domain: null,
              division: null,
              department: null,
              workLocation: null,
              company: null,
              fullname: 'Some Fullname with filter',
              lastLogin: null,
              userRoles: [
                {
                  id: 'some-role-with-filter-id',
                  role: { id: 'some-role-id', name: 'Some Role Name'  }
                }
              ]
            } satisfies AUser,
            { status: 200 }
        );
      }

      return HttpResponse.json(
          {
            id: id as string,
            isActive: true,
            email: 'some-email@email.com',
            username: 'some-username',
            password: 'some-password',
            domain: null,
            division: null,
            department: null,
            workLocation: null,
            company: null,
            fullname: 'Some Fullname',
            lastLogin: null,
            userRoles: [
              {
                id: 'some-role-id',
                role: { id: 'some-role-id', name: 'Some Role Name'  }
              }
            ]
          } satisfies AUser,
          { status: 200 }
      );
    }
  ),
  http.post<PathParams>(
    `*/api/v1/${apiEndpoint.user.list}`,
    async () => {
      return HttpResponse.json(
          {
            code: 20001,
            status: 200,
            title: 'Success!',
            message: 'User has been created successfully.'
          } satisfies ABaseSuccessResponse,
          { status: 200 }
      );
    }
  ),
  http.put<PathParams>(
    `*/api/v1/${apiEndpoint.user.list}/:id`,
    async () => {
      return HttpResponse.json(
        {
          code: 20001,
          status: 200,
          title: 'Success!',
          message: 'User has been created successfully.'
        } satisfies ABaseSuccessResponse,
        { status: 200 }
      );
    }
  ),
  http.patch<PathParams>(
    `*/api/v1/${apiEndpoint.user.list}/:id`,
    async () => {
      return HttpResponse.json(
          {
            code: 20001,
            status: 200,
            title: 'Success!',
            message: 'User has been edited successfully.'
          } satisfies ABaseSuccessResponse,
          { status: 200 }
      );
    }
  )
];

export { user };