/* eslint-disable @typescript-eslint/no-var-requires */
const withPWA = require('next-pwa');

module.exports = withPWA({
  poweredByHeader: false,
  pwa: {
    dest: 'public',
  },
});
