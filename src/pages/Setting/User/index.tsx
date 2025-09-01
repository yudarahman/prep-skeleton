import { isUndefined } from 'lodash';

import { ACTION } from '@/constants/action';
import { DataTable } from '@/compounds/DataTable';
import { Button } from '@/components/ui/button';

import { withPresenter } from './Presenter';

const User = withPresenter(({ data, actions }) => {
  const {
    isFetching,
    columns,
    users
  } = data;
  const {
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
            Create User
          </Button>
        }
        tableColumns={columns}
        tableData={!isUndefined(users)
          ? users.data as AUser[]
          : []}
        totalPages={users?.totalPages}
        onSearch={onSearch}
        onStateChange={onTableStateChange}
      />
    </>
  );
});

export default User;