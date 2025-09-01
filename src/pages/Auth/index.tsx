import { Formik } from 'formik';
import {
  Eye,
  EyeOff,
  MessageSquareWarning
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { FormInput } from '@/compounds/FormInput';
import { FormInputWithIcon } from '@/compounds/FormInputWithIcon';

import { withPresenter } from './Presenter';

const Auth = withPresenter(({ data, actions }) => {
  const {
    isPasswordShown,
    isLoading,
    isError,
    errorMessage,
    initialValues,
    validation
  } = data;

  const {
    setIsPasswordShown,
    onFormSubmit
  } = actions;

  return (
    <main className="min-h-dvh flex flex-col items-center justify-center">
      <Formik
        validateOnMount
        initialValues={initialValues}
        validationSchema={validation}
        onSubmit={onFormSubmit}
      >
        {(props) => {
          const {
            isValid,
            handleSubmit
          } = props;
          
          return (
            <form onSubmit={handleSubmit}>
              <div className="p-5 self-center bg-black rounded-lg bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-10 border-transparent lg:w-[20rem]">
                <div className="grid grid-cols-1 gap-y-3">
                  <div
                    className="w-[10rem] h-40 mx-auto"
                  />
                  {
                    isError && (
                      <div className="p-3 flex flex-row items-center gap-x-5 rounded-lg bg-error bg-opacity-20">
                        <MessageSquareWarning
                          color="#D91C5C"
                          className="flex-shrink-0"
                        />
                        <p className="text-error line-clamp-3">
                          {errorMessage}
                        </p>
                      </div>
                    )
                  }
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
                    placeholder="Input password"
                    icon={isPasswordShown ? EyeOff : Eye}
                    onIconClick={() => setIsPasswordShown((prevState) => !prevState)}
                    {...props}
                  />
                </div>
                <div className="mt-5 flex flex-row items-center">
                  <Button
                    type="submit"
                    disabled={!isValid || isLoading}
                    className={`w-full ${isLoading && 'animate-bounce'}`}
                  >
                    Login
                  </Button>
                </div>
              </div>
            </form>
          );
        }}
      </Formik>
    </main>
  );
});

export default Auth;