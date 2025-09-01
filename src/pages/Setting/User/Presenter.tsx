import type { CmDataTableExternalState } from '@/types/compound/DataTable';
import type {
  PUserPresenterActions,
  PUserPresenterState
} from '@/types/presenter/UserPresenter';
import {
  FC,
  JSX,
  useEffect,
  useMemo,
  useState
} from 'react';
import { useNavigate } from 'react-router';
import { createSearchParams } from 'react-router-dom';
import { isUndefined } from 'lodash';

import {
  useGetUsersQuery,
  usePatchUserMutation
} from '@/api/user';
import { ACTION } from '@/constants/action';
import { useToast } from '@/hooks/toast';
import {
  generateErrorToast,
  generateSuccessToast
} from '@/lib/utils';

import { generateColumns } from './tableConfigurator';

const withPresenter: BaseWithPresenter<
  PUserPresenterState,
  PUserPresenterActions,
  JSX.Element,
  FC
> = (callback) => {
  const PresenterPage: FC = () => {
    const navigate = useNavigate();
    const { toast } = useToast();
    const [tableState, setTableState] = useState<CmDataTableExternalState & { search: string }>();
    
    const {
      isFetching: usersIsFetching,
      data: users,
      refetch: usersRefetch
    } = useGetUsersQuery(
      {
        filters: `${tableState?.search ? `search@=${tableState?.search}` : ''}`,
        page: tableState?.currentPage,
        pageSize: tableState?.pageSize,
        sorts: tableState?.sorts?.toString()
      },
      {
        refetchOnMountOrArgChange: true,
        skip: isUndefined(tableState)
      }
    );
    
    const [patchUser, {
      isLoading: patchUserIsLoading,
      isSuccess: patchUserIsSuccess,
      isError: patchUserIsError,
      data: patchUserData,
      error: patchUserError
    }] = usePatchUserMutation();
    
    const onTableStateChange = (state: CmDataTableExternalState) => {
      setTableState(
        (prevState) => ({
          ...prevState,
          ...state
        } as CmDataTableExternalState & { search: string })
      );
    };
    
    const onSearch = (search: string) => {
      setTableState(
        (prevState) => ({
          ...prevState,
          search
        } as CmDataTableExternalState & { search: string })
      );
    };
    
    const navigateToForm = (
      type: ACTION.CREATE | ACTION.EDIT,
      id?: string
    ) => {
      navigate({
        pathname: type,
        ...id
          ? { search: createSearchParams({ id }).toString() }
          : undefined
      });
    };
    
    const updateStatus = ({
      id,
      isActive
    }: {
      id: string,
      isActive: boolean
    }) => {
      patchUser({ id, body: { isActive }});
    };

    const { columns } = useMemo(() => {
      return generateColumns(
        patchUserIsLoading,
        (data) => navigateToForm(ACTION.EDIT, data.id),
        updateStatus
      );
    }, [patchUserIsLoading]);

    useEffect(() => {
      switch (true) {
        case patchUserIsSuccess: {
          toast(generateSuccessToast(patchUserData, 'User', 'edited'));
          
          usersRefetch();
          break;
        }
        case patchUserIsError: {
          toast(generateErrorToast(patchUserError));
          break;
        }
        default:
          break;
      }
    }, [
      patchUserIsSuccess,
      patchUserIsError
    ]);

    return callback({
      data: {
        isFetching: usersIsFetching,
        columns,
        users
      },
      actions: {
        onTableStateChange,
        onSearch,
        navigateToForm
      }
    });
  };
    
  return PresenterPage;
};

export { withPresenter };