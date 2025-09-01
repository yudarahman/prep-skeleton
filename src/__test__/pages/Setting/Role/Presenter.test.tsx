/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  afterAll,
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
  vi
} from 'vitest';
import { useNavigate } from 'react-router';
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor
} from '@testing-library/react';

import IntersectionObserverMock from '@/mocks/IntersectionObserverMock.ts';
import {
  useGetRolesQuery,
  usePatchRoleMutation
} from '@/api/roles';
import { ACTION } from '@/constants/action';
import { DataTable } from '@/compounds/DataTable';
import { MobileList } from '@/compounds/MobileList';
import { useToast } from '@/hooks/toast';

import { withPresenter } from '@/pages/Setting/Role/Presenter';

vi.mock('react-router', () => ({
  useNavigate: vi.fn()
}));

vi.mock('@/api/roles', () => ({
  useGetRolesQuery: vi.fn(),
  usePatchRoleMutation: vi.fn()
}));

vi.mock('@/hooks/toast', () => ({
  useToast: vi.fn()
}));

describe('@/pages/Setting/Role/Presenter.tsx', () => {
  const mockNavigate = vi.fn();
  const mockPatchRole = vi.fn();
  const mockToast = vi.fn();
  const mockOnIntersect = vi.fn();
  let intersectionObserver: any = null;
  
  beforeEach(() => {
    (useNavigate as any).mockReturnValue(mockNavigate);
    (useGetRolesQuery as any).mockReturnValue({
      isLoading: false,
      isSuccess: false,
      isError: false,
      error: null,
      data: null
    });
    (usePatchRoleMutation as any).mockReturnValue([mockPatchRole, {
      isLoading: false,
      isSuccess: false,
      isError: false,
      error: null,
      data: null
    }]);

    (useToast as any).mockReturnValue({ toast: mockToast });
  });

  beforeAll(() => {
    vi.stubGlobal('IntersectionObserver', class {
      constructor(callback: any) {
        intersectionObserver = new IntersectionObserverMock(callback);
        return intersectionObserver;
      }
    });
  });

  afterAll(() => {
    vi.unstubAllGlobals();
  });
  
  const TestComponent = withPresenter(({ data, actions }) => {
    const {
      isFetching,
      columns,
      roles
    } = data;
    const {
      navigateToForm,
      onSearch
    } = actions;
        
    return (
      <>
        <span>Test presenter component</span>
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
          tableColumns={columns}
          tableData={roles?.data as ARoles[]}
          onSearch={vi.fn()}
          onStateChange={vi.fn()}
        />
        <MobileList
          isFetching={isFetching}
          listData={roles?.data}
          onIntersecting={mockOnIntersect}
          onSearch={vi.fn()}
        >
          {
            ({ name }) => {
              return (
                <div>
                  <span>{name}</span>
                </div>
              );
            }
          }
        </MobileList>
      </>
    );
  });

  it('should render correctly', () => {
    render(<TestComponent/>);

    expect(screen.getByText('Test presenter component'));
  });

  it('should call expected params when "onSearch" called', () => {
    render(<TestComponent />);

    const input = screen.getByTestId('test-input');
    fireEvent.change(input, { target: { value: 'test' } });

    expect(useGetRolesQuery).toHaveBeenCalledWith(
      expect.objectContaining({ filters: 'search@=test' }),
      {
        refetchOnMountOrArgChange: true,
        skip: false
      }
    );
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

  it('should call "useNavigate" with expected params when "onNavigateToPermissionForm" called', () => {
    (useGetRolesQuery as any).mockReturnValue({
      isLoading: false,
      isSuccess: false,
      isError: false,
      error: null,
      data: {
        totalPages: 1,
        totalData: 3,
        data: [
          {
            id: 'some-id-1',
            isActive: true,
            name: 'Some Role Name 1'
          },
          {
            id: 'some-id-2',
            isActive: true,
            name: 'Some Role Name 2'
          },
          {
            id: 'some-id-3',
            isActive: true,
            name: 'Some Role Name 3'
          }
        ]
      }
    });

    render(<TestComponent />);
    const permissionEditIcons = screen.getAllByTestId('test-edit-permission-column-icon');

    expect(permissionEditIcons[0]).toBeInTheDocument();

    fireEvent.click(permissionEditIcons[0]);

    expect(mockNavigate).toHaveBeenCalledWith({ pathname: 'permission', search: 'id=some-id-1' });
  });

  it('should call "useNavigate" with expected params when "onNavigateToPermissionForm" called and "id" is undefined', () => {
    (useGetRolesQuery as any).mockReturnValue({
      isLoading: false,
      isSuccess: false,
      isError: false,
      error: null,
      data: {
        totalPages: 1,
        totalData: 3,
        data: [
          {
            id: undefined,
            isActive: true,
            name: 'Some Role Name 1'
          },
          {
            id: 'some-id-2',
            isActive: true,
            name: 'Some Role Name 2'
          },
          {
            id: 'some-id-3',
            isActive: true,
            name: 'Some Role Name 3'
          }
        ]
      }
    });

    render(<TestComponent />);
    const permissionEditIcons = screen.getAllByTestId('test-edit-permission-column-icon');

    expect(permissionEditIcons[0]).toBeInTheDocument();

    fireEvent.click(permissionEditIcons[0]);

    expect(mockNavigate).toHaveBeenCalledWith({ pathname: 'permission' });
  });
  
  it('should call "usePatchRoleMutation" when "updateStatus" called', async () => {
    (useGetRolesQuery as any).mockReturnValue({
      isLoading: false,
      isSuccess: false,
      isError: false,
      error: null,
      data: {
        data: [
          { id: 'some-id-1', name: 'Some Name 1', isActive: false },
          { id: 'some-id-2', name: 'Some Name 2', isActive: true },
          { id: 'some-id-3', name: 'Some Name 3', isActive: false }
        ],
        totalData: 3,
        totalPages: 1
      }
    });
    
    render(<TestComponent />);
    
    const switchStatus = screen.getAllByRole('switch');

    fireEvent.click(switchStatus[0]);

    await waitFor(() => {
      expect(mockPatchRole).toHaveBeenCalledWith({ id: 'some-id-1', body: { isActive: true } });
    });
  });

  it('should call expected function when "updateStatus" called and "usePatchRoleQuery" success', async () => {
    const mockPatchRefetch = vi.fn();
    (useGetRolesQuery as any).mockReturnValue({
      isLoading: false,
      isSuccess: false,
      isError: false,
      error: null,
      data: {
        data: [
          { id: 'some-id-1', name: 'Some Name 1', isActive: false },
          { id: 'some-id-2', name: 'Some Name 2', isActive: true },
          { id: 'some-id-3', name: 'Some Name 3', isActive: false }
        ],
        totalData: 3,
        totalPages: 1
      },
      refetch: mockPatchRefetch
    });

    (usePatchRoleMutation as any).mockReturnValue([mockPatchRole, {
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

  it('should call expected function when "updateStatus" called and "usePatchRoleQuery" failed', async () => {
    (useGetRolesQuery as any).mockReturnValue({
      isLoading: false,
      isSuccess: false,
      isError: false,
      error: null,
      data: {
        data: [
          { id: 'some-id-1', name: 'Some Name 1', isActive: false },
          { id: 'some-id-2', name: 'Some Name 2', isActive: true },
          { id: 'some-id-3', name: 'Some Name 3', isActive: false }
        ],
        totalData: 3,
        totalPages: 1
      }
    });

    (usePatchRoleMutation as any).mockReturnValue([mockPatchRole, {
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

  it('should call "onIntersect" when data scrolled', async () => {
    (useGetRolesQuery as any).mockReturnValue({
      isFetching: false,
      isSuccess: false,
      isError: false,
      error: null,
      data: {
        data: [
          { id: 'some-id-1', name: 'Some Name 1', isActive: false },
          { id: 'some-id-2', name: 'Some Name 2', isActive: true },
          { id: 'some-id-3', name: 'Some Name 3', isActive: false }
        ],
        totalData: 3,
        totalPages: 2
      }
    });

    render(<TestComponent />);

    act(() => {
      intersectionObserver.simulateIntersection(true);
    });

    expect(mockOnIntersect).toHaveBeenCalled();
  });
});