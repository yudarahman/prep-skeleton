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

import Main from '@/pages/Main';

vi.mock('react-router', () => ({
  useLocation: vi.fn().mockReturnValue({
    pathname: '/mocked-path',
    search: '',
    hash: '',
    state: null,
    key: 'mockedKey'
  }),
  useNavigate: vi.fn(),
  Outlet: vi.fn()
}));

vi.mock('@/contexts/TitleProvider', () => ({
  useTitle: vi.fn().mockReturnValue({
    setTitle: vi.fn()
  })
}));

vi.mock('@/api/user', () => {
  return {
    useLazyGetMeQuery: vi.fn().mockReturnValue([
      vi.fn(),
      {
        isFetching: false,
        isLoading: false,
        data: null,
        error: null
      }
    ])
  };
});

describe('@/pages/Main/index.tsx', () => {
  it('should render empty component', () => {
    render(<Main />);
    
    const mainContainer = screen.getByTestId('test-main-container');
    const outletContainer = screen.getByTestId('test-main-outlet-container');
    
    expect(mainContainer).toBeInTheDocument();
    expect(outletContainer).toBeInTheDocument();
  });
});