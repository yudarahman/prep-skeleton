import {
  describe,
  expect,
  it
} from 'vitest';

import {
  render,
  screen
} from '@testing-library/react';
import { Formik } from 'formik';

import { FormInput } from '@/compounds/FormInput';

describe('@/compounds/FormInput.tsx', () => {
  const mockName = 'testInput';
  const mockValues = { testInput: 'Test' };
  const mockTouched = { testInput: true };
  const mockError = { testInput: 'This is mock error' };

  it('should render expected errorMessage', () => {
    render(
      <Formik
        initialValues={mockValues}
        onSubmit={() => {}}
      >
        {
          (props) => {
            return (
              <FormInput
                {...{
                  ...props,
                  name: mockName,
                  values: mockValues,
                  touched: mockTouched,
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