'use strict';

let React = require('react');
let IndexPage = require('./IndexPage');

function renderPath(path, props, onRender) {
  onRender(IndexPage.renderToString(props));
}

module.exports = renderPath;
