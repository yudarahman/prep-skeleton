import {
  ChevronRight,
  DoorOpen,
  LoaderPinwheelIcon
} from 'lucide-react';

import {
  Avatar,
  AvatarFallback
} from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';

import { getInitials } from '@/lib/utils';

import { withPresenter } from './Presenter';

const NavTop = withPresenter(({ data, actions }) => {
  const {
    isDatabaseLoading,
    isFetching,
    isError,
    user,
    paths
  } = data;

  const { logout } = actions;
  
  return (
    <div className="p-3 w-full flex flex-row items-center bg-black backdrop-blur rounded-lg bg-opacity-10">
      <div className="px-3 py-1 flex bg-white rounded-full backdrop-blur bg-opacity-70">
        {
          paths.map((path, index) => (
            <div
              key={`path-breadcrumb-${index + 1}`}
              className="flex flex-row items-center"
            >
              <span>
                {path}
              </span>
              {
                ((index + 1) !== paths.length) && (
                  <ChevronRight
                    data-testid="test-breadcrumb-icon"
                    size={12}
                    className="mx-2"
                  />
                )
              }
            </div>
          ))
        }
      </div>
      {
        (isDatabaseLoading || isFetching)
          ? (
            <LoaderPinwheelIcon
              data-testid="test-loading-icon"
              color="#695A59"
              className="ml-auto animate-spin"
            />
          )
          : (
            <div className="ml-auto">
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Avatar
                    data-testid="test-avatar-container"
                    className={`${isError ? 'text-white' : ''}`}
                  >
                    <AvatarFallback className={`${isError ? 'bg-error' : ''}`}>
                      {
                        isError
                          ? 'X'
                          : getInitials(user?.fullname)
                      }
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem
                    className="flex flex-row items-center gap-x-3"
                    onClick={logout}
                  >
                    <DoorOpen />
                    <span>
                      Logout
                    </span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          )
      }
    </div>
  );
});

export default NavTop;