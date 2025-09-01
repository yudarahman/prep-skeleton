/* eslint-disable @typescript-eslint/no-explicit-any */
import { Provider } from 'react-redux';

import { store } from '@/store';

const wrapper = ({ children }: { children: any }) => {
  return (
    <Provider store={store}>
      {children}
    </Provider>
  );
};

export { wrapper };