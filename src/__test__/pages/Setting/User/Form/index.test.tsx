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
  screen
} from '@testing-library/react';
import {
  useNavigate,
  useParams
} from 'react-router';

import { useGetRolesQuery } from '@/api/roles';
import {
  usePostUserMutation,
  usePutUserMutation
} from '@/api/user';

import { initialValues } from '@/pages/Setting/User/Form/config';
import { validation } from '@/pages/Setting/User/Form/validator';

import Form from '@/pages/Setting/User/Form';

vi.mock('react-router', () => ({
  useNavigate: vi.fn(),
  useParams: vi.fn().mockReturnValue({ type: 'create' })
}));

vi.mock('@/api/roles', () => ({
  useGetRolesQuery: vi.fn()
}));

vi.mock('@/api/user', () => ({
  usePostUserMutation: vi.fn(),
  usePutUserMutation: vi.fn()
}));

const mockData = {
  isPasswordShown: false,
  isDataFetching: false,
  isLoading: false,
  mode: 'Create',
  initialValues,
  validation,
  roleOptions: []
};

const mockActions = {
  onBack: vi.fn().mockImplementation(() => {
    const navigate = useNavigate();

    navigate('/settings/users');
  }),
  setIsPasswordShown: vi.fn().mockImplementation(() => {
    mockData.isPasswordShown = !mockData.isPasswordShown;
  })
};

describe('@/pages/Setting/User/Form/index.tsx', () => {
  const mockNavigate = vi.fn();
  const mockPostUser = vi.fn();
  const mockPutUser = vi.fn();
  
  vi.mock('@/pages/Setting/User/Form/Presenter', () => ({
    withPresenter: ((callback: any) => {
      return () => {
        return callback({
          data: mockData,
          actions: mockActions
        });
      };
    })
  }));
  
  beforeEach(() => {
    (useNavigate as any).mockReturnValue(mockNavigate);
    (useGetRolesQuery as any).mockReturnValue({
      isFetching: false,
      isSuccess: false,
      isError: false,
      data: null,
      error: null
    });
    (usePostUserMutation as any).mockReturnValue([mockPostUser, {
      isFetching: false,
      isSuccess: false,
      isError: false,
      data: null,
      error: null
    }]);
    (usePutUserMutation as any).mockReturnValue([mockPutUser, {
      isFetching: false,
      isSuccess: false,
      isError: false,
      data: null,
      error: null
    }]);
  });
  
  it('should render correctly', () => {
    render(<Form />);
      
    expect(screen.getByText('Back')).toBeInTheDocument();
  });

  it('should render "FormInputWithIcon" correctly when "isPasswordShown" is false', () => {
    render(<Form />);

    const passwordField = screen.getByPlaceholderText('Input password');
    expect(passwordField).toHaveAttribute('type', 'password');
  });

  it('should call "setIsPasswordShown" when toggle button clicked', () => {
    render(<Form />);

    const toggleButton = screen.getByTestId('test-after-input-icon');

    fireEvent.click(toggleButton);

    expect(mockActions.setIsPasswordShown).toHaveBeenCalled();
  });

  /**
   * re-render to wait for "setIsPasswordShown" effect
   * */
  it('should render "FormInputWithIcon" correctly when "isPasswordShown" is true', () => {
    render(<Form />);
    
    const passwordField = screen.getByPlaceholderText('Input password');
    
    expect(passwordField).toHaveAttribute('type', 'text');
  });
  
  it('should call "useNavigate" when "Back" button clicked', () => {
    render(<Form />);
      
    const backButton = screen.getByText('Back');

    fireEvent.click(backButton);

    expect(mockNavigate).toHaveBeenCalledWith('/settings/users');
  });

  it('should render correct submit (create) Button label', () => {
    render(<Form />);

    const createButton = screen.getByText('Create');

    expect(createButton).toBeInTheDocument();
  });

  it('should render correct submit (edit) Button label', () => {
    (useParams as any).mockReturnValue({ type: 'edit' });
    mockData.mode = 'Edit';

    render(<Form />);

    const editButton = screen.getByText('Edit');

    expect(editButton).toBeInTheDocument();
  });

  it('should render correct svg when "isDataFetching" is true', () => {
    (useGetRolesQuery as any).mockReturnValue({
      isFetching: true,
      isSuccess: false,
      isError: false,
      data: null,
      error: null
    });
    mockData.isDataFetching = true;

    render(<Form />);

    const fetchingIcon = screen.getByTestId('test-fetching-icon');

    expect(fetchingIcon).toBeInTheDocument();
  });

  it('should have correct class when "isLoading" is true', () => {
    (useParams as any).mockReturnValue({ type: 'create' });
    (usePostUserMutation as any).mockReturnValue([mockPostUser, {
      isLoading: true,
      isSuccess: false,
      isError: false,
      data: null,
      error: null
    }]);
    mockData.mode = 'Create';
    mockData.isLoading = true;

    render(<Form />);

    const createButton = screen.getByText('Create');

    expect(createButton).toHaveClass('animate-bounce');
  });
});