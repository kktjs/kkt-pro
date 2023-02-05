import pkg from '../package.json';
export default {
  plugins: ['@kkt/plugin-pro-entry', '@kkt/plugin-pro-router'],
  define: {
    VERSION: pkg.version,
  },
};
