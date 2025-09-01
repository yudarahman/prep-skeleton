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

import { withPresenter } from '@/compounds/NavSide/Presenter';

vi.mock('react-router', () => ({
  useLocation: vi.fn(),
  useNavigate: vi.fn()
}));

vi.mock('@/constants/menus', () => {
  return {
    menus: [
      {
        id: 'menu-1',
        isExpanded: false,
        title: 'Dashboard',
        url: '/dashboard',
        icon: LayoutDashboard,
        children: []
      },
      {
        id: 'menu-2',
        isExpanded: false,
        title: 'Dashboard 2',
        url: '/dashboard-2',
        icon: LayoutDashboard,
        children: []
      }
    ]
  };
});

describe('@/compounds/NavSide/Presenter.tsx', () => {
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
      onToggleMenu,
      onNavigateToPath
    } = actions;
    
    return (
      <>
        {
          menus.map((item) => (
            <div key={item.id}>
              <span
                data-testid="test-span"
                className={`font-bold ${isPathActive(item.url) ? 'italic' : 'underline'}`}
              >
                Test Span    
              </span>
              <button
                data-testid="test-button"
                onClick={() => onToggleMenu(item.id)}
              >
                Test Button
              </button>
              <button
                data-testid="test-navigate-button"
                onClick={() => onNavigateToPath(item.url)}
              >
                Test Button
              </button>
              {
                item.isExpanded
                  ? (<div data-testid="test-expanded-div"/>)
                  : (<div data-testid="test-collapsed-div"/>)
              }
            </div>
          ))
        }
      </>
    );
  });

  it('should return expected class when "isPathActive" return true', () => {
    (useLocation as any).mockReturnValueOnce({ pathname: '/dashboard' });
    
    render(<TestComponent />);
    const testSpan = screen.getAllByTestId('test-span');

    expect(testSpan[0]).toHaveClass('font-bold italic');
  });

  it('should return expected class when "isPathActive" return false', () => {
    (useLocation as any).mockReturnValueOnce({ pathname: '/settings' });

    render(<TestComponent />);
    const testSpan = screen.getAllByTestId('test-span');

    expect(testSpan[0]).toHaveClass('font-bold underline');
  });

  it('should return expected class when "isPathActive" return false because of "useLocation" is empty', () => {
    (useLocation as any).mockReturnValueOnce({});

    render(<TestComponent />);
    const testSpan = screen.getAllByTestId('test-span');

    expect(testSpan[0]).toHaveClass('font-bold underline');
  });

  it('should return expected element when "onToggleMenu" triggered', () => {
    render(<TestComponent />);
    const testButton = screen.getAllByTestId('test-button');
    const collapsedDiv = screen.getAllByTestId('test-collapsed-div');

    expect(collapsedDiv[0]).toBeInTheDocument();

    fireEvent.click(testButton[0]);

    const expandedDiv = screen.getByTestId('test-expanded-div');

    expect(expandedDiv).toBeInTheDocument();

    fireEvent.click(testButton[1]);

    expect(expandedDiv).toBeInTheDocument();
  });
  
  it('should return "/dashboard" path when "onNavigateToPath" is called', () => {
    render(<TestComponent />);
    const testNavigateButton = screen.getAllByTestId('test-navigate-button');
    
    fireEvent.click(testNavigateButton[0]);
    
    expect(mockNavigate).toHaveBeenCalledWith('/dashboard');
  });

  it('should return "/dashboard-2" path when "onNavigateToPath" is called', () => {
    render(<TestComponent />);
    const testNavigateButton = screen.getAllByTestId('test-navigate-button');

    fireEvent.click(testNavigateButton[1]);

    expect(mockNavigate).toHaveBeenCalledWith('/dashboard-2');
  });
});