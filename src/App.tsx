import { useRoutes } from 'react-router';

import { routes } from '@/router';

const App = () => {
  return useRoutes(routes);
};

export default App;