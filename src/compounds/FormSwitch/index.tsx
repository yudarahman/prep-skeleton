import type { CmFormInputProps } from '@/types/compound/FormInput';
import type {
  FormikProps,
  FormikValues
} from 'formik';
import { useMemo } from 'react';
import { isEmpty } from 'lodash';

import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';

const FormSwitch = <T extends FormikValues>(props: CmFormInputProps & FormikProps<T>) => {
  const {
    disabled,
    label,
    className,
    name,
    values,
    errors,
    touched,
    handleBlur,
    setFieldValue,
    setFieldTouched
  } = props;
  
  const handleChecked = async (isChecked: boolean) => {
    await setFieldTouched(name, true);
    await setFieldValue(name, isChecked, true);
  };
  
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
      <Switch
        id={name}
        disabled={disabled}
        checked={values[name]}
        onBlur={handleBlur}
        onCheckedChange={handleChecked}
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

export { FormSwitch };