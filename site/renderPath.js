'use strict';

const React = require('react');
const IndexPage = require('./IndexPage');

function renderPath(path, props, onRender) {
  onRender(IndexPage.renderToString(props));
}

module.exports = renderPath;
