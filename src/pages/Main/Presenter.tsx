import {
  JSX,
  FC
} from 'react';

const withPresenter: BaseWithPresenter<
  undefined,
  undefined,
  JSX.Element,
  FC
> = (callback) => {
  const PresenterPage: FC = () => {
    
    return callback({
      data: undefined,
      actions: undefined
    });
  };

  return PresenterPage;
};

export { withPresenter };