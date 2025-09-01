import type { CmDataTableExternalState } from '@/types/compound/DataTable';
import type {
  PRolesPresenterActions,
  PRolesPresenterState
} from '@/types/presenter/RolePresenter';
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
  useGetRolesQuery,
  usePatchRoleMutation
} from '@/api/roles';
import { ACTION } from '@/constants/action';
import { useToast } from '@/hooks/toast';
import {
  generateErrorToast,
  generateSuccessToast
} from '@/lib/utils';

import { generateColumns } from './tableConfigurator';

const withPresenter: BaseWithPresenter<
  PRolesPresenterState,
  PRolesPresenterActions,
  JSX.Element,
  FC
> = (callback) => {
  const PresenterPage: FC = () => {
    const navigate = useNavigate();
    const { toast } = useToast();
    const [tableState, setTableState] = useState<CmDataTableExternalState & { search: string }>();
    
    const {
      isFetching: rolesIsFetching,
      data: rolesData,
      refetch: rolesRefetch
    } = useGetRolesQuery(
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
    
    const [patchRole, {
      isLoading: patchRoleIsLoading,
      isSuccess: patchRoleIsSuccess,
      isError: patchRoleIsError,
      data: patchRoleData,
      error: patchRoleError
    }] = usePatchRoleMutation();
    
    const onTableStateChange = (state: CmDataTableExternalState) => {
      setTableState(
        (prevState) => ({
          ...prevState,
          ...state
        } as CmDataTableExternalState & { search: string })
      );
    };
    
    const onIntersect = () => {
      if (Number(tableState?.currentPage) < Number(rolesData?.totalPages)) {
        setTableState(
          (prevState) => ({
            ...prevState,
            currentPage: ((Number(tableState?.currentPage) || 1) + 1)
          } as CmDataTableExternalState & { search: string })
        );
      }
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
    
    const navigateToPermissionForm = (id?: string) => {
      navigate({
        pathname: 'permission',
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
      patchRole({ id, body: { isActive }});
    };

    const { columns } = useMemo(() => {
      return generateColumns(
        patchRoleIsLoading,
        (data) => navigateToForm(ACTION.EDIT, data.id),
        (data) => navigateToPermissionForm(data.id),
        updateStatus
      );
    }, [patchRoleIsLoading]);

    useEffect(() => {
      switch (true) {
        case patchRoleIsSuccess: {
          toast(generateSuccessToast(patchRoleData, 'Status', 'edited'));

          rolesRefetch();
          break;
        }
        case patchRoleIsError: {
          toast(generateErrorToast(patchRoleError));
          
          break;
        }
        default:
          break;
      }
    }, [
      patchRoleIsSuccess,
      patchRoleIsError
    ]);

    return callback({
      data: {
        isFetching: rolesIsFetching,
        isLoading: patchRoleIsLoading,
        columns,
        roles: rolesData || {
          totalData: 0,
          totalPages: 0,
          page: 0,
          data: []
        }
      },
      actions: {
        onIntersect,
        onTableStateChange,
        onSearch,
        navigateToForm
      }
    });
  };
    
  return PresenterPage;
};

export { withPresenter };