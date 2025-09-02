import './index.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import { store } from '@/store';

import TitleProvider from '@/contexts/TitleProvider';
import { Toaster } from '@/components/ui/toaster';

import App from './App.tsx';
import AzureProvider from './contexts/AzureProvider/azure-provider.tsx';

// TODO: Enable AD login
// import { initAd } from './services/azure/index.ts';

// initAd();

ReactDOM
  .createRoot(document.getElementById('root')!)
  .render(
    <React.StrictMode>
      <BrowserRouter>
        <Provider store={store}>
          <TitleProvider>
            <AzureProvider>
              <App />
            </AzureProvider>
          </TitleProvider>
          <Toaster />
        </Provider>
      </BrowserRouter>
    </React.StrictMode>
  );
