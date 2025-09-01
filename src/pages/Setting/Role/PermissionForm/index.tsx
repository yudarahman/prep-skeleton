import { Fragment } from 'react';
import {
  BriefcaseBusiness,
  ChevronDownCircle,
  ChevronLeftCircle,
  LoaderPinwheel,
  MoveLeft
} from 'lucide-react';
import {
  isEmpty,
  startCase
} from 'lodash';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';

import { withPresenter } from './Presenter';

const PermissionForm = withPresenter(({ data, actions }) => {
  const {
    isFetching,
    isLoading,
    headers,
    permissions
  } = data;
  const {
    onBack,
    onToggleMenu,
    onPermissionChange,
    onSubmit
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
      <div className="p-3 flex flex-col bg-white rounded-lg shadow-md gap-y-3">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="select-none">
                {
                  isFetching
                    ? (
                      <LoaderPinwheel
                        color="#695A59"
                        className="animate-spin"
                      />
                    )
                    : (
                      <div className="flex flex-row items-center gap-x-3">
                        <BriefcaseBusiness />
                        <span className="font-bold">
                          {startCase(permissions?.name)}
                        </span>
                      </div>
                    )
                }
              </TableHead>
              {
                headers.map((head, headIndex) => (
                  <TableHead
                    key={`head-${head.value}-${headIndex + 1}`}
                    className="select-none"
                  >
                    {head.label}
                  </TableHead>
                ))
              }
            </TableRow>
          </TableHeader>
          <TableBody>
            {
              permissions?.permissions.map((item, itemIndex) => (
                <Fragment key={item.menuId}>
                  <TableRow className="border-b-0">
                    <TableCell>
                      <div className="flex flex-row items-center gap-x-1">
                        <div className="w-1/12">
                          {
                            !isEmpty(item.children) && (
                              <>
                                {
                                  (item as typeof item & { isExpanded: boolean }).isExpanded
                                    ? (
                                      <ChevronDownCircle
                                        size={14}
                                        className="cursor-pointer"
                                        onClick={() => onToggleMenu(item.menuId)}
                                      />
                                    )
                                    : (
                                      <ChevronLeftCircle
                                        size={14}
                                        className="cursor-pointer"
                                        onClick={() => onToggleMenu(item.menuId)}
                                      />
                                    )
                                }
                              </>
                            )
                          }
                        </div>
                        <div className="w-11/12">
                          {item.menuLabel}
                        </div>
                      </div>
                    </TableCell>
                    {
                      headers.map((head) => (
                        <TableCell key={`cell-checkbox-permission-${item.menuId}-${head.value}-${itemIndex + 1}`}>
                          {
                            !isEmpty(item.children)
                              ? (
                                <>
                                  {
                                    head.label === 'View'
                                      ? (
                                        <Checkbox
                                          checked={item[head.value as keyof typeof item] as boolean}
                                          onCheckedChange={(isChecked) => onPermissionChange(
                                            item.menuId,
                                            head.value,
                                            isChecked as boolean
                                          )}
                                        />
                                      )
                                      : (<></>)
                                  }
                                </>
                              )
                              : (
                                <Checkbox
                                  checked={item[head.value as keyof typeof item] as boolean}
                                  onCheckedChange={(isChecked) => onPermissionChange(
                                    item.menuId,
                                    head.value,
                                    isChecked as boolean
                                  )}
                                />
                              )
                          }
                        </TableCell>
                      ))
                    }
                  </TableRow>
                  {
                    (item as typeof item & { isExpanded: boolean }).isExpanded && (
                      <>
                        {
                          item.children.map((childItem, childItemIndex) => (
                            <TableRow
                              key={childItem.menuId}
                              className="border-b-0"
                            >
                              <TableCell>
                                {childItem.menuLabel}
                              </TableCell>
                              {
                                headers.map((head) => (
                                  <TableCell key={`cell-checkbox-permission-${childItem.menuId}-${head.value}-${childItemIndex + 1}`}>
                                    <Checkbox
                                      checked={childItem[head.value as keyof typeof childItem] as boolean}
                                      onCheckedChange={(isChecked) => onPermissionChange(
                                        childItem.menuId,
                                        head.value,
                                        isChecked as boolean
                                      )}
                                    />
                                  </TableCell>
                                ))
                              }
                            </TableRow>
                          ))
                        }
                      </>
                    )
                  }
                </Fragment>
              ))
            }
          </TableBody>
        </Table>
        <Button
          disabled={isFetching || isLoading}
          className={`w-32 mr-5 my-5 self-end ${isLoading ? 'animate-bounce' : ''}`}
          onClick={onSubmit}
        >
          Edit Permission
        </Button>
      </div>
    </div>
  );
});

export default PermissionForm;