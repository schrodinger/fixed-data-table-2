'use strict';

const React = require('react');
const ReactDOM = require('react-dom');
const IndexPage = require('./IndexPage');

ReactDOM.render(<IndexPage {...window.INITIAL_PROPS} />, document);
