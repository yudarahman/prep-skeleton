/* eslint-disable @typescript-eslint/no-explicit-any */
import type {
  CmDataTableActions,
  CmDataTableAdditionalActions,
  CmDataTableAdditionalProps,
  CmDataTableProps
} from '@/types/compound/DataTable';
import {
  FC,
  JSX,
  useCallback,
  useEffect,
  useReducer
} from 'react';
import {
  getCoreRowModel,
  useReactTable
} from '@tanstack/react-table';
import {
  isEmpty,
  isUndefined
} from 'lodash';

import { initialState } from './config';
import {
  REDUCER_ACTIONS,
  reducer
} from './reducer';

const withPresenter: BaseWithPresenter<
  CmDataTableProps<any> & CmDataTableAdditionalProps<any>,
  CmDataTableActions & CmDataTableAdditionalActions,
  JSX.Element,
  FC<CmDataTableAdditionalProps<any> & CmDataTableAdditionalActions>
> = (callback) => {
  const PresenterCompound: FC<CmDataTableAdditionalProps<any> & CmDataTableAdditionalActions> = (props) => {
    const {
      tableData,
      tableColumns,
      onSearch,
      onLimitChange,
      onPageChange,
      onSortsChange,
      onStateChange
    } = props;
    
    const table = useReactTable({
      data: tableData,
      columns: tableColumns,
      getCoreRowModel: getCoreRowModel()
    });
    
    const [state, dispatch] = useReducer(reducer, { ...initialState, table });
    
    const onInnerSearch = (search: string) => {
      dispatch({
        type: REDUCER_ACTIONS.SEARCH,
        payload: search
      });
    };
    
    const onInnerLimitChange = (limit: string) => {
      dispatch({
        type: REDUCER_ACTIONS.CHANGE_LIMIT,
        payload: Number(limit)
      });
    };

    const onInnerPageChange = (page: string) => {
      dispatch({
        type: REDUCER_ACTIONS.CHANGE_PAGE,
        payload: Number(page)
      });
    };
    
    const onInnerSortsChange = (sort: string) => {
      if (isEmpty(state.sorts)) {
        dispatch({
          type: REDUCER_ACTIONS.SORT,
          payload: [sort]
        });
        
        return;
      }
      
      const modifiedSorts = state.sorts.map((item: string) => {
        if (item.includes(sort)) {
          return item.includes('-')
            ? sort
            : `-${sort}`;
        }
        
        return sort;
      });
      
      dispatch({
        type: REDUCER_ACTIONS.SORT,
        payload: modifiedSorts
      });
    };

    const onSearchEnter = () => {
      onSearch(state.search);
    };

    const getColumnSortType = useCallback((columnName: string) => {
      switch (true) {
        case isEmpty(state.sorts):
          return '';
        case state.sorts.some((sort: string) => sort.includes(columnName)): {
          const selectedColumn = state.sorts.find((sort) => sort.includes(columnName));

          if (isUndefined(selectedColumn)) {
            return '';
          }

          return selectedColumn.includes('-')
            ? 'desc'
            : 'asc';
        }
        default:
          return '';
      }
    }, [state.sorts]);

    useEffect(() => {
      onStateChange(state);
    }, [
      state.pageSize,
      state.currentPage,
      state.sorts
    ]);

    useEffect(() => {
      if (!isUndefined(onLimitChange)) {
        onLimitChange(state.pageSize.toString());
      }
    }, [state.pageSize]);

    useEffect(() => {
      if (!isUndefined(onPageChange)) {
        onPageChange(state.currentPage.toString());
      }
    }, [state.currentPage]);

    useEffect(() => {
      if (!isUndefined(onSortsChange)) {
        onSortsChange(state.sorts);
      }
    }, [state.sorts]);

    return callback({
      data: {
        ...state,
        ...props
      },
      actions: {
        getColumnSortType,
        onInnerLimitChange,
        onInnerSearch,
        onInnerPageChange,
        onInnerSortsChange,
        onSearchEnter,
        ...props
      }
    });
  };

  return PresenterCompound;
};

export { withPresenter };