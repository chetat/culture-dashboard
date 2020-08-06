import React, { Component } from 'react';
import { Router } from 'react-router-dom';
import { Chart } from 'react-chartjs-2';
import { ThemeProvider } from '@material-ui/styles';
import validate from 'validate.js';

import { chartjs } from './helpers';
import theme from './theme';
import 'react-perfect-scrollbar/dist/css/styles.css';
import './assets/scss/index.scss';
import validators from './common/validators';
import Routes from './Routes';
import { ConnectedRouter } from 'connected-react-router'
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor, getHistory } from './Store';

const history = getHistory();

Chart.helpers.extend(Chart.elements.Rectangle.prototype, {
  draw: chartjs.draw
});

validate.validators = {
  ...validate.validators,
  ...validators
};

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>

        <ThemeProvider theme={theme}>
          <ConnectedRouter history={history}> { /* place ConnectedRouter under Provider */}

            <Router history={history}>
              <PersistGate persistor={persistor}>
                <Routes />
              </PersistGate>
            </Router>
          </ConnectedRouter>

        </ThemeProvider>
      </Provider>

    );
  }
}
