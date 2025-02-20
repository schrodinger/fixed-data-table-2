'use strict';

const React = require('react');
const ReactDOMClient = require('react-dom/client');
const IndexPage = require('./IndexPage');

const root = ReactDOMClient.createRoot(document);
root.render(<IndexPage {...window.INITIAL_PROPS} />);
