import type { CmDataTableExternalState } from '@/types/compound/DataTable';
import type { ColumnDef } from '@tanstack/react-table';
import {
  Dispatch,
  SetStateAction
} from 'react';

import { ACTION } from '@/constants/action';

type PUserPresenterState = {
  isFetching: boolean;
  columns: ColumnDef<AUser>[],
  users?: AResponseUsers;
};

type PUserPresenterActions = {
  onTableStateChange: (state: CmDataTableExternalState) => void;
  onSearch: (search: string) => void;
  navigateToForm: (
    type: ACTION.CREATE | ACTION.EDIT,
    id?: string
  ) => void;
};

type PUserPresenterFormInitialValues = {
  isActive: boolean;
  username: string;
  password: string;
  fullname: string;
  email: string;
  userRoles?: { label: string, value: string }[];
};

type PUserPresenterFormState = {
  isDataFetching: boolean;
  isLoading: boolean;
  isPasswordShown: boolean;
  roleOptions: { label: string, value: string }[];
  mode: string;
  initialValues: PUserPresenterFormInitialValues;
};

type PUserPresenterFormActions = {
  setIsPasswordShown: Dispatch<SetStateAction<boolean>>;
  onBack: () => void;
  onFormSubmit: (value) => void;
};