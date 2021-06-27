import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {ChakraProvider} from '@chakra-ui/react';
import {customTheme} from './styles/config';

ReactDOM.render(
  <ChakraProvider theme={customTheme}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </ChakraProvider>,
  document.getElementById('root')
);
