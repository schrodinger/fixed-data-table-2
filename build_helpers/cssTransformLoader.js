'use strict';

// NOTE (pradeep): babel's register is required for this loader to import es6 modules like `cssVar`
require('@babel/register');

var postcss = require('postcss');
var autoPrefixer = require('autoprefixer');
var customProperties = require('postcss-custom-properties');
const cssVars = require('../src/stubs/cssVar').default;

function escapeSlash(match) {
  return match.replace(/\//g, '_');
}

function slashTransform(content) {
  return content.replace(/\.[\w\/\:\.]+(\s|\,)/g, escapeSlash);
}

module.exports = function (content) {
  content = slashTransform(content);
  var asyncCallback = this.async();

  postcss([
    customProperties({
      preserve: false,
      importFrom: { customProperties: cssVars.CSS_VARS },
    }),
    autoPrefixer(),
  ])
    .process(content, {
      from: undefined,
      to: undefined,
      map: { inline: false },
    })
    .then(function (output) {
      asyncCallback(null, output);
    });
};
