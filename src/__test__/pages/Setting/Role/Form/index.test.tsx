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
  useGetRoleByIdQuery,
  usePostRoleMutation,
  usePutRoleMutation
} from '@/api/roles';

import { initialValues } from '@/pages/Setting/Role/Form/config';
import { validation } from '@/pages/Setting/Role/Form/validator';

import Form from '@/pages/Setting/Role/Form';

const mockData = {
  isLoading: false,
  initialValues,
  validation
};

const mockActions = {
  onFormSubmit: vi.fn()
};

vi.mock('react-router', () => ({
  useLocation: vi.fn().mockReturnValue({
    hash: '',
    key: 'some-key',
    pathname: '/settings/roles/create',
    search: '',
    state: null
  }),
  useNavigate: vi.fn(),
  useParams: vi.fn().mockReturnValue({ type: 'create' })
}));

vi.mock('@/api/roles', () => ({
  useGetRoleByIdQuery: vi.fn(),
  usePostRoleMutation: vi.fn(),
  usePutRoleMutation: vi.fn()
}));

describe('@/pages/Setting/Form/index.tsx', () => {
  const mockPostRole = vi.fn();
  const mockPutRole = vi.fn();
  
  beforeEach(() => {
    (useGetRoleByIdQuery as any).mockReturnValue({
      isLoading: false,
      isSuccess: false,
      isError: false,
      data: null,
      error: null
    });

    (usePostRoleMutation as any).mockReturnValue([mockPostRole, {
      isLoading: false,
      isSuccess: false,
      isError: false,
      data: null,
      error: null
    }]);

    (usePutRoleMutation as any).mockReturnValue([mockPutRole, {
      isLoading: false,
      isSuccess: false,
      isError: false,
      data: null,
      error: null
    }]);
  });
  
  vi.mock('@/pages/Setting/Form/Presenter', () => ({
    withPresenter: ((callback: any) => {
      return () => {
        return callback({
          data: mockData,
          actions: mockActions
        });
      };
    })
  }));
  
  
  it('should render correctly', () => {
    render(<Form />);

    expect(screen.getByText('Create')).toBeInTheDocument();
  });

  it('should return expected class when "isLoading" is true', () => {
    (usePostRoleMutation as any).mockReturnValue([mockPostRole, {
      isLoading: true,
      isSuccess: false,
      isError: false,
      data: null,
      error: null
    }]);

    render(<Form />);
    
    const submitButton = screen.getByText('Create');
    expect(submitButton).toHaveClass('animate-bounce');
  });

  it('should return expected class when "isLoading" is false', () => {
    render(<Form />);

    const submitButton = screen.getByText('Create');
    expect(submitButton).toHaveClass('w-full lg:w-32');
  });
});