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
import { isUndefined } from 'lodash';

import {
  useGetUsersQuery,
  usePatchUserMutation
} from '@/api/user';
import { ACTION } from '@/constants/action';
import { useToast } from '@/hooks/toast';
import { DataTable } from '@/compounds/DataTable';

import { withPresenter } from '@/pages/Setting/User/Presenter';

vi.mock('react-router', () => ({
  useNavigate: vi.fn()
}));

vi.mock('@/api/user', () => ({
  useGetUsersQuery: vi.fn(),
  usePatchUserMutation: vi.fn()
}));

vi.mock('@/hooks/toast', () => ({
  useToast: vi.fn()
}));

describe('@/pages/Setting/User/Presenter', () => {
  const mockNavigate = vi.fn();
  const mockPatchUser = vi.fn();
  const mockToast = vi.fn();

  beforeEach(() => {
    (useNavigate as any).mockReturnValue(mockNavigate);
    (useGetUsersQuery as any).mockReturnValue({
      isFetching: false,
      isSuccess: false,
      isError: false,
      error: null,
      data: undefined
    });

    (usePatchUserMutation as any).mockReturnValue([mockPatchUser, {
      isLoading: false,
      isSuccess: false,
      isError: false,
      error: null,
      data: undefined
    }]);

    (useToast as any).mockReturnValue({ toast: mockToast });
  });
  
  const TestComponent = withPresenter(({ data, actions }) => {
    const {
      columns,
      users
    } = data;
    const {
      onSearch,
      navigateToForm
    } = actions;

    return (
      <>
        <span>This is user component</span>
        <input
          data-testid="test-input"
          onChange={(ev) => onSearch(ev.target.value)}
        />
        <button
          data-testid="test-button-create"
          onClick={() => navigateToForm(ACTION.CREATE)}
        />
        <button
          data-testid="test-button-edit"
          onClick={() => navigateToForm(ACTION.EDIT, 'some-id')}
        />
        <DataTable
          tableData={!isUndefined(users)
            ? users?.data
            : []}
          tableColumns={columns}
          onSearch={vi.fn()}
          onStateChange={vi.fn()}
        />
      </>
    );
  });

  it('should render component correctly', () => {
    render(<TestComponent />);

    expect(screen.getByText('This is user component'));
  });

  it('should call expected params when "onSearch" called', async () => {
    render(<TestComponent />);

    const input = screen.getByTestId('test-input');
    fireEvent.change(input, { target: { value: 'test' } });
    
    await waitFor(() => {
      expect(useGetUsersQuery).toHaveBeenCalledWith(
        expect.objectContaining({ filters: 'search@=test' }),
        {
          refetchOnMountOrArgChange: true,
          skip: false
        }
      );
    });
  });

  it('should call "useNavigate" with expected params when "ACTION.CREATE" is its type', () => {
    render(<TestComponent />);

    const createButton = screen.getByTestId('test-button-create');

    fireEvent.click(createButton);

    expect(mockNavigate).toHaveBeenCalledWith({ pathname: 'create' });
  });

  it('should call "useNavigate" with expected params when "ACTION.EDIT" is its type', () => {
    render(<TestComponent />);

    const createButton = screen.getByTestId('test-button-edit');

    fireEvent.click(createButton);

    expect(mockNavigate).toHaveBeenCalledWith({ pathname: 'edit', search: 'id=some-id' });
  });

  it('should call expected function when "updateStatus" called and "usePatchUserQuery" success', async () => {
    const mockPatchRefetch = vi.fn();

    (useGetUsersQuery as any).mockReturnValue({
      isLoading: false,
      isSuccess: false,
      isError: false,
      error: null,
      data: {
        data: [
          { id: 'some-id-1', fullname: 'Some Name 1', username: 'username_1', isActive: false },
          { id: 'some-id-2', fullname: 'Some Name 2', username: 'username_2', isActive: true },
          { id: 'some-id-3', fullname: 'Some Name 3', username: 'username_3', isActive: false }
        ],
        totalData: 3,
        totalPages: 1
      },
      refetch: mockPatchRefetch
    });

    (usePatchUserMutation as any).mockReturnValue([mockPatchUser, {
      isLoading: false,
      isSuccess: true,
      isError: false,
      error: null,
      data: null
    }]);

    render(<TestComponent />);

    const switchStatus = screen.getAllByRole('switch');

    fireEvent.click(switchStatus[0]);

    await waitFor(() => {
      expect(mockToast).toHaveBeenCalled();
      expect(mockPatchRefetch).toHaveBeenCalled();
    });
  });

  it('should call expected function when "updateStatus" called and "usePatchUserQuery" failed', async () => {
    (useGetUsersQuery as any).mockReturnValue({
      isLoading: false,
      isSuccess: false,
      isError: false,
      error: null,
      data: {
        data: [
          { id: 'some-id-1', fullname: 'Some Name 1', username: 'username_1', isActive: false },
          { id: 'some-id-2', fullname: 'Some Name 2', username: 'username_2', isActive: true },
          { id: 'some-id-3', fullname: 'Some Name 3', username: 'username_3', isActive: false }
        ],
        totalData: 3,
        totalPages: 1
      }
    });

    (usePatchUserMutation as any).mockReturnValue([mockPatchUser, {
      isLoading: false,
      isSuccess: false,
      isError: true,
      error: { code: 40101, title: 'error', message: 'error message' },
      data: null
    }]);

    render(<TestComponent />);

    const switchStatus = screen.getAllByRole('switch');

    fireEvent.click(switchStatus[0]);

    await waitFor(() => {
      expect(mockToast).toHaveBeenCalled();
    });
  });
});