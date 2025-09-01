import {
  describe,
  expect,
  it
} from 'vitest';

import {
  render,
  screen
} from '@testing-library/react';

import { withPresenter } from '@/pages/Main/Presenter';

describe('@/pages/Main/Presenter.tsx', () => {
  it('should render the component', () => {
    const TestComponent = withPresenter(() => {
      return (
        <div data-testid="test-div-placeholder" />
      );
    });

    render(<TestComponent />);
    expect(screen.getByTestId('test-div-placeholder')).toBeInTheDocument();
  });
});