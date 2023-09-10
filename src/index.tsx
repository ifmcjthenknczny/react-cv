import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import Cv from './Cv';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Cv />
  </React.StrictMode>
);

