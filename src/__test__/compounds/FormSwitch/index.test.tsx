import {
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
import { Formik } from 'formik';

import { FormSwitch } from '@/compounds/FormSwitch';

describe('@/compounds/FormSwitch/index.tsx', () => {
  const mockName = 'testSwitch';
  const mockValues = { testSwitch: false };
  const mockTouched = { testSwitch: false };
  const mockError = { testSwitch: 'This is mock error' };
  
  it('should return expected values', async () => {
    render(
      <Formik
        initialValues={mockValues}
        onSubmit={() => {}}
      >
        {
          (props) => {
            return (
              <FormSwitch
                {...{
                  ...props,
                  name: mockName,
                  touched: mockTouched
                }}
              />
            );
          }
        }
      </Formik>
    );
      
    const statusSwitch = screen.getByRole('switch');
    
    fireEvent.click(statusSwitch);
    
    await waitFor(() => {
      expect(statusSwitch).toBeChecked();
    });
  });
  
  it('should render expected errorMessage', () => {
    render(
      <Formik
        initialValues={mockValues}
        onSubmit={() => {}}
      >
        {
          (props) => {
            return (
              <FormSwitch
                {...{
                  ...props,
                  name: mockName,
                  touched: { testSwitch: true },
                  errors: mockError
                }}
              />
            );
          }
        }
      </Formik>
    );

    const errorSpan = screen.getByText('This is mock error');
    expect(errorSpan).toBeInTheDocument();
  });
});