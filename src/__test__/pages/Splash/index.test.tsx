import {
  describe,
  expect,
  it,
  vi
} from 'vitest';
import { render } from '@testing-library/react';
import { useNavigate } from 'react-router';

import Splash from '@/pages/Splash';

vi.mock('react-router', () => ({
  useNavigate: vi.fn()
}));

describe('pages/Splash/index.tsx', () => {
  it ('should render component and called "navigate" when "auth" data was found', () => {
    const mockNavigate = vi.mocked(useNavigate);
    render(<Splash />);
    
    expect(mockNavigate).toHaveBeenCalled();
  });
});