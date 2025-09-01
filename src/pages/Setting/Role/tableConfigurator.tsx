import type { PRolesPresenterState } from '@/types/presenter/RolePresenter';
import {
  LoaderPinwheelIcon,
  FlagTriangleRight,
  SquarePen
} from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip';

const generateColumns = (
  isLoading: boolean,
  onEdit: (data: ARoles) => void,
  onManagePermission: (data: ARoles) => void,
  updateStatus: ({ id, isActive }: { id: string, isActive: boolean }) => void
): Omit<PRolesPresenterState, 'roles' | 'isFetching' | 'isLoading'> => {
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
                  <div className="flex flex-row items-center gap-x-3">
                    <SquarePen
                      data-testid="test-edit-column-icon"
                      className="cursor-pointer"
                      onClick={() => onEdit(row.original)}
                    />
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <FlagTriangleRight
                            data-testid="test-edit-permission-column-icon"
                            className="cursor-pointer"
                            onClick={() => onManagePermission(row.original)}
                          />
                        </TooltipTrigger>
                        <TooltipContent>
                          <span>Manage Permission</span>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                )
            }
          </div>
        )
      },
      {
        accessorKey: 'name',
        header: 'Name',
        enableSorting: true
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
      }
    ]
  };
};

export { generateColumns };