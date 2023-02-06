import pkg from '../package.json';
export default {
  plugins: [
    '@kkt/plugin-pro-entry',
    ['@kkt/plugin-pro-router', { fallbackElement: '@/Loading' }],
    '@kkt/plugin-pro-models',
  ],
  define: {
    VERSION: pkg.version,
  },
};
