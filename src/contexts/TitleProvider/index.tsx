import type {
  CtxTitleProps,
  CtxTitleProviderProps
} from '@/types/context/TitleProvider';
import {
  createContext,
  useContext,
  useEffect,
  useState
} from 'react';

const TitleContext = createContext({} as CtxTitleProps);

const TitleProvider = ({ children }: CtxTitleProviderProps) => {
  const [title, setTitle] = useState<string>('Boilerplate');
  
  const titleContextValue = { setTitle };

  useEffect(() => {
    document.title = title;
  }, [title]);
  
  return (
    <TitleContext.Provider value={titleContextValue}>
      {children}
    </TitleContext.Provider>
  );
};

const useTitle = () => useContext(TitleContext);

export default TitleProvider;
export { useTitle };