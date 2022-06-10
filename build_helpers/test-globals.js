'use strict';

var jsdom = require('jsdom');

// setup the simplest document possible
const { JSDOM } = jsdom;
const dom = new JSDOM('<!doctype html><html><body></body></html>', {
  url: 'https://localhost',
});

// get the window object out of the document
var win = dom.window;
var doc = dom.window.document;

// set globals for mocha that make access to document and window feel
// natural in the test environment
global.document = doc;
global.window = win;

// take all properties of the window object and also attach it to the
// mocha global object
propagateToGlobal(win);

// from mocha-jsdom https://github.com/rstacruz/mocha-jsdom/blob/master/index.js#L80
function propagateToGlobal(window) {
  for (let key in window) {
    if (!window.hasOwnProperty(key) || key in global) {
      continue;
    }

    global[key] = window[key];
  }
}
