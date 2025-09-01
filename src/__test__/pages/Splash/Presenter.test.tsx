import {
  beforeEach,
  describe,
  expect,
  it,
  vi
} from 'vitest';
import { useNavigate } from 'react-router';
import {
  render,
  screen,
  waitFor
} from '@testing-library/react';

import Database from '@/store/database/base';
import { DatabaseDocumentNotFoundError } from '@/constants/errors';
import { withPresenter } from '@/pages/Splash/Presenter';

vi.mock('react-router', () => ({
  useNavigate: vi.fn()
}));

describe('pages/Splash/Presenter.tsx', () => {
  const mockNavigate = vi.fn();
  const mockGetData = vi.fn();
  const mockCallback = vi.fn(() => <div>This is Mock Page</div>);
  const MockComponent = withPresenter(mockCallback);

  beforeEach(() => {
    mockNavigate.mockClear();
    mockGetData.mockClear();
    mockCallback.mockClear();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (useNavigate as any).mockReturnValue(mockNavigate);

    Database.prototype.getData = mockGetData;
  });

  it('should render the expected component', () => {
    render(<MockComponent />);

    expect(mockCallback).toHaveBeenCalledWith({
      data: {},
      actions: {}
    });

    expect(screen.getByText('This is Mock Page')).toBeInTheDocument();
  });

  it('should navigate to "/dashboard" if user authenticated', async () => {
    mockGetData.mockResolvedValue({
      value: {
        token: 'some-mock-token-to-dashboard'
      }
    });
    vi.spyOn(Database.prototype, 'putData')
      .mockResolvedValue({
        id: 'some-id',
        rev: 'some-rev',
        ok: true
      });

    render(<MockComponent />);

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/dashboard');
    });
  });

  it('should navigate to "/login" if user not authenticated', async () => {
    mockGetData.mockResolvedValue({
      value: {
        token: ''
      }
    });

    render(<MockComponent />);

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/login');
    });
  });

  it('should navigate to "/login" if database throw "DatabaseDocumentNotFoundError"', async () => {
    mockGetData.mockRejectedValue(new DatabaseDocumentNotFoundError());
    
    render(<MockComponent />);
    
    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/login');
    });
  });
});