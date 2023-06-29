'use strict';

const { JSDOM } = require('jsdom');

// setup the simplest document possible
const dom = new JSDOM('<!doctype html><html><body></body></html>', {
  url: 'https://localhost/',
  runScripts: 'outside-only',
});

// get the window and document object out of the  dom
const { document, window } = dom.window;

// set globals for mocha that make access to document and window feel
// natural in the test environment
global.document = document;
global.window = window;

// take all properties of the window object and also attach it to the
// mocha global object
propagateToGlobal(window);

// from mocha-jsdom https://github.com/rstacruz/mocha-jsdom/blob/master/index.js#L80
function propagateToGlobal(window) {
  for (let key in window) {
    if (!window.hasOwnProperty(key) || key in global) {
      continue;
    }

    global[key] = window[key];
  }
}
