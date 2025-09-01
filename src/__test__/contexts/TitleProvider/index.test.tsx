import {
  describe,
  expect,
  it
} from 'vitest';
import {
  act,
  render,
  screen
} from '@testing-library/react';

import TitleProvider from '@/contexts/TitleProvider';
import { useTitle } from '@/contexts/TitleProvider';

describe('contexts/TitleProvider/index.tsx', () => {
  it('should return default title for "document.title"', () => {
    render(
      <TitleProvider>
        <div />
      </TitleProvider>
    );

    expect(document.title).toBe('Boilerplate');
  });

  it('should return expected title for "document.title"', () => {
    const TestComponent = () => {
      const { setTitle } = useTitle();
      
      return (
        <button
          data-testid="test-context-button"
          onClick={() => setTitle('Dashboard')}
        >
          Click Me!
        </button>
      );
    };
    
    render(
      <TitleProvider>
        <TestComponent />
      </TitleProvider>
    );

    const testButton = screen.getByTestId('test-context-button');

    act(() => {
      testButton.click();
    });

    expect(testButton).toBeInTheDocument();
    expect(document.title).toBe('Dashboard');
  });
});