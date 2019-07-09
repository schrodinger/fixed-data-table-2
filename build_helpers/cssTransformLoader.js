"use strict";

var postcss = require('postcss');
var autoPrefixer = require('autoprefixer');
var customProperties = require('postcss-custom-properties');
var cssVars = require('../src/stubs/cssVar');

function escapeSlash(match) {
  return match.replace(/\//g, '_');
}

function slashTransform(content) {
  return content.replace(/\.[\w\/\:\.]+(\s|\,)/g, escapeSlash);
}

module.exports = function(content) {
  content = slashTransform(content);
  var asyncCallback = this.async();

  postcss([
    customProperties({ variables: cssVars.CSS_VARS }),
    autoPrefixer()
  ])
    .process(content, {
      from: undefined,
      to: undefined,
      map: { inline: false },
    })
    .then(function(output) {
      asyncCallback(null, output);
    })
};
