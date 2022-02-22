import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  initialColorMode: 'light',
  useSystemColorMode: false,
  components: {
    Button: {
      variants: {
        solid: () => ({
          bg: '#711368',
          color: 'white',
          _hover: { bg: '#913388' },
          _active: { bg: '#610358' },
        }),
        disabled: () => ({
          bg: '#711368',
          color: 'white',
          _hover: { bg: '#711368' },
          _active: { bg: '#610358' },
        }),
      },
    },
  },
  shadows: {
    outline: '0 0 0 3px #610358',
  },
  fonts: {
    heading: 'Open Sans, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
    body: 'Open Sans, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
    mono: 'Open Sans,Menlo,Monaco,Consolas,"Liberation Mono","Courier New",monospace',
  },
});

export default theme;
