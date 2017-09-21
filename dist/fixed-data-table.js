/**
 * FixedDataTable v1.0.0-beta.4 
 *
 * Copyright Schrodinger, LLC
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"), require("react-dom"));
	else if(typeof define === 'function' && define.amd)
		define(["react", "react-dom"], factory);
	else if(typeof exports === 'object')
		exports["FixedDataTable"] = factory(require("react"), require("react-dom"));
	else
		root["FixedDataTable"] = factory(root["React"], root["ReactDOM"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_70__, __WEBPACK_EXTERNAL_MODULE_210__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 101);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Copyright Schrodinger, LLC
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule React
 */

module.exports = __webpack_require__(70);

/***/ }),
/* 1 */
/***/ (function(module, exports) {

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */
var isArray = Array.isArray;

module.exports = isArray;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

if (process.env.NODE_ENV !== 'production') {
  var REACT_ELEMENT_TYPE = (typeof Symbol === 'function' &&
    Symbol.for &&
    Symbol.for('react.element')) ||
    0xeac7;

  var isValidElement = function(object) {
    return typeof object === 'object' &&
      object !== null &&
      object.$$typeof === REACT_ELEMENT_TYPE;
  };

  // By explicitly using `prop-types` you are opting into new development behavior.
  // http://fb.me/prop-types-in-prod
  var throwOnDirectAccess = true;
  module.exports = __webpack_require__(108)(isValidElement, throwOnDirectAccess);
} else {
  // By explicitly using `prop-types` you are opting into new production behavior.
  // http://fb.me/prop-types-in-prod
  module.exports = __webpack_require__(110)();
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ }),
/* 3 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/**
 * Copyright Schrodinger, LLC
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule cx
 */

var slashReplaceRegex = /\//g;
var cache = {};

function getClassName(className) {
  if (cache[className]) {
    return cache[className];
  }

  cache[className] = className.replace(slashReplaceRegex, '_');
  return cache[className];
}

/**
 * This function is used to mark string literals representing CSS class names
 * so that they can be transformed statically. This allows for modularization
 * and minification of CSS class names.
 *
 * In static_upstream, this function is actually implemented, but it should
 * eventually be replaced with something more descriptive, and the transform
 * that is used in the main stack should be ported for use elsewhere.
 *
 * @param string|object className to modularize, or an object of key/values.
 *                      In the object case, the values are conditions that
 *                      determine if the className keys should be included.
 * @param [string ...]  Variable list of classNames in the string case.
 * @return string       Renderable space-separated CSS className.
 */
function cx(classNames) {
  var classNamesArray;
  if ((typeof classNames === 'undefined' ? 'undefined' : _typeof(classNames)) == 'object') {
    classNamesArray = Object.keys(classNames).filter(function (className) {
      return classNames[className];
    });
  } else {
    classNamesArray = Array.prototype.slice.call(arguments);
  }

  return classNamesArray.map(getClassName).join(' ');
}

module.exports = cx;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

var freeGlobal = __webpack_require__(74);

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

module.exports = root;


/***/ }),
/* 6 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Copyright Schrodinger, LLC
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule emptyFunction
 */

function makeEmptyFunction(arg) {
  return function () {
    return arg;
  };
}

/**
 * This function accepts and discards inputs; it has no side effects. This is
 * primarily useful idiomatically for overridable function endpoints which
 * always need to be callable, since JS lacks a null-call idiom ala Cocoa.
 */
function emptyFunction() {}

emptyFunction.thatReturns = makeEmptyFunction;
emptyFunction.thatReturnsFalse = makeEmptyFunction(false);
emptyFunction.thatReturnsTrue = makeEmptyFunction(true);
emptyFunction.thatReturnsNull = makeEmptyFunction(null);
emptyFunction.thatReturnsThis = function () {
  return this;
};
emptyFunction.thatReturnsArgument = function (arg) {
  return arg;
};

module.exports = emptyFunction;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */



var React = __webpack_require__(70);
var factory = __webpack_require__(115);

if (typeof React === 'undefined') {
  throw Error(
    'create-react-class could not find the React object. If you are using script tags, ' +
      'make sure that React is being loaded before create-react-class.'
  );
}

// Hack to grab NoopUpdateQueue from isomorphic React
var ReactNoopUpdateQueue = new React.Component().updater;

module.exports = factory(
  React.Component,
  React.isValidElement,
  ReactNoopUpdateQueue
);


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

var baseIsNative = __webpack_require__(152),
    getValue = __webpack_require__(155);

/**
 * Gets the native function at `key` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the method to get.
 * @returns {*} Returns the function if it's native, else `undefined`.
 */
function getNative(object, key) {
  var value = getValue(object, key);
  return baseIsNative(value) ? value : undefined;
}

module.exports = getNative;


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright Schrodinger, LLC
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule joinClasses
 * @typechecks static-only
 */



/**
 * Combines multiple className strings into one.
 * http://jsperf.com/joinclasses-args-vs-array
 *
 * @param {...?string} className
 * @return {string}
 */

function joinClasses(className /*, ... */) {
  if (!className) {
    className = '';
  }
  var nextClass;
  var argLength = arguments.length;
  if (argLength > 1) {
    for (var ii = 1; ii < argLength; ii++) {
      nextClass = arguments[ii];
      if (nextClass) {
        className = (className ? className + ' ' : '') + nextClass;
      }
    }
  }
  return className;
}

module.exports = joinClasses;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright Schrodinger, LLC
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule invariant
 */



/**
 * Use invariant() to assert state which your program assumes to be true.
 *
 * Provide sprintf-style format (only %s is supported) and arguments
 * to provide information about what broke and what you were
 * expecting.
 *
 * The invariant message will be stripped in production, but the invariant
 * will remain to ensure logic does not differ in production.
 */

var invariant = function invariant(condition, format, a, b, c, d, e, f) {
  if (true) {
    if (format === undefined) {
      throw new Error('invariant requires an error message argument');
    }
  }

  if (!condition) {
    var error;
    if (format === undefined) {
      error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
    } else {
      var args = [a, b, c, d, e, f];
      var argIndex = 0;
      error = new Error('Invariant Violation: ' + format.replace(/%s/g, function () {
        return args[argIndex++];
      }));
    }

    error.framesToPop = 1; // we don't care about invariant's own frame
    throw error;
  }
};

module.exports = invariant;

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

var Symbol = __webpack_require__(13),
    getRawTag = __webpack_require__(129),
    objectToString = __webpack_require__(130);

/** `Object#toString` result references. */
var nullTag = '[object Null]',
    undefinedTag = '[object Undefined]';

/** Built-in value references. */
var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag(value) {
  if (value == null) {
    return value === undefined ? undefinedTag : nullTag;
  }
  return (symToStringTag && symToStringTag in Object(value))
    ? getRawTag(value)
    : objectToString(value);
}

module.exports = baseGetTag;


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

var root = __webpack_require__(5);

/** Built-in value references. */
var Symbol = root.Symbol;

module.exports = Symbol;


/***/ }),
/* 14 */
/***/ (function(module, exports) {

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return value != null && typeof value == 'object';
}

module.exports = isObjectLike;


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

var isSymbol = __webpack_require__(63);

/** Used as references for various `Number` constants. */
var INFINITY = 1 / 0;

/**
 * Converts `value` to a string key if it's not a string or symbol.
 *
 * @private
 * @param {*} value The value to inspect.
 * @returns {string|symbol} Returns the key.
 */
function toKey(value) {
  if (typeof value == 'string' || isSymbol(value)) {
    return value;
  }
  var result = (value + '');
  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
}

module.exports = toKey;


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _roughHeights = __webpack_require__(66);

var _roughHeights2 = _interopRequireDefault(_roughHeights);

var _shallowEqualSelector = __webpack_require__(17);

var _shallowEqualSelector2 = _interopRequireDefault(_shallowEqualSelector);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * State regarding which scrollbars will be shown.
 * Also includes the actual availableHeight which depends on the scrollbars.
 *
 * @param {{
 *   minAvailableHeight: number,
 *   maxAvailableHeight: number,
 *   scrollStateX: ScrollbarState,
 * }} roughHeights
 * @param {number} scrollContentHeight,
 * @param {{
 *   overflowY: string,
 *   showScrollbarY: boolean,
 * }} scrollFlags
 * @return {{
 *   availableHeight: number,
 *   scrollEnabledX: boolean,
 *   scrollEnabledY: boolean,
 * }}
 */
/**
 * Copyright Schrodinger, LLC
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule scrollbarsVisible
 */
function scrollbarsVisible(roughHeights, scrollContentHeight, scrollFlags) {
  var overflowY = scrollFlags.overflowY,
      showScrollbarY = scrollFlags.showScrollbarY;

  var allowScrollbarY = overflowY !== 'hidden' && showScrollbarY !== false;

  var minAvailableHeight = roughHeights.minAvailableHeight,
      maxAvailableHeight = roughHeights.maxAvailableHeight,
      scrollStateX = roughHeights.scrollStateX;

  var scrollEnabledY = false;
  var scrollEnabledX = false;
  if (scrollStateX === _roughHeights.ScrollbarState.VISIBLE) {
    scrollEnabledX = true;
  }
  if (allowScrollbarY && scrollContentHeight > maxAvailableHeight) {
    scrollEnabledY = true;
  }

  // Handle case where vertical scrollbar makes horizontal scrollbar necessary
  if (scrollEnabledY && scrollStateX === _roughHeights.ScrollbarState.JOINT_SCROLLBARS) {
    scrollEnabledX = true;
  }

  var availableHeight = maxAvailableHeight;
  if (scrollEnabledX) {
    availableHeight = minAvailableHeight;
  }

  return {
    availableHeight: availableHeight,
    scrollEnabledX: scrollEnabledX,
    scrollEnabledY: scrollEnabledY
  };
}

exports.default = (0, _shallowEqualSelector2.default)([_roughHeights2.default, function (state) {
  return state.scrollContentHeight;
}, function (state) {
  return state.scrollFlags;
}], scrollbarsVisible);

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright Schrodinger, LLC
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule shallowEqualSelector
 */



Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reselect = __webpack_require__(220);

var _shallowEqual = __webpack_require__(49);

var _shallowEqual2 = _interopRequireDefault(_shallowEqual);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _reselect.createSelectorCreator)(_reselect.defaultMemoize, _shallowEqual2.default);

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright Schrodinger, LLC
 * All rights reserved.
 *
 * @providesModule ActionTypes
 */



Object.defineProperty(exports, "__esModule", {
  value: true
});
var COLUMN_REORDER_START = exports.COLUMN_REORDER_START = 'COLUMN_REORDER_START';
var COLUMN_REORDER_END = exports.COLUMN_REORDER_END = 'COLUMN_REORDER_END';
var COLUMN_REORDER_MOVE = exports.COLUMN_REORDER_MOVE = 'COLUMN_REORDER_MOVE';
var COLUMN_RESIZE = exports.COLUMN_RESIZE = 'COLUMN_RESIZE';
var INITIALIZE = exports.INITIALIZE = 'INITIALIZE';
var PROP_CHANGE = exports.PROP_CHANGE = 'PROP_CHANGE';
var SCROLL_END = exports.SCROLL_END = 'SCROLL_END';
var SCROLL_START = exports.SCROLL_START = 'SCROLL_START';
var SCROLL_TO_X = exports.SCROLL_TO_X = 'SCROLL_TO_X';
var SCROLL_TO_Y = exports.SCROLL_TO_Y = 'SCROLL_TO_Y';

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */



/**
 * Use invariant() to assert state which your program assumes to be true.
 *
 * Provide sprintf-style format (only %s is supported) and arguments
 * to provide information about what broke and what you were
 * expecting.
 *
 * The invariant message will be stripped in production, but the invariant
 * will remain to ensure logic does not differ in production.
 */

var validateFormat = function validateFormat(format) {};

if (process.env.NODE_ENV !== 'production') {
  validateFormat = function validateFormat(format) {
    if (format === undefined) {
      throw new Error('invariant requires an error message argument');
    }
  };
}

function invariant(condition, format, a, b, c, d, e, f) {
  validateFormat(format);

  if (!condition) {
    var error;
    if (format === undefined) {
      error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
    } else {
      var args = [a, b, c, d, e, f];
      var argIndex = 0;
      error = new Error(format.replace(/%s/g, function () {
        return args[argIndex++];
      }));
      error.name = 'Invariant Violation';
    }

    error.framesToPop = 1; // we don't care about invariant's own frame
    throw error;
  }
}

module.exports = invariant;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright Schrodinger, LLC
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule ReactComponentWithPureRenderMixin
 */



/**
 * Performs equality by iterating through keys on an object and returning
 * false when any key has values which are not strictly equal between
 * objA and objB. Returns true when the values of all keys are strictly equal.
 *
 * @return {boolean}
 */

function shallowEqual(objA, objB) {
  if (objA === objB) {
    return true;
  }
  var key;
  // Test for A's keys different from B.
  for (key in objA) {
    if (objA.hasOwnProperty(key) && (!objB.hasOwnProperty(key) || objA[key] !== objB[key])) {
      return false;
    }
  }
  // Test for B's keys missing from A.
  for (key in objB) {
    if (objB.hasOwnProperty(key) && !objA.hasOwnProperty(key)) {
      return false;
    }
  }
  return true;
}

/**
 * If your React component's render function is "pure", e.g. it will render the
 * same result given the same props and state, provide this Mixin for a
 * considerable performance boost.
 *
 * Most React components have pure render functions.
 *
 * Example:
 *
 *   var ReactComponentWithPureRenderMixin =
 *     require('ReactComponentWithPureRenderMixin');
 *   createReactClass({
 *     mixins: [ReactComponentWithPureRenderMixin],
 *
 *     render: function() {
 *       return <div className={this.props.className}>foo</div>;
 *     }
 *   });
 *
 * Note: This only checks shallow equality for props and state. If these contain
 * complex data structures this mixin may have false-negatives for deeper
 * differences. Only mixin to components which have simple props and state, or
 * use `forceUpdate()` when you know deep data structures have changed.
 */
var ReactComponentWithPureRenderMixin = {
  shouldComponentUpdate: function shouldComponentUpdate(nextProps, nextState) {
    return !shallowEqual(this.props, nextProps) || !shallowEqual(this.state, nextState);
  }
};

module.exports = ReactComponentWithPureRenderMixin;

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Copyright Schrodinger, LLC
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule clamp
 * @typechecks
 */

/**
 * Clamps (or clips or confines) the value to be between min and max.
 * @param {number} value
 * @param {number} min
 * @param {number} max
 * @return {number}
 */
function clamp(value, min, max) {
  if (value < min) {
    return min;
  }
  if (value > max) {
    return max;
  }
  return value;
}

module.exports = clamp;

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright Schrodinger, LLC
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule widthHelper
 * @typechecks
 */



Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sumPropWidths = sumPropWidths;
exports.getTotalWidth = getTotalWidth;
exports.getTotalFlexGrow = getTotalFlexGrow;

var _reduce = __webpack_require__(121);

var _reduce2 = _interopRequireDefault(_reduce);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function sumPropWidths(columns) {
  return (0, _reduce2.default)(columns, function (accum, column) {
    return accum + column.props.width;
  }, 0);
}

function getTotalWidth(columns) {
  return (0, _reduce2.default)(columns, function (accum, column) {
    return accum + column.width;
  }, 0);
}

function getTotalFlexGrow(columns) {
  return (0, _reduce2.default)(columns, function (accum, column) {
    return accum + (column.flexGrow || 0);
  }, 0);
}

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

var baseForOwn = __webpack_require__(123),
    createBaseEach = __webpack_require__(139);

/**
 * The base implementation of `_.forEach` without support for iteratee shorthands.
 *
 * @private
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array|Object} Returns `collection`.
 */
var baseEach = createBaseEach(baseForOwn);

module.exports = baseEach;


/***/ }),
/* 24 */
/***/ (function(module, exports) {

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return value != null && (type == 'object' || type == 'function');
}

module.exports = isObject;


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

var listCacheClear = __webpack_require__(142),
    listCacheDelete = __webpack_require__(143),
    listCacheGet = __webpack_require__(144),
    listCacheHas = __webpack_require__(145),
    listCacheSet = __webpack_require__(146);

/**
 * Creates an list cache object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function ListCache(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

// Add methods to `ListCache`.
ListCache.prototype.clear = listCacheClear;
ListCache.prototype['delete'] = listCacheDelete;
ListCache.prototype.get = listCacheGet;
ListCache.prototype.has = listCacheHas;
ListCache.prototype.set = listCacheSet;

module.exports = ListCache;


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

var eq = __webpack_require__(58);

/**
 * Gets the index at which the `key` is found in `array` of key-value pairs.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} key The key to search for.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function assocIndexOf(array, key) {
  var length = array.length;
  while (length--) {
    if (eq(array[length][0], key)) {
      return length;
    }
  }
  return -1;
}

module.exports = assocIndexOf;


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

var getNative = __webpack_require__(9);

/* Built-in method references that are verified to be native. */
var nativeCreate = getNative(Object, 'create');

module.exports = nativeCreate;


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

var isKeyable = __webpack_require__(164);

/**
 * Gets the data for `map`.
 *
 * @private
 * @param {Object} map The map to query.
 * @param {string} key The reference key.
 * @returns {*} Returns the map data.
 */
function getMapData(map, key) {
  var data = map.__data__;
  return isKeyable(key)
    ? data[typeof key == 'string' ? 'string' : 'hash']
    : data.map;
}

module.exports = getMapData;


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

var isArray = __webpack_require__(1),
    isKey = __webpack_require__(62),
    stringToPath = __webpack_require__(192),
    toString = __webpack_require__(195);

/**
 * Casts `value` to a path array if it's not one.
 *
 * @private
 * @param {*} value The value to inspect.
 * @param {Object} [object] The object to query keys on.
 * @returns {Array} Returns the cast property path array.
 */
function castPath(value, object) {
  if (isArray(value)) {
    return value;
  }
  return isKey(value, object) ? [value] : stringToPath(toString(value));
}

module.exports = castPath;


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _DOMMouseMoveTracker = __webpack_require__(46);

var _DOMMouseMoveTracker2 = _interopRequireDefault(_DOMMouseMoveTracker);

var _Keys = __webpack_require__(208);

var _Keys2 = _interopRequireDefault(_Keys);

var _React = __webpack_require__(0);

var _React2 = _interopRequireDefault(_React);

var _createReactClass = __webpack_require__(8);

var _createReactClass2 = _interopRequireDefault(_createReactClass);

var _propTypes = __webpack_require__(2);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _ReactDOM = __webpack_require__(209);

var _ReactDOM2 = _interopRequireDefault(_ReactDOM);

var _ReactComponentWithPureRenderMixin = __webpack_require__(20);

var _ReactComponentWithPureRenderMixin2 = _interopRequireDefault(_ReactComponentWithPureRenderMixin);

var _ReactWheelHandler = __webpack_require__(87);

var _ReactWheelHandler2 = _interopRequireDefault(_ReactWheelHandler);

var _cssVar = __webpack_require__(211);

var _cssVar2 = _interopRequireDefault(_cssVar);

var _cx = __webpack_require__(4);

var _cx2 = _interopRequireDefault(_cx);

var _emptyFunction = __webpack_require__(7);

var _emptyFunction2 = _interopRequireDefault(_emptyFunction);

var _FixedDataTableTranslateDOMPosition = __webpack_require__(50);

var _FixedDataTableTranslateDOMPosition2 = _interopRequireDefault(_FixedDataTableTranslateDOMPosition);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Copyright Schrodinger, LLC
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule Scrollbar
 * @typechecks
 */

var UNSCROLLABLE_STATE = {
  position: 0,
  scrollable: false
};

var FACE_MARGIN = parseInt((0, _cssVar2.default)('scrollbar-face-margin'), 10);
var FACE_MARGIN_2 = FACE_MARGIN * 2;
var FACE_SIZE_MIN = 30;
var KEYBOARD_SCROLL_AMOUNT = 40;

var _lastScrolledScrollbar = null;

var Scrollbar = (0, _createReactClass2.default)({
  displayName: 'Scrollbar',
  mixins: [_ReactComponentWithPureRenderMixin2.default],

  propTypes: {
    contentSize: _propTypes2.default.number.isRequired,
    defaultPosition: _propTypes2.default.number,
    isOpaque: _propTypes2.default.bool,
    orientation: _propTypes2.default.oneOf(['vertical', 'horizontal']),
    onScroll: _propTypes2.default.func,
    position: _propTypes2.default.number,
    size: _propTypes2.default.number.isRequired,
    trackColor: _propTypes2.default.oneOf(['gray']),
    zIndex: _propTypes2.default.number,
    verticalTop: _propTypes2.default.number
  },

  getInitialState: function getInitialState() /*object*/{
    var props = this.props;
    return this._calculateState(props.position || props.defaultPosition || 0, props.size, props.contentSize, props.orientation);
  },
  componentWillReceiveProps: function componentWillReceiveProps( /*object*/nextProps) {
    var controlledPosition = nextProps.position;
    if (controlledPosition === undefined) {
      this._setNextState(this._calculateState(this.state.position, nextProps.size, nextProps.contentSize, nextProps.orientation));
    } else {
      this._setNextState(this._calculateState(controlledPosition, nextProps.size, nextProps.contentSize, nextProps.orientation), nextProps);
    }
  },
  getDefaultProps: function getDefaultProps() /*object*/{
    return {
      defaultPosition: 0,
      isOpaque: false,
      onScroll: _emptyFunction2.default,
      orientation: 'vertical',
      zIndex: 99
    };
  },
  render: function render() /*?object*/{
    if (!this.state.scrollable) {
      return null;
    }

    var size = this.props.size;
    var mainStyle;
    var faceStyle;
    var isHorizontal = this.state.isHorizontal;
    var isVertical = !isHorizontal;
    var isActive = this.state.focused || this.state.isDragging;
    var faceSize = this.state.faceSize;
    var isOpaque = this.props.isOpaque;
    var verticalTop = this.props.verticalTop || 0;

    var mainClassName = (0, _cx2.default)({
      'ScrollbarLayout/main': true,
      'ScrollbarLayout/mainVertical': isVertical,
      'ScrollbarLayout/mainHorizontal': isHorizontal,
      'public/Scrollbar/main': true,
      'public/Scrollbar/mainOpaque': isOpaque,
      'public/Scrollbar/mainActive': isActive
    });

    var faceClassName = (0, _cx2.default)({
      'ScrollbarLayout/face': true,
      'ScrollbarLayout/faceHorizontal': isHorizontal,
      'ScrollbarLayout/faceVertical': isVertical,
      'public/Scrollbar/faceActive': isActive,
      'public/Scrollbar/face': true
    });

    var position = this.state.position * this.state.scale + FACE_MARGIN;

    if (isHorizontal) {
      mainStyle = {
        width: size
      };
      faceStyle = {
        width: faceSize - FACE_MARGIN_2
      };
      (0, _FixedDataTableTranslateDOMPosition2.default)(faceStyle, position, 0, this._initialRender);
    } else {
      mainStyle = {
        top: verticalTop,
        height: size
      };
      faceStyle = {
        height: faceSize - FACE_MARGIN_2
      };
      (0, _FixedDataTableTranslateDOMPosition2.default)(faceStyle, 0, position, this._initialRender);
    }

    mainStyle.zIndex = this.props.zIndex;

    if (this.props.trackColor === 'gray') {
      mainStyle.backgroundColor = (0, _cssVar2.default)('fbui-desktop-background-light');
    }

    return _React2.default.createElement(
      'div',
      {
        onFocus: this._onFocus,
        onBlur: this._onBlur,
        onKeyDown: this._onKeyDown,
        onMouseDown: this._onMouseDown,
        onWheel: this._wheelHandler.onWheel,
        className: mainClassName,
        style: mainStyle,
        tabIndex: 0 },
      _React2.default.createElement('div', {
        ref: 'face',
        className: faceClassName,
        style: faceStyle
      })
    );
  },
  componentWillMount: function componentWillMount() {
    var isHorizontal = this.props.orientation === 'horizontal';
    var onWheel = isHorizontal ? this._onWheelX : this._onWheelY;

    this._wheelHandler = new _ReactWheelHandler2.default(onWheel, this._shouldHandleX, // Should hanlde horizontal scroll
    this._shouldHandleY // Should handle vertical scroll
    );
    this._initialRender = true;
  },
  componentDidMount: function componentDidMount() {
    this._mouseMoveTracker = new _DOMMouseMoveTracker2.default(this._onMouseMove, this._onMouseMoveEnd, document.documentElement);

    if (this.props.position !== undefined && this.state.position !== this.props.position) {
      this._didScroll();
    }
    this._initialRender = false;
  },
  componentWillUnmount: function componentWillUnmount() {
    this._nextState = null;
    this._mouseMoveTracker.releaseMouseMoves();
    if (_lastScrolledScrollbar === this) {
      _lastScrolledScrollbar = null;
    }
    delete this._mouseMoveTracker;
  },
  scrollBy: function scrollBy( /*number*/delta) {
    this._onWheel(delta);
  },
  _shouldHandleX: function _shouldHandleX( /*number*/delta) /*boolean*/{
    return this.props.orientation === 'horizontal' ? this._shouldHandleChange(delta) : false;
  },
  _shouldHandleY: function _shouldHandleY( /*number*/delta) /*boolean*/{
    return this.props.orientation !== 'horizontal' ? this._shouldHandleChange(delta) : false;
  },
  _shouldHandleChange: function _shouldHandleChange( /*number*/delta) /*boolean*/{
    var nextState = this._calculateState(this.state.position + delta, this.props.size, this.props.contentSize, this.props.orientation);
    return nextState.position !== this.state.position;
  },
  _calculateState: function _calculateState(
  /*number*/position,
  /*number*/size,
  /*number*/contentSize,
  /*string*/orientation) /*object*/{

    var clampedSize = Math.max(1, size);
    if (contentSize <= clampedSize) {
      return UNSCROLLABLE_STATE;
    }

    var stateKey = position + '_' + clampedSize + '_' + contentSize + '_' + orientation;
    if (this._stateKey === stateKey) {
      return this._stateForKey;
    }

    // There are two types of positions here.
    // 1) Phisical position: changed by mouse / keyboard
    // 2) Logical position: changed by props.
    // The logical position will be kept as as internal state and the `render()`
    // function will translate it into physical position to render.

    var isHorizontal = orientation === 'horizontal';
    var scale = clampedSize / contentSize;
    var faceSize = clampedSize * scale;

    if (faceSize < FACE_SIZE_MIN) {
      scale = (clampedSize - FACE_SIZE_MIN) / (contentSize - clampedSize);
      faceSize = FACE_SIZE_MIN;
    }

    var scrollable = true;
    var maxPosition = contentSize - clampedSize;

    if (position < 0) {
      position = 0;
    } else if (position > maxPosition) {
      position = maxPosition;
    }

    var isDragging = this._mouseMoveTracker ? this._mouseMoveTracker.isDragging() : false;

    // This function should only return flat values that can be compared quiclky
    // by `ReactComponentWithPureRenderMixin`.
    var state = {
      faceSize: faceSize,
      isDragging: isDragging,
      isHorizontal: isHorizontal,
      position: position,
      scale: scale,
      scrollable: scrollable
    };

    // cache the state for later use.
    this._stateKey = stateKey;
    this._stateForKey = state;
    return state;
  },
  _onWheelY: function _onWheelY( /*number*/deltaX, /*number*/deltaY) {
    this._onWheel(deltaY);
  },
  _onWheelX: function _onWheelX( /*number*/deltaX, /*number*/deltaY) {
    this._onWheel(deltaX);
  },
  _onWheel: function _onWheel( /*number*/delta) {
    var props = this.props;

    // The mouse may move faster then the animation frame does.
    // Use `requestAnimationFrame` to avoid over-updating.
    this._setNextState(this._calculateState(this.state.position + delta, props.size, props.contentSize, props.orientation));
  },
  _onMouseDown: function _onMouseDown( /*object*/event) {
    var nextState;

    if (event.target !== _ReactDOM2.default.findDOMNode(this.refs.face)) {
      // Both `offsetX` and `layerX` are non-standard DOM property but they are
      // magically available for browsers somehow.
      var nativeEvent = event.nativeEvent;
      var position = this.state.isHorizontal ? nativeEvent.offsetX || nativeEvent.layerX : nativeEvent.offsetY || nativeEvent.layerY;

      // MouseDown on the scroll-track directly, move the center of the
      // scroll-face to the mouse position.
      var props = this.props;
      position /= this.state.scale;
      nextState = this._calculateState(position - this.state.faceSize * 0.5 / this.state.scale, props.size, props.contentSize, props.orientation);
    } else {
      nextState = {};
    }

    nextState.focused = true;
    this._setNextState(nextState);

    this._mouseMoveTracker.captureMouseMoves(event);
    // Focus the node so it may receive keyboard event.
    _ReactDOM2.default.findDOMNode(this).focus();
  },
  _onMouseMove: function _onMouseMove( /*number*/deltaX, /*number*/deltaY) {
    var props = this.props;
    var delta = this.state.isHorizontal ? deltaX : deltaY;
    delta /= this.state.scale;

    this._setNextState(this._calculateState(this.state.position + delta, props.size, props.contentSize, props.orientation));
  },
  _onMouseMoveEnd: function _onMouseMoveEnd() {
    this._nextState = null;
    this._mouseMoveTracker.releaseMouseMoves();
    this.setState({ isDragging: false });
  },
  _onKeyDown: function _onKeyDown( /*object*/event) {
    var keyCode = event.keyCode;

    if (keyCode === _Keys2.default.TAB) {
      // Let focus move off the scrollbar.
      return;
    }

    var distance = KEYBOARD_SCROLL_AMOUNT;
    var direction = 0;

    if (this.state.isHorizontal) {
      switch (keyCode) {
        case _Keys2.default.HOME:
          direction = -1;
          distance = this.props.contentSize;
          break;

        case _Keys2.default.LEFT:
          direction = -1;
          break;

        case _Keys2.default.RIGHT:
          direction = 1;
          break;

        default:
          return;
      }
    }

    if (!this.state.isHorizontal) {
      switch (keyCode) {
        case _Keys2.default.SPACE:
          if (event.shiftKey) {
            direction = -1;
          } else {
            direction = 1;
          }
          break;

        case _Keys2.default.HOME:
          direction = -1;
          distance = this.props.contentSize;
          break;

        case _Keys2.default.UP:
          direction = -1;
          break;

        case _Keys2.default.DOWN:
          direction = 1;
          break;

        case _Keys2.default.PAGE_UP:
          direction = -1;
          distance = this.props.size;
          break;

        case _Keys2.default.PAGE_DOWN:
          direction = 1;
          distance = this.props.size;
          break;

        default:
          return;
      }
    }

    event.preventDefault();

    var props = this.props;
    this._setNextState(this._calculateState(this.state.position + distance * direction, props.size, props.contentSize, props.orientation));
  },
  _onFocus: function _onFocus() {
    this.setState({
      focused: true
    });
  },
  _onBlur: function _onBlur() {
    this.setState({
      focused: false
    });
  },
  _blur: function _blur() {
    var el = _ReactDOM2.default.findDOMNode(this);
    if (!el) {
      return;
    }

    try {
      this._onBlur();
      el.blur();
    } catch (oops) {
      // pass
    }
  },
  _setNextState: function _setNextState( /*object*/nextState, /*?object*/props) {
    props = props || this.props;
    var controlledPosition = props.position;
    var willScroll = this.state.position !== nextState.position;
    if (controlledPosition === undefined) {
      var callback = willScroll ? this._didScroll : undefined;
      this.setState(nextState, callback);
    } else if (controlledPosition === nextState.position) {
      this.setState(nextState);
    } else {
      // Scrolling is controlled. Don't update the state and let the owner
      // to update the scrollbar instead.
      if (nextState.position !== undefined && nextState.position !== this.state.position) {
        this.props.onScroll(nextState.position);
      }
      return;
    }

    if (willScroll && _lastScrolledScrollbar !== this) {
      _lastScrolledScrollbar && _lastScrolledScrollbar._blur();
      _lastScrolledScrollbar = this;
    }
  },
  _didScroll: function _didScroll() {
    this.props.onScroll(this.state.position);
  }
});

Scrollbar.KEYBOARD_SCROLL_AMOUNT = KEYBOARD_SCROLL_AMOUNT;
Scrollbar.SIZE = parseInt((0, _cssVar2.default)('scrollbar-size'), 10);
Scrollbar.OFFSET = 1;

module.exports = Scrollbar;

/***/ }),
/* 31 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 32 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 33 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 34 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 35 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 36 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 37 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 38 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 39 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 40 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 41 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 42 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */

function makeEmptyFunction(arg) {
  return function () {
    return arg;
  };
}

/**
 * This function accepts and discards inputs; it has no side effects. This is
 * primarily useful idiomatically for overridable function endpoints which
 * always need to be callable, since JS lacks a null-call idiom ala Cocoa.
 */
var emptyFunction = function emptyFunction() {};

emptyFunction.thatReturns = makeEmptyFunction;
emptyFunction.thatReturnsFalse = makeEmptyFunction(false);
emptyFunction.thatReturnsTrue = makeEmptyFunction(true);
emptyFunction.thatReturnsNull = makeEmptyFunction(null);
emptyFunction.thatReturnsThis = function () {
  return this;
};
emptyFunction.thatReturnsArgument = function (arg) {
  return arg;
};

module.exports = emptyFunction;

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2014-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */



var emptyFunction = __webpack_require__(43);

/**
 * Similar to invariant but only logs a warning if the condition is not met.
 * This can be used to log issues in development environments in critical
 * paths. Removing the logging code for production environments will keep the
 * same logic and follow the same code paths.
 */

var warning = emptyFunction;

if (process.env.NODE_ENV !== 'production') {
  var printWarning = function printWarning(format) {
    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    var argIndex = 0;
    var message = 'Warning: ' + format.replace(/%s/g, function () {
      return args[argIndex++];
    });
    if (typeof console !== 'undefined') {
      console.error(message);
    }
    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      throw new Error(message);
    } catch (x) {}
  };

  warning = function warning(condition, format) {
    if (format === undefined) {
      throw new Error('`warning(condition, format, ...args)` requires a warning ' + 'message argument');
    }

    if (format.indexOf('Failed Composite propType: ') === 0) {
      return; // Ignore CompositeComponent proptype check.
    }

    if (!condition) {
      for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
        args[_key2 - 2] = arguments[_key2];
      }

      printWarning.apply(undefined, [format].concat(args));
    }
  };
}

module.exports = warning;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */



var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

module.exports = ReactPropTypesSecret;


/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright Schrodinger, LLC
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * This class listens to events on the document and then updates a react
 * component through callbacks.
 * Please note that captureMouseMove must be called in
 * order to initialize listeners on mousemove and mouseup.
 * releaseMouseMove must be called to remove them. It is important to
 * call releaseMouseMoves since mousemove is expensive to listen to.
 *
 * @providesModule DOMMouseMoveTracker
 * @typechecks
 */



var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _EventListener = __webpack_require__(112);

var _EventListener2 = _interopRequireDefault(_EventListener);

var _cancelAnimationFramePolyfill = __webpack_require__(113);

var _cancelAnimationFramePolyfill2 = _interopRequireDefault(_cancelAnimationFramePolyfill);

var _requestAnimationFramePolyfill = __webpack_require__(47);

var _requestAnimationFramePolyfill2 = _interopRequireDefault(_requestAnimationFramePolyfill);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DOMMouseMoveTracker = function () {
  /**
   * onMove is the callback that will be called on every mouse move.
   * onMoveEnd is called on mouse up when movement has ended.
   */
  function DOMMouseMoveTracker(
  /*function*/onMove,
  /*function*/onMoveEnd,
  /*DOMElement*/domNode) {
    _classCallCheck(this, DOMMouseMoveTracker);

    this._isDragging = false;
    this._animationFrameID = null;
    this._domNode = domNode;
    this._onMove = onMove;
    this._onMoveEnd = onMoveEnd;
    this._onMouseEnd = this._onMouseEnd.bind(this);
    this._onMouseMove = this._onMouseMove.bind(this);
    this._onMouseUp = this._onMouseUp.bind(this);
    this._didMouseMove = this._didMouseMove.bind(this);
  }

  /**
   * This is to set up the listeners for listening to mouse move
   * and mouse up signaling the movement has ended. Please note that these
   * listeners are added at the document.body level. It takes in an event
   * in order to grab inital state.
   */


  _createClass(DOMMouseMoveTracker, [{
    key: 'captureMouseMoves',
    value: function captureMouseMoves( /*object*/event) {
      if (!this._eventMoveToken && !this._eventUpToken && !this._eventLeaveToken && !this._eventOutToken) {
        this._eventMoveToken = _EventListener2.default.listen(this._domNode, 'mousemove', this._onMouseMove);
        this._eventUpToken = _EventListener2.default.listen(this._domNode, 'mouseup', this._onMouseUp);
        this._eventLeaveToken = _EventListener2.default.listen(this._domNode, 'mouseleave', this._onMouseEnd);
        this._eventOutToken = _EventListener2.default.listen(this._domNode, 'mouseout', this.onMouseEnd);
      }

      if (!this._isDragging) {
        this._deltaX = 0;
        this._deltaY = 0;
        this._isDragging = true;
        this._x = event.clientX;
        this._y = event.clientY;
      }
      event.preventDefault();
    }

    /**
     * These releases all of the listeners on document.body.
     */

  }, {
    key: 'releaseMouseMoves',
    value: function releaseMouseMoves() {
      if (this._eventMoveToken && this._eventUpToken && this._eventLeaveToken && this._eventOutToken) {
        this._eventMoveToken.remove();
        this._eventMoveToken = null;
        this._eventUpToken.remove();
        this._eventUpToken = null;
        this._eventLeaveToken.remove();
        this._eventLeaveToken = null;
        this._eventOutToken.remove();
        this._eventOutToken = null;
      }

      if (this._animationFrameID !== null) {
        (0, _cancelAnimationFramePolyfill2.default)(this._animationFrameID);
        this._animationFrameID = null;
      }

      if (this._isDragging) {
        this._isDragging = false;
        this._x = null;
        this._y = null;
      }
    }

    /**
     * Returns whether or not if the mouse movement is being tracked.
     */

  }, {
    key: 'isDragging',
    value: function isDragging() /*boolean*/{
      return this._isDragging;
    }

    /**
     * Calls onMove passed into constructor and updates internal state.
     */

  }, {
    key: '_onMouseMove',
    value: function _onMouseMove( /*object*/event) {
      var x = event.clientX;
      var y = event.clientY;

      this._deltaX += x - this._x;
      this._deltaY += y - this._y;

      if (this._animationFrameID === null) {
        // The mouse may move faster then the animation frame does.
        // Use `requestAnimationFramePolyfill` to avoid over-updating.
        this._animationFrameID = (0, _requestAnimationFramePolyfill2.default)(this._didMouseMove);
      }

      this._x = x;
      this._y = y;
      event.preventDefault();
    }
  }, {
    key: '_didMouseMove',
    value: function _didMouseMove() {
      this._animationFrameID = null;
      this._onMove(this._deltaX, this._deltaY);
      this._deltaX = 0;
      this._deltaY = 0;
    }

    /**
     * Calls onMoveEnd passed into constructor and updates internal state.
     */

  }, {
    key: '_onMouseUp',
    value: function _onMouseUp() {
      if (this._animationFrameID) {
        this._didMouseMove();
      }
      this._onMoveEnd(false);
    }

    /**
     * Calls onMoveEnd passed into the constructor, updates internal state, and cancels the move.
     */

  }, {
    key: '_onMouseEnd',
    value: function _onMouseEnd() {
      this._onMoveEnd(true);
    }
  }]);

  return DOMMouseMoveTracker;
}();

module.exports = DOMMouseMoveTracker;

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

var _emptyFunction = __webpack_require__(7);

var _emptyFunction2 = _interopRequireDefault(_emptyFunction);

var _nativeRequestAnimationFrame = __webpack_require__(114);

var _nativeRequestAnimationFrame2 = _interopRequireDefault(_nativeRequestAnimationFrame);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Copyright Schrodinger, LLC
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule requestAnimationFramePolyfill
 */

var lastTime = 0;

/**
 * Here is the native and polyfill version of requestAnimationFrame.
 * Please don't use it directly and use requestAnimationFrame module instead.
 */
var requestAnimationFrame = _nativeRequestAnimationFrame2.default || function (callback) {
  var currTime = Date.now();
  var timeDelay = Math.max(0, 16 - (currTime - lastTime));
  lastTime = currTime + timeDelay;
  return global.setTimeout(function () {
    callback(Date.now());
  }, timeDelay);
};

// Works around a rare bug in Safari 6 where the first request is never invoked.
requestAnimationFrame(_emptyFunction2.default);

module.exports = requestAnimationFrame;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6)))

/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright Schrodinger, LLC
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule Locale
 */



// Hard code this for now.

var Locale = {
  isRTL: function isRTL() {
    return false;
  },
  getDirection: function getDirection() {
    return 'LTR';
  }
};

module.exports = Locale;

/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright Schrodinger, LLC
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule shallowEqual
 * @typechecks
 * 
 */



/**
 * Performs equality by iterating through keys on an object and returning false
 * when any key has values which are not strictly equal between the arguments.
 * Returns true when the values of all keys are strictly equal.
 */

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function shallowEqual(objA, objB) {
  if (objA === objB) {
    return true;
  }

  if ((typeof objA === 'undefined' ? 'undefined' : _typeof(objA)) !== 'object' || objA === null || (typeof objB === 'undefined' ? 'undefined' : _typeof(objB)) !== 'object' || objB === null) {
    return false;
  }

  var keysA = Object.keys(objA);
  var keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) {
    return false;
  }

  // Test for A's keys different from B.
  var bHasOwnProperty = Object.prototype.hasOwnProperty.bind(objB);
  for (var i = 0; i < keysA.length; i++) {
    if (!bHasOwnProperty(keysA[i]) || objA[keysA[i]] !== objB[keysA[i]]) {
      return false;
    }
  }

  return true;
}

module.exports = shallowEqual;

/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _translateDOMPositionXY = __webpack_require__(118);

var _translateDOMPositionXY2 = _interopRequireDefault(_translateDOMPositionXY);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function FixedDataTableTranslateDOMPosition( /*object*/style, /*number*/x, /*number*/y) {
  var initialRender = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

  if (initialRender) {
    style.left = x + 'px';
    style.top = y + 'px';
  } else {
    (0, _translateDOMPositionXY2.default)(style, x, y);
  }
} /**
   * Copyright Schrodinger, LLC
   * All rights reserved.
   *
   * This source code is licensed under the BSD-style license found in the
   * LICENSE file in the root directory of this source tree. An additional grant
   * of patent rights can be found in the PATENTS file in the same directory.
   *
   * @providesModule FixedDataTableTranslateDOMPosition
   * @typechecks
   */

module.exports = FixedDataTableTranslateDOMPosition;

/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

var arrayLikeKeys = __webpack_require__(126),
    baseKeys = __webpack_require__(135),
    isArrayLike = __webpack_require__(56);

/**
 * Creates an array of the own enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects. See the
 * [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
 * for more details.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keys(new Foo);
 * // => ['a', 'b'] (iteration order is not guaranteed)
 *
 * _.keys('hi');
 * // => ['0', '1']
 */
function keys(object) {
  return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
}

module.exports = keys;


/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

var baseIsArguments = __webpack_require__(128),
    isObjectLike = __webpack_require__(14);

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Built-in value references. */
var propertyIsEnumerable = objectProto.propertyIsEnumerable;

/**
 * Checks if `value` is likely an `arguments` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 *  else `false`.
 * @example
 *
 * _.isArguments(function() { return arguments; }());
 * // => true
 *
 * _.isArguments([1, 2, 3]);
 * // => false
 */
var isArguments = baseIsArguments(function() { return arguments; }()) ? baseIsArguments : function(value) {
  return isObjectLike(value) && hasOwnProperty.call(value, 'callee') &&
    !propertyIsEnumerable.call(value, 'callee');
};

module.exports = isArguments;


/***/ }),
/* 53 */
/***/ (function(module, exports) {

module.exports = function(module) {
	if(!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if(!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),
/* 54 */
/***/ (function(module, exports) {

/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER = 9007199254740991;

/** Used to detect unsigned integer values. */
var reIsUint = /^(?:0|[1-9]\d*)$/;

/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */
function isIndex(value, length) {
  length = length == null ? MAX_SAFE_INTEGER : length;
  return !!length &&
    (typeof value == 'number' || reIsUint.test(value)) &&
    (value > -1 && value % 1 == 0 && value < length);
}

module.exports = isIndex;


/***/ }),
/* 55 */
/***/ (function(module, exports) {

/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER = 9007199254740991;

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This method is loosely based on
 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 * @example
 *
 * _.isLength(3);
 * // => true
 *
 * _.isLength(Number.MIN_VALUE);
 * // => false
 *
 * _.isLength(Infinity);
 * // => false
 *
 * _.isLength('3');
 * // => false
 */
function isLength(value) {
  return typeof value == 'number' &&
    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

module.exports = isLength;


/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

var isFunction = __webpack_require__(77),
    isLength = __webpack_require__(55);

/**
 * Checks if `value` is array-like. A value is considered array-like if it's
 * not a function and has a `value.length` that's an integer greater than or
 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 * @example
 *
 * _.isArrayLike([1, 2, 3]);
 * // => true
 *
 * _.isArrayLike(document.body.children);
 * // => true
 *
 * _.isArrayLike('abc');
 * // => true
 *
 * _.isArrayLike(_.noop);
 * // => false
 */
function isArrayLike(value) {
  return value != null && isLength(value.length) && !isFunction(value);
}

module.exports = isArrayLike;


/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

var baseMatches = __webpack_require__(140),
    baseMatchesProperty = __webpack_require__(190),
    identity = __webpack_require__(64),
    isArray = __webpack_require__(1),
    property = __webpack_require__(199);

/**
 * The base implementation of `_.iteratee`.
 *
 * @private
 * @param {*} [value=_.identity] The value to convert to an iteratee.
 * @returns {Function} Returns the iteratee.
 */
function baseIteratee(value) {
  // Don't store the `typeof` result in a variable to avoid a JIT bug in Safari 9.
  // See https://bugs.webkit.org/show_bug.cgi?id=156034 for more details.
  if (typeof value == 'function') {
    return value;
  }
  if (value == null) {
    return identity;
  }
  if (typeof value == 'object') {
    return isArray(value)
      ? baseMatchesProperty(value[0], value[1])
      : baseMatches(value);
  }
  return property(value);
}

module.exports = baseIteratee;


/***/ }),
/* 58 */
/***/ (function(module, exports) {

/**
 * Performs a
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * comparison between two values to determine if they are equivalent.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.eq(object, object);
 * // => true
 *
 * _.eq(object, other);
 * // => false
 *
 * _.eq('a', 'a');
 * // => true
 *
 * _.eq('a', Object('a'));
 * // => false
 *
 * _.eq(NaN, NaN);
 * // => true
 */
function eq(value, other) {
  return value === other || (value !== value && other !== other);
}

module.exports = eq;


/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

var getNative = __webpack_require__(9),
    root = __webpack_require__(5);

/* Built-in method references that are verified to be native. */
var Map = getNative(root, 'Map');

module.exports = Map;


/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

var mapCacheClear = __webpack_require__(156),
    mapCacheDelete = __webpack_require__(163),
    mapCacheGet = __webpack_require__(165),
    mapCacheHas = __webpack_require__(166),
    mapCacheSet = __webpack_require__(167);

/**
 * Creates a map cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function MapCache(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

// Add methods to `MapCache`.
MapCache.prototype.clear = mapCacheClear;
MapCache.prototype['delete'] = mapCacheDelete;
MapCache.prototype.get = mapCacheGet;
MapCache.prototype.has = mapCacheHas;
MapCache.prototype.set = mapCacheSet;

module.exports = MapCache;


/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

var castPath = __webpack_require__(29),
    toKey = __webpack_require__(15);

/**
 * The base implementation of `_.get` without support for default values.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array|string} path The path of the property to get.
 * @returns {*} Returns the resolved value.
 */
function baseGet(object, path) {
  path = castPath(path, object);

  var index = 0,
      length = path.length;

  while (object != null && index < length) {
    object = object[toKey(path[index++])];
  }
  return (index && index == length) ? object : undefined;
}

module.exports = baseGet;


/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

var isArray = __webpack_require__(1),
    isSymbol = __webpack_require__(63);

/** Used to match property names within property paths. */
var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
    reIsPlainProp = /^\w*$/;

/**
 * Checks if `value` is a property name and not a property path.
 *
 * @private
 * @param {*} value The value to check.
 * @param {Object} [object] The object to query keys on.
 * @returns {boolean} Returns `true` if `value` is a property name, else `false`.
 */
function isKey(value, object) {
  if (isArray(value)) {
    return false;
  }
  var type = typeof value;
  if (type == 'number' || type == 'symbol' || type == 'boolean' ||
      value == null || isSymbol(value)) {
    return true;
  }
  return reIsPlainProp.test(value) || !reIsDeepProp.test(value) ||
    (object != null && value in Object(object));
}

module.exports = isKey;


/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

var baseGetTag = __webpack_require__(12),
    isObjectLike = __webpack_require__(14);

/** `Object#toString` result references. */
var symbolTag = '[object Symbol]';

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol(value) {
  return typeof value == 'symbol' ||
    (isObjectLike(value) && baseGetTag(value) == symbolTag);
}

module.exports = isSymbol;


/***/ }),
/* 64 */
/***/ (function(module, exports) {

/**
 * This method returns the first argument it receives.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Util
 * @param {*} value Any value.
 * @returns {*} Returns `value`.
 * @example
 *
 * var object = { 'a': 1 };
 *
 * console.log(_.identity(object) === object);
 * // => true
 */
function identity(value) {
  return value;
}

module.exports = identity;


/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

var arrayEach = __webpack_require__(213),
    baseEach = __webpack_require__(23),
    castFunction = __webpack_require__(214),
    isArray = __webpack_require__(1);

/**
 * Iterates over elements of `collection` and invokes `iteratee` for each element.
 * The iteratee is invoked with three arguments: (value, index|key, collection).
 * Iteratee functions may exit iteration early by explicitly returning `false`.
 *
 * **Note:** As with other "Collections" methods, objects with a "length"
 * property are iterated like arrays. To avoid this behavior use `_.forIn`
 * or `_.forOwn` for object iteration.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @alias each
 * @category Collection
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function} [iteratee=_.identity] The function invoked per iteration.
 * @returns {Array|Object} Returns `collection`.
 * @see _.forEachRight
 * @example
 *
 * _.forEach([1, 2], function(value) {
 *   console.log(value);
 * });
 * // => Logs `1` then `2`.
 *
 * _.forEach({ 'a': 1, 'b': 2 }, function(value, key) {
 *   console.log(key);
 * });
 * // => Logs 'a' then 'b' (iteration order is not guaranteed).
 */
function forEach(collection, iteratee) {
  var func = isArray(collection) ? arrayEach : baseEach;
  return func(collection, castFunction(iteratee));
}

module.exports = forEach;


/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ScrollbarState = undefined;

var _widthHelper = __webpack_require__(22);

var _Scrollbar = __webpack_require__(30);

var _Scrollbar2 = _interopRequireDefault(_Scrollbar);

var _clamp = __webpack_require__(21);

var _clamp2 = _interopRequireDefault(_clamp);

var _shallowEqualSelector = __webpack_require__(17);

var _shallowEqualSelector2 = _interopRequireDefault(_shallowEqualSelector);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Copyright Schrodinger, LLC
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule roughHeights
 */
var BORDER_HEIGHT = 1;
var MIN_BUFFER_ROWS = 3;
var MAX_BUFFER_ROWS = 6;

var ScrollbarState = exports.ScrollbarState = {
  HIDDEN: 'hidden',
  JOINT_SCROLLBARS: 'JOINT_SCROLLBARS',
  VISIBLE: 'visible'
};

/**
 * Calculate the available height for the viewport.
 * Since we aren't 100% sure of whether scrollbars are visible
 * at this point, we compute a max & min viewport height.
 *
 * maxAvailableHeight is the largest it could be, while
 * minAvailableHeight is the smallest.
 * We also compute how large it is based on
 * the current scrollContentHeight in scrollbarsVisible.
 *
 * bufferRowCount is the number of rows to buffer both ahead and behind the viewport.
 * In total we will buffer twice this number of rows (half ahead, and half behind).
 *
 * reservedHeight is the height reserved for headers and footers.
 *
 * scrollStateX is the state of the horizontal scrollbar.
 * HIDDEN & VISIBLE are self explanatory, but
 * JOINT_SCROLLBARS mean the horizontal scroll will be shown if and
 * only if the vertical scrollbar is shown.
 *
 * @param {!Array.<{
 *   width: number,
 * }>} columnProps
 * @param {{
 *   footerHeight: number,
 *   groupHeaderHeight: number,
 *   headerHeight: number,
 * }} elementHeights
 * @param {{
 *   bufferRowCount: ?number,
 *   rowHeight: number,
 *   subRowHeight: number,
 * }} rowSettings
 * @param {{
 *   overflowX: string,
 *   showScrollbarX: boolean,
 * }} scrollFlags
 * @param {{
 *   height: ?number,
 *   maxHeight: ?number,
 *   useMaxHeight: boolean,
 *   width: number,
 * }} tableSize
 * @return {{
 *   bufferRowsCount: number,
 *   minAvailableHeight: number,
 *   maxAvailableHeight: number,
 *   reservedHeight: number,
 *   scrollStateX: ScrollbarState,
 * }}
 */
function roughHeights(columnProps, elementHeights, rowSettings, scrollFlags, tableSize) {
  var footerHeight = elementHeights.footerHeight,
      headerHeight = elementHeights.headerHeight,
      groupHeaderHeight = elementHeights.groupHeaderHeight;

  var reservedHeight = footerHeight + headerHeight + groupHeaderHeight + 2 * BORDER_HEIGHT;

  var height = tableSize.height,
      maxHeight = tableSize.maxHeight,
      useMaxHeight = tableSize.useMaxHeight,
      width = tableSize.width;

  var maxComponentHeight = Math.round(useMaxHeight ? maxHeight : height);
  var roughAvailableHeight = maxComponentHeight - reservedHeight;

  var scrollStateX = getScrollStateX(columnProps, scrollFlags, width);

  /*
   * Early estimates of how much height we have to show rows.
   * We won't know which one is real until we know about horizontal scrollbar which
   * requires knowing about vertical scrollbar as well and that
   * requires scrollContentHeight which
   * requires us to have handled scrollTo / scrollToRow...
   */
  var minAvailableHeight = roughAvailableHeight;
  var maxAvailableHeight = roughAvailableHeight;
  switch (scrollStateX) {
    case ScrollbarState.VISIBLE:
      {
        minAvailableHeight -= _Scrollbar2.default.SIZE;
        maxAvailableHeight -= _Scrollbar2.default.SIZE;
        break;
      }
    case ScrollbarState.JOINT_SCROLLBARS:
      {
        minAvailableHeight -= _Scrollbar2.default.SIZE;
        break;
      }
  }

  return {
    bufferRowCount: getBufferRowCount(maxAvailableHeight, rowSettings),
    minAvailableHeight: Math.max(minAvailableHeight, 0),
    maxAvailableHeight: Math.max(maxAvailableHeight, 0),
    reservedHeight: reservedHeight,
    scrollStateX: scrollStateX
  };
}

/**
 * @param {!Array.<{
 *   width: number,
 * }>} columnProps
 * @param {{
 *   overflowX: string,
 *   showScrollbarX: boolean,
 * }}
 * @param {number} width
 * @return {ScrollbarState}
 */
function getScrollStateX(columnProps, scrollFlags, width) {
  var overflowX = scrollFlags.overflowX,
      showScrollbarX = scrollFlags.showScrollbarX;

  var minColWidth = (0, _widthHelper.getTotalWidth)(columnProps);
  if (overflowX === 'hidden' || showScrollbarX === false) {
    return ScrollbarState.HIDDEN;
  } else if (minColWidth > width) {
    return ScrollbarState.VISIBLE;
  }

  var scrollbarSpace = _Scrollbar2.default.SIZE + _Scrollbar2.default.OFFSET;
  if (minColWidth > width - scrollbarSpace) {
    return ScrollbarState.JOINT_SCROLLBARS;
  }
  return ScrollbarState.HIDDEN;
}

/**
 * @param {number} maxAvailableHeight
 * @param {{
 *   bufferRowCount: ?number,
 *   rowHeight: number,
 *   subRowHeight: number,
 * }} rowSettings
 * @return {number}
 */
function getBufferRowCount(maxAvailableHeight, rowSettings) {
  var bufferRowCount = rowSettings.bufferRowCount,
      rowHeight = rowSettings.rowHeight,
      subRowHeight = rowSettings.subRowHeight;

  if (bufferRowCount !== undefined) {
    console.log('buffer set: ' + bufferRowCount);
    return bufferRowCount;
  }

  var fullRowHeight = rowHeight + subRowHeight;
  var avgVisibleRowCount = Math.ceil(maxAvailableHeight / fullRowHeight) + 1;
  return (0, _clamp2.default)(Math.floor(avgVisibleRowCount / 2), MIN_BUFFER_ROWS, MAX_BUFFER_ROWS);
}

exports.default = (0, _shallowEqualSelector2.default)([function (state) {
  return state.columnProps;
}, function (state) {
  return state.elementHeights;
}, function (state) {
  return state.rowSettings;
}, function (state) {
  return state.scrollFlags;
}, function (state) {
  return state.tableSize;
}], roughHeights);

/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

var basePick = __webpack_require__(232),
    flatRest = __webpack_require__(237);

/**
 * Creates an object composed of the picked `object` properties.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Object
 * @param {Object} object The source object.
 * @param {...(string|string[])} [paths] The property paths to pick.
 * @returns {Object} Returns the new object.
 * @example
 *
 * var object = { 'a': 1, 'b': '2', 'c': 3 };
 *
 * _.pick(object, ['a', 'c']);
 * // => { 'a': 1, 'c': 3 }
 */
var pick = flatRest(function(object, paths) {
  return object == null ? {} : basePick(object, paths);
});

module.exports = pick;


/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright Schrodinger, LLC
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule FixedDataTableRow
 * @typechecks
 */



var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _FixedDataTableCellGroup = __webpack_require__(106);

var _FixedDataTableCellGroup2 = _interopRequireDefault(_FixedDataTableCellGroup);

var _FixedDataTableTranslateDOMPosition = __webpack_require__(50);

var _FixedDataTableTranslateDOMPosition2 = _interopRequireDefault(_FixedDataTableTranslateDOMPosition);

var _propTypes = __webpack_require__(2);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _React = __webpack_require__(0);

var _React2 = _interopRequireDefault(_React);

var _cx = __webpack_require__(4);

var _cx2 = _interopRequireDefault(_cx);

var _joinClasses = __webpack_require__(10);

var _joinClasses2 = _interopRequireDefault(_joinClasses);

var _widthHelper = __webpack_require__(22);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Component that renders the row for <FixedDataTable />.
 * This component should not be used directly by developer. Instead,
 * only <FixedDataTable /> should use the component internally.
 */
var FixedDataTableRowImpl = function (_React$Component) {
  _inherits(FixedDataTableRowImpl, _React$Component);

  function FixedDataTableRowImpl() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, FixedDataTableRowImpl);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = FixedDataTableRowImpl.__proto__ || Object.getPrototypeOf(FixedDataTableRowImpl)).call.apply(_ref, [this].concat(args))), _this), _this._getRowExpanded = function ( /*number*/subRowHeight) /*?object*/{
      if (_this.props.rowExpanded) {
        var rowExpandedProps = {
          rowIndex: _this.props.index,
          height: subRowHeight,
          width: _this.props.width
        };

        var rowExpanded;
        if (_React2.default.isValidElement(_this.props.rowExpanded)) {
          rowExpanded = _React2.default.cloneElement(_this.props.rowExpanded, rowExpandedProps);
        } else if (typeof _this.props.rowExpanded === 'function') {
          rowExpanded = _this.props.rowExpanded(rowExpandedProps);
        }

        return rowExpanded;
      }
    }, _this._renderColumnsLeftShadow = function ( /*number*/left) /*?object*/{
      var className = (0, _cx2.default)({
        'fixedDataTableRowLayout/fixedColumnsDivider': left > 0,
        'fixedDataTableRowLayout/columnsShadow': _this.props.scrollLeft > 0,
        'public/fixedDataTableRow/fixedColumnsDivider': left > 0,
        'public/fixedDataTableRow/columnsShadow': _this.props.scrollLeft > 0
      });
      var style = {
        left: left,
        height: _this.props.height
      };
      return _React2.default.createElement('div', { className: className, style: style });
    }, _this._renderColumnsRightShadow = function ( /*number*/totalWidth) /*?object*/{
      if (Math.ceil(_this.props.scrollLeft + _this.props.width) < Math.floor(totalWidth)) {
        var className = (0, _cx2.default)('fixedDataTableRowLayout/columnsShadow', 'fixedDataTableRowLayout/columnsRightShadow', 'public/fixedDataTableRow/columnsShadow', 'public/fixedDataTableRow/columnsRightShadow');
        var style = {
          height: _this.props.height
        };
        return _React2.default.createElement('div', { className: className, style: style });
      }
    }, _this._onClick = function ( /*object*/event) {
      _this.props.onClick(event, _this.props.index);
    }, _this._onDoubleClick = function ( /*object*/event) {
      _this.props.onDoubleClick(event, _this.props.index);
    }, _this._onMouseDown = function ( /*object*/event) {
      _this.props.onMouseDown(event, _this.props.index);
    }, _this._onMouseEnter = function ( /*object*/event) {
      _this.props.onMouseEnter(event, _this.props.index);
    }, _this._onMouseLeave = function ( /*object*/event) {
      _this.props.onMouseLeave(event, _this.props.index);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(FixedDataTableRowImpl, [{
    key: 'render',
    value: function render() /*object*/{
      if (!this.props.visible) {
        return null;
      }

      var subRowHeight = this.props.subRowHeight || 0;
      var style = {
        width: this.props.width,
        height: this.props.height + subRowHeight
      };
      var className = (0, _cx2.default)({
        'fixedDataTableRowLayout/main': true,
        'public/fixedDataTableRow/main': true,
        'public/fixedDataTableRow/highlighted': this.props.index % 2 === 1,
        'public/fixedDataTableRow/odd': this.props.index % 2 === 1,
        'public/fixedDataTableRow/even': this.props.index % 2 === 0
      });
      var fixedColumnsWidth = (0, _widthHelper.sumPropWidths)(this.props.fixedColumns);
      var fixedColumns = _React2.default.createElement(_FixedDataTableCellGroup2.default, {
        key: 'fixed_cells',
        isScrolling: this.props.isScrolling,
        height: this.props.height,
        left: 0,
        width: fixedColumnsWidth,
        zIndex: 2,
        columns: this.props.fixedColumns,
        onColumnResize: this.props.onColumnResize,
        onColumnReorder: this.props.onColumnReorder,
        onColumnReorderMove: this.props.onColumnReorderMove,
        onColumnReorderEnd: this.props.onColumnReorderEnd,
        isColumnReordering: this.props.isColumnReordering,
        columnReorderingData: this.props.columnReorderingData,
        rowHeight: this.props.height,
        rowIndex: this.props.index
      });
      var columnsLeftShadow = this._renderColumnsLeftShadow(fixedColumnsWidth);
      var scrollableColumns = _React2.default.createElement(_FixedDataTableCellGroup2.default, {
        key: 'scrollable_cells',
        isScrolling: this.props.isScrolling,
        height: this.props.height,
        left: this.props.scrollLeft,
        offsetLeft: fixedColumnsWidth,
        width: this.props.width - fixedColumnsWidth,
        zIndex: 0,
        columns: this.props.scrollableColumns,
        onColumnResize: this.props.onColumnResize,
        onColumnReorder: this.props.onColumnReorder,
        onColumnReorderMove: this.props.onColumnReorderMove,
        onColumnReorderEnd: this.props.onColumnReorderEnd,
        isColumnReordering: this.props.isColumnReordering,
        columnReorderingData: this.props.columnReorderingData,
        rowHeight: this.props.height,
        rowIndex: this.props.index
      });
      var scrollableColumnsWidth = (0, _widthHelper.sumPropWidths)(this.props.scrollableColumns);
      var columnsRightShadow = this._renderColumnsRightShadow(fixedColumnsWidth + scrollableColumnsWidth);
      var rowExpanded = this._getRowExpanded(subRowHeight);
      var rowExpandedStyle = {
        height: subRowHeight,
        top: this.props.height,
        width: this.props.width
      };

      return _React2.default.createElement(
        'div',
        {
          className: (0, _joinClasses2.default)(className, this.props.className),
          onClick: this.props.onClick ? this._onClick : null,
          onDoubleClick: this.props.onDoubleClick ? this._onDoubleClick : null,
          onMouseDown: this.props.onMouseDown ? this._onMouseDown : null,
          onMouseEnter: this.props.onMouseEnter ? this._onMouseEnter : null,
          onMouseLeave: this.props.onMouseLeave ? this._onMouseLeave : null,
          style: style },
        _React2.default.createElement(
          'div',
          { className: (0, _cx2.default)('fixedDataTableRowLayout/body') },
          fixedColumns,
          scrollableColumns,
          columnsLeftShadow
        ),
        rowExpanded && _React2.default.createElement(
          'div',
          {
            className: (0, _cx2.default)('fixedDataTableRowLayout/rowExpanded'),
            style: rowExpandedStyle },
          rowExpanded
        ),
        columnsRightShadow
      );
    }
  }]);

  return FixedDataTableRowImpl;
}(_React2.default.Component);

FixedDataTableRowImpl.propTypes = {

  isScrolling: _propTypes2.default.bool,

  /**
   * Array of data for the fixed columns.
   */
  fixedColumns: _propTypes2.default.array.isRequired,

  /**
   * Height of the row.
   */
  height: _propTypes2.default.number.isRequired,

  /**
   * Height of the content to be displayed below the row.
   */
  subRowHeight: _propTypes2.default.number,

  /**
   * the row expanded.
   */
  rowExpanded: _propTypes2.default.oneOfType([_propTypes2.default.element, _propTypes2.default.func]),

  /**
   * The row index.
   */
  index: _propTypes2.default.number.isRequired,

  /**
   * Array of data for the scrollable columns.
   */
  scrollableColumns: _propTypes2.default.array.isRequired,

  /**
   * The distance between the left edge of the table and the leftmost portion
   * of the row currently visible in the table.
   */
  scrollLeft: _propTypes2.default.number.isRequired,

  /**
   * Pass false to hide the row.  This is used internally for buffering rows
   */
  visible: _propTypes2.default.bool.isRequired,

  /**
   * Width of the row.
   */
  width: _propTypes2.default.number.isRequired,

  /**
   * Fire when a row is clicked.
   */
  onClick: _propTypes2.default.func,

  /**
   * Fire when a row is double clicked.
   */
  onDoubleClick: _propTypes2.default.func,

  /**
   * Callback for when resizer knob (in FixedDataTableCell) is clicked
   * to initialize resizing. Please note this is only on the cells
   * in the header.
   * @param number combinedWidth
   * @param number leftOffset
   * @param number cellWidth
   * @param number|string columnKey
   * @param object event
   */
  onColumnResize: _propTypes2.default.func,

  isColumnReordering: _propTypes2.default.bool,
  /**
   * Callback for when reorder handle (in FixedDataTableCell) is clicked
   * to initialize reordering. Please note this is only on the cells
   * in the header.
   * @param number|string columnKey
   * @param number cellWidth
   * @param number leftOffset
   * @param object event
   */
  onColumnReorder: _propTypes2.default.func,

  /**
   * Callback for when a cell is moved while reordering.
   * @param number distance
   */
  onColumnReorderMove: _propTypes2.default.func,

  /**
   * Callback for when the mouse is released to complete reordering.
   * @param number distance
   */
  onColumnReorderEnd: _propTypes2.default.func
};

var FixedDataTableRow = function (_React$Component2) {
  _inherits(FixedDataTableRow, _React$Component2);

  function FixedDataTableRow() {
    _classCallCheck(this, FixedDataTableRow);

    return _possibleConstructorReturn(this, (FixedDataTableRow.__proto__ || Object.getPrototypeOf(FixedDataTableRow)).apply(this, arguments));
  }

  _createClass(FixedDataTableRow, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this._initialRender = true;
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this._initialRender = false;
    }
  }, {
    key: 'render',
    value: function render() /*object*/{
      var style = {
        width: this.props.width,
        height: this.props.height,
        zIndex: this.props.zIndex ? this.props.zIndex : 0
      };
      (0, _FixedDataTableTranslateDOMPosition2.default)(style, 0, this.props.offsetTop, this._initialRender);

      return _React2.default.createElement(
        'div',
        {
          style: style,
          className: (0, _cx2.default)('fixedDataTableRowLayout/rowWrapper') },
        _React2.default.createElement(FixedDataTableRowImpl, _extends({}, this.props, {
          offsetTop: undefined,
          zIndex: undefined
        }))
      );
    }
  }]);

  return FixedDataTableRow;
}(_React2.default.Component);

FixedDataTableRow.propTypes = {

  isScrolling: _propTypes2.default.bool,

  /**
   * Height of the row.
   */
  height: _propTypes2.default.number.isRequired,

  /**
   * Z-index on which the row will be displayed. Used e.g. for keeping
   * header and footer in front of other rows.
   */
  zIndex: _propTypes2.default.number,

  /**
   * The vertical position where the row should render itself
   */
  offsetTop: _propTypes2.default.number.isRequired,

  /**
   * Width of the row.
   */
  width: _propTypes2.default.number.isRequired
};


module.exports = FixedDataTableRow;

/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _React = __webpack_require__(0);

var _React2 = _interopRequireDefault(_React);

var _propTypes = __webpack_require__(2);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _cx = __webpack_require__(4);

var _cx2 = _interopRequireDefault(_cx);

var _joinClasses = __webpack_require__(10);

var _joinClasses2 = _interopRequireDefault(_joinClasses);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright Schrodinger, LLC
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * All rights reserved.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * This source code is licensed under the BSD-style license found in the
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * LICENSE file in the root directory of this source tree. An additional grant
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * of patent rights can be found in the PATENTS file in the same directory.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @providesModule FixedDataTableCellDefault
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @typechecks
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

/**
 * Component that handles default cell layout and styling.
 *
 * All props unless specified below will be set onto the top level `div`
 * rendered by the cell.
 *
 * Example usage via from a `Column`:
 * ```
 * const MyColumn = (
 *   <Column
 *     cell={({rowIndex, width, height}) => (
 *       <Cell
 *         width={width}
 *         height={height}
 *         className="my-class">
 *         Cell number: <span>{rowIndex}</span>
*        </Cell>
 *     )}
 *     width={100}
 *   />
 * );
 * ```
 */
var FixedDataTableCellDefault = function (_React$Component) {
  _inherits(FixedDataTableCellDefault, _React$Component);

  function FixedDataTableCellDefault() {
    _classCallCheck(this, FixedDataTableCellDefault);

    return _possibleConstructorReturn(this, (FixedDataTableCellDefault.__proto__ || Object.getPrototypeOf(FixedDataTableCellDefault)).apply(this, arguments));
  }

  _createClass(FixedDataTableCellDefault, [{
    key: 'render',
    value: function render() {
      //Remove some props like columnKey and rowIndex so we don't pass it into the div
      var _props = this.props,
          height = _props.height,
          width = _props.width,
          style = _props.style,
          className = _props.className,
          children = _props.children,
          columnKey = _props.columnKey,
          rowIndex = _props.rowIndex,
          props = _objectWithoutProperties(_props, ['height', 'width', 'style', 'className', 'children', 'columnKey', 'rowIndex']);

      var innerStyle = _extends({
        height: height,
        width: width
      }, style);

      return _React2.default.createElement(
        'div',
        _extends({}, props, {
          className: (0, _joinClasses2.default)((0, _cx2.default)('fixedDataTableCellLayout/wrap1'), (0, _cx2.default)('public/fixedDataTableCell/wrap1'), className),
          style: innerStyle }),
        _React2.default.createElement(
          'div',
          {
            className: (0, _joinClasses2.default)((0, _cx2.default)('fixedDataTableCellLayout/wrap2'), (0, _cx2.default)('public/fixedDataTableCell/wrap2')) },
          _React2.default.createElement(
            'div',
            {
              className: (0, _joinClasses2.default)((0, _cx2.default)('fixedDataTableCellLayout/wrap3'), (0, _cx2.default)('public/fixedDataTableCell/wrap3')) },
            _React2.default.createElement(
              'div',
              { className: (0, _cx2.default)('public/fixedDataTableCell/cellContent') },
              children
            )
          )
        )
      );
    }
  }]);

  return FixedDataTableCellDefault;
}(_React2.default.Component);

FixedDataTableCellDefault.propTypes = {

  /**
   * Outer height of the cell.
   */
  height: _propTypes2.default.number,

  /**
   * Outer width of the cell.
   */
  width: _propTypes2.default.number,

  /**
   * Optional prop that if specified on the `Column` will be passed to the
   * cell. It can be used to uniquely identify which column is the cell is in.
   */
  columnKey: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]),

  /**
   * Optional prop that represents the rows index in the table.
   * For the 'cell' prop of a Column, this parameter will exist for any
   * cell in a row with a positive index.
   *
   * Below that entry point the user is welcome to consume or
   * pass the prop through at their discretion.
   */
  rowIndex: _propTypes2.default.number
};


module.exports = FixedDataTableCellDefault;

/***/ }),
/* 70 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_70__;

/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright Schrodinger, LLC
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule FixedDataTableHelper
 * @typechecks
 */



var _Locale = __webpack_require__(48);

var _Locale2 = _interopRequireDefault(_Locale);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DIR_SIGN = _Locale2.default.isRTL() ? -1 : +1;
var FixedDataTableHelper = {
  DIR_SIGN: DIR_SIGN
};

module.exports = FixedDataTableHelper;

/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _ExecutionEnvironment = __webpack_require__(73);

var _ExecutionEnvironment2 = _interopRequireDefault(_ExecutionEnvironment);

var _camelize = __webpack_require__(120);

var _camelize2 = _interopRequireDefault(_camelize);

var _invariant = __webpack_require__(11);

var _invariant2 = _interopRequireDefault(_invariant);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var memoized = {}; /**
                    * Copyright Schrodinger, LLC
                    * All rights reserved.
                    *
                    * This source code is licensed under the BSD-style license found in the
                    * LICENSE file in the root directory of this source tree. An additional grant
                    * of patent rights can be found in the PATENTS file in the same directory.
                    *
                    * @providesModule getVendorPrefixedName
                    * @typechecks
                    */

var prefixes = ['Webkit', 'ms', 'Moz', 'O'];
var prefixRegex = new RegExp('^(' + prefixes.join('|') + ')');
var testStyle = _ExecutionEnvironment2.default.canUseDOM ? document.createElement('div').style : {};

function getWithPrefix(name) {
  for (var i = 0; i < prefixes.length; i++) {
    var prefixedName = prefixes[i] + name;
    if (prefixedName in testStyle) {
      return prefixedName;
    }
  }
  return null;
}

/**
 * @param {string} property Name of a css property to check for.
 * @return {?string} property name supported in the browser, or null if not
 * supported.
 */
function getVendorPrefixedName(property) {
  var name = (0, _camelize2.default)(property);
  if (memoized[name] === undefined) {
    var capitalizedName = name.charAt(0).toUpperCase() + name.slice(1);
    if (prefixRegex.test(capitalizedName)) {
      (0, _invariant2.default)(false, 'getVendorPrefixedName must only be called with unprefixed' + 'CSS property names. It was called with %s', property);
    }
    memoized[name] = name in testStyle ? name : getWithPrefix(capitalizedName);
  }
  return memoized[name];
}

module.exports = getVendorPrefixedName;

/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright Schrodinger, LLC
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule ExecutionEnvironment
 */

/*jslint evil: true */



var canUseDOM = !!(typeof window !== 'undefined' && window.document && window.document.createElement);

/**
 * Simple, lightweight module assisting with the detection and context of
 * Worker. Helps avoid circular dependencies and allows code to reason about
 * whether or not they are in a Worker, even if they never include the main
 * `ReactWorker` dependency.
 */
var ExecutionEnvironment = {

  canUseDOM: canUseDOM,

  canUseWorkers: typeof Worker !== 'undefined',

  canUseEventListeners: canUseDOM && !!(window.addEventListener || window.attachEvent),

  canUseViewport: canUseDOM && !!window.screen,

  isInWorker: !canUseDOM // For now, this is true - might change in the future.

};

module.exports = ExecutionEnvironment;

/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

module.exports = freeGlobal;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6)))

/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {var root = __webpack_require__(5),
    stubFalse = __webpack_require__(131);

/** Detect free variable `exports`. */
var freeExports = typeof exports == 'object' && exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule = freeExports && typeof module == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports = freeModule && freeModule.exports === freeExports;

/** Built-in value references. */
var Buffer = moduleExports ? root.Buffer : undefined;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeIsBuffer = Buffer ? Buffer.isBuffer : undefined;

/**
 * Checks if `value` is a buffer.
 *
 * @static
 * @memberOf _
 * @since 4.3.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a buffer, else `false`.
 * @example
 *
 * _.isBuffer(new Buffer(2));
 * // => true
 *
 * _.isBuffer(new Uint8Array(2));
 * // => false
 */
var isBuffer = nativeIsBuffer || stubFalse;

module.exports = isBuffer;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(53)(module)))

/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

var baseIsTypedArray = __webpack_require__(132),
    baseUnary = __webpack_require__(133),
    nodeUtil = __webpack_require__(134);

/* Node.js helper references. */
var nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;

/**
 * Checks if `value` is classified as a typed array.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 * @example
 *
 * _.isTypedArray(new Uint8Array);
 * // => true
 *
 * _.isTypedArray([]);
 * // => false
 */
var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;

module.exports = isTypedArray;


/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

var baseGetTag = __webpack_require__(12),
    isObject = __webpack_require__(24);

/** `Object#toString` result references. */
var asyncTag = '[object AsyncFunction]',
    funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]',
    proxyTag = '[object Proxy]';

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
  if (!isObject(value)) {
    return false;
  }
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 9 which returns 'object' for typed arrays and other constructors.
  var tag = baseGetTag(value);
  return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
}

module.exports = isFunction;


/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

var ListCache = __webpack_require__(25),
    stackClear = __webpack_require__(147),
    stackDelete = __webpack_require__(148),
    stackGet = __webpack_require__(149),
    stackHas = __webpack_require__(150),
    stackSet = __webpack_require__(151);

/**
 * Creates a stack cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Stack(entries) {
  var data = this.__data__ = new ListCache(entries);
  this.size = data.size;
}

// Add methods to `Stack`.
Stack.prototype.clear = stackClear;
Stack.prototype['delete'] = stackDelete;
Stack.prototype.get = stackGet;
Stack.prototype.has = stackHas;
Stack.prototype.set = stackSet;

module.exports = Stack;


/***/ }),
/* 79 */
/***/ (function(module, exports) {

/** Used for built-in method references. */
var funcProto = Function.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/**
 * Converts `func` to its source code.
 *
 * @private
 * @param {Function} func The function to convert.
 * @returns {string} Returns the source code.
 */
function toSource(func) {
  if (func != null) {
    try {
      return funcToString.call(func);
    } catch (e) {}
    try {
      return (func + '');
    } catch (e) {}
  }
  return '';
}

module.exports = toSource;


/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

var baseIsEqualDeep = __webpack_require__(168),
    isObjectLike = __webpack_require__(14);

/**
 * The base implementation of `_.isEqual` which supports partial comparisons
 * and tracks traversed objects.
 *
 * @private
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @param {boolean} bitmask The bitmask flags.
 *  1 - Unordered comparison
 *  2 - Partial comparison
 * @param {Function} [customizer] The function to customize comparisons.
 * @param {Object} [stack] Tracks traversed `value` and `other` objects.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 */
function baseIsEqual(value, other, bitmask, customizer, stack) {
  if (value === other) {
    return true;
  }
  if (value == null || other == null || (!isObjectLike(value) && !isObjectLike(other))) {
    return value !== value && other !== other;
  }
  return baseIsEqualDeep(value, other, bitmask, customizer, baseIsEqual, stack);
}

module.exports = baseIsEqual;


/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

var SetCache = __webpack_require__(169),
    arraySome = __webpack_require__(172),
    cacheHas = __webpack_require__(173);

/** Used to compose bitmasks for value comparisons. */
var COMPARE_PARTIAL_FLAG = 1,
    COMPARE_UNORDERED_FLAG = 2;

/**
 * A specialized version of `baseIsEqualDeep` for arrays with support for
 * partial deep comparisons.
 *
 * @private
 * @param {Array} array The array to compare.
 * @param {Array} other The other array to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} stack Tracks traversed `array` and `other` objects.
 * @returns {boolean} Returns `true` if the arrays are equivalent, else `false`.
 */
function equalArrays(array, other, bitmask, customizer, equalFunc, stack) {
  var isPartial = bitmask & COMPARE_PARTIAL_FLAG,
      arrLength = array.length,
      othLength = other.length;

  if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
    return false;
  }
  // Assume cyclic values are equal.
  var stacked = stack.get(array);
  if (stacked && stack.get(other)) {
    return stacked == other;
  }
  var index = -1,
      result = true,
      seen = (bitmask & COMPARE_UNORDERED_FLAG) ? new SetCache : undefined;

  stack.set(array, other);
  stack.set(other, array);

  // Ignore non-index properties.
  while (++index < arrLength) {
    var arrValue = array[index],
        othValue = other[index];

    if (customizer) {
      var compared = isPartial
        ? customizer(othValue, arrValue, index, other, array, stack)
        : customizer(arrValue, othValue, index, array, other, stack);
    }
    if (compared !== undefined) {
      if (compared) {
        continue;
      }
      result = false;
      break;
    }
    // Recursively compare arrays (susceptible to call stack limits).
    if (seen) {
      if (!arraySome(other, function(othValue, othIndex) {
            if (!cacheHas(seen, othIndex) &&
                (arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))) {
              return seen.push(othIndex);
            }
          })) {
        result = false;
        break;
      }
    } else if (!(
          arrValue === othValue ||
            equalFunc(arrValue, othValue, bitmask, customizer, stack)
        )) {
      result = false;
      break;
    }
  }
  stack['delete'](array);
  stack['delete'](other);
  return result;
}

module.exports = equalArrays;


/***/ }),
/* 82 */
/***/ (function(module, exports) {

/**
 * Appends the elements of `values` to `array`.
 *
 * @private
 * @param {Array} array The array to modify.
 * @param {Array} values The values to append.
 * @returns {Array} Returns `array`.
 */
function arrayPush(array, values) {
  var index = -1,
      length = values.length,
      offset = array.length;

  while (++index < length) {
    array[offset + index] = values[index];
  }
  return array;
}

module.exports = arrayPush;


/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(24);

/**
 * Checks if `value` is suitable for strict equality comparisons, i.e. `===`.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` if suitable for strict
 *  equality comparisons, else `false`.
 */
function isStrictComparable(value) {
  return value === value && !isObject(value);
}

module.exports = isStrictComparable;


/***/ }),
/* 84 */
/***/ (function(module, exports) {

/**
 * A specialized version of `matchesProperty` for source values suitable
 * for strict equality comparisons, i.e. `===`.
 *
 * @private
 * @param {string} key The key of the property to get.
 * @param {*} srcValue The value to match.
 * @returns {Function} Returns the new spec function.
 */
function matchesStrictComparable(key, srcValue) {
  return function(object) {
    if (object == null) {
      return false;
    }
    return object[key] === srcValue &&
      (srcValue !== undefined || (key in Object(object)));
  };
}

module.exports = matchesStrictComparable;


/***/ }),
/* 85 */
/***/ (function(module, exports) {

/**
 * A specialized version of `_.map` for arrays without support for iteratee
 * shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the new mapped array.
 */
function arrayMap(array, iteratee) {
  var index = -1,
      length = array == null ? 0 : array.length,
      result = Array(length);

  while (++index < length) {
    result[index] = iteratee(array[index], index, array);
  }
  return result;
}

module.exports = arrayMap;


/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

var baseHasIn = __webpack_require__(197),
    hasPath = __webpack_require__(198);

/**
 * Checks if `path` is a direct or inherited property of `object`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Object
 * @param {Object} object The object to query.
 * @param {Array|string} path The path to check.
 * @returns {boolean} Returns `true` if `path` exists, else `false`.
 * @example
 *
 * var object = _.create({ 'a': _.create({ 'b': 2 }) });
 *
 * _.hasIn(object, 'a');
 * // => true
 *
 * _.hasIn(object, 'a.b');
 * // => true
 *
 * _.hasIn(object, ['a', 'b']);
 * // => true
 *
 * _.hasIn(object, 'b');
 * // => false
 */
function hasIn(object, path) {
  return object != null && hasPath(object, path, baseHasIn);
}

module.exports = hasIn;


/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright Schrodinger, LLC
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * This is utility that handles onWheel events and calls provided wheel
 * callback with correct frame rate.
 *
 * @providesModule ReactWheelHandler
 * @typechecks
 */



var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _emptyFunction = __webpack_require__(7);

var _emptyFunction2 = _interopRequireDefault(_emptyFunction);

var _normalizeWheel = __webpack_require__(205);

var _normalizeWheel2 = _interopRequireDefault(_normalizeWheel);

var _requestAnimationFramePolyfill = __webpack_require__(47);

var _requestAnimationFramePolyfill2 = _interopRequireDefault(_requestAnimationFramePolyfill);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ReactWheelHandler = function () {
  /**
   * onWheel is the callback that will be called with right frame rate if
   * any wheel events happened
   * onWheel should is to be called with two arguments: deltaX and deltaY in
   * this order
   */
  function ReactWheelHandler(
  /*function*/onWheel,
  /*boolean|function*/handleScrollX,
  /*boolean|function*/handleScrollY,
  /*?boolean|?function*/stopPropagation) {
    _classCallCheck(this, ReactWheelHandler);

    this._animationFrameID = null;
    this._deltaX = 0;
    this._deltaY = 0;
    this._didWheel = this._didWheel.bind(this);
    if (typeof handleScrollX !== 'function') {
      handleScrollX = handleScrollX ? _emptyFunction2.default.thatReturnsTrue : _emptyFunction2.default.thatReturnsFalse;
    }

    if (typeof handleScrollY !== 'function') {
      handleScrollY = handleScrollY ? _emptyFunction2.default.thatReturnsTrue : _emptyFunction2.default.thatReturnsFalse;
    }

    if (typeof stopPropagation !== 'function') {
      stopPropagation = stopPropagation ? _emptyFunction2.default.thatReturnsTrue : _emptyFunction2.default.thatReturnsFalse;
    }

    this._handleScrollX = handleScrollX;
    this._handleScrollY = handleScrollY;
    this._stopPropagation = stopPropagation;
    this._onWheelCallback = onWheel;
    this.onWheel = this.onWheel.bind(this);
  }

  _createClass(ReactWheelHandler, [{
    key: 'onWheel',
    value: function onWheel( /*object*/event) {
      var normalizedEvent = (0, _normalizeWheel2.default)(event);
      var deltaX = this._deltaX + normalizedEvent.pixelX;
      var deltaY = this._deltaY + normalizedEvent.pixelY;
      var handleScrollX = this._handleScrollX(deltaX, deltaY);
      var handleScrollY = this._handleScrollY(deltaY, deltaX);
      if (!handleScrollX && !handleScrollY) {
        return;
      }

      this._deltaX += handleScrollX ? normalizedEvent.pixelX : 0;
      this._deltaY += handleScrollY ? normalizedEvent.pixelY : 0;
      event.preventDefault();

      var changed;
      if (this._deltaX !== 0 || this._deltaY !== 0) {
        if (this._stopPropagation()) {
          event.stopPropagation();
        }
        changed = true;
      }

      if (changed === true && this._animationFrameID === null) {
        this._animationFrameID = (0, _requestAnimationFramePolyfill2.default)(this._didWheel);
      }
    }
  }, {
    key: '_didWheel',
    value: function _didWheel() {
      this._animationFrameID = null;
      this._onWheelCallback(this._deltaX, this._deltaY);
      this._deltaX = 0;
      this._deltaY = 0;
    }
  }]);

  return ReactWheelHandler;
}();

module.exports = ReactWheelHandler;

/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * Copyright Schrodinger, LLC
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * All rights reserved.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * This source code is licensed under the BSD-style license found in the
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * LICENSE file in the root directory of this source tree. An additional grant
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * of patent rights can be found in the PATENTS file in the same directory.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * @providesModule columnWidths
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          */


var _widthHelper = __webpack_require__(22);

var _Scrollbar = __webpack_require__(30);

var _Scrollbar2 = _interopRequireDefault(_Scrollbar);

var _forEach = __webpack_require__(65);

var _forEach2 = _interopRequireDefault(_forEach);

var _map = __webpack_require__(89);

var _map2 = _interopRequireDefault(_map);

var _partition3 = __webpack_require__(216);

var _partition4 = _interopRequireDefault(_partition3);

var _scrollbarsVisible = __webpack_require__(16);

var _scrollbarsVisible2 = _interopRequireDefault(_scrollbarsVisible);

var _shallowEqualSelector = __webpack_require__(17);

var _shallowEqualSelector2 = _interopRequireDefault(_shallowEqualSelector);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @typedef {{
 *   fixed: boolean,
 *   flexGrow: number,
 *   width: number,
 * }}
 */
var columnDefinition = void 0;

/**
 * @param {!Array.<columnDefinition>} columnGroupProps
 * @param {!Array.<columnDefinition>} columnProps
 * @param {boolean} scrollEnabledY
 * @param {number} width
 * @return {{
 *   columnGroupProps: !Array.<columnDefinition>,
 *   columnProps: !Array.<columnDefinition>,
 *   availableScrollWidth: number,
 *   fixedColumns: !Array.<columnDefinition>,
 *   scrollableColumns: !Array.<columnDefinition>,
 *   maxScrollX: number,
 * }} The total width of all columns.
 */
function columnWidths(columnGroupProps, columnProps, scrollEnabledY, width) {
  var scrollbarSpace = scrollEnabledY ? _Scrollbar2.default.SIZE + _Scrollbar2.default.OFFSET : 0;
  var viewportWidth = width - scrollbarSpace;

  var _flexWidths = flexWidths(columnGroupProps, columnProps, viewportWidth),
      newColumnGroupProps = _flexWidths.newColumnGroupProps,
      newColumnProps = _flexWidths.newColumnProps;

  var _partition = (0, _partition4.default)(newColumnProps, function (column) {
    return column.fixed;
  }),
      _partition2 = _slicedToArray(_partition, 2),
      fixedColumns = _partition2[0],
      scrollableColumns = _partition2[1];

  var availableScrollWidth = viewportWidth - (0, _widthHelper.getTotalWidth)(fixedColumns);
  var maxScrollX = Math.max(0, (0, _widthHelper.getTotalWidth)(newColumnProps) - viewportWidth);
  return {
    columnGroupProps: newColumnGroupProps,
    columnProps: newColumnProps,
    availableScrollWidth: availableScrollWidth,
    fixedColumns: fixedColumns,
    scrollableColumns: scrollableColumns,
    maxScrollX: maxScrollX
  };
}

/**
 * @param {!Array.<columnDefinition>} columnGroupProps
 * @param {!Array.<columnDefinition>} columnProps
 * @param {number} viewportWidth
 * @return {{
 *   newColumnGroupProps: !Array.<columnDefinition>,
 *   newColumnProps: !Array.<columnDefinition>
 * }}
 */
function flexWidths(columnGroupProps, columnProps, viewportWidth) {
  var remainingFlexGrow = (0, _widthHelper.getTotalFlexGrow)(columnProps);
  if (remainingFlexGrow === 0) {
    return {
      newColumnGroupProps: columnGroupProps,
      newColumnProps: columnProps
    };
  }

  var columnsWidth = (0, _widthHelper.getTotalWidth)(columnProps);
  var remainingFlexWidth = Math.max(viewportWidth - columnsWidth, 0);

  var newColumnProps = (0, _map2.default)(columnProps, function (column) {
    var flexGrow = column.flexGrow;

    if (!flexGrow) {
      return column;
    }

    var flexWidth = Math.floor(flexGrow * remainingFlexWidth / remainingFlexGrow);
    var newWidth = column.width + flexWidth;
    remainingFlexGrow -= flexGrow;
    remainingFlexWidth -= flexWidth;

    return _extends({}, column, { width: newWidth });
  });

  var columnGroupWidths = (0, _map2.default)(columnGroupProps, function () {
    return 0;
  });
  (0, _forEach2.default)(newColumnProps, function (column) {
    if (column.groupIdx !== undefined) {
      columnGroupWidths[column.groupIdx] += column.width;
    }
  });

  var newColumnGroupProps = (0, _map2.default)(columnGroupProps, function (columnGroup, idx) {
    if (columnGroupWidths[idx] === columnGroup.width) {
      return columnGroup;
    }
    return _extends({}, columnGroup, { width: columnGroupWidths[idx] });
  });

  return {
    newColumnGroupProps: newColumnGroupProps,
    newColumnProps: newColumnProps
  };
}

exports.default = (0, _shallowEqualSelector2.default)([function (state) {
  return state.columnGroupProps;
}, function (state) {
  return state.columnProps;
}, function (state) {
  return (0, _scrollbarsVisible2.default)(state).scrollEnabledY;
}, function (state) {
  return state.tableSize.width;
}], columnWidths);

/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

var arrayMap = __webpack_require__(85),
    baseIteratee = __webpack_require__(57),
    baseMap = __webpack_require__(215),
    isArray = __webpack_require__(1);

/**
 * Creates an array of values by running each element in `collection` thru
 * `iteratee`. The iteratee is invoked with three arguments:
 * (value, index|key, collection).
 *
 * Many lodash methods are guarded to work as iteratees for methods like
 * `_.every`, `_.filter`, `_.map`, `_.mapValues`, `_.reject`, and `_.some`.
 *
 * The guarded methods are:
 * `ary`, `chunk`, `curry`, `curryRight`, `drop`, `dropRight`, `every`,
 * `fill`, `invert`, `parseInt`, `random`, `range`, `rangeRight`, `repeat`,
 * `sampleSize`, `slice`, `some`, `sortBy`, `split`, `take`, `takeRight`,
 * `template`, `trim`, `trimEnd`, `trimStart`, and `words`
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Collection
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function} [iteratee=_.identity] The function invoked per iteration.
 * @returns {Array} Returns the new mapped array.
 * @example
 *
 * function square(n) {
 *   return n * n;
 * }
 *
 * _.map([4, 8], square);
 * // => [16, 64]
 *
 * _.map({ 'a': 4, 'b': 8 }, square);
 * // => [16, 64] (iteration order is not guaranteed)
 *
 * var users = [
 *   { 'user': 'barney' },
 *   { 'user': 'fred' }
 * ];
 *
 * // The `_.property` iteratee shorthand.
 * _.map(users, 'user');
 * // => ['barney', 'fred']
 */
function map(collection, iteratee) {
  var func = isArray(collection) ? arrayMap : baseMap;
  return func(collection, baseIteratee(iteratee, 3));
}

module.exports = map;


/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Scrollbar = __webpack_require__(30);

var _Scrollbar2 = _interopRequireDefault(_Scrollbar);

var _roughHeights = __webpack_require__(66);

var _roughHeights2 = _interopRequireDefault(_roughHeights);

var _scrollbarsVisible = __webpack_require__(16);

var _scrollbarsVisible2 = _interopRequireDefault(_scrollbarsVisible);

var _shallowEqualSelector = __webpack_require__(17);

var _shallowEqualSelector2 = _interopRequireDefault(_shallowEqualSelector);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Compute the necessary heights for rendering parts of the table
 *
 * @param {{
 *   footerHeight: number,
 *   groupHeaderHeight: number,
 *   headerHeight: number,
 * }} elementHeights
 * @param {number|undefined} ownerHeight
 * @param {number} reservedHeight
 * @param {number} scrollContentHeight
 * @param {{
 *   availableHeight: number,
 *   scrollEnabledX: boolean,
 * }} scrollbarsVisible
 * @param {boolean} useMaxHeight
 * @return {{
 *   bodyHeight: number,
 *   bodyOffsetTop: number,
 *   componentHeight: number,
 *   contentHeight: number,
 *   footOffsetTop: number,
 *   scrollbarXOffsetTop: number,
 *   visibleRowsHeight: number,
 * }}
 */
/**
 * Copyright Schrodinger, LLC
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule tableHeights
 */
function tableHeights(elementHeights, ownerHeight, reservedHeight, scrollContentHeight, scrollbarsVisible, useMaxHeight) {
  var availableHeight = scrollbarsVisible.availableHeight,
      scrollEnabledX = scrollbarsVisible.scrollEnabledX;

  var reservedWithScrollbar = reservedHeight;
  if (scrollEnabledX) {
    reservedWithScrollbar += _Scrollbar2.default.SIZE;
  }

  // If less content than space for rows (bodyHeight), then
  // we should shrink the space for rows to fit our row content (scrollContentHeight).
  var bodyHeight = Math.min(availableHeight, scrollContentHeight);

  // If using max height, component should only be sized to content.
  // Otherwise use all available height.
  var rowContainerHeight = useMaxHeight ? bodyHeight : availableHeight;
  var componentHeight = rowContainerHeight + reservedWithScrollbar;

  // If we have an owner height and it's less than the component height,
  // adjust visible height so we show footer and scrollbar position at the bottom of owner.
  var visibleRowsHeight = rowContainerHeight;
  if (ownerHeight < componentHeight) {
    visibleRowsHeight = ownerHeight - reservedWithScrollbar;
  }

  // If using max height, virtual row container is scrollContentHeight, otherwise
  // it is the larger of that or the available height.
  var virtualRowContainerHeight = useMaxHeight ? scrollContentHeight : Math.max(scrollContentHeight, availableHeight);

  // contentHeight is the virtual rows height and reserved height,
  // or ownerHeight if that's larger
  var contentHeight = virtualRowContainerHeight + reservedWithScrollbar;
  if (ownerHeight) {
    contentHeight = Math.max(ownerHeight, contentHeight);
  }

  // Determine component offsets
  var footerHeight = elementHeights.footerHeight,
      groupHeaderHeight = elementHeights.groupHeaderHeight,
      headerHeight = elementHeights.headerHeight;

  var bodyOffsetTop = groupHeaderHeight + headerHeight;
  var footOffsetTop = bodyOffsetTop + visibleRowsHeight;
  var scrollbarXOffsetTop = footOffsetTop + footerHeight;

  return {
    bodyHeight: bodyHeight,
    bodyOffsetTop: bodyOffsetTop,
    componentHeight: componentHeight,
    contentHeight: contentHeight,
    footOffsetTop: footOffsetTop,
    scrollbarXOffsetTop: scrollbarXOffsetTop,
    visibleRowsHeight: visibleRowsHeight
  };
}

exports.default = (0, _shallowEqualSelector2.default)([function (state) {
  return state.elementHeights;
}, function (state) {
  return state.tableSize.ownerHeight;
}, function (state) {
  return (0, _roughHeights2.default)(state).reservedHeight;
}, function (state) {
  return state.scrollContentHeight;
}, _scrollbarsVisible2.default, function (state) {
  return state.tableSize.useMaxHeight;
}], tableHeights);

/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright Schrodinger, LLC
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule updateRowHeight
 */



/**
 * Update our cached row height for a specific index
 * based on the value from rowHeightGetter
 *
 * NOTE (jordan) This alters state so it shouldn't be called
 * without state having been cloned first.
 *
 * @param {!Object} state
 * @param {number} rowIdx
 * @return {number} The new row height
 */

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = updateRowHeight;
function updateRowHeight(state, rowIdx) {
  var storedHeights = state.storedHeights,
      rowOffsets = state.rowOffsets,
      rowSettings = state.rowSettings;
  var rowHeightGetter = rowSettings.rowHeightGetter,
      subRowHeightGetter = rowSettings.subRowHeightGetter;


  var newHeight = rowHeightGetter(rowIdx) + subRowHeightGetter(rowIdx);
  var oldHeight = storedHeights[rowIdx];
  if (newHeight !== oldHeight) {
    rowOffsets.set(rowIdx, newHeight);
    storedHeights[rowIdx] = newHeight;
    state.scrollContentHeight += newHeight - oldHeight;
  }

  return storedHeights[rowIdx];
}

/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

var getNative = __webpack_require__(9);

var defineProperty = (function() {
  try {
    var func = getNative(Object, 'defineProperty');
    func({}, '', {});
    return func;
  } catch (e) {}
}());

module.exports = defineProperty;


/***/ }),
/* 93 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* WEBPACK VAR INJECTION */(function(process) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__createStore__ = __webpack_require__(94);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__combineReducers__ = __webpack_require__(258);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__bindActionCreators__ = __webpack_require__(259);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__applyMiddleware__ = __webpack_require__(260);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__compose__ = __webpack_require__(98);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__utils_warning__ = __webpack_require__(97);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "createStore", function() { return __WEBPACK_IMPORTED_MODULE_0__createStore__["b"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "combineReducers", function() { return __WEBPACK_IMPORTED_MODULE_1__combineReducers__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "bindActionCreators", function() { return __WEBPACK_IMPORTED_MODULE_2__bindActionCreators__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "applyMiddleware", function() { return __WEBPACK_IMPORTED_MODULE_3__applyMiddleware__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "compose", function() { return __WEBPACK_IMPORTED_MODULE_4__compose__["a"]; });







/*
* This is a dummy function to check if the function name has been altered by minification.
* If the function has been minified and NODE_ENV !== 'production', warn the user.
*/
function isCrushed() {}

if (process.env.NODE_ENV !== 'production' && typeof isCrushed.name === 'string' && isCrushed.name !== 'isCrushed') {
  Object(__WEBPACK_IMPORTED_MODULE_5__utils_warning__["a" /* default */])('You are currently using minified code outside of NODE_ENV === \'production\'. ' + 'This means that you are running a slower development build of Redux. ' + 'You can use loose-envify (https://github.com/zertosh/loose-envify) for browserify ' + 'or DefinePlugin for webpack (http://stackoverflow.com/questions/30030031) ' + 'to ensure you have the correct code for your production build.');
}


/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(3)))

/***/ }),
/* 94 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ActionTypes; });
/* harmony export (immutable) */ __webpack_exports__["b"] = createStore;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash_es_isPlainObject__ = __webpack_require__(95);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_symbol_observable__ = __webpack_require__(255);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_symbol_observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_symbol_observable__);



/**
 * These are private action types reserved by Redux.
 * For any unknown actions, you must return the current state.
 * If the current state is undefined, you must return the initial state.
 * Do not reference these action types directly in your code.
 */
var ActionTypes = {
  INIT: '@@redux/INIT'

  /**
   * Creates a Redux store that holds the state tree.
   * The only way to change the data in the store is to call `dispatch()` on it.
   *
   * There should only be a single store in your app. To specify how different
   * parts of the state tree respond to actions, you may combine several reducers
   * into a single reducer function by using `combineReducers`.
   *
   * @param {Function} reducer A function that returns the next state tree, given
   * the current state tree and the action to handle.
   *
   * @param {any} [preloadedState] The initial state. You may optionally specify it
   * to hydrate the state from the server in universal apps, or to restore a
   * previously serialized user session.
   * If you use `combineReducers` to produce the root reducer function, this must be
   * an object with the same shape as `combineReducers` keys.
   *
   * @param {Function} [enhancer] The store enhancer. You may optionally specify it
   * to enhance the store with third-party capabilities such as middleware,
   * time travel, persistence, etc. The only store enhancer that ships with Redux
   * is `applyMiddleware()`.
   *
   * @returns {Store} A Redux store that lets you read the state, dispatch actions
   * and subscribe to changes.
   */
};function createStore(reducer, preloadedState, enhancer) {
  var _ref2;

  if (typeof preloadedState === 'function' && typeof enhancer === 'undefined') {
    enhancer = preloadedState;
    preloadedState = undefined;
  }

  if (typeof enhancer !== 'undefined') {
    if (typeof enhancer !== 'function') {
      throw new Error('Expected the enhancer to be a function.');
    }

    return enhancer(createStore)(reducer, preloadedState);
  }

  if (typeof reducer !== 'function') {
    throw new Error('Expected the reducer to be a function.');
  }

  var currentReducer = reducer;
  var currentState = preloadedState;
  var currentListeners = [];
  var nextListeners = currentListeners;
  var isDispatching = false;

  function ensureCanMutateNextListeners() {
    if (nextListeners === currentListeners) {
      nextListeners = currentListeners.slice();
    }
  }

  /**
   * Reads the state tree managed by the store.
   *
   * @returns {any} The current state tree of your application.
   */
  function getState() {
    return currentState;
  }

  /**
   * Adds a change listener. It will be called any time an action is dispatched,
   * and some part of the state tree may potentially have changed. You may then
   * call `getState()` to read the current state tree inside the callback.
   *
   * You may call `dispatch()` from a change listener, with the following
   * caveats:
   *
   * 1. The subscriptions are snapshotted just before every `dispatch()` call.
   * If you subscribe or unsubscribe while the listeners are being invoked, this
   * will not have any effect on the `dispatch()` that is currently in progress.
   * However, the next `dispatch()` call, whether nested or not, will use a more
   * recent snapshot of the subscription list.
   *
   * 2. The listener should not expect to see all state changes, as the state
   * might have been updated multiple times during a nested `dispatch()` before
   * the listener is called. It is, however, guaranteed that all subscribers
   * registered before the `dispatch()` started will be called with the latest
   * state by the time it exits.
   *
   * @param {Function} listener A callback to be invoked on every dispatch.
   * @returns {Function} A function to remove this change listener.
   */
  function subscribe(listener) {
    if (typeof listener !== 'function') {
      throw new Error('Expected listener to be a function.');
    }

    var isSubscribed = true;

    ensureCanMutateNextListeners();
    nextListeners.push(listener);

    return function unsubscribe() {
      if (!isSubscribed) {
        return;
      }

      isSubscribed = false;

      ensureCanMutateNextListeners();
      var index = nextListeners.indexOf(listener);
      nextListeners.splice(index, 1);
    };
  }

  /**
   * Dispatches an action. It is the only way to trigger a state change.
   *
   * The `reducer` function, used to create the store, will be called with the
   * current state tree and the given `action`. Its return value will
   * be considered the **next** state of the tree, and the change listeners
   * will be notified.
   *
   * The base implementation only supports plain object actions. If you want to
   * dispatch a Promise, an Observable, a thunk, or something else, you need to
   * wrap your store creating function into the corresponding middleware. For
   * example, see the documentation for the `redux-thunk` package. Even the
   * middleware will eventually dispatch plain object actions using this method.
   *
   * @param {Object} action A plain object representing “what changed”. It is
   * a good idea to keep actions serializable so you can record and replay user
   * sessions, or use the time travelling `redux-devtools`. An action must have
   * a `type` property which may not be `undefined`. It is a good idea to use
   * string constants for action types.
   *
   * @returns {Object} For convenience, the same action object you dispatched.
   *
   * Note that, if you use a custom middleware, it may wrap `dispatch()` to
   * return something else (for example, a Promise you can await).
   */
  function dispatch(action) {
    if (!Object(__WEBPACK_IMPORTED_MODULE_0_lodash_es_isPlainObject__["a" /* default */])(action)) {
      throw new Error('Actions must be plain objects. ' + 'Use custom middleware for async actions.');
    }

    if (typeof action.type === 'undefined') {
      throw new Error('Actions may not have an undefined "type" property. ' + 'Have you misspelled a constant?');
    }

    if (isDispatching) {
      throw new Error('Reducers may not dispatch actions.');
    }

    try {
      isDispatching = true;
      currentState = currentReducer(currentState, action);
    } finally {
      isDispatching = false;
    }

    var listeners = currentListeners = nextListeners;
    for (var i = 0; i < listeners.length; i++) {
      var listener = listeners[i];
      listener();
    }

    return action;
  }

  /**
   * Replaces the reducer currently used by the store to calculate the state.
   *
   * You might need this if your app implements code splitting and you want to
   * load some of the reducers dynamically. You might also need this if you
   * implement a hot reloading mechanism for Redux.
   *
   * @param {Function} nextReducer The reducer for the store to use instead.
   * @returns {void}
   */
  function replaceReducer(nextReducer) {
    if (typeof nextReducer !== 'function') {
      throw new Error('Expected the nextReducer to be a function.');
    }

    currentReducer = nextReducer;
    dispatch({ type: ActionTypes.INIT });
  }

  /**
   * Interoperability point for observable/reactive libraries.
   * @returns {observable} A minimal observable of state changes.
   * For more information, see the observable proposal:
   * https://github.com/tc39/proposal-observable
   */
  function observable() {
    var _ref;

    var outerSubscribe = subscribe;
    return _ref = {
      /**
       * The minimal observable subscription method.
       * @param {Object} observer Any object that can be used as an observer.
       * The observer object should have a `next` method.
       * @returns {subscription} An object with an `unsubscribe` method that can
       * be used to unsubscribe the observable from the store, and prevent further
       * emission of values from the observable.
       */
      subscribe: function subscribe(observer) {
        if (typeof observer !== 'object') {
          throw new TypeError('Expected the observer to be an object.');
        }

        function observeState() {
          if (observer.next) {
            observer.next(getState());
          }
        }

        observeState();
        var unsubscribe = outerSubscribe(observeState);
        return { unsubscribe: unsubscribe };
      }
    }, _ref[__WEBPACK_IMPORTED_MODULE_1_symbol_observable___default.a] = function () {
      return this;
    }, _ref;
  }

  // When a store is created, an "INIT" action is dispatched so that every
  // reducer returns their initial state. This effectively populates
  // the initial state tree.
  dispatch({ type: ActionTypes.INIT });

  return _ref2 = {
    dispatch: dispatch,
    subscribe: subscribe,
    getState: getState,
    replaceReducer: replaceReducer
  }, _ref2[__WEBPACK_IMPORTED_MODULE_1_symbol_observable___default.a] = observable, _ref2;
}

/***/ }),
/* 95 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__baseGetTag_js__ = __webpack_require__(247);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__getPrototype_js__ = __webpack_require__(252);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__isObjectLike_js__ = __webpack_require__(254);




/** `Object#toString` result references. */
var objectTag = '[object Object]';

/** Used for built-in method references. */
var funcProto = Function.prototype,
    objectProto = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Used to infer the `Object` constructor. */
var objectCtorString = funcToString.call(Object);

/**
 * Checks if `value` is a plain object, that is, an object created by the
 * `Object` constructor or one with a `[[Prototype]]` of `null`.
 *
 * @static
 * @memberOf _
 * @since 0.8.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 * }
 *
 * _.isPlainObject(new Foo);
 * // => false
 *
 * _.isPlainObject([1, 2, 3]);
 * // => false
 *
 * _.isPlainObject({ 'x': 0, 'y': 0 });
 * // => true
 *
 * _.isPlainObject(Object.create(null));
 * // => true
 */
function isPlainObject(value) {
  if (!Object(__WEBPACK_IMPORTED_MODULE_2__isObjectLike_js__["a" /* default */])(value) || Object(__WEBPACK_IMPORTED_MODULE_0__baseGetTag_js__["a" /* default */])(value) != objectTag) {
    return false;
  }
  var proto = Object(__WEBPACK_IMPORTED_MODULE_1__getPrototype_js__["a" /* default */])(value);
  if (proto === null) {
    return true;
  }
  var Ctor = hasOwnProperty.call(proto, 'constructor') && proto.constructor;
  return typeof Ctor == 'function' && Ctor instanceof Ctor &&
    funcToString.call(Ctor) == objectCtorString;
}

/* harmony default export */ __webpack_exports__["a"] = (isPlainObject);


/***/ }),
/* 96 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__root_js__ = __webpack_require__(248);


/** Built-in value references. */
var Symbol = __WEBPACK_IMPORTED_MODULE_0__root_js__["a" /* default */].Symbol;

/* harmony default export */ __webpack_exports__["a"] = (Symbol);


/***/ }),
/* 97 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = warning;
/**
 * Prints a warning in the console if it exists.
 *
 * @param {String} message The warning message.
 * @returns {void}
 */
function warning(message) {
  /* eslint-disable no-console */
  if (typeof console !== 'undefined' && typeof console.error === 'function') {
    console.error(message);
  }
  /* eslint-enable no-console */
  try {
    // This error was thrown as a convenience so that if you enable
    // "break on all exceptions" in your console,
    // it would pause the execution at this line.
    throw new Error(message);
    /* eslint-disable no-empty */
  } catch (e) {}
  /* eslint-enable no-empty */
}

/***/ }),
/* 98 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = compose;
/**
 * Composes single-argument functions from right to left. The rightmost
 * function can take multiple arguments as it provides the signature for
 * the resulting composite function.
 *
 * @param {...Function} funcs The functions to compose.
 * @returns {Function} A function obtained by composing the argument functions
 * from right to left. For example, compose(f, g, h) is identical to doing
 * (...args) => f(g(h(...args))).
 */

function compose() {
  for (var _len = arguments.length, funcs = Array(_len), _key = 0; _key < _len; _key++) {
    funcs[_key] = arguments[_key];
  }

  if (funcs.length === 0) {
    return function (arg) {
      return arg;
    };
  }

  if (funcs.length === 1) {
    return funcs[0];
  }

  return funcs.reduce(function (a, b) {
    return function () {
      return a(b.apply(undefined, arguments));
    };
  });
}

/***/ }),
/* 99 */,
/* 100 */,
/* 101 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(31);
__webpack_require__(32);
__webpack_require__(33);
__webpack_require__(34);
__webpack_require__(35);
__webpack_require__(36);
__webpack_require__(37);
__webpack_require__(38);
__webpack_require__(39);
__webpack_require__(40);
__webpack_require__(41);
__webpack_require__(42);
module.exports = __webpack_require__(102);


/***/ }),
/* 102 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright Schrodinger, LLC
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule FixedDataTableRoot
 */



var _FixedDataTableContainer = __webpack_require__(103);

var _FixedDataTableContainer2 = _interopRequireDefault(_FixedDataTableContainer);

var _FixedDataTableCellDefault = __webpack_require__(69);

var _FixedDataTableCellDefault2 = _interopRequireDefault(_FixedDataTableCellDefault);

var _FixedDataTableColumn = __webpack_require__(263);

var _FixedDataTableColumn2 = _interopRequireDefault(_FixedDataTableColumn);

var _FixedDataTableColumnGroup = __webpack_require__(264);

var _FixedDataTableColumnGroup2 = _interopRequireDefault(_FixedDataTableColumnGroup);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FixedDataTableRoot = {
  Cell: _FixedDataTableCellDefault2.default,
  Column: _FixedDataTableColumn2.default,
  ColumnGroup: _FixedDataTableColumnGroup2.default,
  Table: _FixedDataTableContainer2.default
};

FixedDataTableRoot.version = '1.0.0-beta.4';
module.exports = FixedDataTableRoot;

/***/ }),
/* 103 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ActionTypes = __webpack_require__(18);

var ActionTypes = _interopRequireWildcard(_ActionTypes);

var _FixedDataTable = __webpack_require__(104);

var _FixedDataTable2 = _interopRequireDefault(_FixedDataTable);

var _FixedDataTableStore = __webpack_require__(222);

var _FixedDataTableStore2 = _interopRequireDefault(_FixedDataTableStore);

var _React = __webpack_require__(0);

var _React2 = _interopRequireDefault(_React);

var _redux = __webpack_require__(93);

var _columnActions = __webpack_require__(261);

var columnActions = _interopRequireWildcard(_columnActions);

var _invariant = __webpack_require__(11);

var _invariant2 = _interopRequireDefault(_invariant);

var _pick = __webpack_require__(67);

var _pick2 = _interopRequireDefault(_pick);

var _scrollActions = __webpack_require__(262);

var scrollActions = _interopRequireWildcard(_scrollActions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright Schrodinger, LLC
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * All rights reserved.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * This source code is licensed under the BSD-style license found in the
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * LICENSE file in the root directory of this source tree. An additional grant
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * of patent rights can be found in the PATENTS file in the same directory.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @providesModule FixedDataTableContainer
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @typechecks
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @noflow
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var FixedDataTableContainer = function (_React$Component) {
  _inherits(FixedDataTableContainer, _React$Component);

  function FixedDataTableContainer(props) {
    _classCallCheck(this, FixedDataTableContainer);

    var _this = _possibleConstructorReturn(this, (FixedDataTableContainer.__proto__ || Object.getPrototypeOf(FixedDataTableContainer)).call(this, props));

    _this.update = _this.update.bind(_this);

    _this.reduxStore = _FixedDataTableStore2.default.get();
    _this.unsubscribe = _this.reduxStore.subscribe(_this.update);

    _this.scrollActions = (0, _redux.bindActionCreators)(scrollActions, _this.reduxStore.dispatch);
    _this.columnActions = (0, _redux.bindActionCreators)(columnActions, _this.reduxStore.dispatch);
    return _this;
  }

  _createClass(FixedDataTableContainer, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var props = this.props;

      this.reduxStore.dispatch({
        type: ActionTypes.INITIALIZE,
        props: props
      });

      this.update();
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      (0, _invariant2.default)(nextProps.height !== undefined || nextProps.maxHeight !== undefined, 'You must set either a height or a maxHeight');

      this.reduxStore.dispatch({
        type: ActionTypes.PROP_CHANGE,
        newProps: nextProps,
        oldProps: this.props
      });
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (this.unsubscribe) {
        this.unsubscribe();
        this.unsubscribe = null;
      }
      this.reduxStore = null;
    }
  }, {
    key: 'render',
    value: function render() {
      return _React2.default.createElement(_FixedDataTable2.default, _extends({}, this.props, this.state, {
        scrollActions: this.scrollActions,
        columnActions: this.columnActions
      }));
    }
  }, {
    key: 'update',
    value: function update() {
      var state = this.reduxStore.getState();
      var boundState = (0, _pick2.default)(state, ['columnGroupProps', 'columnProps', 'columnReorderingData', 'columnResizingData', 'elementHeights', 'elementTemplates', 'firstRowIndex', 'isColumnReordering', 'isColumnResizing', 'maxScrollX', 'maxScrollY', 'rows', 'rowHeights', 'rowSettings', 'scrollContentHeight', 'scrollFlags', 'scrollX', 'scrollY', 'tableSize']);

      this.setState(boundState);
    }
  }]);

  return FixedDataTableContainer;
}(_React2.default.Component);

exports.default = FixedDataTableContainer;

/***/ }),
/* 104 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /**
                                                                                                                                                                                                                                                                   * Copyright Schrodinger, LLC
                                                                                                                                                                                                                                                                   * All rights reserved.
                                                                                                                                                                                                                                                                   *
                                                                                                                                                                                                                                                                   * This source code is licensed under the BSD-style license found in the
                                                                                                                                                                                                                                                                   * LICENSE file in the root directory of this source tree. An additional grant
                                                                                                                                                                                                                                                                   * of patent rights can be found in the PATENTS file in the same directory.
                                                                                                                                                                                                                                                                   *
                                                                                                                                                                                                                                                                   * @providesModule FixedDataTable
                                                                                                                                                                                                                                                                   * @typechecks
                                                                                                                                                                                                                                                                   * @noflow
                                                                                                                                                                                                                                                                   */

/*eslint no-bitwise:1*/

var _FixedDataTableBufferedRows = __webpack_require__(105);

var _FixedDataTableBufferedRows2 = _interopRequireDefault(_FixedDataTableBufferedRows);

var _FixedDataTableColumnResizeHandle = __webpack_require__(203);

var _FixedDataTableColumnResizeHandle2 = _interopRequireDefault(_FixedDataTableColumnResizeHandle);

var _FixedDataTableRow = __webpack_require__(68);

var _FixedDataTableRow2 = _interopRequireDefault(_FixedDataTableRow);

var _React = __webpack_require__(0);

var _React2 = _interopRequireDefault(_React);

var _createReactClass = __webpack_require__(8);

var _createReactClass2 = _interopRequireDefault(_createReactClass);

var _propTypes = __webpack_require__(2);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _ReactComponentWithPureRenderMixin = __webpack_require__(20);

var _ReactComponentWithPureRenderMixin2 = _interopRequireDefault(_ReactComponentWithPureRenderMixin);

var _ReactTouchHandler = __webpack_require__(204);

var _ReactTouchHandler2 = _interopRequireDefault(_ReactTouchHandler);

var _ReactWheelHandler = __webpack_require__(87);

var _ReactWheelHandler2 = _interopRequireDefault(_ReactWheelHandler);

var _Scrollbar = __webpack_require__(30);

var _Scrollbar2 = _interopRequireDefault(_Scrollbar);

var _columnTemplates = __webpack_require__(212);

var _columnTemplates2 = _interopRequireDefault(_columnTemplates);

var _cx = __webpack_require__(4);

var _cx2 = _interopRequireDefault(_cx);

var _debounceCore = __webpack_require__(221);

var _debounceCore2 = _interopRequireDefault(_debounceCore);

var _joinClasses = __webpack_require__(10);

var _joinClasses2 = _interopRequireDefault(_joinClasses);

var _scrollbarsVisible2 = __webpack_require__(16);

var _scrollbarsVisible3 = _interopRequireDefault(_scrollbarsVisible2);

var _tableHeights = __webpack_require__(90);

var _tableHeights2 = _interopRequireDefault(_tableHeights);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Data grid component with fixed or scrollable header and columns.
 *
 * The layout of the data table is as follows:
 *
 * ```
 * +---------------------------------------------------+
 * | Fixed Column Group    | Scrollable Column Group   |
 * | Header                | Header                    |
 * |                       |                           |
 * +---------------------------------------------------+
 * |                       |                           |
 * | Fixed Header Columns  | Scrollable Header Columns |
 * |                       |                           |
 * +-----------------------+---------------------------+
 * |                       |                           |
 * | Fixed Body Columns    | Scrollable Body Columns   |
 * |                       |                           |
 * +-----------------------+---------------------------+
 * |                       |                           |
 * | Fixed Footer Columns  | Scrollable Footer Columns |
 * |                       |                           |
 * +-----------------------+---------------------------+
 * ```
 *
 * - Fixed Column Group Header: These are the headers for a group
 *   of columns if included in the table that do not scroll
 *   vertically or horizontally.
 *
 * - Scrollable Column Group Header: The header for a group of columns
 *   that do not move while scrolling vertically, but move horizontally
 *   with the horizontal scrolling.
 *
 * - Fixed Header Columns: The header columns that do not move while scrolling
 *   vertically or horizontally.
 *
 * - Scrollable Header Columns: The header columns that do not move
 *   while scrolling vertically, but move horizontally with the horizontal
 *   scrolling.
 *
 * - Fixed Body Columns: The body columns that do not move while scrolling
 *   horizontally, but move vertically with the vertical scrolling.
 *
 * - Scrollable Body Columns: The body columns that move while scrolling
 *   vertically or horizontally.
 */
var FixedDataTable = (0, _createReactClass2.default)({
  displayName: 'FixedDataTable',

  propTypes: {

    // TODO (jordan) Remove propType of width without losing documentation (moved to tableSize)
    /**
     * Pixel width of table. If all columns do not fit,
     * a horizontal scrollbar will appear.
     */
    width: _propTypes2.default.number.isRequired,

    // TODO (jordan) Remove propType of height without losing documentation (moved to tableSize)
    /**
     * Pixel height of table. If all rows do not fit,
     * a vertical scrollbar will appear.
     *
     * Either `height` or `maxHeight` must be specified.
     */
    height: _propTypes2.default.number,

    /**
     * Class name to be passed into parent container
     */
    className: _propTypes2.default.string,

    // TODO (jordan) Remove propType of maxHeight without losing documentation (moved to tableSize)
    /**
     * Maximum pixel height of table. If all rows do not fit,
     * a vertical scrollbar will appear.
     *
     * Either `height` or `maxHeight` must be specified.
     */
    maxHeight: _propTypes2.default.number,

    // TODO (jordan) Remove propType of ownerHeight without losing documentation (moved to tableSize)
    /**
     * Pixel height of table's owner, this is used in a managed scrolling
     * situation when you want to slide the table up from below the fold
     * without having to constantly update the height on every scroll tick.
     * Instead, vary this property on scroll. By using `ownerHeight`, we
     * over-render the table while making sure the footer and horizontal
     * scrollbar of the table are visible when the current space for the table
     * in view is smaller than the final, over-flowing height of table. It
     * allows us to avoid resizing and reflowing table when it is moving in the
     * view.
     *
     * This is used if `ownerHeight < height` (or `maxHeight`).
     */
    ownerHeight: _propTypes2.default.number,

    // TODO (jordan) Remove propType of overflowX & overflowY without losing documentation (moved to scrollFlags)
    overflowX: _propTypes2.default.oneOf(['hidden', 'auto']),
    overflowY: _propTypes2.default.oneOf(['hidden', 'auto']),

    /**
     * Boolean flag indicating of touch scrolling should be enabled
     * This feature is current in beta and may have bugs
     */
    touchScrollEnabled: _propTypes2.default.bool,

    // TODO (jordan) Remove propType of showScrollbarX & showScrollbarY without losing documentation (moved to scrollFlags)
    /**
     * Hide the scrollbar but still enable scroll functionality
     */
    showScrollbarX: _propTypes2.default.bool,
    showScrollbarY: _propTypes2.default.bool,

    /**
     * Callback when horizontally scrolling the grid.
     *
     * Return false to stop propagation.
     */
    onHorizontalScroll: _propTypes2.default.func,

    /**
     * Callback when vertically scrolling the grid.
     *
     * Return false to stop propagation.
     */
    onVerticalScroll: _propTypes2.default.func,

    // TODO (jordan) Remove propType of rowsCount without losing documentation (moved to rowSettings)
    /**
     * Number of rows in the table.
     */
    rowsCount: _propTypes2.default.number.isRequired,

    // TODO (jordan) Remove propType of rowHeight without losing documentation (moved to rowSettings)
    /**
     * Pixel height of rows unless `rowHeightGetter` is specified and returns
     * different value.
     */
    rowHeight: _propTypes2.default.number.isRequired,

    // TODO (jordan) Remove propType of rowHeightGetter without losing documentation (moved to rowSettings)
    /**
     * If specified, `rowHeightGetter(index)` is called for each row and the
     * returned value overrides `rowHeight` for particular row.
     */
    rowHeightGetter: _propTypes2.default.func,

    // TODO (jordan) Remove propType of subRowHeight without losing documentation (moved to rowSettings)
    /**
     * Pixel height of sub-row unless `subRowHeightGetter` is specified and returns
     * different value.  Defaults to 0 and no sub-row being displayed.
     */
    subRowHeight: _propTypes2.default.number,

    // TODO (jordan) Remove propType of subRowHeightGetter without losing documentation (moved to rowSettings)
    /**
     * If specified, `subRowHeightGetter(index)` is called for each row and the
     * returned value overrides `subRowHeight` for particular row.
     */
    subRowHeightGetter: _propTypes2.default.func,

    /**
     * The row expanded for table row.
     * This can either be a React element, or a function that generates
     * a React Element. By default, the React element passed in can expect to
     * receive the following props:
     *
     * ```
     * props: {
     *   rowIndex; number // (the row index)
     *   height: number // (supplied from subRowHeight or subRowHeightGetter)
     *   width: number // (supplied from the Table)
     * }
     * ```
     *
     * Because you are passing in your own React element, you can feel free to
     * pass in whatever props you may want or need.
     *
     * If you pass in a function, you will receive the same props object as the
     * first argument.
     */
    rowExpanded: _propTypes2.default.oneOfType([_propTypes2.default.element, _propTypes2.default.func]),

    /**
     * To get any additional CSS classes that should be added to a row,
     * `rowClassNameGetter(index)` is called.
     */
    rowClassNameGetter: _propTypes2.default.func,

    /**
     * If specified, `rowKeyGetter(index)` is called for each row and the
     * returned value overrides `key` for the particular row.
     */
    rowKeyGetter: _propTypes2.default.func,

    // TODO (jordan) Remove propType of groupHeaderHeight without losing documentation (moved to elementHeights)
    /**
     * Pixel height of the column group header.
     */
    groupHeaderHeight: _propTypes2.default.number,

    // TODO (jordan) Remove propType of headerHeight without losing documentation (moved to elementHeights)
    /**
     * Pixel height of header.
     */
    headerHeight: _propTypes2.default.number.isRequired,

    // TODO (jordan) Remove propType of footerHeight without losing documentation (moved to elementHeights)
    /**
     * Pixel height of footer.
     */
    footerHeight: _propTypes2.default.number,

    /**
     * Value of horizontal scroll.
     */
    scrollLeft: _propTypes2.default.number,

    // TODO (jordan) Remove propType of scrollToRow & scrollToColumn without losing documentation
    /**
     * Index of column to scroll to.
     */
    scrollToColumn: _propTypes2.default.number,

    /**
     * Value of vertical scroll.
     */
    scrollTop: _propTypes2.default.number,

    /**
     * Index of row to scroll to.
     */
    scrollToRow: _propTypes2.default.number,

    /**
     * Callback that is called when scrolling starts with current horizontal
     * and vertical scroll values.
     */
    onScrollStart: _propTypes2.default.func,

    /**
     * Callback that is called when scrolling ends or stops with new horizontal
     * and vertical scroll values.
     */
    onScrollEnd: _propTypes2.default.func,

    /**
     * If enabled scroll events will not be propagated outside of the table.
     */
    stopScrollPropagation: _propTypes2.default.bool,

    /**
     * Callback that is called when `rowHeightGetter` returns a different height
     * for a row than the `rowHeight` prop. This is necessary because initially
     * table estimates heights of some parts of the content.
     */
    onContentHeightChange: _propTypes2.default.func,

    /**
     * Callback that is called when a row is clicked.
     */
    onRowClick: _propTypes2.default.func,

    /**
     * Callback that is called when a row is double clicked.
     */
    onRowDoubleClick: _propTypes2.default.func,

    /**
     * Callback that is called when a mouse-down event happens on a row.
     */
    onRowMouseDown: _propTypes2.default.func,

    /**
     * Callback that is called when a mouse-enter event happens on a row.
     */
    onRowMouseEnter: _propTypes2.default.func,

    /**
     * Callback that is called when a mouse-leave event happens on a row.
     */
    onRowMouseLeave: _propTypes2.default.func,

    /**
     * Callback that is called when resizer has been released
     * and column needs to be updated.
     *
     * Required if the isResizable property is true on any column.
     *
     * ```
     * function(
     *   newColumnWidth: number,
     *   columnKey: string,
     * )
     * ```
     */
    onColumnResizeEndCallback: _propTypes2.default.func,

    /**
     * Callback that is called when reordering has been completed
     * and columns need to be updated.
     *
     * ```
     * function(
     *   event {
     *     columnBefore: string|undefined, // the column before the new location of this one
     *     columnAfter: string|undefined,  // the column after the new location of this one
     *     reorderColumn: string,          // the column key that was just reordered
     *   }
     * )
     * ```
     */
    onColumnReorderEndCallback: _propTypes2.default.func,

    /**
     * Whether a column is currently being resized.
     */
    isColumnResizing: _propTypes2.default.bool,

    /**
     * Whether columns are currently being reordered.
     */
    isColumnReordering: _propTypes2.default.bool,

    // TODO (jordan) Remove propType of bufferRowCount without losing documentation
    /**
     * The number of rows outside the viewport to prerender. Defaults to roughly
     * half of the number of visible rows.
     */
    bufferRowCount: _propTypes2.default.number
  },

  getDefaultProps: function getDefaultProps() /*object*/{
    return {
      elementHeights: {
        footerHeight: 0,
        groupHeaderHeight: 0,
        headerHeight: 0
      },
      touchScrollEnabled: false,
      stopScrollPropagation: false
    };
  },
  componentWillMount: function componentWillMount() {
    this._didScrollStop = (0, _debounceCore2.default)(this._didScrollStop, 200, this);

    this._wheelHandler = new _ReactWheelHandler2.default(this._onScroll, this._shouldHandleWheelX, this._shouldHandleWheelY, this.props.stopScrollPropagation);

    this._touchHandler = new _ReactTouchHandler2.default(this._onScroll, this._shouldHandleTouchX, this._shouldHandleTouchY, this.props.stopScrollPropagation);
  },
  componentWillUnmount: function componentWillUnmount() {
    this._wheelHandler = null;
    this._touchHandler = null;
  },
  _shouldHandleTouchX: function _shouldHandleTouchX( /*number*/delta) /*boolean*/{
    return this.props.touchScrollEnabled && this._shouldHandleWheelX(delta);
  },
  _shouldHandleTouchY: function _shouldHandleTouchY( /*number*/delta) /*boolean*/{
    return this.props.touchScrollEnabled && this._shouldHandleWheelY(delta);
  },
  _shouldHandleWheelX: function _shouldHandleWheelX( /*number*/delta) /*boolean*/{
    var _props = this.props,
        maxScrollX = _props.maxScrollX,
        scrollFlags = _props.scrollFlags,
        scrollX = _props.scrollX;
    var overflowX = scrollFlags.overflowX;


    if (overflowX === 'hidden') {
      return false;
    }

    delta = Math.round(delta);
    if (delta === 0) {
      return false;
    }

    return delta < 0 && scrollX > 0 || delta >= 0 && scrollX < maxScrollX;
  },
  _shouldHandleWheelY: function _shouldHandleWheelY( /*number*/delta) /*boolean*/{
    var _props2 = this.props,
        maxScrollY = _props2.maxScrollY,
        scrollFlags = _props2.scrollFlags,
        scrollY = _props2.scrollY;
    var overflowY = scrollFlags.overflowY;


    if (overflowY === 'hidden' || delta === 0) {
      return false;
    }

    delta = Math.round(delta);
    if (delta === 0) {
      return false;
    }

    return delta < 0 && scrollY > 0 || delta >= 0 && scrollY < maxScrollY;
  },
  _reportContentHeight: function _reportContentHeight() {
    var _tableHeightsSelector = (0, _tableHeights2.default)(this.props),
        contentHeight = _tableHeightsSelector.contentHeight;

    var onContentHeightChange = this.props.onContentHeightChange;


    if (contentHeight !== this._contentHeight && onContentHeightChange) {
      onContentHeightChange(contentHeight);
    }
    this._contentHeight = contentHeight;
  },
  componentDidMount: function componentDidMount() {
    this._reportContentHeight();
  },
  componentWillReceiveProps: function componentWillReceiveProps( /*object*/nextProps) {

    // In the case of controlled scrolling, notify.
    if (this.props.tableSize.ownerHeight !== nextProps.tableSize.ownerHeight || this.props.scrollTop !== nextProps.scrollTop || this.props.scrollLeft !== nextProps.scrollLeft) {
      this._didScrollStart();
    }
    this._didScrollStop();
  },
  componentDidUpdate: function componentDidUpdate() {
    this._reportContentHeight();
  },
  render: function render() /*object*/{
    var _columnTemplatesSelec = (0, _columnTemplates2.default)(this.props),
        fixedColumnGroups = _columnTemplatesSelec.fixedColumnGroups,
        fixedColumns = _columnTemplatesSelec.fixedColumns,
        scrollableColumnGroups = _columnTemplatesSelec.scrollableColumnGroups,
        scrollableColumns = _columnTemplatesSelec.scrollableColumns;

    var _tableHeightsSelector2 = (0, _tableHeights2.default)(this.props),
        bodyHeight = _tableHeightsSelector2.bodyHeight,
        bodyOffsetTop = _tableHeightsSelector2.bodyOffsetTop,
        componentHeight = _tableHeightsSelector2.componentHeight,
        footOffsetTop = _tableHeightsSelector2.footOffsetTop,
        scrollbarXOffsetTop = _tableHeightsSelector2.scrollbarXOffsetTop,
        visibleRowsHeight = _tableHeightsSelector2.visibleRowsHeight;

    var _props3 = this.props,
        className = _props3.className,
        columnReorderingData = _props3.columnReorderingData,
        columnResizingData = _props3.columnResizingData,
        elementHeights = _props3.elementHeights,
        isColumnReordering = _props3.isColumnReordering,
        isColumnResizing = _props3.isColumnResizing,
        maxScrollX = _props3.maxScrollX,
        maxScrollY = _props3.maxScrollY,
        onColumnReorderEndCallback = _props3.onColumnReorderEndCallback,
        onColumnResizeEndCallback = _props3.onColumnResizeEndCallback,
        scrollContentHeight = _props3.scrollContentHeight,
        scrollX = _props3.scrollX,
        scrollY = _props3.scrollY,
        tableSize = _props3.tableSize;
    var ownerHeight = tableSize.ownerHeight,
        width = tableSize.width;
    var footerHeight = elementHeights.footerHeight,
        groupHeaderHeight = elementHeights.groupHeaderHeight,
        headerHeight = elementHeights.headerHeight;

    var _scrollbarsVisible = (0, _scrollbarsVisible3.default)(this.props),
        scrollEnabledX = _scrollbarsVisible.scrollEnabledX,
        scrollEnabledY = _scrollbarsVisible.scrollEnabledY;

    var onColumnReorder = onColumnReorderEndCallback ? this._onColumnReorder : null;

    var groupHeader = void 0;
    if (groupHeaderHeight > 0) {
      groupHeader = _React2.default.createElement(_FixedDataTableRow2.default, {
        key: 'group_header',
        isScrolling: this._isScrolling,
        className: (0, _joinClasses2.default)((0, _cx2.default)('fixedDataTableLayout/header'), (0, _cx2.default)('public/fixedDataTable/header')),
        width: width,
        height: groupHeaderHeight,
        index: 0,
        zIndex: 1,
        offsetTop: 0,
        scrollLeft: scrollX,
        fixedColumns: fixedColumnGroups,
        scrollableColumns: scrollableColumnGroups,
        visible: true,
        onColumnResize: this._onColumnResize,
        onColumnReorder: onColumnReorder,
        onColumnReorderMove: this._onColumnReorderMove
      });
    }

    var scrollbarY = void 0;
    if (scrollEnabledY) {
      scrollbarY = _React2.default.createElement(_Scrollbar2.default, {
        size: visibleRowsHeight,
        contentSize: scrollContentHeight,
        onScroll: this._onVerticalScroll,
        verticalTop: bodyOffsetTop,
        position: scrollY
      });
    }

    var scrollbarX = void 0;
    if (scrollEnabledX) {
      scrollbarX = _React2.default.createElement(HorizontalScrollbar, {
        contentSize: width + maxScrollX,
        offset: scrollbarXOffsetTop,
        onScroll: this._onHorizontalScroll,
        position: scrollX,
        size: width
      });
    }

    var dragKnob = _React2.default.createElement(_FixedDataTableColumnResizeHandle2.default, {
      height: componentHeight,
      initialWidth: columnResizingData.width || 0,
      minWidth: columnResizingData.minWidth || 0,
      maxWidth: columnResizingData.maxWidth || Number.MAX_VALUE,
      visible: !!isColumnResizing,
      leftOffset: columnResizingData.left || 0,
      knobHeight: headerHeight,
      initialEvent: columnResizingData.initialEvent,
      onColumnResizeEnd: onColumnResizeEndCallback,
      columnKey: columnResizingData.key
    });

    var footer = null;
    if (footerHeight) {
      footer = _React2.default.createElement(_FixedDataTableRow2.default, {
        key: 'footer',
        isScrolling: this._isScrolling,
        className: (0, _joinClasses2.default)((0, _cx2.default)('fixedDataTableLayout/footer'), (0, _cx2.default)('public/fixedDataTable/footer')),
        width: width,
        height: footerHeight,
        index: -1,
        zIndex: 1,
        offsetTop: footOffsetTop,
        visible: true,
        fixedColumns: fixedColumns.footer,
        scrollableColumns: scrollableColumns.footer,
        scrollLeft: scrollX
      });
    }

    var rows = this._renderRows(bodyOffsetTop, fixedColumns.cell, scrollableColumns.cell, bodyHeight);

    var header = _React2.default.createElement(_FixedDataTableRow2.default, {
      key: 'header',
      isScrolling: this._isScrolling,
      className: (0, _joinClasses2.default)((0, _cx2.default)('fixedDataTableLayout/header'), (0, _cx2.default)('public/fixedDataTable/header')),
      width: width,
      height: headerHeight,
      index: -1,
      zIndex: 1,
      offsetTop: groupHeaderHeight,
      scrollLeft: scrollX,
      visible: true,
      fixedColumns: fixedColumns.header,
      scrollableColumns: scrollableColumns.header,
      onColumnResize: this._onColumnResize,
      onColumnReorder: onColumnReorder,
      onColumnReorderMove: this._onColumnReorderMove,
      onColumnReorderEnd: this._onColumnReorderEnd,
      isColumnReordering: !!isColumnReordering,
      columnReorderingData: columnReorderingData
    });

    var topShadow = void 0;
    if (scrollY) {
      topShadow = _React2.default.createElement('div', {
        className: (0, _joinClasses2.default)((0, _cx2.default)('fixedDataTableLayout/topShadow'), (0, _cx2.default)('public/fixedDataTable/topShadow')),
        style: { top: bodyOffsetTop }
      });
    }

    // ownerScrollAvailable is true if the rows rendered will overflow the owner element
    // so we show a shadow in that case even if the FDT component can't scroll anymore
    var ownerScrollAvailable = ownerHeight && ownerHeight < componentHeight && scrollContentHeight > visibleRowsHeight;
    var bottomShadow = void 0;
    if (ownerScrollAvailable || scrollY < maxScrollY) {
      bottomShadow = _React2.default.createElement('div', {
        className: (0, _joinClasses2.default)((0, _cx2.default)('fixedDataTableLayout/bottomShadow'), (0, _cx2.default)('public/fixedDataTable/bottomShadow')),
        style: { top: footOffsetTop }
      });
    }

    return _React2.default.createElement(
      'div',
      {
        className: (0, _joinClasses2.default)(className, (0, _cx2.default)('fixedDataTableLayout/main'), (0, _cx2.default)('public/fixedDataTable/main')),
        onWheel: this._wheelHandler.onWheel,
        onTouchStart: this._touchHandler.onTouchStart,
        onTouchEnd: this._touchHandler.onTouchEnd,
        onTouchMove: this._touchHandler.onTouchMove,
        onTouchCancel: this._touchHandler.onTouchCancel,
        style: {
          height: componentHeight,
          width: width
        } },
      _React2.default.createElement(
        'div',
        {
          className: (0, _cx2.default)('fixedDataTableLayout/rowsContainer'),
          style: {
            height: scrollbarXOffsetTop,
            width: width
          } },
        dragKnob,
        groupHeader,
        header,
        rows,
        footer,
        topShadow,
        bottomShadow
      ),
      scrollbarY,
      scrollbarX
    );
  },
  _renderRows: function _renderRows( /*number*/offsetTop, fixedCellTemplates, scrollableCellTemplates, bodyHeight) /*object*/{
    var props = this.props;
    return _React2.default.createElement(_FixedDataTableBufferedRows2.default, {
      isScrolling: this._isScrolling,
      fixedColumns: fixedCellTemplates,
      height: bodyHeight,
      offsetTop: offsetTop,
      onRowClick: props.onRowClick,
      onRowDoubleClick: props.onRowDoubleClick,
      onRowMouseDown: props.onRowMouseDown,
      onRowMouseEnter: props.onRowMouseEnter,
      onRowMouseLeave: props.onRowMouseLeave,
      rowClassNameGetter: props.rowClassNameGetter,
      rowExpanded: props.rowExpanded,
      rowKeyGetter: props.rowKeyGetter,
      rowSettings: props.rowSettings,
      scrollLeft: props.scrollX,
      scrollTop: props.scrollY,
      scrollableColumns: scrollableCellTemplates,
      showLastRowBorder: true,
      width: props.tableSize.width,
      rowsToRender: props.rows,
      rowHeights: props.rowHeights
    });
  },


  /**
   * This is called when a cell that is in the header of a column has its
   * resizer knob clicked on. It displays the resizer and puts in the correct
   * location on the table.
   */
  _onColumnResize: function _onColumnResize(
  /*number*/combinedWidth,
  /*number*/leftOffset,
  /*number*/cellWidth,
  /*?number*/cellMinWidth,
  /*?number*/cellMaxWidth,
  /*number|string*/columnKey,
  /*object*/event) {
    var clientX = event.clientX;
    var clientY = event.clientY;
    this.props.columnActions.resizeColumn({
      cellMinWidth: cellMinWidth,
      cellMaxWidth: cellMaxWidth,
      cellWidth: cellWidth,
      columnKey: columnKey,
      combinedWidth: combinedWidth,
      clientX: clientX,
      clientY: clientY,
      leftOffset: leftOffset
    });
  },
  _onColumnReorder: function _onColumnReorder( /*string*/columnKey, /*number*/width, /*number*/left, /*object*/event) {
    this.props.columnActions.startColumnReorder({
      scrollStart: this.props.scrollX,
      columnKey: columnKey,
      width: width,
      left: left
    });
  },
  _onColumnReorderMove: function _onColumnReorderMove( /*number*/deltaX) {
    this.props.columnActions.moveColumnReorder(deltaX);
  },
  _onColumnReorderEnd: function _onColumnReorderEnd( /*object*/props, /*object*/event) {
    var _props4 = this.props,
        columnActions = _props4.columnActions,
        _props4$columnReorder = _props4.columnReorderingData,
        cancelReorder = _props4$columnReorder.cancelReorder,
        columnAfter = _props4$columnReorder.columnAfter,
        columnBefore = _props4$columnReorder.columnBefore,
        columnKey = _props4$columnReorder.columnKey,
        scrollStart = _props4$columnReorder.scrollStart,
        onColumnReorderEndCallback = _props4.onColumnReorderEndCallback,
        onHorizontalScroll = _props4.onHorizontalScroll,
        scrollX = _props4.scrollX;


    columnActions.stopColumnReorder();
    if (cancelReorder) {
      return;
    }

    onColumnReorderEndCallback({
      columnAfter: columnAfter,
      columnBefore: columnBefore,
      reorderColumn: columnKey
    });

    if (scrollStart !== scrollX && onHorizontalScroll) {
      onHorizontalScroll(scrollX);
    };
  },
  _onScroll: function _onScroll( /*number*/deltaX, /*number*/deltaY) {
    var _props5 = this.props,
        maxScrollX = _props5.maxScrollX,
        maxScrollY = _props5.maxScrollY,
        onHorizontalScroll = _props5.onHorizontalScroll,
        onVerticalScroll = _props5.onVerticalScroll,
        scrollActions = _props5.scrollActions,
        scrollFlags = _props5.scrollFlags,
        scrollX = _props5.scrollX,
        scrollY = _props5.scrollY;
    var overflowX = scrollFlags.overflowX,
        overflowY = scrollFlags.overflowY;


    if (!this._isScrolling) {
      this._didScrollStart();
    }
    var x = scrollX;
    var y = scrollY;
    if (Math.abs(deltaY) > Math.abs(deltaX) && overflowY !== 'hidden') {
      y += deltaY;
      y = y < 0 ? 0 : y;
      y = y > maxScrollY ? maxScrollY : y;

      //NOTE (jordan) This is a hacky workaround to prevent FDT from setting its internal state
      if (onVerticalScroll ? onVerticalScroll(y) : true) {
        scrollActions.scrollToY(y);
      }
    } else if (deltaX && overflowX !== 'hidden') {
      x += deltaX;
      x = x < 0 ? 0 : x;
      x = x > maxScrollX ? maxScrollX : x;

      //NOTE (asif) This is a hacky workaround to prevent FDT from setting its internal state
      if (onHorizontalScroll ? onHorizontalScroll(x) : true) {
        scrollActions.scrollToX(x);
      }
    }

    this._didScrollStop();
  },
  _onHorizontalScroll: function _onHorizontalScroll( /*number*/scrollPos) {
    var _props6 = this.props,
        onHorizontalScroll = _props6.onHorizontalScroll,
        scrollActions = _props6.scrollActions,
        scrollX = _props6.scrollX;


    if (scrollPos === scrollX) {
      return;
    }

    if (!this._isScrolling) {
      this._didScrollStart();
    }

    if (onHorizontalScroll ? onHorizontalScroll(scrollPos) : true) {
      scrollActions.scrollToX(scrollPos);
    }
    this._didScrollStop();
  },
  _onVerticalScroll: function _onVerticalScroll( /*number*/scrollPos) {
    var _props7 = this.props,
        onVerticalScroll = _props7.onVerticalScroll,
        scrollActions = _props7.scrollActions,
        scrollY = _props7.scrollY;


    if (scrollPos === scrollY) {
      return;
    }

    if (!this._isScrolling) {
      this._didScrollStart();
    }

    if (onVerticalScroll ? onVerticalScroll(scrollPos) : true) {
      scrollActions.scrollToY(scrollPos);
    }

    this._didScrollStop();
  },
  _didScrollStart: function _didScrollStart() {
    var _props8 = this.props,
        firstRowIndex = _props8.firstRowIndex,
        onScrollStart = _props8.onScrollStart,
        scrollActions = _props8.scrollActions,
        scrollX = _props8.scrollX,
        scrollY = _props8.scrollY;


    if (this._isScrolling) {
      return;
    }

    this._isScrolling = true;
    scrollActions.startScroll();

    if (onScrollStart) {
      onScrollStart(scrollX, scrollY, firstRowIndex);
    }
  },
  _didScrollStop: function _didScrollStop() {
    var _props9 = this.props,
        firstRowIndex = _props9.firstRowIndex,
        onScrollEnd = _props9.onScrollEnd,
        scrollActions = _props9.scrollActions,
        scrollX = _props9.scrollX,
        scrollY = _props9.scrollY;


    if (!this._isScrolling) {
      return;
    }

    this._isScrolling = false;
    scrollActions.stopScroll();

    if (onScrollEnd) {
      onScrollEnd(scrollX, scrollY, firstRowIndex);
    }
  }
});

var HorizontalScrollbar = (0, _createReactClass2.default)({
  displayName: 'HorizontalScrollbar',
  mixins: [_ReactComponentWithPureRenderMixin2.default],

  propTypes: {
    contentSize: _propTypes2.default.number.isRequired,
    offset: _propTypes2.default.number.isRequired,
    onScroll: _propTypes2.default.func.isRequired,
    position: _propTypes2.default.number.isRequired,
    size: _propTypes2.default.number.isRequired
  },

  componentWillMount: function componentWillMount() {
    this._initialRender = true;
  },
  componentDidMount: function componentDidMount() {
    this._initialRender = false;
  },
  render: function render() /*object*/{
    var _props10 = this.props,
        offset = _props10.offset,
        size = _props10.size;


    var outerContainerStyle = {
      height: _Scrollbar2.default.SIZE,
      width: size
    };
    var innerContainerStyle = {
      height: _Scrollbar2.default.SIZE,
      overflow: 'hidden',
      width: size,
      top: offset
    };

    return _React2.default.createElement(
      'div',
      {
        className: (0, _joinClasses2.default)((0, _cx2.default)('public/fixedDataTable/horizontalScrollbar')),
        style: outerContainerStyle },
      _React2.default.createElement(
        'div',
        { style: innerContainerStyle },
        _React2.default.createElement(_Scrollbar2.default, _extends({}, this.props, {
          isOpaque: true,
          orientation: 'horizontal',
          offset: undefined
        }))
      )
    );
  }
});

module.exports = FixedDataTable;

/***/ }),
/* 105 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _FixedDataTableRow = __webpack_require__(68);

var _FixedDataTableRow2 = _interopRequireDefault(_FixedDataTableRow);

var _propTypes = __webpack_require__(2);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _React = __webpack_require__(0);

var _React2 = _interopRequireDefault(_React);

var _createReactClass = __webpack_require__(8);

var _createReactClass2 = _interopRequireDefault(_createReactClass);

var _cx = __webpack_require__(4);

var _cx2 = _interopRequireDefault(_cx);

var _emptyFunction = __webpack_require__(7);

var _emptyFunction2 = _interopRequireDefault(_emptyFunction);

var _joinClasses = __webpack_require__(10);

var _joinClasses2 = _interopRequireDefault(_joinClasses);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FixedDataTableBufferedRows = (0, _createReactClass2.default)({
  displayName: 'FixedDataTableBufferedRows',

  propTypes: {
    isScrolling: _propTypes2.default.bool,
    fixedColumns: _propTypes2.default.array.isRequired,
    height: _propTypes2.default.number.isRequired,
    offsetTop: _propTypes2.default.number.isRequired,
    onRowClick: _propTypes2.default.func,
    onRowDoubleClick: _propTypes2.default.func,
    onRowMouseDown: _propTypes2.default.func,
    onRowMouseEnter: _propTypes2.default.func,
    onRowMouseLeave: _propTypes2.default.func,
    rowClassNameGetter: _propTypes2.default.func,
    rowExpanded: _propTypes2.default.oneOfType([_propTypes2.default.element, _propTypes2.default.func]),
    rowHeights: _propTypes2.default.object.isRequired,
    rowKeyGetter: _propTypes2.default.func,
    rowSettings: _propTypes2.default.shape({
      rowHeightGetter: _propTypes2.default.func,
      rowsCount: _propTypes2.default.number.isRequired,
      subRowHeightGetter: _propTypes2.default.func
    }),
    rowsToRender: _propTypes2.default.array.isRequired,
    scrollLeft: _propTypes2.default.number.isRequired,
    scrollTop: _propTypes2.default.number.isRequired,
    scrollableColumns: _propTypes2.default.array.isRequired,
    showLastRowBorder: _propTypes2.default.bool,
    width: _propTypes2.default.number.isRequired
  },

  componentWillMount: function componentWillMount() {
    this._staticRowArray = [];
    this._initialRender = true;
  },
  componentDidMount: function componentDidMount() {
    this._initialRender = false;
  },
  shouldComponentUpdate: function shouldComponentUpdate() /*boolean*/{
    // Don't add PureRenderMixin to this component please.
    return true;
  },
  componentWillUnmount: function componentWillUnmount() {
    this._staticRowArray.length = 0;
  },
  render: function render() /*object*/{
    var props = this.props;
    var rowClassNameGetter = props.rowClassNameGetter || _emptyFunction2.default;
    var rowsToRender = this.props.rowsToRender || [];

    this._staticRowArray.length = rowsToRender.length;
    var baseOffsetTop = props.offsetTop - props.scrollTop;

    for (var i = 0; i < rowsToRender.length; ++i) {
      var rowIndex = rowsToRender[i];
      if (rowIndex === undefined) {
        this._staticRowArray[i] = _React2.default.createElement(_FixedDataTableRow2.default, {
          key: i,
          isScrolling: props.isScrolling,
          index: i,
          width: props.width,
          height: 0,
          offsetTop: 0,
          scrollLeft: Math.round(props.scrollLeft),
          visible: false,
          fixedColumns: props.fixedColumns,
          scrollableColumns: props.scrollableColumns
        });
        continue;
      }

      var currentRowHeight = this.props.rowSettings.rowHeightGetter(rowIndex);
      var currentSubRowHeight = this.props.rowSettings.subRowHeightGetter(rowIndex);
      var rowOffsetTop = baseOffsetTop + props.rowHeights[rowIndex];
      var rowKey = props.rowKeyGetter ? props.rowKeyGetter(rowIndex) : i;
      var hasBottomBorder = rowIndex === props.rowSettings.rowsCount - 1 && props.showLastRowBorder;

      this._staticRowArray[i] = _React2.default.createElement(_FixedDataTableRow2.default, {
        key: rowKey,
        isScrolling: props.isScrolling,
        index: rowIndex,
        width: props.width,
        height: currentRowHeight,
        subRowHeight: currentSubRowHeight,
        rowExpanded: props.rowExpanded,
        scrollLeft: Math.round(props.scrollLeft),
        offsetTop: Math.round(rowOffsetTop),
        visible: true,
        fixedColumns: props.fixedColumns,
        scrollableColumns: props.scrollableColumns,
        onClick: props.onRowClick,
        onDoubleClick: props.onRowDoubleClick,
        onMouseDown: props.onRowMouseDown,
        onMouseEnter: props.onRowMouseEnter,
        onMouseLeave: props.onRowMouseLeave,
        className: (0, _joinClasses2.default)(rowClassNameGetter(rowIndex), (0, _cx2.default)('public/fixedDataTable/bodyRow'), (0, _cx2.default)({
          'fixedDataTableLayout/hasBottomBorder': hasBottomBorder,
          'public/fixedDataTable/hasBottomBorder': hasBottomBorder
        }))
      });
    }

    return _React2.default.createElement(
      'div',
      null,
      this._staticRowArray
    );
  }
}); /**
     * Copyright Schrodinger, LLC
     * All rights reserved.
     *
     * This source code is licensed under the BSD-style license found in the
     * LICENSE file in the root directory of this source tree. An additional grant
     * of patent rights can be found in the PATENTS file in the same directory.
     *
     * @providesModule FixedDataTableBufferedRows
     * @typechecks
     */

module.exports = FixedDataTableBufferedRows;

/***/ }),
/* 106 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright Schrodinger, LLC
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule FixedDataTableCellGroup
 * @typechecks
 */



var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _FixedDataTableCell = __webpack_require__(107);

var _FixedDataTableCell2 = _interopRequireDefault(_FixedDataTableCell);

var _FixedDataTableHelper = __webpack_require__(71);

var _FixedDataTableHelper2 = _interopRequireDefault(_FixedDataTableHelper);

var _FixedDataTableTranslateDOMPosition = __webpack_require__(50);

var _FixedDataTableTranslateDOMPosition2 = _interopRequireDefault(_FixedDataTableTranslateDOMPosition);

var _propTypes = __webpack_require__(2);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _React = __webpack_require__(0);

var _React2 = _interopRequireDefault(_React);

var _createReactClass = __webpack_require__(8);

var _createReactClass2 = _interopRequireDefault(_createReactClass);

var _cx = __webpack_require__(4);

var _cx2 = _interopRequireDefault(_cx);

var _widthHelper = __webpack_require__(22);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var DIR_SIGN = _FixedDataTableHelper2.default.DIR_SIGN;

var FixedDataTableCellGroupImpl = (0, _createReactClass2.default)({
  displayName: 'FixedDataTableCellGroupImpl',

  /**
   * PropTypes are disabled in this component, because having them on slows
   * down the FixedDataTable hugely in DEV mode. You can enable them back for
   * development, but please don't commit this component with enabled propTypes.
   */
  propTypes_DISABLED_FOR_PERFORMANCE: {

    /**
     * Array of per column configuration properties.
     */
    columns: _propTypes2.default.array.isRequired,

    isScrolling: _propTypes2.default.bool,

    left: _propTypes2.default.number,

    onColumnResize: _propTypes2.default.func,

    onColumnReorder: _propTypes2.default.func,
    onColumnReorderMove: _propTypes2.default.func,
    onColumnReorderEnd: _propTypes2.default.func,

    rowHeight: _propTypes2.default.number.isRequired,

    rowIndex: _propTypes2.default.number.isRequired,

    width: _propTypes2.default.number.isRequired,

    zIndex: _propTypes2.default.number.isRequired
  },

  componentWillMount: function componentWillMount() {
    this._initialRender = true;
  },
  componentDidMount: function componentDidMount() {
    this._initialRender = false;
  },
  render: function render() /*object*/{
    var props = this.props;
    var columns = props.columns;
    var cells = new Array(columns.length);
    var contentWidth = (0, _widthHelper.sumPropWidths)(columns);

    var isColumnReordering = props.isColumnReordering && columns.reduce(function (acc, column) {
      return acc || props.columnReorderingData.columnKey === column.props.columnKey;
    }, false);

    var currentPosition = 0;
    for (var i = 0, j = columns.length; i < j; i++) {
      var columnProps = columns[i].props;
      var cellTemplate = columns[i].template;
      var recyclable = columnProps.allowCellsRecycling && !isColumnReordering;
      if (!recyclable || currentPosition - props.left <= props.width && currentPosition - props.left + columnProps.width >= 0) {
        var key = columnProps.columnKey || 'cell_' + i;
        cells[i] = this._renderCell(props.rowIndex, props.rowHeight, columnProps, cellTemplate, currentPosition, key, contentWidth, isColumnReordering);
      }
      currentPosition += columnProps.width;
    }
    var style = {
      height: props.height,
      position: 'absolute',
      width: contentWidth,
      zIndex: props.zIndex
    };
    (0, _FixedDataTableTranslateDOMPosition2.default)(style, -1 * DIR_SIGN * props.left, 0, this._initialRender);

    return _React2.default.createElement(
      'div',
      {
        className: (0, _cx2.default)('fixedDataTableCellGroupLayout/cellGroup'),
        style: style },
      cells
    );
  },
  _renderCell: function _renderCell(
  /*number*/rowIndex,
  /*number*/height,
  /*object*/columnProps,
  /*object*/cellTemplate,
  /*number*/left,
  /*string*/key,
  /*number*/columnGroupWidth,
  /*boolean*/isColumnReordering) /*object*/{

    var cellIsResizable = columnProps.isResizable && this.props.onColumnResize;
    var onColumnResize = cellIsResizable ? this.props.onColumnResize : null;

    var cellIsReorderable = columnProps.isReorderable && this.props.onColumnReorder && rowIndex === -1 && columnGroupWidth !== columnProps.width;
    var onColumnReorder = cellIsReorderable ? this.props.onColumnReorder : null;

    var className = columnProps.cellClassName;
    var pureRendering = columnProps.pureRendering || false;

    return _React2.default.createElement(_FixedDataTableCell2.default, {
      isScrolling: this.props.isScrolling,
      align: columnProps.align,
      className: className,
      height: height,
      key: key,
      maxWidth: columnProps.maxWidth,
      minWidth: columnProps.minWidth,
      onColumnResize: onColumnResize,
      onColumnReorder: onColumnReorder,
      onColumnReorderMove: this.props.onColumnReorderMove,
      onColumnReorderEnd: this.props.onColumnReorderEnd,
      isColumnReordering: isColumnReordering,
      columnReorderingData: this.props.columnReorderingData,
      rowIndex: rowIndex,
      columnKey: columnProps.columnKey,
      width: columnProps.width,
      left: left,
      cell: cellTemplate,
      columnGroupWidth: columnGroupWidth,
      pureRendering: pureRendering
    });
  }
});

var FixedDataTableCellGroup = (0, _createReactClass2.default)({
  displayName: 'FixedDataTableCellGroup',

  /**
   * PropTypes are disabled in this component, because having them on slows
   * down the FixedDataTable hugely in DEV mode. You can enable them back for
   * development, but please don't commit this component with enabled propTypes.
   */
  propTypes_DISABLED_FOR_PERFORMANCE: {
    isScrolling: _propTypes2.default.bool,
    /**
     * Height of the row.
     */
    height: _propTypes2.default.number.isRequired,

    offsetLeft: _propTypes2.default.number,

    left: _propTypes2.default.number,
    /**
     * Z-index on which the row will be displayed. Used e.g. for keeping
     * header and footer in front of other rows.
     */
    zIndex: _propTypes2.default.number.isRequired
  },

  shouldComponentUpdate: function shouldComponentUpdate( /*object*/nextProps) /*boolean*/{
    return !nextProps.isScrolling || this.props.rowIndex !== nextProps.rowIndex || this.props.left !== nextProps.left;
  },
  getDefaultProps: function getDefaultProps() /*object*/{
    return {
      offsetLeft: 0
    };
  },
  render: function render() /*object*/{
    var _props = this.props,
        offsetLeft = _props.offsetLeft,
        props = _objectWithoutProperties(_props, ['offsetLeft']);

    var style = {
      height: props.height,
      width: props.width
    };

    if (DIR_SIGN === 1) {
      style.left = offsetLeft;
    } else {
      style.right = offsetLeft;
    }

    var onColumnResize = props.onColumnResize ? this._onColumnResize : null;

    return _React2.default.createElement(
      'div',
      {
        style: style,
        className: (0, _cx2.default)('fixedDataTableCellGroupLayout/cellGroupWrapper') },
      _React2.default.createElement(FixedDataTableCellGroupImpl, _extends({}, props, {
        onColumnResize: onColumnResize
      }))
    );
  },
  _onColumnResize: function _onColumnResize(
  /*number*/left,
  /*number*/width,
  /*?number*/minWidth,
  /*?number*/maxWidth,
  /*string|number*/columnKey,
  /*object*/event) {
    this.props.onColumnResize && this.props.onColumnResize(this.props.offsetLeft, left - this.props.left + width, width, minWidth, maxWidth, columnKey, event);
  }
});

module.exports = FixedDataTableCellGroup;

/***/ }),
/* 107 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _FixedDataTableCellDefault = __webpack_require__(69);

var _FixedDataTableCellDefault2 = _interopRequireDefault(_FixedDataTableCellDefault);

var _FixedDataTableColumnReorderHandle = __webpack_require__(111);

var _FixedDataTableColumnReorderHandle2 = _interopRequireDefault(_FixedDataTableColumnReorderHandle);

var _FixedDataTableHelper = __webpack_require__(71);

var _FixedDataTableHelper2 = _interopRequireDefault(_FixedDataTableHelper);

var _React = __webpack_require__(0);

var _React2 = _interopRequireDefault(_React);

var _createReactClass = __webpack_require__(8);

var _createReactClass2 = _interopRequireDefault(_createReactClass);

var _propTypes = __webpack_require__(2);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _cx = __webpack_require__(4);

var _cx2 = _interopRequireDefault(_cx);

var _joinClasses = __webpack_require__(10);

var _joinClasses2 = _interopRequireDefault(_joinClasses);

var _shallowEqual = __webpack_require__(49);

var _shallowEqual2 = _interopRequireDefault(_shallowEqual);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; } /**
                                                                                                                                                                                                                              * Copyright Schrodinger, LLC
                                                                                                                                                                                                                              * All rights reserved.
                                                                                                                                                                                                                              *
                                                                                                                                                                                                                              * This source code is licensed under the BSD-style license found in the
                                                                                                                                                                                                                              * LICENSE file in the root directory of this source tree. An additional grant
                                                                                                                                                                                                                              * of patent rights can be found in the PATENTS file in the same directory.
                                                                                                                                                                                                                              *
                                                                                                                                                                                                                              * @providesModule FixedDataTableCell
                                                                                                                                                                                                                              * @typechecks
                                                                                                                                                                                                                              */

var DIR_SIGN = _FixedDataTableHelper2.default.DIR_SIGN;

var DEFAULT_PROPS = {
  align: 'left',
  highlighted: false
};

var FixedDataTableCell = (0, _createReactClass2.default)({
  displayName: 'FixedDataTableCell',

  /**
   * PropTypes are disabled in this component, because having them on slows
   * down the FixedDataTable hugely in DEV mode. You can enable them back for
   * development, but please don't commit this component with enabled propTypes.
   */
  propTypes_DISABLED_FOR_PERFORMANCE: {
    isScrolling: _propTypes2.default.bool,
    align: _propTypes2.default.oneOf(['left', 'center', 'right']),
    className: _propTypes2.default.string,
    highlighted: _propTypes2.default.bool,
    width: _propTypes2.default.number.isRequired,
    minWidth: _propTypes2.default.number,
    maxWidth: _propTypes2.default.number,
    height: _propTypes2.default.number.isRequired,

    cell: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.element, _propTypes2.default.func]),

    columnKey: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]),

    /**
     * The row index that will be passed to `cellRenderer` to render.
     */
    rowIndex: _propTypes2.default.number.isRequired,

    /**
     * Callback for when resizer knob (in FixedDataTableCell) is clicked
     * to initialize resizing. Please note this is only on the cells
     * in the header.
     * @param number combinedWidth
     * @param number left
     * @param number width
     * @param number minWidth
     * @param number maxWidth
     * @param number|string columnKey
     * @param object event
     */
    onColumnResize: _propTypes2.default.func,
    onColumnReorder: _propTypes2.default.func,

    /**
     * The left offset in pixels of the cell.
     */
    left: _propTypes2.default.number,

    /**
     * Flag for enhanced performance check
     */
    pureRendering: _propTypes2.default.bool
  },

  getInitialState: function getInitialState() {
    return {
      isReorderingThisColumn: false,
      displacement: 0,
      reorderingDisplacement: 0
    };
  },
  shouldComponentUpdate: function shouldComponentUpdate(nextProps) {
    if (nextProps.isScrolling && this.props.rowIndex === nextProps.rowIndex) {
      return false;
    }

    //Performance check not enabled
    if (!nextProps.pureRendering) {
      return true;
    }

    var _props = this.props,
        oldCell = _props.cell,
        oldIsScrolling = _props.isScrolling,
        oldProps = _objectWithoutProperties(_props, ['cell', 'isScrolling']);

    var newCell = nextProps.cell,
        newIsScrolling = nextProps.isScrolling,
        newProps = _objectWithoutProperties(nextProps, ['cell', 'isScrolling']);

    if (!(0, _shallowEqual2.default)(oldProps, newProps)) {
      return true;
    }

    if (!oldCell || !newCell || oldCell.type !== newCell.type) {
      return true;
    }

    if (!(0, _shallowEqual2.default)(oldCell.props, newCell.props)) {
      return true;
    }

    return false;
  },
  componentWillReceiveProps: function componentWillReceiveProps(props) {
    var left = props.left + this.state.displacement;

    var newState = {
      isReorderingThisColumn: false
    };

    if (props.isColumnReordering) {
      var originalLeft = props.columnReorderingData.originalLeft;
      var reorderCellLeft = originalLeft + props.columnReorderingData.dragDistance;
      var farthestPossiblePoint = props.columnGroupWidth - props.columnReorderingData.columnWidth;

      // ensure the cell isn't being dragged out of the column group
      reorderCellLeft = Math.max(reorderCellLeft, 0);
      reorderCellLeft = Math.min(reorderCellLeft, farthestPossiblePoint);

      if (props.columnKey === props.columnReorderingData.columnKey) {
        newState.displacement = reorderCellLeft - props.left;
        newState.isReorderingThisColumn = true;
      } else {
        var reorderCellRight = reorderCellLeft + props.columnReorderingData.columnWidth;
        var reorderCellCenter = reorderCellLeft + props.columnReorderingData.columnWidth / 2;
        var centerOfThisColumn = left + props.width / 2;

        var cellIsBeforeOneBeingDragged = reorderCellCenter > centerOfThisColumn;
        var cellWasOriginallyBeforeOneBeingDragged = originalLeft > props.left;
        var changedPosition = false;

        var dragPoint, thisCellPoint;
        if (cellIsBeforeOneBeingDragged) {
          if (reorderCellLeft < centerOfThisColumn) {
            changedPosition = true;
            if (cellWasOriginallyBeforeOneBeingDragged) {
              newState.displacement = props.columnReorderingData.columnWidth;
            } else {
              newState.displacement = 0;
            }
          }
        } else {
          if (reorderCellRight > centerOfThisColumn) {
            changedPosition = true;
            if (cellWasOriginallyBeforeOneBeingDragged) {
              newState.displacement = 0;
            } else {
              newState.displacement = props.columnReorderingData.columnWidth * -1;
            }
          }
        }

        if (changedPosition) {
          if (cellIsBeforeOneBeingDragged) {
            if (!props.columnReorderingData.columnAfter) {
              props.columnReorderingData.columnAfter = props.columnKey;
            }
          } else {
            props.columnReorderingData.columnBefore = props.columnKey;
          }
        } else if (cellIsBeforeOneBeingDragged) {
          props.columnReorderingData.columnBefore = props.columnKey;
        } else if (!props.columnReorderingData.columnAfter) {
          props.columnReorderingData.columnAfter = props.columnKey;
        }
      }
    } else {
      newState.displacement = 0;
    }

    this.setState(newState);
  },
  getDefaultProps: function getDefaultProps() /*object*/{
    return DEFAULT_PROPS;
  },
  render: function render() /*object*/{
    var _props2 = this.props,
        height = _props2.height,
        width = _props2.width,
        columnKey = _props2.columnKey,
        props = _objectWithoutProperties(_props2, ['height', 'width', 'columnKey']);

    var style = {
      height: height,
      width: width
    };

    if (DIR_SIGN === 1) {
      style.left = props.left;
    } else {
      style.right = props.left;
    }

    if (this.state.isReorderingThisColumn) {
      style.transform = 'translateX(' + this.state.displacement + 'px) translateZ(0)';
      style.zIndex = 1;
    }

    var className = (0, _joinClasses2.default)((0, _cx2.default)({
      'fixedDataTableCellLayout/main': true,
      'fixedDataTableCellLayout/lastChild': props.lastChild,
      'fixedDataTableCellLayout/alignRight': props.align === 'right',
      'fixedDataTableCellLayout/alignCenter': props.align === 'center',
      'public/fixedDataTableCell/alignRight': props.align === 'right',
      'public/fixedDataTableCell/highlighted': props.highlighted,
      'public/fixedDataTableCell/main': true,
      'public/fixedDataTableCell/hasReorderHandle': !!props.onColumnReorder,
      'public/fixedDataTableCell/reordering': this.state.isReorderingThisColumn
    }), props.className);

    var columnResizerComponent;
    if (props.onColumnResize) {
      var columnResizerStyle = {
        height: height
      };
      columnResizerComponent = _React2.default.createElement(
        'div',
        {
          className: (0, _cx2.default)('fixedDataTableCellLayout/columnResizerContainer'),
          style: columnResizerStyle,
          onMouseDown: this._onColumnResizerMouseDown },
        _React2.default.createElement('div', {
          className: (0, _joinClasses2.default)((0, _cx2.default)('fixedDataTableCellLayout/columnResizerKnob'), (0, _cx2.default)('public/fixedDataTableCell/columnResizerKnob')),
          style: columnResizerStyle
        })
      );
    }

    var columnReorderComponent;
    if (props.onColumnReorder) {
      //header row
      columnReorderComponent = _React2.default.createElement(_FixedDataTableColumnReorderHandle2.default, _extends({
        columnKey: this.columnKey,
        onMouseDown: this._onColumnReorderMouseDown,
        height: height
      }, this.props));
    }

    var cellProps = {
      columnKey: columnKey,
      height: height,
      width: width
    };

    if (props.rowIndex >= 0) {
      cellProps.rowIndex = props.rowIndex;
    }

    var content;
    if (_React2.default.isValidElement(props.cell)) {
      content = _React2.default.cloneElement(props.cell, cellProps);
    } else if (typeof props.cell === 'function') {
      content = props.cell(cellProps);
    } else {
      content = _React2.default.createElement(
        _FixedDataTableCellDefault2.default,
        cellProps,
        props.cell
      );
    }

    return _React2.default.createElement(
      'div',
      { className: className, style: style },
      columnResizerComponent,
      columnReorderComponent,
      content
    );
  },
  _onColumnResizerMouseDown: function _onColumnResizerMouseDown( /*object*/event) {
    this.props.onColumnResize(this.props.left, this.props.width, this.props.minWidth, this.props.maxWidth, this.props.columnKey, event);
  },
  _onColumnReorderMouseDown: function _onColumnReorderMouseDown( /*object*/event) {
    this.props.onColumnReorder(this.props.columnKey, this.props.width, this.props.left, event);
  }
});

module.exports = FixedDataTableCell;

/***/ }),
/* 108 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */



var emptyFunction = __webpack_require__(43);
var invariant = __webpack_require__(19);
var warning = __webpack_require__(44);

var ReactPropTypesSecret = __webpack_require__(45);
var checkPropTypes = __webpack_require__(109);

module.exports = function(isValidElement, throwOnDirectAccess) {
  /* global Symbol */
  var ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
  var FAUX_ITERATOR_SYMBOL = '@@iterator'; // Before Symbol spec.

  /**
   * Returns the iterator method function contained on the iterable object.
   *
   * Be sure to invoke the function with the iterable as context:
   *
   *     var iteratorFn = getIteratorFn(myIterable);
   *     if (iteratorFn) {
   *       var iterator = iteratorFn.call(myIterable);
   *       ...
   *     }
   *
   * @param {?object} maybeIterable
   * @return {?function}
   */
  function getIteratorFn(maybeIterable) {
    var iteratorFn = maybeIterable && (ITERATOR_SYMBOL && maybeIterable[ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL]);
    if (typeof iteratorFn === 'function') {
      return iteratorFn;
    }
  }

  /**
   * Collection of methods that allow declaration and validation of props that are
   * supplied to React components. Example usage:
   *
   *   var Props = require('ReactPropTypes');
   *   var MyArticle = React.createClass({
   *     propTypes: {
   *       // An optional string prop named "description".
   *       description: Props.string,
   *
   *       // A required enum prop named "category".
   *       category: Props.oneOf(['News','Photos']).isRequired,
   *
   *       // A prop named "dialog" that requires an instance of Dialog.
   *       dialog: Props.instanceOf(Dialog).isRequired
   *     },
   *     render: function() { ... }
   *   });
   *
   * A more formal specification of how these methods are used:
   *
   *   type := array|bool|func|object|number|string|oneOf([...])|instanceOf(...)
   *   decl := ReactPropTypes.{type}(.isRequired)?
   *
   * Each and every declaration produces a function with the same signature. This
   * allows the creation of custom validation functions. For example:
   *
   *  var MyLink = React.createClass({
   *    propTypes: {
   *      // An optional string or URI prop named "href".
   *      href: function(props, propName, componentName) {
   *        var propValue = props[propName];
   *        if (propValue != null && typeof propValue !== 'string' &&
   *            !(propValue instanceof URI)) {
   *          return new Error(
   *            'Expected a string or an URI for ' + propName + ' in ' +
   *            componentName
   *          );
   *        }
   *      }
   *    },
   *    render: function() {...}
   *  });
   *
   * @internal
   */

  var ANONYMOUS = '<<anonymous>>';

  // Important!
  // Keep this list in sync with production version in `./factoryWithThrowingShims.js`.
  var ReactPropTypes = {
    array: createPrimitiveTypeChecker('array'),
    bool: createPrimitiveTypeChecker('boolean'),
    func: createPrimitiveTypeChecker('function'),
    number: createPrimitiveTypeChecker('number'),
    object: createPrimitiveTypeChecker('object'),
    string: createPrimitiveTypeChecker('string'),
    symbol: createPrimitiveTypeChecker('symbol'),

    any: createAnyTypeChecker(),
    arrayOf: createArrayOfTypeChecker,
    element: createElementTypeChecker(),
    instanceOf: createInstanceTypeChecker,
    node: createNodeChecker(),
    objectOf: createObjectOfTypeChecker,
    oneOf: createEnumTypeChecker,
    oneOfType: createUnionTypeChecker,
    shape: createShapeTypeChecker
  };

  /**
   * inlined Object.is polyfill to avoid requiring consumers ship their own
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
   */
  /*eslint-disable no-self-compare*/
  function is(x, y) {
    // SameValue algorithm
    if (x === y) {
      // Steps 1-5, 7-10
      // Steps 6.b-6.e: +0 != -0
      return x !== 0 || 1 / x === 1 / y;
    } else {
      // Step 6.a: NaN == NaN
      return x !== x && y !== y;
    }
  }
  /*eslint-enable no-self-compare*/

  /**
   * We use an Error-like object for backward compatibility as people may call
   * PropTypes directly and inspect their output. However, we don't use real
   * Errors anymore. We don't inspect their stack anyway, and creating them
   * is prohibitively expensive if they are created too often, such as what
   * happens in oneOfType() for any type before the one that matched.
   */
  function PropTypeError(message) {
    this.message = message;
    this.stack = '';
  }
  // Make `instanceof Error` still work for returned errors.
  PropTypeError.prototype = Error.prototype;

  function createChainableTypeChecker(validate) {
    if (process.env.NODE_ENV !== 'production') {
      var manualPropTypeCallCache = {};
      var manualPropTypeWarningCount = 0;
    }
    function checkType(isRequired, props, propName, componentName, location, propFullName, secret) {
      componentName = componentName || ANONYMOUS;
      propFullName = propFullName || propName;

      if (secret !== ReactPropTypesSecret) {
        if (throwOnDirectAccess) {
          // New behavior only for users of `prop-types` package
          invariant(
            false,
            'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
            'Use `PropTypes.checkPropTypes()` to call them. ' +
            'Read more at http://fb.me/use-check-prop-types'
          );
        } else if (process.env.NODE_ENV !== 'production' && typeof console !== 'undefined') {
          // Old behavior for people using React.PropTypes
          var cacheKey = componentName + ':' + propName;
          if (
            !manualPropTypeCallCache[cacheKey] &&
            // Avoid spamming the console because they are often not actionable except for lib authors
            manualPropTypeWarningCount < 3
          ) {
            warning(
              false,
              'You are manually calling a React.PropTypes validation ' +
              'function for the `%s` prop on `%s`. This is deprecated ' +
              'and will throw in the standalone `prop-types` package. ' +
              'You may be seeing this warning due to a third-party PropTypes ' +
              'library. See https://fb.me/react-warning-dont-call-proptypes ' + 'for details.',
              propFullName,
              componentName
            );
            manualPropTypeCallCache[cacheKey] = true;
            manualPropTypeWarningCount++;
          }
        }
      }
      if (props[propName] == null) {
        if (isRequired) {
          if (props[propName] === null) {
            return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required ' + ('in `' + componentName + '`, but its value is `null`.'));
          }
          return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required in ' + ('`' + componentName + '`, but its value is `undefined`.'));
        }
        return null;
      } else {
        return validate(props, propName, componentName, location, propFullName);
      }
    }

    var chainedCheckType = checkType.bind(null, false);
    chainedCheckType.isRequired = checkType.bind(null, true);

    return chainedCheckType;
  }

  function createPrimitiveTypeChecker(expectedType) {
    function validate(props, propName, componentName, location, propFullName, secret) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== expectedType) {
        // `propValue` being instance of, say, date/regexp, pass the 'object'
        // check, but we can offer a more precise error message here rather than
        // 'of type `object`'.
        var preciseType = getPreciseType(propValue);

        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + preciseType + '` supplied to `' + componentName + '`, expected ') + ('`' + expectedType + '`.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createAnyTypeChecker() {
    return createChainableTypeChecker(emptyFunction.thatReturnsNull);
  }

  function createArrayOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside arrayOf.');
      }
      var propValue = props[propName];
      if (!Array.isArray(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an array.'));
      }
      for (var i = 0; i < propValue.length; i++) {
        var error = typeChecker(propValue, i, componentName, location, propFullName + '[' + i + ']', ReactPropTypesSecret);
        if (error instanceof Error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createElementTypeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      if (!isValidElement(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createInstanceTypeChecker(expectedClass) {
    function validate(props, propName, componentName, location, propFullName) {
      if (!(props[propName] instanceof expectedClass)) {
        var expectedClassName = expectedClass.name || ANONYMOUS;
        var actualClassName = getClassName(props[propName]);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + actualClassName + '` supplied to `' + componentName + '`, expected ') + ('instance of `' + expectedClassName + '`.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createEnumTypeChecker(expectedValues) {
    if (!Array.isArray(expectedValues)) {
      process.env.NODE_ENV !== 'production' ? warning(false, 'Invalid argument supplied to oneOf, expected an instance of array.') : void 0;
      return emptyFunction.thatReturnsNull;
    }

    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      for (var i = 0; i < expectedValues.length; i++) {
        if (is(propValue, expectedValues[i])) {
          return null;
        }
      }

      var valuesString = JSON.stringify(expectedValues);
      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of value `' + propValue + '` ' + ('supplied to `' + componentName + '`, expected one of ' + valuesString + '.'));
    }
    return createChainableTypeChecker(validate);
  }

  function createObjectOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside objectOf.');
      }
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an object.'));
      }
      for (var key in propValue) {
        if (propValue.hasOwnProperty(key)) {
          var error = typeChecker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
          if (error instanceof Error) {
            return error;
          }
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createUnionTypeChecker(arrayOfTypeCheckers) {
    if (!Array.isArray(arrayOfTypeCheckers)) {
      process.env.NODE_ENV !== 'production' ? warning(false, 'Invalid argument supplied to oneOfType, expected an instance of array.') : void 0;
      return emptyFunction.thatReturnsNull;
    }

    for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
      var checker = arrayOfTypeCheckers[i];
      if (typeof checker !== 'function') {
        warning(
          false,
          'Invalid argument supplid to oneOfType. Expected an array of check functions, but ' +
          'received %s at index %s.',
          getPostfixForTypeWarning(checker),
          i
        );
        return emptyFunction.thatReturnsNull;
      }
    }

    function validate(props, propName, componentName, location, propFullName) {
      for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
        var checker = arrayOfTypeCheckers[i];
        if (checker(props, propName, componentName, location, propFullName, ReactPropTypesSecret) == null) {
          return null;
        }
      }

      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`.'));
    }
    return createChainableTypeChecker(validate);
  }

  function createNodeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      if (!isNode(props[propName])) {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`, expected a ReactNode.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createShapeTypeChecker(shapeTypes) {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
      }
      for (var key in shapeTypes) {
        var checker = shapeTypes[key];
        if (!checker) {
          continue;
        }
        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
        if (error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function isNode(propValue) {
    switch (typeof propValue) {
      case 'number':
      case 'string':
      case 'undefined':
        return true;
      case 'boolean':
        return !propValue;
      case 'object':
        if (Array.isArray(propValue)) {
          return propValue.every(isNode);
        }
        if (propValue === null || isValidElement(propValue)) {
          return true;
        }

        var iteratorFn = getIteratorFn(propValue);
        if (iteratorFn) {
          var iterator = iteratorFn.call(propValue);
          var step;
          if (iteratorFn !== propValue.entries) {
            while (!(step = iterator.next()).done) {
              if (!isNode(step.value)) {
                return false;
              }
            }
          } else {
            // Iterator will provide entry [k,v] tuples rather than values.
            while (!(step = iterator.next()).done) {
              var entry = step.value;
              if (entry) {
                if (!isNode(entry[1])) {
                  return false;
                }
              }
            }
          }
        } else {
          return false;
        }

        return true;
      default:
        return false;
    }
  }

  function isSymbol(propType, propValue) {
    // Native Symbol.
    if (propType === 'symbol') {
      return true;
    }

    // 19.4.3.5 Symbol.prototype[@@toStringTag] === 'Symbol'
    if (propValue['@@toStringTag'] === 'Symbol') {
      return true;
    }

    // Fallback for non-spec compliant Symbols which are polyfilled.
    if (typeof Symbol === 'function' && propValue instanceof Symbol) {
      return true;
    }

    return false;
  }

  // Equivalent of `typeof` but with special handling for array and regexp.
  function getPropType(propValue) {
    var propType = typeof propValue;
    if (Array.isArray(propValue)) {
      return 'array';
    }
    if (propValue instanceof RegExp) {
      // Old webkits (at least until Android 4.0) return 'function' rather than
      // 'object' for typeof a RegExp. We'll normalize this here so that /bla/
      // passes PropTypes.object.
      return 'object';
    }
    if (isSymbol(propType, propValue)) {
      return 'symbol';
    }
    return propType;
  }

  // This handles more types than `getPropType`. Only used for error messages.
  // See `createPrimitiveTypeChecker`.
  function getPreciseType(propValue) {
    if (typeof propValue === 'undefined' || propValue === null) {
      return '' + propValue;
    }
    var propType = getPropType(propValue);
    if (propType === 'object') {
      if (propValue instanceof Date) {
        return 'date';
      } else if (propValue instanceof RegExp) {
        return 'regexp';
      }
    }
    return propType;
  }

  // Returns a string that is postfixed to a warning about an invalid type.
  // For example, "undefined" or "of type array"
  function getPostfixForTypeWarning(value) {
    var type = getPreciseType(value);
    switch (type) {
      case 'array':
      case 'object':
        return 'an ' + type;
      case 'boolean':
      case 'date':
      case 'regexp':
        return 'a ' + type;
      default:
        return type;
    }
  }

  // Returns class name of the object, if any.
  function getClassName(propValue) {
    if (!propValue.constructor || !propValue.constructor.name) {
      return ANONYMOUS;
    }
    return propValue.constructor.name;
  }

  ReactPropTypes.checkPropTypes = checkPropTypes;
  ReactPropTypes.PropTypes = ReactPropTypes;

  return ReactPropTypes;
};

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ }),
/* 109 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */



if (process.env.NODE_ENV !== 'production') {
  var invariant = __webpack_require__(19);
  var warning = __webpack_require__(44);
  var ReactPropTypesSecret = __webpack_require__(45);
  var loggedTypeFailures = {};
}

/**
 * Assert that the values match with the type specs.
 * Error messages are memorized and will only be shown once.
 *
 * @param {object} typeSpecs Map of name to a ReactPropType
 * @param {object} values Runtime values that need to be type-checked
 * @param {string} location e.g. "prop", "context", "child context"
 * @param {string} componentName Name of the component for error messages.
 * @param {?Function} getStack Returns the component stack.
 * @private
 */
function checkPropTypes(typeSpecs, values, location, componentName, getStack) {
  if (process.env.NODE_ENV !== 'production') {
    for (var typeSpecName in typeSpecs) {
      if (typeSpecs.hasOwnProperty(typeSpecName)) {
        var error;
        // Prop type validation may throw. In case they do, we don't want to
        // fail the render phase where it didn't fail before. So we log it.
        // After these have been cleaned up, we'll let them throw.
        try {
          // This is intentionally an invariant that gets caught. It's the same
          // behavior as without this statement except with a better message.
          invariant(typeof typeSpecs[typeSpecName] === 'function', '%s: %s type `%s` is invalid; it must be a function, usually from ' + 'React.PropTypes.', componentName || 'React class', location, typeSpecName);
          error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, ReactPropTypesSecret);
        } catch (ex) {
          error = ex;
        }
        warning(!error || error instanceof Error, '%s: type specification of %s `%s` is invalid; the type checker ' + 'function must return `null` or an `Error` but returned a %s. ' + 'You may have forgotten to pass an argument to the type checker ' + 'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' + 'shape all require an argument).', componentName || 'React class', location, typeSpecName, typeof error);
        if (error instanceof Error && !(error.message in loggedTypeFailures)) {
          // Only monitor this failure once because there tends to be a lot of the
          // same error.
          loggedTypeFailures[error.message] = true;

          var stack = getStack ? getStack() : '';

          warning(false, 'Failed %s type: %s%s', location, error.message, stack != null ? stack : '');
        }
      }
    }
  }
}

module.exports = checkPropTypes;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ }),
/* 110 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */



var emptyFunction = __webpack_require__(43);
var invariant = __webpack_require__(19);
var ReactPropTypesSecret = __webpack_require__(45);

module.exports = function() {
  function shim(props, propName, componentName, location, propFullName, secret) {
    if (secret === ReactPropTypesSecret) {
      // It is still safe when called from React.
      return;
    }
    invariant(
      false,
      'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
      'Use PropTypes.checkPropTypes() to call them. ' +
      'Read more at http://fb.me/use-check-prop-types'
    );
  };
  shim.isRequired = shim;
  function getShim() {
    return shim;
  };
  // Important!
  // Keep this list in sync with production version in `./factoryWithTypeCheckers.js`.
  var ReactPropTypes = {
    array: shim,
    bool: shim,
    func: shim,
    number: shim,
    object: shim,
    string: shim,
    symbol: shim,

    any: shim,
    arrayOf: getShim,
    element: shim,
    instanceOf: getShim,
    node: shim,
    objectOf: getShim,
    oneOf: getShim,
    oneOfType: getShim,
    shape: getShim
  };

  ReactPropTypes.checkPropTypes = emptyFunction;
  ReactPropTypes.PropTypes = ReactPropTypes;

  return ReactPropTypes;
};


/***/ }),
/* 111 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _DOMMouseMoveTracker = __webpack_require__(46);

var _DOMMouseMoveTracker2 = _interopRequireDefault(_DOMMouseMoveTracker);

var _Locale = __webpack_require__(48);

var _Locale2 = _interopRequireDefault(_Locale);

var _React = __webpack_require__(0);

var _React2 = _interopRequireDefault(_React);

var _createReactClass = __webpack_require__(8);

var _createReactClass2 = _interopRequireDefault(_createReactClass);

var _propTypes = __webpack_require__(2);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _ReactComponentWithPureRenderMixin = __webpack_require__(20);

var _ReactComponentWithPureRenderMixin2 = _interopRequireDefault(_ReactComponentWithPureRenderMixin);

var _clamp = __webpack_require__(21);

var _clamp2 = _interopRequireDefault(_clamp);

var _cx = __webpack_require__(4);

var _cx2 = _interopRequireDefault(_cx);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Copyright Schrodinger, LLC
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * This is to be used with the FixedDataTable. It is a header icon
 * that allows you to reorder the corresponding column.
 *
 * @providesModule FixedDataTableColumnReorderHandle
 * @typechecks
 */

var FixedDataTableColumnReorderHandle = (0, _createReactClass2.default)({
  displayName: 'FixedDataTableColumnReorderHandle',
  mixins: [_ReactComponentWithPureRenderMixin2.default],

  propTypes: {

    /**
     * When resizing is complete this is called.
     */
    onColumnReorderEnd: _propTypes2.default.func,

    /**
     * Column key for the column being reordered.
     */
    columnKey: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])
  },

  getInitialState: function getInitialState() /*object*/{
    return {
      dragDistance: 0
    };
  },
  componentWillReceiveProps: function componentWillReceiveProps( /*object*/newProps) {},
  componentWillUnmount: function componentWillUnmount() {
    if (this._mouseMoveTracker) {
      cancelAnimationFrame(this.frameId);
      this.frameId = null;
      this._mouseMoveTracker.releaseMouseMoves();
      this._mouseMoveTracker = null;
    }
  },
  render: function render() /*object*/{
    var style = {
      height: this.props.height
    };
    return _React2.default.createElement('div', {
      className: (0, _cx2.default)({
        'fixedDataTableCellLayout/columnReorderContainer': true,
        'fixedDataTableCellLayout/columnReorderContainer/active': false
      }),
      onMouseDown: this.onMouseDown,
      style: style });
  },
  onMouseDown: function onMouseDown(event) {
    var targetRect = event.target.getBoundingClientRect();

    var mouseLocationInElement = event.clientX - targetRect.left;
    var mouseLocationInRelationToColumnGroup = mouseLocationInElement + event.target.parentElement.offsetLeft;

    this._mouseMoveTracker = new _DOMMouseMoveTracker2.default(this._onMove, this._onColumnReorderEnd, document.body);
    this._mouseMoveTracker.captureMouseMoves(event);
    this.setState({
      dragDistance: 0
    });
    this.props.onMouseDown({
      columnKey: this.props.columnKey,
      mouseLocation: {
        dragDistance: 0,
        inElement: mouseLocationInElement,
        inColumnGroup: mouseLocationInRelationToColumnGroup
      }
    });

    this._distance = 0;
    this._animating = true;
    this.frameId = requestAnimationFrame(this._updateState);
  },
  _onMove: function _onMove( /*number*/deltaX) {
    this._distance = this.state.dragDistance + deltaX;
  },
  _onColumnReorderEnd: function _onColumnReorderEnd( /*boolean*/cancelReorder) {
    this._animating = false;
    cancelAnimationFrame(this.frameId);
    this.frameId = null;
    this._mouseMoveTracker.releaseMouseMoves();
    this.props.columnReorderingData.cancelReorder = cancelReorder;
    this.props.onColumnReorderEnd();
  },
  _updateState: function _updateState() {
    if (this._animating) {
      this.frameId = requestAnimationFrame(this._updateState);
    }
    this.setState({
      dragDistance: this._distance
    });
    this.props.onColumnReorderMove(this._distance);
  }
});

module.exports = FixedDataTableColumnReorderHandle;

/***/ }),
/* 112 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _emptyFunction = __webpack_require__(7);

var _emptyFunction2 = _interopRequireDefault(_emptyFunction);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Upstream version of event listener. Does not take into account specific
 * nature of platform.
 */
var EventListener = {
  /**
   * Listen to DOM events during the bubble phase.
   *
   * @param {DOMEventTarget} target DOM element to register listener on.
   * @param {string} eventType Event type, e.g. 'click' or 'mouseover'.
   * @param {function} callback Callback function.
   * @return {object} Object with a `remove` method.
   */
  listen: function listen(target, eventType, callback) {
    if (target.addEventListener) {
      target.addEventListener(eventType, callback, false);
      return {
        remove: function remove() {
          target.removeEventListener(eventType, callback, false);
        }
      };
    } else if (target.attachEvent) {
      target.attachEvent('on' + eventType, callback);
      return {
        remove: function remove() {
          target.detachEvent('on' + eventType, callback);
        }
      };
    }
  },

  /**
   * Listen to DOM events during the capture phase.
   *
   * @param {DOMEventTarget} target DOM element to register listener on.
   * @param {string} eventType Event type, e.g. 'click' or 'mouseover'.
   * @param {function} callback Callback function.
   * @return {object} Object with a `remove` method.
   */
  capture: function capture(target, eventType, callback) {
    if (target.addEventListener) {
      target.addEventListener(eventType, callback, true);
      return {
        remove: function remove() {
          target.removeEventListener(eventType, callback, true);
        }
      };
    } else {
      if (true) {
        console.error('Attempted to listen to events during the capture phase on a ' + 'browser that does not support the capture phase. Your application ' + 'will not receive some events.');
      }
      return {
        remove: _emptyFunction2.default
      };
    }
  },

  registerDefault: function registerDefault() {}
}; /**
    * Copyright Schrodinger, LLC
    * All rights reserved.
    *
    * This source code is licensed under the BSD-style license found in the
    * LICENSE file in the root directory of this source tree. An additional grant
    * of patent rights can be found in the PATENTS file in the same directory.
    *
    * @providesModule EventListener
    * @typechecks
    */

module.exports = EventListener;

/***/ }),
/* 113 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

/**
 * Copyright Schrodinger, LLC
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule cancelAnimationFramePolyfill
 */

/**
 * Here is the native and polyfill version of cancelAnimationFrame.
 * Please don't use it directly and use cancelAnimationFrame module instead.
 */
var cancelAnimationFrame = global.cancelAnimationFrame || global.webkitCancelAnimationFrame || global.mozCancelAnimationFrame || global.oCancelAnimationFrame || global.msCancelAnimationFrame || global.clearTimeout;

module.exports = cancelAnimationFrame;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6)))

/***/ }),
/* 114 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

/**
 * Copyright Schrodinger, LLC
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule nativeRequestAnimationFrame
 */

var nativeRequestAnimationFrame = global.requestAnimationFrame || global.webkitRequestAnimationFrame || global.mozRequestAnimationFrame || global.oRequestAnimationFrame || global.msRequestAnimationFrame;

module.exports = nativeRequestAnimationFrame;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6)))

/***/ }),
/* 115 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */



var _assign = __webpack_require__(116);

var emptyObject = __webpack_require__(117);
var _invariant = __webpack_require__(19);

if (process.env.NODE_ENV !== 'production') {
  var warning = __webpack_require__(44);
}

var MIXINS_KEY = 'mixins';

// Helper function to allow the creation of anonymous functions which do not
// have .name set to the name of the variable being assigned to.
function identity(fn) {
  return fn;
}

var ReactPropTypeLocationNames;
if (process.env.NODE_ENV !== 'production') {
  ReactPropTypeLocationNames = {
    prop: 'prop',
    context: 'context',
    childContext: 'child context'
  };
} else {
  ReactPropTypeLocationNames = {};
}

function factory(ReactComponent, isValidElement, ReactNoopUpdateQueue) {
  /**
   * Policies that describe methods in `ReactClassInterface`.
   */

  var injectedMixins = [];

  /**
   * Composite components are higher-level components that compose other composite
   * or host components.
   *
   * To create a new type of `ReactClass`, pass a specification of
   * your new class to `React.createClass`. The only requirement of your class
   * specification is that you implement a `render` method.
   *
   *   var MyComponent = React.createClass({
   *     render: function() {
   *       return <div>Hello World</div>;
   *     }
   *   });
   *
   * The class specification supports a specific protocol of methods that have
   * special meaning (e.g. `render`). See `ReactClassInterface` for
   * more the comprehensive protocol. Any other properties and methods in the
   * class specification will be available on the prototype.
   *
   * @interface ReactClassInterface
   * @internal
   */
  var ReactClassInterface = {
    /**
     * An array of Mixin objects to include when defining your component.
     *
     * @type {array}
     * @optional
     */
    mixins: 'DEFINE_MANY',

    /**
     * An object containing properties and methods that should be defined on
     * the component's constructor instead of its prototype (static methods).
     *
     * @type {object}
     * @optional
     */
    statics: 'DEFINE_MANY',

    /**
     * Definition of prop types for this component.
     *
     * @type {object}
     * @optional
     */
    propTypes: 'DEFINE_MANY',

    /**
     * Definition of context types for this component.
     *
     * @type {object}
     * @optional
     */
    contextTypes: 'DEFINE_MANY',

    /**
     * Definition of context types this component sets for its children.
     *
     * @type {object}
     * @optional
     */
    childContextTypes: 'DEFINE_MANY',

    // ==== Definition methods ====

    /**
     * Invoked when the component is mounted. Values in the mapping will be set on
     * `this.props` if that prop is not specified (i.e. using an `in` check).
     *
     * This method is invoked before `getInitialState` and therefore cannot rely
     * on `this.state` or use `this.setState`.
     *
     * @return {object}
     * @optional
     */
    getDefaultProps: 'DEFINE_MANY_MERGED',

    /**
     * Invoked once before the component is mounted. The return value will be used
     * as the initial value of `this.state`.
     *
     *   getInitialState: function() {
     *     return {
     *       isOn: false,
     *       fooBaz: new BazFoo()
     *     }
     *   }
     *
     * @return {object}
     * @optional
     */
    getInitialState: 'DEFINE_MANY_MERGED',

    /**
     * @return {object}
     * @optional
     */
    getChildContext: 'DEFINE_MANY_MERGED',

    /**
     * Uses props from `this.props` and state from `this.state` to render the
     * structure of the component.
     *
     * No guarantees are made about when or how often this method is invoked, so
     * it must not have side effects.
     *
     *   render: function() {
     *     var name = this.props.name;
     *     return <div>Hello, {name}!</div>;
     *   }
     *
     * @return {ReactComponent}
     * @required
     */
    render: 'DEFINE_ONCE',

    // ==== Delegate methods ====

    /**
     * Invoked when the component is initially created and about to be mounted.
     * This may have side effects, but any external subscriptions or data created
     * by this method must be cleaned up in `componentWillUnmount`.
     *
     * @optional
     */
    componentWillMount: 'DEFINE_MANY',

    /**
     * Invoked when the component has been mounted and has a DOM representation.
     * However, there is no guarantee that the DOM node is in the document.
     *
     * Use this as an opportunity to operate on the DOM when the component has
     * been mounted (initialized and rendered) for the first time.
     *
     * @param {DOMElement} rootNode DOM element representing the component.
     * @optional
     */
    componentDidMount: 'DEFINE_MANY',

    /**
     * Invoked before the component receives new props.
     *
     * Use this as an opportunity to react to a prop transition by updating the
     * state using `this.setState`. Current props are accessed via `this.props`.
     *
     *   componentWillReceiveProps: function(nextProps, nextContext) {
     *     this.setState({
     *       likesIncreasing: nextProps.likeCount > this.props.likeCount
     *     });
     *   }
     *
     * NOTE: There is no equivalent `componentWillReceiveState`. An incoming prop
     * transition may cause a state change, but the opposite is not true. If you
     * need it, you are probably looking for `componentWillUpdate`.
     *
     * @param {object} nextProps
     * @optional
     */
    componentWillReceiveProps: 'DEFINE_MANY',

    /**
     * Invoked while deciding if the component should be updated as a result of
     * receiving new props, state and/or context.
     *
     * Use this as an opportunity to `return false` when you're certain that the
     * transition to the new props/state/context will not require a component
     * update.
     *
     *   shouldComponentUpdate: function(nextProps, nextState, nextContext) {
     *     return !equal(nextProps, this.props) ||
     *       !equal(nextState, this.state) ||
     *       !equal(nextContext, this.context);
     *   }
     *
     * @param {object} nextProps
     * @param {?object} nextState
     * @param {?object} nextContext
     * @return {boolean} True if the component should update.
     * @optional
     */
    shouldComponentUpdate: 'DEFINE_ONCE',

    /**
     * Invoked when the component is about to update due to a transition from
     * `this.props`, `this.state` and `this.context` to `nextProps`, `nextState`
     * and `nextContext`.
     *
     * Use this as an opportunity to perform preparation before an update occurs.
     *
     * NOTE: You **cannot** use `this.setState()` in this method.
     *
     * @param {object} nextProps
     * @param {?object} nextState
     * @param {?object} nextContext
     * @param {ReactReconcileTransaction} transaction
     * @optional
     */
    componentWillUpdate: 'DEFINE_MANY',

    /**
     * Invoked when the component's DOM representation has been updated.
     *
     * Use this as an opportunity to operate on the DOM when the component has
     * been updated.
     *
     * @param {object} prevProps
     * @param {?object} prevState
     * @param {?object} prevContext
     * @param {DOMElement} rootNode DOM element representing the component.
     * @optional
     */
    componentDidUpdate: 'DEFINE_MANY',

    /**
     * Invoked when the component is about to be removed from its parent and have
     * its DOM representation destroyed.
     *
     * Use this as an opportunity to deallocate any external resources.
     *
     * NOTE: There is no `componentDidUnmount` since your component will have been
     * destroyed by that point.
     *
     * @optional
     */
    componentWillUnmount: 'DEFINE_MANY',

    // ==== Advanced methods ====

    /**
     * Updates the component's currently mounted DOM representation.
     *
     * By default, this implements React's rendering and reconciliation algorithm.
     * Sophisticated clients may wish to override this.
     *
     * @param {ReactReconcileTransaction} transaction
     * @internal
     * @overridable
     */
    updateComponent: 'OVERRIDE_BASE'
  };

  /**
   * Mapping from class specification keys to special processing functions.
   *
   * Although these are declared like instance properties in the specification
   * when defining classes using `React.createClass`, they are actually static
   * and are accessible on the constructor instead of the prototype. Despite
   * being static, they must be defined outside of the "statics" key under
   * which all other static methods are defined.
   */
  var RESERVED_SPEC_KEYS = {
    displayName: function(Constructor, displayName) {
      Constructor.displayName = displayName;
    },
    mixins: function(Constructor, mixins) {
      if (mixins) {
        for (var i = 0; i < mixins.length; i++) {
          mixSpecIntoComponent(Constructor, mixins[i]);
        }
      }
    },
    childContextTypes: function(Constructor, childContextTypes) {
      if (process.env.NODE_ENV !== 'production') {
        validateTypeDef(Constructor, childContextTypes, 'childContext');
      }
      Constructor.childContextTypes = _assign(
        {},
        Constructor.childContextTypes,
        childContextTypes
      );
    },
    contextTypes: function(Constructor, contextTypes) {
      if (process.env.NODE_ENV !== 'production') {
        validateTypeDef(Constructor, contextTypes, 'context');
      }
      Constructor.contextTypes = _assign(
        {},
        Constructor.contextTypes,
        contextTypes
      );
    },
    /**
     * Special case getDefaultProps which should move into statics but requires
     * automatic merging.
     */
    getDefaultProps: function(Constructor, getDefaultProps) {
      if (Constructor.getDefaultProps) {
        Constructor.getDefaultProps = createMergedResultFunction(
          Constructor.getDefaultProps,
          getDefaultProps
        );
      } else {
        Constructor.getDefaultProps = getDefaultProps;
      }
    },
    propTypes: function(Constructor, propTypes) {
      if (process.env.NODE_ENV !== 'production') {
        validateTypeDef(Constructor, propTypes, 'prop');
      }
      Constructor.propTypes = _assign({}, Constructor.propTypes, propTypes);
    },
    statics: function(Constructor, statics) {
      mixStaticSpecIntoComponent(Constructor, statics);
    },
    autobind: function() {}
  };

  function validateTypeDef(Constructor, typeDef, location) {
    for (var propName in typeDef) {
      if (typeDef.hasOwnProperty(propName)) {
        // use a warning instead of an _invariant so components
        // don't show up in prod but only in __DEV__
        if (process.env.NODE_ENV !== 'production') {
          warning(
            typeof typeDef[propName] === 'function',
            '%s: %s type `%s` is invalid; it must be a function, usually from ' +
              'React.PropTypes.',
            Constructor.displayName || 'ReactClass',
            ReactPropTypeLocationNames[location],
            propName
          );
        }
      }
    }
  }

  function validateMethodOverride(isAlreadyDefined, name) {
    var specPolicy = ReactClassInterface.hasOwnProperty(name)
      ? ReactClassInterface[name]
      : null;

    // Disallow overriding of base class methods unless explicitly allowed.
    if (ReactClassMixin.hasOwnProperty(name)) {
      _invariant(
        specPolicy === 'OVERRIDE_BASE',
        'ReactClassInterface: You are attempting to override ' +
          '`%s` from your class specification. Ensure that your method names ' +
          'do not overlap with React methods.',
        name
      );
    }

    // Disallow defining methods more than once unless explicitly allowed.
    if (isAlreadyDefined) {
      _invariant(
        specPolicy === 'DEFINE_MANY' || specPolicy === 'DEFINE_MANY_MERGED',
        'ReactClassInterface: You are attempting to define ' +
          '`%s` on your component more than once. This conflict may be due ' +
          'to a mixin.',
        name
      );
    }
  }

  /**
   * Mixin helper which handles policy validation and reserved
   * specification keys when building React classes.
   */
  function mixSpecIntoComponent(Constructor, spec) {
    if (!spec) {
      if (process.env.NODE_ENV !== 'production') {
        var typeofSpec = typeof spec;
        var isMixinValid = typeofSpec === 'object' && spec !== null;

        if (process.env.NODE_ENV !== 'production') {
          warning(
            isMixinValid,
            "%s: You're attempting to include a mixin that is either null " +
              'or not an object. Check the mixins included by the component, ' +
              'as well as any mixins they include themselves. ' +
              'Expected object but got %s.',
            Constructor.displayName || 'ReactClass',
            spec === null ? null : typeofSpec
          );
        }
      }

      return;
    }

    _invariant(
      typeof spec !== 'function',
      "ReactClass: You're attempting to " +
        'use a component class or function as a mixin. Instead, just use a ' +
        'regular object.'
    );
    _invariant(
      !isValidElement(spec),
      "ReactClass: You're attempting to " +
        'use a component as a mixin. Instead, just use a regular object.'
    );

    var proto = Constructor.prototype;
    var autoBindPairs = proto.__reactAutoBindPairs;

    // By handling mixins before any other properties, we ensure the same
    // chaining order is applied to methods with DEFINE_MANY policy, whether
    // mixins are listed before or after these methods in the spec.
    if (spec.hasOwnProperty(MIXINS_KEY)) {
      RESERVED_SPEC_KEYS.mixins(Constructor, spec.mixins);
    }

    for (var name in spec) {
      if (!spec.hasOwnProperty(name)) {
        continue;
      }

      if (name === MIXINS_KEY) {
        // We have already handled mixins in a special case above.
        continue;
      }

      var property = spec[name];
      var isAlreadyDefined = proto.hasOwnProperty(name);
      validateMethodOverride(isAlreadyDefined, name);

      if (RESERVED_SPEC_KEYS.hasOwnProperty(name)) {
        RESERVED_SPEC_KEYS[name](Constructor, property);
      } else {
        // Setup methods on prototype:
        // The following member methods should not be automatically bound:
        // 1. Expected ReactClass methods (in the "interface").
        // 2. Overridden methods (that were mixed in).
        var isReactClassMethod = ReactClassInterface.hasOwnProperty(name);
        var isFunction = typeof property === 'function';
        var shouldAutoBind =
          isFunction &&
          !isReactClassMethod &&
          !isAlreadyDefined &&
          spec.autobind !== false;

        if (shouldAutoBind) {
          autoBindPairs.push(name, property);
          proto[name] = property;
        } else {
          if (isAlreadyDefined) {
            var specPolicy = ReactClassInterface[name];

            // These cases should already be caught by validateMethodOverride.
            _invariant(
              isReactClassMethod &&
                (specPolicy === 'DEFINE_MANY_MERGED' ||
                  specPolicy === 'DEFINE_MANY'),
              'ReactClass: Unexpected spec policy %s for key %s ' +
                'when mixing in component specs.',
              specPolicy,
              name
            );

            // For methods which are defined more than once, call the existing
            // methods before calling the new property, merging if appropriate.
            if (specPolicy === 'DEFINE_MANY_MERGED') {
              proto[name] = createMergedResultFunction(proto[name], property);
            } else if (specPolicy === 'DEFINE_MANY') {
              proto[name] = createChainedFunction(proto[name], property);
            }
          } else {
            proto[name] = property;
            if (process.env.NODE_ENV !== 'production') {
              // Add verbose displayName to the function, which helps when looking
              // at profiling tools.
              if (typeof property === 'function' && spec.displayName) {
                proto[name].displayName = spec.displayName + '_' + name;
              }
            }
          }
        }
      }
    }
  }

  function mixStaticSpecIntoComponent(Constructor, statics) {
    if (!statics) {
      return;
    }
    for (var name in statics) {
      var property = statics[name];
      if (!statics.hasOwnProperty(name)) {
        continue;
      }

      var isReserved = name in RESERVED_SPEC_KEYS;
      _invariant(
        !isReserved,
        'ReactClass: You are attempting to define a reserved ' +
          'property, `%s`, that shouldn\'t be on the "statics" key. Define it ' +
          'as an instance property instead; it will still be accessible on the ' +
          'constructor.',
        name
      );

      var isInherited = name in Constructor;
      _invariant(
        !isInherited,
        'ReactClass: You are attempting to define ' +
          '`%s` on your component more than once. This conflict may be ' +
          'due to a mixin.',
        name
      );
      Constructor[name] = property;
    }
  }

  /**
   * Merge two objects, but throw if both contain the same key.
   *
   * @param {object} one The first object, which is mutated.
   * @param {object} two The second object
   * @return {object} one after it has been mutated to contain everything in two.
   */
  function mergeIntoWithNoDuplicateKeys(one, two) {
    _invariant(
      one && two && typeof one === 'object' && typeof two === 'object',
      'mergeIntoWithNoDuplicateKeys(): Cannot merge non-objects.'
    );

    for (var key in two) {
      if (two.hasOwnProperty(key)) {
        _invariant(
          one[key] === undefined,
          'mergeIntoWithNoDuplicateKeys(): ' +
            'Tried to merge two objects with the same key: `%s`. This conflict ' +
            'may be due to a mixin; in particular, this may be caused by two ' +
            'getInitialState() or getDefaultProps() methods returning objects ' +
            'with clashing keys.',
          key
        );
        one[key] = two[key];
      }
    }
    return one;
  }

  /**
   * Creates a function that invokes two functions and merges their return values.
   *
   * @param {function} one Function to invoke first.
   * @param {function} two Function to invoke second.
   * @return {function} Function that invokes the two argument functions.
   * @private
   */
  function createMergedResultFunction(one, two) {
    return function mergedResult() {
      var a = one.apply(this, arguments);
      var b = two.apply(this, arguments);
      if (a == null) {
        return b;
      } else if (b == null) {
        return a;
      }
      var c = {};
      mergeIntoWithNoDuplicateKeys(c, a);
      mergeIntoWithNoDuplicateKeys(c, b);
      return c;
    };
  }

  /**
   * Creates a function that invokes two functions and ignores their return vales.
   *
   * @param {function} one Function to invoke first.
   * @param {function} two Function to invoke second.
   * @return {function} Function that invokes the two argument functions.
   * @private
   */
  function createChainedFunction(one, two) {
    return function chainedFunction() {
      one.apply(this, arguments);
      two.apply(this, arguments);
    };
  }

  /**
   * Binds a method to the component.
   *
   * @param {object} component Component whose method is going to be bound.
   * @param {function} method Method to be bound.
   * @return {function} The bound method.
   */
  function bindAutoBindMethod(component, method) {
    var boundMethod = method.bind(component);
    if (process.env.NODE_ENV !== 'production') {
      boundMethod.__reactBoundContext = component;
      boundMethod.__reactBoundMethod = method;
      boundMethod.__reactBoundArguments = null;
      var componentName = component.constructor.displayName;
      var _bind = boundMethod.bind;
      boundMethod.bind = function(newThis) {
        for (
          var _len = arguments.length,
            args = Array(_len > 1 ? _len - 1 : 0),
            _key = 1;
          _key < _len;
          _key++
        ) {
          args[_key - 1] = arguments[_key];
        }

        // User is trying to bind() an autobound method; we effectively will
        // ignore the value of "this" that the user is trying to use, so
        // let's warn.
        if (newThis !== component && newThis !== null) {
          if (process.env.NODE_ENV !== 'production') {
            warning(
              false,
              'bind(): React component methods may only be bound to the ' +
                'component instance. See %s',
              componentName
            );
          }
        } else if (!args.length) {
          if (process.env.NODE_ENV !== 'production') {
            warning(
              false,
              'bind(): You are binding a component method to the component. ' +
                'React does this for you automatically in a high-performance ' +
                'way, so you can safely remove this call. See %s',
              componentName
            );
          }
          return boundMethod;
        }
        var reboundMethod = _bind.apply(boundMethod, arguments);
        reboundMethod.__reactBoundContext = component;
        reboundMethod.__reactBoundMethod = method;
        reboundMethod.__reactBoundArguments = args;
        return reboundMethod;
      };
    }
    return boundMethod;
  }

  /**
   * Binds all auto-bound methods in a component.
   *
   * @param {object} component Component whose method is going to be bound.
   */
  function bindAutoBindMethods(component) {
    var pairs = component.__reactAutoBindPairs;
    for (var i = 0; i < pairs.length; i += 2) {
      var autoBindKey = pairs[i];
      var method = pairs[i + 1];
      component[autoBindKey] = bindAutoBindMethod(component, method);
    }
  }

  var IsMountedPreMixin = {
    componentDidMount: function() {
      this.__isMounted = true;
    }
  };

  var IsMountedPostMixin = {
    componentWillUnmount: function() {
      this.__isMounted = false;
    }
  };

  /**
   * Add more to the ReactClass base class. These are all legacy features and
   * therefore not already part of the modern ReactComponent.
   */
  var ReactClassMixin = {
    /**
     * TODO: This will be deprecated because state should always keep a consistent
     * type signature and the only use case for this, is to avoid that.
     */
    replaceState: function(newState, callback) {
      this.updater.enqueueReplaceState(this, newState, callback);
    },

    /**
     * Checks whether or not this composite component is mounted.
     * @return {boolean} True if mounted, false otherwise.
     * @protected
     * @final
     */
    isMounted: function() {
      if (process.env.NODE_ENV !== 'production') {
        warning(
          this.__didWarnIsMounted,
          '%s: isMounted is deprecated. Instead, make sure to clean up ' +
            'subscriptions and pending requests in componentWillUnmount to ' +
            'prevent memory leaks.',
          (this.constructor && this.constructor.displayName) ||
            this.name ||
            'Component'
        );
        this.__didWarnIsMounted = true;
      }
      return !!this.__isMounted;
    }
  };

  var ReactClassComponent = function() {};
  _assign(
    ReactClassComponent.prototype,
    ReactComponent.prototype,
    ReactClassMixin
  );

  /**
   * Creates a composite component class given a class specification.
   * See https://facebook.github.io/react/docs/top-level-api.html#react.createclass
   *
   * @param {object} spec Class specification (which must define `render`).
   * @return {function} Component constructor function.
   * @public
   */
  function createClass(spec) {
    // To keep our warnings more understandable, we'll use a little hack here to
    // ensure that Constructor.name !== 'Constructor'. This makes sure we don't
    // unnecessarily identify a class without displayName as 'Constructor'.
    var Constructor = identity(function(props, context, updater) {
      // This constructor gets overridden by mocks. The argument is used
      // by mocks to assert on what gets mounted.

      if (process.env.NODE_ENV !== 'production') {
        warning(
          this instanceof Constructor,
          'Something is calling a React component directly. Use a factory or ' +
            'JSX instead. See: https://fb.me/react-legacyfactory'
        );
      }

      // Wire up auto-binding
      if (this.__reactAutoBindPairs.length) {
        bindAutoBindMethods(this);
      }

      this.props = props;
      this.context = context;
      this.refs = emptyObject;
      this.updater = updater || ReactNoopUpdateQueue;

      this.state = null;

      // ReactClasses doesn't have constructors. Instead, they use the
      // getInitialState and componentWillMount methods for initialization.

      var initialState = this.getInitialState ? this.getInitialState() : null;
      if (process.env.NODE_ENV !== 'production') {
        // We allow auto-mocks to proceed as if they're returning null.
        if (
          initialState === undefined &&
          this.getInitialState._isMockFunction
        ) {
          // This is probably bad practice. Consider warning here and
          // deprecating this convenience.
          initialState = null;
        }
      }
      _invariant(
        typeof initialState === 'object' && !Array.isArray(initialState),
        '%s.getInitialState(): must return an object or null',
        Constructor.displayName || 'ReactCompositeComponent'
      );

      this.state = initialState;
    });
    Constructor.prototype = new ReactClassComponent();
    Constructor.prototype.constructor = Constructor;
    Constructor.prototype.__reactAutoBindPairs = [];

    injectedMixins.forEach(mixSpecIntoComponent.bind(null, Constructor));

    mixSpecIntoComponent(Constructor, IsMountedPreMixin);
    mixSpecIntoComponent(Constructor, spec);
    mixSpecIntoComponent(Constructor, IsMountedPostMixin);

    // Initialize the defaultProps property after all mixins have been merged.
    if (Constructor.getDefaultProps) {
      Constructor.defaultProps = Constructor.getDefaultProps();
    }

    if (process.env.NODE_ENV !== 'production') {
      // This is a tag to indicate that the use of these method names is ok,
      // since it's used with createClass. If it's not, then it's likely a
      // mistake so we'll warn you to use the static property, property
      // initializer or constructor respectively.
      if (Constructor.getDefaultProps) {
        Constructor.getDefaultProps.isReactClassApproved = {};
      }
      if (Constructor.prototype.getInitialState) {
        Constructor.prototype.getInitialState.isReactClassApproved = {};
      }
    }

    _invariant(
      Constructor.prototype.render,
      'createClass(...): Class specification must implement a `render` method.'
    );

    if (process.env.NODE_ENV !== 'production') {
      warning(
        !Constructor.prototype.componentShouldUpdate,
        '%s has a method called ' +
          'componentShouldUpdate(). Did you mean shouldComponentUpdate()? ' +
          'The name is phrased as a question because the function is ' +
          'expected to return a value.',
        spec.displayName || 'A component'
      );
      warning(
        !Constructor.prototype.componentWillRecieveProps,
        '%s has a method called ' +
          'componentWillRecieveProps(). Did you mean componentWillReceiveProps()?',
        spec.displayName || 'A component'
      );
    }

    // Reduce time spent doing lookups by setting these on the prototype.
    for (var methodName in ReactClassInterface) {
      if (!Constructor.prototype[methodName]) {
        Constructor.prototype[methodName] = null;
      }
    }

    return Constructor;
  }

  return createClass;
}

module.exports = factory;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ }),
/* 116 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/


/* eslint-disable no-unused-vars */
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
	if (val === null || val === undefined) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

function shouldUseNative() {
	try {
		if (!Object.assign) {
			return false;
		}

		// Detect buggy property enumeration order in older V8 versions.

		// https://bugs.chromium.org/p/v8/issues/detail?id=4118
		var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
		test1[5] = 'de';
		if (Object.getOwnPropertyNames(test1)[0] === '5') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test2 = {};
		for (var i = 0; i < 10; i++) {
			test2['_' + String.fromCharCode(i)] = i;
		}
		var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
			return test2[n];
		});
		if (order2.join('') !== '0123456789') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test3 = {};
		'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
			test3[letter] = letter;
		});
		if (Object.keys(Object.assign({}, test3)).join('') !==
				'abcdefghijklmnopqrst') {
			return false;
		}

		return true;
	} catch (err) {
		// We don't expect any of the above to throw, but better to be safe.
		return false;
	}
}

module.exports = shouldUseNative() ? Object.assign : function (target, source) {
	var from;
	var to = toObject(target);
	var symbols;

	for (var s = 1; s < arguments.length; s++) {
		from = Object(arguments[s]);

		for (var key in from) {
			if (hasOwnProperty.call(from, key)) {
				to[key] = from[key];
			}
		}

		if (getOwnPropertySymbols) {
			symbols = getOwnPropertySymbols(from);
			for (var i = 0; i < symbols.length; i++) {
				if (propIsEnumerable.call(from, symbols[i])) {
					to[symbols[i]] = from[symbols[i]];
				}
			}
		}
	}

	return to;
};


/***/ }),
/* 117 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */



var emptyObject = {};

if (process.env.NODE_ENV !== 'production') {
  Object.freeze(emptyObject);
}

module.exports = emptyObject;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ }),
/* 118 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/**
 * Copyright Schrodinger, LLC
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule translateDOMPositionXY
 * @typechecks
 */



var _BrowserSupportCore = __webpack_require__(119);

var _BrowserSupportCore2 = _interopRequireDefault(_BrowserSupportCore);

var _getVendorPrefixedName = __webpack_require__(72);

var _getVendorPrefixedName2 = _interopRequireDefault(_getVendorPrefixedName);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TRANSFORM = (0, _getVendorPrefixedName2.default)('transform');
var BACKFACE_VISIBILITY = (0, _getVendorPrefixedName2.default)('backfaceVisibility');

var translateDOMPositionXY = function () {
  if (_BrowserSupportCore2.default.hasCSSTransforms()) {
    var ua = global.window ? global.window.navigator.userAgent : 'UNKNOWN';
    var isSafari = /Safari\//.test(ua) && !/Chrome\//.test(ua);
    // It appears that Safari messes up the composition order
    // of GPU-accelerated layers
    // (see bug https://bugs.webkit.org/show_bug.cgi?id=61824).
    // Use 2D translation instead.
    if (!isSafari && _BrowserSupportCore2.default.hasCSS3DTransforms()) {
      return function ( /*object*/style, /*number*/x, /*number*/y) {
        style[TRANSFORM] = 'translate3d(' + x + 'px,' + y + 'px,0)';
        style[BACKFACE_VISIBILITY] = 'hidden';
      };
    } else {
      return function ( /*object*/style, /*number*/x, /*number*/y) {
        style[TRANSFORM] = 'translate(' + x + 'px,' + y + 'px)';
      };
    }
  } else {
    return function ( /*object*/style, /*number*/x, /*number*/y) {
      style.left = x + 'px';
      style.top = y + 'px';
    };
  }
}();

module.exports = translateDOMPositionXY;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6)))

/***/ }),
/* 119 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _getVendorPrefixedName = __webpack_require__(72);

var _getVendorPrefixedName2 = _interopRequireDefault(_getVendorPrefixedName);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BrowserSupportCore = {
  /**
   * @return {bool} True if browser supports css animations.
   */
  hasCSSAnimations: function hasCSSAnimations() {
    return !!(0, _getVendorPrefixedName2.default)('animationName');
  },

  /**
   * @return {bool} True if browser supports css transforms.
   */
  hasCSSTransforms: function hasCSSTransforms() {
    return !!(0, _getVendorPrefixedName2.default)('transform');
  },

  /**
   * @return {bool} True if browser supports css 3d transforms.
   */
  hasCSS3DTransforms: function hasCSS3DTransforms() {
    return !!(0, _getVendorPrefixedName2.default)('perspective');
  },

  /**
   * @return {bool} True if browser supports css transitions.
   */
  hasCSSTransitions: function hasCSSTransitions() {
    return !!(0, _getVendorPrefixedName2.default)('transition');
  }
}; /**
    * Copyright Schrodinger, LLC
    * All rights reserved.
    *
    * This source code is licensed under the BSD-style license found in the
    * LICENSE file in the root directory of this source tree. An additional grant
    * of patent rights can be found in the PATENTS file in the same directory.
    *
    * @providesModule BrowserSupportCore
    */

module.exports = BrowserSupportCore;

/***/ }),
/* 120 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Copyright Schrodinger, LLC
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule camelize
 * @typechecks
 */

var _hyphenPattern = /-(.)/g;

/**
 * Camelcases a hyphenated string, for example:
 *
 *   > camelize('background-color')
 *   < "backgroundColor"
 *
 * @param {string} string
 * @return {string}
 */
function camelize(string) {
  return string.replace(_hyphenPattern, function (_, character) {
    return character.toUpperCase();
  });
}

module.exports = camelize;

/***/ }),
/* 121 */
/***/ (function(module, exports, __webpack_require__) {

var arrayReduce = __webpack_require__(122),
    baseEach = __webpack_require__(23),
    baseIteratee = __webpack_require__(57),
    baseReduce = __webpack_require__(202),
    isArray = __webpack_require__(1);

/**
 * Reduces `collection` to a value which is the accumulated result of running
 * each element in `collection` thru `iteratee`, where each successive
 * invocation is supplied the return value of the previous. If `accumulator`
 * is not given, the first element of `collection` is used as the initial
 * value. The iteratee is invoked with four arguments:
 * (accumulator, value, index|key, collection).
 *
 * Many lodash methods are guarded to work as iteratees for methods like
 * `_.reduce`, `_.reduceRight`, and `_.transform`.
 *
 * The guarded methods are:
 * `assign`, `defaults`, `defaultsDeep`, `includes`, `merge`, `orderBy`,
 * and `sortBy`
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Collection
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function} [iteratee=_.identity] The function invoked per iteration.
 * @param {*} [accumulator] The initial value.
 * @returns {*} Returns the accumulated value.
 * @see _.reduceRight
 * @example
 *
 * _.reduce([1, 2], function(sum, n) {
 *   return sum + n;
 * }, 0);
 * // => 3
 *
 * _.reduce({ 'a': 1, 'b': 2, 'c': 1 }, function(result, value, key) {
 *   (result[value] || (result[value] = [])).push(key);
 *   return result;
 * }, {});
 * // => { '1': ['a', 'c'], '2': ['b'] } (iteration order is not guaranteed)
 */
function reduce(collection, iteratee, accumulator) {
  var func = isArray(collection) ? arrayReduce : baseReduce,
      initAccum = arguments.length < 3;

  return func(collection, baseIteratee(iteratee, 4), accumulator, initAccum, baseEach);
}

module.exports = reduce;


/***/ }),
/* 122 */
/***/ (function(module, exports) {

/**
 * A specialized version of `_.reduce` for arrays without support for
 * iteratee shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @param {*} [accumulator] The initial value.
 * @param {boolean} [initAccum] Specify using the first element of `array` as
 *  the initial value.
 * @returns {*} Returns the accumulated value.
 */
function arrayReduce(array, iteratee, accumulator, initAccum) {
  var index = -1,
      length = array == null ? 0 : array.length;

  if (initAccum && length) {
    accumulator = array[++index];
  }
  while (++index < length) {
    accumulator = iteratee(accumulator, array[index], index, array);
  }
  return accumulator;
}

module.exports = arrayReduce;


/***/ }),
/* 123 */
/***/ (function(module, exports, __webpack_require__) {

var baseFor = __webpack_require__(124),
    keys = __webpack_require__(51);

/**
 * The base implementation of `_.forOwn` without support for iteratee shorthands.
 *
 * @private
 * @param {Object} object The object to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Object} Returns `object`.
 */
function baseForOwn(object, iteratee) {
  return object && baseFor(object, iteratee, keys);
}

module.exports = baseForOwn;


/***/ }),
/* 124 */
/***/ (function(module, exports, __webpack_require__) {

var createBaseFor = __webpack_require__(125);

/**
 * The base implementation of `baseForOwn` which iterates over `object`
 * properties returned by `keysFunc` and invokes `iteratee` for each property.
 * Iteratee functions may exit iteration early by explicitly returning `false`.
 *
 * @private
 * @param {Object} object The object to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @param {Function} keysFunc The function to get the keys of `object`.
 * @returns {Object} Returns `object`.
 */
var baseFor = createBaseFor();

module.exports = baseFor;


/***/ }),
/* 125 */
/***/ (function(module, exports) {

/**
 * Creates a base function for methods like `_.forIn` and `_.forOwn`.
 *
 * @private
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {Function} Returns the new base function.
 */
function createBaseFor(fromRight) {
  return function(object, iteratee, keysFunc) {
    var index = -1,
        iterable = Object(object),
        props = keysFunc(object),
        length = props.length;

    while (length--) {
      var key = props[fromRight ? length : ++index];
      if (iteratee(iterable[key], key, iterable) === false) {
        break;
      }
    }
    return object;
  };
}

module.exports = createBaseFor;


/***/ }),
/* 126 */
/***/ (function(module, exports, __webpack_require__) {

var baseTimes = __webpack_require__(127),
    isArguments = __webpack_require__(52),
    isArray = __webpack_require__(1),
    isBuffer = __webpack_require__(75),
    isIndex = __webpack_require__(54),
    isTypedArray = __webpack_require__(76);

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Creates an array of the enumerable property names of the array-like `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @param {boolean} inherited Specify returning inherited property names.
 * @returns {Array} Returns the array of property names.
 */
function arrayLikeKeys(value, inherited) {
  var isArr = isArray(value),
      isArg = !isArr && isArguments(value),
      isBuff = !isArr && !isArg && isBuffer(value),
      isType = !isArr && !isArg && !isBuff && isTypedArray(value),
      skipIndexes = isArr || isArg || isBuff || isType,
      result = skipIndexes ? baseTimes(value.length, String) : [],
      length = result.length;

  for (var key in value) {
    if ((inherited || hasOwnProperty.call(value, key)) &&
        !(skipIndexes && (
           // Safari 9 has enumerable `arguments.length` in strict mode.
           key == 'length' ||
           // Node.js 0.10 has enumerable non-index properties on buffers.
           (isBuff && (key == 'offset' || key == 'parent')) ||
           // PhantomJS 2 has enumerable non-index properties on typed arrays.
           (isType && (key == 'buffer' || key == 'byteLength' || key == 'byteOffset')) ||
           // Skip index properties.
           isIndex(key, length)
        ))) {
      result.push(key);
    }
  }
  return result;
}

module.exports = arrayLikeKeys;


/***/ }),
/* 127 */
/***/ (function(module, exports) {

/**
 * The base implementation of `_.times` without support for iteratee shorthands
 * or max array length checks.
 *
 * @private
 * @param {number} n The number of times to invoke `iteratee`.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the array of results.
 */
function baseTimes(n, iteratee) {
  var index = -1,
      result = Array(n);

  while (++index < n) {
    result[index] = iteratee(index);
  }
  return result;
}

module.exports = baseTimes;


/***/ }),
/* 128 */
/***/ (function(module, exports, __webpack_require__) {

var baseGetTag = __webpack_require__(12),
    isObjectLike = __webpack_require__(14);

/** `Object#toString` result references. */
var argsTag = '[object Arguments]';

/**
 * The base implementation of `_.isArguments`.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 */
function baseIsArguments(value) {
  return isObjectLike(value) && baseGetTag(value) == argsTag;
}

module.exports = baseIsArguments;


/***/ }),
/* 129 */
/***/ (function(module, exports, __webpack_require__) {

var Symbol = __webpack_require__(13);

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/** Built-in value references. */
var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */
function getRawTag(value) {
  var isOwn = hasOwnProperty.call(value, symToStringTag),
      tag = value[symToStringTag];

  try {
    value[symToStringTag] = undefined;
    var unmasked = true;
  } catch (e) {}

  var result = nativeObjectToString.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag] = tag;
    } else {
      delete value[symToStringTag];
    }
  }
  return result;
}

module.exports = getRawTag;


/***/ }),
/* 130 */
/***/ (function(module, exports) {

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */
function objectToString(value) {
  return nativeObjectToString.call(value);
}

module.exports = objectToString;


/***/ }),
/* 131 */
/***/ (function(module, exports) {

/**
 * This method returns `false`.
 *
 * @static
 * @memberOf _
 * @since 4.13.0
 * @category Util
 * @returns {boolean} Returns `false`.
 * @example
 *
 * _.times(2, _.stubFalse);
 * // => [false, false]
 */
function stubFalse() {
  return false;
}

module.exports = stubFalse;


/***/ }),
/* 132 */
/***/ (function(module, exports, __webpack_require__) {

var baseGetTag = __webpack_require__(12),
    isLength = __webpack_require__(55),
    isObjectLike = __webpack_require__(14);

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
    arrayTag = '[object Array]',
    boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    errorTag = '[object Error]',
    funcTag = '[object Function]',
    mapTag = '[object Map]',
    numberTag = '[object Number]',
    objectTag = '[object Object]',
    regexpTag = '[object RegExp]',
    setTag = '[object Set]',
    stringTag = '[object String]',
    weakMapTag = '[object WeakMap]';

var arrayBufferTag = '[object ArrayBuffer]',
    dataViewTag = '[object DataView]',
    float32Tag = '[object Float32Array]',
    float64Tag = '[object Float64Array]',
    int8Tag = '[object Int8Array]',
    int16Tag = '[object Int16Array]',
    int32Tag = '[object Int32Array]',
    uint8Tag = '[object Uint8Array]',
    uint8ClampedTag = '[object Uint8ClampedArray]',
    uint16Tag = '[object Uint16Array]',
    uint32Tag = '[object Uint32Array]';

/** Used to identify `toStringTag` values of typed arrays. */
var typedArrayTags = {};
typedArrayTags[float32Tag] = typedArrayTags[float64Tag] =
typedArrayTags[int8Tag] = typedArrayTags[int16Tag] =
typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] =
typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] =
typedArrayTags[uint32Tag] = true;
typedArrayTags[argsTag] = typedArrayTags[arrayTag] =
typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] =
typedArrayTags[dataViewTag] = typedArrayTags[dateTag] =
typedArrayTags[errorTag] = typedArrayTags[funcTag] =
typedArrayTags[mapTag] = typedArrayTags[numberTag] =
typedArrayTags[objectTag] = typedArrayTags[regexpTag] =
typedArrayTags[setTag] = typedArrayTags[stringTag] =
typedArrayTags[weakMapTag] = false;

/**
 * The base implementation of `_.isTypedArray` without Node.js optimizations.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 */
function baseIsTypedArray(value) {
  return isObjectLike(value) &&
    isLength(value.length) && !!typedArrayTags[baseGetTag(value)];
}

module.exports = baseIsTypedArray;


/***/ }),
/* 133 */
/***/ (function(module, exports) {

/**
 * The base implementation of `_.unary` without support for storing metadata.
 *
 * @private
 * @param {Function} func The function to cap arguments for.
 * @returns {Function} Returns the new capped function.
 */
function baseUnary(func) {
  return function(value) {
    return func(value);
  };
}

module.exports = baseUnary;


/***/ }),
/* 134 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {var freeGlobal = __webpack_require__(74);

/** Detect free variable `exports`. */
var freeExports = typeof exports == 'object' && exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule = freeExports && typeof module == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports = freeModule && freeModule.exports === freeExports;

/** Detect free variable `process` from Node.js. */
var freeProcess = moduleExports && freeGlobal.process;

/** Used to access faster Node.js helpers. */
var nodeUtil = (function() {
  try {
    return freeProcess && freeProcess.binding && freeProcess.binding('util');
  } catch (e) {}
}());

module.exports = nodeUtil;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(53)(module)))

/***/ }),
/* 135 */
/***/ (function(module, exports, __webpack_require__) {

var isPrototype = __webpack_require__(136),
    nativeKeys = __webpack_require__(137);

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function baseKeys(object) {
  if (!isPrototype(object)) {
    return nativeKeys(object);
  }
  var result = [];
  for (var key in Object(object)) {
    if (hasOwnProperty.call(object, key) && key != 'constructor') {
      result.push(key);
    }
  }
  return result;
}

module.exports = baseKeys;


/***/ }),
/* 136 */
/***/ (function(module, exports) {

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Checks if `value` is likely a prototype object.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
 */
function isPrototype(value) {
  var Ctor = value && value.constructor,
      proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto;

  return value === proto;
}

module.exports = isPrototype;


/***/ }),
/* 137 */
/***/ (function(module, exports, __webpack_require__) {

var overArg = __webpack_require__(138);

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeKeys = overArg(Object.keys, Object);

module.exports = nativeKeys;


/***/ }),
/* 138 */
/***/ (function(module, exports) {

/**
 * Creates a unary function that invokes `func` with its argument transformed.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {Function} transform The argument transform.
 * @returns {Function} Returns the new function.
 */
function overArg(func, transform) {
  return function(arg) {
    return func(transform(arg));
  };
}

module.exports = overArg;


/***/ }),
/* 139 */
/***/ (function(module, exports, __webpack_require__) {

var isArrayLike = __webpack_require__(56);

/**
 * Creates a `baseEach` or `baseEachRight` function.
 *
 * @private
 * @param {Function} eachFunc The function to iterate over a collection.
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {Function} Returns the new base function.
 */
function createBaseEach(eachFunc, fromRight) {
  return function(collection, iteratee) {
    if (collection == null) {
      return collection;
    }
    if (!isArrayLike(collection)) {
      return eachFunc(collection, iteratee);
    }
    var length = collection.length,
        index = fromRight ? length : -1,
        iterable = Object(collection);

    while ((fromRight ? index-- : ++index < length)) {
      if (iteratee(iterable[index], index, iterable) === false) {
        break;
      }
    }
    return collection;
  };
}

module.exports = createBaseEach;


/***/ }),
/* 140 */
/***/ (function(module, exports, __webpack_require__) {

var baseIsMatch = __webpack_require__(141),
    getMatchData = __webpack_require__(189),
    matchesStrictComparable = __webpack_require__(84);

/**
 * The base implementation of `_.matches` which doesn't clone `source`.
 *
 * @private
 * @param {Object} source The object of property values to match.
 * @returns {Function} Returns the new spec function.
 */
function baseMatches(source) {
  var matchData = getMatchData(source);
  if (matchData.length == 1 && matchData[0][2]) {
    return matchesStrictComparable(matchData[0][0], matchData[0][1]);
  }
  return function(object) {
    return object === source || baseIsMatch(object, source, matchData);
  };
}

module.exports = baseMatches;


/***/ }),
/* 141 */
/***/ (function(module, exports, __webpack_require__) {

var Stack = __webpack_require__(78),
    baseIsEqual = __webpack_require__(80);

/** Used to compose bitmasks for value comparisons. */
var COMPARE_PARTIAL_FLAG = 1,
    COMPARE_UNORDERED_FLAG = 2;

/**
 * The base implementation of `_.isMatch` without support for iteratee shorthands.
 *
 * @private
 * @param {Object} object The object to inspect.
 * @param {Object} source The object of property values to match.
 * @param {Array} matchData The property names, values, and compare flags to match.
 * @param {Function} [customizer] The function to customize comparisons.
 * @returns {boolean} Returns `true` if `object` is a match, else `false`.
 */
function baseIsMatch(object, source, matchData, customizer) {
  var index = matchData.length,
      length = index,
      noCustomizer = !customizer;

  if (object == null) {
    return !length;
  }
  object = Object(object);
  while (index--) {
    var data = matchData[index];
    if ((noCustomizer && data[2])
          ? data[1] !== object[data[0]]
          : !(data[0] in object)
        ) {
      return false;
    }
  }
  while (++index < length) {
    data = matchData[index];
    var key = data[0],
        objValue = object[key],
        srcValue = data[1];

    if (noCustomizer && data[2]) {
      if (objValue === undefined && !(key in object)) {
        return false;
      }
    } else {
      var stack = new Stack;
      if (customizer) {
        var result = customizer(objValue, srcValue, key, object, source, stack);
      }
      if (!(result === undefined
            ? baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG | COMPARE_UNORDERED_FLAG, customizer, stack)
            : result
          )) {
        return false;
      }
    }
  }
  return true;
}

module.exports = baseIsMatch;


/***/ }),
/* 142 */
/***/ (function(module, exports) {

/**
 * Removes all key-value entries from the list cache.
 *
 * @private
 * @name clear
 * @memberOf ListCache
 */
function listCacheClear() {
  this.__data__ = [];
  this.size = 0;
}

module.exports = listCacheClear;


/***/ }),
/* 143 */
/***/ (function(module, exports, __webpack_require__) {

var assocIndexOf = __webpack_require__(26);

/** Used for built-in method references. */
var arrayProto = Array.prototype;

/** Built-in value references. */
var splice = arrayProto.splice;

/**
 * Removes `key` and its value from the list cache.
 *
 * @private
 * @name delete
 * @memberOf ListCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function listCacheDelete(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    return false;
  }
  var lastIndex = data.length - 1;
  if (index == lastIndex) {
    data.pop();
  } else {
    splice.call(data, index, 1);
  }
  --this.size;
  return true;
}

module.exports = listCacheDelete;


/***/ }),
/* 144 */
/***/ (function(module, exports, __webpack_require__) {

var assocIndexOf = __webpack_require__(26);

/**
 * Gets the list cache value for `key`.
 *
 * @private
 * @name get
 * @memberOf ListCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function listCacheGet(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  return index < 0 ? undefined : data[index][1];
}

module.exports = listCacheGet;


/***/ }),
/* 145 */
/***/ (function(module, exports, __webpack_require__) {

var assocIndexOf = __webpack_require__(26);

/**
 * Checks if a list cache value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf ListCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function listCacheHas(key) {
  return assocIndexOf(this.__data__, key) > -1;
}

module.exports = listCacheHas;


/***/ }),
/* 146 */
/***/ (function(module, exports, __webpack_require__) {

var assocIndexOf = __webpack_require__(26);

/**
 * Sets the list cache `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf ListCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the list cache instance.
 */
function listCacheSet(key, value) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    ++this.size;
    data.push([key, value]);
  } else {
    data[index][1] = value;
  }
  return this;
}

module.exports = listCacheSet;


/***/ }),
/* 147 */
/***/ (function(module, exports, __webpack_require__) {

var ListCache = __webpack_require__(25);

/**
 * Removes all key-value entries from the stack.
 *
 * @private
 * @name clear
 * @memberOf Stack
 */
function stackClear() {
  this.__data__ = new ListCache;
  this.size = 0;
}

module.exports = stackClear;


/***/ }),
/* 148 */
/***/ (function(module, exports) {

/**
 * Removes `key` and its value from the stack.
 *
 * @private
 * @name delete
 * @memberOf Stack
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function stackDelete(key) {
  var data = this.__data__,
      result = data['delete'](key);

  this.size = data.size;
  return result;
}

module.exports = stackDelete;


/***/ }),
/* 149 */
/***/ (function(module, exports) {

/**
 * Gets the stack value for `key`.
 *
 * @private
 * @name get
 * @memberOf Stack
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function stackGet(key) {
  return this.__data__.get(key);
}

module.exports = stackGet;


/***/ }),
/* 150 */
/***/ (function(module, exports) {

/**
 * Checks if a stack value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Stack
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function stackHas(key) {
  return this.__data__.has(key);
}

module.exports = stackHas;


/***/ }),
/* 151 */
/***/ (function(module, exports, __webpack_require__) {

var ListCache = __webpack_require__(25),
    Map = __webpack_require__(59),
    MapCache = __webpack_require__(60);

/** Used as the size to enable large array optimizations. */
var LARGE_ARRAY_SIZE = 200;

/**
 * Sets the stack `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Stack
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the stack cache instance.
 */
function stackSet(key, value) {
  var data = this.__data__;
  if (data instanceof ListCache) {
    var pairs = data.__data__;
    if (!Map || (pairs.length < LARGE_ARRAY_SIZE - 1)) {
      pairs.push([key, value]);
      this.size = ++data.size;
      return this;
    }
    data = this.__data__ = new MapCache(pairs);
  }
  data.set(key, value);
  this.size = data.size;
  return this;
}

module.exports = stackSet;


/***/ }),
/* 152 */
/***/ (function(module, exports, __webpack_require__) {

var isFunction = __webpack_require__(77),
    isMasked = __webpack_require__(153),
    isObject = __webpack_require__(24),
    toSource = __webpack_require__(79);

/**
 * Used to match `RegExp`
 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
 */
var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

/** Used to detect host constructors (Safari). */
var reIsHostCtor = /^\[object .+?Constructor\]$/;

/** Used for built-in method references. */
var funcProto = Function.prototype,
    objectProto = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Used to detect if a method is native. */
var reIsNative = RegExp('^' +
  funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&')
  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
);

/**
 * The base implementation of `_.isNative` without bad shim checks.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function,
 *  else `false`.
 */
function baseIsNative(value) {
  if (!isObject(value) || isMasked(value)) {
    return false;
  }
  var pattern = isFunction(value) ? reIsNative : reIsHostCtor;
  return pattern.test(toSource(value));
}

module.exports = baseIsNative;


/***/ }),
/* 153 */
/***/ (function(module, exports, __webpack_require__) {

var coreJsData = __webpack_require__(154);

/** Used to detect methods masquerading as native. */
var maskSrcKey = (function() {
  var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
  return uid ? ('Symbol(src)_1.' + uid) : '';
}());

/**
 * Checks if `func` has its source masked.
 *
 * @private
 * @param {Function} func The function to check.
 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
 */
function isMasked(func) {
  return !!maskSrcKey && (maskSrcKey in func);
}

module.exports = isMasked;


/***/ }),
/* 154 */
/***/ (function(module, exports, __webpack_require__) {

var root = __webpack_require__(5);

/** Used to detect overreaching core-js shims. */
var coreJsData = root['__core-js_shared__'];

module.exports = coreJsData;


/***/ }),
/* 155 */
/***/ (function(module, exports) {

/**
 * Gets the value at `key` of `object`.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {string} key The key of the property to get.
 * @returns {*} Returns the property value.
 */
function getValue(object, key) {
  return object == null ? undefined : object[key];
}

module.exports = getValue;


/***/ }),
/* 156 */
/***/ (function(module, exports, __webpack_require__) {

var Hash = __webpack_require__(157),
    ListCache = __webpack_require__(25),
    Map = __webpack_require__(59);

/**
 * Removes all key-value entries from the map.
 *
 * @private
 * @name clear
 * @memberOf MapCache
 */
function mapCacheClear() {
  this.size = 0;
  this.__data__ = {
    'hash': new Hash,
    'map': new (Map || ListCache),
    'string': new Hash
  };
}

module.exports = mapCacheClear;


/***/ }),
/* 157 */
/***/ (function(module, exports, __webpack_require__) {

var hashClear = __webpack_require__(158),
    hashDelete = __webpack_require__(159),
    hashGet = __webpack_require__(160),
    hashHas = __webpack_require__(161),
    hashSet = __webpack_require__(162);

/**
 * Creates a hash object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Hash(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

// Add methods to `Hash`.
Hash.prototype.clear = hashClear;
Hash.prototype['delete'] = hashDelete;
Hash.prototype.get = hashGet;
Hash.prototype.has = hashHas;
Hash.prototype.set = hashSet;

module.exports = Hash;


/***/ }),
/* 158 */
/***/ (function(module, exports, __webpack_require__) {

var nativeCreate = __webpack_require__(27);

/**
 * Removes all key-value entries from the hash.
 *
 * @private
 * @name clear
 * @memberOf Hash
 */
function hashClear() {
  this.__data__ = nativeCreate ? nativeCreate(null) : {};
  this.size = 0;
}

module.exports = hashClear;


/***/ }),
/* 159 */
/***/ (function(module, exports) {

/**
 * Removes `key` and its value from the hash.
 *
 * @private
 * @name delete
 * @memberOf Hash
 * @param {Object} hash The hash to modify.
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function hashDelete(key) {
  var result = this.has(key) && delete this.__data__[key];
  this.size -= result ? 1 : 0;
  return result;
}

module.exports = hashDelete;


/***/ }),
/* 160 */
/***/ (function(module, exports, __webpack_require__) {

var nativeCreate = __webpack_require__(27);

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = '__lodash_hash_undefined__';

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Gets the hash value for `key`.
 *
 * @private
 * @name get
 * @memberOf Hash
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function hashGet(key) {
  var data = this.__data__;
  if (nativeCreate) {
    var result = data[key];
    return result === HASH_UNDEFINED ? undefined : result;
  }
  return hasOwnProperty.call(data, key) ? data[key] : undefined;
}

module.exports = hashGet;


/***/ }),
/* 161 */
/***/ (function(module, exports, __webpack_require__) {

var nativeCreate = __webpack_require__(27);

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Checks if a hash value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Hash
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function hashHas(key) {
  var data = this.__data__;
  return nativeCreate ? (data[key] !== undefined) : hasOwnProperty.call(data, key);
}

module.exports = hashHas;


/***/ }),
/* 162 */
/***/ (function(module, exports, __webpack_require__) {

var nativeCreate = __webpack_require__(27);

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = '__lodash_hash_undefined__';

/**
 * Sets the hash `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Hash
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the hash instance.
 */
function hashSet(key, value) {
  var data = this.__data__;
  this.size += this.has(key) ? 0 : 1;
  data[key] = (nativeCreate && value === undefined) ? HASH_UNDEFINED : value;
  return this;
}

module.exports = hashSet;


/***/ }),
/* 163 */
/***/ (function(module, exports, __webpack_require__) {

var getMapData = __webpack_require__(28);

/**
 * Removes `key` and its value from the map.
 *
 * @private
 * @name delete
 * @memberOf MapCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function mapCacheDelete(key) {
  var result = getMapData(this, key)['delete'](key);
  this.size -= result ? 1 : 0;
  return result;
}

module.exports = mapCacheDelete;


/***/ }),
/* 164 */
/***/ (function(module, exports) {

/**
 * Checks if `value` is suitable for use as unique object key.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
 */
function isKeyable(value) {
  var type = typeof value;
  return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean')
    ? (value !== '__proto__')
    : (value === null);
}

module.exports = isKeyable;


/***/ }),
/* 165 */
/***/ (function(module, exports, __webpack_require__) {

var getMapData = __webpack_require__(28);

/**
 * Gets the map value for `key`.
 *
 * @private
 * @name get
 * @memberOf MapCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function mapCacheGet(key) {
  return getMapData(this, key).get(key);
}

module.exports = mapCacheGet;


/***/ }),
/* 166 */
/***/ (function(module, exports, __webpack_require__) {

var getMapData = __webpack_require__(28);

/**
 * Checks if a map value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf MapCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function mapCacheHas(key) {
  return getMapData(this, key).has(key);
}

module.exports = mapCacheHas;


/***/ }),
/* 167 */
/***/ (function(module, exports, __webpack_require__) {

var getMapData = __webpack_require__(28);

/**
 * Sets the map `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf MapCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the map cache instance.
 */
function mapCacheSet(key, value) {
  var data = getMapData(this, key),
      size = data.size;

  data.set(key, value);
  this.size += data.size == size ? 0 : 1;
  return this;
}

module.exports = mapCacheSet;


/***/ }),
/* 168 */
/***/ (function(module, exports, __webpack_require__) {

var Stack = __webpack_require__(78),
    equalArrays = __webpack_require__(81),
    equalByTag = __webpack_require__(174),
    equalObjects = __webpack_require__(178),
    getTag = __webpack_require__(184),
    isArray = __webpack_require__(1),
    isBuffer = __webpack_require__(75),
    isTypedArray = __webpack_require__(76);

/** Used to compose bitmasks for value comparisons. */
var COMPARE_PARTIAL_FLAG = 1;

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
    arrayTag = '[object Array]',
    objectTag = '[object Object]';

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * A specialized version of `baseIsEqual` for arrays and objects which performs
 * deep comparisons and tracks traversed objects enabling objects with circular
 * references to be compared.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} [stack] Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function baseIsEqualDeep(object, other, bitmask, customizer, equalFunc, stack) {
  var objIsArr = isArray(object),
      othIsArr = isArray(other),
      objTag = objIsArr ? arrayTag : getTag(object),
      othTag = othIsArr ? arrayTag : getTag(other);

  objTag = objTag == argsTag ? objectTag : objTag;
  othTag = othTag == argsTag ? objectTag : othTag;

  var objIsObj = objTag == objectTag,
      othIsObj = othTag == objectTag,
      isSameTag = objTag == othTag;

  if (isSameTag && isBuffer(object)) {
    if (!isBuffer(other)) {
      return false;
    }
    objIsArr = true;
    objIsObj = false;
  }
  if (isSameTag && !objIsObj) {
    stack || (stack = new Stack);
    return (objIsArr || isTypedArray(object))
      ? equalArrays(object, other, bitmask, customizer, equalFunc, stack)
      : equalByTag(object, other, objTag, bitmask, customizer, equalFunc, stack);
  }
  if (!(bitmask & COMPARE_PARTIAL_FLAG)) {
    var objIsWrapped = objIsObj && hasOwnProperty.call(object, '__wrapped__'),
        othIsWrapped = othIsObj && hasOwnProperty.call(other, '__wrapped__');

    if (objIsWrapped || othIsWrapped) {
      var objUnwrapped = objIsWrapped ? object.value() : object,
          othUnwrapped = othIsWrapped ? other.value() : other;

      stack || (stack = new Stack);
      return equalFunc(objUnwrapped, othUnwrapped, bitmask, customizer, stack);
    }
  }
  if (!isSameTag) {
    return false;
  }
  stack || (stack = new Stack);
  return equalObjects(object, other, bitmask, customizer, equalFunc, stack);
}

module.exports = baseIsEqualDeep;


/***/ }),
/* 169 */
/***/ (function(module, exports, __webpack_require__) {

var MapCache = __webpack_require__(60),
    setCacheAdd = __webpack_require__(170),
    setCacheHas = __webpack_require__(171);

/**
 *
 * Creates an array cache object to store unique values.
 *
 * @private
 * @constructor
 * @param {Array} [values] The values to cache.
 */
function SetCache(values) {
  var index = -1,
      length = values == null ? 0 : values.length;

  this.__data__ = new MapCache;
  while (++index < length) {
    this.add(values[index]);
  }
}

// Add methods to `SetCache`.
SetCache.prototype.add = SetCache.prototype.push = setCacheAdd;
SetCache.prototype.has = setCacheHas;

module.exports = SetCache;


/***/ }),
/* 170 */
/***/ (function(module, exports) {

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = '__lodash_hash_undefined__';

/**
 * Adds `value` to the array cache.
 *
 * @private
 * @name add
 * @memberOf SetCache
 * @alias push
 * @param {*} value The value to cache.
 * @returns {Object} Returns the cache instance.
 */
function setCacheAdd(value) {
  this.__data__.set(value, HASH_UNDEFINED);
  return this;
}

module.exports = setCacheAdd;


/***/ }),
/* 171 */
/***/ (function(module, exports) {

/**
 * Checks if `value` is in the array cache.
 *
 * @private
 * @name has
 * @memberOf SetCache
 * @param {*} value The value to search for.
 * @returns {number} Returns `true` if `value` is found, else `false`.
 */
function setCacheHas(value) {
  return this.__data__.has(value);
}

module.exports = setCacheHas;


/***/ }),
/* 172 */
/***/ (function(module, exports) {

/**
 * A specialized version of `_.some` for arrays without support for iteratee
 * shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {boolean} Returns `true` if any element passes the predicate check,
 *  else `false`.
 */
function arraySome(array, predicate) {
  var index = -1,
      length = array == null ? 0 : array.length;

  while (++index < length) {
    if (predicate(array[index], index, array)) {
      return true;
    }
  }
  return false;
}

module.exports = arraySome;


/***/ }),
/* 173 */
/***/ (function(module, exports) {

/**
 * Checks if a `cache` value for `key` exists.
 *
 * @private
 * @param {Object} cache The cache to query.
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function cacheHas(cache, key) {
  return cache.has(key);
}

module.exports = cacheHas;


/***/ }),
/* 174 */
/***/ (function(module, exports, __webpack_require__) {

var Symbol = __webpack_require__(13),
    Uint8Array = __webpack_require__(175),
    eq = __webpack_require__(58),
    equalArrays = __webpack_require__(81),
    mapToArray = __webpack_require__(176),
    setToArray = __webpack_require__(177);

/** Used to compose bitmasks for value comparisons. */
var COMPARE_PARTIAL_FLAG = 1,
    COMPARE_UNORDERED_FLAG = 2;

/** `Object#toString` result references. */
var boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    errorTag = '[object Error]',
    mapTag = '[object Map]',
    numberTag = '[object Number]',
    regexpTag = '[object RegExp]',
    setTag = '[object Set]',
    stringTag = '[object String]',
    symbolTag = '[object Symbol]';

var arrayBufferTag = '[object ArrayBuffer]',
    dataViewTag = '[object DataView]';

/** Used to convert symbols to primitives and strings. */
var symbolProto = Symbol ? Symbol.prototype : undefined,
    symbolValueOf = symbolProto ? symbolProto.valueOf : undefined;

/**
 * A specialized version of `baseIsEqualDeep` for comparing objects of
 * the same `toStringTag`.
 *
 * **Note:** This function only supports comparing values with tags of
 * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {string} tag The `toStringTag` of the objects to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} stack Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function equalByTag(object, other, tag, bitmask, customizer, equalFunc, stack) {
  switch (tag) {
    case dataViewTag:
      if ((object.byteLength != other.byteLength) ||
          (object.byteOffset != other.byteOffset)) {
        return false;
      }
      object = object.buffer;
      other = other.buffer;

    case arrayBufferTag:
      if ((object.byteLength != other.byteLength) ||
          !equalFunc(new Uint8Array(object), new Uint8Array(other))) {
        return false;
      }
      return true;

    case boolTag:
    case dateTag:
    case numberTag:
      // Coerce booleans to `1` or `0` and dates to milliseconds.
      // Invalid dates are coerced to `NaN`.
      return eq(+object, +other);

    case errorTag:
      return object.name == other.name && object.message == other.message;

    case regexpTag:
    case stringTag:
      // Coerce regexes to strings and treat strings, primitives and objects,
      // as equal. See http://www.ecma-international.org/ecma-262/7.0/#sec-regexp.prototype.tostring
      // for more details.
      return object == (other + '');

    case mapTag:
      var convert = mapToArray;

    case setTag:
      var isPartial = bitmask & COMPARE_PARTIAL_FLAG;
      convert || (convert = setToArray);

      if (object.size != other.size && !isPartial) {
        return false;
      }
      // Assume cyclic values are equal.
      var stacked = stack.get(object);
      if (stacked) {
        return stacked == other;
      }
      bitmask |= COMPARE_UNORDERED_FLAG;

      // Recursively compare objects (susceptible to call stack limits).
      stack.set(object, other);
      var result = equalArrays(convert(object), convert(other), bitmask, customizer, equalFunc, stack);
      stack['delete'](object);
      return result;

    case symbolTag:
      if (symbolValueOf) {
        return symbolValueOf.call(object) == symbolValueOf.call(other);
      }
  }
  return false;
}

module.exports = equalByTag;


/***/ }),
/* 175 */
/***/ (function(module, exports, __webpack_require__) {

var root = __webpack_require__(5);

/** Built-in value references. */
var Uint8Array = root.Uint8Array;

module.exports = Uint8Array;


/***/ }),
/* 176 */
/***/ (function(module, exports) {

/**
 * Converts `map` to its key-value pairs.
 *
 * @private
 * @param {Object} map The map to convert.
 * @returns {Array} Returns the key-value pairs.
 */
function mapToArray(map) {
  var index = -1,
      result = Array(map.size);

  map.forEach(function(value, key) {
    result[++index] = [key, value];
  });
  return result;
}

module.exports = mapToArray;


/***/ }),
/* 177 */
/***/ (function(module, exports) {

/**
 * Converts `set` to an array of its values.
 *
 * @private
 * @param {Object} set The set to convert.
 * @returns {Array} Returns the values.
 */
function setToArray(set) {
  var index = -1,
      result = Array(set.size);

  set.forEach(function(value) {
    result[++index] = value;
  });
  return result;
}

module.exports = setToArray;


/***/ }),
/* 178 */
/***/ (function(module, exports, __webpack_require__) {

var getAllKeys = __webpack_require__(179);

/** Used to compose bitmasks for value comparisons. */
var COMPARE_PARTIAL_FLAG = 1;

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * A specialized version of `baseIsEqualDeep` for objects with support for
 * partial deep comparisons.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} stack Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function equalObjects(object, other, bitmask, customizer, equalFunc, stack) {
  var isPartial = bitmask & COMPARE_PARTIAL_FLAG,
      objProps = getAllKeys(object),
      objLength = objProps.length,
      othProps = getAllKeys(other),
      othLength = othProps.length;

  if (objLength != othLength && !isPartial) {
    return false;
  }
  var index = objLength;
  while (index--) {
    var key = objProps[index];
    if (!(isPartial ? key in other : hasOwnProperty.call(other, key))) {
      return false;
    }
  }
  // Assume cyclic values are equal.
  var stacked = stack.get(object);
  if (stacked && stack.get(other)) {
    return stacked == other;
  }
  var result = true;
  stack.set(object, other);
  stack.set(other, object);

  var skipCtor = isPartial;
  while (++index < objLength) {
    key = objProps[index];
    var objValue = object[key],
        othValue = other[key];

    if (customizer) {
      var compared = isPartial
        ? customizer(othValue, objValue, key, other, object, stack)
        : customizer(objValue, othValue, key, object, other, stack);
    }
    // Recursively compare objects (susceptible to call stack limits).
    if (!(compared === undefined
          ? (objValue === othValue || equalFunc(objValue, othValue, bitmask, customizer, stack))
          : compared
        )) {
      result = false;
      break;
    }
    skipCtor || (skipCtor = key == 'constructor');
  }
  if (result && !skipCtor) {
    var objCtor = object.constructor,
        othCtor = other.constructor;

    // Non `Object` object instances with different constructors are not equal.
    if (objCtor != othCtor &&
        ('constructor' in object && 'constructor' in other) &&
        !(typeof objCtor == 'function' && objCtor instanceof objCtor &&
          typeof othCtor == 'function' && othCtor instanceof othCtor)) {
      result = false;
    }
  }
  stack['delete'](object);
  stack['delete'](other);
  return result;
}

module.exports = equalObjects;


/***/ }),
/* 179 */
/***/ (function(module, exports, __webpack_require__) {

var baseGetAllKeys = __webpack_require__(180),
    getSymbols = __webpack_require__(181),
    keys = __webpack_require__(51);

/**
 * Creates an array of own enumerable property names and symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names and symbols.
 */
function getAllKeys(object) {
  return baseGetAllKeys(object, keys, getSymbols);
}

module.exports = getAllKeys;


/***/ }),
/* 180 */
/***/ (function(module, exports, __webpack_require__) {

var arrayPush = __webpack_require__(82),
    isArray = __webpack_require__(1);

/**
 * The base implementation of `getAllKeys` and `getAllKeysIn` which uses
 * `keysFunc` and `symbolsFunc` to get the enumerable property names and
 * symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Function} keysFunc The function to get the keys of `object`.
 * @param {Function} symbolsFunc The function to get the symbols of `object`.
 * @returns {Array} Returns the array of property names and symbols.
 */
function baseGetAllKeys(object, keysFunc, symbolsFunc) {
  var result = keysFunc(object);
  return isArray(object) ? result : arrayPush(result, symbolsFunc(object));
}

module.exports = baseGetAllKeys;


/***/ }),
/* 181 */
/***/ (function(module, exports, __webpack_require__) {

var arrayFilter = __webpack_require__(182),
    stubArray = __webpack_require__(183);

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Built-in value references. */
var propertyIsEnumerable = objectProto.propertyIsEnumerable;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeGetSymbols = Object.getOwnPropertySymbols;

/**
 * Creates an array of the own enumerable symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of symbols.
 */
var getSymbols = !nativeGetSymbols ? stubArray : function(object) {
  if (object == null) {
    return [];
  }
  object = Object(object);
  return arrayFilter(nativeGetSymbols(object), function(symbol) {
    return propertyIsEnumerable.call(object, symbol);
  });
};

module.exports = getSymbols;


/***/ }),
/* 182 */
/***/ (function(module, exports) {

/**
 * A specialized version of `_.filter` for arrays without support for
 * iteratee shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {Array} Returns the new filtered array.
 */
function arrayFilter(array, predicate) {
  var index = -1,
      length = array == null ? 0 : array.length,
      resIndex = 0,
      result = [];

  while (++index < length) {
    var value = array[index];
    if (predicate(value, index, array)) {
      result[resIndex++] = value;
    }
  }
  return result;
}

module.exports = arrayFilter;


/***/ }),
/* 183 */
/***/ (function(module, exports) {

/**
 * This method returns a new empty array.
 *
 * @static
 * @memberOf _
 * @since 4.13.0
 * @category Util
 * @returns {Array} Returns the new empty array.
 * @example
 *
 * var arrays = _.times(2, _.stubArray);
 *
 * console.log(arrays);
 * // => [[], []]
 *
 * console.log(arrays[0] === arrays[1]);
 * // => false
 */
function stubArray() {
  return [];
}

module.exports = stubArray;


/***/ }),
/* 184 */
/***/ (function(module, exports, __webpack_require__) {

var DataView = __webpack_require__(185),
    Map = __webpack_require__(59),
    Promise = __webpack_require__(186),
    Set = __webpack_require__(187),
    WeakMap = __webpack_require__(188),
    baseGetTag = __webpack_require__(12),
    toSource = __webpack_require__(79);

/** `Object#toString` result references. */
var mapTag = '[object Map]',
    objectTag = '[object Object]',
    promiseTag = '[object Promise]',
    setTag = '[object Set]',
    weakMapTag = '[object WeakMap]';

var dataViewTag = '[object DataView]';

/** Used to detect maps, sets, and weakmaps. */
var dataViewCtorString = toSource(DataView),
    mapCtorString = toSource(Map),
    promiseCtorString = toSource(Promise),
    setCtorString = toSource(Set),
    weakMapCtorString = toSource(WeakMap);

/**
 * Gets the `toStringTag` of `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
var getTag = baseGetTag;

// Fallback for data views, maps, sets, and weak maps in IE 11 and promises in Node.js < 6.
if ((DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag) ||
    (Map && getTag(new Map) != mapTag) ||
    (Promise && getTag(Promise.resolve()) != promiseTag) ||
    (Set && getTag(new Set) != setTag) ||
    (WeakMap && getTag(new WeakMap) != weakMapTag)) {
  getTag = function(value) {
    var result = baseGetTag(value),
        Ctor = result == objectTag ? value.constructor : undefined,
        ctorString = Ctor ? toSource(Ctor) : '';

    if (ctorString) {
      switch (ctorString) {
        case dataViewCtorString: return dataViewTag;
        case mapCtorString: return mapTag;
        case promiseCtorString: return promiseTag;
        case setCtorString: return setTag;
        case weakMapCtorString: return weakMapTag;
      }
    }
    return result;
  };
}

module.exports = getTag;


/***/ }),
/* 185 */
/***/ (function(module, exports, __webpack_require__) {

var getNative = __webpack_require__(9),
    root = __webpack_require__(5);

/* Built-in method references that are verified to be native. */
var DataView = getNative(root, 'DataView');

module.exports = DataView;


/***/ }),
/* 186 */
/***/ (function(module, exports, __webpack_require__) {

var getNative = __webpack_require__(9),
    root = __webpack_require__(5);

/* Built-in method references that are verified to be native. */
var Promise = getNative(root, 'Promise');

module.exports = Promise;


/***/ }),
/* 187 */
/***/ (function(module, exports, __webpack_require__) {

var getNative = __webpack_require__(9),
    root = __webpack_require__(5);

/* Built-in method references that are verified to be native. */
var Set = getNative(root, 'Set');

module.exports = Set;


/***/ }),
/* 188 */
/***/ (function(module, exports, __webpack_require__) {

var getNative = __webpack_require__(9),
    root = __webpack_require__(5);

/* Built-in method references that are verified to be native. */
var WeakMap = getNative(root, 'WeakMap');

module.exports = WeakMap;


/***/ }),
/* 189 */
/***/ (function(module, exports, __webpack_require__) {

var isStrictComparable = __webpack_require__(83),
    keys = __webpack_require__(51);

/**
 * Gets the property names, values, and compare flags of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the match data of `object`.
 */
function getMatchData(object) {
  var result = keys(object),
      length = result.length;

  while (length--) {
    var key = result[length],
        value = object[key];

    result[length] = [key, value, isStrictComparable(value)];
  }
  return result;
}

module.exports = getMatchData;


/***/ }),
/* 190 */
/***/ (function(module, exports, __webpack_require__) {

var baseIsEqual = __webpack_require__(80),
    get = __webpack_require__(191),
    hasIn = __webpack_require__(86),
    isKey = __webpack_require__(62),
    isStrictComparable = __webpack_require__(83),
    matchesStrictComparable = __webpack_require__(84),
    toKey = __webpack_require__(15);

/** Used to compose bitmasks for value comparisons. */
var COMPARE_PARTIAL_FLAG = 1,
    COMPARE_UNORDERED_FLAG = 2;

/**
 * The base implementation of `_.matchesProperty` which doesn't clone `srcValue`.
 *
 * @private
 * @param {string} path The path of the property to get.
 * @param {*} srcValue The value to match.
 * @returns {Function} Returns the new spec function.
 */
function baseMatchesProperty(path, srcValue) {
  if (isKey(path) && isStrictComparable(srcValue)) {
    return matchesStrictComparable(toKey(path), srcValue);
  }
  return function(object) {
    var objValue = get(object, path);
    return (objValue === undefined && objValue === srcValue)
      ? hasIn(object, path)
      : baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG | COMPARE_UNORDERED_FLAG);
  };
}

module.exports = baseMatchesProperty;


/***/ }),
/* 191 */
/***/ (function(module, exports, __webpack_require__) {

var baseGet = __webpack_require__(61);

/**
 * Gets the value at `path` of `object`. If the resolved value is
 * `undefined`, the `defaultValue` is returned in its place.
 *
 * @static
 * @memberOf _
 * @since 3.7.0
 * @category Object
 * @param {Object} object The object to query.
 * @param {Array|string} path The path of the property to get.
 * @param {*} [defaultValue] The value returned for `undefined` resolved values.
 * @returns {*} Returns the resolved value.
 * @example
 *
 * var object = { 'a': [{ 'b': { 'c': 3 } }] };
 *
 * _.get(object, 'a[0].b.c');
 * // => 3
 *
 * _.get(object, ['a', '0', 'b', 'c']);
 * // => 3
 *
 * _.get(object, 'a.b.c', 'default');
 * // => 'default'
 */
function get(object, path, defaultValue) {
  var result = object == null ? undefined : baseGet(object, path);
  return result === undefined ? defaultValue : result;
}

module.exports = get;


/***/ }),
/* 192 */
/***/ (function(module, exports, __webpack_require__) {

var memoizeCapped = __webpack_require__(193);

/** Used to match property names within property paths. */
var reLeadingDot = /^\./,
    rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;

/** Used to match backslashes in property paths. */
var reEscapeChar = /\\(\\)?/g;

/**
 * Converts `string` to a property path array.
 *
 * @private
 * @param {string} string The string to convert.
 * @returns {Array} Returns the property path array.
 */
var stringToPath = memoizeCapped(function(string) {
  var result = [];
  if (reLeadingDot.test(string)) {
    result.push('');
  }
  string.replace(rePropName, function(match, number, quote, string) {
    result.push(quote ? string.replace(reEscapeChar, '$1') : (number || match));
  });
  return result;
});

module.exports = stringToPath;


/***/ }),
/* 193 */
/***/ (function(module, exports, __webpack_require__) {

var memoize = __webpack_require__(194);

/** Used as the maximum memoize cache size. */
var MAX_MEMOIZE_SIZE = 500;

/**
 * A specialized version of `_.memoize` which clears the memoized function's
 * cache when it exceeds `MAX_MEMOIZE_SIZE`.
 *
 * @private
 * @param {Function} func The function to have its output memoized.
 * @returns {Function} Returns the new memoized function.
 */
function memoizeCapped(func) {
  var result = memoize(func, function(key) {
    if (cache.size === MAX_MEMOIZE_SIZE) {
      cache.clear();
    }
    return key;
  });

  var cache = result.cache;
  return result;
}

module.exports = memoizeCapped;


/***/ }),
/* 194 */
/***/ (function(module, exports, __webpack_require__) {

var MapCache = __webpack_require__(60);

/** Error message constants. */
var FUNC_ERROR_TEXT = 'Expected a function';

/**
 * Creates a function that memoizes the result of `func`. If `resolver` is
 * provided, it determines the cache key for storing the result based on the
 * arguments provided to the memoized function. By default, the first argument
 * provided to the memoized function is used as the map cache key. The `func`
 * is invoked with the `this` binding of the memoized function.
 *
 * **Note:** The cache is exposed as the `cache` property on the memoized
 * function. Its creation may be customized by replacing the `_.memoize.Cache`
 * constructor with one whose instances implement the
 * [`Map`](http://ecma-international.org/ecma-262/7.0/#sec-properties-of-the-map-prototype-object)
 * method interface of `clear`, `delete`, `get`, `has`, and `set`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to have its output memoized.
 * @param {Function} [resolver] The function to resolve the cache key.
 * @returns {Function} Returns the new memoized function.
 * @example
 *
 * var object = { 'a': 1, 'b': 2 };
 * var other = { 'c': 3, 'd': 4 };
 *
 * var values = _.memoize(_.values);
 * values(object);
 * // => [1, 2]
 *
 * values(other);
 * // => [3, 4]
 *
 * object.a = 2;
 * values(object);
 * // => [1, 2]
 *
 * // Modify the result cache.
 * values.cache.set(object, ['a', 'b']);
 * values(object);
 * // => ['a', 'b']
 *
 * // Replace `_.memoize.Cache`.
 * _.memoize.Cache = WeakMap;
 */
function memoize(func, resolver) {
  if (typeof func != 'function' || (resolver != null && typeof resolver != 'function')) {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  var memoized = function() {
    var args = arguments,
        key = resolver ? resolver.apply(this, args) : args[0],
        cache = memoized.cache;

    if (cache.has(key)) {
      return cache.get(key);
    }
    var result = func.apply(this, args);
    memoized.cache = cache.set(key, result) || cache;
    return result;
  };
  memoized.cache = new (memoize.Cache || MapCache);
  return memoized;
}

// Expose `MapCache`.
memoize.Cache = MapCache;

module.exports = memoize;


/***/ }),
/* 195 */
/***/ (function(module, exports, __webpack_require__) {

var baseToString = __webpack_require__(196);

/**
 * Converts `value` to a string. An empty string is returned for `null`
 * and `undefined` values. The sign of `-0` is preserved.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 * @example
 *
 * _.toString(null);
 * // => ''
 *
 * _.toString(-0);
 * // => '-0'
 *
 * _.toString([1, 2, 3]);
 * // => '1,2,3'
 */
function toString(value) {
  return value == null ? '' : baseToString(value);
}

module.exports = toString;


/***/ }),
/* 196 */
/***/ (function(module, exports, __webpack_require__) {

var Symbol = __webpack_require__(13),
    arrayMap = __webpack_require__(85),
    isArray = __webpack_require__(1),
    isSymbol = __webpack_require__(63);

/** Used as references for various `Number` constants. */
var INFINITY = 1 / 0;

/** Used to convert symbols to primitives and strings. */
var symbolProto = Symbol ? Symbol.prototype : undefined,
    symbolToString = symbolProto ? symbolProto.toString : undefined;

/**
 * The base implementation of `_.toString` which doesn't convert nullish
 * values to empty strings.
 *
 * @private
 * @param {*} value The value to process.
 * @returns {string} Returns the string.
 */
function baseToString(value) {
  // Exit early for strings to avoid a performance hit in some environments.
  if (typeof value == 'string') {
    return value;
  }
  if (isArray(value)) {
    // Recursively convert values (susceptible to call stack limits).
    return arrayMap(value, baseToString) + '';
  }
  if (isSymbol(value)) {
    return symbolToString ? symbolToString.call(value) : '';
  }
  var result = (value + '');
  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
}

module.exports = baseToString;


/***/ }),
/* 197 */
/***/ (function(module, exports) {

/**
 * The base implementation of `_.hasIn` without support for deep paths.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {Array|string} key The key to check.
 * @returns {boolean} Returns `true` if `key` exists, else `false`.
 */
function baseHasIn(object, key) {
  return object != null && key in Object(object);
}

module.exports = baseHasIn;


/***/ }),
/* 198 */
/***/ (function(module, exports, __webpack_require__) {

var castPath = __webpack_require__(29),
    isArguments = __webpack_require__(52),
    isArray = __webpack_require__(1),
    isIndex = __webpack_require__(54),
    isLength = __webpack_require__(55),
    toKey = __webpack_require__(15);

/**
 * Checks if `path` exists on `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array|string} path The path to check.
 * @param {Function} hasFunc The function to check properties.
 * @returns {boolean} Returns `true` if `path` exists, else `false`.
 */
function hasPath(object, path, hasFunc) {
  path = castPath(path, object);

  var index = -1,
      length = path.length,
      result = false;

  while (++index < length) {
    var key = toKey(path[index]);
    if (!(result = object != null && hasFunc(object, key))) {
      break;
    }
    object = object[key];
  }
  if (result || ++index != length) {
    return result;
  }
  length = object == null ? 0 : object.length;
  return !!length && isLength(length) && isIndex(key, length) &&
    (isArray(object) || isArguments(object));
}

module.exports = hasPath;


/***/ }),
/* 199 */
/***/ (function(module, exports, __webpack_require__) {

var baseProperty = __webpack_require__(200),
    basePropertyDeep = __webpack_require__(201),
    isKey = __webpack_require__(62),
    toKey = __webpack_require__(15);

/**
 * Creates a function that returns the value at `path` of a given object.
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Util
 * @param {Array|string} path The path of the property to get.
 * @returns {Function} Returns the new accessor function.
 * @example
 *
 * var objects = [
 *   { 'a': { 'b': 2 } },
 *   { 'a': { 'b': 1 } }
 * ];
 *
 * _.map(objects, _.property('a.b'));
 * // => [2, 1]
 *
 * _.map(_.sortBy(objects, _.property(['a', 'b'])), 'a.b');
 * // => [1, 2]
 */
function property(path) {
  return isKey(path) ? baseProperty(toKey(path)) : basePropertyDeep(path);
}

module.exports = property;


/***/ }),
/* 200 */
/***/ (function(module, exports) {

/**
 * The base implementation of `_.property` without support for deep paths.
 *
 * @private
 * @param {string} key The key of the property to get.
 * @returns {Function} Returns the new accessor function.
 */
function baseProperty(key) {
  return function(object) {
    return object == null ? undefined : object[key];
  };
}

module.exports = baseProperty;


/***/ }),
/* 201 */
/***/ (function(module, exports, __webpack_require__) {

var baseGet = __webpack_require__(61);

/**
 * A specialized version of `baseProperty` which supports deep paths.
 *
 * @private
 * @param {Array|string} path The path of the property to get.
 * @returns {Function} Returns the new accessor function.
 */
function basePropertyDeep(path) {
  return function(object) {
    return baseGet(object, path);
  };
}

module.exports = basePropertyDeep;


/***/ }),
/* 202 */
/***/ (function(module, exports) {

/**
 * The base implementation of `_.reduce` and `_.reduceRight`, without support
 * for iteratee shorthands, which iterates over `collection` using `eachFunc`.
 *
 * @private
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @param {*} accumulator The initial value.
 * @param {boolean} initAccum Specify using the first or last element of
 *  `collection` as the initial value.
 * @param {Function} eachFunc The function to iterate over `collection`.
 * @returns {*} Returns the accumulated value.
 */
function baseReduce(collection, iteratee, accumulator, initAccum, eachFunc) {
  eachFunc(collection, function(value, index, collection) {
    accumulator = initAccum
      ? (initAccum = false, value)
      : iteratee(accumulator, value, index, collection);
  });
  return accumulator;
}

module.exports = baseReduce;


/***/ }),
/* 203 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _DOMMouseMoveTracker = __webpack_require__(46);

var _DOMMouseMoveTracker2 = _interopRequireDefault(_DOMMouseMoveTracker);

var _Locale = __webpack_require__(48);

var _Locale2 = _interopRequireDefault(_Locale);

var _React = __webpack_require__(0);

var _React2 = _interopRequireDefault(_React);

var _createReactClass = __webpack_require__(8);

var _createReactClass2 = _interopRequireDefault(_createReactClass);

var _propTypes = __webpack_require__(2);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _ReactComponentWithPureRenderMixin = __webpack_require__(20);

var _ReactComponentWithPureRenderMixin2 = _interopRequireDefault(_ReactComponentWithPureRenderMixin);

var _clamp = __webpack_require__(21);

var _clamp2 = _interopRequireDefault(_clamp);

var _cx = __webpack_require__(4);

var _cx2 = _interopRequireDefault(_cx);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Copyright Schrodinger, LLC
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * This is to be used with the FixedDataTable. It is a read line
 * that when you click on a column that is resizable appears and allows
 * you to resize the corresponding column.
 *
 * @providesModule FixedDataTableColumnResizeHandle
 * @typechecks
 */

var FixedDataTableColumnResizeHandle = (0, _createReactClass2.default)({
  displayName: 'FixedDataTableColumnResizeHandle',
  mixins: [_ReactComponentWithPureRenderMixin2.default],

  propTypes: {
    visible: _propTypes2.default.bool.isRequired,

    /**
     * This is the height of the line
     */
    height: _propTypes2.default.number.isRequired,

    /**
     * Offset from left border of the table, please note
     * that the line is a border on diff. So this is really the
     * offset of the column itself.
     */
    leftOffset: _propTypes2.default.number.isRequired,

    /**
     * Height of the clickable region of the line.
     * This is assumed to be at the top of the line.
     */
    knobHeight: _propTypes2.default.number.isRequired,

    /**
     * The line is a border on a diff, so this is essentially
     * the width of column.
     */
    initialWidth: _propTypes2.default.number,

    /**
     * The minimum width this dragger will collapse to
     */
    minWidth: _propTypes2.default.number,

    /**
     * The maximum width this dragger will collapse to
     */
    maxWidth: _propTypes2.default.number,

    /**
     * Initial click event on the header cell.
     */
    initialEvent: _propTypes2.default.object,

    /**
     * When resizing is complete this is called.
     */
    onColumnResizeEnd: _propTypes2.default.func,

    /**
     * Column key for the column being resized.
     */
    columnKey: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])
  },

  getInitialState: function getInitialState() /*object*/{
    return {
      width: 0,
      cursorDelta: 0
    };
  },
  componentWillReceiveProps: function componentWillReceiveProps( /*object*/newProps) {
    if (newProps.initialEvent && !this._mouseMoveTracker.isDragging()) {
      this._mouseMoveTracker.captureMouseMoves(newProps.initialEvent);
      this.setState({
        width: newProps.initialWidth,
        cursorDelta: newProps.initialWidth
      });
    }
  },
  componentDidMount: function componentDidMount() {
    this._mouseMoveTracker = new _DOMMouseMoveTracker2.default(this._onMove, this._onColumnResizeEnd, document.body);
  },
  componentWillUnmount: function componentWillUnmount() {
    this._mouseMoveTracker.releaseMouseMoves();
    this._mouseMoveTracker = null;
  },
  render: function render() /*object*/{
    var style = {
      width: this.state.width,
      height: this.props.height
    };
    if (_Locale2.default.isRTL()) {
      style.right = this.props.leftOffset;
    } else {
      style.left = this.props.leftOffset;
    }
    return _React2.default.createElement(
      'div',
      {
        className: (0, _cx2.default)({
          'fixedDataTableColumnResizerLineLayout/main': true,
          'fixedDataTableColumnResizerLineLayout/hiddenElem': !this.props.visible,
          'public/fixedDataTableColumnResizerLine/main': true
        }),
        style: style },
      _React2.default.createElement('div', {
        className: (0, _cx2.default)('fixedDataTableColumnResizerLineLayout/mouseArea'),
        style: { height: this.props.height }
      })
    );
  },
  _onMove: function _onMove( /*number*/deltaX) {
    if (_Locale2.default.isRTL()) {
      deltaX = -deltaX;
    }
    var newWidth = this.state.cursorDelta + deltaX;
    var newColumnWidth = (0, _clamp2.default)(newWidth, this.props.minWidth, this.props.maxWidth);

    // Please note cursor delta is the different between the currently width
    // and the new width.
    this.setState({
      width: newColumnWidth,
      cursorDelta: newWidth
    });
  },
  _onColumnResizeEnd: function _onColumnResizeEnd() {
    this._mouseMoveTracker.releaseMouseMoves();
    this.props.onColumnResizeEnd(this.state.width, this.props.columnKey);
  }
});

module.exports = FixedDataTableColumnResizeHandle;

/***/ }),
/* 204 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright Schrodinger, LLC
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * This is utility that handles touch events and calls provided touch
 * callback with correct frame rate.
 * Deceleration logic based on http://ariya.ofilabs.com/2013/11/javascript-kinetic-scrolling-part-2.html
 *
 * @providesModule ReactTouchHandler
 * @typechecks
 */



var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _emptyFunction = __webpack_require__(7);

var _emptyFunction2 = _interopRequireDefault(_emptyFunction);

var _requestAnimationFramePolyfill = __webpack_require__(47);

var _requestAnimationFramePolyfill2 = _interopRequireDefault(_requestAnimationFramePolyfill);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MOVE_AMPLITUDE = 1.6;
var DECELERATION_AMPLITUDE = 1.6;
var DECELERATION_FACTOR = 325;
var TRACKER_TIMEOUT = 100;

var ReactTouchHandler = function () {
  /**
   * onTouchScroll is the callback that will be called with right frame rate if
   * any touch events happened
   * onTouchScroll should is to be called with two arguments: deltaX and deltaY in
   * this order
   */
  function ReactTouchHandler(
  /*function*/onTouchScroll,
  /*boolean|function*/handleScrollX,
  /*boolean|function*/handleScrollY,
  /*?boolean|?function*/stopPropagation) {
    _classCallCheck(this, ReactTouchHandler);

    // The animation frame id for the drag scroll
    this._dragAnimationId = null;

    // The interval id for tracking the drag velocity
    this._trackerId = null;

    // Used to track the drag scroll delta while waiting for an animation frame
    this._deltaX = 0;
    this._deltaY = 0;

    // The last touch we processed while dragging.  Used to compute the delta and velocity above
    this._lastTouchX = 0;
    this._lastTouchY = 0;

    // Used to track a moving average of the scroll velocity while dragging
    this._velocityX = 0;
    this._velocityY = 0;

    // An accummulated drag scroll delta used to calculate velocity
    this._accumulatedDeltaX = 0;
    this._accumulatedDeltaY = 0;

    // Timestamp from the last interval frame we used to track velocity
    this._lastFrameTimestamp = Date.now();

    // Timestamp from the last animation frame we used to autoscroll after drag stop
    this._autoScrollTimestamp = Date.now();

    if (typeof handleScrollX !== 'function') {
      handleScrollX = handleScrollX ? _emptyFunction2.default.thatReturnsTrue : _emptyFunction2.default.thatReturnsFalse;
    }

    if (typeof handleScrollY !== 'function') {
      handleScrollY = handleScrollY ? _emptyFunction2.default.thatReturnsTrue : _emptyFunction2.default.thatReturnsFalse;
    }

    // TODO (jordan) Is configuring this necessary
    if (typeof stopPropagation !== 'function') {
      stopPropagation = stopPropagation ? _emptyFunction2.default.thatReturnsTrue : _emptyFunction2.default.thatReturnsFalse;
    }

    this._handleScrollX = handleScrollX;
    this._handleScrollY = handleScrollY;
    this._stopPropagation = stopPropagation;
    this._onTouchScrollCallback = onTouchScroll;

    this._didTouchMove = this._didTouchMove.bind(this);
    this._track = this._track.bind(this);
    this._autoScroll = this._autoScroll.bind(this);
    this._startAutoScroll = this._startAutoScroll.bind(this);
    this.onTouchStart = this.onTouchStart.bind(this);
    this.onTouchEnd = this.onTouchEnd.bind(this);
    this.onTouchMove = this.onTouchMove.bind(this);
    this.onTouchCancel = this.onTouchCancel.bind(this);
  }

  _createClass(ReactTouchHandler, [{
    key: 'onTouchStart',
    value: function onTouchStart( /*object*/event) {
      // Start tracking drag delta for scrolling
      this._lastTouchX = event.touches[0].pageX;
      this._lastTouchY = event.touches[0].pageY;

      // Reset our velocity and intermediate data used to compute velocity
      this._velocityX = 0;
      this._velocityY = 0;
      this._accumulatedDeltaX = 0;
      this._accumulatedDeltaY = 0;
      this._lastFrameTimestamp = Date.now();

      // Setup interval for tracking velocity
      clearInterval(this._trackerId);
      this._trackerId = setInterval(this._track, TRACKER_TIMEOUT);

      if (this._stopPropagation()) {
        event.stopPropagation();
      }
    }
  }, {
    key: 'onTouchEnd',
    value: function onTouchEnd( /*object*/event) {

      // Stop tracking velocity
      clearInterval(this._trackerId);
      this._trackerId = null;

      // Initialize decelerating autoscroll on drag stop
      (0, _requestAnimationFramePolyfill2.default)(this._startAutoScroll);

      if (this._stopPropagation()) {
        event.stopPropagation();
      }
    }
  }, {
    key: 'onTouchCancel',
    value: function onTouchCancel( /*object*/event) {

      // Stop tracking velocity
      clearInterval(this._trackerId);
      this._trackerId = null;

      if (this._stopPropagation()) {
        event.stopPropagation();
      }
    }
  }, {
    key: 'onTouchMove',
    value: function onTouchMove( /*object*/event) {
      var moveX = event.touches[0].pageX;
      var moveY = event.touches[0].pageY;

      // Compute delta scrolled since last drag
      // Mobile, scrolling is inverted
      this._deltaX = MOVE_AMPLITUDE * (this._lastTouchX - moveX);
      this._deltaY = MOVE_AMPLITUDE * (this._lastTouchY - moveY);

      var handleScrollX = this._handleScrollX(this._deltaX, this._deltaY);
      var handleScrollY = this._handleScrollY(this._deltaY, this._deltaX);
      if (!handleScrollX && !handleScrollY) {
        return;
      }

      // If we can handle scroll update last touch for computing delta
      if (handleScrollX) {
        this._lastTouchX = moveX;
      } else {
        this._deltaX = 0;
      }
      if (handleScrollY) {
        this._lastTouchY = moveY;
      } else {
        this._deltaY = 0;
      }

      event.preventDefault();

      // Ensure minimum delta magnitude is met to avoid jitter
      var changed = false;
      if (Math.abs(this._deltaX) > 2 || Math.abs(this._deltaY) > 2) {
        if (this._stopPropagation()) {
          event.stopPropagation();
        }
        changed = true;
      }

      // Request animation frame to trigger scroll of computed delta
      if (changed === true && this._dragAnimationId === null) {
        this._dragAnimationId = (0, _requestAnimationFramePolyfill2.default)(this._didTouchMove);
      }
    }

    /**
     * Fire scroll callback based on computed drag delta.
     * Also track accummulated delta so we can calculate velocity
     */

  }, {
    key: '_didTouchMove',
    value: function _didTouchMove() {
      this._dragAnimationId = null;

      this._onTouchScrollCallback(this._deltaX, this._deltaY);
      this._accumulatedDeltaX += this._deltaX;
      this._accumulatedDeltaY += this._deltaY;
      this._deltaX = 0;
      this._deltaY = 0;
    }

    /**
     * Compute velocity based on a weighted average of drag over last 100 ms and
     * previous velocity.  Combining into a moving average results in a smoother scroll.
     */

  }, {
    key: '_track',
    value: function _track() {
      var now = Date.now();
      var elapsed = now - this._lastFrameTimestamp;
      var oldVelocityX = this._velocityX;
      var oldVelocityY = this._velocityY;

      // We compute velocity using a weighted average of the current velocity and the previous velocity
      // If the previous velocity is 0, put the full weight on the last 100 ms
      var weight = 0.8;
      if (elapsed < TRACKER_TIMEOUT) {
        weight *= elapsed / TRACKER_TIMEOUT;
      }
      if (oldVelocityX === 0 && oldVelocityY === 0) {
        weight = 1;
      }

      // Formula for computing weighted average of velocity
      this._velocityX = weight * (TRACKER_TIMEOUT * this._accumulatedDeltaX / (1 + elapsed));
      if (weight < 1) {
        this._velocityX += (1 - weight) * oldVelocityX;
      }

      this._velocityY = weight * (TRACKER_TIMEOUT * this._accumulatedDeltaY / (1 + elapsed));
      if (weight < 1) {
        this._velocityY += (1 - weight) * oldVelocityY;
      }

      this._accumulatedDeltaX = 0;
      this._accumulatedDeltaY = 0;
      this._lastFrameTimestamp = now;
    }

    /**
     * To kick off deceleration / momentum scrolling,
     * handle any scrolling from a drag which was waiting for an animation frame
     * Then update our velocity
     * Finally start the momentum scrolling handler (autoScroll)
     */

  }, {
    key: '_startAutoScroll',
    value: function _startAutoScroll() {
      this._autoScrollTimestamp = Date.now();
      if (this._deltaX > 0 || this.deltaY > 0) {
        this._didTouchMove();
      }
      this._track();
      this._autoScroll();
    }

    /**
     * Compute a scroll delta with an exponential decay based on time elapsed since drag was released.
     * This is called recursively on animation frames until the delta is below a threshold (5 pixels)
     */

  }, {
    key: '_autoScroll',
    value: function _autoScroll() {
      var elapsed = Date.now() - this._autoScrollTimestamp;
      var factor = DECELERATION_AMPLITUDE * Math.exp(-elapsed / DECELERATION_FACTOR);
      var deltaX = factor * this._velocityX;
      var deltaY = factor * this._velocityY;

      if (Math.abs(deltaX) <= 5 || !this._handleScrollX(deltaX, deltaY)) {
        deltaX = 0;
      }
      if (Math.abs(deltaY) <= 5 || !this._handleScrollY(deltaY, deltaX)) {
        deltaY = 0;
      }

      if (deltaX !== 0 || deltaY !== 0) {
        this._onTouchScrollCallback(deltaX, deltaY);
        (0, _requestAnimationFramePolyfill2.default)(this._autoScroll);
      }
    }
  }]);

  return ReactTouchHandler;
}();

module.exports = ReactTouchHandler;

/***/ }),
/* 205 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright Schrodinger, LLC
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule normalizeWheel
 * @typechecks
 */



var _UserAgent_DEPRECATED = __webpack_require__(206);

var _UserAgent_DEPRECATED2 = _interopRequireDefault(_UserAgent_DEPRECATED);

var _isEventSupported = __webpack_require__(207);

var _isEventSupported2 = _interopRequireDefault(_isEventSupported);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Reasonable defaults
var PIXEL_STEP = 10;
var LINE_HEIGHT = 40;
var PAGE_HEIGHT = 800;

/**
 * Mouse wheel (and 2-finger trackpad) support on the web sucks.  It is
 * complicated, thus this doc is long and (hopefully) detailed enough to answer
 * your questions.
 *
 * If you need to react to the mouse wheel in a predictable way, this code is
 * like your bestest friend. * hugs *
 *
 * As of today, there are 4 DOM event types you can listen to:
 *
 *   'wheel'                -- Chrome(31+), FF(17+), IE(9+)
 *   'mousewheel'           -- Chrome, IE(6+), Opera, Safari
 *   'MozMousePixelScroll'  -- FF(3.5 only!) (2010-2013) -- don't bother!
 *   'DOMMouseScroll'       -- FF(0.9.7+) since 2003
 *
 * So what to do?  The is the best:
 *
 *   normalizeWheel.getEventType();
 *
 * In your event callback, use this code to get sane interpretation of the
 * deltas.  This code will return an object with properties:
 *
 *   spinX   -- normalized spin speed (use for zoom) - x plane
 *   spinY   -- " - y plane
 *   pixelX  -- normalized distance (to pixels) - x plane
 *   pixelY  -- " - y plane
 *
 * Wheel values are provided by the browser assuming you are using the wheel to
 * scroll a web page by a number of lines or pixels (or pages).  Values can vary
 * significantly on different platforms and browsers, forgetting that you can
 * scroll at different speeds.  Some devices (like trackpads) emit more events
 * at smaller increments with fine granularity, and some emit massive jumps with
 * linear speed or acceleration.
 *
 * This code does its best to normalize the deltas for you:
 *
 *   - spin is trying to normalize how far the wheel was spun (or trackpad
 *     dragged).  This is super useful for zoom support where you want to
 *     throw away the chunky scroll steps on the PC and make those equal to
 *     the slow and smooth tiny steps on the Mac. Key data: This code tries to
 *     resolve a single slow step on a wheel to 1.
 *
 *   - pixel is normalizing the desired scroll delta in pixel units.  You'll
 *     get the crazy differences between browsers, but at least it'll be in
 *     pixels!
 *
 *   - positive value indicates scrolling DOWN/RIGHT, negative UP/LEFT.  This
 *     should translate to positive value zooming IN, negative zooming OUT.
 *     This matches the newer 'wheel' event.
 *
 * Why are there spinX, spinY (or pixels)?
 *
 *   - spinX is a 2-finger side drag on the trackpad, and a shift + wheel turn
 *     with a mouse.  It results in side-scrolling in the browser by default.
 *
 *   - spinY is what you expect -- it's the classic axis of a mouse wheel.
 *
 *   - I dropped spinZ/pixelZ.  It is supported by the DOM 3 'wheel' event and
 *     probably is by browsers in conjunction with fancy 3D controllers .. but
 *     you know.
 *
 * Implementation info:
 *
 * Examples of 'wheel' event if you scroll slowly (down) by one step with an
 * average mouse:
 *
 *   OS X + Chrome  (mouse)     -    4   pixel delta  (wheelDelta -120)
 *   OS X + Safari  (mouse)     -  N/A   pixel delta  (wheelDelta  -12)
 *   OS X + Firefox (mouse)     -    0.1 line  delta  (wheelDelta  N/A)
 *   Win8 + Chrome  (mouse)     -  100   pixel delta  (wheelDelta -120)
 *   Win8 + Firefox (mouse)     -    3   line  delta  (wheelDelta -120)
 *
 * On the trackpad:
 *
 *   OS X + Chrome  (trackpad)  -    2   pixel delta  (wheelDelta   -6)
 *   OS X + Firefox (trackpad)  -    1   pixel delta  (wheelDelta  N/A)
 *
 * On other/older browsers.. it's more complicated as there can be multiple and
 * also missing delta values.
 *
 * The 'wheel' event is more standard:
 *
 * http://www.w3.org/TR/DOM-Level-3-Events/#events-wheelevents
 *
 * The basics is that it includes a unit, deltaMode (pixels, lines, pages), and
 * deltaX, deltaY and deltaZ.  Some browsers provide other values to maintain
 * backward compatibility with older events.  Those other values help us
 * better normalize spin speed.  Example of what the browsers provide:
 *
 *                          | event.wheelDelta | event.detail
 *        ------------------+------------------+--------------
 *          Safari v5/OS X  |       -120       |       0
 *          Safari v5/Win7  |       -120       |       0
 *         Chrome v17/OS X  |       -120       |       0
 *         Chrome v17/Win7  |       -120       |       0
 *                IE9/Win7  |       -120       |   undefined
 *         Firefox v4/OS X  |     undefined    |       1
 *         Firefox v4/Win7  |     undefined    |       3
 *
 */
function normalizeWheel( /*object*/event) /*object*/{
  var sX = 0,
      sY = 0,
      // spinX, spinY
  pX = 0,
      pY = 0; // pixelX, pixelY

  // Legacy
  if ('detail' in event) {
    sY = event.detail;
  }
  if ('wheelDelta' in event) {
    sY = -event.wheelDelta / 120;
  }
  if ('wheelDeltaY' in event) {
    sY = -event.wheelDeltaY / 120;
  }
  if ('wheelDeltaX' in event) {
    sX = -event.wheelDeltaX / 120;
  }

  // side scrolling on FF with DOMMouseScroll
  if ('axis' in event && event.axis === event.HORIZONTAL_AXIS) {
    sX = sY;
    sY = 0;
  }

  pX = sX * PIXEL_STEP;
  pY = sY * PIXEL_STEP;

  if ('deltaY' in event) {
    pY = event.deltaY;
  }
  if ('deltaX' in event) {
    pX = event.deltaX;
  }

  if ((pX || pY) && event.deltaMode) {
    if (event.deltaMode == 1) {
      // delta in LINE units
      pX *= LINE_HEIGHT;
      pY *= LINE_HEIGHT;
    } else {
      // delta in PAGE units
      pX *= PAGE_HEIGHT;
      pY *= PAGE_HEIGHT;
    }
  }

  // Fall-back if spin cannot be determined
  if (pX && !sX) {
    sX = pX < 1 ? -1 : 1;
  }
  if (pY && !sY) {
    sY = pY < 1 ? -1 : 1;
  }

  return { spinX: sX,
    spinY: sY,
    pixelX: pX,
    pixelY: pY };
}

/**
 * The best combination if you prefer spinX + spinY normalization.  It favors
 * the older DOMMouseScroll for Firefox, as FF does not include wheelDelta with
 * 'wheel' event, making spin speed determination impossible.
 */
normalizeWheel.getEventType = function () /*string*/{
  return _UserAgent_DEPRECATED2.default.firefox() ? 'DOMMouseScroll' : (0, _isEventSupported2.default)('wheel') ? 'wheel' : 'mousewheel';
};

module.exports = normalizeWheel;

/***/ }),
/* 206 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Copyright Schrodinger, LLC
 *
 * @providesModule UserAgent_DEPRECATED
 */

/**
 *  Provides entirely client-side User Agent and OS detection. You should prefer
 *  the non-deprecated UserAgent module when possible, which exposes our
 *  authoritative server-side PHP-based detection to the client.
 *
 *  Usage is straightforward:
 *
 *    if (UserAgent_DEPRECATED.ie()) {
 *      //  IE
 *    }
 *
 *  You can also do version checks:
 *
 *    if (UserAgent_DEPRECATED.ie() >= 7) {
 *      //  IE7 or better
 *    }
 *
 *  The browser functions will return NaN if the browser does not match, so
 *  you can also do version compares the other way:
 *
 *    if (UserAgent_DEPRECATED.ie() < 7) {
 *      //  IE6 or worse
 *    }
 *
 *  Note that the version is a float and may include a minor version number,
 *  so you should always use range operators to perform comparisons, not
 *  strict equality.
 *
 *  **Note:** You should **strongly** prefer capability detection to browser
 *  version detection where it's reasonable:
 *
 *    http://www.quirksmode.org/js/support.html
 *
 *  Further, we have a large number of mature wrapper functions and classes
 *  which abstract away many browser irregularities. Check the documentation,
 *  grep for things, or ask on javascript@lists.facebook.com before writing yet
 *  another copy of "event || window.event".
 *
 */

var _populated = false;

// Browsers
var _ie, _firefox, _opera, _webkit, _chrome;

// Actual IE browser for compatibility mode
var _ie_real_version;

// Platforms
var _osx, _windows, _linux, _android;

// Architectures
var _win64;

// Devices
var _iphone, _ipad, _native;

var _mobile;

function _populate() {
  if (_populated) {
    return;
  }

  _populated = true;

  // To work around buggy JS libraries that can't handle multi-digit
  // version numbers, Opera 10's user agent string claims it's Opera
  // 9, then later includes a Version/X.Y field:
  //
  // Opera/9.80 (foo) Presto/2.2.15 Version/10.10
  var uas = navigator.userAgent;
  var agent = /(?:MSIE.(\d+\.\d+))|(?:(?:Firefox|GranParadiso|Iceweasel).(\d+\.\d+))|(?:Opera(?:.+Version.|.)(\d+\.\d+))|(?:AppleWebKit.(\d+(?:\.\d+)?))|(?:Trident\/\d+\.\d+.*rv:(\d+\.\d+))/.exec(uas);
  var os = /(Mac OS X)|(Windows)|(Linux)/.exec(uas);

  _iphone = /\b(iPhone|iP[ao]d)/.exec(uas);
  _ipad = /\b(iP[ao]d)/.exec(uas);
  _android = /Android/i.exec(uas);
  _native = /FBAN\/\w+;/i.exec(uas);
  _mobile = /Mobile/i.exec(uas);

  // Note that the IE team blog would have you believe you should be checking
  // for 'Win64; x64'.  But MSDN then reveals that you can actually be coming
  // from either x64 or ia64;  so ultimately, you should just check for Win64
  // as in indicator of whether you're in 64-bit IE.  32-bit IE on 64-bit
  // Windows will send 'WOW64' instead.
  _win64 = !!/Win64/.exec(uas);

  if (agent) {
    _ie = agent[1] ? parseFloat(agent[1]) : agent[5] ? parseFloat(agent[5]) : NaN;
    // IE compatibility mode
    if (_ie && document && document.documentMode) {
      _ie = document.documentMode;
    }
    // grab the "true" ie version from the trident token if available
    var trident = /(?:Trident\/(\d+.\d+))/.exec(uas);
    _ie_real_version = trident ? parseFloat(trident[1]) + 4 : _ie;

    _firefox = agent[2] ? parseFloat(agent[2]) : NaN;
    _opera = agent[3] ? parseFloat(agent[3]) : NaN;
    _webkit = agent[4] ? parseFloat(agent[4]) : NaN;
    if (_webkit) {
      // We do not add the regexp to the above test, because it will always
      // match 'safari' only since 'AppleWebKit' appears before 'Chrome' in
      // the userAgent string.
      agent = /(?:Chrome\/(\d+\.\d+))/.exec(uas);
      _chrome = agent && agent[1] ? parseFloat(agent[1]) : NaN;
    } else {
      _chrome = NaN;
    }
  } else {
    _ie = _firefox = _opera = _chrome = _webkit = NaN;
  }

  if (os) {
    if (os[1]) {
      // Detect OS X version.  If no version number matches, set _osx to true.
      // Version examples:  10, 10_6_1, 10.7
      // Parses version number as a float, taking only first two sets of
      // digits.  If only one set of digits is found, returns just the major
      // version number.
      var ver = /(?:Mac OS X (\d+(?:[._]\d+)?))/.exec(uas);

      _osx = ver ? parseFloat(ver[1].replace('_', '.')) : true;
    } else {
      _osx = false;
    }
    _windows = !!os[2];
    _linux = !!os[3];
  } else {
    _osx = _windows = _linux = false;
  }
}

var UserAgent_DEPRECATED = {

  /**
   *  Check if the UA is Internet Explorer.
   *
   *
   *  @return float|NaN Version number (if match) or NaN.
   */
  ie: function ie() {
    return _populate() || _ie;
  },

  /**
   * Check if we're in Internet Explorer compatibility mode.
   *
   * @return bool true if in compatibility mode, false if
   * not compatibility mode or not ie
   */
  ieCompatibilityMode: function ieCompatibilityMode() {
    return _populate() || _ie_real_version > _ie;
  },

  /**
   * Whether the browser is 64-bit IE.  Really, this is kind of weak sauce;  we
   * only need this because Skype can't handle 64-bit IE yet.  We need to remove
   * this when we don't need it -- tracked by #601957.
   */
  ie64: function ie64() {
    return UserAgent_DEPRECATED.ie() && _win64;
  },

  /**
   *  Check if the UA is Firefox.
   *
   *
   *  @return float|NaN Version number (if match) or NaN.
   */
  firefox: function firefox() {
    return _populate() || _firefox;
  },

  /**
   *  Check if the UA is Opera.
   *
   *
   *  @return float|NaN Version number (if match) or NaN.
   */
  opera: function opera() {
    return _populate() || _opera;
  },

  /**
   *  Check if the UA is WebKit.
   *
   *
   *  @return float|NaN Version number (if match) or NaN.
   */
  webkit: function webkit() {
    return _populate() || _webkit;
  },

  /**
   *  For Push
   *  WILL BE REMOVED VERY SOON. Use UserAgent_DEPRECATED.webkit
   */
  safari: function safari() {
    return UserAgent_DEPRECATED.webkit();
  },

  /**
   *  Check if the UA is a Chrome browser.
   *
   *
   *  @return float|NaN Version number (if match) or NaN.
   */
  chrome: function chrome() {
    return _populate() || _chrome;
  },

  /**
   *  Check if the user is running Windows.
   *
   *  @return bool `true' if the user's OS is Windows.
   */
  windows: function windows() {
    return _populate() || _windows;
  },

  /**
   *  Check if the user is running Mac OS X.
   *
   *  @return float|bool   Returns a float if a version number is detected,
   *                       otherwise true/false.
   */
  osx: function osx() {
    return _populate() || _osx;
  },

  /**
   * Check if the user is running Linux.
   *
   * @return bool `true' if the user's OS is some flavor of Linux.
   */
  linux: function linux() {
    return _populate() || _linux;
  },

  /**
   * Check if the user is running on an iPhone or iPod platform.
   *
   * @return bool `true' if the user is running some flavor of the
   *    iPhone OS.
   */
  iphone: function iphone() {
    return _populate() || _iphone;
  },

  mobile: function mobile() {
    return _populate() || _iphone || _ipad || _android || _mobile;
  },

  nativeApp: function nativeApp() {
    // webviews inside of the native apps
    return _populate() || _native;
  },

  android: function android() {
    return _populate() || _android;
  },

  ipad: function ipad() {
    return _populate() || _ipad;
  }
};

module.exports = UserAgent_DEPRECATED;

/***/ }),
/* 207 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright Schrodinger, LLC
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule isEventSupported
 */



var _ExecutionEnvironment = __webpack_require__(73);

var _ExecutionEnvironment2 = _interopRequireDefault(_ExecutionEnvironment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var useHasFeature;
if (_ExecutionEnvironment2.default.canUseDOM) {
  useHasFeature = document.implementation && document.implementation.hasFeature &&
  // always returns true in newer browsers as per the standard.
  // @see http://dom.spec.whatwg.org/#dom-domimplementation-hasfeature
  document.implementation.hasFeature('', '') !== true;
}

/**
 * Checks if an event is supported in the current execution environment.
 *
 * NOTE: This will not work correctly for non-generic events such as `change`,
 * `reset`, `load`, `error`, and `select`.
 *
 * Borrows from Modernizr.
 *
 * @param {string} eventNameSuffix Event name, e.g. "click".
 * @param {?boolean} capture Check if the capture phase is supported.
 * @return {boolean} True if the event is supported.
 * @internal
 * @license Modernizr 3.0.0pre (Custom Build) | MIT
 */
function isEventSupported(eventNameSuffix, capture) {
  if (!_ExecutionEnvironment2.default.canUseDOM || capture && !('addEventListener' in document)) {
    return false;
  }

  var eventName = 'on' + eventNameSuffix;
  var isSupported = eventName in document;

  if (!isSupported) {
    var element = document.createElement('div');
    element.setAttribute(eventName, 'return;');
    isSupported = typeof element[eventName] === 'function';
  }

  if (!isSupported && useHasFeature && eventNameSuffix === 'wheel') {
    // This is the only way to test support for the `wheel` event in IE9+.
    isSupported = document.implementation.hasFeature('Events.wheel', '3.0');
  }

  return isSupported;
}

module.exports = isEventSupported;

/***/ }),
/* 208 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Copyright Schrodinger, LLC
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule Keys
 */

module.exports = {
  BACKSPACE: 8,
  TAB: 9,
  RETURN: 13,
  ALT: 18,
  ESC: 27,
  SPACE: 32,
  PAGE_UP: 33,
  PAGE_DOWN: 34,
  END: 35,
  HOME: 36,
  LEFT: 37,
  UP: 38,
  RIGHT: 39,
  DOWN: 40,
  DELETE: 46,
  COMMA: 188,
  PERIOD: 190,
  A: 65,
  Z: 90,
  ZERO: 48,
  NUMPAD_0: 96,
  NUMPAD_9: 105
};

/***/ }),
/* 209 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Copyright Schrodinger, LLC
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule ReactDOM
 */

module.exports = __webpack_require__(210);

/***/ }),
/* 210 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_210__;

/***/ }),
/* 211 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright Schrodinger, LLC
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule cssVar
 * @typechecks
 */



// If you change these, you'll need to restart the dev server for it to take effect.

var CSS_VARS = {
  'scrollbar-face-active-color': '#7d7d7d',
  'scrollbar-face-color': '#c2c2c2',
  'scrollbar-face-margin': '4px',
  'scrollbar-face-radius': '6px',
  'scrollbar-size': '15px',
  'scrollbar-size-large': '17px',
  'scrollbar-track-color': '#fff',
  'border-color': '#d3d3d3',
  'fbui-white': '#fff',
  'fbui-desktop-background-light': '#f6f7f8'
};

/**
 * @param {string} name
 */
function cssVar(name) {
  if (CSS_VARS.hasOwnProperty(name)) {
    return CSS_VARS[name];
  }

  throw new Error('cssVar' + '("' + name + '"): Unexpected class transformation.');
}

cssVar.CSS_VARS = CSS_VARS;

module.exports = cssVar;

/***/ }),
/* 212 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _columnWidths = __webpack_require__(88);

var _columnWidths2 = _interopRequireDefault(_columnWidths);

var _forEach = __webpack_require__(65);

var _forEach2 = _interopRequireDefault(_forEach);

var _shallowEqualSelector = __webpack_require__(17);

var _shallowEqualSelector2 = _interopRequireDefault(_shallowEqualSelector);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @typedef {{
 *   props: !Object,
 *   template: ReactElement,
 * }}
 */
var cellDetails = void 0;

/**
 * @typedef {{
 *   cell: !Array.<cellDetails>,
 *   footer: !Array.<cellDetails>,
 *   header: !Array.<cellDetails>,
 * }}
 */
/**
 * Copyright Schrodinger, LLC
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule columnTemplates
 */
var columnDetails = void 0;

/**
 * Lists of cell templates & component props for
 * the fixed and scrollable columns and column groups
 *
 * @param {{
 *   columnGroupProps: !Array.<!Object>,
 *   columnProps: !Array.<!Object>,
 *   }>,
 * }} columnWidths
 * @param {{
 *   cell: !Array.<ReactElement>,
 *   footer: !Array.<ReactElement>,
 *   groupHeader !Array.<ReactElement>,
 *   header !Array.<ReactElement>,
 * }} elementTemplates
 * @return {{
 *   fixedColumnGroups: !Array.<cellDetails>,
 *   scrollableColumnGroups: !Array.<cellDetails>,
 *   fixedColumns: !Array.<columnDetails>,
 *   scrollableColumns: !Array.<columnDetails>,
 * }}
 */
function columnTemplates(columnWidths, elementTemplates) {
  var columnGroupProps = columnWidths.columnGroupProps,
      columnProps = columnWidths.columnProps;

  // Ugly transforms to extract data into a row consumable format.
  // TODO (jordan) figure out if this can efficiently be merged with
  // the result of convertColumnElementsToData.

  var fixedColumnGroups = [];
  var scrollableColumnGroups = [];
  (0, _forEach2.default)(columnGroupProps, function (columnGroup, index) {
    var groupData = {
      props: columnGroup,
      template: elementTemplates.groupHeader[index]
    };
    if (columnGroup.fixed) {
      fixedColumnGroups.push(groupData);
    } else {
      scrollableColumnGroups.push(groupData);
    }
  });

  var fixedColumns = {
    cell: [],
    header: [],
    footer: []
  };
  var scrollableColumns = {
    cell: [],
    header: [],
    footer: []
  };
  (0, _forEach2.default)(columnProps, function (column, index) {
    var columnContainer = scrollableColumns;
    if (column.fixed) {
      columnContainer = fixedColumns;
    }

    columnContainer.cell.push({
      props: column,
      template: elementTemplates.cell[index]
    });
    columnContainer.header.push({
      props: column,
      template: elementTemplates.header[index]
    });
    columnContainer.footer.push({
      props: column,
      template: elementTemplates.footer[index]
    });
  });

  return {
    fixedColumnGroups: fixedColumnGroups,
    fixedColumns: fixedColumns,
    scrollableColumnGroups: scrollableColumnGroups,
    scrollableColumns: scrollableColumns
  };
}

exports.default = (0, _shallowEqualSelector2.default)([function (state) {
  return (0, _columnWidths2.default)(state);
}, function (state) {
  return state.elementTemplates;
}], columnTemplates);

/***/ }),
/* 213 */
/***/ (function(module, exports) {

/**
 * A specialized version of `_.forEach` for arrays without support for
 * iteratee shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns `array`.
 */
function arrayEach(array, iteratee) {
  var index = -1,
      length = array == null ? 0 : array.length;

  while (++index < length) {
    if (iteratee(array[index], index, array) === false) {
      break;
    }
  }
  return array;
}

module.exports = arrayEach;


/***/ }),
/* 214 */
/***/ (function(module, exports, __webpack_require__) {

var identity = __webpack_require__(64);

/**
 * Casts `value` to `identity` if it's not a function.
 *
 * @private
 * @param {*} value The value to inspect.
 * @returns {Function} Returns cast function.
 */
function castFunction(value) {
  return typeof value == 'function' ? value : identity;
}

module.exports = castFunction;


/***/ }),
/* 215 */
/***/ (function(module, exports, __webpack_require__) {

var baseEach = __webpack_require__(23),
    isArrayLike = __webpack_require__(56);

/**
 * The base implementation of `_.map` without support for iteratee shorthands.
 *
 * @private
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the new mapped array.
 */
function baseMap(collection, iteratee) {
  var index = -1,
      result = isArrayLike(collection) ? Array(collection.length) : [];

  baseEach(collection, function(value, key, collection) {
    result[++index] = iteratee(value, key, collection);
  });
  return result;
}

module.exports = baseMap;


/***/ }),
/* 216 */
/***/ (function(module, exports, __webpack_require__) {

var createAggregator = __webpack_require__(217);

/**
 * Creates an array of elements split into two groups, the first of which
 * contains elements `predicate` returns truthy for, the second of which
 * contains elements `predicate` returns falsey for. The predicate is
 * invoked with one argument: (value).
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Collection
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function} [predicate=_.identity] The function invoked per iteration.
 * @returns {Array} Returns the array of grouped elements.
 * @example
 *
 * var users = [
 *   { 'user': 'barney',  'age': 36, 'active': false },
 *   { 'user': 'fred',    'age': 40, 'active': true },
 *   { 'user': 'pebbles', 'age': 1,  'active': false }
 * ];
 *
 * _.partition(users, function(o) { return o.active; });
 * // => objects for [['fred'], ['barney', 'pebbles']]
 *
 * // The `_.matches` iteratee shorthand.
 * _.partition(users, { 'age': 1, 'active': false });
 * // => objects for [['pebbles'], ['barney', 'fred']]
 *
 * // The `_.matchesProperty` iteratee shorthand.
 * _.partition(users, ['active', false]);
 * // => objects for [['barney', 'pebbles'], ['fred']]
 *
 * // The `_.property` iteratee shorthand.
 * _.partition(users, 'active');
 * // => objects for [['fred'], ['barney', 'pebbles']]
 */
var partition = createAggregator(function(result, value, key) {
  result[key ? 0 : 1].push(value);
}, function() { return [[], []]; });

module.exports = partition;


/***/ }),
/* 217 */
/***/ (function(module, exports, __webpack_require__) {

var arrayAggregator = __webpack_require__(218),
    baseAggregator = __webpack_require__(219),
    baseIteratee = __webpack_require__(57),
    isArray = __webpack_require__(1);

/**
 * Creates a function like `_.groupBy`.
 *
 * @private
 * @param {Function} setter The function to set accumulator values.
 * @param {Function} [initializer] The accumulator object initializer.
 * @returns {Function} Returns the new aggregator function.
 */
function createAggregator(setter, initializer) {
  return function(collection, iteratee) {
    var func = isArray(collection) ? arrayAggregator : baseAggregator,
        accumulator = initializer ? initializer() : {};

    return func(collection, setter, baseIteratee(iteratee, 2), accumulator);
  };
}

module.exports = createAggregator;


/***/ }),
/* 218 */
/***/ (function(module, exports) {

/**
 * A specialized version of `baseAggregator` for arrays.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} setter The function to set `accumulator` values.
 * @param {Function} iteratee The iteratee to transform keys.
 * @param {Object} accumulator The initial aggregated object.
 * @returns {Function} Returns `accumulator`.
 */
function arrayAggregator(array, setter, iteratee, accumulator) {
  var index = -1,
      length = array == null ? 0 : array.length;

  while (++index < length) {
    var value = array[index];
    setter(accumulator, value, iteratee(value), array);
  }
  return accumulator;
}

module.exports = arrayAggregator;


/***/ }),
/* 219 */
/***/ (function(module, exports, __webpack_require__) {

var baseEach = __webpack_require__(23);

/**
 * Aggregates elements of `collection` on `accumulator` with keys transformed
 * by `iteratee` and values set by `setter`.
 *
 * @private
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function} setter The function to set `accumulator` values.
 * @param {Function} iteratee The iteratee to transform keys.
 * @param {Object} accumulator The initial aggregated object.
 * @returns {Function} Returns `accumulator`.
 */
function baseAggregator(collection, setter, iteratee, accumulator) {
  baseEach(collection, function(value, key, collection) {
    setter(accumulator, value, iteratee(value), collection);
  });
  return accumulator;
}

module.exports = baseAggregator;


/***/ }),
/* 220 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.defaultMemoize = defaultMemoize;
exports.createSelectorCreator = createSelectorCreator;
exports.createStructuredSelector = createStructuredSelector;
function defaultEqualityCheck(a, b) {
  return a === b;
}

function areArgumentsShallowlyEqual(equalityCheck, prev, next) {
  if (prev === null || next === null || prev.length !== next.length) {
    return false;
  }

  // Do this in a for loop (and not a `forEach` or an `every`) so we can determine equality as fast as possible.
  var length = prev.length;
  for (var i = 0; i < length; i++) {
    if (!equalityCheck(prev[i], next[i])) {
      return false;
    }
  }

  return true;
}

function defaultMemoize(func) {
  var equalityCheck = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : defaultEqualityCheck;

  var lastArgs = null;
  var lastResult = null;
  // we reference arguments instead of spreading them for performance reasons
  return function () {
    if (!areArgumentsShallowlyEqual(equalityCheck, lastArgs, arguments)) {
      // apply arguments instead of spreading for performance.
      lastResult = func.apply(null, arguments);
    }

    lastArgs = arguments;
    return lastResult;
  };
}

function getDependencies(funcs) {
  var dependencies = Array.isArray(funcs[0]) ? funcs[0] : funcs;

  if (!dependencies.every(function (dep) {
    return typeof dep === 'function';
  })) {
    var dependencyTypes = dependencies.map(function (dep) {
      return typeof dep;
    }).join(', ');
    throw new Error('Selector creators expect all input-selectors to be functions, ' + ('instead received the following types: [' + dependencyTypes + ']'));
  }

  return dependencies;
}

function createSelectorCreator(memoize) {
  for (var _len = arguments.length, memoizeOptions = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    memoizeOptions[_key - 1] = arguments[_key];
  }

  return function () {
    for (var _len2 = arguments.length, funcs = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      funcs[_key2] = arguments[_key2];
    }

    var recomputations = 0;
    var resultFunc = funcs.pop();
    var dependencies = getDependencies(funcs);

    var memoizedResultFunc = memoize.apply(undefined, [function () {
      recomputations++;
      // apply arguments instead of spreading for performance.
      return resultFunc.apply(null, arguments);
    }].concat(memoizeOptions));

    // If a selector is called with the exact same arguments we don't need to traverse our dependencies again.
    var selector = defaultMemoize(function () {
      var params = [];
      var length = dependencies.length;

      for (var i = 0; i < length; i++) {
        // apply arguments instead of spreading and mutate a local list of params for performance.
        params.push(dependencies[i].apply(null, arguments));
      }

      // apply arguments instead of spreading for performance.
      return memoizedResultFunc.apply(null, params);
    });

    selector.resultFunc = resultFunc;
    selector.recomputations = function () {
      return recomputations;
    };
    selector.resetRecomputations = function () {
      return recomputations = 0;
    };
    return selector;
  };
}

var createSelector = exports.createSelector = createSelectorCreator(defaultMemoize);

function createStructuredSelector(selectors) {
  var selectorCreator = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : createSelector;

  if (typeof selectors !== 'object') {
    throw new Error('createStructuredSelector expects first argument to be an object ' + ('where each property is a selector, instead received a ' + typeof selectors));
  }
  var objectKeys = Object.keys(selectors);
  return selectorCreator(objectKeys.map(function (key) {
    return selectors[key];
  }), function () {
    for (var _len3 = arguments.length, values = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
      values[_key3] = arguments[_key3];
    }

    return values.reduce(function (composition, value, index) {
      composition[objectKeys[index]] = value;
      return composition;
    }, {});
  });
}

/***/ }),
/* 221 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Copyright Schrodinger, LLC
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule debounceCore
 * @typechecks
 */

/**
 * Invokes the given callback after a specified number of milliseconds have
 * elapsed, ignoring subsequent calls.
 *
 * For example, if you wanted to update a preview after the user stops typing
 * you could do the following:
 *
 *   elem.addEventListener('keyup', debounce(this.updatePreview, 250), false);
 *
 * The returned function has a reset method which can be called to cancel a
 * pending invocation.
 *
 *   var debouncedUpdatePreview = debounce(this.updatePreview, 250);
 *   elem.addEventListener('keyup', debouncedUpdatePreview, false);
 *
 *   // later, to cancel pending calls
 *   debouncedUpdatePreview.reset();
 *
 * @param {function} func - the function to debounce
 * @param {number} wait - how long to wait in milliseconds
 * @param {*} context - optional context to invoke the function in
 * @param {?function} setTimeoutFunc - an implementation of setTimeout
 *  if nothing is passed in the default setTimeout function is used
  * @param {?function} clearTimeoutFunc - an implementation of clearTimeout
 *  if nothing is passed in the default clearTimeout function is used
 */
function debounce(func, wait, context, setTimeoutFunc, clearTimeoutFunc) {
  setTimeoutFunc = setTimeoutFunc || setTimeout;
  clearTimeoutFunc = clearTimeoutFunc || clearTimeout;
  var timeout;

  function debouncer() {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    debouncer.reset();

    var callback = function callback() {
      func.apply(context, args);
    };
    callback.__SMmeta = func.__SMmeta;
    timeout = setTimeoutFunc(callback, wait);
  }

  debouncer.reset = function () {
    clearTimeoutFunc(timeout);
  };

  return debouncer;
}

module.exports = debounce;

/***/ }),
/* 222 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright Schrodinger, LLC
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule FixedDataTableStore
 */



var _reducers = __webpack_require__(223);

var _reducers2 = _interopRequireDefault(_reducers);

var _redux = __webpack_require__(93);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = {
  get: function get() {
    return (0, _redux.createStore)(_reducers2.default);
  }
};

/***/ }),
/* 223 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright Schrodinger, LLC
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule reducers
 */



var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _scrollAnchor3 = __webpack_require__(224);

var _ActionTypes = __webpack_require__(18);

var ActionTypes = _interopRequireWildcard(_ActionTypes);

var _IntegerBufferSet = __webpack_require__(225);

var _IntegerBufferSet2 = _interopRequireDefault(_IntegerBufferSet);

var _PrefixIntervalTree = __webpack_require__(227);

var _PrefixIntervalTree2 = _interopRequireDefault(_PrefixIntervalTree);

var _columnStateHelper = __webpack_require__(228);

var _columnStateHelper2 = _interopRequireDefault(_columnStateHelper);

var _computeRenderedRows = __webpack_require__(230);

var _computeRenderedRows2 = _interopRequireDefault(_computeRenderedRows);

var _convertColumnElementsToData = __webpack_require__(231);

var _convertColumnElementsToData2 = _interopRequireDefault(_convertColumnElementsToData);

var _pick = __webpack_require__(67);

var _pick2 = _interopRequireDefault(_pick);

var _shallowEqual = __webpack_require__(49);

var _shallowEqual2 = _interopRequireDefault(_shallowEqual);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

/**
 * Input state set from props
 */
var DEFAULT_INPUT_STATE = {
  columnProps: [],
  columnGroupProps: [],
  elementTemplates: {
    cell: [],
    footer: [],
    groupHeader: [],
    header: []
  },
  elementHeights: {
    footerHeight: 0,
    groupHeaderHeight: 0,
    headerHeight: 0
  },
  rowSettings: {
    bufferRowCount: undefined,
    rowHeight: 0,
    rowHeightGetter: function rowHeightGetter() {
      return 0;
    },
    rowsCount: 0,
    subRowHeight: 0,
    subRowHeightGetter: function subRowHeightGetter() {
      return 0;
    }
  },
  scrollFlags: {
    overflowX: 'auto',
    overflowY: 'auto',
    showScrollbarX: true,
    showScrollbarY: true
  },
  tableSize: {
    height: undefined,
    maxHeight: 0,
    ownerHeight: undefined,
    useMaxHeight: false,
    width: 0
  }
};

/**
 * Output state passed as props to the the rendered FixedDataTable
 * NOTE (jordan) rows may contain undefineds if we don't need all the buffer positions
 */
var DEFAULT_OUTPUT_STATE = {
  columnReorderingData: {},
  columnResizingData: {},
  firstRowIndex: 0,
  firstRowOffset: 0,
  isColumnReordering: false,
  isColumnResizing: false,
  maxScrollX: 0,
  maxScrollY: 0,
  rowHeights: {},
  rows: [], // rowsToRender
  scrollContentHeight: 0,
  scrollX: 0,
  scrollY: 0
};

/**
 * Internal state only used by this file
 * NOTE (jordan) internal state is altered in place
 * so don't trust it for redux history or immutability checks
 * TODO (jordan) investigate if we want to move this to local or scoped state
 */
var DEFAULT_INTERNAL_STATE = {
  bufferSet: new _IntegerBufferSet2.default(),
  storedHeights: [],
  rowOffsets: null // PrefixIntervalTree
};

var DEFAULT_STATE = _extends({}, DEFAULT_INPUT_STATE, DEFAULT_OUTPUT_STATE, DEFAULT_INTERNAL_STATE);

function reducers() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : DEFAULT_STATE;
  var action = arguments[1];

  switch (action.type) {
    case ActionTypes.INITIALIZE:
      {
        var props = action.props;


        var newState = setStateFromProps(state, props);
        newState = initializeRowHeights(newState);
        var scrollAnchor = (0, _scrollAnchor3.getScrollAnchor)(newState, props);
        newState = (0, _computeRenderedRows2.default)(newState, scrollAnchor);
        return _columnStateHelper2.default.initialize(newState, props, {});
      }
    case ActionTypes.PROP_CHANGE:
      {
        var newProps = action.newProps,
            oldProps = action.oldProps;

        var _newState = setStateFromProps(state, newProps);

        if (oldProps.rowsCount !== newProps.rowsCount || oldProps.rowHeight !== newProps.rowHeight || oldProps.subRowHeight !== newProps.subRowHeight) {
          _newState = initializeRowHeights(_newState);
        }

        if (oldProps.rowsCount !== newProps.rowsCount) {
          // NOTE (jordan) bad practice to modify state directly, but okay since
          // we know setStateFromProps clones state internally
          _newState.bufferSet = new _IntegerBufferSet2.default();
        }

        var _scrollAnchor = (0, _scrollAnchor3.getScrollAnchor)(_newState, newProps, oldProps);

        // If anything has changed in state, update our rendered rows
        if (!(0, _shallowEqual2.default)(state, _newState) || _scrollAnchor.changed) {
          _newState = (0, _computeRenderedRows2.default)(_newState, _scrollAnchor);
        }

        _newState = _columnStateHelper2.default.initialize(_newState, newProps, oldProps);

        // TODO REDUX_MIGRATION solve w/ evil-diff
        // TODO (jordan) check if relevant props unchanged and
        // children column widths and flex widths are unchanged
        // alternatively shallow diff and reconcile props
        return _newState;
      }
    case ActionTypes.SCROLL_END:
      {
        return _extends({}, state, {
          scrolling: false
        });
      }
    case ActionTypes.SCROLL_START:
      {
        return _extends({}, state, {
          scrolling: true
        });
      }
    case ActionTypes.SCROLL_TO_Y:
      {
        var scrollY = action.scrollY;


        var _scrollAnchor2 = (0, _scrollAnchor3.scrollTo)(state, scrollY);
        return (0, _computeRenderedRows2.default)(state, _scrollAnchor2);
      }
    case ActionTypes.COLUMN_RESIZE:
      {
        var resizeData = action.resizeData;

        return _columnStateHelper2.default.resizeColumn(state, resizeData);
      }
    case ActionTypes.COLUMN_REORDER_START:
      {
        var reorderData = action.reorderData;

        return _columnStateHelper2.default.reorderColumn(state, reorderData);
      }
    case ActionTypes.COLUMN_REORDER_END:
      {
        return _extends({}, state, {
          isColumnReordering: false,
          columnReorderingData: {}
        });
      }
    case ActionTypes.COLUMN_REORDER_MOVE:
      {
        var deltaX = action.deltaX;

        return _columnStateHelper2.default.reorderColumnMove(state, deltaX);
      }
    case ActionTypes.SCROLL_TO_X:
      {
        var scrollX = action.scrollX;

        return _extends({}, state, {
          scrollX: scrollX
        });
      }
    default:
      {
        return state;
      }
  }
}

/**
 * Initialize row heights (storedHeights) & offsets based on the default rowHeight
 *
 * @param {!Object} state
 * @private
 */
function initializeRowHeights(state) {
  var _state$rowSettings = state.rowSettings,
      rowHeight = _state$rowSettings.rowHeight,
      rowsCount = _state$rowSettings.rowsCount,
      subRowHeight = _state$rowSettings.subRowHeight;

  var defaultFullRowHeight = rowHeight + subRowHeight;
  var rowOffsets = _PrefixIntervalTree2.default.uniform(rowsCount, defaultFullRowHeight);
  var scrollContentHeight = rowsCount * defaultFullRowHeight;
  var storedHeights = new Array(rowsCount);
  for (var idx = 0; idx < rowsCount; idx++) {
    storedHeights[idx] = defaultFullRowHeight;
  }
  return _extends({}, state, {
    rowOffsets: rowOffsets,
    scrollContentHeight: scrollContentHeight,
    storedHeights: storedHeights
  });
}

/**
 * @param {!Object} state
 * @param {!Object} props
 * @return {!Object}
 * @private
 */
function setStateFromProps(state, props) {
  var _convertColumnElement = (0, _convertColumnElementsToData2.default)(props.children),
      columnGroupProps = _convertColumnElement.columnGroupProps,
      columnProps = _convertColumnElement.columnProps,
      elementTemplates = _convertColumnElement.elementTemplates,
      useGroupHeader = _convertColumnElement.useGroupHeader;

  var newState = _extends({}, state, { columnGroupProps: columnGroupProps, columnProps: columnProps, elementTemplates: elementTemplates });

  newState.elementHeights = _extends({}, newState.elementHeights, (0, _pick2.default)(props, ['footerHeight', 'groupHeaderHeight', 'headerHeight']));
  if (!useGroupHeader) {
    newState.elementHeights.groupHeaderHeight = 0;
  }

  newState.rowSettings = _extends({}, newState.rowSettings, (0, _pick2.default)(props, ['bufferRowCount', 'rowHeight', 'rowsCount', 'subRowHeight']));
  var _newState$rowSettings = newState.rowSettings,
      rowHeight = _newState$rowSettings.rowHeight,
      subRowHeight = _newState$rowSettings.subRowHeight;

  newState.rowSettings.rowHeightGetter = props.rowHeightGetter || function () {
    return rowHeight;
  };
  newState.rowSettings.subRowHeightGetter = props.subRowHeightGetter || function () {
    return subRowHeight || 0;
  };

  newState.scrollFlags = _extends({}, newState.scrollFlags, (0, _pick2.default)(props, ['overflowX', 'overflowY', 'showScrollbarX', 'showScrollbarY']));

  newState.tableSize = _extends({}, newState.tableSize, (0, _pick2.default)(props, ['height', 'maxHeight', 'ownerHeight', 'width']));
  newState.tableSize.useMaxHeight = newState.tableSize.height === undefined;

  return newState;
}

module.exports = reducers;

/***/ }),
/* 224 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright Schrodinger, LLC
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule scrollAnchor
 */



Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getScrollAnchor = getScrollAnchor;
exports.scrollTo = scrollTo;

var _clamp = __webpack_require__(21);

var _clamp2 = _interopRequireDefault(_clamp);

var _updateRowHeight = __webpack_require__(91);

var _updateRowHeight2 = _interopRequireDefault(_updateRowHeight);

var _scrollbarsVisible = __webpack_require__(16);

var _scrollbarsVisible2 = _interopRequireDefault(_scrollbarsVisible);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Get the anchor for scrolling.
 * This will either be the first row's index and an offset, or the last row's index.
 * We also pass a flag indicating if the anchor has changed from the state
 *
 * @param {!Object} state
 * @param {!Object} newProps
 * @param {!Object} oldProps
 * @return {{
 *   firstIndex: number,
 *   firstOffset: number,
 *   lastIndex: number,
 *   changed: boolean,
 * }}
 */
function getScrollAnchor(state, newProps, oldProps) {
  if (newProps.scrollToRow !== undefined && newProps.scrollToRow !== null && (!oldProps || newProps.scrollToRow !== oldProps.scrollToRow)) {
    return scrollToRow(state, newProps.scrollToRow);
  }

  if (newProps.scrollTop !== undefined && newProps.scrollTop !== null && (!oldProps || newProps.scrollTop !== oldProps.scrollTop)) {
    return scrollTo(state, newProps.scrollTop);
  }

  return {
    firstIndex: state.firstRowIndex,
    firstOffset: state.firstRowOffset,
    lastIndex: undefined,
    changed: false
  };
}

/**
 * Scroll to a specific position in the grid
 *
 * @param {!Object} state
 * @param {number} scrollY
 * @return {{
 *   firstIndex: number,
 *   firstOffset: number,
 *   lastIndex: number,
 *   changed: boolean,
 * }}
 */
function scrollTo(state, scrollY) {
  var _scrollbarsVisibleSel = (0, _scrollbarsVisible2.default)(state),
      availableHeight = _scrollbarsVisibleSel.availableHeight;

  var rowOffsets = state.rowOffsets,
      rowSettings = state.rowSettings,
      scrollContentHeight = state.scrollContentHeight;
  var rowsCount = rowSettings.rowsCount;


  if (rowsCount === 0) {
    return {
      firstIndex: 0,
      firstOffset: 0,
      lastIndex: undefined,
      changed: state.firstRowIndex !== 0 || state.firstRowOffset !== 0
    };
  }

  var firstIndex = 0;
  var firstOffset = 0;
  var lastIndex = undefined;
  if (scrollY <= 0) {
    // Use defaults (from above) to scroll to first row
  } else if (scrollY >= scrollContentHeight - availableHeight) {
    // Scroll to the last row
    firstIndex = undefined;
    lastIndex = rowsCount - 1;
  } else {
    // Mark the row which will appear first in the viewport
    // We use this as our "marker" when scrolling even if updating rowHeights
    // leads to it not being different from the scrollY specified
    var newRowIdx = rowOffsets.greatestLowerBound(scrollY);
    firstIndex = (0, _clamp2.default)(newRowIdx, 0, Math.max(rowsCount - 1, 0));

    // Record how far into the first row we should scroll
    // firstOffset is a negative value representing how much larger scrollY is
    // than the scroll position of the first row in the viewport
    var firstRowPosition = rowOffsets.sumUntil(firstIndex);
    firstOffset = firstRowPosition - scrollY;
  }

  return {
    firstIndex: firstIndex,
    firstOffset: firstOffset,
    lastIndex: lastIndex,
    // NOTE (jordan) This changed heuristic may give false positives,
    // but that's fine since it's used as a filter to computeRenderedRows
    changed: true
  };
}

/**
 * Scroll a specified row into the viewport
 * If the row is before the viewport, it will become the first row in the viewport
 * If the row is after the viewport, it will become the last row in the viewport
 * If the row is in the viewport, do nothing
 *
 * @param {!Object} state
 * @param {number} rowIndex
 * @return {{
 *   firstIndex: number,
 *   firstOffset: number,
 *   lastIndex: number,
 *   changed: boolean,
 * }}
 * @private
 */
function scrollToRow(state, rowIndex) {
  var _scrollbarsVisibleSel2 = (0, _scrollbarsVisible2.default)(state),
      availableHeight = _scrollbarsVisibleSel2.availableHeight;

  var rowOffsets = state.rowOffsets,
      rowSettings = state.rowSettings,
      storedHeights = state.storedHeights,
      scrollY = state.scrollY;
  var rowsCount = rowSettings.rowsCount;


  if (rowsCount === 0) {
    return {
      firstIndex: 0,
      firstOffset: 0,
      lastIndex: undefined,
      changed: state.firstRowIndex !== 0 || state.firstRowOffset !== 0
    };
  }

  rowIndex = (0, _clamp2.default)(rowIndex, 0, Math.max(rowsCount - 1, 0));
  (0, _updateRowHeight2.default)(state, rowIndex);
  var rowBegin = rowOffsets.sumUntil(rowIndex);
  var rowEnd = rowBegin + storedHeights[rowIndex];

  var firstIndex = rowIndex;
  var lastIndex = undefined;
  if (rowBegin < scrollY) {
    // If before the viewport, set as the first row in the viewport
    // Uses defaults (from above)
  } else if (scrollY + availableHeight < rowEnd) {
    // If after the viewport, set as the last row in the viewport
    firstIndex = undefined;
    lastIndex = rowIndex;
  } else {
    // If already in the viewport, do nothing.
    return {
      firstIndex: state.firstRowIndex,
      firstOffset: state.firstRowOffset,
      lastIndex: undefined,
      changed: false
    };
  }

  return {
    firstIndex: firstIndex,
    firstOffset: 0,
    lastIndex: lastIndex,
    changed: true
  };
}

/***/ }),
/* 225 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright Schrodinger, LLC
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule IntegerBufferSet
 * @typechecks
 */



var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Heap = __webpack_require__(226);

var _Heap2 = _interopRequireDefault(_Heap);

var _invariant = __webpack_require__(11);

var _invariant2 = _interopRequireDefault(_invariant);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// Data structure that allows to store values and assign positions to them
// in a way to minimize changing positions of stored values when new ones are
// added or when some values are replaced. Stored elements are alwasy assigned
// a consecutive set of positoins startin from 0 up to count of elements less 1
// Following actions can be executed
// * get position assigned to given value (null if value is not stored)
// * create new entry for new value and get assigned position back
// * replace value that is furthest from specified value range with new value
//   and get it's position back
// All operations take amortized log(n) time where n is number of elements in
// the set.
var IntegerBufferSet = function () {
  function IntegerBufferSet() {
    _classCallCheck(this, IntegerBufferSet);

    this._valueToPositionMap = {};
    this._size = 0;
    this._smallValues = new _Heap2.default([], // Initial data in the heap
    this._smallerComparator);
    this._largeValues = new _Heap2.default([], // Initial data in the heap
    this._greaterComparator);

    this.getNewPositionForValue = this.getNewPositionForValue.bind(this);
    this.getValuePosition = this.getValuePosition.bind(this);
    this.getSize = this.getSize.bind(this);
    this.replaceFurthestValuePosition = this.replaceFurthestValuePosition.bind(this);
  }

  _createClass(IntegerBufferSet, [{
    key: 'getSize',
    value: function getSize() /*number*/{
      return this._size;
    }
  }, {
    key: 'getValuePosition',
    value: function getValuePosition( /*number*/value) /*?number*/{
      if (this._valueToPositionMap[value] === undefined) {
        return null;
      }
      return this._valueToPositionMap[value];
    }
  }, {
    key: 'getNewPositionForValue',
    value: function getNewPositionForValue( /*number*/value) /*number*/{
      (0, _invariant2.default)(this._valueToPositionMap[value] === undefined, "Shouldn't try to find new position for value already stored in BufferSet");
      var newPosition = this._size;
      this._size++;
      this._pushToHeaps(newPosition, value);
      this._valueToPositionMap[value] = newPosition;
      return newPosition;
    }
  }, {
    key: 'replaceFurthestValuePosition',
    value: function replaceFurthestValuePosition(
    /*number*/lowValue,
    /*number*/highValue,
    /*number*/newValue) /*?number*/{
      (0, _invariant2.default)(this._valueToPositionMap[newValue] === undefined, "Shouldn't try to replace values with value already stored value in " + "BufferSet");

      this._cleanHeaps();
      if (this._smallValues.empty() || this._largeValues.empty()) {
        // Threre are currently no values stored. We will have to create new
        // position for this value.
        return null;
      }

      var minValue = this._smallValues.peek().value;
      var maxValue = this._largeValues.peek().value;
      if (minValue >= lowValue && maxValue <= highValue) {
        // All values currently stored are necessary, we can't reuse any of them.
        return null;
      }

      var valueToReplace;
      if (lowValue - minValue > maxValue - highValue) {
        // minValue is further from provided range. We will reuse it's position.
        valueToReplace = minValue;
        this._smallValues.pop();
      } else {
        valueToReplace = maxValue;
        this._largeValues.pop();
      }
      var position = this._valueToPositionMap[valueToReplace];
      delete this._valueToPositionMap[valueToReplace];
      this._valueToPositionMap[newValue] = position;
      this._pushToHeaps(position, newValue);

      return position;
    }
  }, {
    key: '_pushToHeaps',
    value: function _pushToHeaps( /*number*/position, /*number*/value) {
      var element = {
        position: position,
        value: value
      };
      // We can reuse the same object in both heaps, because we don't mutate them
      this._smallValues.push(element);
      this._largeValues.push(element);
    }
  }, {
    key: '_cleanHeaps',
    value: function _cleanHeaps() {
      // We not usually only remove object from one heap while moving value.
      // Here we make sure that there is no stale data on top of heaps.
      this._cleanHeap(this._smallValues);
      this._cleanHeap(this._largeValues);
      var minHeapSize = Math.min(this._smallValues.size(), this._largeValues.size());
      var maxHeapSize = Math.max(this._smallValues.size(), this._largeValues.size());
      if (maxHeapSize > 10 * minHeapSize) {
        // There are many old values in one of heaps. We nned to get rid of them
        // to not use too avoid memory leaks
        this._recreateHeaps();
      }
    }
  }, {
    key: '_recreateHeaps',
    value: function _recreateHeaps() {
      var sourceHeap = this._smallValues.size() < this._largeValues.size() ? this._smallValues : this._largeValues;
      var newSmallValues = new _Heap2.default([], // Initial data in the heap
      this._smallerComparator);
      var newLargeValues = new _Heap2.default([], // Initial datat in the heap
      this._greaterComparator);
      while (!sourceHeap.empty()) {
        var element = sourceHeap.pop();
        // Push all stil valid elements to new heaps
        if (this._valueToPositionMap[element.value] !== undefined) {
          newSmallValues.push(element);
          newLargeValues.push(element);
        }
      }
      this._smallValues = newSmallValues;
      this._largeValues = newLargeValues;
    }
  }, {
    key: '_cleanHeap',
    value: function _cleanHeap( /*object*/heap) {
      while (!heap.empty() && this._valueToPositionMap[heap.peek().value] === undefined) {
        heap.pop();
      }
    }
  }, {
    key: '_smallerComparator',
    value: function _smallerComparator( /*object*/lhs, /*object*/rhs) /*boolean*/{
      return lhs.value < rhs.value;
    }
  }, {
    key: '_greaterComparator',
    value: function _greaterComparator( /*object*/lhs, /*object*/rhs) /*boolean*/{
      return lhs.value > rhs.value;
    }
  }]);

  return IntegerBufferSet;
}();

module.exports = IntegerBufferSet;

/***/ }),
/* 226 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright Schrodinger, LLC
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule Heap
 * @typechecks
 * @preventMunge
 */



/*
 * @param {*} a
 * @param {*} b
 * @return {boolean}
 */

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function defaultComparator(a, b) {
  return a < b;
}

var Heap = function () {
  function Heap(items, comparator) {
    _classCallCheck(this, Heap);

    this._items = items || [];
    this._size = this._items.length;
    this._comparator = comparator || defaultComparator;
    this._heapify();
  }

  /*
   * @return {boolean}
   */


  _createClass(Heap, [{
    key: 'empty',
    value: function empty() {
      return this._size === 0;
    }

    /*
     * @return {*}
     */

  }, {
    key: 'pop',
    value: function pop() {
      if (this._size === 0) {
        return;
      }

      var elt = this._items[0];

      var lastElt = this._items.pop();
      this._size--;

      if (this._size > 0) {
        this._items[0] = lastElt;
        this._sinkDown(0);
      }

      return elt;
    }

    /*
     * @param {*} item
     */

  }, {
    key: 'push',
    value: function push(item) {
      this._items[this._size++] = item;
      this._bubbleUp(this._size - 1);
    }

    /*
     * @return {number}
     */

  }, {
    key: 'size',
    value: function size() {
      return this._size;
    }

    /*
     * @return {*}
     */

  }, {
    key: 'peek',
    value: function peek() {
      if (this._size === 0) {
        return;
      }

      return this._items[0];
    }
  }, {
    key: '_heapify',
    value: function _heapify() {
      for (var index = Math.floor((this._size + 1) / 2); index >= 0; index--) {
        this._sinkDown(index);
      }
    }

    /*
     * @parent {number} index
     */

  }, {
    key: '_bubbleUp',
    value: function _bubbleUp(index) {
      var elt = this._items[index];
      while (index > 0) {
        var parentIndex = Math.floor((index + 1) / 2) - 1;
        var parentElt = this._items[parentIndex];

        // if parentElt < elt, stop
        if (this._comparator(parentElt, elt)) {
          return;
        }

        // swap
        this._items[parentIndex] = elt;
        this._items[index] = parentElt;
        index = parentIndex;
      }
    }

    /*
     * @parent {number} index
     */

  }, {
    key: '_sinkDown',
    value: function _sinkDown(index) {
      var elt = this._items[index];

      while (true) {
        var leftChildIndex = 2 * (index + 1) - 1;
        var rightChildIndex = 2 * (index + 1);
        var swapIndex = -1;

        if (leftChildIndex < this._size) {
          var leftChild = this._items[leftChildIndex];
          if (this._comparator(leftChild, elt)) {
            swapIndex = leftChildIndex;
          }
        }

        if (rightChildIndex < this._size) {
          var rightChild = this._items[rightChildIndex];
          if (this._comparator(rightChild, elt)) {
            if (swapIndex === -1 || this._comparator(rightChild, this._items[swapIndex])) {
              swapIndex = rightChildIndex;
            }
          }
        }

        // if we don't have a swap, stop
        if (swapIndex === -1) {
          return;
        }

        this._items[index] = this._items[swapIndex];
        this._items[swapIndex] = elt;
        index = swapIndex;
      }
    }
  }]);

  return Heap;
}();

module.exports = Heap;

/***/ }),
/* 227 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/**
 * Copyright Schrodinger, LLC
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule PrefixIntervalTree
 * 
 * @typechecks
 */



var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _invariant = __webpack_require__(11);

var _invariant2 = _interopRequireDefault(_invariant);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var parent = function parent(node) {
  return Math.floor(node / 2);
};

var Int32Array = global.Int32Array || function (size) {
  var xs = [];
  for (var i = size - 1; i >= 0; --i) {
    xs[i] = 0;
  }
  return xs;
};

/**
 * Computes the next power of 2 after or equal to x.
 */
function ceilLog2(x) {
  var y = 1;
  while (y < x) {
    y *= 2;
  }
  return y;
}

/**
 * A prefix interval tree stores an numeric array and the partial sums of that
 * array. It is optimized for updating the values of the array without
 * recomputing all of the partial sums.
 *
 *   - O(ln n) update
 *   - O(1) lookup
 *   - O(ln n) compute a partial sum
 *   - O(n) space
 *
 * Note that the sequence of partial sums is one longer than the array, so that
 * the first partial sum is always 0, and the last partial sum is the sum of the
 * entire array.
 */

var PrefixIntervalTree = function () {
  function PrefixIntervalTree(xs) {
    _classCallCheck(this, PrefixIntervalTree);

    /**
     * Number of elements in the array
     *
     * @type {number}
     * @private
     */
    this._size = xs.length;

    /**
     * Half the size of the heap. It is also the number of non-leaf nodes, and the
     * index of the first element in the heap. Always a power of 2.
     *
     * @type {number}
     * @private
     */
    this._half = ceilLog2(this._size);

    /**
     * Binary heap
     *
     * @type {!Array.<number>}
     * @const
     * @private
     */
    this._heap = new Int32Array(2 * this._half);

    var i;
    for (i = 0; i < this._size; ++i) {
      this._heap[this._half + i] = xs[i];
    }

    for (i = this._half - 1; i > 0; --i) {
      this._heap[i] = this._heap[2 * i] + this._heap[2 * i + 1];
    }
  }

  _createClass(PrefixIntervalTree, [{
    key: 'set',
    value: function set(index, value) {
      (0, _invariant2.default)(0 <= index && index < this._size, 'Index out of range %s', index);

      var node = this._half + index;
      this._heap[node] = value;

      node = parent(node);
      for (; node !== 0; node = parent(node)) {
        this._heap[node] = this._heap[2 * node] + this._heap[2 * node + 1];
      }
    }
  }, {
    key: 'get',
    value: function get(index) {
      (0, _invariant2.default)(0 <= index && index < this._size, 'Index out of range %s', index);

      var node = this._half + index;
      return this._heap[node];
    }
  }, {
    key: 'getSize',
    value: function getSize() {
      return this._size;
    }

    /**
     * Returns the sum get(0) + get(1) + ... + get(end - 1).
     */

  }, {
    key: 'sumUntil',
    value: function sumUntil(end) {
      (0, _invariant2.default)(0 <= end && end < this._size + 1, 'Index out of range %s', end);

      if (end === 0) {
        return 0;
      }

      var node = this._half + end - 1;
      var sum = this._heap[node];
      for (; node !== 1; node = parent(node)) {
        if (node % 2 === 1) {
          sum += this._heap[node - 1];
        }
      }

      return sum;
    }

    /**
     * Returns the sum get(0) + get(1) + ... + get(inclusiveEnd).
     */

  }, {
    key: 'sumTo',
    value: function sumTo(inclusiveEnd) {
      (0, _invariant2.default)(0 <= inclusiveEnd && inclusiveEnd < this._size, 'Index out of range %s', inclusiveEnd);
      return this.sumUntil(inclusiveEnd + 1);
    }

    /**
     * Returns the sum get(begin) + get(begin + 1) + ... + get(end - 1).
     */

  }, {
    key: 'sum',
    value: function sum(begin, end) {
      (0, _invariant2.default)(begin <= end, 'Begin must precede end');
      return this.sumUntil(end) - this.sumUntil(begin);
    }

    /**
     * Returns the smallest i such that 0 <= i <= size and sumUntil(i) <= t, or
     * -1 if no such i exists.
     */

  }, {
    key: 'greatestLowerBound',
    value: function greatestLowerBound(t) {
      if (t < 0) {
        return -1;
      }

      var node = 1;
      if (this._heap[node] <= t) {
        return this._size;
      }

      while (node < this._half) {
        var leftSum = this._heap[2 * node];
        if (t < leftSum) {
          node = 2 * node;
        } else {
          node = 2 * node + 1;
          t -= leftSum;
        }
      }

      return node - this._half;
    }

    /**
     * Returns the smallest i such that 0 <= i <= size and sumUntil(i) < t, or
     * -1 if no such i exists.
     */

  }, {
    key: 'greatestStrictLowerBound',
    value: function greatestStrictLowerBound(t) {
      if (t <= 0) {
        return -1;
      }

      var node = 1;
      if (this._heap[node] < t) {
        return this._size;
      }

      while (node < this._half) {
        var leftSum = this._heap[2 * node];
        if (t <= leftSum) {
          node = 2 * node;
        } else {
          node = 2 * node + 1;
          t -= leftSum;
        }
      }

      return node - this._half;
    }

    /**
     * Returns the smallest i such that 0 <= i <= size and t <= sumUntil(i), or
     * size + 1 if no such i exists.
     */

  }, {
    key: 'leastUpperBound',
    value: function leastUpperBound(t) {
      return this.greatestStrictLowerBound(t) + 1;
    }

    /**
     * Returns the smallest i such that 0 <= i <= size and t < sumUntil(i), or
     * size + 1 if no such i exists.
     */

  }, {
    key: 'leastStrictUpperBound',
    value: function leastStrictUpperBound(t) {
      return this.greatestLowerBound(t) + 1;
    }
  }], [{
    key: 'uniform',
    value: function uniform(size, initialValue) {
      var xs = [];
      for (var i = size - 1; i >= 0; --i) {
        xs[i] = initialValue;
      }

      return new PrefixIntervalTree(xs);
    }
  }, {
    key: 'empty',
    value: function empty(size) {
      return PrefixIntervalTree.uniform(size, 0);
    }
  }]);

  return PrefixIntervalTree;
}();

module.exports = PrefixIntervalTree;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6)))

/***/ }),
/* 228 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright Schrodinger, LLC
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule columnStateHelper
 */



var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _emptyFunction = __webpack_require__(7);

var _emptyFunction2 = _interopRequireDefault(_emptyFunction);

var _isNil = __webpack_require__(229);

var _isNil2 = _interopRequireDefault(_isNil);

var _columnWidths5 = __webpack_require__(88);

var _columnWidths6 = _interopRequireDefault(_columnWidths5);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DRAG_SCROLL_SPEED = 15;
var DRAG_SCROLL_BUFFER = 100;

/**
 * Initialize scrollX state
 * TODO (jordan) Audit this method for cases where deep values are not properly cloned
 *
 * @param {!Object} state
 * @param {!Object} props
 * @param {Object} oldProps
 * @return {!Object}
 */
function initialize(state, props, oldProps) {
  var scrollLeft = props.scrollLeft,
      scrollToColumn = props.scrollToColumn;
  var columnResizingData = state.columnResizingData,
      isColumnResizing = state.isColumnResizing,
      scrollX = state.scrollX;


  if (scrollLeft !== undefined && (!oldProps || scrollLeft !== oldProps.scrollLeft)) {
    scrollX = scrollLeft;
  }

  scrollX = scrollTo(state, props, oldProps.scrollToColumn, scrollX);

  var _columnWidths = (0, _columnWidths6.default)(state),
      maxScrollX = _columnWidths.maxScrollX;

  scrollX = Math.min(scrollX, maxScrollX);

  // isColumnResizing should be overwritten by value from props if available
  isColumnResizing = props.isColumnResizing !== undefined ? props.isColumnResizing : isColumnResizing;
  columnResizingData = isColumnResizing ? columnResizingData : {};

  return _extends({}, state, {
    columnResizingData: columnResizingData,
    isColumnResizing: isColumnResizing,
    maxScrollX: maxScrollX,
    scrollX: scrollX
  });
};

/**
 * @param {!Object} state
 * @param {{
 *   scrollToColumn: number,
 *   width: number,
 * }} props
 * @param {number} oldScrollToColumn
 * @param {number} scrollX
 * @return {number} The new scrollX
 */
function scrollTo(state, props, oldScrollToColumn, scrollX) {
  var scrollToColumn = props.scrollToColumn;

  var _columnWidths2 = (0, _columnWidths6.default)(state),
      availableScrollWidth = _columnWidths2.availableScrollWidth,
      fixedColumns = _columnWidths2.fixedColumns,
      scrollableColumns = _columnWidths2.scrollableColumns;

  var fixedColumnsCount = fixedColumns.length;

  var scrollToUnchanged = scrollToColumn === oldScrollToColumn;
  var selectedColumnFixed = scrollToColumn < fixedColumnsCount;
  if ((0, _isNil2.default)(scrollToColumn) || scrollToUnchanged || selectedColumnFixed) {
    return scrollX;
  }

  // Convert column index (0 indexed) to scrollable index (0 indexed)
  // and clamp to max scrollable index
  var clampedColumnIndex = Math.min(scrollToColumn - fixedColumnsCount, scrollableColumns.length - 1);

  // Compute the width of all columns to the left of the column
  var previousWidth = 0;
  for (var columnIdx = 0; columnIdx < clampedColumnIndex; ++columnIdx) {
    previousWidth += scrollableColumns[columnIdx].width;
  }

  // Get width of specified column
  var selectedColumnWidth = scrollableColumns[clampedColumnIndex].width;

  // Compute the scroll position which sets the column on the right of the viewport
  // Must scroll at least far enough for end of column (previousWidth + selectedColumnWidth)
  // to be in viewport.
  var minScrollPosition = previousWidth + selectedColumnWidth - availableScrollWidth;

  // Handle offscreen to the left
  // If scrolled less than minimum amount, scroll to minimum amount
  // so column on right of viewport
  if (scrollX < minScrollPosition) {
    return minScrollPosition;
  }

  // Handle offscreen to the right
  // If scrolled more than previous columns, at least part of column will be offscreen to left
  // Scroll so column is flush with left edge of viewport
  if (scrollX > previousWidth) {
    return previousWidth;
  }

  return scrollX;
}

/**
 * This is called when a cell that is in the header of a column has its
 * resizer knob clicked on. It displays the resizer and puts in the correct
 * location on the table.
 */
function resizeColumn(state, resizeData) {
  var cellMinWidth = resizeData.cellMinWidth,
      cellMaxWidth = resizeData.cellMaxWidth,
      cellWidth = resizeData.cellWidth,
      columnKey = resizeData.columnKey,
      combinedWidth = resizeData.combinedWidth,
      clientX = resizeData.clientX,
      clientY = resizeData.clientY,
      leftOffset = resizeData.leftOffset;

  return _extends({}, state, {
    isColumnResizing: true,
    columnResizingData: {
      left: leftOffset + combinedWidth - cellWidth,
      width: cellWidth,
      minWidth: cellMinWidth,
      maxWidth: cellMaxWidth,
      initialEvent: {
        clientX: clientX,
        clientY: clientY,
        preventDefault: _emptyFunction2.default
      },
      key: columnKey
    }
  });
};

function reorderColumn(state, reorderData) {
  var columnKey = reorderData.columnKey,
      left = reorderData.left,
      scrollStart = reorderData.scrollStart,
      width = reorderData.width;

  var _columnWidths3 = (0, _columnWidths6.default)(state),
      fixedColumns = _columnWidths3.fixedColumns;

  var isFixed = fixedColumns.some(function (column) {
    return column.columnKey === columnKey;
  });

  return _extends({}, state, {
    isColumnReordering: true,
    columnReorderingData: {
      cancelReorder: false,
      dragDistance: 0,
      isFixed: isFixed,
      scrollStart: scrollStart,
      columnKey: columnKey,
      columnWidth: width,
      originalLeft: left,
      columnBefore: undefined,
      columnAfter: undefined
    }
  });
};

function reorderColumnMove(state, deltaX) {
  var _state$columnReorderi = state.columnReorderingData,
      isFixed = _state$columnReorderi.isFixed,
      originalLeft = _state$columnReorderi.originalLeft,
      scrollStart = _state$columnReorderi.scrollStart;
  var maxScrollX = state.maxScrollX,
      scrollX = state.scrollX;

  if (!isFixed) {
    // Relative dragX position on scroll
    var dragX = originalLeft - scrollStart + deltaX;

    var _columnWidths4 = (0, _columnWidths6.default)(state),
        availableScrollWidth = _columnWidths4.availableScrollWidth;

    deltaX += scrollX - scrollStart;

    // Scroll the table left or right if we drag near the edges of the table
    if (dragX > availableScrollWidth - DRAG_SCROLL_BUFFER) {
      scrollX = Math.min(scrollX + DRAG_SCROLL_SPEED, maxScrollX);
    } else if (dragX <= DRAG_SCROLL_BUFFER) {
      scrollX = Math.max(scrollX - DRAG_SCROLL_SPEED, 0);
    }
  }

  // NOTE (jordan) Need to clone this object when use pureRendering
  var reorderingData = _extends({}, state.columnReorderingData, {
    dragDistance: deltaX,
    columnBefore: undefined,
    columnAfter: undefined
  });

  return _extends({}, state, {
    scrollX: scrollX,
    columnReorderingData: reorderingData
  });
};

module.exports = {
  initialize: initialize,
  reorderColumn: reorderColumn,
  reorderColumnMove: reorderColumnMove,
  resizeColumn: resizeColumn
};

/***/ }),
/* 229 */
/***/ (function(module, exports) {

/**
 * Checks if `value` is `null` or `undefined`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is nullish, else `false`.
 * @example
 *
 * _.isNil(null);
 * // => true
 *
 * _.isNil(void 0);
 * // => true
 *
 * _.isNil(NaN);
 * // => false
 */
function isNil(value) {
  return value == null;
}

module.exports = isNil;


/***/ }),
/* 230 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright Schrodinger, LLC
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule computeRenderedRows
 */



Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = computeRenderedRows;

var _updateRowHeight = __webpack_require__(91);

var _updateRowHeight2 = _interopRequireDefault(_updateRowHeight);

var _roughHeights = __webpack_require__(66);

var _roughHeights2 = _interopRequireDefault(_roughHeights);

var _scrollbarsVisible = __webpack_require__(16);

var _scrollbarsVisible2 = _interopRequireDefault(_scrollbarsVisible);

var _tableHeights = __webpack_require__(90);

var _tableHeights2 = _interopRequireDefault(_tableHeights);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Returns data about the rows to render
 * rows is a map of rowIndexes to render to their heights
 * firstRowIndex & firstRowOffset are calculated based on the lastIndex if
 * specified in scrollAnchor.
 * Otherwise, they are unchanged from the firstIndex & firstOffset scrollAnchor values.
 *
 * @param {!Object} state
 * @param {{
 *   firstIndex: number,
 *   firstOffset: number,
 *   lastIndex: number,
 * }} scrollAnchor
 * @return {!Object} The updated state object
 */
function computeRenderedRows(state, scrollAnchor) {
  var newState = _extends({}, state);
  var rowRange = calculateRenderedRowRange(newState, scrollAnchor);

  var rowSettings = newState.rowSettings,
      scrollContentHeight = newState.scrollContentHeight;
  var rowsCount = rowSettings.rowsCount;

  var _tableHeightsSelector = (0, _tableHeights2.default)(newState),
      bodyHeight = _tableHeightsSelector.bodyHeight;

  var maxScrollY = scrollContentHeight - bodyHeight;

  // NOTE (jordan) This handles #115 where resizing the viewport may
  // leave only a subset of rows shown, but no scrollbar to scroll up to the first rows.
  if (maxScrollY === 0) {
    if (rowRange.firstViewportIdx > 0) {
      rowRange = calculateRenderedRowRange(newState, {
        firstOffset: 0,
        lastIndex: rowsCount - 1
      });
    }

    newState.firstRowOffset = 0;
  }

  computeRenderedRowOffsets(newState, rowRange);
  var scrollY = 0;
  if (rowsCount > 0) {
    scrollY = newState.rowHeights[rowRange.firstViewportIdx] - newState.firstRowOffset;
  }
  scrollY = Math.min(scrollY, maxScrollY);

  return _extends(newState, {
    maxScrollY: maxScrollY,
    scrollY: scrollY
  });
}

/**
 * Determine the range of rows to render (buffer and viewport)
 * The leading and trailing buffer is based on a fixed count,
 * while the viewport rows are based on their height and the viewport height
 * We use the scrollAnchor to determine what either the first or last row
 * will be, as well as the offset.
 *
 * NOTE (jordan) This alters state so it shouldn't be called
 * without state having been cloned first.
 *
 * @param {!Object} state
 * @param {{
 *   firstIndex: number,
 *   firstOffset: number,
 *   lastIndex: number,
 * }} scrollAnchor
 * @return {{
 *   endBufferIdx: number,
 *   endViewportIdx: number,
 *   firstBufferIdx: number,
 *   firstViewportIdx: number,
 * }}
 * @private
 */
function calculateRenderedRowRange(state, scrollAnchor) {
  var _roughHeightsSelector = (0, _roughHeights2.default)(state),
      bufferRowCount = _roughHeightsSelector.bufferRowCount,
      maxAvailableHeight = _roughHeightsSelector.maxAvailableHeight;

  var rowsCount = state.rowSettings.rowsCount;

  if (rowsCount === 0) {
    return {
      endBufferIdx: 0,
      endViewportIdx: 0,
      firstBufferIdx: 0,
      firstViewportIdx: 0
    };
  }

  // If our first or last index is greater than our rowsCount,
  // treat it as if the last row is at the bottom of the viewport
  var firstIndex = scrollAnchor.firstIndex,
      firstOffset = scrollAnchor.firstOffset,
      lastIndex = scrollAnchor.lastIndex;

  if (firstIndex >= rowsCount || lastIndex >= rowsCount) {
    lastIndex = rowsCount - 1;
  }

  // Walk the viewport until filled with rows
  // If lastIndex is set, walk backward so that row is the last in the viewport
  var step = 1;
  var startIdx = firstIndex;
  var totalHeight = firstOffset;
  if (lastIndex !== undefined) {
    step = -1;
    startIdx = lastIndex;
    totalHeight = 0;
  }

  // Loop to walk the viewport until we've touched enough rows to fill its height
  var rowIdx = startIdx;
  var endIdx = rowIdx;
  while (rowIdx < rowsCount && rowIdx >= 0 && totalHeight < maxAvailableHeight) {
    totalHeight += (0, _updateRowHeight2.default)(state, rowIdx);
    endIdx = rowIdx;
    rowIdx += step;
  }

  // Loop to walk the leading buffer
  var firstViewportIdx = Math.min(startIdx, endIdx);
  var firstBufferIdx = Math.max(firstViewportIdx - bufferRowCount, 0);
  for (rowIdx = firstBufferIdx; rowIdx < firstViewportIdx; rowIdx++) {
    (0, _updateRowHeight2.default)(state, rowIdx);
  }

  // Loop to walk the trailing buffer
  var endViewportIdx = Math.max(startIdx, endIdx) + 1;
  var endBufferIdx = Math.min(endViewportIdx + bufferRowCount, rowsCount);
  for (rowIdx = endViewportIdx; rowIdx < endBufferIdx; rowIdx++) {
    (0, _updateRowHeight2.default)(state, rowIdx);
  }

  var _scrollbarsVisibleSel = (0, _scrollbarsVisible2.default)(state),
      availableHeight = _scrollbarsVisibleSel.availableHeight;

  if (lastIndex !== undefined) {
    // Calculate offset needed to position last row at bottom of viewport
    // This should be negative and represent how far the first row needs to be offscreen
    firstOffset = Math.min(availableHeight - totalHeight, 0);

    // Handle a case where the offset puts the first row fully offscreen
    // This can happen if availableHeight & maxAvailableHeight are different
    var storedHeights = state.storedHeights;

    if (-1 * firstOffset >= storedHeights[firstViewportIdx]) {
      firstViewportIdx += 1;
      firstOffset += storedHeights[firstViewportIdx];
    }
  }

  state.firstRowIndex = firstViewportIdx;
  state.firstRowOffset = firstOffset;
  return {
    endBufferIdx: endBufferIdx,
    endViewportIdx: endViewportIdx,
    firstBufferIdx: firstBufferIdx,
    firstViewportIdx: firstViewportIdx
  };
}

/**
 * Walk the rows to render and compute the height offsets and
 * positions in the row buffer.
 *
 * NOTE (jordan) This alters state so it shouldn't be called
 * without state having been cloned first.
 *
 * @param {!Object} state
 * @param {{
 *   endBufferIdx: number,
 *   endViewportIdx: number,
 *   firstBufferIdx: number,
 *   firstViewportIdx: number,
 * }} rowRange
 * @private
 */
function computeRenderedRowOffsets(state, rowRange) {
  var bufferSet = state.bufferSet,
      rowOffsets = state.rowOffsets,
      storedHeights = state.storedHeights;
  var endBufferIdx = rowRange.endBufferIdx,
      endViewportIdx = rowRange.endViewportIdx,
      firstBufferIdx = rowRange.firstBufferIdx,
      firstViewportIdx = rowRange.firstViewportIdx;


  var renderedRowsCount = endBufferIdx - firstBufferIdx;
  if (renderedRowsCount === 0) {
    state.rowHeights = {};
    state.rows = [];
    return;
  }

  var bufferMapping = []; // state.rows
  var rowOffsetsCache = {}; // state.rowHeights
  var runningOffset = rowOffsets.sumUntil(firstBufferIdx);
  for (var rowIdx = firstBufferIdx; rowIdx < endBufferIdx; rowIdx++) {

    // Update the offset for rendering the row
    rowOffsetsCache[rowIdx] = runningOffset;
    runningOffset += storedHeights[rowIdx];

    // Check if row already has a position in the buffer
    var rowPosition = bufferSet.getValuePosition(rowIdx);

    // Request a position in the buffer through eviction of another row
    if (rowPosition === null && bufferSet.getSize() >= renderedRowsCount) {
      rowPosition = bufferSet.replaceFurthestValuePosition(firstViewportIdx, endViewportIdx - 1, rowIdx);
    }

    // If we can't reuse any existing position, create a new one
    if (rowPosition === null) {
      rowPosition = bufferSet.getNewPositionForValue(rowIdx);
    }

    bufferMapping[rowPosition] = rowIdx;
  }

  state.rowHeights = rowOffsetsCache;
  state.rows = bufferMapping;
}

/***/ }),
/* 231 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright Schrodinger, LLC
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule convertColumnElementsToData
 */



Object.defineProperty(exports, "__esModule", {
  value: true
});

var _React = __webpack_require__(0);

var _React2 = _interopRequireDefault(_React);

var _forEach = __webpack_require__(65);

var _forEach2 = _interopRequireDefault(_forEach);

var _invariant = __webpack_require__(11);

var _invariant2 = _interopRequireDefault(_invariant);

var _map = __webpack_require__(89);

var _map2 = _interopRequireDefault(_map);

var _pick = __webpack_require__(67);

var _pick2 = _interopRequireDefault(_pick);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extractProps(column) {
  return (0, _pick2.default)(column.props, ['align', 'allowCellsRecycling', 'cellClassName', 'columnKey', 'flexGrow', 'fixed', 'maxWidth', 'minWidth', 'isReorderable', 'isResizable', 'width']);
};

function _extractTemplates(elementTemplates, columnElement) {
  elementTemplates.cell.push(columnElement.props.cell);
  elementTemplates.footer.push(columnElement.props.footer);
  elementTemplates.header.push(columnElement.props.header);
};

/**
 * Converts React column / column group elements into props and cell rendering templates
 */
function convertColumnElementsToData(childComponents) {
  var children = [];
  _React2.default.Children.forEach(childComponents, function (child, index) {
    if (child == null) {
      return;
    }
    (0, _invariant2.default)(child.type.__TableColumnGroup__ || child.type.__TableColumn__, 'child type should be <FixedDataTableColumn /> or <FixedDataTableColumnGroup />');

    children.push(child);
  });

  var elementTemplates = {
    cell: [],
    footer: [],
    groupHeader: [],
    header: []
  };

  var columnProps = [];
  var hasGroupHeader = children.length && children[0].type.__TableColumnGroup__;
  if (hasGroupHeader) {
    var columnGroupProps = (0, _map2.default)(children, _extractProps);
    (0, _forEach2.default)(children, function (columnGroupElement, index) {
      elementTemplates.groupHeader.push(columnGroupElement.props.header);

      _React2.default.Children.forEach(columnGroupElement.props.children, function (child) {
        var column = _extractProps(child);
        column.groupIdx = index;
        columnProps.push(column);
        _extractTemplates(elementTemplates, child);
      });
    });

    return {
      columnGroupProps: columnGroupProps,
      columnProps: columnProps,
      elementTemplates: elementTemplates,
      useGroupHeader: true
    };
  }

  // Use a default column group
  (0, _forEach2.default)(children, function (child) {
    columnProps.push(_extractProps(child));
    _extractTemplates(elementTemplates, child);
  });
  return {
    columnGroupProps: [],
    columnProps: columnProps,
    elementTemplates: elementTemplates,
    useGroupHeader: false
  };
};

exports.default = convertColumnElementsToData;

/***/ }),
/* 232 */
/***/ (function(module, exports, __webpack_require__) {

var basePickBy = __webpack_require__(233),
    hasIn = __webpack_require__(86);

/**
 * The base implementation of `_.pick` without support for individual
 * property identifiers.
 *
 * @private
 * @param {Object} object The source object.
 * @param {string[]} paths The property paths to pick.
 * @returns {Object} Returns the new object.
 */
function basePick(object, paths) {
  return basePickBy(object, paths, function(value, path) {
    return hasIn(object, path);
  });
}

module.exports = basePick;


/***/ }),
/* 233 */
/***/ (function(module, exports, __webpack_require__) {

var baseGet = __webpack_require__(61),
    baseSet = __webpack_require__(234),
    castPath = __webpack_require__(29);

/**
 * The base implementation of  `_.pickBy` without support for iteratee shorthands.
 *
 * @private
 * @param {Object} object The source object.
 * @param {string[]} paths The property paths to pick.
 * @param {Function} predicate The function invoked per property.
 * @returns {Object} Returns the new object.
 */
function basePickBy(object, paths, predicate) {
  var index = -1,
      length = paths.length,
      result = {};

  while (++index < length) {
    var path = paths[index],
        value = baseGet(object, path);

    if (predicate(value, path)) {
      baseSet(result, castPath(path, object), value);
    }
  }
  return result;
}

module.exports = basePickBy;


/***/ }),
/* 234 */
/***/ (function(module, exports, __webpack_require__) {

var assignValue = __webpack_require__(235),
    castPath = __webpack_require__(29),
    isIndex = __webpack_require__(54),
    isObject = __webpack_require__(24),
    toKey = __webpack_require__(15);

/**
 * The base implementation of `_.set`.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {Array|string} path The path of the property to set.
 * @param {*} value The value to set.
 * @param {Function} [customizer] The function to customize path creation.
 * @returns {Object} Returns `object`.
 */
function baseSet(object, path, value, customizer) {
  if (!isObject(object)) {
    return object;
  }
  path = castPath(path, object);

  var index = -1,
      length = path.length,
      lastIndex = length - 1,
      nested = object;

  while (nested != null && ++index < length) {
    var key = toKey(path[index]),
        newValue = value;

    if (index != lastIndex) {
      var objValue = nested[key];
      newValue = customizer ? customizer(objValue, key, nested) : undefined;
      if (newValue === undefined) {
        newValue = isObject(objValue)
          ? objValue
          : (isIndex(path[index + 1]) ? [] : {});
      }
    }
    assignValue(nested, key, newValue);
    nested = nested[key];
  }
  return object;
}

module.exports = baseSet;


/***/ }),
/* 235 */
/***/ (function(module, exports, __webpack_require__) {

var baseAssignValue = __webpack_require__(236),
    eq = __webpack_require__(58);

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Assigns `value` to `key` of `object` if the existing value is not equivalent
 * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * for equality comparisons.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {string} key The key of the property to assign.
 * @param {*} value The value to assign.
 */
function assignValue(object, key, value) {
  var objValue = object[key];
  if (!(hasOwnProperty.call(object, key) && eq(objValue, value)) ||
      (value === undefined && !(key in object))) {
    baseAssignValue(object, key, value);
  }
}

module.exports = assignValue;


/***/ }),
/* 236 */
/***/ (function(module, exports, __webpack_require__) {

var defineProperty = __webpack_require__(92);

/**
 * The base implementation of `assignValue` and `assignMergeValue` without
 * value checks.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {string} key The key of the property to assign.
 * @param {*} value The value to assign.
 */
function baseAssignValue(object, key, value) {
  if (key == '__proto__' && defineProperty) {
    defineProperty(object, key, {
      'configurable': true,
      'enumerable': true,
      'value': value,
      'writable': true
    });
  } else {
    object[key] = value;
  }
}

module.exports = baseAssignValue;


/***/ }),
/* 237 */
/***/ (function(module, exports, __webpack_require__) {

var flatten = __webpack_require__(238),
    overRest = __webpack_require__(241),
    setToString = __webpack_require__(243);

/**
 * A specialized version of `baseRest` which flattens the rest array.
 *
 * @private
 * @param {Function} func The function to apply a rest parameter to.
 * @returns {Function} Returns the new function.
 */
function flatRest(func) {
  return setToString(overRest(func, undefined, flatten), func + '');
}

module.exports = flatRest;


/***/ }),
/* 238 */
/***/ (function(module, exports, __webpack_require__) {

var baseFlatten = __webpack_require__(239);

/**
 * Flattens `array` a single level deep.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Array
 * @param {Array} array The array to flatten.
 * @returns {Array} Returns the new flattened array.
 * @example
 *
 * _.flatten([1, [2, [3, [4]], 5]]);
 * // => [1, 2, [3, [4]], 5]
 */
function flatten(array) {
  var length = array == null ? 0 : array.length;
  return length ? baseFlatten(array, 1) : [];
}

module.exports = flatten;


/***/ }),
/* 239 */
/***/ (function(module, exports, __webpack_require__) {

var arrayPush = __webpack_require__(82),
    isFlattenable = __webpack_require__(240);

/**
 * The base implementation of `_.flatten` with support for restricting flattening.
 *
 * @private
 * @param {Array} array The array to flatten.
 * @param {number} depth The maximum recursion depth.
 * @param {boolean} [predicate=isFlattenable] The function invoked per iteration.
 * @param {boolean} [isStrict] Restrict to values that pass `predicate` checks.
 * @param {Array} [result=[]] The initial result value.
 * @returns {Array} Returns the new flattened array.
 */
function baseFlatten(array, depth, predicate, isStrict, result) {
  var index = -1,
      length = array.length;

  predicate || (predicate = isFlattenable);
  result || (result = []);

  while (++index < length) {
    var value = array[index];
    if (depth > 0 && predicate(value)) {
      if (depth > 1) {
        // Recursively flatten arrays (susceptible to call stack limits).
        baseFlatten(value, depth - 1, predicate, isStrict, result);
      } else {
        arrayPush(result, value);
      }
    } else if (!isStrict) {
      result[result.length] = value;
    }
  }
  return result;
}

module.exports = baseFlatten;


/***/ }),
/* 240 */
/***/ (function(module, exports, __webpack_require__) {

var Symbol = __webpack_require__(13),
    isArguments = __webpack_require__(52),
    isArray = __webpack_require__(1);

/** Built-in value references. */
var spreadableSymbol = Symbol ? Symbol.isConcatSpreadable : undefined;

/**
 * Checks if `value` is a flattenable `arguments` object or array.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is flattenable, else `false`.
 */
function isFlattenable(value) {
  return isArray(value) || isArguments(value) ||
    !!(spreadableSymbol && value && value[spreadableSymbol]);
}

module.exports = isFlattenable;


/***/ }),
/* 241 */
/***/ (function(module, exports, __webpack_require__) {

var apply = __webpack_require__(242);

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max;

/**
 * A specialized version of `baseRest` which transforms the rest array.
 *
 * @private
 * @param {Function} func The function to apply a rest parameter to.
 * @param {number} [start=func.length-1] The start position of the rest parameter.
 * @param {Function} transform The rest array transform.
 * @returns {Function} Returns the new function.
 */
function overRest(func, start, transform) {
  start = nativeMax(start === undefined ? (func.length - 1) : start, 0);
  return function() {
    var args = arguments,
        index = -1,
        length = nativeMax(args.length - start, 0),
        array = Array(length);

    while (++index < length) {
      array[index] = args[start + index];
    }
    index = -1;
    var otherArgs = Array(start + 1);
    while (++index < start) {
      otherArgs[index] = args[index];
    }
    otherArgs[start] = transform(array);
    return apply(func, this, otherArgs);
  };
}

module.exports = overRest;


/***/ }),
/* 242 */
/***/ (function(module, exports) {

/**
 * A faster alternative to `Function#apply`, this function invokes `func`
 * with the `this` binding of `thisArg` and the arguments of `args`.
 *
 * @private
 * @param {Function} func The function to invoke.
 * @param {*} thisArg The `this` binding of `func`.
 * @param {Array} args The arguments to invoke `func` with.
 * @returns {*} Returns the result of `func`.
 */
function apply(func, thisArg, args) {
  switch (args.length) {
    case 0: return func.call(thisArg);
    case 1: return func.call(thisArg, args[0]);
    case 2: return func.call(thisArg, args[0], args[1]);
    case 3: return func.call(thisArg, args[0], args[1], args[2]);
  }
  return func.apply(thisArg, args);
}

module.exports = apply;


/***/ }),
/* 243 */
/***/ (function(module, exports, __webpack_require__) {

var baseSetToString = __webpack_require__(244),
    shortOut = __webpack_require__(246);

/**
 * Sets the `toString` method of `func` to return `string`.
 *
 * @private
 * @param {Function} func The function to modify.
 * @param {Function} string The `toString` result.
 * @returns {Function} Returns `func`.
 */
var setToString = shortOut(baseSetToString);

module.exports = setToString;


/***/ }),
/* 244 */
/***/ (function(module, exports, __webpack_require__) {

var constant = __webpack_require__(245),
    defineProperty = __webpack_require__(92),
    identity = __webpack_require__(64);

/**
 * The base implementation of `setToString` without support for hot loop shorting.
 *
 * @private
 * @param {Function} func The function to modify.
 * @param {Function} string The `toString` result.
 * @returns {Function} Returns `func`.
 */
var baseSetToString = !defineProperty ? identity : function(func, string) {
  return defineProperty(func, 'toString', {
    'configurable': true,
    'enumerable': false,
    'value': constant(string),
    'writable': true
  });
};

module.exports = baseSetToString;


/***/ }),
/* 245 */
/***/ (function(module, exports) {

/**
 * Creates a function that returns `value`.
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Util
 * @param {*} value The value to return from the new function.
 * @returns {Function} Returns the new constant function.
 * @example
 *
 * var objects = _.times(2, _.constant({ 'a': 1 }));
 *
 * console.log(objects);
 * // => [{ 'a': 1 }, { 'a': 1 }]
 *
 * console.log(objects[0] === objects[1]);
 * // => true
 */
function constant(value) {
  return function() {
    return value;
  };
}

module.exports = constant;


/***/ }),
/* 246 */
/***/ (function(module, exports) {

/** Used to detect hot functions by number of calls within a span of milliseconds. */
var HOT_COUNT = 800,
    HOT_SPAN = 16;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeNow = Date.now;

/**
 * Creates a function that'll short out and invoke `identity` instead
 * of `func` when it's called `HOT_COUNT` or more times in `HOT_SPAN`
 * milliseconds.
 *
 * @private
 * @param {Function} func The function to restrict.
 * @returns {Function} Returns the new shortable function.
 */
function shortOut(func) {
  var count = 0,
      lastCalled = 0;

  return function() {
    var stamp = nativeNow(),
        remaining = HOT_SPAN - (stamp - lastCalled);

    lastCalled = stamp;
    if (remaining > 0) {
      if (++count >= HOT_COUNT) {
        return arguments[0];
      }
    } else {
      count = 0;
    }
    return func.apply(undefined, arguments);
  };
}

module.exports = shortOut;


/***/ }),
/* 247 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Symbol_js__ = __webpack_require__(96);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__getRawTag_js__ = __webpack_require__(250);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__objectToString_js__ = __webpack_require__(251);




/** `Object#toString` result references. */
var nullTag = '[object Null]',
    undefinedTag = '[object Undefined]';

/** Built-in value references. */
var symToStringTag = __WEBPACK_IMPORTED_MODULE_0__Symbol_js__["a" /* default */] ? __WEBPACK_IMPORTED_MODULE_0__Symbol_js__["a" /* default */].toStringTag : undefined;

/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag(value) {
  if (value == null) {
    return value === undefined ? undefinedTag : nullTag;
  }
  return (symToStringTag && symToStringTag in Object(value))
    ? Object(__WEBPACK_IMPORTED_MODULE_1__getRawTag_js__["a" /* default */])(value)
    : Object(__WEBPACK_IMPORTED_MODULE_2__objectToString_js__["a" /* default */])(value);
}

/* harmony default export */ __webpack_exports__["a"] = (baseGetTag);


/***/ }),
/* 248 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__freeGlobal_js__ = __webpack_require__(249);


/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = __WEBPACK_IMPORTED_MODULE_0__freeGlobal_js__["a" /* default */] || freeSelf || Function('return this')();

/* harmony default export */ __webpack_exports__["a"] = (root);


/***/ }),
/* 249 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

/* harmony default export */ __webpack_exports__["a"] = (freeGlobal);

/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(6)))

/***/ }),
/* 250 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Symbol_js__ = __webpack_require__(96);


/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/** Built-in value references. */
var symToStringTag = __WEBPACK_IMPORTED_MODULE_0__Symbol_js__["a" /* default */] ? __WEBPACK_IMPORTED_MODULE_0__Symbol_js__["a" /* default */].toStringTag : undefined;

/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */
function getRawTag(value) {
  var isOwn = hasOwnProperty.call(value, symToStringTag),
      tag = value[symToStringTag];

  try {
    value[symToStringTag] = undefined;
    var unmasked = true;
  } catch (e) {}

  var result = nativeObjectToString.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag] = tag;
    } else {
      delete value[symToStringTag];
    }
  }
  return result;
}

/* harmony default export */ __webpack_exports__["a"] = (getRawTag);


/***/ }),
/* 251 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */
function objectToString(value) {
  return nativeObjectToString.call(value);
}

/* harmony default export */ __webpack_exports__["a"] = (objectToString);


/***/ }),
/* 252 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__overArg_js__ = __webpack_require__(253);


/** Built-in value references. */
var getPrototype = Object(__WEBPACK_IMPORTED_MODULE_0__overArg_js__["a" /* default */])(Object.getPrototypeOf, Object);

/* harmony default export */ __webpack_exports__["a"] = (getPrototype);


/***/ }),
/* 253 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * Creates a unary function that invokes `func` with its argument transformed.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {Function} transform The argument transform.
 * @returns {Function} Returns the new function.
 */
function overArg(func, transform) {
  return function(arg) {
    return func(transform(arg));
  };
}

/* harmony default export */ __webpack_exports__["a"] = (overArg);


/***/ }),
/* 254 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return value != null && typeof value == 'object';
}

/* harmony default export */ __webpack_exports__["a"] = (isObjectLike);


/***/ }),
/* 255 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(256);


/***/ }),
/* 256 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global, module) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ponyfill = __webpack_require__(257);

var _ponyfill2 = _interopRequireDefault(_ponyfill);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var root; /* global window */


if (typeof self !== 'undefined') {
  root = self;
} else if (typeof window !== 'undefined') {
  root = window;
} else if (typeof global !== 'undefined') {
  root = global;
} else if (true) {
  root = module;
} else {
  root = Function('return this')();
}

var result = (0, _ponyfill2['default'])(root);
exports['default'] = result;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6), __webpack_require__(53)(module)))

/***/ }),
/* 257 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports['default'] = symbolObservablePonyfill;
function symbolObservablePonyfill(root) {
	var result;
	var _Symbol = root.Symbol;

	if (typeof _Symbol === 'function') {
		if (_Symbol.observable) {
			result = _Symbol.observable;
		} else {
			result = _Symbol('observable');
			_Symbol.observable = result;
		}
	} else {
		result = '@@observable';
	}

	return result;
};

/***/ }),
/* 258 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/* harmony export (immutable) */ __webpack_exports__["a"] = combineReducers;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__createStore__ = __webpack_require__(94);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_lodash_es_isPlainObject__ = __webpack_require__(95);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils_warning__ = __webpack_require__(97);




function getUndefinedStateErrorMessage(key, action) {
  var actionType = action && action.type;
  var actionName = actionType && '"' + actionType.toString() + '"' || 'an action';

  return 'Given action ' + actionName + ', reducer "' + key + '" returned undefined. ' + 'To ignore an action, you must explicitly return the previous state. ' + 'If you want this reducer to hold no value, you can return null instead of undefined.';
}

function getUnexpectedStateShapeWarningMessage(inputState, reducers, action, unexpectedKeyCache) {
  var reducerKeys = Object.keys(reducers);
  var argumentName = action && action.type === __WEBPACK_IMPORTED_MODULE_0__createStore__["a" /* ActionTypes */].INIT ? 'preloadedState argument passed to createStore' : 'previous state received by the reducer';

  if (reducerKeys.length === 0) {
    return 'Store does not have a valid reducer. Make sure the argument passed ' + 'to combineReducers is an object whose values are reducers.';
  }

  if (!Object(__WEBPACK_IMPORTED_MODULE_1_lodash_es_isPlainObject__["a" /* default */])(inputState)) {
    return 'The ' + argumentName + ' has unexpected type of "' + {}.toString.call(inputState).match(/\s([a-z|A-Z]+)/)[1] + '". Expected argument to be an object with the following ' + ('keys: "' + reducerKeys.join('", "') + '"');
  }

  var unexpectedKeys = Object.keys(inputState).filter(function (key) {
    return !reducers.hasOwnProperty(key) && !unexpectedKeyCache[key];
  });

  unexpectedKeys.forEach(function (key) {
    unexpectedKeyCache[key] = true;
  });

  if (unexpectedKeys.length > 0) {
    return 'Unexpected ' + (unexpectedKeys.length > 1 ? 'keys' : 'key') + ' ' + ('"' + unexpectedKeys.join('", "') + '" found in ' + argumentName + '. ') + 'Expected to find one of the known reducer keys instead: ' + ('"' + reducerKeys.join('", "') + '". Unexpected keys will be ignored.');
  }
}

function assertReducerShape(reducers) {
  Object.keys(reducers).forEach(function (key) {
    var reducer = reducers[key];
    var initialState = reducer(undefined, { type: __WEBPACK_IMPORTED_MODULE_0__createStore__["a" /* ActionTypes */].INIT });

    if (typeof initialState === 'undefined') {
      throw new Error('Reducer "' + key + '" returned undefined during initialization. ' + 'If the state passed to the reducer is undefined, you must ' + 'explicitly return the initial state. The initial state may ' + 'not be undefined. If you don\'t want to set a value for this reducer, ' + 'you can use null instead of undefined.');
    }

    var type = '@@redux/PROBE_UNKNOWN_ACTION_' + Math.random().toString(36).substring(7).split('').join('.');
    if (typeof reducer(undefined, { type: type }) === 'undefined') {
      throw new Error('Reducer "' + key + '" returned undefined when probed with a random type. ' + ('Don\'t try to handle ' + __WEBPACK_IMPORTED_MODULE_0__createStore__["a" /* ActionTypes */].INIT + ' or other actions in "redux/*" ') + 'namespace. They are considered private. Instead, you must return the ' + 'current state for any unknown actions, unless it is undefined, ' + 'in which case you must return the initial state, regardless of the ' + 'action type. The initial state may not be undefined, but can be null.');
    }
  });
}

/**
 * Turns an object whose values are different reducer functions, into a single
 * reducer function. It will call every child reducer, and gather their results
 * into a single state object, whose keys correspond to the keys of the passed
 * reducer functions.
 *
 * @param {Object} reducers An object whose values correspond to different
 * reducer functions that need to be combined into one. One handy way to obtain
 * it is to use ES6 `import * as reducers` syntax. The reducers may never return
 * undefined for any action. Instead, they should return their initial state
 * if the state passed to them was undefined, and the current state for any
 * unrecognized action.
 *
 * @returns {Function} A reducer function that invokes every reducer inside the
 * passed object, and builds a state object with the same shape.
 */
function combineReducers(reducers) {
  var reducerKeys = Object.keys(reducers);
  var finalReducers = {};
  for (var i = 0; i < reducerKeys.length; i++) {
    var key = reducerKeys[i];

    if (process.env.NODE_ENV !== 'production') {
      if (typeof reducers[key] === 'undefined') {
        Object(__WEBPACK_IMPORTED_MODULE_2__utils_warning__["a" /* default */])('No reducer provided for key "' + key + '"');
      }
    }

    if (typeof reducers[key] === 'function') {
      finalReducers[key] = reducers[key];
    }
  }
  var finalReducerKeys = Object.keys(finalReducers);

  var unexpectedKeyCache = void 0;
  if (process.env.NODE_ENV !== 'production') {
    unexpectedKeyCache = {};
  }

  var shapeAssertionError = void 0;
  try {
    assertReducerShape(finalReducers);
  } catch (e) {
    shapeAssertionError = e;
  }

  return function combination() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var action = arguments[1];

    if (shapeAssertionError) {
      throw shapeAssertionError;
    }

    if (process.env.NODE_ENV !== 'production') {
      var warningMessage = getUnexpectedStateShapeWarningMessage(state, finalReducers, action, unexpectedKeyCache);
      if (warningMessage) {
        Object(__WEBPACK_IMPORTED_MODULE_2__utils_warning__["a" /* default */])(warningMessage);
      }
    }

    var hasChanged = false;
    var nextState = {};
    for (var _i = 0; _i < finalReducerKeys.length; _i++) {
      var _key = finalReducerKeys[_i];
      var reducer = finalReducers[_key];
      var previousStateForKey = state[_key];
      var nextStateForKey = reducer(previousStateForKey, action);
      if (typeof nextStateForKey === 'undefined') {
        var errorMessage = getUndefinedStateErrorMessage(_key, action);
        throw new Error(errorMessage);
      }
      nextState[_key] = nextStateForKey;
      hasChanged = hasChanged || nextStateForKey !== previousStateForKey;
    }
    return hasChanged ? nextState : state;
  };
}
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(3)))

/***/ }),
/* 259 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = bindActionCreators;
function bindActionCreator(actionCreator, dispatch) {
  return function () {
    return dispatch(actionCreator.apply(undefined, arguments));
  };
}

/**
 * Turns an object whose values are action creators, into an object with the
 * same keys, but with every function wrapped into a `dispatch` call so they
 * may be invoked directly. This is just a convenience method, as you can call
 * `store.dispatch(MyActionCreators.doSomething())` yourself just fine.
 *
 * For convenience, you can also pass a single function as the first argument,
 * and get a function in return.
 *
 * @param {Function|Object} actionCreators An object whose values are action
 * creator functions. One handy way to obtain it is to use ES6 `import * as`
 * syntax. You may also pass a single function.
 *
 * @param {Function} dispatch The `dispatch` function available on your Redux
 * store.
 *
 * @returns {Function|Object} The object mimicking the original object, but with
 * every action creator wrapped into the `dispatch` call. If you passed a
 * function as `actionCreators`, the return value will also be a single
 * function.
 */
function bindActionCreators(actionCreators, dispatch) {
  if (typeof actionCreators === 'function') {
    return bindActionCreator(actionCreators, dispatch);
  }

  if (typeof actionCreators !== 'object' || actionCreators === null) {
    throw new Error('bindActionCreators expected an object or a function, instead received ' + (actionCreators === null ? 'null' : typeof actionCreators) + '. ' + 'Did you write "import ActionCreators from" instead of "import * as ActionCreators from"?');
  }

  var keys = Object.keys(actionCreators);
  var boundActionCreators = {};
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    var actionCreator = actionCreators[key];
    if (typeof actionCreator === 'function') {
      boundActionCreators[key] = bindActionCreator(actionCreator, dispatch);
    }
  }
  return boundActionCreators;
}

/***/ }),
/* 260 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = applyMiddleware;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__compose__ = __webpack_require__(98);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



/**
 * Creates a store enhancer that applies middleware to the dispatch method
 * of the Redux store. This is handy for a variety of tasks, such as expressing
 * asynchronous actions in a concise manner, or logging every action payload.
 *
 * See `redux-thunk` package as an example of the Redux middleware.
 *
 * Because middleware is potentially asynchronous, this should be the first
 * store enhancer in the composition chain.
 *
 * Note that each middleware will be given the `dispatch` and `getState` functions
 * as named arguments.
 *
 * @param {...Function} middlewares The middleware chain to be applied.
 * @returns {Function} A store enhancer applying the middleware.
 */
function applyMiddleware() {
  for (var _len = arguments.length, middlewares = Array(_len), _key = 0; _key < _len; _key++) {
    middlewares[_key] = arguments[_key];
  }

  return function (createStore) {
    return function (reducer, preloadedState, enhancer) {
      var store = createStore(reducer, preloadedState, enhancer);
      var _dispatch = store.dispatch;
      var chain = [];

      var middlewareAPI = {
        getState: store.getState,
        dispatch: function dispatch(action) {
          return _dispatch(action);
        }
      };
      chain = middlewares.map(function (middleware) {
        return middleware(middlewareAPI);
      });
      _dispatch = __WEBPACK_IMPORTED_MODULE_0__compose__["a" /* default */].apply(undefined, chain)(store.dispatch);

      return _extends({}, store, {
        dispatch: _dispatch
      });
    };
  };
}

/***/ }),
/* 261 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright Schrodinger, LLC
 * All rights reserved.
 *
 * @providesModule columnActions
 */



Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resizeColumn = exports.moveColumnReorder = exports.stopColumnReorder = exports.startColumnReorder = undefined;

var _ActionTypes = __webpack_require__(18);

/**
 * Initiates column reordering
 *
 * @param {{scrollStart: number, columnKey: string, with: number, left: number}} reorderData
 */
var startColumnReorder = exports.startColumnReorder = function startColumnReorder(reorderData) {
  return {
    type: _ActionTypes.COLUMN_REORDER_START,
    reorderData: reorderData
  };
};

/**
 * Stops column reordering
 */
var stopColumnReorder = exports.stopColumnReorder = function stopColumnReorder() {
  return {
    type: _ActionTypes.COLUMN_REORDER_END
  };
};

/**
 * Stops column reordering
 *
 * @param {number} deltaX
 */
var moveColumnReorder = exports.moveColumnReorder = function moveColumnReorder(deltaX) {
  return {
    type: _ActionTypes.COLUMN_REORDER_MOVE,
    deltaX: deltaX
  };
};

/**
 * Fires a resize on column
 *
 * @param {!Object} reorderData
 */
var resizeColumn = exports.resizeColumn = function resizeColumn(resizeData) {
  return {
    type: _ActionTypes.COLUMN_RESIZE,
    resizeData: resizeData
  };
};

/***/ }),
/* 262 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright Schrodinger, LLC
 * All rights reserved.
 *
 * @providesModule scrollActions
 */



Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.stopScroll = exports.startScroll = exports.scrollToY = exports.scrollToX = undefined;

var _ActionTypes = __webpack_require__(18);

/**
 * Scrolls the table horizontally to position
 *
 * @param {number} scrollX
 */
var scrollToX = exports.scrollToX = function scrollToX(scrollX) {
  return {
    type: _ActionTypes.SCROLL_TO_X,
    scrollX: scrollX
  };
};

/**
 * Scrolls the table vertically to position
 *
 * @param {number} scrollY
 */
var scrollToY = exports.scrollToY = function scrollToY(scrollY) {
  return {
    type: _ActionTypes.SCROLL_TO_Y,
    scrollY: scrollY
  };
};

/**
 * Fire when user starts scrolling
 */
var startScroll = exports.startScroll = function startScroll() {
  return {
    type: _ActionTypes.SCROLL_START
  };
};

/**
 * Fire when user starts scrolling
 */
var stopScroll = exports.stopScroll = function stopScroll() {
  return {
    type: _ActionTypes.SCROLL_END
  };
};

/***/ }),
/* 263 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _React = __webpack_require__(0);

var _React2 = _interopRequireDefault(_React);

var _propTypes = __webpack_require__(2);

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright Schrodinger, LLC
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * All rights reserved.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * This source code is licensed under the BSD-style license found in the
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * LICENSE file in the root directory of this source tree. An additional grant
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * of patent rights can be found in the PATENTS file in the same directory.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @providesModule FixedDataTableColumn
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @typechecks
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

/**
 * Component that defines the attributes of table column.
 */
var FixedDataTableColumn = function (_React$Component) {
  _inherits(FixedDataTableColumn, _React$Component);

  function FixedDataTableColumn() {
    _classCallCheck(this, FixedDataTableColumn);

    return _possibleConstructorReturn(this, (FixedDataTableColumn.__proto__ || Object.getPrototypeOf(FixedDataTableColumn)).apply(this, arguments));
  }

  _createClass(FixedDataTableColumn, [{
    key: 'render',
    value: function render() {
      if (true) {
        throw new Error('Component <FixedDataTableColumn /> should never render');
      }
      return null;
    }
  }]);

  return FixedDataTableColumn;
}(_React2.default.Component);

FixedDataTableColumn.__TableColumn__ = true;
FixedDataTableColumn.propTypes = {
  /**
   * The horizontal alignment of the table cell content.
   */
  align: _propTypes2.default.oneOf(['left', 'center', 'right']),

  /**
   * Controls if the column is fixed when scrolling in the X axis.
   */
  fixed: _propTypes2.default.bool,

  /**
   * The header cell for this column.
   * This can either be a string a React element, or a function that generates
   * a React Element. Passing in a string will render a default header cell
   * with that string. By default, the React element passed in can expect to
   * receive the following props:
   *
   * ```
   * props: {
   *   columnKey: string // (of the column, if given)
   *   height: number // (supplied from the Table or rowHeightGetter)
   *   width: number // (supplied from the Column)
   * }
   * ```
   *
   * Because you are passing in your own React element, you can feel free to
   * pass in whatever props you may want or need.
   *
   * If you pass in a function, you will receive the same props object as the
   * first argument.
   */
  header: _propTypes2.default.oneOfType([_propTypes2.default.node, _propTypes2.default.func]),

  /**
   * This is the body cell that will be cloned for this column.
   * This can either be a string a React element, or a function that generates
   * a React Element. Passing in a string will render a default header cell
   * with that string. By default, the React element passed in can expect to
   * receive the following props:
   *
   * ```
   * props: {
   *   rowIndex; number // (the row index of the cell)
   *   columnKey: string // (of the column, if given)
   *   height: number // (supplied from the Table or rowHeightGetter)
   *   width: number // (supplied from the Column)
   * }
   * ```
   *
   * Because you are passing in your own React element, you can feel free to
   * pass in whatever props you may want or need.
   *
   * If you pass in a function, you will receive the same props object as the
   * first argument.
   */
  cell: _propTypes2.default.oneOfType([_propTypes2.default.node, _propTypes2.default.func]),

  /**
   * This is the footer cell for this column.
   * This can either be a string a React element, or a function that generates
   * a React Element. Passing in a string will render a default header cell
   * with that string. By default, the React element passed in can expect to
   * receive the following props:
   *
   * ```
   * props: {
   *   columnKey: string // (of the column, if given)
   *   height: number // (supplied from the Table or rowHeightGetter)
   *   width: number // (supplied from the Column)
   * }
   * ```
   *
   * Because you are passing in your own React element, you can feel free to
   * pass in whatever props you may want or need.
   *
   * If you pass in a function, you will receive the same props object as the
   * first argument.
   */
  footer: _propTypes2.default.oneOfType([_propTypes2.default.node, _propTypes2.default.func]),

  /**
   * This is used to uniquely identify the column, and is not required unless
   * you a resizing columns. This will be the key given in the
   * `onColumnResizeEndCallback` on the Table.
   */
  columnKey: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]),

  /**
   * The pixel width of the column.
   */
  width: _propTypes2.default.number.isRequired,

  /**
   * If this is a resizable column this is its minimum pixel width.
   */
  minWidth: _propTypes2.default.number,

  /**
   * If this is a resizable column this is its maximum pixel width.
   */
  maxWidth: _propTypes2.default.number,

  /**
   * The grow factor relative to other columns. Same as the flex-grow API
   * from http://www.w3.org/TR/css3-flexbox/. Basically, take any available
   * extra width and distribute it proportionally according to all columns'
   * flexGrow values. Defaults to zero (no-flexing).
   */
  flexGrow: _propTypes2.default.number,

  /**
   * Whether the column can be resized with the
   * FixedDataTableColumnResizeHandle. Please note that if a column
   * has a flex grow, once you resize the column this will be set to 0.
   *
   * This property only provides the UI for the column resizing. If this
   * is set to true, you will need to set the onColumnResizeEndCallback table
   * property and render your columns appropriately.
   */
  isResizable: _propTypes2.default.bool,

  /**
   * Whether the column can be dragged to reorder.
   */
  isReorderable: _propTypes2.default.bool,

  /**
   * Whether cells in this column can be removed from document when outside
   * of viewport as a result of horizontal scrolling.
   * Setting this property to true allows the table to not render cells in
   * particular column that are outside of viewport for visible rows. This
   * allows to create table with many columns and not have vertical scrolling
   * performance drop.
   * Setting the property to false will keep previous behaviour and keep
   * cell rendered if the row it belongs to is visible.
   */
  allowCellsRecycling: _propTypes2.default.bool,

  /**
   * Flag to enable performance check when rendering. Stops the component from
   * rendering if none of it's passed in props have changed
   */
  pureRendering: _propTypes2.default.bool
};
FixedDataTableColumn.defaultProps = {
  allowCellsRecycling: false,
  fixed: false
};


module.exports = FixedDataTableColumn;

/***/ }),
/* 264 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _React = __webpack_require__(0);

var _React2 = _interopRequireDefault(_React);

var _propTypes = __webpack_require__(2);

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright Schrodinger, LLC
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * All rights reserved.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * This source code is licensed under the BSD-style license found in the
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * LICENSE file in the root directory of this source tree. An additional grant
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * of patent rights can be found in the PATENTS file in the same directory.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @providesModule FixedDataTableColumnGroup
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @typechecks
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

/**
 * Component that defines the attributes of a table column group.
 */
var FixedDataTableColumnGroup = function (_React$Component) {
  _inherits(FixedDataTableColumnGroup, _React$Component);

  function FixedDataTableColumnGroup() {
    _classCallCheck(this, FixedDataTableColumnGroup);

    return _possibleConstructorReturn(this, (FixedDataTableColumnGroup.__proto__ || Object.getPrototypeOf(FixedDataTableColumnGroup)).apply(this, arguments));
  }

  _createClass(FixedDataTableColumnGroup, [{
    key: 'render',
    value: function render() {
      if (true) {
        throw new Error('Component <FixedDataTableColumnGroup /> should never render');
      }
      return null;
    }
  }]);

  return FixedDataTableColumnGroup;
}(_React2.default.Component);

FixedDataTableColumnGroup.__TableColumnGroup__ = true;
FixedDataTableColumnGroup.propTypes = {
  /**
   * The horizontal alignment of the table cell content.
   */
  align: _propTypes2.default.oneOf(['left', 'center', 'right']),

  /**
   * Controls if the column group is fixed when scrolling in the X axis.
   */
  fixed: _propTypes2.default.bool,

  /**
   * This is the header cell for this column group.
   * This can either be a string or a React element. Passing in a string
   * will render a default footer cell with that string. By default, the React
   * element passed in can expect to receive the following props:
   *
   * ```
   * props: {
   *   height: number // (supplied from the groupHeaderHeight)
   *   width: number // (supplied from the Column)
   * }
   * ```
   *
   * Because you are passing in your own React element, you can feel free to
   * pass in whatever props you may want or need.
   *
   * You can also pass in a function that returns a react elemnt, with the
   * props object above passed in as the first parameter.
   */
  header: _propTypes2.default.oneOfType([_propTypes2.default.node, _propTypes2.default.func])

};
FixedDataTableColumnGroup.defaultProps = {
  fixed: false
};


module.exports = FixedDataTableColumnGroup;

/***/ })
/******/ ]);
});