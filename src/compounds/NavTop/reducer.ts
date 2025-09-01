import {
  isEmpty,
  startCase
} from 'lodash';

enum REDUCER_ACTIONS {
  DATABASE_LOADING = 'DATABASE_LOADING',
  SERVER_LOADING = 'SERVER_LOADING',
  SET_IS_ERROR = 'SET_IS_ERROR',
  SET_USER = 'SET_USER',
  SET_PATHS = 'SET_PATHS'
}

const reducer = (
  state: CmNavTopProps,
  actions: {
    type: string,
    payload: string | boolean | unknown
  }
) => {
  const {
    type,
    payload
  } = actions;

  switch (type) {
    case REDUCER_ACTIONS.DATABASE_LOADING: {
      return {
        ...state,
        isDatabaseLoading: payload as boolean
      };
    }
    case REDUCER_ACTIONS.SERVER_LOADING: {
      return {
        ...state,
        isFetching: payload as boolean
      };
    }
    case REDUCER_ACTIONS.SET_IS_ERROR: {
      return {
        ...state,
        isError: payload as boolean
      };
    }
    case REDUCER_ACTIONS.SET_USER: {
      return {
        ...state,
        user: payload as AUserMeResponse
      };
    }
    case REDUCER_ACTIONS.SET_PATHS: {
      const paths = (payload as string)
        .split('/')
        .map((path) => startCase(path.replace(/-/g, ' ')))
        .filter((path) => !isEmpty(path));

      return {
        ...state,
        paths
      };
    }
    default:
      return { ...state };
  }
};

export {
  REDUCER_ACTIONS,
  reducer
};