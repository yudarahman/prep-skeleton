import { SquarePen } from 'lucide-react';
import { isUndefined } from 'lodash';

import { ACTION } from '@/constants/action';

import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { DataTable } from '@/compounds/DataTable';
import { MobileList } from '@/compounds/MobileList';

import { withPresenter } from './Presenter';

const Role = withPresenter(({ data, actions }) => {
  const {
    isFetching,
    columns,
    roles
  } = data;
  const {
    onIntersect,
    onTableStateChange,
    onSearch,
    navigateToForm
  } = actions;

  return (
    <>
      <DataTable
        isFetching={isFetching}
        action={
          <Button
            disabled={isFetching}
            className="w-32 justify-self-start"
            onClick={() => navigateToForm(ACTION.CREATE)}
          >
            Create Role
          </Button>
        }
        tableColumns={columns}
        tableData={!isUndefined(roles)
          ? roles?.data as ARoles[]
          : []}
        totalPages={roles?.totalPages}
        onStateChange={onTableStateChange}
        onSearch={onSearch}
      />
        
      <MobileList
        isFetching={isFetching}
        action={
          <Button
            disabled={isFetching}
            onClick={() => navigateToForm(ACTION.CREATE)}
          >
            Create Role
          </Button>
        }
        gridCount={3}
        listData={roles?.data}
        onIntersecting={onIntersect}
        onSearch={onSearch}
      >
        {({
          id,
          name,
          isActive
        }) => {
          return (
            <div className="p-3 flex flex-col rounded-lg border shadow-md">
              <div className="mb-3 flex flex-row items-center justify-between">
                <SquarePen
                  data-testid="test-edit-mobile-icon"
                  className="cursor-pointer"
                  onClick={() => navigateToForm(ACTION.EDIT, id)}
                />
                <Switch
                  checked={isActive}
                  className="self-end"
                />
              </div>
              <span className="font-bold text-lg">
                {name}
              </span>
            </div>
          );
        }}
      </MobileList>
    </>
  );
});

export default Role;