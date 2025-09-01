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
import { useNavigate } from 'react-router';

import {
  useGetUsersQuery,
  usePatchUserMutation
} from '@/api/user';

import User from '@/pages/Setting/User';

vi.mock('react-router', () => ({
  useNavigate: vi.fn()
}));

vi.mock('@/api/user', () => ({
  useGetUsersQuery: vi.fn(),
  usePatchUserMutation: vi.fn()
}));

describe('pages/Setting/User/index.tsx', () => {
  const mockNavigate = vi.fn();
  const mockPatchUser = vi.fn();

  beforeEach(() => {
    (useNavigate as any).mockReturnValue(mockNavigate);
    (useGetUsersQuery as any).mockReturnValue({
      isFetching: false,
      isSuccess: false,
      isError: false,
      error: null,
      data: {
        totalData: 1,
        totalPages: 1,
        data: [
          {
            id: 'some-id-1',
            fullname: 'Some Full Name 1',
            username: 'username_1',
            email: 'some_email_1@email.com',
            isActive: false
          }
        ]
      }
    });

    (usePatchUserMutation as any).mockReturnValue([mockPatchUser, {
      isLoading: false,
      isSuccess: false,
      isError: false,
      error: null,
      data: null
    }]);
  });
  
  it('it should be able to identify placeholder', () => {
    render(<User />);

    expect(screen.getByText('Create User')).toBeInTheDocument();
  });

  it('should call "useNavigate" when "Create User" button clicked', () => {
    render(<User />);

    const createButton = screen.getByText('Create User');

    fireEvent.click(createButton);

    expect(mockNavigate).toHaveBeenCalledWith({ pathname: 'create' });
  });
});