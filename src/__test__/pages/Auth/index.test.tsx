/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  describe,
  expect,
  it,
  vi
} from 'vitest';
import {
  render,
  screen,
  fireEvent,
  waitFor
} from '@testing-library/react';
import { validation } from '@/pages/Auth/validator';
import { initialValues } from '@/pages/Auth/config';

import Auth from '@/pages/Auth';

const mockData = {
  isPasswordShown: false,
  isLoading: false,
  isError: false,
  errorMessage: '',
  initialValues,
  validation
};

const mockActions = {
  setIsPasswordShown: vi.fn().mockImplementation(() => {
    mockData.isPasswordShown = !mockData.isPasswordShown;
  }),
  onFormSubmit: vi.fn().mockImplementation(() => {
    mockData.isLoading = true;
  })
};

describe('@/pages/Auth/index.tsx', () => {
  vi.mock('@/pages/Auth/Presenter', () => ({
    withPresenter: ((callback: any) => {
      return () => {
        return callback({
          data: mockData,
          actions: mockActions
        });
      };
    })
  }));

  it('should render component correctly', () => {
    render(<Auth />);

    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByText('Login')).toBeInTheDocument();
  });

  it('should render the "Login" button in "disabled" state', async () => {
    render(<Auth />);

    const usernameInput = screen.getByLabelText(/username/i);
    const passwordInput = screen.getByLabelText(/password/i);

    fireEvent.change(usernameInput, { target: { value: '' } });
    fireEvent.change(passwordInput, { target: { value: 'password-test' } });
    
    await waitFor(() => {
      expect(screen.getByText('Login')).toBeDisabled();
    });
  });

  // Before 'mockImplementation' hit for "setIsPasswordShown"

  it('should expect type of "password input" as "password" when "isPasswordShown" is false', () => {
    render(<Auth />);
    const passwordInput = screen.getByLabelText(/password/i);
    expect(passwordInput).toHaveAttribute('type', 'password');
  });

  it('should call "setIsPasswordShown" when password icon clicked', async () => {
    render(<Auth />);
    const toggleButton = screen.getByTestId('test-after-input-icon');

    fireEvent.click(toggleButton);

    expect(mockActions.setIsPasswordShown).toHaveBeenCalled();
  });

  // After 'mockImplementation' hit for "setIsPasswordShown"
  // Why ?
  // is `render` in another suite of test make mock data changes?

  it('should expect type of "password input" as "text" when "isPasswordShown" is true', () => {
    render(<Auth />);
    const passwordInput = screen.getByLabelText(/password/i);
    expect(passwordInput).toHaveAttribute('type', 'text');
  });

  it('should expect "onFormSubmit" to be called when "Login" button was clicked', async () => {
    render(<Auth />);
    const loginButton = screen.getByText('Login');

    const usernameInput = screen.getByLabelText(/username/i);
    const passwordInput = screen.getByLabelText(/password/i);

    fireEvent.change(usernameInput, { target: { value: 'username-test' } });
    fireEvent.change(passwordInput, { target: { value: 'password-test' } });

    await waitFor(() => {
      fireEvent.click(loginButton);

      expect(mockActions.onFormSubmit).toHaveBeenCalled();
    });
  });

  // This too,
  // After 'mockImplementation' hit for "onFormSubmit"
  // now `render` return "isLoading" as "true"

  it('should expect "Login" button to have "animate-bounce" as additional class', () => {
    render(<Auth />);
    const loginButton = screen.getByText('Login');
    expect(loginButton).toHaveClass('animate-bounce');
  });
});