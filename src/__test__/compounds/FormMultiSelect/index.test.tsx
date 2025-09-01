/* eslint-disable @typescript-eslint/no-explicit-any */
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

import { FormMultiSelect } from '@/compounds/FormMultiSelect';

Element.prototype.scrollIntoView = vi.fn();

describe('@/compounds/FormMultiSelect/index.tsx', () => {
  const mockName = 'testInput';
  const mockValues: { testInput: any[] } = { testInput: [] };
  const mockTouched = { testInput: true };
  const mockError = { testInput: 'This is mock error' };
  const mockOptions = [
    { label: 'Some Label 1', value: 'some_value_1' },
    { label: 'Some Label 2', value: 'some_value_2' },
    { label: 'Some Label 3', value: 'some_value_3' }
  ];

  it('should call "setFieldValue" and "setFieldTouched" with correct params', async () => {
    const mockSetFieldValue = vi.fn();
    const mockSetFieldTouched = vi.fn();

    render(
      <Formik
        initialValues={mockValues}
        onSubmit={() => {}}
      >
        {
          (props) => {
            return (
              <FormMultiSelect
                {...{
                  ...props,
                  options: mockOptions,
                  name: mockName,
                  values: mockValues,
                  touched: mockTouched,
                  errors: mockError,
                  setFieldTouched: mockSetFieldTouched,
                  setFieldValue: mockSetFieldValue
                }}
              />
            );
          }
        }
      </Formik>
    );

    const selectButton = screen.getByRole('button');
    fireEvent.click(selectButton);

    const firstOption = await screen.getByText('Some Label 1');
    fireEvent.click(firstOption);

    await waitFor(() => {
      expect(mockSetFieldTouched).toHaveBeenCalled();
      expect(mockSetFieldValue).toHaveBeenCalledWith(mockName, ['some_value_1'], true);
    });
  });

  it('should call "setFieldValue" and "setFieldTouched" with correct params when "isObjectify" props is true', async () => {
    const mockSetFieldValue = vi.fn();
    const mockSetFieldTouched = vi.fn();

    render(
      <Formik
        initialValues={mockValues}
        onSubmit={() => {}}
      >
        {
          (props) => {
            return (
              <FormMultiSelect
                {...{
                  ...props,
                  isObjectify: true,
                  options: mockOptions,
                  name: mockName,
                  values: mockValues,
                  touched: mockTouched,
                  errors: mockError,
                  setFieldTouched: mockSetFieldTouched,
                  setFieldValue: mockSetFieldValue
                }}
              />
            );
          }
        }
      </Formik>
    );

    const selectButton = screen.getByRole('button');
    fireEvent.click(selectButton);

    const firstOption = await screen.getByText('Some Label 1');
    fireEvent.click(firstOption);

    await waitFor(() => {
      expect(mockSetFieldTouched).toHaveBeenCalled();
      expect(mockSetFieldValue).toHaveBeenCalledWith(mockName, [{ label: 'Some Label 1', value: 'some_value_1' }], true);
    });
  });

  it('should return correct value when "values" is empty', async () => {
    const mockSetFieldValue = vi.fn();
    const mockSetFieldTouched = vi.fn();

    render(
      <Formik
        initialValues={mockValues}
        onSubmit={() => {}}
      >
        {
          (props) => {
            return (
              <FormMultiSelect
                {...{
                  ...props,
                  isObjectify: true,
                  options: mockOptions,
                  name: mockName,
                  values: { testInput: [] },
                  touched: mockTouched,
                  errors: mockError,
                  setFieldTouched: mockSetFieldTouched,
                  setFieldValue: mockSetFieldValue
                }}
              />
            );
          }
        }
      </Formik>
    );

    await waitFor(() => {
      expect(screen.getByText('Select options')).toBeInTheDocument();
    });
  });

  it('should return correct value when "values" is not empty and "isObjectify" props is true', async () => {
    const mockSetFieldValue = vi.fn();
    const mockSetFieldTouched = vi.fn();
    const mockDefValues = { testInput: [{ label: 'Some Label 2', value: 'some_value_2' }] };

    render(
      <Formik
        initialValues={mockValues}
        onSubmit={() => {}}
      >
        {
          (props) => {
            return (
              <FormMultiSelect
                {...{
                  ...props,
                  isObjectify: true,
                  options: mockOptions,
                  name: mockName,
                  values: mockDefValues,
                  touched: mockTouched,
                  errors: mockError,
                  setFieldTouched: mockSetFieldTouched,
                  setFieldValue: mockSetFieldValue
                }}
              />
            );
          }
        }
      </Formik>
    );

    await waitFor(() => {
      expect(screen.getByText('Some Label 2')).toBeInTheDocument();
    });
  });

  it('should return correct value when "values" is not empty and "isObjectify" props is false', async () => {
    const mockSetFieldValue = vi.fn();
    const mockSetFieldTouched = vi.fn();
    const mockDefValues = { testInput: ['some_value_2'] };

    render(
      <Formik
        initialValues={mockValues}
        onSubmit={() => {}}
      >
        {
          (props) => {
            return (
              <FormMultiSelect
                {...{
                  ...props,
                  isObjectify: false,
                  options: mockOptions,
                  name: mockName,
                  values: mockDefValues,
                  touched: mockTouched,
                  errors: mockError,
                  setFieldTouched: mockSetFieldTouched,
                  setFieldValue: mockSetFieldValue
                }}
              />
            );
          }
        }
      </Formik>
    );

    await waitFor(() => {
      expect(screen.getByText('Some Label 2')).toBeInTheDocument();
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
              <FormMultiSelect
                {...{
                  ...props,
                  options: mockOptions,
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