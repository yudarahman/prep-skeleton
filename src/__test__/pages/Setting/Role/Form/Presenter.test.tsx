/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  beforeEach,
  describe,
  expect,
  it,
  vi
} from 'vitest';
import {
  useLocation,
  useNavigate,
  useParams
} from 'react-router';
import {
  fireEvent,
  render,
  screen,
  waitFor
} from '@testing-library/react';
import {
  Formik,
  Form,
  Field
} from 'formik';

import {
  useGetRoleByIdQuery,
  usePostRoleMutation,
  usePutRoleMutation
} from '@/api/roles';

import { generateSuccessToast } from '@/lib/utils';
import { useToast } from '@/hooks/toast';

import { withPresenter } from '@/pages/Setting/Role/Form/Presenter';
import { validation } from '@/pages/Setting/Role/Form/validator';

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

vi.mock('@/hooks/toast', () => ({
  useToast: vi.fn()
}));

vi.mock('@/lib/utils', () => ({
  generateSuccessToast: vi.fn()
}));

describe('@/pages/Setting/Role/Form/Presenter', () => {
  const mockNavigate = vi.fn();
  const mockPostRole = vi.fn();
  const mockPutRole = vi.fn();
  const mockToast = vi.fn();
  
  beforeEach(() => {
    (useNavigate as any).mockReturnValue(mockNavigate);
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

    (useToast as any).mockReturnValue({ toast: mockToast });
    (generateSuccessToast as any).mockReturnValue('');
  });
  
  const TestComponent = withPresenter(({ data, actions }) => {
    const {
      initialValues,
      mode
    } = data;
    const {
      onBack,
      onFormSubmit
    } = actions;
    
    return (
      <>
        <button onClick={onBack}>
          Back
        </button>
        <Formik
          initialValues={initialValues}
          validationSchema={validation}
          onSubmit={onFormSubmit}
        >
          {() => (
            <Form>
              <Field
                name="name"
                placeholder="Enter name"
              />
              <button type="submit">
                {mode}
              </button>
            </Form>
          )}
        </Formik>
      </>
    );
  });


  it('should call "useNavigate" when back button clicked', () => {
    render(<TestComponent />);

    const backButton = screen.getByText('Back');
    fireEvent.click(backButton);

    expect(mockNavigate).toHaveBeenCalledWith('/settings/roles');
  });

  it('should call "usePostRoleMutation" when back button clicked', async () => {
    render(<TestComponent />);

    const nameInput = screen.getByPlaceholderText('Enter name');
    const createButton = screen.getByText('Create');
    fireEvent.change(nameInput, { target: { value: 'test' } });
    fireEvent.submit(createButton);

    await waitFor(() => {
      expect(mockPostRole).toHaveBeenCalled();
    });
  });

  it('should call "toast" and "onBack" when "usePostRoleMutation.isSuccess" is true', async () => {
    (usePostRoleMutation as any).mockReturnValue([mockPostRole, {
      isLoading: false,
      isSuccess: true,
      isError: false,
      data: null,
      error: null
    }]);
    
    render(<TestComponent />);

    const nameInput = screen.getByPlaceholderText('Enter name');
    const createButton = screen.getByText('Create');
    fireEvent.change(nameInput, { target: { value: 'test' } });
    fireEvent.submit(createButton);

    await waitFor(() => {
      expect(mockToast).toHaveBeenCalled();
      expect(mockNavigate).toHaveBeenCalledWith('/settings/roles');
    });
  });
  
  it('should call "useGetRoleByIdQuery" when "id" is not null', async () => {
    (useLocation as any).mockReturnValue({
      hash: '',
      key: 'some-key',
      pathname: '/settings/roles/edit',
      search: '?id=some-id',
      state: null
    });
    
    (useGetRoleByIdQuery as any).mockReturnValue({
      isLoading: false,
      isSuccess: true,
      isError: false,
      data: { id: 'some-id', name: 'some-name' },
      error: null
    });
    
    
    render(<TestComponent />);
    
    await waitFor(() => {
      const nameInput = screen.getByPlaceholderText('Enter name');
      expect(nameInput).toHaveValue('some-name');
    });
  });

  it('should call "toast" and "onBack" when "usePutRoleMutation.isSuccess" is true', async () => {
    (useLocation as any).mockReturnValue({
      hash: '',
      key: 'some-key',
      pathname: '/settings/roles/edit',
      search: '?id=some-id',
      state: null
    });
    (useParams as any).mockReturnValue({ type: 'edit' });

    (usePutRoleMutation as any).mockReturnValue([mockPutRole, {
      isLoading: false,
      isSuccess: true,
      isError: false,
      data: null,
      error: null
    }]);

    render(<TestComponent />);

    const nameInput = screen.getByPlaceholderText('Enter name');
    const editButton = screen.getByText('Edit');
    fireEvent.change(nameInput, { target: { value: 'test' } });
    fireEvent.submit(editButton);

    await waitFor(() => {
      expect(mockToast).toHaveBeenCalled();
      expect(mockNavigate).toHaveBeenCalledWith('/settings/roles');
    });
  });

  it('should do nothing when "onFormSubmit" did not recognize any ACTION', async () => {
    (useLocation as any).mockReturnValue({
      hash: '',
      key: 'some-key',
      pathname: '/settings/roles/detail',
      search: '?id=some-id',
      state: null
    });
    (useParams as any).mockReturnValue({ type: 'detail' });

    render(<TestComponent />);

    const nameInput = screen.getByPlaceholderText('Enter name');
    const detailButton = screen.getByText('Detail');
    fireEvent.change(nameInput, { target: { value: 'test' } });
    fireEvent.submit(detailButton);

    expect(detailButton).not.toBeDisabled();
  });
});