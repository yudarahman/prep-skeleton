/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  describe,
  expect,
  it,
  vi
} from 'vitest';
import {
  render,
  screen
} from '@testing-library/react';

import NavTop from '@/compounds/NavTop';

const mockData = {
  isDatabaseLoading: false,
  isFetching: false,
  isError: false,
  user: { fullname: 'John Doe' } as { fullname?: string | null },
  paths: ['Settings', 'Users']
};

const mockActions = {
  logout: vi.fn()
};

describe('@/compounds/NavTop/index.tsx', () => {
  vi.mock('@/compounds/NavTop/Presenter', () => ({
    withPresenter: ((callback: any) => {
      return () => {
        return callback({
          data: mockData,
          actions: mockActions
        });
      };
    })
  }));
  
  it('should render icon in breadcrumb when "paths" more than one item', () => {
    render(<NavTop />);
    
    const breadcrumbIcon = screen.getByTestId('test-breadcrumb-icon');
    expect(breadcrumbIcon).toBeInTheDocument();
  });

  it('should render only path when "paths" has only one item', () => {
    mockData.paths = ['Settings'];

    render(<NavTop />);

    const pathBreadcrumbSpan = screen.getByText('Settings');
    expect(pathBreadcrumbSpan).toBeInTheDocument();
  });
  
  it('should render icon when "isDatabaseLoading" is true and "isFetching" is false', () => {
    mockData.isDatabaseLoading = true;

    render(<NavTop />);

    const loadingIcon = screen.getByTestId('test-loading-icon');
    expect(loadingIcon).toBeInTheDocument();
  });

  it('should render icon when "isDatabaseLoading" is false and "isFetching" is true', () => {
    mockData.isFetching = true;

    render(<NavTop />);

    const loadingIcon = screen.getByTestId('test-loading-icon');
    expect(loadingIcon).toBeInTheDocument();
  });

  it('should render avatar container when "isDatabaseLoading" is false and "isFetching" is false', () => {
    mockData.isDatabaseLoading = false;
    mockData.isFetching = false;

    render(<NavTop />);

    const avatarContainer = screen.getByTestId('test-avatar-container');
    expect(avatarContainer).toBeInTheDocument();
  });

  it('should render correct text when "isError" is true', () => {
    mockData.isDatabaseLoading = false;
    mockData.isFetching = false;
    mockData.isError = true;

    render(<NavTop />);

    const avatarText = screen.getByText('X');
    expect(avatarText).toBeInTheDocument();
  });

  it('should render correct text when user have "fullname"', () => {
    mockData.isDatabaseLoading = false;
    mockData.isFetching = false;
    mockData.isError = false;
    mockData.user = {
      ...mockData.user,
      fullname: 'John Doe'
    };

    render(<NavTop />);

    const avatarText = screen.getByText('JD');
    expect(avatarText).toBeInTheDocument();
  });
});