/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  beforeEach,
  describe,
  expect,
  it,
  vi
} from 'vitest';
import {
  render,
  screen
} from '@testing-library/react';

import {
  useGetPermissionByRoleIdQuery,
  usePutPermissionByRoleIdMutation
} from '@/api/permission';

import PermissionForm from '@/pages/Setting/Role/PermissionForm';

vi.mock('react-router', () => ({
  useLocation: vi.fn().mockReturnValue({
    hash: '',
    key: 'some-key',
    pathname: '/settings/roles/permissions',
    search: '?id=some-id',
    state: null
  }),
  useNavigate: vi.fn()
}));

vi.mock('@/api/permission', () => ({
  useGetPermissionByRoleIdQuery: vi.fn(),
  usePutPermissionByRoleIdMutation: vi.fn()
}));

describe('@/pages/Setting/Role/PermissionForm/index.tsx', () => {
  const mockPutPermission = vi.fn();

  beforeEach(() => {
    (useGetPermissionByRoleIdQuery as any).mockReturnValue({
      isFetching: false,
      isSuccess: false,
      isError: false,
      data: undefined,
      error: null
    });

    (usePutPermissionByRoleIdMutation as any).mockReturnValue([mockPutPermission, {
      isLoading: false,
      isSuccess: false,
      isError: false,
      data: undefined,
      error: null
    }]);
  });
  
  it('should render correctly', () => {
    render(<PermissionForm />);
      
    expect(screen.getByText('Back')).toBeInTheDocument();
  });
});