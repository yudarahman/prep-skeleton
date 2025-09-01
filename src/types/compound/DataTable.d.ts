import { JSX } from 'react';
import {
  ColumnDef,
  RowData
} from '@tanstack/react-table';

type CmDataTableProps<D extends RowData> = {
  limits: number[];
  currentPage: number;
  pageSize: number;
  search: string;
  sorts: string[];
  table: RowData<D>;
};

type CmDataTableAdditionalProps<D extends RowData> = {
  isFetching?: boolean;
  action?: JSX.Element,
  totalPages?: number;
  currentPage?: number;
  tableData: D[];
  tableColumns: ColumnDef<D>[];
};

type CmDataTableExternalState = {
  currentPage: number;
  pageSize: number;
  sorts: string[];
};

type CmDataTableActions = {
  getColumnSortType: (columnName: string) => string;
  onInnerLimitChange: (limit: string) => void;
  onInnerSearch: (search: string) => void;
  onInnerPageChange: (page: string) => void;
  onInnerSortsChange: (sort: string) => void;
  onSearchEnter: () => void;
};

type CmDataTableAdditionalActions = {
  onLimitChange?: (limit: string) => void;
  onPageChange?: (page: string) => void;
  onSortsChange?: (sorts: string[]) => void;
  onSearch: (search: string) => void;
  onStateChange: (state: CmDataTableExternalState) => void;
};