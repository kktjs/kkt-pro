type InitCode = {
  redux?: boolean | string;
  queryClient?: boolean;
};

export const getInitCode = ({ redux, queryClient }: InitCode = { redux: false }) => {
  let importString = '';
  let renderDefault = '';
  let renderString = '<Route />';
  if (queryClient) {
    importString = `import { QueryClientProvider, queryClient } from '@kkt/request';\n`;
    renderDefault = `<QueryClientProvider client={queryClient}>`;
  }
  if (redux) {
    if (typeof redux === 'boolean') {
      importString += `import { Provider } from 'react-redux';\nimport { store } from "./rematch"\n`;
      renderString = `<Provider store={store} ><Route /></Provider>`;
    } else {
      importString += `import Provider from '${redux}'`;
      renderString = `<Provider><Route /></Provider>`;
    }
  }
  renderDefault += renderString;
  if (queryClient) {
    renderDefault += `</QueryClientProvider>`;
  }

  return `import React from 'react';
import ReactClient from 'react-dom/client';
${importString}
import './index.css';
import Route from './routes';

ReactClient.createRoot(document.getElementById('root')).render(${renderDefault});
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
