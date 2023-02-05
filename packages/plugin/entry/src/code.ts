type InitCode = {};

export const getInitCode = ({}: InitCode = {}) => `import React from 'react';
import ReactClient from 'react-dom/client';
import './index.css';
import Route from './routes';

ReactClient.createRoot(document.getElementById('root')).render(<Route />);
`;

export const getInitCSSCode = () => `body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
`;
