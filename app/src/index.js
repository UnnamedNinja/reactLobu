import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import 'normalize.css';
import configureStore from './redux';
import Header from './components/header/header';
import Routes from './routes/';
import BillRunCronJob from './components/CronJobs/BillRunCronJob.js';
import { I18nextProvider } from 'react-i18next';
import i18next from 'i18next';

// Import stylesheets
import '@progress/kendo-theme-material/dist/all.css';
import './assets/stylesheets/base.scss';
import '../node_modules/react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import translationDE from './translations/de-DE.json';
import translationUS from './translations/en-US.json';

i18next.init({
  interpolation: { escapeValue: false },
  lng: 'de',
  resources: {
    en: {
      common: translationUS,
    },
    de: {
      common: translationDE,
    },
  },
});

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <I18nextProvider i18n={i18next}>
        <div className="app-container">
          <Header />
          <main>
            <Routes />
            <BillRunCronJob />
          </main>
        </div>
      </I18nextProvider>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'),
);

// Enable hot relading
module.hot.accept();
