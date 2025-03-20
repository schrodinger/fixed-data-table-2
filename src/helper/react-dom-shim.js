let ReactDOMClient = null;
try {
  ReactDOMClient = require('react-dom/client');
} catch (e) {}

import ReactDOM from 'react-dom';

export { ReactDOMClient, ReactDOM };
