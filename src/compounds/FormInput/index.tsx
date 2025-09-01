import type { CmFormInputProps } from '@/types/compound/FormInput';
import type {
  FormikProps,
  FormikValues
} from 'formik';

import { useMemo } from 'react';
import { isEmpty } from 'lodash';

import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

const FormInput = <T extends FormikValues>(props: CmFormInputProps & FormikProps<T>) => {
  const {
    disabled,
    label,
    type,
    placeholder,
    className,
    name,
    values,
    errors,
    touched,
    handleBlur,
    handleChange
  } = props;
  
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
      <Input
        id={name}
        disabled={disabled}
        type={type || 'text'}
        placeholder={placeholder}
        value={values[name]}
        onBlur={handleBlur}
        onChange={handleChange}
        className={className}
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

export { FormInput };