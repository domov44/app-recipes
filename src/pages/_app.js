import React, { useEffect, useState } from 'react';
import DefaultLayout from '../components/layouts/DefaultLayout';
import { UserProvider } from '../utils/UserContext';
import { ToastContainer } from 'react-toastify';
import { default as ConfirmGlobal } from '../utils/ConfirmGlobal';
import '../app/styles/globals.css';
import { applyTheme } from '../utils/theme/theme.js';
import '../app/fonts/fonts.css';
import { Amplify } from 'aws-amplify';
import config from '@/amplifyconfiguration.json';
import { PopupProvider } from '@/utils/PopupContext.js';
Amplify.configure(config);

function MyApp({ Component, pageProps, router }) {
  applyTheme();

  return (
    <UserProvider>
      <DefaultLayout>
        <PopupProvider>
          <ToastContainer />
          <ConfirmGlobal />
          <Component {...pageProps} />
        </PopupProvider>
      </DefaultLayout>
    </UserProvider>
  );
}

export default MyApp;