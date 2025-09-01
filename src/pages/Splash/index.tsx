import { LoaderPinwheelIcon } from 'lucide-react';

import { withPresenter } from './Presenter';

const Splash = withPresenter(() => {
  return (
    <div className="h-dvh p-5 flex flex-col items-center justify-center">
      <div className="h-full flex flex-col flex-grow items-center justify-center">
        <img
          src="/assets/images/icon_gik_without_words.svg"
          className="w-[25rem]"
        />

        <LoaderPinwheelIcon
          size={64}
          color="#695A59"
          className="animate-spin"
        />
      </div>

      <div className="h-full self-start flex flex-grow flex-row">
        <div className="flex flex-col self-end">
          <span>
            Build {import.meta.env.VITE_APP_VERSION}
          </span>
          <span>
            &copy; <a
              href="https://garudainfinity.com"
              target="_blank"
              className="hover:underline"
            >
              Garuda Infinity Kreasindo
            </a>
          </span>
        </div>
      </div>
    </div>
  );
});

export default Splash;