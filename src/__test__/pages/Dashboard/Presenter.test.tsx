import {
  describe,
  expect,
  it
} from 'vitest';
import {
  render,
  screen
} from '@testing-library/react';

import { withPresenter } from '@/pages/Dashboard/Presenter';

describe('@/pages/Dashboard/Presenter.tsx', () => {
  const TestComponent = withPresenter(() => {
    return (
      <div data-testid="test-container" />
    );
  });
  
  it('should render component correctly', () => {
    render(<TestComponent />);

    const placeholderDiv = screen.getByTestId('test-container');

    expect(placeholderDiv).toBeInTheDocument();
  });
});