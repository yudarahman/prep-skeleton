/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  beforeEach,
  describe,
  expect,
  it,
  vi
} from 'vitest';
import {
  fireEvent,
  render,
  screen,
  waitFor
} from '@testing-library/react';
import {
  Formik,
  Form,
  Field
} from 'formik';

import { useNavigate } from 'react-router';

import { useLoginMutation } from '@/api/auth';
import { transformError } from '@/lib/utils';

import { initialValues } from '@/pages/Auth/config';
import { validation } from '@/pages/Auth/validator';
import { withPresenter } from '@/pages/Auth/Presenter';

vi.mock('react-router', () => ({
  useNavigate: vi.fn()
}));

vi.mock('@/api/auth', () => ({
  useLoginMutation: vi.fn()
}));

vi.mock('@/lib/utils', () => ({
  transformError: vi.fn()
}));

describe('@/pages/Auth/Presenter.tsx', () => {
  const mockNavigate = vi.fn();
  const mockLogin = vi.fn();

  beforeEach(() => {
    (useNavigate as any).mockReturnValue(mockNavigate);
    (useLoginMutation as any).mockReturnValue([mockLogin, {
      isLoading: false,
      isSuccess: false,
      isError: false,
      error: null
    }]);
    
    (transformError as any).mockReturnValue('');
  });

  const TestComponent = withPresenter(({ actions }) => {
    return (
      <Formik
        initialValues={initialValues}
        validationSchema={validation}
        onSubmit={actions.onFormSubmit}
      >
        {() => (
          <Form>
            <Field
              name="username"
              placeholder="Enter Username"
            />

            <Field
              type="password"
              name="password"
              placeholder="Enter Password"
            />
            <button type="submit">Submit</button>
          </Form>
        )}
      </Formik>
    );
  });

  it('should call "mockLogin" with expected value as params', async () => {
    render(<TestComponent/>);

    const usernameInput = screen.getByPlaceholderText('Enter Username');
    const passwordInput = screen.getByPlaceholderText('Enter Password');
    expect(passwordInput).toHaveAttribute('type', 'password');

    fireEvent.change(usernameInput, { target: { value: 'some-username-test' } });
    fireEvent.change(passwordInput, { target: { value: 'some-password-test' } });
    fireEvent.submit(screen.getByText('Submit'));

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith({
        username: 'some-username-test',
        password: 'some-password-test'
      });
    });
  });

  it('should navigate to "/dashboard" when "isSuccess" is true', async () => {
    (useLoginMutation as any)
      .mockReturnValue([mockLogin, {
        isLoading: false,
        isSuccess: true,
        isError: false,
        error: null
      }]);

    render(<TestComponent />);

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/dashboard');
    });
  });
});