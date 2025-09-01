import type {
  PUserPresenterFormActions, PUserPresenterFormInitialValues,
  PUserPresenterFormState
} from '@/types/presenter/UserPresenter';
import type { FormikValues } from 'formik';
import {
  FC,
  JSX,
  useEffect,
  useMemo,
  useState
} from 'react';
import {
  useLocation,
  useNavigate,
  useParams
} from 'react-router';
import {
  mapValues,
  isEmpty,
  isUndefined,
  isNull,
  startCase
} from 'lodash';

import { useGetRolesQuery } from '@/api/roles';
import {
  useGetUserByIdQuery,
  usePostUserMutation,
  usePutUserMutation
} from '@/api/user';

import { ACTION } from '@/constants/action';
import { DocumentUnknownError } from '@/constants/errors';
import { useToast } from '@/hooks/toast';
import {
  generateErrorToast,
  generateSuccessToast
} from '@/lib/utils';

import { initialValues as defaultInitialValues } from './config';
import { validation } from './validator';

const withPresenter: BaseWithPresenter<
  PUserPresenterFormState & {[key: string]: unknown},
  PUserPresenterFormActions,
  JSX.Element,
  FC
> = (callback) => {
  const PresenterPage: FC = () => {
    const loc = useLocation();
    const navigate = useNavigate();
    const id = new URLSearchParams(loc.search).get('id');
    const { type } = useParams();
    const { toast } = useToast();
    const [isPasswordShown, setIsPasswordShown] = useState<boolean>(false);
    
    const onBack = () => navigate('/settings/users');

    const {
      isFetching: rolesIsFetching,
      data: roles
    } = useGetRolesQuery(
      /**
        * `roles` api do not accommodate to fetch all data,
        * the hacky way is to put `100` in `pageSize`
        * */
      { page: 1, pageSize: 100 },
      { refetchOnMountOrArgChange: true }
    );
    
    const {
      isFetching: userByIdIsFetching,
      data: userByIdData
    } = useGetUserByIdQuery(
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
    
    const [postUser, {
      isLoading: postUserIsLoading,
      isSuccess: postUserIsSuccess,
      isError: postUserIsError,
      data: postUserData,
      error: postUserError
    }] = usePostUserMutation();
    
    const [putUser, {
      isLoading: putUserIsLoading,
      isSuccess: putUserIsSuccess,
      isError: putUserIsError,
      data: putUserData,
      error: putUserError
    }] = usePutUserMutation();

    const onFormSubmit = (value: FormikValues) => {
      const modifiedBody = {
        ...value,
        userRoles: value.userRoles.map(
          (item: { label: string, value: string }) => ({ id: item.value, name: item.label })
        )
      } as AUserBody;

      switch (type) {
        case ACTION.CREATE: {
          postUser(modifiedBody);
          break;
        }
        case ACTION.EDIT: {
          if (!isNull(id)) {
            const {
              password,
              ...rest
            } = modifiedBody;

            putUser({
              id,
              body: {
                ...rest,
                ...isEmpty(password)
                  ? undefined
                  : { password }
              }
            });
            break;
          }

          toast(generateErrorToast(new DocumentUnknownError()));
          break;
        }
        default:
          break;
      }
    };

    const initialValues = useMemo(() => {
      if (!isEmpty(userByIdData)) {
        return {
          ...mapValues(
            userByIdData,
            value => {
              return (value ?? '') as string;
            }
          ),
          password: '',
          isActive: userByIdData.isActive ?? false,
          userRoles: userByIdData.userRoles.map(({ role }) => ({ label: role.name, value: role.id }))
        } satisfies PUserPresenterFormInitialValues;
      }

      return defaultInitialValues;
    }, [userByIdData]);
    
    const formValidation = useMemo(() => {
      return validation(type);
    }, [type]);

    const roleOptions = useMemo(() => {
      if (!isUndefined(roles) && !isEmpty(roles?.data)) {
        return roles.data
          .filter((item) => item.isActive)
          .map((item) => ({
            label: item.name,
            value: item.id
          }));
      }

      return [];
    }, [roles]);

    useEffect(() => {
      switch (true) {
        case postUserIsSuccess:
        case putUserIsSuccess: {
          toast(postUserIsSuccess
            ? generateSuccessToast(postUserData, 'User', 'created')
            : generateSuccessToast(putUserData, 'User', 'edited')
          );

          onBack();
          break;
        }
        case postUserIsError:
        case putUserIsError: {
          toast(postUserIsError
            ? generateErrorToast(postUserError)
            : generateErrorToast(putUserError)
          );
          break;
        }
        default:
          break;
      }
    }, [
      postUserIsSuccess,
      postUserIsError,
      putUserIsSuccess,
      putUserIsError
    ]);
      
    return callback({
      data: {
        initialValues,
        roleOptions,
        isPasswordShown,
        isDataFetching: (rolesIsFetching || userByIdIsFetching),
        isLoading: (postUserIsLoading || putUserIsLoading),
        validation: formValidation,
        mode: startCase(type)
      },
      actions: {
        onBack,
        onFormSubmit,
        setIsPasswordShown
      }
    });
  };
    
  return PresenterPage;
};

export { withPresenter };