import React from 'react';
import ReactClient from 'react-dom/client';
import './index.css';
import Route from './routes';

ReactClient.createRoot(document.getElementById('root')).render(<Route />);
