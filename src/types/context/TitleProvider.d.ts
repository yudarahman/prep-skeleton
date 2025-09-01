import {
  Dispatch,
  ReactElement,
  SetStateAction
} from 'react';

type CtxTitleProps = {
  setTitle: Dispatch<SetStateAction<string>>;
};

type CtxTitleProviderProps = {
  children: ReactElement;
};