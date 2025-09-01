import {
  Dispatch,
  SetStateAction
} from 'react';

type PAuthPresenterFormInitialValues = {
  username: string;
  password: string;
};

type PAuthPresenterState = {
  initialValues: PAuthPresenterFormInitialValues;
  isPasswordShown: boolean;
  isLoading: boolean;
  isError: boolean;
  errorMessage: string;
};

type PAuthPresenterActions = {
  setIsPasswordShown: Dispatch<SetStateAction<boolean>>,
  onFormSubmit: (value) => void
};