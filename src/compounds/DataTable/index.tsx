/* eslint-disable @typescript-eslint/no-explicit-any */
import { flexRender } from '@tanstack/react-table';
import { isEmpty } from 'lodash';
import {
  ArrowDownAZ,
  ArrowUpAZ,
  Search
} from 'lucide-react';

import { calculatePagination } from '@/lib/pagination';
import { Loading } from '@/components/Loading';
import { Input } from '@/components/ui/input';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from '@/components/ui/pagination';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';

import { withPresenter } from './Presenter';

const DataTable = withPresenter(({ data, actions }) => {
  const {
    isFetching,
    limits,
    pageSize,
    currentPage,
    totalPages,
    action,
    table,
    tableColumns
  } = data;
  
  const {
    getColumnSortType,
    onInnerLimitChange,
    onInnerPageChange,
    onInnerSortsChange,
    onInnerSearch,
    onSearchEnter
  } = actions;
  
  return (
    <div className="hidden lg:w-full lg:flex lg:flex-col lg:items-center lg:gap-y-5">
      <div className="w-full justify-items-center grid grid-cols-3 gap-3">
        {
          action || <div data-testid="test-empty-action-container" />
        }
        <Select
          value={pageSize.toString()}
          onValueChange={onInnerLimitChange}
        >
          <SelectTrigger className="w-16">
            <SelectValue placeholder="Select Limit" />
          </SelectTrigger>
          <SelectContent>
            {
              limits.map((item) => (
                <SelectItem
                  key={`key-limit-${item}`}
                  value={item.toString()}
                >
                  {item}
                </SelectItem>
              ))
            }
          </SelectContent>
        </Select>
        <div className="w-full flex flex-row items-center bg-white rounded-md border border-input">
          <Search className="mx-3" />
          <Input
            data-testid="test-search-input"
            className="border-0"
            onChange={(ev) => onInnerSearch(ev.target.value)}
            onKeyDown={(ev) => {
              if (ev.key === 'Enter') {
                onSearchEnter();
              }
            }}
          />
        </div>
      </div>
      <div className="w-full border rounded-md">
        <Table>
          <TableHeader>
            {
              table.getHeaderGroups().map((headGroup: any) => (
                <TableRow key={headGroup.id}>
                  {
                    headGroup.headers.map((head: any) => (
                      <TableHead
                        key={head.id}
                        className={`select-none ${head.column.columnDef.enableSorting ? 'cursor-pointer' : ''}`}
                        {...head.column.columnDef.enableSorting && { onClick: () => onInnerSortsChange(head.column.columnDef.accessorKey) }}
                      >
                        <div className="flex flex-row items-center gap-x-3">
                          {
                            flexRender(
                              head.column.columnDef.header,
                              head.getContext()
                            )
                          }
                          {
                            head.column.columnDef.enableSorting && (
                              <div className="flex flex-row items-center gap-x-1">
                                <ArrowUpAZ
                                  size={16}
                                  {...getColumnSortType(head.column.columnDef.accessorKey) === 'desc' && { color: '#000000' }}
                                />
                                <ArrowDownAZ
                                  size={16}
                                  {...getColumnSortType(head.column.columnDef.accessorKey) === 'asc' && { color: '#000000' }}
                                />
                              </div>
                            )
                          }
                        </div>
                      </TableHead>
                    ))
                  }
                </TableRow>
              ))
            }
          </TableHeader>
          {
            isFetching
              ? (
                <TableBody>
                  <TableRow>
                    <TableCell
                      colSpan={tableColumns.length}
                      className="h-24"
                    >
                      <Loading />
                    </TableCell>
                  </TableRow>
                </TableBody>
              )
              : (
                <TableBody>
                  {
                    !isEmpty(table.getRowModel().rows)
                      ? (
                        <>
                          {
                            table.getRowModel().rows.map((row: any) => (
                              <TableRow key={row.id}>
                                {
                                  row.getVisibleCells().map((cell: any) => (
                                    <TableCell key={cell.id}>
                                      {
                                        flexRender(
                                          cell.column.columnDef.cell,
                                          cell.getContext()
                                        )
                                      }
                                    </TableCell>
                                  ))
                                }
                              </TableRow>
                            ))
                          }
                        </>
                      )
                      : (
                        <TableRow>
                          <TableCell
                            colSpan={tableColumns.length}
                            className="h-24"
                          >
                            <div className="flex flex-col justify-center items-center gap-y-3">
                              <img
                                src="/assets/images/undraw_no_data.svg"
                                alt="no_data_image"
                                className="w-24"
                              />
                              No Result
                            </div>
                          </TableCell>
                        </TableRow>
                      )
                  }
                </TableBody>
              )
          }
        </Table>
      </div>
      <Pagination className="m-0 flex flex-row items-center justify-end">
        <PaginationContent>
          {
            (currentPage !== 1) && (
              <PaginationPrevious onClick={() => onInnerPageChange((currentPage - 1).toString())} />
            )
          }
          {
            calculatePagination(totalPages, currentPage)
              .map((pageNumber, index) => (
                <PaginationItem key={`pagination-page-${pageNumber}-${index + 1}`}>
                  {
                    pageNumber === '...'
                      ? (<PaginationEllipsis data-testid="test-pagination-ellipsis" />)
                      : (
                        <PaginationLink
                          isActive={currentPage?.toString() === pageNumber}
                          onClick={() => onInnerPageChange(pageNumber)}
                        >
                          {pageNumber}
                        </PaginationLink>
                      )
                  }
                </PaginationItem>
              ))
          }
          {
            (currentPage !== totalPages) && (
              <PaginationNext onClick={() => onInnerPageChange((currentPage + 1).toString())} />
            )
          }
        </PaginationContent>
      </Pagination>
    </div>
  );
});

export { DataTable };