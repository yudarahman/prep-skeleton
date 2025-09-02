import { MsalProvider } from '@azure/msal-react';

import { msalInstance } from '@/services/azure';
import { isSecuredContext } from '@/lib/IsSecuredContext';

type Props = {
  children?: React.ReactNode;
};

const AzureProvider = ({ children }: Props) => {
  const isHttps = isSecuredContext();
  if (isHttps && msalInstance) {
    return <MsalProvider instance={msalInstance}>{children}</MsalProvider>;
  }
  return children;
};

export default AzureProvider;
