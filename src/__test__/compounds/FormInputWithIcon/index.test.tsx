import {
  describe,
  expect,
  it
} from 'vitest';

import {
  render,
  screen
} from '@testing-library/react';
import { EyeOff } from 'lucide-react';
import { Formik } from 'formik';

import { FormInputWithIcon } from '@/compounds/FormInputWithIcon';

describe('@/compounds/FormInputWithIcon.tsx', () => {
  const mockName = 'testInputWithIcon';
  const mockValues = { testInputWithIcon: 'Test' };
  const mockTouched = { testInputWithIcon: true };
  const mockError = { testInputWithIcon: 'This is mock error' };
  
  it('should render "Icon" when "isIconBefore" props true', () => {
    render(
      <Formik
        initialValues={mockValues}
        onSubmit={() => {}}
      >
        {
          (props) => {
            return (
              <FormInputWithIcon
                {...{
                  ...props,
                  isIconBefore: true,
                  icon: EyeOff,
                  name: mockName
                }}
              />
            );
          }
        }
      </Formik>
    );

    const beforeIcon = screen.getByTestId('test-before-input-icon');
    expect(beforeIcon).toBeInTheDocument();
  });

  it('should render "Icon" when "isIconBefore" props false', () => {
    render(
      <Formik
        initialValues={mockValues}
        onSubmit={() => {}}
      >
        {
          (props) => {
            return (
              <FormInputWithIcon
                {...{
                  ...props,
                  isIconBefore: false,
                  icon: EyeOff,
                  name: mockName
                }}
              />
            );
          }
        }
      </Formik>
    );

    const afterIcon = screen.getByTestId('test-after-input-icon');
    expect(afterIcon).toBeInTheDocument();
  });

  it('should return expected class of "before Icon" when "disabled" props is true', () => {
    render(
      <Formik
        initialValues={mockValues}
        onSubmit={() => {}}
      >
        {
          (props) => {
            return (
              <FormInputWithIcon
                {...{
                  ...props,
                  disabled: true,
                  isIconBefore: true,
                  icon: EyeOff,
                  name: mockName
                }}
              />
            );
          }
        }
      </Formik>
    );

    const beforeIcon = screen.getByTestId('test-before-input-icon');
    expect(beforeIcon).toHaveClass('mx-3 text-gray-400 cursor-not-allowed');
  });

  it('should return expected class of "before Icon" when "disabled" props is false', () => {
    render(
      <Formik
        initialValues={mockValues}
        onSubmit={() => {}}
      >
        {
          (props) => {
            return (
              <FormInputWithIcon
                {...{
                  ...props,
                  disabled: false,
                  isIconBefore: true,
                  icon: EyeOff,
                  name: mockName
                }}
              />
            );
          }
        }
      </Formik>
    );

    const beforeIcon = screen.getByTestId('test-before-input-icon');
    expect(beforeIcon).toHaveClass('mx-3 cursor-pointer');
  });

  it('should return expected class of "after Icon" when "disabled" props is true', () => {
    render(
      <Formik
        initialValues={mockValues}
        onSubmit={() => {}}
      >
        {
          (props) => {
            return (
              <FormInputWithIcon
                {...{
                  ...props,
                  disabled: true,
                  isIconBefore: false,
                  icon: EyeOff,
                  name: mockName
                }}
              />
            );
          }
        }
      </Formik>
    );

    const afterIcon = screen.getByTestId('test-after-input-icon');
    expect(afterIcon).toHaveClass('mx-3 text-gray-400 cursor-not-allowed');
  });

  it('should return expected class of "after Icon" when "disabled" props is false', () => {
    render(
      <Formik
        initialValues={mockValues}
        onSubmit={() => {}}
      >
        {
          (props) => {
            return (
              <FormInputWithIcon
                {...{
                  ...props,
                  disabled: false,
                  isIconBefore: false,
                  icon: EyeOff,
                  name: mockName
                }}
              />
            );
          }
        }
      </Formik>
    );

    const afterIcon = screen.getByTestId('test-after-input-icon');
    expect(afterIcon).toHaveClass('mx-3 cursor-pointer');
  });

  it('should render "Icon" when "isIconBefore" props false', () => {
    render(
      <Formik
        initialValues={mockValues}
        onSubmit={() => {}}
      >
        {
          (props) => {
            return (
              <FormInputWithIcon
                {...{
                  ...props,
                  isIconBefore: false,
                  icon: EyeOff,
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