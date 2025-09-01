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

import NavSide from '@/compounds/NavSide';

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

describe('@/compounds/NavSide/index.tsx', () => {
  vi.mock('@/compounds/NavSide/Presenter', () => ({
    withPresenter: ((callback: any) => {
      return () => {
        return callback({
          data: mockData,
          actions: mockActions
        });
      };
    })
  }));

  it('should render "test-collapse-icon" when menus "isExpanded" is false', () => {
    render(<NavSide />);

    const collapseIcon = screen.getByTestId('test-collapse-icon');
    expect(collapseIcon).toBeInTheDocument();
  });

  it('should render "test-expand-icon" when menus "isExpanded" is true', () => {
    mockData.menus[0].isExpanded = true;

    render(<NavSide />);

    const collapseIcon = screen.getByTestId('test-expand-icon');
    expect(collapseIcon).toBeInTheDocument();
  });

  it('should return expected class in "test-menu-container" when "isPathActive" is true', () => {
    mockData.isPathActive = vi.fn().mockImplementationOnce(() => true);

    render(<NavSide />);

    const menuContainer = screen.getByTestId('test-menu-container');
    expect(menuContainer).toHaveClass('mb-5 flex flex-row items-center gap-3 cursor-pointer ml-3 pl-3 py-3 bg-white rounded-tl-lg rounded-bl-lg');
  });

  it('should return expected class in "test-menu-container" when "isPathActive" is false', () => {
    mockData.isPathActive = vi.fn().mockImplementationOnce(() => false);

    render(<NavSide />);

    const menuContainer = screen.getByTestId('test-menu-container');
    expect(menuContainer).toHaveClass('mb-5 flex flex-row items-center gap-3 cursor-pointer mx-3');
  });

  it('should render "test-menu-child-container" when menus "isExpanded" is true', () => {
    mockData.menus[0].isExpanded = true;

    render(<NavSide />);

    const childContainer = screen.getAllByTestId('test-menu-child-container');
    expect(childContainer[0]).toBeInTheDocument();
    expect(childContainer[1]).toBeInTheDocument();
  });

  it('should return expected class in "test-menu-child-container" when "isPathActive" is true', () => {
    mockData.menus[0].isExpanded = true;
    mockData.isPathActive = vi.fn().mockReturnValue(true);

    render(<NavSide />);

    const menuContainer = screen.getAllByTestId('test-menu-child-container');
    expect(menuContainer[0]).toHaveClass('my-2 pl-2 flex flex-row items-center gap-3 cursor-pointer p-2 bg-white rounded-lg');
    expect(menuContainer[1]).toHaveClass('my-2 pl-2 flex flex-row items-center gap-3 cursor-pointer p-2 bg-white rounded-lg');
  });

  it('should return expected class in "test-menu-child-container" when "isPathActive" is false', () => {
    mockData.menus[0].isExpanded = true;
    mockData.isPathActive = vi.fn().mockReturnValue(false);

    render(<NavSide />);

    const menuContainer = screen.getAllByTestId('test-menu-child-container');
    expect(menuContainer[0]).toHaveClass('my-2 pl-2 flex flex-row items-center gap-3 cursor-pointer');
    expect(menuContainer[1]).toHaveClass('my-2 pl-2 flex flex-row items-center gap-3 cursor-pointer');
  });

  it('should call "onNavigateToPath" when "test-menu-container" clicked', () => {
    render(<NavSide />);

    const menuContainer = screen.getByTestId('test-menu-container');

    fireEvent.click(menuContainer);
    expect(mockActions.onNavigateToPath).toHaveBeenCalled();
  });

  it('should call "onToggleMenu" when "test-menu-icon" clicked', () => {
    render(<NavSide />);

    const expandIcon = screen.getByTestId('test-menu-icon');

    fireEvent.click(expandIcon);
    expect(mockActions.onToggleMenu).toHaveBeenCalled();
  });

  it('should call "onNavigateToPath" when "test-menu-child-container"', () => {
    mockData.menus[0].isExpanded = true;

    render(<NavSide />);

    const childContainer = screen.getAllByTestId('test-menu-child-container');

    fireEvent.click(childContainer[0]);
    expect(mockActions.onNavigateToPath).toHaveBeenCalled();

    fireEvent.click(childContainer[1]);
    expect(mockActions.onNavigateToPath).toHaveBeenCalled();
  });
});