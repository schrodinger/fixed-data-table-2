'use strict';

let React = require('react');
let ReactDOM = require('react-dom');
let IndexPage = require('./IndexPage');

ReactDOM.render(<IndexPage {...window.INITIAL_PROPS} />, document);
