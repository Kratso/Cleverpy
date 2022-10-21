import React from 'react';
import i18n from "i18next";
import { initReactI18next } from 'react-i18next';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import LanguageDetector from "i18next-browser-languagedetector";

import { store } from './store/store';
import App from './app/App';
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

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

reportWebVitals(console.log);


