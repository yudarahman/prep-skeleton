/* eslint-disable @typescript-eslint/no-explicit-any */
import {
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
  BriefcaseBusiness,
  CircleUserRound,
  Cog
} from 'lucide-react';

import NavBottom from '@/compounds/NavBottom';

vi.mock('react-router', () => ({
  useLocation: vi.fn(),
  useNavigation: vi.fn()
}));

const mockData = {
  menus: [
    {
      id: 'menu-2',
      isExpanded: false,
      title: 'Settings',
      url: '/settings',
      icon: Cog,
      children: [
        {
          id: 'menu-2-child-1',
          title: 'Role',
          url: '/settings/roles',
          icon: BriefcaseBusiness
        },
        {
          id: 'menu-2-child-2',
          title: 'User',
          url: '/settings/users',
          icon: CircleUserRound
        }
      ]
    }
  ],
  isPathActive: vi.fn()
};

const mockActions = {
  onToggleMenu: vi.fn(),
  onNavigateToPath: vi.fn()
};

describe('@/compounds/NavBottom/index.tsx', () => {
  vi.mock('@/compounds/NavBottom/Presenter.tsx', () => ({
    withPresenter: ((callback: any) => {
      return () => {
        return callback({
          data: mockData,
          actions: mockActions
        });
      };
    })
  }));
  
  it('should render "CircleChevronDown" when menus has "children", "isPathActive" true and "menus[0].isExpanded" is false', () => {
    mockData.isPathActive = vi.fn().mockImplementation(() => true);
    render(<NavBottom />);

    const collapsedIcon = screen.getByTestId('test-nav-bottom-icon-collapsed');
    expect(collapsedIcon).toBeInTheDocument();
  });

  it('should render "CircleChevronUp" when menus has "children", "isPathActive" true and "menus[0].isExpanded" is true', () => {
    mockData.menus[0].isExpanded = true;
    mockData.isPathActive = vi.fn().mockImplementation(() => true);
    render(<NavBottom />);

    const expandedIcon = screen.getByTestId('test-nav-bottom-icon-expanded');
    expect(expandedIcon).toBeInTheDocument();
  });

  it('should call "onToggleMenu" when "isPathActive" is true', () => {
    mockData.isPathActive = vi.fn().mockImplementation(() => true);
    render(<NavBottom />);

    const menuContainer = screen.getByTestId('test-nav-bottom-menu-container');
    fireEvent.click(menuContainer);

    expect(mockActions.onToggleMenu).toHaveBeenCalled();
  });

  it('should call "onNavigateToPath" when "isPathActive" is false', () => {
    mockData.isPathActive = vi.fn().mockImplementation(() => false);
    render(<NavBottom />);

    const menuContainer = screen.getByTestId('test-nav-bottom-menu-container');
    fireEvent.click(menuContainer);

    expect(mockActions.onNavigateToPath).toHaveBeenCalled();
  });

  it('should return expected class in "test-nav-bottom-child-menu-container" when "isPathActive" is true', () => {
    mockData.menus[0].isExpanded = true;
    mockData.isPathActive = vi.fn().mockImplementation((path: string) => path === '/settings' || path === '/settings/roles');
    render(<NavBottom />);

    const childMenuContainers = screen.getAllByTestId('test-nav-bottom-child-menu-container');
    fireEvent.click(childMenuContainers[0]);

    expect(mockActions.onNavigateToPath).toHaveBeenCalled();
    expect(childMenuContainers[0]).toHaveClass('px-3 py-1 flex flex-row items-center gap-x-1 bg-black backdrop-blur rounded-lg bg-opacity-10');
    expect(childMenuContainers[1]).toHaveClass('px-3 py-1 flex flex-row items-center gap-x-1');
  });
});