import {extendTheme} from '@chakra-ui/react';
import {createBreakpoints} from '@chakra-ui/theme-tools';
const colors = {
  teal: {
    200: '#96f2d7',
    main: '#63e6be',
    400: '#38d9a9',
    500: '#20c997',
    600: '#12b886',
    700: '#0ca678'
  }
};

const breakpoints = createBreakpoints({
  sm: '320px',
  md: '600px',
  lg: '992px',
  xl: '1200px'
});

export const customTheme = extendTheme({colors, breakpoints});
