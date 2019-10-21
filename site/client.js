"use strict";

var React = require('react');
var ReactDOM = require('react-dom');
var IndexPage = require('./IndexPage');

document.documentElement.dir = "rtl";

ReactDOM.render(
  <IndexPage
    {...window.INITIAL_PROPS}
  />,
  document
);
