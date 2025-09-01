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
  useNavigate
} from 'react-router';
import { LayoutDashboard } from 'lucide-react';
import {
  fireEvent,
  render,
  screen
} from '@testing-library/react';

import { withPresenter } from '@/compounds/NavBottom/Presenter';

vi.mock('react-router', () => ({
  useLocation: vi.fn(),
  useNavigate: vi.fn()
}));

vi.mock('@/constants/menus', () => {
  return {
    menus: [
      {
        id: 'menu-1',
        isExpanded: null,
        title: 'Dashboard',
        url: '/dashboard',
        icon: LayoutDashboard,
        children: []
      },
      {
        id: 'menu-2',
        isExpanded: null,
        title: 'Dashboard 2',
        url: '/dashboard-2',
        icon: LayoutDashboard,
        children: []
      },
      {
        id: 'menu-3',
        isExpanded: false,
        title: 'Dashboard 3',
        url: '/dashboard-3',
        icon: LayoutDashboard,
        children: [
          {
            id: 'child-menu-1',
            title: 'Child Dashboard 1',
            url: '/dashboard-3/child-1',
            icon: LayoutDashboard
          }
        ]
      },
      {
        id: 'menu-4',
        isExpanded: false,
        title: 'Dashboard 4',
        url: '/dashboard-4',
        icon: LayoutDashboard,
        children: [
          {
            id: 'child-menu-1',
            title: 'Child Dashboard 1',
            url: '/dashboard-4/child-1',
            icon: LayoutDashboard
          }
        ]
      }
    ]
  };
});

describe('@/compounds/NavBottom/Presenter.tsx', () => {
  const mockNavigate = vi.fn();
  
  beforeEach(() => {
    (useNavigate as any).mockReturnValue(mockNavigate);
  });
  
  const TestComponent = withPresenter(({ data, actions }) => {
    const {
      menus,
      isPathActive
    } = data;
    const {
      onNavigateToPath,
      onToggleMenu
    } = actions;
    
    return (
      <>
        {
          menus.map((item) => (
            <div key={item.id}>
              <span
                data-testid="test-span"
                className={isPathActive(item.url) ? 'font-bold' : 'font-normal'}
                onClick={() => onToggleMenu(item.id)}
              >
                Test Span
              </span>
              {
                item.isExpanded === null && (<div data-testid="test-expanded-null-div" />)
              }
              {
                item.isExpanded
                  ? (<div data-testid="test-expanded-div" />)
                  : (<div data-testid="test-collapsed-div" />)
              }
              <button
                data-testid="test-button"
                onClick={() => onNavigateToPath(item.url)}
              />
            </div>
          ))
        }
      </>
    );
  });
  
  it('should return expected class on "test-span" when "isPathActive" check "pathname"', () => {
    (useLocation as any).mockReturnValueOnce({ pathname: '/dashboard' });

    render(<TestComponent />);
    const placeholderSpans = screen.getAllByTestId('test-span');

    expect(placeholderSpans[0]).toHaveClass('font-bold');
    expect(placeholderSpans[1]).toHaveClass('font-normal');
  });

  it('should render expected element when "onToggleMenu" triggered', () => {
    render(<TestComponent />);
    const placeholderSpans = screen.getAllByTestId('test-span');

    fireEvent.click(placeholderSpans[2]);

    expect(screen.getAllByTestId('test-expanded-null-div')[0]).toBeInTheDocument();
    expect(screen.getAllByTestId('test-collapsed-div')[0]).toBeInTheDocument();
    expect(screen.getByTestId('test-expanded-div')).toBeInTheDocument();
  });

  it('should call expected function when "onNavigateToPath" is triggered"', () => {
    render(<TestComponent />);

    const navigateButton = screen.getAllByTestId('test-button');

    fireEvent.click(navigateButton[0]);

    expect(mockNavigate).toHaveBeenCalledWith('/dashboard');
  });
});