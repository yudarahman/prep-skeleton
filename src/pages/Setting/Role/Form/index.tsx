import { Formik } from 'formik';
import {
  LoaderPinwheelIcon,
  MoveLeft
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { FormInput } from '@/compounds/FormInput';
import { FormSwitch } from '@/compounds/FormSwitch';

import { withPresenter } from './Presenter';

const Form = withPresenter(({ data, actions }) => {
  const {
    isFetching,
    isLoading,
    mode,
    initialValues,
    validation
  } = data;
  const {
    onBack,
    onFormSubmit
  } = actions;
    
  return (
    <div className="flex flex-col gap-y-3">
      <Button
        variant="outline"
        className="border-black lg:w-32"
        onClick={onBack}
      >
        <MoveLeft />
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
                  <div className="mb-3 grid grid-cols-1 gap-3 md:grid-cols-2">
                    <FormInput
                      name="name"
                      label="Name"
                      placeholder="Input Name"
                      disabled={isLoading || isFetching}
                      {...props}
                    />
                    <FormSwitch
                      name="isActive"
                      label="Active"
                      disabled={isLoading || isFetching}
                      {...props}
                    />
                  </div>
                    
                  <div className="w-full flex flex-row items-center justify-end gap-x-3">
                    {
                      isFetching && (
                        <LoaderPinwheelIcon
                          size={18}
                          color="#695A59"
                          className="animate-spin"
                        />
                      )
                    }
                    <Button
                      type="submit"
                      disabled={!isValid || isLoading}
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