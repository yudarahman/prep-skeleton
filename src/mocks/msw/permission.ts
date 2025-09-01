import {
  HttpResponse,
  PathParams,
  http
} from 'msw';

import { apiEndpoint } from '@/constants/endpoints';

const permissions = [
  http.get<PathParams>(
    `*/api/v1/${apiEndpoint.permission.list}`,
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
              name: 'Some Permission 1',
              createdBy: 'some-admin',
              createdAt: '2024-01-01T00:00:00.000Z'
            },
            {
              id: 'some-id-2',
              isActive: true,
              name: 'Some Permission 2',
              createdBy: 'some-admin',
              createdAt: '2024-01-01T00:00:00.000Z'
            },
            {
              id: 'some-id-3',
              isActive: true,
              name: 'Some Permission 3',
              createdBy: 'some-admin',
              createdAt: '2024-01-01T00:00:00.000Z'
            }
          ]
        } satisfies AResponsePermissions,
        { status: 200 }
      );
    }
  ),
  http.get<PathParams>(
    `*/api/v1/${apiEndpoint.permission.list}/:roleId`,
    async () => {
      return HttpResponse.json(
          {
            id: 'some-id-1',
            isActive: true,
            name: 'Some Permission 1',
            createdBy: 'some-admin',
            createdAt: '2024-01-01T00:00:00.000Z',
            permissions: [
              {
                id: 'some-permission-id-1',
                menuId: 'some-menu-id-1',
                parentMenuId: 'some-parent-menu-id-1',
                menuLabel: 'Some Menu Label',
                menuLevel: 1,
                menuOrder: 1,
                menuSlug: null,
                level: 1,
                canView: true,
                canUpdate: true,
                canCreate: true,
                canDelete: true,
                children: []
              }
            ]
          } satisfies APermissions,
          { status: 200 }
      );
    }
  ),
  http.put<PathParams>(
    `*/api/v1/${apiEndpoint.permission.list}/:roleId`,
    async () => {
      return HttpResponse.json(
          {
            code: 20001,
            status: 200,
            title: 'Success!',
            message: 'Permission has been edited successfully.'
          } satisfies ABaseSuccessResponse,
          { status: 200 }
      );
    }
  )
];

export { permissions };