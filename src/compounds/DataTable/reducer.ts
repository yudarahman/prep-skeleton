/* eslint-disable @typescript-eslint/no-explicit-any */
import type { CmDataTableProps } from '@/types/compound/DataTable';

enum REDUCER_ACTIONS {
  CHANGE_LIMIT = 'CHANGE_LIMIT',
  CHANGE_PAGE = 'CHANGE_PAGE',
  SEARCH = 'SEARCH',
  SORT = 'SORT'
}

const reducer = (
  state: CmDataTableProps<any>,
  actions: {
    type: string,
    payload: string | number | string[] | unknown
  }
) => {
  const {
    type,
    payload
  } = actions;

  switch (type) {
    case REDUCER_ACTIONS.CHANGE_LIMIT: {
      return {
        ...state,
        pageSize: payload as number
      };
    }
    case REDUCER_ACTIONS.CHANGE_PAGE: {
      return {
        ...state,
        currentPage: payload as number
      };
    }
    case REDUCER_ACTIONS.SEARCH: {
      return {
        ...state,
        search: payload as string
      };
    }
    case REDUCER_ACTIONS.SORT: {
      return {
        ...state,
        sorts: payload as string[]
      };
    }
    default: {
      return { ...state };
    }
  }
};

export {
  REDUCER_ACTIONS,
  reducer
};