import {
  HttpResponse,
  PathParams,
  http
} from 'msw';
import { isEmpty } from 'lodash';

import { apiEndpoint } from '@/constants/endpoints';

const roles = [
  http.get<PathParams>(
    `*/api/v1/${apiEndpoint.roles.list}`,
    async () => {
      return HttpResponse.json(
          {
            page: 1,
            totalPages: 1,
            totalData: 3,
            data: [
              {
                id: 'some-id-1',
                isActive: true,
                name: 'Some Name 1'
              },
              {
                id: 'some-id-2',
                isActive: true,
                name: 'Some Name 2'
              },
              {
                id: 'some-id-3',
                isActive: true,
                name: 'Some Name 3'
              }
            ] 
          } satisfies AResponseRoles,
          { status: 200 }
      );
    }
  ),
  http.get<PathParams>(
    `*/api/v1/${apiEndpoint.roles.list}/:id`,
    async ({ params, request }) => {
      const { id } = params;
      const url = new URL(request.url);
      const filters = url.searchParams.get('filters');

      if (!isEmpty(filters)) {
        return HttpResponse.json(
          {
            id: id as string,
            isActive: true,
            name: 'Some Role Name With Filters'
          } satisfies ARoles,
          { status: 200 }
        );
      }

      return HttpResponse.json(
        {
          id: id as string,
          isActive: true,
          name: 'Some Role Name'
        } satisfies ARoles,
        { status: 200 }
      );
    }
  ),
  http.post<PathParams>(
    `*/api/v1/${apiEndpoint.roles.list}`,
    async () => {
      return HttpResponse.json(
          {
            code: 20001,
            status: 200,
            title: 'Success!',
            message: 'Role has been created successfully.'
          } satisfies ABaseSuccessResponse,
          { status: 200 }
      );
    }
  ),
  http.put<PathParams>(
    `*/api/v1/${apiEndpoint.roles.list}/:id`,
    async () => {
      return HttpResponse.json(
        {
          code: 20001,
          status: 200,
          title: 'Success!',
          message: 'Role has been edited successfully.'
        } satisfies ABaseSuccessResponse,
        { status: 200 }
      );
    }
  ),
  http.patch<PathParams>(
    `*/api/v1/${apiEndpoint.roles.list}/:id`,
    async () => {
      return HttpResponse.json(
          {
            code: 20001,
            status: 200,
            title: 'Success!',
            message: 'Role has been edited successfully.'
          } satisfies ABaseSuccessResponse,
          { status: 200 }
      );
    }
  )
];

export { roles };