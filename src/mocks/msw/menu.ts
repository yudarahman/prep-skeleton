import {
  HttpResponse,
  PathParams,
  http
} from 'msw';

import { apiEndpoint } from '@/constants/endpoints';

const menus = [
  http.get<PathParams>(
    `*/api/v1/${apiEndpoint.menu.list}`,
    async () => {
      return HttpResponse.json(
        {
          page: 1,
          totalPages: 1,
          totalData: 3,
          data: [
            {
              id: 'some-id-1',
              name: 'Some Menu 1',
              icon: null,
              link: null,
              level: null,
              permissions: [
                {
                  id: 'some-permission-id-1',
                  menuId: 'some-permission-menu-id-1',
                  menuLabel: 'Some Menu 1',
                  level: 1,
                  canView: true,
                  canUpdate: true,
                  canCreate: true,
                  canDelete: true
                }
              ],
              child: null
            },
            {
              id: 'some-id-2',
              name: 'Some Menu 2',
              icon: null,
              link: null,
              level: null,
              permissions: [
                {
                  id: 'some-permission-id-2',
                  menuId: 'some-permission-menu-id-2',
                  menuLabel: 'Some Menu 2',
                  level: 1,
                  canView: true,
                  canUpdate: true,
                  canCreate: true,
                  canDelete: true
                }
              ],
              child: null
            },
            {
              id: 'some-id-3',
              name: 'Some Menu 3',
              icon: null,
              link: null,
              level: null,
              permissions: [
                {
                  id: 'some-permission-id-3',
                  menuId: 'some-permission-menu-id-3',
                  menuLabel: 'Some Menu 3',
                  level: 1,
                  canView: true,
                  canUpdate: true,
                  canCreate: true,
                  canDelete: true
                }
              ],
              child: null
            }
          ]
        } satisfies AResponseMenus,
        { status: 200 }
      );
    }
  )
];

export { menus };