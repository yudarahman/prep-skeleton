import {
  FC,
  JSX,
  useEffect,
  useReducer
} from 'react';
import {
  useLocation,
  useNavigate
} from 'react-router';
import { isEmpty } from 'lodash';

import { useLazyGetMeQuery } from '@/api/user';
import { useTitle } from '@/contexts/TitleProvider';
import { useToast } from '@/hooks/toast';
import { generateErrorToast } from '@/lib/utils';

import Database from '@/store/database/base';
import { DATABASE_KEY } from '@/constants/database';

import { initialState } from './config';
import {
  REDUCER_ACTIONS,
  reducer
} from './reducer';

const withPresenter: BaseWithPresenter<
  CmNavTopProps,
  CmNavTopActions,
  JSX.Element,
  FC
> = (callback) => {
  const PresenterCompound: FC = () => {
    const db = new Database();
    const loc = useLocation();
    const navigate = useNavigate();
    const { setTitle } = useTitle();
    const { toast } = useToast();
    const [state, dispatch] = useReducer(reducer, initialState);

    const [
      getMe,
      {
        data: getMeData,
        isFetching: getMeIsFetching,
        isLoading: getMeIsLoading,
        isSuccess: getMeIsSuccess,
        isError: getMeIsError
      }
    ] = useLazyGetMeQuery();
    
    const checkUserFromDatabase = async () => {
      dispatch({
        type: REDUCER_ACTIONS.DATABASE_LOADING,
        payload: true
      });

      try {
        const { value } = await db.getData(DATABASE_KEY.ME);

        if (isEmpty(value)) {
          getMe(undefined);
          return;
        }

        dispatch({
          type: REDUCER_ACTIONS.DATABASE_LOADING,
          payload: false
        });

        dispatch({
          type: REDUCER_ACTIONS.SET_USER,
          payload: value
        });
      } catch (err) {
        getMe(undefined);
      }
    };

    const logout = async () => {
      dispatch({
        type: REDUCER_ACTIONS.DATABASE_LOADING,
        payload: true
      });

      try {
        await Promise.all([
          db.deleteData(DATABASE_KEY.ME),
          db.deleteData(DATABASE_KEY.AUTH),
          db.deleteData(DATABASE_KEY.TABLE)
        ]);

        navigate('/splash');
      } catch (err) {
        dispatch({
          type: REDUCER_ACTIONS.DATABASE_LOADING,
          payload: false
        });

        toast(generateErrorToast());
      }
    };

    useEffect(() => {
      checkUserFromDatabase()
        .then(/* Nothing here is expected */)
        .catch(/* Nothing here is expected */);
    }, []);

    useEffect(() => {
      dispatch({
        type: REDUCER_ACTIONS.SET_PATHS,
        payload: loc.pathname
      });
    }, [loc]);

    useEffect(() => {
      if (!isEmpty(state.paths)) {
        const { paths } = state;

        setTitle(paths[paths.length - 1]);
      }
    }, [state.paths]);

    useEffect(() => {
      dispatch({
        type: REDUCER_ACTIONS.SERVER_LOADING,
        payload: getMeIsFetching || getMeIsLoading || getMeIsError
      });

      dispatch({
        type: REDUCER_ACTIONS.SET_IS_ERROR,
        payload: getMeIsError
      });
      
      switch (true) {
        case getMeIsFetching:
        case getMeIsLoading: {
          dispatch({
            type: REDUCER_ACTIONS.DATABASE_LOADING,
            payload: false
          });
          break;
        }
        case getMeIsSuccess: {
          dispatch({
            type: REDUCER_ACTIONS.SET_USER,
            payload: getMeData
          });
          break;
        }
        default:
          break;
      }
    }, [
      getMeIsFetching,
      getMeIsLoading,
      getMeIsSuccess,
      getMeIsError,
      getMeData
    ]);
        
    return callback({
      data: state,
      actions: { logout }
    });
  };
    
  return PresenterCompound;
};

export { withPresenter };