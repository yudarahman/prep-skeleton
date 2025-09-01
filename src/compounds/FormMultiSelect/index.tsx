import type {
  FormikProps,
  FormikValues
} from 'formik';
import { useMemo } from 'react';
import { isEmpty } from 'lodash';

import { Label } from '@/components/ui/label';
import { MultiSelect } from '@/components/ui/multi-select';

const FormMultiSelect = <T extends FormikValues>(props: CmFormMultiSelectProps & FormikProps<T>) => {
  const {
    isObjectify,
    disabled,
    label,
    name,
    values,
    options,
    errors,
    touched,
    setFieldTouched,
    setFieldValue
  } = props;

  const onHandleChange = async (data: string[]) => {
    await setFieldTouched(name, true);

    if (isObjectify) {
      const dataToReturn = options.filter((item) => data.some((selected) => item.value === selected));
      await setFieldValue(name, dataToReturn, true);

      return;
    }
    await setFieldValue(name, data, true);
  };
  
  const fieldValue = useMemo(() => {
    if (isEmpty(values[name])) {
      return [];
    }

    return isObjectify
      ? values[name].map((item: { label: string, value: string }) => item.value)
      : values[name];
  }, [values]);

  const isError = useMemo(() => {
    return !isEmpty(errors) && Boolean(touched[name] && errors[name]);
  }, [
    name,
    errors,
    touched
  ]);
  
  return (
    <div className="flex flex-col gap-y-3">
      <Label htmlFor={name}>
        {label}
      </Label>
      <MultiSelect
        name={name}
        disabled={disabled}
        options={options}
        defaultValue={fieldValue}
        onValueChange={onHandleChange}
      />
      {
        isError && (
          <span className="text-error">
            {(touched[name] && errors[name]) as string}
          </span>
        )
      }
    </div>
  );
};

export { FormMultiSelect };