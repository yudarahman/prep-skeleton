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
import {
  fireEvent,
  render,
  screen
} from '@testing-library/react';
import { useNavigate } from 'react-router';

import IntersectionObserverMock from '@/mocks/IntersectionObserverMock.ts';
import {
  useGetRolesQuery,
  usePatchRoleMutation
} from '@/api/roles';

import Role from '@/pages/Setting/Role';

vi.mock('react-router', () => ({
  useNavigate: vi.fn()
}));

vi.mock('@/api/roles', () => ({
  useGetRolesQuery: vi.fn(),
  usePatchRoleMutation: vi.fn()
}));

describe('pages/Setting/Role/index.tsx', () => {
  const mockPatchRole = vi.fn();
  const mockNavigate = vi.fn();
  let intersectionObserver: any = null;

  beforeEach(() => {
    (useNavigate as any).mockReturnValue(mockNavigate);
    (useGetRolesQuery as any).mockReturnValue({
      isLoading: false,
      isSuccess: false,
      isError: false,
      error: null,
      data: {
        totalPages: 1,
        totalData: 1,
        data: [{
          id: 'some-id-1',
          name: 'Some Roles Name 1'
        }]
      }
    });
    (usePatchRoleMutation as any).mockReturnValue([mockPatchRole, {
      isLoading: false,
      isSuccess: false,
      isError: false,
      error: null,
      data: null
    }]);
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

  it('should render expected action button', () => {
    render(<Role />);

    expect(screen.getAllByText('Create Role')[0]).toBeInTheDocument();
  });

  it('should call expected function when "Create Role" (DataTable action) clicked', () => {
    render(<Role />);

    const buttonCreate = screen.getAllByText('Create Role');

    fireEvent.click(buttonCreate[0]);

    expect(mockNavigate).toHaveBeenCalled();
  });

  it('should call expected function when "Create Role" (MobileList action) clicked', () => {
    render(<Role />);

    const buttonCreate = screen.getAllByText('Create Role');

    fireEvent.click(buttonCreate[1]);

    expect(mockNavigate).toHaveBeenCalled();
  });

  it('should call expected function when edit icon (MobileList) clicked', () => {
    render(<Role />);

    const editButton = screen.getByTestId('test-edit-mobile-icon');

    fireEvent.click(editButton);

    expect(mockNavigate).toHaveBeenCalled();
  });
});