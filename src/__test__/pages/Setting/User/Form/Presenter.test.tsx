/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  beforeEach,
  describe,
  expect,
  it,
  vi
} from 'vitest';
import {
  fireEvent,
  render,
  screen,
  waitFor
} from '@testing-library/react';
import {
  useLocation,
  useNavigate,
  useParams
} from 'react-router';
import { isEmpty } from 'lodash';
import {
  Formik,
  Form,
  Field
} from 'formik';

import { useGetRolesQuery } from '@/api/roles';
import {
  useGetUserByIdQuery,
  usePostUserMutation,
  usePutUserMutation
} from '@/api/user';

import {
  generateErrorToast,
  generateSuccessToast
} from '@/lib/utils';
import { useToast } from '@/hooks/toast';

import { withPresenter } from '@/pages/Setting/User/Form/Presenter';

vi.mock('react-router', () => ({
  useLocation: vi.fn().mockReturnValue({
    hash: '',
    key: 'some-key',
    pathname: '/settings/users/create',
    search: '',
    state: null
  }),
  useNavigate: vi.fn(),
  useParams: vi.fn().mockReturnValue({ type: 'create' })
}));

vi.mock('@/api/roles', () => ({
  useGetRolesQuery: vi.fn()
}));

vi.mock('@/api/user', () => ({
  useGetUserByIdQuery: vi.fn(),
  usePostUserMutation: vi.fn(),
  usePutUserMutation: vi.fn()
}));

vi.mock('@/hooks/toast', () => ({
  useToast: vi.fn()
}));

vi.mock('@/lib/utils', () => ({
  generateErrorToast: vi.fn(),
  generateSuccessToast: vi.fn(),
  cn: vi.fn()
}));

vi.mock('@/pages/Setting/User/Form/config', () => ({
  initialValues: {
    isActive: true,
    username: '',
    password: '',
    fullname: '',
    email: '',
    userRoles: [
      { label: 'Role 1', value: 'role_1' },
      { label: 'Role 2', value: 'role_2' }
    ]
  }
}));

describe('@/pages/Setting/User/Form/Presenter.tsx', () => {
  const mockNavigate = vi.fn();
  const mockToast = vi.fn();
  const mockPostUser = vi.fn();
  const mockPutUser = vi.fn();
    
  beforeEach(() => {
    (useNavigate as any).mockReturnValue(mockNavigate);
    (useGetRolesQuery as any).mockReturnValue({
      isFetching: false,
      isSuccess: false,
      isError: false,
      data: null,
      error: null
    });
    (useGetUserByIdQuery as any).mockReturnValue({
      isFetching: false,
      isSuccess: false,
      isError: false,
      data: null,
      error: null
    });
    (usePostUserMutation as any).mockReturnValue([mockPostUser, {
      isLoading: false,
      isSuccess: false,
      isError: false,
      data: null,
      error: null
    }]);
    (usePutUserMutation as any).mockReturnValue([mockPutUser, {
      isLoading: false,
      isSuccess: false,
      isError: false,
      data: null,
      error: null
    }]);

    (useToast as any).mockReturnValue({ toast: mockToast });
    (generateErrorToast as any).mockReturnValue('');
    (generateSuccessToast as any).mockReturnValue('');
  });
  
  const TestComponent = withPresenter(({ data, actions }) => {
    const {
      mode,
      initialValues,
      roleOptions,
      validation
    } = data;
    const {
      onBack,
      onFormSubmit
    } = actions;
      
    return (
      <>
        <span>This is user form presenter</span>
        <button onClick={onBack}>
          Back
        </button>
        {
          !isEmpty(roleOptions)
            ? (
              <>
                {
                  roleOptions.map((item) => (
                    <span key={item.value}>
                      {item.label}
                    </span>
                  ))
                }
              </>
            )
            : (<span>No Data</span>)
        }
        <Formik
          initialValues={initialValues}
          validationSchema={validation}
          onSubmit={onFormSubmit}
        >
          {
            () => (
              <Form>
                <Field name="username" placeholder="Enter username" />
                <Field name="password" placeholder="Enter password" />
                <Field name="fullname" placeholder="Enter fullname" />
                <Field name="email" placeholder="Enter email" />
                <button type="submit">
                  {mode}
                </button>
              </Form>
            )
          }
        </Formik>
      </>
    );
  });
    
  it('should render correctly', () => {
    render(<TestComponent />);
      
    expect(screen.getByText('This is user form presenter')).toBeInTheDocument();
    expect(screen.getByText('Back')).toBeInTheDocument();
  });
  
  it('should call "useNavigate" when "onBack" clicked', () => {
    render(<TestComponent />);

    const backButton = screen.getByText('Back');

    fireEvent.click(backButton);

    expect(mockNavigate).toHaveBeenCalledWith('/settings/users');
  });

  it('should render correct span when "roles" data is not empty', () => {
    (useGetRolesQuery as any).mockReturnValue({
      isFetching: false,
      isSuccess: false,
      isError: false,
      data: {
        data: [
          {
            id: 'some-id-1',
            name: 'Some Name 1',
            isActive: true
          }
        ]
      },
      error: null
    });

    render(<TestComponent />);

    const roleSpan = screen.getByText('Some Name 1');

    expect(roleSpan).toBeInTheDocument();
  });

  it('should render correct span when "roles" data is empty', () => {
    (useGetRolesQuery as any).mockReturnValue({
      isFetching: false,
      isSuccess: false,
      isError: false,
      data: undefined,
      error: null
    });

    render(<TestComponent />);

    const roleSpan = screen.getByText('No Data');

    expect(roleSpan).toBeInTheDocument();
  });

  it('should call "toast" when "usePostUserMutation.isSuccess" is true', async () => {
    (usePostUserMutation as any).mockReturnValue([mockPostUser, {
      isLoading: false,
      isSuccess: true,
      isError: false,
      data: null,
      error: null
    }]);
    
    render(<TestComponent />);

    const usernameField = screen.getByPlaceholderText('Enter username');
    const passwordField = screen.getByPlaceholderText('Enter password');
    const fullnameField = screen.getByPlaceholderText('Enter fullname');
    const emailField = screen.getByPlaceholderText('Enter email');
    const createButton = screen.getByText('Create');
    
    fireEvent.change(usernameField, { target: { value: 'test' } });
    fireEvent.change(fullnameField, { target: { value: 'test' } });
    fireEvent.change(emailField, { target: { value: 'test' } });
    fireEvent.change(passwordField, { target: { value: 'test' } });

    fireEvent.submit(createButton);

    await waitFor(() => {
      expect(mockToast).toHaveBeenCalled();
      expect(mockNavigate).toHaveBeenCalledWith('/settings/users');
    });
  });

  it('should call "toast" when "usePostUserMutation.isError" is true', async () => {
    (usePostUserMutation as any).mockReturnValue([mockPostUser, {
      isLoading: false,
      isSuccess: false,
      isError: true,
      data: null,
      error: null
    }]);

    render(<TestComponent />);

    const usernameField = screen.getByPlaceholderText('Enter username');
    const passwordField = screen.getByPlaceholderText('Enter password');
    const fullnameField = screen.getByPlaceholderText('Enter fullname');
    const emailField = screen.getByPlaceholderText('Enter email');
    const createButton = screen.getByText('Create');

    fireEvent.change(usernameField, { target: { value: 'test' } });
    fireEvent.change(fullnameField, { target: { value: 'test' } });
    fireEvent.change(emailField, { target: { value: 'test' } });
    fireEvent.change(passwordField, { target: { value: 'test' } });

    fireEvent.submit(createButton);

    await waitFor(() => {
      expect(mockToast).toHaveBeenCalled();
      expect(mockNavigate).toHaveBeenCalledWith('/settings/users');
    });
  });

  it('should call "useGetUserByIdQuery" with expected params when "id" from queryParams is not null', () => {
    (useLocation as any).mockReturnValue({
      hash: '',
      key: 'some-key',
      pathname: '/settings/users/edit',
      search: 'id=some-id',
      state: null
    });
    (useParams as any).mockReturnValue({ type: 'edit' });

    render(<TestComponent />);
    
    expect(useGetUserByIdQuery).toHaveBeenCalledWith(
      { id: 'some-id' },
      { refetchOnMountOrArgChange: true, skip: false }
    );
  });

  it('should call "useGetUserByIdQuery" with expected params when "id" from queryParams is null', () => {
    (useLocation as any).mockReturnValue({
      hash: '',
      key: 'some-key',
      pathname: '/settings/users/edit',
      search: '',
      state: null
    });
    (useParams as any).mockReturnValue({ type: 'edit' });

    render(<TestComponent />);

    expect(useGetUserByIdQuery).toHaveBeenCalledWith(
      { id: undefined, params: undefined },
      { refetchOnMountOrArgChange: true, skip: true }
    );
  });

  it('should not call "usePostUserMutation" and "usePutUserMutation" when "onFormSubmit" did not recognized "ACTION" type', async () => {
    (useLocation as any).mockReturnValue({
      hash: '',
      key: 'some-key',
      pathname: '/settings/users/detail',
      search: '',
      state: null
    });
    (useParams as any).mockReturnValue({ type: 'detail' });

    (useGetRolesQuery as any).mockReturnValue({
      isFetching: false,
      isSuccess: true,
      isError: false,
      data: {
        totalPages: 1,
        totalData: 3,
        data: [
          { id: 'role_1', isActive: true, name: 'Role 1' },
          { id: 'role_2', isActive: true, name: 'Role 2' }
        ]
      },
      error: null
    });

    render(<TestComponent />);

    const detailButton = screen.getByText('Detail');

    expect(detailButton).toBeInTheDocument();

    fireEvent.submit(detailButton);

    await waitFor(() => {
      expect(mockPostUser).not.toHaveBeenCalled();
      expect(mockPutUser).not.toHaveBeenCalled();
    });
  });

  it('should call "usePostUserMutation" when "onFormSubmit" called and return the expected function', async () => {
    (useLocation as any).mockReturnValue({
      hash: '',
      key: 'some-key',
      pathname: '/settings/users/create',
      search: '',
      state: null
    });
    (useParams as any).mockReturnValue({ type: 'create' });

    (useGetRolesQuery as any).mockReturnValue({
      isFetching: false,
      isSuccess: true,
      isError: false,
      data: {
        totalPages: 1,
        totalData: 3,
        data: [
          { id: 'role_1', isActive: true, name: 'Role 1' },
          { id: 'role_2', isActive: true, name: 'Role 2' }
        ]
      },
      error: null
    });

    (usePostUserMutation as any).mockReturnValue([mockPostUser, {
      isLoading: false,
      isSuccess: true,
      isError: false,
      data: null,
      error: null
    }]);

    render(<TestComponent />);

    const usernameField = screen.getByPlaceholderText('Enter username');
    const passwordField = screen.getByPlaceholderText('Enter password');
    const fullnameField = screen.getByPlaceholderText('Enter fullname');
    const emailField = screen.getByPlaceholderText('Enter email');
    const createButton = screen.getByText('Create');

    expect(createButton).toBeInTheDocument();

    fireEvent.change(usernameField, { target: { value: 'username_test' } });
    fireEvent.change(passwordField, { target: { value: 'username_test_password' } });
    fireEvent.change(fullnameField, { target: { value: 'Username' } });
    fireEvent.change(emailField, { target: { value: 'username_test@mail.com' } });
    
    fireEvent.submit(createButton);

    await waitFor(() => {
      expect(mockPostUser).toHaveBeenCalled();
    });

    await waitFor(() => {
      expect(mockToast).toHaveBeenCalled();
      expect(mockNavigate).toHaveBeenCalledWith('/settings/users');
    });
  });

  it('should call "usePutUserMutation" when "onFormSubmit" called and return expected function', async () => {
    (useLocation as any).mockReturnValue({
      hash: '',
      key: 'some-key',
      pathname: '/settings/users/edit',
      search: 'id=some-id',
      state: null
    });
    (useParams as any).mockReturnValue({ type: 'edit' });

    (useGetRolesQuery as any).mockReturnValue({
      isFetching: false,
      isSuccess: true,
      isError: false,
      data: {
        totalPages: 1,
        totalData: 3,
        data: [
          { id: 'role_1', isActive: true, name: 'Role 1' },
          { id: 'role_2', isActive: true, name: 'Role 2' }
        ]
      },
      error: null
    });

    (usePutUserMutation as any).mockReturnValue([mockPutUser, {
      isLoading: false,
      isSuccess: true,
      isError: false,
      data: null,
      error: null
    }]);

    render(<TestComponent />);

    const usernameField = screen.getByPlaceholderText('Enter username');
    const passwordField = screen.getByPlaceholderText('Enter password');
    const fullnameField = screen.getByPlaceholderText('Enter fullname');
    const emailField = screen.getByPlaceholderText('Enter email');
    const editButton = screen.getByText('Edit');

    expect(editButton).toBeInTheDocument();

    fireEvent.change(usernameField, { target: { value: 'username_test' } });
    fireEvent.change(passwordField, { target: { value: 'username_test_password' } });
    fireEvent.change(fullnameField, { target: { value: 'Username' } });
    fireEvent.change(emailField, { target: { value: 'username_test@mail.com' } });

    fireEvent.submit(editButton);

    await waitFor(() => {
      expect(mockPutUser).toHaveBeenCalled();
    });

    await waitFor(() => {
      expect(mockToast).toHaveBeenCalled();
      expect(mockNavigate).toHaveBeenCalledWith('/settings/users');
    });

    /**
     * Test when password is empty
     * */

    fireEvent.change(passwordField, { target: { value: '' } });

    fireEvent.submit(editButton);

    await waitFor(() => {
      expect(mockPutUser).toHaveBeenCalledWith({
        id: 'some-id',
        body: {
          isActive: true,
          username: 'username_test',
          fullname: 'Username',
          email: 'username_test@mail.com',
          userRoles: [{ id: 'role_1', name: 'Role 1' }, { id: 'role_2', name: 'Role 2' }]
        }
      });
    });

    await waitFor(() => {
      expect(mockToast).toHaveBeenCalled();
      expect(mockNavigate).toHaveBeenCalledWith('/settings/users');
    });
  });

  it('should call "toast" when "onFormSubmit" did not recognize "id"', async () => {
    (useLocation as any).mockReturnValue({
      hash: '',
      key: 'some-key',
      pathname: '/settings/users/edit',
      search: '',
      state: null
    });
    (useParams as any).mockReturnValue({ type: 'edit' });

    (useGetRolesQuery as any).mockReturnValue({
      isFetching: false,
      isSuccess: true,
      isError: false,
      data: {
        totalPages: 1,
        totalData: 3,
        data: [
          { id: 'role_1', isActive: true, name: 'Role 1' },
          { id: 'role_2', isActive: true, name: 'Role 2' }
        ]
      },
      error: null
    });

    (usePutUserMutation as any).mockReturnValue([mockPutUser, {
      isLoading: false,
      isSuccess: true,
      isError: false,
      data: null,
      error: null
    }]);

    render(<TestComponent />);

    const usernameField = screen.getByPlaceholderText('Enter username');
    const passwordField = screen.getByPlaceholderText('Enter password');
    const fullnameField = screen.getByPlaceholderText('Enter fullname');
    const emailField = screen.getByPlaceholderText('Enter email');
    const editButton = screen.getByText('Edit');

    expect(editButton).toBeInTheDocument();

    fireEvent.change(usernameField, { target: { value: 'username_test' } });
    fireEvent.change(passwordField, { target: { value: 'username_test_password' } });
    fireEvent.change(fullnameField, { target: { value: 'Username' } });
    fireEvent.change(emailField, { target: { value: 'username_test@mail.com' } });

    fireEvent.submit(editButton);

    await waitFor(() => {
      expect(mockToast).toHaveBeenCalled();
    });
  });
});