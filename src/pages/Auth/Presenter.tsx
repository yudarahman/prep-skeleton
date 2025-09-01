import type {
  PAuthPresenterState,
  PAuthPresenterActions
} from '@/types/presenter/AuthPresenter';

import {
  FC,
  JSX,
  useEffect,
  useState
} from 'react';
import { FormikValues } from 'formik';
import { useNavigate } from 'react-router';

import { useLoginMutation } from '@/api/auth';
import { transformError } from '@/lib/utils';

import { initialValues } from './config';
import { validation } from './validator';

const withPresenter: BaseWithPresenter<
  PAuthPresenterState & {[key: string]: unknown},
  PAuthPresenterActions,
  JSX.Element,
  FC
> = (callback) => {
  const PresenterPage: FC = () => {
    const navigate = useNavigate();
    const [isPasswordShown, setIsPasswordShown] = useState<boolean>(false);
    
    const [login, {
      isLoading,
      isSuccess,
      isError,
      error
    }] = useLoginMutation();

    const onFormSubmit = (value: FormikValues) => {
      const { username, password } = value;

      login({ username, password });
    };

    useEffect(() => {
      if (isSuccess) {
        navigate('/dashboard');
      }
    }, [isSuccess]);

    return callback({
      data: {
        isPasswordShown,
        isLoading,
        isError,
        errorMessage: transformError(error),
        initialValues,
        validation
      },
      actions: {
        onFormSubmit,
        setIsPasswordShown
      }
    });
  };
    
  return PresenterPage;
};

export { withPresenter };