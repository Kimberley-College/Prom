/* eslint-disable @typescript-eslint/no-var-requires */
const withPWA = require('next-pwa');
const { withSentryConfig } = require('@sentry/nextjs');

module.exports = withSentryConfig(withPWA({
  poweredByHeader: false,
  pwa: {
    dest: 'public',
  },
}));
