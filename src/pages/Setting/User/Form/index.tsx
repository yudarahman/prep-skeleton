import { Formik } from 'formik';
import {
  Eye,
  EyeOff,
  LoaderPinwheelIcon,
  MoveLeft
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { FormInput } from '@/compounds/FormInput';
import { FormInputWithIcon } from '@/compounds/FormInputWithIcon';
import { FormSwitch } from '@/compounds/FormSwitch';
import { FormMultiSelect } from '@/compounds/FormMultiSelect';

import { withPresenter } from './Presenter';

const Form = withPresenter(({ data, actions }) => {
  const {
    isDataFetching,
    isLoading,
    isPasswordShown,
    initialValues,
    validation,
    mode,
    roleOptions
  } = data;
  const {
    onBack,
    onFormSubmit,
    setIsPasswordShown
  } = actions;
    
  return (
    <div className="flex flex-col gap-y-3">
      <Button
        variant="outline"
        className="border-black lg:w-32"
        onClick={onBack}
      >
        <MoveLeft/>
        <span className="ml-3 select-none">
          Back
        </span>
      </Button>
      <div className="p-3 rounded-lg shadow-md">
        <Formik
          enableReinitialize
          validateOnMount
          initialValues={initialValues}
          validationSchema={validation}
          onSubmit={onFormSubmit}
        >
          {
            (props) => {
              const {
                isValid,
                handleSubmit
              } = props;

              return (
                <form onSubmit={handleSubmit}>
                  <div className="mb-3 grid grid-cols-1 gap-3 md:grid-cols-3">
                    <FormInput
                      name="username"
                      label="Username"
                      placeholder="Input username"
                      {...props}
                    />

                    <FormInputWithIcon
                      type={isPasswordShown ? 'text' : 'password'}
                      name="password"
                      label="Password"
                      placeholder={mode === 'Edit' ? '********' : 'Input password'}
                      icon={isPasswordShown ? EyeOff : Eye}
                      onIconClick={() => setIsPasswordShown((prevState) => !prevState)}
                      {...props}
                    />

                    <FormInput
                      name="fullname"
                      label="Full Name"
                      placeholder="Input full name"
                      {...props}
                    />

                    <FormInput
                      name="email"
                      label="Email"
                      placeholder="Input email"
                      {...props}
                    />

                    <FormMultiSelect
                      isObjectify
                      name="userRoles"
                      label="Roles"
                      placeholder="Select roles"
                      options={roleOptions}
                      {...props}
                    />

                    <FormSwitch
                      name="isActive"
                      label="Active"
                      {...props}
                    />
                  </div>

                  <div className="w-full flex flex-row items-center justify-end gap-x-3">
                    {
                      isDataFetching && (
                        <LoaderPinwheelIcon
                          data-testid="test-fetching-icon"
                          size={18}
                          color="#695A59"
                          className="mr-auto animate-spin"
                        />
                      )
                    }

                    <Button
                      type="submit"
                      disabled={isDataFetching || isLoading || !isValid}
                      className={`w-full lg:w-32 ${isLoading ? 'animate-bounce' : ''}`}
                    >
                      {mode}
                    </Button>
                  </div>
                </form>
              );
            }
          }
        </Formik>
      </div>
    </div>
  );
});

export default Form;