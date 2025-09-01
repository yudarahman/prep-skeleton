import type {
  PRolesPresenterFormActions,
  PRolesPresenterFormState
} from '@/types/presenter/RolePresenter';
import type { FormikValues } from 'formik';
import {
  FC,
  JSX,
  useEffect,
  useMemo
} from 'react';
import {
  useLocation,
  useNavigate,
  useParams
} from 'react-router';
import {
  isEmpty,
  isNull,
  startCase
} from 'lodash';

import {
  useGetRoleByIdQuery,
  usePostRoleMutation,
  usePutRoleMutation
} from '@/api/roles';

import { ACTION } from '@/constants/action';
import { useToast } from '@/hooks/toast';
import { generateSuccessToast } from '@/lib/utils';

import { initialValues as defaultInitialValues } from './config';
import { validation } from './validator';

const withPresenter: BaseWithPresenter<
  PRolesPresenterFormState & {[key: string]: unknown},
  PRolesPresenterFormActions,
  JSX.Element,
  FC
> = (callback) => {
  const PresenterPage: FC = () => {
    const loc = useLocation();
    const navigate = useNavigate();
    const id = new URLSearchParams(loc.search).get('id');
    const { type } = useParams();
    const { toast } = useToast();

    const {
      isFetching: getRoleByIdIsFetching,
      data: getRoleByIdData
    } = useGetRoleByIdQuery(
      {
        id: !isNull(id)
          ? id
          : undefined,
        params: undefined
      },
      {
        refetchOnMountOrArgChange: true,
        skip: isNull(id)
      }
    );
    
    const [postRole, {
      isLoading: postRoleIsLoading,
      isSuccess: postRoleIsSuccess,
      isError: postRoleIsError,
      data: postRoleData,
      error: postRoleError
    }] = usePostRoleMutation();
    
    const [putRole, {
      isLoading: putRoleIsLoading,
      isSuccess: putRoleIsSuccess,
      isError: putRoleIsError,
      data: putRoleData,
      error: putRoleError
    }] = usePutRoleMutation();
      
    const onBack = () => navigate('/settings/roles');
      
    const onFormSubmit = (value: FormikValues) => {
      const {
        isActive,
        name
      } = value;
      
      switch (true) {
        case type === ACTION.CREATE: {
          postRole({
            isActive,
            name
          });
          break;
        }
        case type === ACTION.EDIT && !isNull(id): {
          putRole({
            id,
            body: {
              isActive,
              name
            }
          });
          break;
        }
        default:
          break;
      }
    };

    const initialValues = useMemo(() => {
      if (!isEmpty(getRoleByIdData)) {
        const {
          isActive,
          name
        } = getRoleByIdData;

        return {
          isActive,
          name
        };
      }

      return defaultInitialValues;
    }, [getRoleByIdData]);

    useEffect(() => {
      switch (true) {
        case postRoleIsSuccess:
        case putRoleIsSuccess: {
          toast(
            postRoleIsSuccess
              ? generateSuccessToast(postRoleData, 'Role', 'created')
              : generateSuccessToast(putRoleData, 'Role', 'edited')
          );

          onBack();
          break;
        }
        default:
          break;
      }
    }, [
      postRoleIsSuccess,
      postRoleIsError,
      putRoleIsSuccess,
      putRoleIsError
    ]);
    
    return callback({
      data: {
        isFetching: getRoleByIdIsFetching,
        isLoading: postRoleIsLoading || putRoleIsLoading,
        mode: startCase(type),
        initialValues,
        validation,
        error: postRoleError || putRoleError
      },
      actions: {
        onBack,
        onFormSubmit
      }
    });
  };
    
  return PresenterPage;
};

export { withPresenter };