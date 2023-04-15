import React from 'react';
import { HashRouter as Router } from 'react-router-dom';
import LoadPanel from 'devextreme-react/load-panel';

import { NavigationProvider } from './contexts/navigation';
import { AuthProvider, useAuth } from './contexts/auth';
import { useScreenSizeClass } from './utils/media-query';
import Content from './Content';
import NotAuthenticatedContent from './NotAuthenticatedContent';
import { Provider } from "inversify-react";
import { container } from "../src/ioc/ioc"

import 'devextreme/dist/css/dx.common.css';
import './themes/generated/theme.base.css';
import './themes/generated/theme.additional.css';
import './dx-styles.scss';
import { locale } from "devextreme/localization";
import Main from '../src/components/Main'
import { ToastContainer } from 'react-toastify';
import { useDispatch } from "react-redux";

function App() {

  if(!window.navigator.onLine)
    alert("You are offline. Please try again later.")
  
  window.addEventListener('online', () => alert('You are now online'));
  window.addEventListener('offline', () => alert('You are offline. Please try again later.'));

  const dispatch = useDispatch();  
  const { user, loading } = useAuth();

  if (loading) {
    return <LoadPanel visible={true} />;
  }

  if (user) {
    return <Main/>;
  }

  return <NotAuthenticatedContent />;
}

export default function () {
  const screenSizeClass = useScreenSizeClass();
  locale('en-GB');

  return (
    <Router>
      <AuthProvider>
        <NavigationProvider>
        <ToastContainer />
          <Provider container={container}>
            <div className={`app ${screenSizeClass}`}>
              <App />
            </div>
          </Provider>  
        </NavigationProvider>
      </AuthProvider>
    </Router>
  );
}
