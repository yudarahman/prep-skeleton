import {
  FC,
  JSX,
  useEffect
} from 'react';
import { useNavigate } from 'react-router';
import { isEmpty } from 'lodash';

import Database from '@/store/database/base';
import { generateTableSeeder } from '@/store/database/table';
import { DatabaseDocumentNotFoundError } from '@/constants/errors';
import { DATABASE_KEY } from '@/constants/database';

const withPresenter: BaseWithPresenter<
  PSplashPresenterState,
  PSplashPresenterActions,
  JSX.Element,
  FC
> = (callback) => {
  const initialState: object = {};

  const db = new Database();

  const PresenterPage: FC = () => {
    const navigate = useNavigate();

    const checkIfUserAuthenticated = async () => {
      try {
        await generateTableSeeder();
        const { value } = await db.getData(DATABASE_KEY.AUTH) as DDocumentType<AAuthResponse>;

        if (!isEmpty(value.token)) {
          navigate('/dashboard');

          return;
        }

        navigate('/login');
      } catch (err) {
        if (err instanceof DatabaseDocumentNotFoundError) {
          navigate('/login');
        }
      }
    };

    useEffect(() => {
      checkIfUserAuthenticated()
        .then(/* Nothing here is expected */)
        .catch(/* Nothing here is expected */);
    }, []);

    return callback({
      data: { ...initialState },
      actions: {}
    });
  };

  return PresenterPage;
};

export { withPresenter };