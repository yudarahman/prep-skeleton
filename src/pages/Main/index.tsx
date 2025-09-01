import { Outlet } from 'react-router';

import NavBottom from '@/compounds/NavBottom';
import NavSide from '@/compounds/NavSide';
import NavTop from '@/compounds/NavTop';

import { withPresenter } from './Presenter';

const Main = withPresenter(() => {

  return (
    <div
      data-testid="test-main-container"
      className="p-3 h-dvh flex flex-row gap-x-3"
    >
      <NavSide className="hidden lg:flex lg:flex-col" />
      <div
        data-testid="test-main-outlet-container"
        className="w-full flex flex-col gap-y-3"
      >
        <NavTop />
        <div className="h-dvh overflow-auto">
          <Outlet />
        </div>
        <NavBottom className="mt-auto lg:hidden" />
      </div>
    </div>
  );
});

export default Main;