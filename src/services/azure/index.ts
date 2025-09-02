import {
  AuthenticationResult,
  BrowserUtils,
  EventMessage,
  EventType,
  PublicClientApplication
} from '@azure/msal-browser';

import { loginRequest, msalConfig } from './auth-config';
import { isSecuredContext } from '@/lib/IsSecuredContext';

export const msalInstance = new PublicClientApplication(msalConfig);

export const initAd = () => {
  const isHttps = isSecuredContext();
  if (isHttps) {
    msalInstance.initialize().then(() => {
      // Default to using the first account if no account is active on page load
      const accounts = msalInstance.getAllAccounts();
      const activeAccounts = msalInstance.getActiveAccount();
      if (!activeAccounts && accounts.length > 0) {
        msalInstance.setActiveAccount(accounts[0]);
      }

      // Update account state if a user signs in from another tab or window
      msalInstance.enableAccountStorageEvents();

      msalInstance.addEventCallback((event: EventMessage) => {
        if (event.eventType === EventType.LOGIN_SUCCESS && event.payload) {
          const payload = event.payload as AuthenticationResult;
          const account = payload.account;
          msalInstance.setActiveAccount(account);
        }
      });
    });
  }
};

export const getTokenAD = async () => {
  const isHttps = isSecuredContext();
  if (!isHttps) return;
  const account = msalInstance.getAllAccounts();
  if (!account.length) return;
  const response = await msalInstance.acquireTokenSilent({
    ...loginRequest,
    account: account[0],
    forceRefresh: true
  });
  return response.accessToken;
};

export const loginAD = () => {
  const isHttps = isSecuredContext();
  if (!isHttps) return;
  msalInstance.loginRedirect(loginRequest);
};

export const logoutAD = () => {
  const isHttps = isSecuredContext();
  if (!isHttps) return;
  msalInstance.logoutRedirect({
    account: msalInstance.getActiveAccount(),
    onRedirectNavigate: () => !BrowserUtils.isInIframe()
  });
};

export const isLoggedInAD = () => {
  const isHttps = isSecuredContext();
  if (!isHttps) return;
  return !!msalInstance.getActiveAccount();
};
