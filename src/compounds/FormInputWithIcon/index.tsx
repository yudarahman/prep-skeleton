import type { CmFormInputWithIconProps } from '@/types/compound/FormInput';
import type {
  FormikProps,
  FormikValues
} from 'formik';

import { useMemo } from 'react';
import { isEmpty } from 'lodash';

import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

const FormInputWithIcon = <T extends FormikValues>(props: CmFormInputWithIconProps & FormikProps<T>) => {
  const {
    isIconBefore,
    disabled,
    label,
    type,
    placeholder,
    icon: Icon,
    className,
    name,
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    onIconClick
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
      <div className="flex flex-row items-center bg-white rounded-md border border-input">
        {
          isIconBefore
          && Icon
          && (
            <Icon
              data-testid="test-before-input-icon"
              className={`mx-3 ${disabled ? 'text-gray-400 cursor-not-allowed' : 'cursor-pointer'}`}
              onClick={onIconClick}
            />
          )
        }
        <Input
          id={name}
          disabled={disabled}
          type={type || 'text'}
          placeholder={placeholder}
          value={values[name]}
          onBlur={handleBlur}
          onChange={handleChange}
          className={`border-0 ${className}`}
        />
        {
          !isIconBefore
          && Icon
          && (
            <Icon
              data-testid="test-after-input-icon"
              className={`mx-3 ${disabled ? 'text-gray-400 cursor-not-allowed' : 'cursor-pointer'}`}
              onClick={onIconClick}
            />
          )
        }
      </div>
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

export { FormInputWithIcon };