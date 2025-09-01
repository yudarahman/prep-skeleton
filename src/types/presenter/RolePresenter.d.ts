import type { CmDataTableExternalState } from '@/types/compound/DataTable';
import type { ColumnDef } from '@tanstack/react-table';

import { ACTION } from '@/constants/action';

type PRolesPresenterState = {
  isFetching: boolean;
  isLoading: boolean;
  roles?: AResponseRoles;
  columns: ColumnDef<ARoles>[];
};

type PRolesPermissionPresenterState = {
  isFetching: boolean;
  isLoading: boolean;
  headers: { label: string, value: string }[];
  permissions?: APermissions;
};

type PRolesPresenterActions = {
  onIntersect: () => void;
  onTableStateChange: (state: CmDataTableExternalState) => void;
  onSearch: (search: string) => void;
  navigateToForm: (
    type: ACTION.CREATE | ACTION.EDIT,
    id?: string
  ) => void;
};

type PRolesPermissionPresenterActions = {
  onBack: () => void;
  onToggleMenu: (menuId: string) => void;
  onPermissionChange: (menuId: string, permissionType: string, isChecked: boolean) => void;
  onSubmit: () => void;
};

type PRolesPresenterFormInitialValues = {
  name: string;
};

type PRolesPresenterFormState = {
  isFetching: boolean;
  isLoading: boolean;
  mode: string;
  initialValues: PRolesPresenterFormInitialValues;
};

type PRolesPresenterFormActions = {
  onBack: () => void;
  onFormSubmit: (value) => void;
};