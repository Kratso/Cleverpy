import React from 'react';
import i18n from "i18next";
// might overkill, but f*ck it, redux is overkill too for this.
import { createBrowserRouter, Route, RouterProvider, Routes } from "react-router-dom";
import { initReactI18next } from 'react-i18next';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import LanguageDetector from "i18next-browser-languagedetector";

import { store } from './store/store';
import App from './app/App';
import { Login } from './features/login/Login';
import reportWebVitals from './reportWebVitals';
import {es, en} from './config/i18n/i18n.translations';

import './index.css';

const resources = {
  en,
  es,
}

export const availableLanguages = Object.keys(resources)

i18n.use(initReactI18next)
  .use(LanguageDetector)
  .init({
    resources,
    defaultNS: "main",
    fallbackLng: "en",
  });
const container = document.getElementById('root')!;
const root = createRoot(container);

const router = createBrowserRouter(
    [
      {
        path: '/',
        element: <App />,
      },
      {
        path: '/login',
        element: <Login />
      }
    ]
)

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

reportWebVitals(console.log);


