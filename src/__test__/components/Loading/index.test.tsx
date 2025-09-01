import {
  describe,
  expect,
  it
} from 'vitest';
import {
  render,
  screen
} from '@testing-library/react';

import { Loading } from '@/components/Loading';

describe('@/components/Loading/index.tsx', () => {
  it('should render correctly', () => {
    render(<Loading />);
    
    const imageLoading = screen.getByTestId('test-loading-image');
    
    expect(imageLoading).toBeInTheDocument();
    expect(imageLoading).toHaveClass('w-16 animate-spin');
  });
});