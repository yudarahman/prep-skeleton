import type { PUserPresenterState } from '@/types/presenter/UserPresenter';
import {
  LoaderPinwheelIcon,
  SquarePen
} from 'lucide-react';
import {Switch} from '@/components/ui/switch.tsx';

const generateColumns = (
  isLoading: boolean,
  onEdit: (data: AUser) => void,
  updateStatus: ({ id, isActive }: { id: string, isActive: boolean }) => void
): Omit<PUserPresenterState, 'users' | 'isFetching'> => {
  return {
    columns: [
      {
        accessorKey: 'action',
        header: 'Action',
        cell: ({ row }) => (
          <div className="flex flex-row items-center">
            {
              isLoading
                ? (
                  <LoaderPinwheelIcon
                    data-testid="test-loading-action-column-icon"
                    color="#695A59"
                    className="animate-spin"
                  />
                )
                : (
                  <SquarePen
                    data-testid="test-edit-column-icon"
                    className="cursor-pointer"
                    onClick={() => onEdit(row.original)}
                  />
                )
            }
          </div>
        )
      },
      {
        accessorKey: 'isActive',
        header: 'Active',
        cell: ({ getValue, row }) => {
          return (
            <div className="flex flex-row items-center">
              {
                isLoading
                  ? (
                    <LoaderPinwheelIcon
                      data-testid="test-loading-status-column-icon"
                      color="#695A59"
                      className="animate-spin"
                    />
                  )
                  : (
                    <Switch
                      data-testid="test-update-status-column-switch"
                      checked={getValue() as boolean}
                      onCheckedChange={
                        (isChecked) => updateStatus({
                          id: row.original.id,
                          isActive: isChecked
                        })
                      }
                    />
                  )
              }
            </div>
          );
        }
      },
      {
        accessorKey: 'fullname',
        header: 'Full Name',
        enableSorting: true
      },
      {
        accessorKey: 'username',
        header: 'Username',
        enableSorting: true
      },
      {
        accessorKey: 'email',
        header: 'Email',
        enableSorting: true
      }
    ]
  };
};

export { generateColumns };