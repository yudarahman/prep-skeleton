import {
  PRolesPermissionPresenterActions,
  PRolesPermissionPresenterState
} from '@/types/presenter/RolePresenter';
import {
  FC,
  JSX,
  useEffect,
  useState
} from 'react';
import {
  useLocation,
  useNavigate
} from 'react-router';
import {
  isEmpty,
  isNull,
  isUndefined
} from 'lodash';

import {
  useGetPermissionByRoleIdQuery,
  usePutPermissionByRoleIdMutation
} from '@/api/permission';

import { useToast } from '@/hooks/toast';
import {
  generateErrorToast,
  generateSuccessToast
} from '@/lib/utils';
import {
  ERROR_TOAST_CODE,
  ERROR_TOAST_DESCRIPTION,
  ERROR_TOAST_TITLE
} from '@/constants/errors';

const withPresenter: BaseWithPresenter<
  PRolesPermissionPresenterState,
  PRolesPermissionPresenterActions,
  JSX.Element,
  FC
> = (callback) => {
  const PresenterPage: FC = () => {
    const loc = useLocation();
    const navigate = useNavigate();
    const { toast } = useToast();
    const roleId = new URLSearchParams(loc.search).get('id');
    const [permissions, setPermissions] = useState<APermissions | undefined>(undefined);
    const headers = [
      { label: 'View', value: 'canView' },
      { label: 'Create', value: 'canCreate' },
      { label: 'Update', value: 'canUpdate' },
      { label: 'Delete', value: 'canDelete' }
    ];
    
    const {
      isFetching: rolePermissionsIsFetching,
      isSuccess: rolePermissionsIsSuccess,
      isError: rolePermissionsIsError,
      data: rolePermissionsData,
      error: rolePermissionsError
    } = useGetPermissionByRoleIdQuery(
      {
        roleId: !isNull(roleId)
          ? roleId
          : undefined
      },
      {
        refetchOnMountOrArgChange: true,
        skip: isNull(roleId)
      }
    );
    
    const [putPermission, {
      isLoading: putPermissionIsLoading,
      isSuccess: putPermissionIsSuccess,
      isError: putPermissionIsError,
      data: putPermissionData,
      error: putPermissionError
    }] = usePutPermissionByRoleIdMutation();

    const onBack = () => navigate('/settings/roles');
    
    const onToggleMenu = (menuId: string) => {
      setPermissions((prevState) => {
        if (!isUndefined(prevState)) {
          return {
            ...prevState,
            permissions: prevState.permissions.map((item) => {
              if (item.menuId === menuId) {
                return {
                  ...item,
                  isExpanded: !(item as typeof item & { isExpanded: boolean | null }).isExpanded
                };
              }

              return { ...item };
            })
          }; 
        }
        
        return prevState;
      });
    };

    const onPermissionChange = (
      menuId: string,
      permissionType: string,
      isChecked: boolean
    ) => {
      setPermissions((prevState) => {
        if (!isUndefined(prevState)) {
          return {
            ...prevState,
            permissions: prevState.permissions.map((item) => {
              if (item.menuId === menuId) {
                return {
                  ...item,
                  [permissionType]: isChecked
                };
              }

              return {
                ...item,
                children: item.children.map((childItem) => {
                  if (childItem.menuId === menuId) {
                    return {
                      ...childItem,
                      [permissionType]: isChecked
                    };
                  }

                  return { ...childItem };
                })
              };
            })
          };
        }

        return prevState;
      });
    };
    
    const onSubmit = () => {
      if (!isNull(roleId) && !isUndefined(permissions)) {
        putPermission({
          roleId,
          body: permissions
        });
        
        return;
      }
      
      toast(
        generateErrorToast({
          code: ERROR_TOAST_CODE.UNKNOWN_DOCUMENT,
          title: ERROR_TOAST_TITLE.ERROR,
          message: ERROR_TOAST_DESCRIPTION.UNKNOWN_DOCUMENT
        } as ABaseErrorResponse)
      );
    };

    useEffect(() => {
      switch (true) {
        case putPermissionIsSuccess: {
          toast(generateSuccessToast(putPermissionData, 'Permission', 'edited'));

          onBack();

          break;
        }
        case rolePermissionsIsSuccess: {
          setPermissions({
            ...rolePermissionsData,
            permissions: rolePermissionsData.permissions.map(
              (item) => ({
                ...item,
                isExpanded: !isEmpty(item.children)
                  ? false
                  : null
              }))
          });

          break;
        }
        case rolePermissionsIsError:
        case putPermissionIsError: {
          toast(
            rolePermissionsIsError
              ? generateErrorToast(rolePermissionsError)
              : generateErrorToast(putPermissionError)
          );

          break;
        }
        default:
          break;
      }
    }, [
      rolePermissionsIsSuccess,
      rolePermissionsIsError,
      putPermissionIsSuccess,
      putPermissionIsError
    ]);
    
    return callback({
      data: {
        headers,
        permissions,
        isFetching: rolePermissionsIsFetching,
        isLoading: putPermissionIsLoading
      },
      actions: {
        onBack,
        onToggleMenu,
        onPermissionChange,
        onSubmit
      }
    });
  };
    
  return PresenterPage;
};

export { withPresenter };