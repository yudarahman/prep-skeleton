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
import { useNavigate } from 'react-router';

import { useLazyGetMeQuery } from '@/api/user';
import { useToast } from '@/hooks/toast';

import Database from '@/store/database/base';

import { withPresenter } from '@/compounds/NavTop/Presenter';

vi.mock('react-router', () => ({
  useLocation: vi.fn().mockReturnValue({
    pathname: '/settings/users',
    search: '',
    hash: '',
    state: null,
    key: 'mockedKey'
  }),
  useNavigate: vi.fn()
}));

vi.mock('@/api/user', () => ({
  useLazyGetMeQuery: vi.fn()
}));

vi.mock('@/hooks/toast', () => ({
  useToast: vi.fn().mockReturnValue({
    toast: vi.fn()
  })
}));

vi.mock('@/contexts/TitleProvider', () => ({
  useTitle: vi.fn().mockReturnValue({
    setTitle: vi.fn()
  })
}));

vi.mock('@/lib/utils', () => ({
  getInitials: vi.fn(),
  generateErrorToast: vi.fn().mockReturnValue('Unknown error')
}));

describe('@/compounds/NavTop/Presenter.tsx', () => {
  const mockNavigate = vi.fn();
  const mockLazyGetMe = vi.fn();
  const mockToast = vi.fn();

  beforeEach(() => {
    (useNavigate as any).mockReturnValue(mockNavigate);
    (useLazyGetMeQuery as any).mockReturnValue([mockLazyGetMe, {
      isFetching: false,
      isLoading: false,
      isError: false,
      error: null,
      data: {
        id: 'some-id',
        isActive: true,
        username: 'johndoe',
        fullname: 'John Doe',
        email: 'johndoe@example.com',
        lastLogin: '2024-01-01T00:00:00.000Z',
        domain: null,
        defaultLandingPage: null,
        roles: [
          {
            id: 'some-user-id',
            name: 'Administrator'
          }
        ]
      }
    }]);
    (useToast as any).mockReturnValue({
      toast: mockToast
    });
  });

  const TestComponent = withPresenter(({ data, actions }) => {
    const {
      isDatabaseLoading,
      isFetching,
      user,
      paths
    } = data;
    const { logout } = actions;

    return (
      <div data-testid="test-container">
        {
          isDatabaseLoading
            ? (<span>Database Loading...</span>)
            : (<span>Database Not Loading...</span>)
        }
        {
          isFetching
            ? (<span>Server Loading...</span>)
            : (<span>Server Not Loading...</span>)
        }
        {
          paths.map((path) => (
            <span key={path}>
              {path}
            </span>
          ))
        }
        <span>
          {user?.fullname}
        </span>
        <button onClick={logout}>
          logout
        </button>
      </div>
    );
  });

  it('should render correctly', () => {
    render(<TestComponent />);

    const testContainer = screen.getByTestId('test-container');
    expect(testContainer).toBeInTheDocument();
  });

  it('should render span with correct path name', () => {
    render(<TestComponent />);

    const spanPaths1 = screen.getByText('Settings');
    const spanPaths2 = screen.getByText('Users');
    expect(spanPaths1).toBeInTheDocument();
    expect(spanPaths2).toBeInTheDocument();
  });

  it('should render correct user "fullname" from database', async () => {
    vi.spyOn(Database.prototype, 'getData')
      .mockResolvedValueOnce({
        _id: 'some-id',
        value: { fullname: 'John Doe' }
      });

    render(<TestComponent />);

    await waitFor(() => {
      const userSpan = screen.getByText('John Doe');
      expect(userSpan).toBeInTheDocument();
    });
  });

  it('should call "getMe" when "value" from database is empty', async () => {
    vi.spyOn(Database.prototype, 'getData')
      .mockResolvedValueOnce({
        _id: 'some-id',
        value: {}
      });

    render(<TestComponent />);

    await waitFor(() => {
      expect(mockLazyGetMe).toHaveBeenCalled();
    });
  });

  it('should call "getMe" when database reject', async () => {
    vi.spyOn(Database.prototype, 'getData')
      .mockRejectedValue(new Error());

    render(<TestComponent />);

    await waitFor(() => {
      expect(mockLazyGetMe).toHaveBeenCalled();
    });
  });

  it('should render expected element when "getMeIsFetching" is true', () => {
    vi.spyOn(Database.prototype, 'getData')
      .mockRejectedValue(new Error());

    (useLazyGetMeQuery as any)
      .mockReturnValue([mockLazyGetMe, {
        isFetching: true,
        isLoading: false,
        isError: false,
        error: null,
        data: {
          id: 'some-id',
          isActive: true,
          username: 'johndoe',
          fullname: 'John Doe',
          email: 'johndoe@example.com',
          lastLogin: '2024-01-01T00:00:00.000Z',
          domain: null,
          defaultLandingPage: null,
          roles: [
            {
              id: 'some-user-id',
              name: 'Administrator'
            }
          ]
        }
      }]);

    render(<TestComponent />);

    const serverSpanNotLoading = screen.getByText('Server Loading...');
    expect(serverSpanNotLoading).toBeInTheDocument();
  });

  it('should render expected element when "getMeIsFetching" is false', () => {
    vi.spyOn(Database.prototype, 'getData')
      .mockRejectedValue(new Error());

    (useLazyGetMeQuery as any)
      .mockReturnValue([mockLazyGetMe, {
        isFetching: false,
        isLoading: false,
        isError: false,
        error: null,
        data: {
          id: 'some-id',
          isActive: true,
          username: 'johndoe',
          fullname: 'John Doe',
          email: 'johndoe@example.com',
          lastLogin: '2024-01-01T00:00:00.000Z',
          domain: null,
          defaultLandingPage: null,
          roles: [
            {
              id: 'some-user-id',
              name: 'Administrator'
            }
          ]
        }
      }]);

    render(<TestComponent />);

    const serverSpanNotLoading = screen.getByText('Server Not Loading...');
    expect(serverSpanNotLoading).toBeInTheDocument();
  });
  
  it('should render expected element when "getMeIsSuccess"', () => {
    vi.spyOn(Database.prototype, 'getData')
      .mockRejectedValue(new Error());

    (useLazyGetMeQuery as any)
      .mockReturnValue([mockLazyGetMe, {
        isFetching: true,
        isLoading: false,
        isError: false,
        error: null,
        data: {
          id: 'some-id',
          isActive: true,
          username: 'johndoe',
          fullname: 'John Doe',
          email: 'johndoe@example.com',
          lastLogin: '2024-01-01T00:00:00.000Z',
          domain: null,
          defaultLandingPage: null,
          roles: [
            {
              id: 'some-user-id',
              name: 'Administrator'
            }
          ]
        }
      }]);
    
    render(<TestComponent />);

    const databaseSpanNotLoading = screen.getByText('Database Not Loading...');
    expect(databaseSpanNotLoading).toBeInTheDocument();
  });

  it('should render expected element when "getMeIsSuccess" and user is there', () => {
    vi.spyOn(Database.prototype, 'getData')
      .mockRejectedValue(new Error());

    (useLazyGetMeQuery as any)
      .mockReturnValue([mockLazyGetMe, {
        isFetching: false,
        isLoading: false,
        isSuccess: true,
        isError: false,
        error: null,
        data: {
          id: 'some-id',
          isActive: true,
          username: 'johndoe',
          fullname: 'John Doe',
          email: 'johndoe@example.com',
          lastLogin: '2024-01-01T00:00:00.000Z',
          domain: null,
          defaultLandingPage: null,
          roles: [
            {
              id: 'some-user-id',
              name: 'Administrator'
            }
          ]
        }
      }]);

    render(<TestComponent />);

    const userSpan = screen.getByText('John Doe');
    expect(userSpan).toBeInTheDocument();
  });

  it('should call "navigate" when "logout" succeed', async () => {
    vi.spyOn(Database.prototype, 'deleteData')
      .mockResolvedValue();
    
    render(<TestComponent />);
    const logoutButton = screen.getByText('logout');
    
    fireEvent.click(logoutButton);

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalled();
    });
  });

  it('should call "toast" when "logout" failed', async () => {
    vi.spyOn(Database.prototype, 'deleteData')
      .mockRejectedValue({ error: 'Unknown error' });

    render(<TestComponent />);
    const logoutButton = screen.getByText('logout');

    fireEvent.click(logoutButton);

    await waitFor(() => {
      expect(mockToast).toHaveBeenCalledWith('Unknown error');
    });
  });
});
