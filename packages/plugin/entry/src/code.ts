type InitCode = {
  redux?: boolean;
};

export const getInitCode = ({ redux }: InitCode = { redux: false }) => {
  let importString = '';
  let renderString = '<Route />';
  if (redux) {
    importString = `import { Provider } from 'react-redux';\nimport { store } from "./rematch"\n`;
    renderString = `<Provider store={store} ><Route /></Provider>`;
  }

  return `import React from 'react';
import ReactClient from 'react-dom/client';
${importString}
import './index.css';
import Route from './routes';

ReactClient.createRoot(document.getElementById('root')).render(${renderString});
`;
};

export const getInitCSSCode = () => `
* {
  margin: 0;
  padding: 0;
}
body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
body, html, #root {
  height: 100%;
}
`;
