import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {ChakraProvider} from '@chakra-ui/react';
import {customTheme} from './styles/config';
import {Provider as ReduxProvider} from 'react-redux';
import store from './store/store';

ReactDOM.render(
  <ChakraProvider theme={customTheme}>
    <ReduxProvider store={store}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </ReduxProvider>
  </ChakraProvider>,
  document.getElementById('root')
);
