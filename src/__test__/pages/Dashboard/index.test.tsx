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

import Dashboard from '@/pages/Dashboard';

describe('@/pages/Dashboard/index.tsx', () => {
  vi.mock('@/pages/Dashboard/Presenter', () => ({
    withPresenter: ((callback: any) => {
      return () => {
        return callback({
          data: undefined,
          actions: undefined
        });
      };
    })
  }));
    
  it('should render page correctly', () => {
    render(<Dashboard />);

    const placeholderImage = screen.getByAltText('dashboard-placeholder-image');
    const placeholderSpan = screen.getByText('Coming Soon...');

    expect(placeholderImage).toBeInTheDocument();
    expect(placeholderSpan).toBeInTheDocument();
  });
});