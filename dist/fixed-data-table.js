(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined'
    ? factory(exports, require('react'), require('react-dom'))
    : typeof define === 'function' && define.amd
    ? define(['exports', 'react', 'react-dom'], factory)
    : ((global =
        typeof globalThis !== 'undefined' ? globalThis : global || self),
      factory((global.FixedDataTable = {}), global.React, global.ReactDOM));
})(this, function (exports, React, ReactDOM) {
  'use strict';

  function _interopDefaultLegacy(e) {
    return e && typeof e === 'object' && 'default' in e ? e : { default: e };
  }

  let React__default = /*#__PURE__*/ _interopDefaultLegacy(React);
  let ReactDOM__default = /*#__PURE__*/ _interopDefaultLegacy(ReactDOM);

  function _extends() {
    _extends =
      Object.assign ||
      function (target) {
        for (let i = 1; i < arguments.length; i++) {
          let source = arguments[i];

          for (let key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
              target[key] = source[key];
            }
          }
        }

        return target;
      };

    return _extends.apply(this, arguments);
  }

  function _classCallCheck$2(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError('Cannot call a class as a function');
    }
  }

  function _defineProperties(target, props) {
    for (let i = 0; i < props.length; i++) {
      let descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ('value' in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass$2(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    Object.defineProperty(Constructor, 'prototype', {
      writable: false,
    });
    return Constructor;
  }

  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError(
        "this hasn't been initialised - super() hasn't been called"
      );
    }

    return self;
  }

  function _setPrototypeOf(o, p) {
    _setPrototypeOf =
      Object.setPrototypeOf ||
      function _setPrototypeOf(o, p) {
        o.__proto__ = p;
        return o;
      };

    return _setPrototypeOf(o, p);
  }

  function _inherits$2(subClass, superClass) {
    if (typeof superClass !== 'function' && superClass !== null) {
      throw new TypeError('Super expression must either be null or a function');
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        writable: true,
        configurable: true,
      },
    });
    Object.defineProperty(subClass, 'prototype', {
      writable: false,
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
  }

  function _typeof(obj) {
    '@babel/helpers - typeof';

    return (
      (_typeof =
        'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
          ? function (obj) {
              return typeof obj;
            }
          : function (obj) {
              return obj &&
                'function' == typeof Symbol &&
                obj.constructor === Symbol &&
                obj !== Symbol.prototype
                ? 'symbol'
                : typeof obj;
            }),
      _typeof(obj)
    );
  }

  function _possibleConstructorReturn$2(self, call) {
    if (call && (_typeof(call) === 'object' || typeof call === 'function')) {
      return call;
    } else if (call !== void 0) {
      throw new TypeError(
        'Derived constructors may only return object or undefined'
      );
    }

    return _assertThisInitialized(self);
  }

  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf
      ? Object.getPrototypeOf
      : function _getPrototypeOf(o) {
          return o.__proto__ || Object.getPrototypeOf(o);
        };
    return _getPrototypeOf(o);
  }

  function _defineProperty$1(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value,
        enumerable: true,
        configurable: true,
        writable: true,
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

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

  let invariant$1 = function invariant(condition, format, a, b, c, d, e, f) {
    {
      if (format === undefined) {
        throw new Error('invariant requires an error message argument');
      }
    }

    if (!condition) {
      let error;

      if (format === undefined) {
        error = new Error(
          'Minified exception occurred; use the non-minified dev environment ' +
            'for the full error message and additional helpful warnings.'
        );
      } else {
        let args = [a, b, c, d, e, f];
        let argIndex = 0;
        error = new Error(
          'Invariant Violation: ' +
            format.replace(/%s/g, function () {
              return args[argIndex++];
            })
        );
      }

      error.framesToPop = 1; // we don't care about invariant's own frame

      throw error;
    }
  };

  let commonjsGlobal =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : typeof self !== 'undefined'
      ? self
      : {};

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

  let isArray$c = Array.isArray;

  let isArray_1 = isArray$c;

  /** Detect free variable `global` from Node.js. */

  let freeGlobal$1 =
    typeof commonjsGlobal == 'object' &&
    commonjsGlobal &&
    commonjsGlobal.Object === Object &&
    commonjsGlobal;

  let _freeGlobal = freeGlobal$1;

  let freeGlobal = _freeGlobal;

  /** Detect free variable `self`. */
  let freeSelf =
    typeof self == 'object' && self && self.Object === Object && self;

  /** Used as a reference to the global object. */
  let root$8 = freeGlobal || freeSelf || Function('return this')();

  let _root = root$8;

  let root$7 = _root;

  /** Built-in value references. */
  let Symbol$6 = root$7.Symbol;

  let _Symbol = Symbol$6;

  let Symbol$5 = _Symbol;

  /** Used for built-in method references. */
  let objectProto$d = Object.prototype;

  /** Used to check objects for own properties. */
  let hasOwnProperty$b = objectProto$d.hasOwnProperty;

  /**
   * Used to resolve the
   * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
   * of values.
   */
  let nativeObjectToString$1 = objectProto$d.toString;

  /** Built-in value references. */
  let symToStringTag$1 = Symbol$5 ? Symbol$5.toStringTag : undefined;

  /**
   * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
   *
   * @private
   * @param {*} value The value to query.
   * @returns {string} Returns the raw `toStringTag`.
   */
  function getRawTag$1(value) {
    let isOwn = hasOwnProperty$b.call(value, symToStringTag$1),
      tag = value[symToStringTag$1];

    try {
      value[symToStringTag$1] = undefined;
      var unmasked = true;
    } catch (e) {}

    let result = nativeObjectToString$1.call(value);
    if (unmasked) {
      if (isOwn) {
        value[symToStringTag$1] = tag;
      } else {
        delete value[symToStringTag$1];
      }
    }
    return result;
  }

  let _getRawTag = getRawTag$1;

  /** Used for built-in method references. */

  let objectProto$c = Object.prototype;

  /**
   * Used to resolve the
   * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
   * of values.
   */
  let nativeObjectToString = objectProto$c.toString;

  /**
   * Converts `value` to a string using `Object.prototype.toString`.
   *
   * @private
   * @param {*} value The value to convert.
   * @returns {string} Returns the converted string.
   */
  function objectToString$1(value) {
    return nativeObjectToString.call(value);
  }

  let _objectToString = objectToString$1;

  let Symbol$4 = _Symbol,
    getRawTag = _getRawTag,
    objectToString = _objectToString;

  /** `Object#toString` result references. */
  let nullTag = '[object Null]',
    undefinedTag = '[object Undefined]';

  /** Built-in value references. */
  let symToStringTag = Symbol$4 ? Symbol$4.toStringTag : undefined;

  /**
   * The base implementation of `getTag` without fallbacks for buggy environments.
   *
   * @private
   * @param {*} value The value to query.
   * @returns {string} Returns the `toStringTag`.
   */
  function baseGetTag$7(value) {
    if (value == null) {
      return value === undefined ? undefinedTag : nullTag;
    }
    return symToStringTag && symToStringTag in Object(value)
      ? getRawTag(value)
      : objectToString(value);
  }

  let _baseGetTag = baseGetTag$7;

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

  function isObjectLike$8(value) {
    return value != null && typeof value == 'object';
  }

  let isObjectLike_1 = isObjectLike$8;

  let baseGetTag$6 = _baseGetTag,
    isObjectLike$7 = isObjectLike_1;

  /** `Object#toString` result references. */
  let symbolTag$2 = '[object Symbol]';

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
  function isSymbol$4(value) {
    return (
      typeof value == 'symbol' ||
      (isObjectLike$7(value) && baseGetTag$6(value) == symbolTag$2)
    );
  }

  let isSymbol_1 = isSymbol$4;

  let isArray$b = isArray_1,
    isSymbol$3 = isSymbol_1;

  /** Used to match property names within property paths. */
  let reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
    reIsPlainProp = /^\w*$/;

  /**
   * Checks if `value` is a property name and not a property path.
   *
   * @private
   * @param {*} value The value to check.
   * @param {Object} [object] The object to query keys on.
   * @returns {boolean} Returns `true` if `value` is a property name, else `false`.
   */
  function isKey$1(value, object) {
    if (isArray$b(value)) {
      return false;
    }
    let type = typeof value;
    if (
      type == 'number' ||
      type == 'symbol' ||
      type == 'boolean' ||
      value == null ||
      isSymbol$3(value)
    ) {
      return true;
    }
    return (
      reIsPlainProp.test(value) ||
      !reIsDeepProp.test(value) ||
      (object != null && value in Object(object))
    );
  }

  let _isKey = isKey$1;

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

  function isObject$7(value) {
    let type = typeof value;
    return value != null && (type == 'object' || type == 'function');
  }

  let isObject_1 = isObject$7;

  let baseGetTag$5 = _baseGetTag,
    isObject$6 = isObject_1;

  /** `Object#toString` result references. */
  let asyncTag = '[object AsyncFunction]',
    funcTag$2 = '[object Function]',
    genTag$1 = '[object GeneratorFunction]',
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
  function isFunction$2(value) {
    if (!isObject$6(value)) {
      return false;
    }
    // The use of `Object#toString` avoids issues with the `typeof` operator
    // in Safari 9 which returns 'object' for typed arrays and other constructors.
    let tag = baseGetTag$5(value);
    return (
      tag == funcTag$2 || tag == genTag$1 || tag == asyncTag || tag == proxyTag
    );
  }

  let isFunction_1 = isFunction$2;

  let root$6 = _root;

  /** Used to detect overreaching core-js shims. */
  let coreJsData$1 = root$6['__core-js_shared__'];

  let _coreJsData = coreJsData$1;

  let coreJsData = _coreJsData;

  /** Used to detect methods masquerading as native. */
  let maskSrcKey = (function () {
    let uid = /[^.]+$/.exec(
      (coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO) || ''
    );
    return uid ? 'Symbol(src)_1.' + uid : '';
  })();

  /**
   * Checks if `func` has its source masked.
   *
   * @private
   * @param {Function} func The function to check.
   * @returns {boolean} Returns `true` if `func` is masked, else `false`.
   */
  function isMasked$1(func) {
    return !!maskSrcKey && maskSrcKey in func;
  }

  let _isMasked = isMasked$1;

  /** Used for built-in method references. */

  let funcProto$1 = Function.prototype;

  /** Used to resolve the decompiled source of functions. */
  let funcToString$1 = funcProto$1.toString;

  /**
   * Converts `func` to its source code.
   *
   * @private
   * @param {Function} func The function to convert.
   * @returns {string} Returns the source code.
   */
  function toSource$2(func) {
    if (func != null) {
      try {
        return funcToString$1.call(func);
      } catch (e) {}
      try {
        return func + '';
      } catch (e) {}
    }
    return '';
  }

  let _toSource = toSource$2;

  let isFunction$1 = isFunction_1,
    isMasked = _isMasked,
    isObject$5 = isObject_1,
    toSource$1 = _toSource;

  /**
   * Used to match `RegExp`
   * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
   */
  let reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

  /** Used to detect host constructors (Safari). */
  let reIsHostCtor = /^\[object .+?Constructor\]$/;

  /** Used for built-in method references. */
  let funcProto = Function.prototype,
    objectProto$b = Object.prototype;

  /** Used to resolve the decompiled source of functions. */
  let funcToString = funcProto.toString;

  /** Used to check objects for own properties. */
  let hasOwnProperty$a = objectProto$b.hasOwnProperty;

  /** Used to detect if a method is native. */
  let reIsNative = RegExp(
    '^' +
      funcToString
        .call(hasOwnProperty$a)
        .replace(reRegExpChar, '\\$&')
        .replace(
          /hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,
          '$1.*?'
        ) +
      '$'
  );

  /**
   * The base implementation of `_.isNative` without bad shim checks.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a native function,
   *  else `false`.
   */
  function baseIsNative$1(value) {
    if (!isObject$5(value) || isMasked(value)) {
      return false;
    }
    let pattern = isFunction$1(value) ? reIsNative : reIsHostCtor;
    return pattern.test(toSource$1(value));
  }

  let _baseIsNative = baseIsNative$1;

  /**
   * Gets the value at `key` of `object`.
   *
   * @private
   * @param {Object} [object] The object to query.
   * @param {string} key The key of the property to get.
   * @returns {*} Returns the property value.
   */

  function getValue$1(object, key) {
    return object == null ? undefined : object[key];
  }

  let _getValue = getValue$1;

  let baseIsNative = _baseIsNative,
    getValue = _getValue;

  /**
   * Gets the native function at `key` of `object`.
   *
   * @private
   * @param {Object} object The object to query.
   * @param {string} key The key of the method to get.
   * @returns {*} Returns the function if it's native, else `undefined`.
   */
  function getNative$7(object, key) {
    let value = getValue(object, key);
    return baseIsNative(value) ? value : undefined;
  }

  let _getNative = getNative$7;

  let getNative$6 = _getNative;

  /* Built-in method references that are verified to be native. */
  let nativeCreate$4 = getNative$6(Object, 'create');

  let _nativeCreate = nativeCreate$4;

  let nativeCreate$3 = _nativeCreate;

  /**
   * Removes all key-value entries from the hash.
   *
   * @private
   * @name clear
   * @memberOf Hash
   */
  function hashClear$1() {
    this.__data__ = nativeCreate$3 ? nativeCreate$3(null) : {};
    this.size = 0;
  }

  let _hashClear = hashClear$1;

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

  function hashDelete$1(key) {
    let result = this.has(key) && delete this.__data__[key];
    this.size -= result ? 1 : 0;
    return result;
  }

  let _hashDelete = hashDelete$1;

  let nativeCreate$2 = _nativeCreate;

  /** Used to stand-in for `undefined` hash values. */
  let HASH_UNDEFINED$1 = '__lodash_hash_undefined__';

  /** Used for built-in method references. */
  let objectProto$a = Object.prototype;

  /** Used to check objects for own properties. */
  let hasOwnProperty$9 = objectProto$a.hasOwnProperty;

  /**
   * Gets the hash value for `key`.
   *
   * @private
   * @name get
   * @memberOf Hash
   * @param {string} key The key of the value to get.
   * @returns {*} Returns the entry value.
   */
  function hashGet$1(key) {
    let data = this.__data__;
    if (nativeCreate$2) {
      let result = data[key];
      return result === HASH_UNDEFINED$1 ? undefined : result;
    }
    return hasOwnProperty$9.call(data, key) ? data[key] : undefined;
  }

  let _hashGet = hashGet$1;

  let nativeCreate$1 = _nativeCreate;

  /** Used for built-in method references. */
  let objectProto$9 = Object.prototype;

  /** Used to check objects for own properties. */
  let hasOwnProperty$8 = objectProto$9.hasOwnProperty;

  /**
   * Checks if a hash value for `key` exists.
   *
   * @private
   * @name has
   * @memberOf Hash
   * @param {string} key The key of the entry to check.
   * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
   */
  function hashHas$1(key) {
    let data = this.__data__;
    return nativeCreate$1
      ? data[key] !== undefined
      : hasOwnProperty$8.call(data, key);
  }

  let _hashHas = hashHas$1;

  let nativeCreate = _nativeCreate;

  /** Used to stand-in for `undefined` hash values. */
  let HASH_UNDEFINED = '__lodash_hash_undefined__';

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
  function hashSet$1(key, value) {
    let data = this.__data__;
    this.size += this.has(key) ? 0 : 1;
    data[key] = nativeCreate && value === undefined ? HASH_UNDEFINED : value;
    return this;
  }

  let _hashSet = hashSet$1;

  let hashClear = _hashClear,
    hashDelete = _hashDelete,
    hashGet = _hashGet,
    hashHas = _hashHas,
    hashSet = _hashSet;

  /**
   * Creates a hash object.
   *
   * @private
   * @constructor
   * @param {Array} [entries] The key-value pairs to cache.
   */
  function Hash$1(entries) {
    let index = -1,
      length = entries == null ? 0 : entries.length;

    this.clear();
    while (++index < length) {
      let entry = entries[index];
      this.set(entry[0], entry[1]);
    }
  }

  // Add methods to `Hash`.
  Hash$1.prototype.clear = hashClear;
  Hash$1.prototype['delete'] = hashDelete;
  Hash$1.prototype.get = hashGet;
  Hash$1.prototype.has = hashHas;
  Hash$1.prototype.set = hashSet;

  let _Hash = Hash$1;

  /**
   * Removes all key-value entries from the list cache.
   *
   * @private
   * @name clear
   * @memberOf ListCache
   */

  function listCacheClear$1() {
    this.__data__ = [];
    this.size = 0;
  }

  let _listCacheClear = listCacheClear$1;

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

  function eq$2(value, other) {
    return value === other || (value !== value && other !== other);
  }

  let eq_1 = eq$2;

  let eq$1 = eq_1;

  /**
   * Gets the index at which the `key` is found in `array` of key-value pairs.
   *
   * @private
   * @param {Array} array The array to inspect.
   * @param {*} key The key to search for.
   * @returns {number} Returns the index of the matched value, else `-1`.
   */
  function assocIndexOf$4(array, key) {
    let length = array.length;
    while (length--) {
      if (eq$1(array[length][0], key)) {
        return length;
      }
    }
    return -1;
  }

  let _assocIndexOf = assocIndexOf$4;

  let assocIndexOf$3 = _assocIndexOf;

  /** Used for built-in method references. */
  let arrayProto = Array.prototype;

  /** Built-in value references. */
  let splice = arrayProto.splice;

  /**
   * Removes `key` and its value from the list cache.
   *
   * @private
   * @name delete
   * @memberOf ListCache
   * @param {string} key The key of the value to remove.
   * @returns {boolean} Returns `true` if the entry was removed, else `false`.
   */
  function listCacheDelete$1(key) {
    let data = this.__data__,
      index = assocIndexOf$3(data, key);

    if (index < 0) {
      return false;
    }
    let lastIndex = data.length - 1;
    if (index == lastIndex) {
      data.pop();
    } else {
      splice.call(data, index, 1);
    }
    --this.size;
    return true;
  }

  let _listCacheDelete = listCacheDelete$1;

  let assocIndexOf$2 = _assocIndexOf;

  /**
   * Gets the list cache value for `key`.
   *
   * @private
   * @name get
   * @memberOf ListCache
   * @param {string} key The key of the value to get.
   * @returns {*} Returns the entry value.
   */
  function listCacheGet$1(key) {
    let data = this.__data__,
      index = assocIndexOf$2(data, key);

    return index < 0 ? undefined : data[index][1];
  }

  let _listCacheGet = listCacheGet$1;

  let assocIndexOf$1 = _assocIndexOf;

  /**
   * Checks if a list cache value for `key` exists.
   *
   * @private
   * @name has
   * @memberOf ListCache
   * @param {string} key The key of the entry to check.
   * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
   */
  function listCacheHas$1(key) {
    return assocIndexOf$1(this.__data__, key) > -1;
  }

  let _listCacheHas = listCacheHas$1;

  let assocIndexOf = _assocIndexOf;

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
  function listCacheSet$1(key, value) {
    let data = this.__data__,
      index = assocIndexOf(data, key);

    if (index < 0) {
      ++this.size;
      data.push([key, value]);
    } else {
      data[index][1] = value;
    }
    return this;
  }

  let _listCacheSet = listCacheSet$1;

  let listCacheClear = _listCacheClear,
    listCacheDelete = _listCacheDelete,
    listCacheGet = _listCacheGet,
    listCacheHas = _listCacheHas,
    listCacheSet = _listCacheSet;

  /**
   * Creates an list cache object.
   *
   * @private
   * @constructor
   * @param {Array} [entries] The key-value pairs to cache.
   */
  function ListCache$4(entries) {
    let index = -1,
      length = entries == null ? 0 : entries.length;

    this.clear();
    while (++index < length) {
      let entry = entries[index];
      this.set(entry[0], entry[1]);
    }
  }

  // Add methods to `ListCache`.
  ListCache$4.prototype.clear = listCacheClear;
  ListCache$4.prototype['delete'] = listCacheDelete;
  ListCache$4.prototype.get = listCacheGet;
  ListCache$4.prototype.has = listCacheHas;
  ListCache$4.prototype.set = listCacheSet;

  let _ListCache = ListCache$4;

  let getNative$5 = _getNative,
    root$5 = _root;

  /* Built-in method references that are verified to be native. */
  let Map$4 = getNative$5(root$5, 'Map');

  let _Map = Map$4;

  let Hash = _Hash,
    ListCache$3 = _ListCache,
    Map$3 = _Map;

  /**
   * Removes all key-value entries from the map.
   *
   * @private
   * @name clear
   * @memberOf MapCache
   */
  function mapCacheClear$1() {
    this.size = 0;
    this.__data__ = {
      hash: new Hash(),
      map: new (Map$3 || ListCache$3)(),
      string: new Hash(),
    };
  }

  let _mapCacheClear = mapCacheClear$1;

  /**
   * Checks if `value` is suitable for use as unique object key.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
   */

  function isKeyable$1(value) {
    let type = typeof value;
    return type == 'string' ||
      type == 'number' ||
      type == 'symbol' ||
      type == 'boolean'
      ? value !== '__proto__'
      : value === null;
  }

  let _isKeyable = isKeyable$1;

  let isKeyable = _isKeyable;

  /**
   * Gets the data for `map`.
   *
   * @private
   * @param {Object} map The map to query.
   * @param {string} key The reference key.
   * @returns {*} Returns the map data.
   */
  function getMapData$4(map, key) {
    let data = map.__data__;
    return isKeyable(key)
      ? data[typeof key == 'string' ? 'string' : 'hash']
      : data.map;
  }

  let _getMapData = getMapData$4;

  let getMapData$3 = _getMapData;

  /**
   * Removes `key` and its value from the map.
   *
   * @private
   * @name delete
   * @memberOf MapCache
   * @param {string} key The key of the value to remove.
   * @returns {boolean} Returns `true` if the entry was removed, else `false`.
   */
  function mapCacheDelete$1(key) {
    let result = getMapData$3(this, key)['delete'](key);
    this.size -= result ? 1 : 0;
    return result;
  }

  let _mapCacheDelete = mapCacheDelete$1;

  let getMapData$2 = _getMapData;

  /**
   * Gets the map value for `key`.
   *
   * @private
   * @name get
   * @memberOf MapCache
   * @param {string} key The key of the value to get.
   * @returns {*} Returns the entry value.
   */
  function mapCacheGet$1(key) {
    return getMapData$2(this, key).get(key);
  }

  let _mapCacheGet = mapCacheGet$1;

  let getMapData$1 = _getMapData;

  /**
   * Checks if a map value for `key` exists.
   *
   * @private
   * @name has
   * @memberOf MapCache
   * @param {string} key The key of the entry to check.
   * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
   */
  function mapCacheHas$1(key) {
    return getMapData$1(this, key).has(key);
  }

  let _mapCacheHas = mapCacheHas$1;

  let getMapData = _getMapData;

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
  function mapCacheSet$1(key, value) {
    let data = getMapData(this, key),
      size = data.size;

    data.set(key, value);
    this.size += data.size == size ? 0 : 1;
    return this;
  }

  let _mapCacheSet = mapCacheSet$1;

  let mapCacheClear = _mapCacheClear,
    mapCacheDelete = _mapCacheDelete,
    mapCacheGet = _mapCacheGet,
    mapCacheHas = _mapCacheHas,
    mapCacheSet = _mapCacheSet;

  /**
   * Creates a map cache object to store key-value pairs.
   *
   * @private
   * @constructor
   * @param {Array} [entries] The key-value pairs to cache.
   */
  function MapCache$2(entries) {
    let index = -1,
      length = entries == null ? 0 : entries.length;

    this.clear();
    while (++index < length) {
      let entry = entries[index];
      this.set(entry[0], entry[1]);
    }
  }

  // Add methods to `MapCache`.
  MapCache$2.prototype.clear = mapCacheClear;
  MapCache$2.prototype['delete'] = mapCacheDelete;
  MapCache$2.prototype.get = mapCacheGet;
  MapCache$2.prototype.has = mapCacheHas;
  MapCache$2.prototype.set = mapCacheSet;

  let _MapCache = MapCache$2;

  let MapCache$1 = _MapCache;

  /** Error message constants. */
  let FUNC_ERROR_TEXT = 'Expected a function';

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
  function memoize$1(func, resolver) {
    if (
      typeof func != 'function' ||
      (resolver != null && typeof resolver != 'function')
    ) {
      throw new TypeError(FUNC_ERROR_TEXT);
    }
    var memoized = function () {
      let args = arguments,
        key = resolver ? resolver.apply(this, args) : args[0],
        cache = memoized.cache;

      if (cache.has(key)) {
        return cache.get(key);
      }
      let result = func.apply(this, args);
      memoized.cache = cache.set(key, result) || cache;
      return result;
    };
    memoized.cache = new (memoize$1.Cache || MapCache$1)();
    return memoized;
  }

  // Expose `MapCache`.
  memoize$1.Cache = MapCache$1;

  let memoize_1 = memoize$1;

  let memoize = memoize_1;

  /** Used as the maximum memoize cache size. */
  let MAX_MEMOIZE_SIZE = 500;

  /**
   * A specialized version of `_.memoize` which clears the memoized function's
   * cache when it exceeds `MAX_MEMOIZE_SIZE`.
   *
   * @private
   * @param {Function} func The function to have its output memoized.
   * @returns {Function} Returns the new memoized function.
   */
  function memoizeCapped$1(func) {
    let result = memoize(func, function (key) {
      if (cache.size === MAX_MEMOIZE_SIZE) {
        cache.clear();
      }
      return key;
    });

    var cache = result.cache;
    return result;
  }

  let _memoizeCapped = memoizeCapped$1;

  let memoizeCapped = _memoizeCapped;

  /** Used to match property names within property paths. */
  let rePropName =
    /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;

  /** Used to match backslashes in property paths. */
  let reEscapeChar = /\\(\\)?/g;

  /**
   * Converts `string` to a property path array.
   *
   * @private
   * @param {string} string The string to convert.
   * @returns {Array} Returns the property path array.
   */
  let stringToPath$1 = memoizeCapped(function (string) {
    let result = [];
    if (string.charCodeAt(0) === 46 /* . */) {
      result.push('');
    }
    string.replace(rePropName, function (match, number, quote, subString) {
      result.push(
        quote ? subString.replace(reEscapeChar, '$1') : number || match
      );
    });
    return result;
  });

  let _stringToPath = stringToPath$1;

  /**
   * A specialized version of `_.map` for arrays without support for iteratee
   * shorthands.
   *
   * @private
   * @param {Array} [array] The array to iterate over.
   * @param {Function} iteratee The function invoked per iteration.
   * @returns {Array} Returns the new mapped array.
   */

  function arrayMap$1(array, iteratee) {
    let index = -1,
      length = array == null ? 0 : array.length,
      result = Array(length);

    while (++index < length) {
      result[index] = iteratee(array[index], index, array);
    }
    return result;
  }

  let _arrayMap = arrayMap$1;

  let Symbol$3 = _Symbol,
    arrayMap = _arrayMap,
    isArray$a = isArray_1,
    isSymbol$2 = isSymbol_1;

  /** Used as references for various `Number` constants. */
  let INFINITY$2 = 1 / 0;

  /** Used to convert symbols to primitives and strings. */
  let symbolProto$1 = Symbol$3 ? Symbol$3.prototype : undefined,
    symbolToString = symbolProto$1 ? symbolProto$1.toString : undefined;

  /**
   * The base implementation of `_.toString` which doesn't convert nullish
   * values to empty strings.
   *
   * @private
   * @param {*} value The value to process.
   * @returns {string} Returns the string.
   */
  function baseToString$1(value) {
    // Exit early for strings to avoid a performance hit in some environments.
    if (typeof value == 'string') {
      return value;
    }
    if (isArray$a(value)) {
      // Recursively convert values (susceptible to call stack limits).
      return arrayMap(value, baseToString$1) + '';
    }
    if (isSymbol$2(value)) {
      return symbolToString ? symbolToString.call(value) : '';
    }
    let result = value + '';
    return result == '0' && 1 / value == -INFINITY$2 ? '-0' : result;
  }

  let _baseToString = baseToString$1;

  let baseToString = _baseToString;

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
  function toString$1(value) {
    return value == null ? '' : baseToString(value);
  }

  let toString_1 = toString$1;

  let isArray$9 = isArray_1,
    isKey = _isKey,
    stringToPath = _stringToPath,
    toString = toString_1;

  /**
   * Casts `value` to a path array if it's not one.
   *
   * @private
   * @param {*} value The value to inspect.
   * @param {Object} [object] The object to query keys on.
   * @returns {Array} Returns the cast property path array.
   */
  function castPath$4(value, object) {
    if (isArray$9(value)) {
      return value;
    }
    return isKey(value, object) ? [value] : stringToPath(toString(value));
  }

  let _castPath = castPath$4;

  let isSymbol$1 = isSymbol_1;

  /** Used as references for various `Number` constants. */
  let INFINITY$1 = 1 / 0;

  /**
   * Converts `value` to a string key if it's not a string or symbol.
   *
   * @private
   * @param {*} value The value to inspect.
   * @returns {string|symbol} Returns the key.
   */
  function toKey$3(value) {
    if (typeof value == 'string' || isSymbol$1(value)) {
      return value;
    }
    let result = value + '';
    return result == '0' && 1 / value == -INFINITY$1 ? '-0' : result;
  }

  let _toKey = toKey$3;

  let castPath$3 = _castPath,
    toKey$2 = _toKey;

  /**
   * The base implementation of `_.get` without support for default values.
   *
   * @private
   * @param {Object} object The object to query.
   * @param {Array|string} path The path of the property to get.
   * @returns {*} Returns the resolved value.
   */
  function baseGet$2(object, path) {
    path = castPath$3(path, object);

    let index = 0,
      length = path.length;

    while (object != null && index < length) {
      object = object[toKey$2(path[index++])];
    }
    return index && index == length ? object : undefined;
  }

  let _baseGet = baseGet$2;

  let getNative$4 = _getNative;

  let defineProperty$2 = (function () {
    try {
      let func = getNative$4(Object, 'defineProperty');
      func({}, '', {});
      return func;
    } catch (e) {}
  })();

  let _defineProperty = defineProperty$2;

  let defineProperty$1 = _defineProperty;

  /**
   * The base implementation of `assignValue` and `assignMergeValue` without
   * value checks.
   *
   * @private
   * @param {Object} object The object to modify.
   * @param {string} key The key of the property to assign.
   * @param {*} value The value to assign.
   */
  function baseAssignValue$2(object, key, value) {
    if (key == '__proto__' && defineProperty$1) {
      defineProperty$1(object, key, {
        configurable: true,
        enumerable: true,
        value,
        writable: true,
      });
    } else {
      object[key] = value;
    }
  }

  let _baseAssignValue = baseAssignValue$2;

  let baseAssignValue$1 = _baseAssignValue,
    eq = eq_1;

  /** Used for built-in method references. */
  let objectProto$8 = Object.prototype;

  /** Used to check objects for own properties. */
  let hasOwnProperty$7 = objectProto$8.hasOwnProperty;

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
  function assignValue$3(object, key, value) {
    let objValue = object[key];
    if (
      !(hasOwnProperty$7.call(object, key) && eq(objValue, value)) ||
      (value === undefined && !(key in object))
    ) {
      baseAssignValue$1(object, key, value);
    }
  }

  let _assignValue = assignValue$3;

  /** Used as references for various `Number` constants. */

  let MAX_SAFE_INTEGER$1 = 9007199254740991;

  /** Used to detect unsigned integer values. */
  let reIsUint = /^(?:0|[1-9]\d*)$/;

  /**
   * Checks if `value` is a valid array-like index.
   *
   * @private
   * @param {*} value The value to check.
   * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
   * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
   */
  function isIndex$3(value, length) {
    let type = typeof value;
    length = length == null ? MAX_SAFE_INTEGER$1 : length;

    return (
      !!length &&
      (type == 'number' || (type != 'symbol' && reIsUint.test(value))) &&
      value > -1 &&
      value % 1 == 0 &&
      value < length
    );
  }

  let _isIndex = isIndex$3;

  let assignValue$2 = _assignValue,
    castPath$2 = _castPath,
    isIndex$2 = _isIndex,
    isObject$4 = isObject_1,
    toKey$1 = _toKey;

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
  function baseSet$1(object, path, value, customizer) {
    if (!isObject$4(object)) {
      return object;
    }
    path = castPath$2(path, object);

    let index = -1,
      length = path.length,
      lastIndex = length - 1,
      nested = object;

    while (nested != null && ++index < length) {
      let key = toKey$1(path[index]),
        newValue = value;

      if (key === '__proto__' || key === 'constructor' || key === 'prototype') {
        return object;
      }

      if (index != lastIndex) {
        let objValue = nested[key];
        newValue = customizer ? customizer(objValue, key, nested) : undefined;
        if (newValue === undefined) {
          newValue = isObject$4(objValue)
            ? objValue
            : isIndex$2(path[index + 1])
            ? []
            : {};
        }
      }
      assignValue$2(nested, key, newValue);
      nested = nested[key];
    }
    return object;
  }

  let _baseSet = baseSet$1;

  let baseGet$1 = _baseGet,
    baseSet = _baseSet,
    castPath$1 = _castPath;

  /**
   * The base implementation of  `_.pickBy` without support for iteratee shorthands.
   *
   * @private
   * @param {Object} object The source object.
   * @param {string[]} paths The property paths to pick.
   * @param {Function} predicate The function invoked per property.
   * @returns {Object} Returns the new object.
   */
  function basePickBy$1(object, paths, predicate) {
    let index = -1,
      length = paths.length,
      result = {};

    while (++index < length) {
      let path = paths[index],
        value = baseGet$1(object, path);

      if (predicate(value, path)) {
        baseSet(result, castPath$1(path, object), value);
      }
    }
    return result;
  }

  let _basePickBy = basePickBy$1;

  /**
   * The base implementation of `_.hasIn` without support for deep paths.
   *
   * @private
   * @param {Object} [object] The object to query.
   * @param {Array|string} key The key to check.
   * @returns {boolean} Returns `true` if `key` exists, else `false`.
   */

  function baseHasIn$1(object, key) {
    return object != null && key in Object(object);
  }

  let _baseHasIn = baseHasIn$1;

  let baseGetTag$4 = _baseGetTag,
    isObjectLike$6 = isObjectLike_1;

  /** `Object#toString` result references. */
  let argsTag$2 = '[object Arguments]';

  /**
   * The base implementation of `_.isArguments`.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is an `arguments` object,
   */
  function baseIsArguments$1(value) {
    return isObjectLike$6(value) && baseGetTag$4(value) == argsTag$2;
  }

  let _baseIsArguments = baseIsArguments$1;

  let baseIsArguments = _baseIsArguments,
    isObjectLike$5 = isObjectLike_1;

  /** Used for built-in method references. */
  let objectProto$7 = Object.prototype;

  /** Used to check objects for own properties. */
  let hasOwnProperty$6 = objectProto$7.hasOwnProperty;

  /** Built-in value references. */
  let propertyIsEnumerable$1 = objectProto$7.propertyIsEnumerable;

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
  let isArguments$4 = baseIsArguments(
    (function () {
      return arguments;
    })()
  )
    ? baseIsArguments
    : function (value) {
        return (
          isObjectLike$5(value) &&
          hasOwnProperty$6.call(value, 'callee') &&
          !propertyIsEnumerable$1.call(value, 'callee')
        );
      };

  let isArguments_1 = isArguments$4;

  /** Used as references for various `Number` constants. */

  let MAX_SAFE_INTEGER = 9007199254740991;

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
  function isLength$3(value) {
    return (
      typeof value == 'number' &&
      value > -1 &&
      value % 1 == 0 &&
      value <= MAX_SAFE_INTEGER
    );
  }

  let isLength_1 = isLength$3;

  let castPath = _castPath,
    isArguments$3 = isArguments_1,
    isArray$8 = isArray_1,
    isIndex$1 = _isIndex,
    isLength$2 = isLength_1,
    toKey = _toKey;

  /**
   * Checks if `path` exists on `object`.
   *
   * @private
   * @param {Object} object The object to query.
   * @param {Array|string} path The path to check.
   * @param {Function} hasFunc The function to check properties.
   * @returns {boolean} Returns `true` if `path` exists, else `false`.
   */
  function hasPath$1(object, path, hasFunc) {
    path = castPath(path, object);

    let index = -1,
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
    return (
      !!length &&
      isLength$2(length) &&
      isIndex$1(key, length) &&
      (isArray$8(object) || isArguments$3(object))
    );
  }

  let _hasPath = hasPath$1;

  let baseHasIn = _baseHasIn,
    hasPath = _hasPath;

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
  function hasIn$1(object, path) {
    return object != null && hasPath(object, path, baseHasIn);
  }

  let hasIn_1 = hasIn$1;

  let basePickBy = _basePickBy,
    hasIn = hasIn_1;

  /**
   * The base implementation of `_.pick` without support for individual
   * property identifiers.
   *
   * @private
   * @param {Object} object The source object.
   * @param {string[]} paths The property paths to pick.
   * @returns {Object} Returns the new object.
   */
  function basePick$1(object, paths) {
    return basePickBy(object, paths, function (value, path) {
      return hasIn(object, path);
    });
  }

  let _basePick = basePick$1;

  /**
   * Appends the elements of `values` to `array`.
   *
   * @private
   * @param {Array} array The array to modify.
   * @param {Array} values The values to append.
   * @returns {Array} Returns `array`.
   */

  function arrayPush$4(array, values) {
    let index = -1,
      length = values.length,
      offset = array.length;

    while (++index < length) {
      array[offset + index] = values[index];
    }
    return array;
  }

  let _arrayPush = arrayPush$4;

  let Symbol$2 = _Symbol,
    isArguments$2 = isArguments_1,
    isArray$7 = isArray_1;

  /** Built-in value references. */
  let spreadableSymbol = Symbol$2 ? Symbol$2.isConcatSpreadable : undefined;

  /**
   * Checks if `value` is a flattenable `arguments` object or array.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is flattenable, else `false`.
   */
  function isFlattenable$1(value) {
    return (
      isArray$7(value) ||
      isArguments$2(value) ||
      !!(spreadableSymbol && value && value[spreadableSymbol])
    );
  }

  let _isFlattenable = isFlattenable$1;

  let arrayPush$3 = _arrayPush,
    isFlattenable = _isFlattenable;

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
  function baseFlatten$2(array, depth, predicate, isStrict, result) {
    let index = -1,
      length = array.length;

    predicate || (predicate = isFlattenable);
    result || (result = []);

    while (++index < length) {
      let value = array[index];
      if (depth > 0 && predicate(value)) {
        if (depth > 1) {
          // Recursively flatten arrays (susceptible to call stack limits).
          baseFlatten$2(value, depth - 1, predicate, isStrict, result);
        } else {
          arrayPush$3(result, value);
        }
      } else if (!isStrict) {
        result[result.length] = value;
      }
    }
    return result;
  }

  let _baseFlatten = baseFlatten$2;

  let baseFlatten$1 = _baseFlatten;

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
  function flatten$1(array) {
    let length = array == null ? 0 : array.length;
    return length ? baseFlatten$1(array, 1) : [];
  }

  let flatten_1 = flatten$1;

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

  function apply$1(func, thisArg, args) {
    switch (args.length) {
      case 0:
        return func.call(thisArg);
      case 1:
        return func.call(thisArg, args[0]);
      case 2:
        return func.call(thisArg, args[0], args[1]);
      case 3:
        return func.call(thisArg, args[0], args[1], args[2]);
    }
    return func.apply(thisArg, args);
  }

  let _apply = apply$1;

  let apply = _apply;

  /* Built-in method references for those with the same name as other `lodash` methods. */
  let nativeMax$1 = Math.max;

  /**
   * A specialized version of `baseRest` which transforms the rest array.
   *
   * @private
   * @param {Function} func The function to apply a rest parameter to.
   * @param {number} [start=func.length-1] The start position of the rest parameter.
   * @param {Function} transform The rest array transform.
   * @returns {Function} Returns the new function.
   */
  function overRest$1(func, start, transform) {
    start = nativeMax$1(start === undefined ? func.length - 1 : start, 0);
    return function () {
      let args = arguments,
        index = -1,
        length = nativeMax$1(args.length - start, 0),
        array = Array(length);

      while (++index < length) {
        array[index] = args[start + index];
      }
      index = -1;
      let otherArgs = Array(start + 1);
      while (++index < start) {
        otherArgs[index] = args[index];
      }
      otherArgs[start] = transform(array);
      return apply(func, this, otherArgs);
    };
  }

  let _overRest = overRest$1;

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

  function constant$1(value) {
    return function () {
      return value;
    };
  }

  let constant_1 = constant$1;

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

  function identity$2(value) {
    return value;
  }

  let identity_1 = identity$2;

  let constant = constant_1,
    defineProperty = _defineProperty,
    identity$1 = identity_1;

  /**
   * The base implementation of `setToString` without support for hot loop shorting.
   *
   * @private
   * @param {Function} func The function to modify.
   * @param {Function} string The `toString` result.
   * @returns {Function} Returns `func`.
   */
  let baseSetToString$1 = !defineProperty
    ? identity$1
    : function (func, string) {
        return defineProperty(func, 'toString', {
          configurable: true,
          enumerable: false,
          value: constant(string),
          writable: true,
        });
      };

  let _baseSetToString = baseSetToString$1;

  /** Used to detect hot functions by number of calls within a span of milliseconds. */

  let HOT_COUNT = 800,
    HOT_SPAN = 16;

  /* Built-in method references for those with the same name as other `lodash` methods. */
  let nativeNow = Date.now;

  /**
   * Creates a function that'll short out and invoke `identity` instead
   * of `func` when it's called `HOT_COUNT` or more times in `HOT_SPAN`
   * milliseconds.
   *
   * @private
   * @param {Function} func The function to restrict.
   * @returns {Function} Returns the new shortable function.
   */
  function shortOut$1(func) {
    let count = 0,
      lastCalled = 0;

    return function () {
      let stamp = nativeNow(),
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

  let _shortOut = shortOut$1;

  let baseSetToString = _baseSetToString,
    shortOut = _shortOut;

  /**
   * Sets the `toString` method of `func` to return `string`.
   *
   * @private
   * @param {Function} func The function to modify.
   * @param {Function} string The `toString` result.
   * @returns {Function} Returns `func`.
   */
  let setToString$1 = shortOut(baseSetToString);

  let _setToString = setToString$1;

  let flatten = flatten_1,
    overRest = _overRest,
    setToString = _setToString;

  /**
   * A specialized version of `baseRest` which flattens the rest array.
   *
   * @private
   * @param {Function} func The function to apply a rest parameter to.
   * @returns {Function} Returns the new function.
   */
  function flatRest$1(func) {
    return setToString(overRest(func, undefined, flatten), func + '');
  }

  let _flatRest = flatRest$1;

  let basePick = _basePick,
    flatRest = _flatRest;

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
  let pick = flatRest(function (object, paths) {
    return object == null ? {} : basePick(object, paths);
  });

  let pick_1 = pick;

  function ownKeys$6(object, enumerableOnly) {
    let keys = Object.keys(object);

    if (Object.getOwnPropertySymbols) {
      let symbols = Object.getOwnPropertySymbols(object);
      enumerableOnly &&
        (symbols = symbols.filter(function (sym) {
          return Object.getOwnPropertyDescriptor(object, sym).enumerable;
        })),
        keys.push.apply(keys, symbols);
    }

    return keys;
  }

  function _objectSpread2(target) {
    for (let i = 1; i < arguments.length; i++) {
      var source = null != arguments[i] ? arguments[i] : {};
      i % 2
        ? ownKeys$6(Object(source), !0).forEach(function (key) {
            _defineProperty$1(target, key, source[key]);
          })
        : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(
            target,
            Object.getOwnPropertyDescriptors(source)
          )
        : ownKeys$6(Object(source)).forEach(function (key) {
            Object.defineProperty(
              target,
              key,
              Object.getOwnPropertyDescriptor(source, key)
            );
          });
    }

    return target;
  }

  // Inlined version of the `symbol-observable` polyfill
  let $$observable = (function () {
    return (
      (typeof Symbol === 'function' && Symbol.observable) || '@@observable'
    );
  })();

  /**
   * These are private action types reserved by Redux.
   * For any unknown actions, you must return the current state.
   * If the current state is undefined, you must return the initial state.
   * Do not reference these action types directly in your code.
   */
  let randomString = function randomString() {
    return Math.random().toString(36).substring(7).split('').join('.');
  };

  let ActionTypes = {
    INIT: '@@redux/INIT' + randomString(),
    REPLACE: '@@redux/REPLACE' + randomString(),
    PROBE_UNKNOWN_ACTION: function PROBE_UNKNOWN_ACTION() {
      return '@@redux/PROBE_UNKNOWN_ACTION' + randomString();
    },
  };

  /**
   * @param {any} obj The object to inspect.
   * @returns {boolean} True if the argument appears to be a plain object.
   */
  function isPlainObject$1(obj) {
    if (typeof obj !== 'object' || obj === null) return false;
    let proto = obj;

    while (Object.getPrototypeOf(proto) !== null) {
      proto = Object.getPrototypeOf(proto);
    }

    return Object.getPrototypeOf(obj) === proto;
  }

  // Inlined / shortened version of `kindOf` from https://github.com/jonschlinkert/kind-of
  function miniKindOf(val) {
    if (val === void 0) return 'undefined';
    if (val === null) return 'null';
    let type = typeof val;

    switch (type) {
      case 'boolean':
      case 'string':
      case 'number':
      case 'symbol':
      case 'function': {
        return type;
      }
    }

    if (Array.isArray(val)) return 'array';
    if (isDate(val)) return 'date';
    if (isError(val)) return 'error';
    let constructorName = ctorName(val);

    switch (constructorName) {
      case 'Symbol':
      case 'Promise':
      case 'WeakMap':
      case 'WeakSet':
      case 'Map':
      case 'Set':
        return constructorName;
    } // other

    return type.slice(8, -1).toLowerCase().replace(/\s/g, '');
  }

  function ctorName(val) {
    return typeof val.constructor === 'function' ? val.constructor.name : null;
  }

  function isError(val) {
    return (
      val instanceof Error ||
      (typeof val.message === 'string' &&
        val.constructor &&
        typeof val.constructor.stackTraceLimit === 'number')
    );
  }

  function isDate(val) {
    if (val instanceof Date) return true;
    return (
      typeof val.toDateString === 'function' &&
      typeof val.getDate === 'function' &&
      typeof val.setDate === 'function'
    );
  }

  function kindOf(val) {
    let typeOfVal = typeof val;

    {
      typeOfVal = miniKindOf(val);
    }

    return typeOfVal;
  }

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

  function createStore(reducer, preloadedState, enhancer) {
    let _ref2;

    if (
      (typeof preloadedState === 'function' &&
        typeof enhancer === 'function') ||
      (typeof enhancer === 'function' && typeof arguments[3] === 'function')
    ) {
      throw new Error(
        'It looks like you are passing several store enhancers to ' +
          'createStore(). This is not supported. Instead, compose them ' +
          'together to a single function. See https://redux.js.org/tutorials/fundamentals/part-4-store#creating-a-store-with-enhancers for an example.'
      );
    }

    if (
      typeof preloadedState === 'function' &&
      typeof enhancer === 'undefined'
    ) {
      enhancer = preloadedState;
      preloadedState = undefined;
    }

    if (typeof enhancer !== 'undefined') {
      if (typeof enhancer !== 'function') {
        throw new Error(
          "Expected the enhancer to be a function. Instead, received: '" +
            kindOf(enhancer) +
            "'"
        );
      }

      return enhancer(createStore)(reducer, preloadedState);
    }

    if (typeof reducer !== 'function') {
      throw new Error(
        "Expected the root reducer to be a function. Instead, received: '" +
          kindOf(reducer) +
          "'"
      );
    }

    let currentReducer = reducer;
    let currentState = preloadedState;
    let currentListeners = [];
    let nextListeners = currentListeners;
    let isDispatching = false;
    /**
     * This makes a shallow copy of currentListeners so we can use
     * nextListeners as a temporary list while dispatching.
     *
     * This prevents any bugs around consumers calling
     * subscribe/unsubscribe in the middle of a dispatch.
     */

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
      if (isDispatching) {
        throw new Error(
          'You may not call store.getState() while the reducer is executing. ' +
            'The reducer has already received the state as an argument. ' +
            'Pass it down from the top reducer instead of reading it from the store.'
        );
      }

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
        throw new Error(
          "Expected the listener to be a function. Instead, received: '" +
            kindOf(listener) +
            "'"
        );
      }

      if (isDispatching) {
        throw new Error(
          'You may not call store.subscribe() while the reducer is executing. ' +
            'If you would like to be notified after the store has been updated, subscribe from a ' +
            'component and invoke store.getState() in the callback to access the latest state. ' +
            'See https://redux.js.org/api/store#subscribelistener for more details.'
        );
      }

      let isSubscribed = true;
      ensureCanMutateNextListeners();
      nextListeners.push(listener);
      return function unsubscribe() {
        if (!isSubscribed) {
          return;
        }

        if (isDispatching) {
          throw new Error(
            'You may not unsubscribe from a store listener while the reducer is executing. ' +
              'See https://redux.js.org/api/store#subscribelistener for more details.'
          );
        }

        isSubscribed = false;
        ensureCanMutateNextListeners();
        let index = nextListeners.indexOf(listener);
        nextListeners.splice(index, 1);
        currentListeners = null;
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
      if (!isPlainObject$1(action)) {
        throw new Error(
          "Actions must be plain objects. Instead, the actual type was: '" +
            kindOf(action) +
            "'. You may need to add middleware to your store setup to handle dispatching other values, such as 'redux-thunk' to handle dispatching functions. See https://redux.js.org/tutorials/fundamentals/part-4-store#middleware and https://redux.js.org/tutorials/fundamentals/part-6-async-logic#using-the-redux-thunk-middleware for examples."
        );
      }

      if (typeof action.type === 'undefined') {
        throw new Error(
          'Actions may not have an undefined "type" property. You may have misspelled an action type string constant.'
        );
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

      let listeners = (currentListeners = nextListeners);

      for (let i = 0; i < listeners.length; i++) {
        let listener = listeners[i];
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
        throw new Error(
          "Expected the nextReducer to be a function. Instead, received: '" +
            kindOf(nextReducer)
        );
      }

      currentReducer = nextReducer; // This action has a similiar effect to ActionTypes.INIT.
      // Any reducers that existed in both the new and old rootReducer
      // will receive the previous state. This effectively populates
      // the new state tree with any relevant data from the old one.

      dispatch({
        type: ActionTypes.REPLACE,
      });
    }
    /**
     * Interoperability point for observable/reactive libraries.
     * @returns {observable} A minimal observable of state changes.
     * For more information, see the observable proposal:
     * https://github.com/tc39/proposal-observable
     */

    function observable() {
      let _ref;

      let outerSubscribe = subscribe;
      return (
        (_ref = {
          /**
           * The minimal observable subscription method.
           * @param {Object} observer Any object that can be used as an observer.
           * The observer object should have a `next` method.
           * @returns {subscription} An object with an `unsubscribe` method that can
           * be used to unsubscribe the observable from the store, and prevent further
           * emission of values from the observable.
           */
          subscribe: function subscribe(observer) {
            if (typeof observer !== 'object' || observer === null) {
              throw new Error(
                "Expected the observer to be an object. Instead, received: '" +
                  kindOf(observer) +
                  "'"
              );
            }

            function observeState() {
              if (observer.next) {
                observer.next(getState());
              }
            }

            observeState();
            let unsubscribe = outerSubscribe(observeState);
            return {
              unsubscribe,
            };
          },
        }),
        (_ref[$$observable] = function () {
          return this;
        }),
        _ref
      );
    } // When a store is created, an "INIT" action is dispatched so that every
    // reducer returns their initial state. This effectively populates
    // the initial state tree.

    dispatch({
      type: ActionTypes.INIT,
    });
    return (
      (_ref2 = {
        dispatch,
        subscribe,
        getState,
        replaceReducer,
      }),
      (_ref2[$$observable] = observable),
      _ref2
    );
  }

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
    } catch (e) {} // eslint-disable-line no-empty
  }

  function getUnexpectedStateShapeWarningMessage(
    inputState,
    reducers,
    action,
    unexpectedKeyCache
  ) {
    let reducerKeys = Object.keys(reducers);
    let argumentName =
      action && action.type === ActionTypes.INIT
        ? 'preloadedState argument passed to createStore'
        : 'previous state received by the reducer';

    if (reducerKeys.length === 0) {
      return (
        'Store does not have a valid reducer. Make sure the argument passed ' +
        'to combineReducers is an object whose values are reducers.'
      );
    }

    if (!isPlainObject$1(inputState)) {
      return (
        'The ' +
        argumentName +
        ' has unexpected type of "' +
        kindOf(inputState) +
        '". Expected argument to be an object with the following ' +
        ('keys: "' + reducerKeys.join('", "') + '"')
      );
    }

    let unexpectedKeys = Object.keys(inputState).filter(function (key) {
      return !reducers.hasOwnProperty(key) && !unexpectedKeyCache[key];
    });
    unexpectedKeys.forEach(function (key) {
      unexpectedKeyCache[key] = true;
    });
    if (action && action.type === ActionTypes.REPLACE) return;

    if (unexpectedKeys.length > 0) {
      return (
        'Unexpected ' +
        (unexpectedKeys.length > 1 ? 'keys' : 'key') +
        ' ' +
        ('"' +
          unexpectedKeys.join('", "') +
          '" found in ' +
          argumentName +
          '. ') +
        'Expected to find one of the known reducer keys instead: ' +
        ('"' + reducerKeys.join('", "') + '". Unexpected keys will be ignored.')
      );
    }
  }

  function assertReducerShape(reducers) {
    Object.keys(reducers).forEach(function (key) {
      let reducer = reducers[key];
      let initialState = reducer(undefined, {
        type: ActionTypes.INIT,
      });

      if (typeof initialState === 'undefined') {
        throw new Error(
          'The slice reducer for key "' +
            key +
            '" returned undefined during initialization. ' +
            'If the state passed to the reducer is undefined, you must ' +
            'explicitly return the initial state. The initial state may ' +
            "not be undefined. If you don't want to set a value for this reducer, " +
            'you can use null instead of undefined.'
        );
      }

      if (
        typeof reducer(undefined, {
          type: ActionTypes.PROBE_UNKNOWN_ACTION(),
        }) === 'undefined'
      ) {
        throw new Error(
          'The slice reducer for key "' +
            key +
            '" returned undefined when probed with a random type. ' +
            ("Don't try to handle '" +
              ActionTypes.INIT +
              '\' or other actions in "redux/*" ') +
            'namespace. They are considered private. Instead, you must return the ' +
            'current state for any unknown actions, unless it is undefined, ' +
            'in which case you must return the initial state, regardless of the ' +
            'action type. The initial state may not be undefined, but can be null.'
        );
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
    let reducerKeys = Object.keys(reducers);
    let finalReducers = {};

    for (let i = 0; i < reducerKeys.length; i++) {
      let key = reducerKeys[i];

      {
        if (typeof reducers[key] === 'undefined') {
          warning('No reducer provided for key "' + key + '"');
        }
      }

      if (typeof reducers[key] === 'function') {
        finalReducers[key] = reducers[key];
      }
    }

    let finalReducerKeys = Object.keys(finalReducers); // This is used to make sure we don't warn about the same
    // keys multiple times.

    let unexpectedKeyCache;

    {
      unexpectedKeyCache = {};
    }

    let shapeAssertionError;

    try {
      assertReducerShape(finalReducers);
    } catch (e) {
      shapeAssertionError = e;
    }

    return function combination(state, action) {
      if (state === void 0) {
        state = {};
      }

      if (shapeAssertionError) {
        throw shapeAssertionError;
      }

      {
        let warningMessage = getUnexpectedStateShapeWarningMessage(
          state,
          finalReducers,
          action,
          unexpectedKeyCache
        );

        if (warningMessage) {
          warning(warningMessage);
        }
      }

      let hasChanged = false;
      let nextState = {};

      for (let _i = 0; _i < finalReducerKeys.length; _i++) {
        let _key = finalReducerKeys[_i];
        let reducer = finalReducers[_key];
        let previousStateForKey = state[_key];
        let nextStateForKey = reducer(previousStateForKey, action);

        if (typeof nextStateForKey === 'undefined') {
          let actionType = action && action.type;
          throw new Error(
            'When called with an action of type ' +
              (actionType ? '"' + String(actionType) + '"' : '(unknown type)') +
              ', the slice reducer for key "' +
              _key +
              '" returned undefined. ' +
              'To ignore an action, you must explicitly return the previous state. ' +
              'If you want this reducer to hold no value, you can return null instead of undefined.'
          );
        }

        nextState[_key] = nextStateForKey;
        hasChanged = hasChanged || nextStateForKey !== previousStateForKey;
      }

      hasChanged =
        hasChanged || finalReducerKeys.length !== Object.keys(state).length;
      return hasChanged ? nextState : state;
    };
  }

  function bindActionCreator(actionCreator, dispatch) {
    return function () {
      return dispatch(actionCreator.apply(this, arguments));
    };
  }
  /**
   * Turns an object whose values are action creators, into an object with the
   * same keys, but with every function wrapped into a `dispatch` call so they
   * may be invoked directly. This is just a convenience method, as you can call
   * `store.dispatch(MyActionCreators.doSomething())` yourself just fine.
   *
   * For convenience, you can also pass an action creator as the first argument,
   * and get a dispatch wrapped function in return.
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
      throw new Error(
        "bindActionCreators expected an object or a function, but instead received: '" +
          kindOf(actionCreators) +
          "'. " +
          'Did you write "import ActionCreators from" instead of "import * as ActionCreators from"?'
      );
    }

    let boundActionCreators = {};

    for (let key in actionCreators) {
      let actionCreator = actionCreators[key];

      if (typeof actionCreator === 'function') {
        boundActionCreators[key] = bindActionCreator(actionCreator, dispatch);
      }
    }

    return boundActionCreators;
  }

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
    for (
      var _len = arguments.length, funcs = new Array(_len), _key = 0;
      _key < _len;
      _key++
    ) {
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
        return a(b.apply(void 0, arguments));
      };
    });
  }

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
    for (
      var _len = arguments.length, middlewares = new Array(_len), _key = 0;
      _key < _len;
      _key++
    ) {
      middlewares[_key] = arguments[_key];
    }

    return function (createStore) {
      return function () {
        let store = createStore.apply(void 0, arguments);

        let _dispatch = function dispatch() {
          throw new Error(
            'Dispatching while constructing your middleware is not allowed. ' +
              'Other middleware would not be applied to this dispatch.'
          );
        };

        let middlewareAPI = {
          getState: store.getState,
          dispatch: function dispatch() {
            return _dispatch.apply(void 0, arguments);
          },
        };
        let chain = middlewares.map(function (middleware) {
          return middleware(middlewareAPI);
        });
        _dispatch = compose.apply(void 0, chain)(store.dispatch);
        return _objectSpread2(
          _objectSpread2({}, store),
          {},
          {
            dispatch: _dispatch,
          }
        );
      };
    };
  }

  /*
   * This is a dummy function to check if the function name has been altered by minification.
   * If the function has been minified and NODE_ENV !== 'production', warn the user.
   */

  function isCrushed() {}

  if (typeof isCrushed.name === 'string' && isCrushed.name !== 'isCrushed') {
    warning(
      'You are currently using minified code outside of NODE_ENV === "production". ' +
        'This means that you are running a slower development build of Redux. ' +
        'You can use loose-envify (https://github.com/zertosh/loose-envify) for browserify ' +
        'or setting mode to production in webpack (https://webpack.js.org/concepts/mode/) ' +
        'to ensure you have the correct code for your production build.'
    );
  }

  let ListCache$2 = _ListCache;

  /**
   * Removes all key-value entries from the stack.
   *
   * @private
   * @name clear
   * @memberOf Stack
   */
  function stackClear$1() {
    this.__data__ = new ListCache$2();
    this.size = 0;
  }

  let _stackClear = stackClear$1;

  /**
   * Removes `key` and its value from the stack.
   *
   * @private
   * @name delete
   * @memberOf Stack
   * @param {string} key The key of the value to remove.
   * @returns {boolean} Returns `true` if the entry was removed, else `false`.
   */

  function stackDelete$1(key) {
    let data = this.__data__,
      result = data['delete'](key);

    this.size = data.size;
    return result;
  }

  let _stackDelete = stackDelete$1;

  /**
   * Gets the stack value for `key`.
   *
   * @private
   * @name get
   * @memberOf Stack
   * @param {string} key The key of the value to get.
   * @returns {*} Returns the entry value.
   */

  function stackGet$1(key) {
    return this.__data__.get(key);
  }

  let _stackGet = stackGet$1;

  /**
   * Checks if a stack value for `key` exists.
   *
   * @private
   * @name has
   * @memberOf Stack
   * @param {string} key The key of the entry to check.
   * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
   */

  function stackHas$1(key) {
    return this.__data__.has(key);
  }

  let _stackHas = stackHas$1;

  let ListCache$1 = _ListCache,
    Map$2 = _Map,
    MapCache = _MapCache;

  /** Used as the size to enable large array optimizations. */
  let LARGE_ARRAY_SIZE = 200;

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
  function stackSet$1(key, value) {
    let data = this.__data__;
    if (data instanceof ListCache$1) {
      let pairs = data.__data__;
      if (!Map$2 || pairs.length < LARGE_ARRAY_SIZE - 1) {
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

  let _stackSet = stackSet$1;

  let ListCache = _ListCache,
    stackClear = _stackClear,
    stackDelete = _stackDelete,
    stackGet = _stackGet,
    stackHas = _stackHas,
    stackSet = _stackSet;

  /**
   * Creates a stack cache object to store key-value pairs.
   *
   * @private
   * @constructor
   * @param {Array} [entries] The key-value pairs to cache.
   */
  function Stack$1(entries) {
    let data = (this.__data__ = new ListCache(entries));
    this.size = data.size;
  }

  // Add methods to `Stack`.
  Stack$1.prototype.clear = stackClear;
  Stack$1.prototype['delete'] = stackDelete;
  Stack$1.prototype.get = stackGet;
  Stack$1.prototype.has = stackHas;
  Stack$1.prototype.set = stackSet;

  let _Stack = Stack$1;

  /**
   * A specialized version of `_.forEach` for arrays without support for
   * iteratee shorthands.
   *
   * @private
   * @param {Array} [array] The array to iterate over.
   * @param {Function} iteratee The function invoked per iteration.
   * @returns {Array} Returns `array`.
   */

  function arrayEach$2(array, iteratee) {
    let index = -1,
      length = array == null ? 0 : array.length;

    while (++index < length) {
      if (iteratee(array[index], index, array) === false) {
        break;
      }
    }
    return array;
  }

  let _arrayEach = arrayEach$2;

  let assignValue$1 = _assignValue,
    baseAssignValue = _baseAssignValue;

  /**
   * Copies properties of `source` to `object`.
   *
   * @private
   * @param {Object} source The object to copy properties from.
   * @param {Array} props The property identifiers to copy.
   * @param {Object} [object={}] The object to copy properties to.
   * @param {Function} [customizer] The function to customize copied values.
   * @returns {Object} Returns `object`.
   */
  function copyObject$4(source, props, object, customizer) {
    let isNew = !object;
    object || (object = {});

    let index = -1,
      length = props.length;

    while (++index < length) {
      let key = props[index];

      let newValue = customizer
        ? customizer(object[key], source[key], key, object, source)
        : undefined;

      if (newValue === undefined) {
        newValue = source[key];
      }
      if (isNew) {
        baseAssignValue(object, key, newValue);
      } else {
        assignValue$1(object, key, newValue);
      }
    }
    return object;
  }

  let _copyObject = copyObject$4;

  /**
   * The base implementation of `_.times` without support for iteratee shorthands
   * or max array length checks.
   *
   * @private
   * @param {number} n The number of times to invoke `iteratee`.
   * @param {Function} iteratee The function invoked per iteration.
   * @returns {Array} Returns the array of results.
   */

  function baseTimes$1(n, iteratee) {
    let index = -1,
      result = Array(n);

    while (++index < n) {
      result[index] = iteratee(index);
    }
    return result;
  }

  let _baseTimes = baseTimes$1;

  let isBuffer$3 = { exports: {} };

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

  let stubFalse_1 = stubFalse;

  (function (module, exports) {
    let root = _root,
      stubFalse = stubFalse_1;

    /** Detect free variable `exports`. */
    let freeExports = exports && !exports.nodeType && exports;

    /** Detect free variable `module`. */
    let freeModule =
      freeExports &&
      'object' == 'object' &&
      module &&
      !module.nodeType &&
      module;

    /** Detect the popular CommonJS extension `module.exports`. */
    let moduleExports = freeModule && freeModule.exports === freeExports;

    /** Built-in value references. */
    let Buffer = moduleExports ? root.Buffer : undefined;

    /* Built-in method references for those with the same name as other `lodash` methods. */
    let nativeIsBuffer = Buffer ? Buffer.isBuffer : undefined;

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
    let isBuffer = nativeIsBuffer || stubFalse;

    module.exports = isBuffer;
  })(isBuffer$3, isBuffer$3.exports);

  let baseGetTag$3 = _baseGetTag,
    isLength$1 = isLength_1,
    isObjectLike$4 = isObjectLike_1;

  /** `Object#toString` result references. */
  let argsTag$1 = '[object Arguments]',
    arrayTag$1 = '[object Array]',
    boolTag$2 = '[object Boolean]',
    dateTag$2 = '[object Date]',
    errorTag$1 = '[object Error]',
    funcTag$1 = '[object Function]',
    mapTag$6 = '[object Map]',
    numberTag$3 = '[object Number]',
    objectTag$2 = '[object Object]',
    regexpTag$2 = '[object RegExp]',
    setTag$6 = '[object Set]',
    stringTag$3 = '[object String]',
    weakMapTag$2 = '[object WeakMap]';

  let arrayBufferTag$2 = '[object ArrayBuffer]',
    dataViewTag$3 = '[object DataView]',
    float32Tag$2 = '[object Float32Array]',
    float64Tag$2 = '[object Float64Array]',
    int8Tag$2 = '[object Int8Array]',
    int16Tag$2 = '[object Int16Array]',
    int32Tag$2 = '[object Int32Array]',
    uint8Tag$2 = '[object Uint8Array]',
    uint8ClampedTag$2 = '[object Uint8ClampedArray]',
    uint16Tag$2 = '[object Uint16Array]',
    uint32Tag$2 = '[object Uint32Array]';

  /** Used to identify `toStringTag` values of typed arrays. */
  let typedArrayTags = {};
  typedArrayTags[float32Tag$2] =
    typedArrayTags[float64Tag$2] =
    typedArrayTags[int8Tag$2] =
    typedArrayTags[int16Tag$2] =
    typedArrayTags[int32Tag$2] =
    typedArrayTags[uint8Tag$2] =
    typedArrayTags[uint8ClampedTag$2] =
    typedArrayTags[uint16Tag$2] =
    typedArrayTags[uint32Tag$2] =
      true;
  typedArrayTags[argsTag$1] =
    typedArrayTags[arrayTag$1] =
    typedArrayTags[arrayBufferTag$2] =
    typedArrayTags[boolTag$2] =
    typedArrayTags[dataViewTag$3] =
    typedArrayTags[dateTag$2] =
    typedArrayTags[errorTag$1] =
    typedArrayTags[funcTag$1] =
    typedArrayTags[mapTag$6] =
    typedArrayTags[numberTag$3] =
    typedArrayTags[objectTag$2] =
    typedArrayTags[regexpTag$2] =
    typedArrayTags[setTag$6] =
    typedArrayTags[stringTag$3] =
    typedArrayTags[weakMapTag$2] =
      false;

  /**
   * The base implementation of `_.isTypedArray` without Node.js optimizations.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
   */
  function baseIsTypedArray$1(value) {
    return (
      isObjectLike$4(value) &&
      isLength$1(value.length) &&
      !!typedArrayTags[baseGetTag$3(value)]
    );
  }

  let _baseIsTypedArray = baseIsTypedArray$1;

  /**
   * The base implementation of `_.unary` without support for storing metadata.
   *
   * @private
   * @param {Function} func The function to cap arguments for.
   * @returns {Function} Returns the new capped function.
   */

  function baseUnary$3(func) {
    return function (value) {
      return func(value);
    };
  }

  let _baseUnary = baseUnary$3;

  let _nodeUtil = { exports: {} };

  (function (module, exports) {
    let freeGlobal = _freeGlobal;

    /** Detect free variable `exports`. */
    let freeExports = exports && !exports.nodeType && exports;

    /** Detect free variable `module`. */
    let freeModule =
      freeExports &&
      'object' == 'object' &&
      module &&
      !module.nodeType &&
      module;

    /** Detect the popular CommonJS extension `module.exports`. */
    let moduleExports = freeModule && freeModule.exports === freeExports;

    /** Detect free variable `process` from Node.js. */
    let freeProcess = moduleExports && freeGlobal.process;

    /** Used to access faster Node.js helpers. */
    let nodeUtil = (function () {
      try {
        // Use `util.types` for Node.js 10+.
        let types =
          freeModule && freeModule.require && freeModule.require('util').types;

        if (types) {
          return types;
        }

        // Legacy `process.binding('util')` for Node.js < 10.
        return (
          freeProcess && freeProcess.binding && freeProcess.binding('util')
        );
      } catch (e) {}
    })();

    module.exports = nodeUtil;
  })(_nodeUtil, _nodeUtil.exports);

  let baseIsTypedArray = _baseIsTypedArray,
    baseUnary$2 = _baseUnary,
    nodeUtil$2 = _nodeUtil.exports;

  /* Node.js helper references. */
  let nodeIsTypedArray = nodeUtil$2 && nodeUtil$2.isTypedArray;

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
  let isTypedArray$2 = nodeIsTypedArray
    ? baseUnary$2(nodeIsTypedArray)
    : baseIsTypedArray;

  let isTypedArray_1 = isTypedArray$2;

  let baseTimes = _baseTimes,
    isArguments$1 = isArguments_1,
    isArray$6 = isArray_1,
    isBuffer$2 = isBuffer$3.exports,
    isIndex = _isIndex,
    isTypedArray$1 = isTypedArray_1;

  /** Used for built-in method references. */
  let objectProto$6 = Object.prototype;

  /** Used to check objects for own properties. */
  let hasOwnProperty$5 = objectProto$6.hasOwnProperty;

  /**
   * Creates an array of the enumerable property names of the array-like `value`.
   *
   * @private
   * @param {*} value The value to query.
   * @param {boolean} inherited Specify returning inherited property names.
   * @returns {Array} Returns the array of property names.
   */
  function arrayLikeKeys$2(value, inherited) {
    let isArr = isArray$6(value),
      isArg = !isArr && isArguments$1(value),
      isBuff = !isArr && !isArg && isBuffer$2(value),
      isType = !isArr && !isArg && !isBuff && isTypedArray$1(value),
      skipIndexes = isArr || isArg || isBuff || isType,
      result = skipIndexes ? baseTimes(value.length, String) : [],
      length = result.length;

    for (let key in value) {
      if (
        (inherited || hasOwnProperty$5.call(value, key)) &&
        !(
          skipIndexes &&
          // Safari 9 has enumerable `arguments.length` in strict mode.
          (key == 'length' ||
            // Node.js 0.10 has enumerable non-index properties on buffers.
            (isBuff && (key == 'offset' || key == 'parent')) ||
            // PhantomJS 2 has enumerable non-index properties on typed arrays.
            (isType &&
              (key == 'buffer' ||
                key == 'byteLength' ||
                key == 'byteOffset')) ||
            // Skip index properties.
            isIndex(key, length))
        )
      ) {
        result.push(key);
      }
    }
    return result;
  }

  let _arrayLikeKeys = arrayLikeKeys$2;

  /** Used for built-in method references. */

  let objectProto$5 = Object.prototype;

  /**
   * Checks if `value` is likely a prototype object.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
   */
  function isPrototype$4(value) {
    let Ctor = value && value.constructor,
      proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto$5;

    return value === proto;
  }

  let _isPrototype = isPrototype$4;

  /**
   * Creates a unary function that invokes `func` with its argument transformed.
   *
   * @private
   * @param {Function} func The function to wrap.
   * @param {Function} transform The argument transform.
   * @returns {Function} Returns the new function.
   */

  function overArg$2(func, transform) {
    return function (arg) {
      return func(transform(arg));
    };
  }

  let _overArg = overArg$2;

  let overArg$1 = _overArg;

  /* Built-in method references for those with the same name as other `lodash` methods. */
  let nativeKeys$1 = overArg$1(Object.keys, Object);

  let _nativeKeys = nativeKeys$1;

  let isPrototype$3 = _isPrototype,
    nativeKeys = _nativeKeys;

  /** Used for built-in method references. */
  let objectProto$4 = Object.prototype;

  /** Used to check objects for own properties. */
  let hasOwnProperty$4 = objectProto$4.hasOwnProperty;

  /**
   * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
   *
   * @private
   * @param {Object} object The object to query.
   * @returns {Array} Returns the array of property names.
   */
  function baseKeys$3(object) {
    if (!isPrototype$3(object)) {
      return nativeKeys(object);
    }
    let result = [];
    for (let key in Object(object)) {
      if (hasOwnProperty$4.call(object, key) && key != 'constructor') {
        result.push(key);
      }
    }
    return result;
  }

  let _baseKeys = baseKeys$3;

  let isFunction = isFunction_1,
    isLength = isLength_1;

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
  function isArrayLike$5(value) {
    return value != null && isLength(value.length) && !isFunction(value);
  }

  let isArrayLike_1 = isArrayLike$5;

  let arrayLikeKeys$1 = _arrayLikeKeys,
    baseKeys$2 = _baseKeys,
    isArrayLike$4 = isArrayLike_1;

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
  function keys$4(object) {
    return isArrayLike$4(object) ? arrayLikeKeys$1(object) : baseKeys$2(object);
  }

  let keys_1 = keys$4;

  let copyObject$3 = _copyObject,
    keys$3 = keys_1;

  /**
   * The base implementation of `_.assign` without support for multiple sources
   * or `customizer` functions.
   *
   * @private
   * @param {Object} object The destination object.
   * @param {Object} source The source object.
   * @returns {Object} Returns `object`.
   */
  function baseAssign$1(object, source) {
    return object && copyObject$3(source, keys$3(source), object);
  }

  let _baseAssign = baseAssign$1;

  /**
   * This function is like
   * [`Object.keys`](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
   * except that it includes inherited enumerable properties.
   *
   * @private
   * @param {Object} object The object to query.
   * @returns {Array} Returns the array of property names.
   */

  function nativeKeysIn$1(object) {
    let result = [];
    if (object != null) {
      for (let key in Object(object)) {
        result.push(key);
      }
    }
    return result;
  }

  let _nativeKeysIn = nativeKeysIn$1;

  let isObject$3 = isObject_1,
    isPrototype$2 = _isPrototype,
    nativeKeysIn = _nativeKeysIn;

  /** Used for built-in method references. */
  let objectProto$3 = Object.prototype;

  /** Used to check objects for own properties. */
  let hasOwnProperty$3 = objectProto$3.hasOwnProperty;

  /**
   * The base implementation of `_.keysIn` which doesn't treat sparse arrays as dense.
   *
   * @private
   * @param {Object} object The object to query.
   * @returns {Array} Returns the array of property names.
   */
  function baseKeysIn$1(object) {
    if (!isObject$3(object)) {
      return nativeKeysIn(object);
    }
    let isProto = isPrototype$2(object),
      result = [];

    for (let key in object) {
      if (
        !(
          key == 'constructor' &&
          (isProto || !hasOwnProperty$3.call(object, key))
        )
      ) {
        result.push(key);
      }
    }
    return result;
  }

  let _baseKeysIn = baseKeysIn$1;

  let arrayLikeKeys = _arrayLikeKeys,
    baseKeysIn = _baseKeysIn,
    isArrayLike$3 = isArrayLike_1;

  /**
   * Creates an array of the own and inherited enumerable property names of `object`.
   *
   * **Note:** Non-object values are coerced to objects.
   *
   * @static
   * @memberOf _
   * @since 3.0.0
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
   * _.keysIn(new Foo);
   * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
   */
  function keysIn$3(object) {
    return isArrayLike$3(object)
      ? arrayLikeKeys(object, true)
      : baseKeysIn(object);
  }

  let keysIn_1 = keysIn$3;

  let copyObject$2 = _copyObject,
    keysIn$2 = keysIn_1;

  /**
   * The base implementation of `_.assignIn` without support for multiple sources
   * or `customizer` functions.
   *
   * @private
   * @param {Object} object The destination object.
   * @param {Object} source The source object.
   * @returns {Object} Returns `object`.
   */
  function baseAssignIn$1(object, source) {
    return object && copyObject$2(source, keysIn$2(source), object);
  }

  let _baseAssignIn = baseAssignIn$1;

  let _cloneBuffer = { exports: {} };

  (function (module, exports) {
    let root = _root;

    /** Detect free variable `exports`. */
    let freeExports = exports && !exports.nodeType && exports;

    /** Detect free variable `module`. */
    let freeModule =
      freeExports &&
      'object' == 'object' &&
      module &&
      !module.nodeType &&
      module;

    /** Detect the popular CommonJS extension `module.exports`. */
    let moduleExports = freeModule && freeModule.exports === freeExports;

    /** Built-in value references. */
    let Buffer = moduleExports ? root.Buffer : undefined,
      allocUnsafe = Buffer ? Buffer.allocUnsafe : undefined;

    /**
     * Creates a clone of  `buffer`.
     *
     * @private
     * @param {Buffer} buffer The buffer to clone.
     * @param {boolean} [isDeep] Specify a deep clone.
     * @returns {Buffer} Returns the cloned buffer.
     */
    function cloneBuffer(buffer, isDeep) {
      if (isDeep) {
        return buffer.slice();
      }
      let length = buffer.length,
        result = allocUnsafe
          ? allocUnsafe(length)
          : new buffer.constructor(length);

      buffer.copy(result);
      return result;
    }

    module.exports = cloneBuffer;
  })(_cloneBuffer, _cloneBuffer.exports);

  /**
   * Copies the values of `source` to `array`.
   *
   * @private
   * @param {Array} source The array to copy values from.
   * @param {Array} [array=[]] The array to copy values to.
   * @returns {Array} Returns `array`.
   */

  function copyArray$2(source, array) {
    let index = -1,
      length = source.length;

    array || (array = Array(length));
    while (++index < length) {
      array[index] = source[index];
    }
    return array;
  }

  let _copyArray = copyArray$2;

  /**
   * A specialized version of `_.filter` for arrays without support for
   * iteratee shorthands.
   *
   * @private
   * @param {Array} [array] The array to iterate over.
   * @param {Function} predicate The function invoked per iteration.
   * @returns {Array} Returns the new filtered array.
   */

  function arrayFilter$1(array, predicate) {
    let index = -1,
      length = array == null ? 0 : array.length,
      resIndex = 0,
      result = [];

    while (++index < length) {
      let value = array[index];
      if (predicate(value, index, array)) {
        result[resIndex++] = value;
      }
    }
    return result;
  }

  let _arrayFilter = arrayFilter$1;

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

  function stubArray$2() {
    return [];
  }

  let stubArray_1 = stubArray$2;

  let arrayFilter = _arrayFilter,
    stubArray$1 = stubArray_1;

  /** Used for built-in method references. */
  let objectProto$2 = Object.prototype;

  /** Built-in value references. */
  let propertyIsEnumerable = objectProto$2.propertyIsEnumerable;

  /* Built-in method references for those with the same name as other `lodash` methods. */
  let nativeGetSymbols$1 = Object.getOwnPropertySymbols;

  /**
   * Creates an array of the own enumerable symbols of `object`.
   *
   * @private
   * @param {Object} object The object to query.
   * @returns {Array} Returns the array of symbols.
   */
  let getSymbols$3 = !nativeGetSymbols$1
    ? stubArray$1
    : function (object) {
        if (object == null) {
          return [];
        }
        object = Object(object);
        return arrayFilter(nativeGetSymbols$1(object), function (symbol) {
          return propertyIsEnumerable.call(object, symbol);
        });
      };

  let _getSymbols = getSymbols$3;

  let copyObject$1 = _copyObject,
    getSymbols$2 = _getSymbols;

  /**
   * Copies own symbols of `source` to `object`.
   *
   * @private
   * @param {Object} source The object to copy symbols from.
   * @param {Object} [object={}] The object to copy symbols to.
   * @returns {Object} Returns `object`.
   */
  function copySymbols$1(source, object) {
    return copyObject$1(source, getSymbols$2(source), object);
  }

  let _copySymbols = copySymbols$1;

  let overArg = _overArg;

  /** Built-in value references. */
  let getPrototype$2 = overArg(Object.getPrototypeOf, Object);

  let _getPrototype = getPrototype$2;

  let arrayPush$2 = _arrayPush,
    getPrototype$1 = _getPrototype,
    getSymbols$1 = _getSymbols,
    stubArray = stubArray_1;

  /* Built-in method references for those with the same name as other `lodash` methods. */
  let nativeGetSymbols = Object.getOwnPropertySymbols;

  /**
   * Creates an array of the own and inherited enumerable symbols of `object`.
   *
   * @private
   * @param {Object} object The object to query.
   * @returns {Array} Returns the array of symbols.
   */
  let getSymbolsIn$2 = !nativeGetSymbols
    ? stubArray
    : function (object) {
        let result = [];
        while (object) {
          arrayPush$2(result, getSymbols$1(object));
          object = getPrototype$1(object);
        }
        return result;
      };

  let _getSymbolsIn = getSymbolsIn$2;

  let copyObject = _copyObject,
    getSymbolsIn$1 = _getSymbolsIn;

  /**
   * Copies own and inherited symbols of `source` to `object`.
   *
   * @private
   * @param {Object} source The object to copy symbols from.
   * @param {Object} [object={}] The object to copy symbols to.
   * @returns {Object} Returns `object`.
   */
  function copySymbolsIn$1(source, object) {
    return copyObject(source, getSymbolsIn$1(source), object);
  }

  let _copySymbolsIn = copySymbolsIn$1;

  let arrayPush$1 = _arrayPush,
    isArray$5 = isArray_1;

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
  function baseGetAllKeys$2(object, keysFunc, symbolsFunc) {
    let result = keysFunc(object);
    return isArray$5(object)
      ? result
      : arrayPush$1(result, symbolsFunc(object));
  }

  let _baseGetAllKeys = baseGetAllKeys$2;

  let baseGetAllKeys$1 = _baseGetAllKeys,
    getSymbols = _getSymbols,
    keys$2 = keys_1;

  /**
   * Creates an array of own enumerable property names and symbols of `object`.
   *
   * @private
   * @param {Object} object The object to query.
   * @returns {Array} Returns the array of property names and symbols.
   */
  function getAllKeys$1(object) {
    return baseGetAllKeys$1(object, keys$2, getSymbols);
  }

  let _getAllKeys = getAllKeys$1;

  let baseGetAllKeys = _baseGetAllKeys,
    getSymbolsIn = _getSymbolsIn,
    keysIn$1 = keysIn_1;

  /**
   * Creates an array of own and inherited enumerable property names and
   * symbols of `object`.
   *
   * @private
   * @param {Object} object The object to query.
   * @returns {Array} Returns the array of property names and symbols.
   */
  function getAllKeysIn$1(object) {
    return baseGetAllKeys(object, keysIn$1, getSymbolsIn);
  }

  let _getAllKeysIn = getAllKeysIn$1;

  let getNative$3 = _getNative,
    root$4 = _root;

  /* Built-in method references that are verified to be native. */
  let DataView$1 = getNative$3(root$4, 'DataView');

  let _DataView = DataView$1;

  let getNative$2 = _getNative,
    root$3 = _root;

  /* Built-in method references that are verified to be native. */
  let Promise$2 = getNative$2(root$3, 'Promise');

  let _Promise = Promise$2;

  let getNative$1 = _getNative,
    root$2 = _root;

  /* Built-in method references that are verified to be native. */
  let Set$2 = getNative$1(root$2, 'Set');

  let _Set = Set$2;

  let getNative = _getNative,
    root$1 = _root;

  /* Built-in method references that are verified to be native. */
  let WeakMap$1 = getNative(root$1, 'WeakMap');

  let _WeakMap = WeakMap$1;

  let DataView = _DataView,
    Map$1 = _Map,
    Promise$1 = _Promise,
    Set$1 = _Set,
    WeakMap = _WeakMap,
    baseGetTag$2 = _baseGetTag,
    toSource = _toSource;

  /** `Object#toString` result references. */
  let mapTag$5 = '[object Map]',
    objectTag$1 = '[object Object]',
    promiseTag = '[object Promise]',
    setTag$5 = '[object Set]',
    weakMapTag$1 = '[object WeakMap]';

  let dataViewTag$2 = '[object DataView]';

  /** Used to detect maps, sets, and weakmaps. */
  let dataViewCtorString = toSource(DataView),
    mapCtorString = toSource(Map$1),
    promiseCtorString = toSource(Promise$1),
    setCtorString = toSource(Set$1),
    weakMapCtorString = toSource(WeakMap);

  /**
   * Gets the `toStringTag` of `value`.
   *
   * @private
   * @param {*} value The value to query.
   * @returns {string} Returns the `toStringTag`.
   */
  let getTag$5 = baseGetTag$2;

  // Fallback for data views, maps, sets, and weak maps in IE 11 and promises in Node.js < 6.
  if (
    (DataView && getTag$5(new DataView(new ArrayBuffer(1))) != dataViewTag$2) ||
    (Map$1 && getTag$5(new Map$1()) != mapTag$5) ||
    (Promise$1 && getTag$5(Promise$1.resolve()) != promiseTag) ||
    (Set$1 && getTag$5(new Set$1()) != setTag$5) ||
    (WeakMap && getTag$5(new WeakMap()) != weakMapTag$1)
  ) {
    getTag$5 = function (value) {
      let result = baseGetTag$2(value),
        Ctor = result == objectTag$1 ? value.constructor : undefined,
        ctorString = Ctor ? toSource(Ctor) : '';

      if (ctorString) {
        switch (ctorString) {
          case dataViewCtorString:
            return dataViewTag$2;
          case mapCtorString:
            return mapTag$5;
          case promiseCtorString:
            return promiseTag;
          case setCtorString:
            return setTag$5;
          case weakMapCtorString:
            return weakMapTag$1;
        }
      }
      return result;
    };
  }

  let _getTag = getTag$5;

  /** Used for built-in method references. */

  let objectProto$1 = Object.prototype;

  /** Used to check objects for own properties. */
  let hasOwnProperty$2 = objectProto$1.hasOwnProperty;

  /**
   * Initializes an array clone.
   *
   * @private
   * @param {Array} array The array to clone.
   * @returns {Array} Returns the initialized clone.
   */
  function initCloneArray$1(array) {
    let length = array.length,
      result = new array.constructor(length);

    // Add properties assigned by `RegExp#exec`.
    if (
      length &&
      typeof array[0] == 'string' &&
      hasOwnProperty$2.call(array, 'index')
    ) {
      result.index = array.index;
      result.input = array.input;
    }
    return result;
  }

  let _initCloneArray = initCloneArray$1;

  let root = _root;

  /** Built-in value references. */
  let Uint8Array$1 = root.Uint8Array;

  let _Uint8Array = Uint8Array$1;

  let Uint8Array = _Uint8Array;

  /**
   * Creates a clone of `arrayBuffer`.
   *
   * @private
   * @param {ArrayBuffer} arrayBuffer The array buffer to clone.
   * @returns {ArrayBuffer} Returns the cloned array buffer.
   */
  function cloneArrayBuffer$3(arrayBuffer) {
    let result = new arrayBuffer.constructor(arrayBuffer.byteLength);
    new Uint8Array(result).set(new Uint8Array(arrayBuffer));
    return result;
  }

  let _cloneArrayBuffer = cloneArrayBuffer$3;

  let cloneArrayBuffer$2 = _cloneArrayBuffer;

  /**
   * Creates a clone of `dataView`.
   *
   * @private
   * @param {Object} dataView The data view to clone.
   * @param {boolean} [isDeep] Specify a deep clone.
   * @returns {Object} Returns the cloned data view.
   */
  function cloneDataView$1(dataView, isDeep) {
    let buffer = isDeep ? cloneArrayBuffer$2(dataView.buffer) : dataView.buffer;
    return new dataView.constructor(
      buffer,
      dataView.byteOffset,
      dataView.byteLength
    );
  }

  let _cloneDataView = cloneDataView$1;

  /** Used to match `RegExp` flags from their coerced string values. */

  let reFlags = /\w*$/;

  /**
   * Creates a clone of `regexp`.
   *
   * @private
   * @param {Object} regexp The regexp to clone.
   * @returns {Object} Returns the cloned regexp.
   */
  function cloneRegExp$1(regexp) {
    let result = new regexp.constructor(regexp.source, reFlags.exec(regexp));
    result.lastIndex = regexp.lastIndex;
    return result;
  }

  let _cloneRegExp = cloneRegExp$1;

  let Symbol$1 = _Symbol;

  /** Used to convert symbols to primitives and strings. */
  let symbolProto = Symbol$1 ? Symbol$1.prototype : undefined,
    symbolValueOf = symbolProto ? symbolProto.valueOf : undefined;

  /**
   * Creates a clone of the `symbol` object.
   *
   * @private
   * @param {Object} symbol The symbol object to clone.
   * @returns {Object} Returns the cloned symbol object.
   */
  function cloneSymbol$1(symbol) {
    return symbolValueOf ? Object(symbolValueOf.call(symbol)) : {};
  }

  let _cloneSymbol = cloneSymbol$1;

  let cloneArrayBuffer$1 = _cloneArrayBuffer;

  /**
   * Creates a clone of `typedArray`.
   *
   * @private
   * @param {Object} typedArray The typed array to clone.
   * @param {boolean} [isDeep] Specify a deep clone.
   * @returns {Object} Returns the cloned typed array.
   */
  function cloneTypedArray$1(typedArray, isDeep) {
    let buffer = isDeep
      ? cloneArrayBuffer$1(typedArray.buffer)
      : typedArray.buffer;
    return new typedArray.constructor(
      buffer,
      typedArray.byteOffset,
      typedArray.length
    );
  }

  let _cloneTypedArray = cloneTypedArray$1;

  let cloneArrayBuffer = _cloneArrayBuffer,
    cloneDataView = _cloneDataView,
    cloneRegExp = _cloneRegExp,
    cloneSymbol = _cloneSymbol,
    cloneTypedArray = _cloneTypedArray;

  /** `Object#toString` result references. */
  let boolTag$1 = '[object Boolean]',
    dateTag$1 = '[object Date]',
    mapTag$4 = '[object Map]',
    numberTag$2 = '[object Number]',
    regexpTag$1 = '[object RegExp]',
    setTag$4 = '[object Set]',
    stringTag$2 = '[object String]',
    symbolTag$1 = '[object Symbol]';

  let arrayBufferTag$1 = '[object ArrayBuffer]',
    dataViewTag$1 = '[object DataView]',
    float32Tag$1 = '[object Float32Array]',
    float64Tag$1 = '[object Float64Array]',
    int8Tag$1 = '[object Int8Array]',
    int16Tag$1 = '[object Int16Array]',
    int32Tag$1 = '[object Int32Array]',
    uint8Tag$1 = '[object Uint8Array]',
    uint8ClampedTag$1 = '[object Uint8ClampedArray]',
    uint16Tag$1 = '[object Uint16Array]',
    uint32Tag$1 = '[object Uint32Array]';

  /**
   * Initializes an object clone based on its `toStringTag`.
   *
   * **Note:** This function only supports cloning values with tags of
   * `Boolean`, `Date`, `Error`, `Map`, `Number`, `RegExp`, `Set`, or `String`.
   *
   * @private
   * @param {Object} object The object to clone.
   * @param {string} tag The `toStringTag` of the object to clone.
   * @param {boolean} [isDeep] Specify a deep clone.
   * @returns {Object} Returns the initialized clone.
   */
  function initCloneByTag$1(object, tag, isDeep) {
    let Ctor = object.constructor;
    switch (tag) {
      case arrayBufferTag$1:
        return cloneArrayBuffer(object);

      case boolTag$1:
      case dateTag$1:
        return new Ctor(+object);

      case dataViewTag$1:
        return cloneDataView(object, isDeep);

      case float32Tag$1:
      case float64Tag$1:
      case int8Tag$1:
      case int16Tag$1:
      case int32Tag$1:
      case uint8Tag$1:
      case uint8ClampedTag$1:
      case uint16Tag$1:
      case uint32Tag$1:
        return cloneTypedArray(object, isDeep);

      case mapTag$4:
        return new Ctor();

      case numberTag$2:
      case stringTag$2:
        return new Ctor(object);

      case regexpTag$1:
        return cloneRegExp(object);

      case setTag$4:
        return new Ctor();

      case symbolTag$1:
        return cloneSymbol(object);
    }
  }

  let _initCloneByTag = initCloneByTag$1;

  let isObject$2 = isObject_1;

  /** Built-in value references. */
  let objectCreate = Object.create;

  /**
   * The base implementation of `_.create` without support for assigning
   * properties to the created object.
   *
   * @private
   * @param {Object} proto The object to inherit from.
   * @returns {Object} Returns the new object.
   */
  let baseCreate$1 = (function () {
    function object() {}
    return function (proto) {
      if (!isObject$2(proto)) {
        return {};
      }
      if (objectCreate) {
        return objectCreate(proto);
      }
      object.prototype = proto;
      let result = new object();
      object.prototype = undefined;
      return result;
    };
  })();

  let _baseCreate = baseCreate$1;

  let baseCreate = _baseCreate,
    getPrototype = _getPrototype,
    isPrototype$1 = _isPrototype;

  /**
   * Initializes an object clone.
   *
   * @private
   * @param {Object} object The object to clone.
   * @returns {Object} Returns the initialized clone.
   */
  function initCloneObject$1(object) {
    return typeof object.constructor == 'function' && !isPrototype$1(object)
      ? baseCreate(getPrototype(object))
      : {};
  }

  let _initCloneObject = initCloneObject$1;

  let getTag$4 = _getTag,
    isObjectLike$3 = isObjectLike_1;

  /** `Object#toString` result references. */
  let mapTag$3 = '[object Map]';

  /**
   * The base implementation of `_.isMap` without Node.js optimizations.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a map, else `false`.
   */
  function baseIsMap$1(value) {
    return isObjectLike$3(value) && getTag$4(value) == mapTag$3;
  }

  let _baseIsMap = baseIsMap$1;

  let baseIsMap = _baseIsMap,
    baseUnary$1 = _baseUnary,
    nodeUtil$1 = _nodeUtil.exports;

  /* Node.js helper references. */
  let nodeIsMap = nodeUtil$1 && nodeUtil$1.isMap;

  /**
   * Checks if `value` is classified as a `Map` object.
   *
   * @static
   * @memberOf _
   * @since 4.3.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a map, else `false`.
   * @example
   *
   * _.isMap(new Map);
   * // => true
   *
   * _.isMap(new WeakMap);
   * // => false
   */
  let isMap$1 = nodeIsMap ? baseUnary$1(nodeIsMap) : baseIsMap;

  let isMap_1 = isMap$1;

  let getTag$3 = _getTag,
    isObjectLike$2 = isObjectLike_1;

  /** `Object#toString` result references. */
  let setTag$3 = '[object Set]';

  /**
   * The base implementation of `_.isSet` without Node.js optimizations.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a set, else `false`.
   */
  function baseIsSet$1(value) {
    return isObjectLike$2(value) && getTag$3(value) == setTag$3;
  }

  let _baseIsSet = baseIsSet$1;

  let baseIsSet = _baseIsSet,
    baseUnary = _baseUnary,
    nodeUtil = _nodeUtil.exports;

  /* Node.js helper references. */
  let nodeIsSet = nodeUtil && nodeUtil.isSet;

  /**
   * Checks if `value` is classified as a `Set` object.
   *
   * @static
   * @memberOf _
   * @since 4.3.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a set, else `false`.
   * @example
   *
   * _.isSet(new Set);
   * // => true
   *
   * _.isSet(new WeakSet);
   * // => false
   */
  let isSet$1 = nodeIsSet ? baseUnary(nodeIsSet) : baseIsSet;

  let isSet_1 = isSet$1;

  let Stack = _Stack,
    arrayEach$1 = _arrayEach,
    assignValue = _assignValue,
    baseAssign = _baseAssign,
    baseAssignIn = _baseAssignIn,
    cloneBuffer = _cloneBuffer.exports,
    copyArray$1 = _copyArray,
    copySymbols = _copySymbols,
    copySymbolsIn = _copySymbolsIn,
    getAllKeys = _getAllKeys,
    getAllKeysIn = _getAllKeysIn,
    getTag$2 = _getTag,
    initCloneArray = _initCloneArray,
    initCloneByTag = _initCloneByTag,
    initCloneObject = _initCloneObject,
    isArray$4 = isArray_1,
    isBuffer$1 = isBuffer$3.exports,
    isMap = isMap_1,
    isObject$1 = isObject_1,
    isSet = isSet_1,
    keys$1 = keys_1,
    keysIn = keysIn_1;

  /** Used to compose bitmasks for cloning. */
  let CLONE_DEEP_FLAG = 1,
    CLONE_FLAT_FLAG = 2,
    CLONE_SYMBOLS_FLAG$1 = 4;

  /** `Object#toString` result references. */
  let argsTag = '[object Arguments]',
    arrayTag = '[object Array]',
    boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    errorTag = '[object Error]',
    funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]',
    mapTag$2 = '[object Map]',
    numberTag$1 = '[object Number]',
    objectTag = '[object Object]',
    regexpTag = '[object RegExp]',
    setTag$2 = '[object Set]',
    stringTag$1 = '[object String]',
    symbolTag = '[object Symbol]',
    weakMapTag = '[object WeakMap]';

  let arrayBufferTag = '[object ArrayBuffer]',
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

  /** Used to identify `toStringTag` values supported by `_.clone`. */
  let cloneableTags = {};
  cloneableTags[argsTag] =
    cloneableTags[arrayTag] =
    cloneableTags[arrayBufferTag] =
    cloneableTags[dataViewTag] =
    cloneableTags[boolTag] =
    cloneableTags[dateTag] =
    cloneableTags[float32Tag] =
    cloneableTags[float64Tag] =
    cloneableTags[int8Tag] =
    cloneableTags[int16Tag] =
    cloneableTags[int32Tag] =
    cloneableTags[mapTag$2] =
    cloneableTags[numberTag$1] =
    cloneableTags[objectTag] =
    cloneableTags[regexpTag] =
    cloneableTags[setTag$2] =
    cloneableTags[stringTag$1] =
    cloneableTags[symbolTag] =
    cloneableTags[uint8Tag] =
    cloneableTags[uint8ClampedTag] =
    cloneableTags[uint16Tag] =
    cloneableTags[uint32Tag] =
      true;
  cloneableTags[errorTag] =
    cloneableTags[funcTag] =
    cloneableTags[weakMapTag] =
      false;

  /**
   * The base implementation of `_.clone` and `_.cloneDeep` which tracks
   * traversed objects.
   *
   * @private
   * @param {*} value The value to clone.
   * @param {boolean} bitmask The bitmask flags.
   *  1 - Deep clone
   *  2 - Flatten inherited properties
   *  4 - Clone symbols
   * @param {Function} [customizer] The function to customize cloning.
   * @param {string} [key] The key of `value`.
   * @param {Object} [object] The parent object of `value`.
   * @param {Object} [stack] Tracks traversed objects and their clone counterparts.
   * @returns {*} Returns the cloned value.
   */
  function baseClone$1(value, bitmask, customizer, key, object, stack) {
    let result,
      isDeep = bitmask & CLONE_DEEP_FLAG,
      isFlat = bitmask & CLONE_FLAT_FLAG,
      isFull = bitmask & CLONE_SYMBOLS_FLAG$1;

    if (customizer) {
      result = object
        ? customizer(value, key, object, stack)
        : customizer(value);
    }
    if (result !== undefined) {
      return result;
    }
    if (!isObject$1(value)) {
      return value;
    }
    let isArr = isArray$4(value);
    if (isArr) {
      result = initCloneArray(value);
      if (!isDeep) {
        return copyArray$1(value, result);
      }
    } else {
      let tag = getTag$2(value),
        isFunc = tag == funcTag || tag == genTag;

      if (isBuffer$1(value)) {
        return cloneBuffer(value, isDeep);
      }
      if (tag == objectTag || tag == argsTag || (isFunc && !object)) {
        result = isFlat || isFunc ? {} : initCloneObject(value);
        if (!isDeep) {
          return isFlat
            ? copySymbolsIn(value, baseAssignIn(result, value))
            : copySymbols(value, baseAssign(result, value));
        }
      } else {
        if (!cloneableTags[tag]) {
          return object ? value : {};
        }
        result = initCloneByTag(value, tag, isDeep);
      }
    }
    // Check for circular references and return its corresponding clone.
    stack || (stack = new Stack());
    let stacked = stack.get(value);
    if (stacked) {
      return stacked;
    }
    stack.set(value, result);

    if (isSet(value)) {
      value.forEach(function (subValue) {
        result.add(
          baseClone$1(subValue, bitmask, customizer, subValue, value, stack)
        );
      });
    } else if (isMap(value)) {
      value.forEach(function (subValue, key) {
        result.set(
          key,
          baseClone$1(subValue, bitmask, customizer, key, value, stack)
        );
      });
    }

    let keysFunc = isFull
      ? isFlat
        ? getAllKeysIn
        : getAllKeys
      : isFlat
      ? keysIn
      : keys$1;

    let props = isArr ? undefined : keysFunc(value);
    arrayEach$1(props || value, function (subValue, key) {
      if (props) {
        key = subValue;
        subValue = value[key];
      }
      // Recursively populate clone (susceptible to call stack limits).
      assignValue(
        result,
        key,
        baseClone$1(subValue, bitmask, customizer, key, value, stack)
      );
    });
    return result;
  }

  let _baseClone = baseClone$1;

  let baseClone = _baseClone;

  /** Used to compose bitmasks for cloning. */
  let CLONE_SYMBOLS_FLAG = 4;

  /**
   * Creates a shallow clone of `value`.
   *
   * **Note:** This method is loosely based on the
   * [structured clone algorithm](https://mdn.io/Structured_clone_algorithm)
   * and supports cloning arrays, array buffers, booleans, date objects, maps,
   * numbers, `Object` objects, regexes, sets, strings, symbols, and typed
   * arrays. The own enumerable properties of `arguments` objects are cloned
   * as plain objects. An empty object is returned for uncloneable values such
   * as error objects, functions, DOM nodes, and WeakMaps.
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Lang
   * @param {*} value The value to clone.
   * @returns {*} Returns the cloned value.
   * @see _.cloneDeep
   * @example
   *
   * var objects = [{ 'a': 1 }, { 'b': 2 }];
   *
   * var shallow = _.clone(objects);
   * console.log(shallow[0] === objects[0]);
   * // => true
   */
  function clone(value) {
    return baseClone(value, CLONE_SYMBOLS_FLAG);
  }

  let clone_1 = clone;

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

  function defaultComparator(a, b) {
    return a < b;
  }

  let Heap = /*#__PURE__*/ (function () {
    function Heap(items, comparator) {
      _classCallCheck$2(this, Heap);

      this._items = items || [];
      this._size = this._items.length;
      this._comparator = comparator || defaultComparator;

      this._heapify();
    }
    /*
     * @return {boolean}
     */

    _createClass$2(Heap, [
      {
        key: 'empty',
        value: function empty() {
          return this._size === 0;
        },
        /*
         * @return {*}
         */
      },
      {
        key: 'pop',
        value: function pop() {
          if (this._size === 0) {
            return;
          }

          let elt = this._items[0];

          let lastElt = this._items.pop();

          this._size--;

          if (this._size > 0) {
            this._items[0] = lastElt;

            this._sinkDown(0);
          }

          return elt;
        },
        /*
         * @param {*} item
         */
      },
      {
        key: 'push',
        value: function push(item) {
          this._items[this._size++] = item;

          this._bubbleUp(this._size - 1);
        },
        /*
         * @return {number}
         */
      },
      {
        key: 'size',
        value: function size() {
          return this._size;
        },
        /*
         * @return {*}
         */
      },
      {
        key: 'peek',
        value: function peek() {
          if (this._size === 0) {
            return;
          }

          return this._items[0];
        },
      },
      {
        key: '_heapify',
        value: function _heapify() {
          for (
            let index = Math.floor((this._size + 1) / 2);
            index >= 0;
            index--
          ) {
            this._sinkDown(index);
          }
        },
        /*
         * @parent {number} index
         */
      },
      {
        key: '_bubbleUp',
        value: function _bubbleUp(index) {
          let elt = this._items[index];

          while (index > 0) {
            let parentIndex = Math.floor((index + 1) / 2) - 1;
            let parentElt = this._items[parentIndex]; // if parentElt < elt, stop

            if (this._comparator(parentElt, elt)) {
              return;
            } // swap

            this._items[parentIndex] = elt;
            this._items[index] = parentElt;
            index = parentIndex;
          }
        },
        /*
         * @parent {number} index
         */
      },
      {
        key: '_sinkDown',
        value: function _sinkDown(index) {
          let elt = this._items[index];

          while (true) {
            let leftChildIndex = 2 * (index + 1) - 1;
            let rightChildIndex = 2 * (index + 1);
            let swapIndex = -1;

            if (leftChildIndex < this._size) {
              let leftChild = this._items[leftChildIndex];

              if (this._comparator(leftChild, elt)) {
                swapIndex = leftChildIndex;
              }
            }

            if (rightChildIndex < this._size) {
              let rightChild = this._items[rightChildIndex];

              if (this._comparator(rightChild, elt)) {
                if (
                  swapIndex === -1 ||
                  this._comparator(rightChild, this._items[swapIndex])
                ) {
                  swapIndex = rightChildIndex;
                }
              }
            } // if we don't have a swap, stop

            if (swapIndex === -1) {
              return;
            }

            this._items[index] = this._items[swapIndex];
            this._items[swapIndex] = elt;
            index = swapIndex;
          }
        },
      },
    ]);

    return Heap;
  })();

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

  let IntegerBufferSet = /*#__PURE__*/ (function () {
    function IntegerBufferSet() {
      _classCallCheck$2(this, IntegerBufferSet);

      this._valueToPositionMap = {};
      this._size = 0;
      this._smallValues = new Heap(
        [], // Initial data in the heap
        this._smallerComparator
      );
      this._largeValues = new Heap(
        [], // Initial data in the heap
        this._greaterComparator
      );
      this.getNewPositionForValue = this.getNewPositionForValue.bind(this);
      this.getValuePosition = this.getValuePosition.bind(this);
      this.getSize = this.getSize.bind(this);
      this.replaceFurthestValuePosition =
        this.replaceFurthestValuePosition.bind(this);
    }

    _createClass$2(IntegerBufferSet, [
      {
        key: 'getSize',
        value: function getSize() /*number*/
        {
          return this._size;
        },
      },
      {
        key: 'getValuePosition',
        value: function getValuePosition(
          /*number*/
          value
        ) /*?number*/
        {
          if (this._valueToPositionMap[value] === undefined) {
            return null;
          }

          return this._valueToPositionMap[value];
        },
      },
      {
        key: 'getNewPositionForValue',
        value: function getNewPositionForValue(
          /*number*/
          value
        ) /*number*/
        {
          invariant$1(
            this._valueToPositionMap[value] === undefined,
            "Shouldn't try to find new position for value already stored in BufferSet"
          );
          let newPosition = this._size;
          this._size++;

          this._pushToHeaps(newPosition, value);

          this._valueToPositionMap[value] = newPosition;
          return newPosition;
        },
      },
      {
        key: 'replaceFurthestValuePosition',
        value: function replaceFurthestValuePosition(
          /*number*/
          lowValue,
          /*number*/
          highValue,
          /*number*/
          newValue
        ) /*?number*/
        {
          invariant$1(
            this._valueToPositionMap[newValue] === undefined,
            "Shouldn't try to replace values with value already stored value in " +
              'BufferSet'
          );

          this._cleanHeaps();

          if (this._smallValues.empty() || this._largeValues.empty()) {
            // Threre are currently no values stored. We will have to create new
            // position for this value.
            return null;
          }

          let minValue = this._smallValues.peek().value;

          let maxValue = this._largeValues.peek().value;

          if (minValue >= lowValue && maxValue <= highValue) {
            // All values currently stored are necessary, we can't reuse any of them.
            return null;
          }

          let valueToReplace;

          if (lowValue - minValue > maxValue - highValue) {
            // minValue is further from provided range. We will reuse it's position.
            valueToReplace = minValue;

            this._smallValues.pop();
          } else {
            valueToReplace = maxValue;

            this._largeValues.pop();
          }

          let position = this._valueToPositionMap[valueToReplace];
          delete this._valueToPositionMap[valueToReplace];
          this._valueToPositionMap[newValue] = position;

          this._pushToHeaps(position, newValue);

          return position;
        },
      },
      {
        key: '_pushToHeaps',
        value: function _pushToHeaps(
          /*number*/
          position,
          /*number*/
          value
        ) {
          let element = {
            position,
            value,
          }; // We can reuse the same object in both heaps, because we don't mutate them

          this._smallValues.push(element);

          this._largeValues.push(element);
        },
      },
      {
        key: '_cleanHeaps',
        value: function _cleanHeaps() {
          // We not usually only remove object from one heap while moving value.
          // Here we make sure that there is no stale data on top of heaps.
          this._cleanHeap(this._smallValues);

          this._cleanHeap(this._largeValues);

          let minHeapSize = Math.min(
            this._smallValues.size(),
            this._largeValues.size()
          );
          let maxHeapSize = Math.max(
            this._smallValues.size(),
            this._largeValues.size()
          );

          if (maxHeapSize > 10 * minHeapSize) {
            // There are many old values in one of heaps. We nned to get rid of them
            // to not use too avoid memory leaks
            this._recreateHeaps();
          }
        },
      },
      {
        key: '_recreateHeaps',
        value: function _recreateHeaps() {
          let sourceHeap =
            this._smallValues.size() < this._largeValues.size()
              ? this._smallValues
              : this._largeValues;
          let newSmallValues = new Heap(
            [], // Initial data in the heap
            this._smallerComparator
          );
          let newLargeValues = new Heap(
            [], // Initial datat in the heap
            this._greaterComparator
          );

          while (!sourceHeap.empty()) {
            let element = sourceHeap.pop(); // Push all stil valid elements to new heaps

            if (this._valueToPositionMap[element.value] !== undefined) {
              newSmallValues.push(element);
              newLargeValues.push(element);
            }
          }

          this._smallValues = newSmallValues;
          this._largeValues = newLargeValues;
        },
      },
      {
        key: '_cleanHeap',
        value: function _cleanHeap(
          /*object*/
          heap
        ) {
          while (
            !heap.empty() &&
            this._valueToPositionMap[heap.peek().value] === undefined
          ) {
            heap.pop();
          }
        },
      },
      {
        key: '_smallerComparator',
        value: function _smallerComparator(
          /*object*/
          lhs,
          /*object*/
          rhs
        ) /*boolean*/
        {
          return lhs.value < rhs.value;
        },
      },
      {
        key: '_greaterComparator',
        value: function _greaterComparator(
          /*object*/
          lhs,
          /*object*/
          rhs
        ) /*boolean*/
        {
          return lhs.value > rhs.value;
        },
      },
    ]);

    return IntegerBufferSet;
  })();

  let win;

  if (typeof window !== 'undefined') {
    win = window;
  } else if (typeof commonjsGlobal !== 'undefined') {
    win = commonjsGlobal;
  } else if (typeof self !== 'undefined') {
    win = self;
  } else {
    win = {};
  }

  let window_1 = win;

  /**
   * Copyright Schrodinger, LLC
   * All rights reserved.
   *
   * This source code is licensed under the BSD-style license found in the
   * LICENSE file in the root directory of this source tree. An additional grant
   * of patent rights can be found in the PATENTS file in the same directory.
   *
   * @providesModule globalThisPolyfill
   */
  let globalThisPolyfill =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof window !== 'undefined'
      ? window
      : typeof window_1 !== 'undefined'
      ? window_1
      : typeof self !== 'undefined'
      ? self
      : {};

  /**
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

  let parent = function parent(node) {
    return Math.floor(node / 2);
  };

  let Int32Array =
    globalThisPolyfill.Int32Array ||
    function (size) {
      let xs = [];

      for (let i = size - 1; i >= 0; --i) {
        xs[i] = 0;
      }

      return xs;
    };
  /**
   * Computes the next power of 2 after or equal to x.
   */

  function ceilLog2(x) {
    let y = 1;

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

  let PrefixIntervalTree = /*#__PURE__*/ (function () {
    function PrefixIntervalTree(xs) {
      _classCallCheck$2(this, PrefixIntervalTree);

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
      let i;

      for (i = 0; i < this._size; ++i) {
        this._heap[this._half + i] = xs[i];
      }

      for (i = this._half - 1; i > 0; --i) {
        this._heap[i] = this._heap[2 * i] + this._heap[2 * i + 1];
      }
    }

    _createClass$2(
      PrefixIntervalTree,
      [
        {
          key: 'set',
          value: function set(index, value) {
            invariant$1(
              0 <= index && index < this._size,
              'Index out of range %s',
              index
            );
            let node = this._half + index;
            this._heap[node] = value;
            node = parent(node);

            for (; node !== 0; node = parent(node)) {
              this._heap[node] =
                this._heap[2 * node] + this._heap[2 * node + 1];
            }
          },
        },
        {
          key: 'get',
          value: function get(index) {
            invariant$1(
              0 <= index && index < this._size,
              'Index out of range %s',
              index
            );
            let node = this._half + index;
            return this._heap[node];
          },
        },
        {
          key: 'getSize',
          value: function getSize() {
            return this._size;
          },
          /**
           * Returns the sum get(0) + get(1) + ... + get(end - 1).
           */
        },
        {
          key: 'sumUntil',
          value: function sumUntil(end) {
            invariant$1(
              0 <= end && end < this._size + 1,
              'Index out of range %s',
              end
            );

            if (end === 0) {
              return 0;
            }

            let node = this._half + end - 1;
            let sum = this._heap[node];

            for (; node !== 1; node = parent(node)) {
              if (node % 2 === 1) {
                sum += this._heap[node - 1];
              }
            }

            return sum;
          },
          /**
           * Returns the sum get(0) + get(1) + ... + get(inclusiveEnd).
           */
        },
        {
          key: 'sumTo',
          value: function sumTo(inclusiveEnd) {
            invariant$1(
              0 <= inclusiveEnd && inclusiveEnd < this._size,
              'Index out of range %s',
              inclusiveEnd
            );
            return this.sumUntil(inclusiveEnd + 1);
          },
          /**
           * Returns the sum get(begin) + get(begin + 1) + ... + get(end - 1).
           */
        },
        {
          key: 'sum',
          value: function sum(begin, end) {
            invariant$1(begin <= end, 'Begin must precede end');
            return this.sumUntil(end) - this.sumUntil(begin);
          },
          /**
           * Returns the smallest i such that 0 <= i <= size and sumUntil(i) <= t, or
           * -1 if no such i exists.
           */
        },
        {
          key: 'greatestLowerBound',
          value: function greatestLowerBound(t) {
            if (t < 0) {
              return -1;
            }

            let node = 1;

            if (this._heap[node] <= t) {
              return this._size;
            }

            while (node < this._half) {
              let leftSum = this._heap[2 * node];

              if (t < leftSum) {
                node = 2 * node;
              } else {
                node = 2 * node + 1;
                t -= leftSum;
              }
            }

            return node - this._half;
          },
          /**
           * Returns the smallest i such that 0 <= i <= size and sumUntil(i) < t, or
           * -1 if no such i exists.
           */
        },
        {
          key: 'greatestStrictLowerBound',
          value: function greatestStrictLowerBound(t) {
            if (t <= 0) {
              return -1;
            }

            let node = 1;

            if (this._heap[node] < t) {
              return this._size;
            }

            while (node < this._half) {
              let leftSum = this._heap[2 * node];

              if (t <= leftSum) {
                node = 2 * node;
              } else {
                node = 2 * node + 1;
                t -= leftSum;
              }
            }

            return node - this._half;
          },
          /**
           * Returns the smallest i such that 0 <= i <= size and t <= sumUntil(i), or
           * size + 1 if no such i exists.
           */
        },
        {
          key: 'leastUpperBound',
          value: function leastUpperBound(t) {
            return this.greatestStrictLowerBound(t) + 1;
          },
          /**
           * Returns the smallest i such that 0 <= i <= size and t < sumUntil(i), or
           * size + 1 if no such i exists.
           */
        },
        {
          key: 'leastStrictUpperBound',
          value: function leastStrictUpperBound(t) {
            return this.greatestLowerBound(t) + 1;
          },
        },
      ],
      [
        {
          key: 'uniform',
          value: function uniform(size, initialValue) {
            let xs = [];

            for (let i = size - 1; i >= 0; --i) {
              xs[i] = initialValue;
            }

            return new PrefixIntervalTree(xs);
          },
        },
        {
          key: 'empty',
          value: function empty(size) {
            return PrefixIntervalTree.uniform(size, 0);
          },
        },
      ]
    );

    return PrefixIntervalTree;
  })();

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

  function shallowEqual(objA, objB) {
    if (objA === objB) {
      return true;
    }

    if (
      _typeof(objA) !== 'object' ||
      objA === null ||
      _typeof(objB) !== 'object' ||
      objB === null
    ) {
      return false;
    }

    let keysA = Object.keys(objA);
    let keysB = Object.keys(objB);

    if (keysA.length !== keysB.length) {
      return false;
    } // Test for A's keys different from B.

    let bHasOwnProperty = Object.prototype.hasOwnProperty.bind(objB);

    for (let i = 0; i < keysA.length; i++) {
      if (!bHasOwnProperty(keysA[i]) || objA[keysA[i]] !== objB[keysA[i]]) {
        return false;
      }
    }

    return true;
  }

  /**
   * Copyright Schrodinger, LLC
   * All rights reserved.
   *
   * This source code is licensed under the BSD-style license found in the
   * LICENSE file in the root directory of this source tree. An additional grant
   * of patent rights can be found in the PATENTS file in the same directory.
   *
   * @providesModule CellGroup
   * @typechecks
   */

  /**
   * This determines how the cell group is fixed/non-fixed to the table.
   *
   * eg: All fixed columns/cells will be part of the 'fixed' cell group.
   * Similarly, all scrollable columns/cells in the grid will be part of the 'scrollable' cell group.
   *
   * @enum {string}
   */
  let CellGroupType = {
    FIXED: 'fixed',
    FIXED_RIGHT: 'fixedRight',
    SCROLLABLE: 'scrollable',
  };

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

  function _createForOfIteratorHelper$2(o, allowArrayLike) {
    let it =
      (typeof Symbol !== 'undefined' && o[Symbol.iterator]) || o['@@iterator'];
    if (!it) {
      if (
        Array.isArray(o) ||
        (it = _unsupportedIterableToArray$2(o)) ||
        (allowArrayLike && o && typeof o.length === 'number')
      ) {
        if (it) o = it;
        let i = 0;
        let F = function F() {};
        return {
          s: F,
          n: function n() {
            if (i >= o.length) return { done: true };
            return { done: false, value: o[i++] };
          },
          e: function e(_e) {
            throw _e;
          },
          f: F,
        };
      }
      throw new TypeError(
        'Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.'
      );
    }
    let normalCompletion = true,
      didErr = false,
      err;
    return {
      s: function s() {
        it = it.call(o);
      },
      n: function n() {
        let step = it.next();
        normalCompletion = step.done;
        return step;
      },
      e: function e(_e2) {
        didErr = true;
        err = _e2;
      },
      f: function f() {
        try {
          if (!normalCompletion && it['return'] != null) it['return']();
        } finally {
          if (didErr) throw err;
        }
      },
    };
  }

  function _unsupportedIterableToArray$2(o, minLen) {
    if (!o) return;
    if (typeof o === 'string') return _arrayLikeToArray$2(o, minLen);
    let n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === 'Object' && o.constructor) n = o.constructor.name;
    if (n === 'Map' || n === 'Set') return Array.from(o);
    if (n === 'Arguments' || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
      return _arrayLikeToArray$2(o, minLen);
  }

  function _arrayLikeToArray$2(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for (var i = 0, arr2 = new Array(len); i < len; i++) {
      arr2[i] = arr[i];
    }
    return arr2;
  }
  // However, _.pick is much slower than the hand written version here.

  function _extractProps(column) {
    let _column$props = column.props,
      align = _column$props.align,
      allowCellsRecycling = _column$props.allowCellsRecycling,
      cellClassName = _column$props.cellClassName,
      columnKey = _column$props.columnKey,
      flexGrow = _column$props.flexGrow,
      fixed = _column$props.fixed,
      fixedRight = _column$props.fixedRight,
      maxWidth = _column$props.maxWidth,
      minWidth = _column$props.minWidth,
      isReorderable = _column$props.isReorderable,
      isResizable = _column$props.isResizable,
      pureRendering = _column$props.pureRendering,
      width = _column$props.width;
    return {
      align,
      allowCellsRecycling,
      cellClassName,
      columnKey,
      flexGrow,
      fixed,
      fixedRight,
      maxWidth,
      minWidth,
      isReorderable,
      isResizable,
      pureRendering,
      width,
    };
  }

  function _extractTemplates(elementTemplates, columnElement) {
    elementTemplates.cell.push(columnElement.props.cell);
    elementTemplates.footer.push(columnElement.props.footer);
    elementTemplates.header.push(columnElement.props.header);
  }

  function getCellGroupType(element) {
    let _element$props, _element$props2;

    if (
      element !== null &&
      element !== void 0 &&
      (_element$props = element.props) !== null &&
      _element$props !== void 0 &&
      _element$props.fixed
    ) {
      return CellGroupType.FIXED;
    } else if (
      element !== null &&
      element !== void 0 &&
      (_element$props2 = element.props) !== null &&
      _element$props2 !== void 0 &&
      _element$props2.fixedRight
    ) {
      return CellGroupType.FIXED_RIGHT;
    } else {
      return CellGroupType.SCROLLABLE;
    }
  }

  function getEmptyElementsContainer() {
    let _ref;

    return (
      (_ref = {}),
      _defineProperty$1(_ref, CellGroupType.FIXED, []),
      _defineProperty$1(_ref, CellGroupType.SCROLLABLE, []),
      _defineProperty$1(_ref, CellGroupType.FIXED_RIGHT, []),
      _ref
    );
  }

  function getEmptyTemplatesContainer() {
    return {
      groupHeader: [],
      header: [],
      cell: [],
      footer: [],
    };
  }

  function _sortByCellGroupType(reactElements) {
    let container = getEmptyElementsContainer();

    let _iterator = _createForOfIteratorHelper$2(reactElements),
      _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done; ) {
        let element = _step.value;
        let cellGroupType = getCellGroupType(element);
        container[cellGroupType].push(element);
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }

    let result = [];
    result.push.apply(result, container[CellGroupType.FIXED]);
    result.push.apply(result, container[CellGroupType.SCROLLABLE]);
    result.push.apply(result, container[CellGroupType.FIXED_RIGHT]);
    return result;
  }

  function _getElementIndex(elementsContainer, cellGroupType) {
    if (cellGroupType === CellGroupType.FIXED) {
      return elementsContainer[CellGroupType.FIXED].length;
    } else if (cellGroupType === CellGroupType.SCROLLABLE) {
      return (
        elementsContainer[CellGroupType.FIXED].length +
        elementsContainer[CellGroupType.SCROLLABLE].length
      );
    } else {
      return (
        elementsContainer[CellGroupType.FIXED].length +
        elementsContainer[CellGroupType.SCROLLABLE].length +
        elementsContainer[CellGroupType.FIXED_RIGHT].length
      );
    }
  }
  /**
   * Converts React column / column group elements into props and cell rendering templates
   */

  function convertColumnElementsToData(childComponents) {
    let _children$0$type$__Ta, _children$;

    let children = [];
    React__default['default'].Children.forEach(
      childComponents,
      function (child, index) {
        if (child == null) {
          return;
        }

        invariant$1(
          child.type.__TableColumnGroup__ || child.type.__TableColumn__,
          'child type should be <FixedDataTableColumn /> or <FixedDataTableColumnGroup />'
        );
        children.push(child);
      }
    );
    let columnElements = getEmptyElementsContainer();
    let columnGroupElements = getEmptyElementsContainer();
    let elementTemplates = getEmptyTemplatesContainer();
    let useGroupHeader =
      (_children$0$type$__Ta =
        (_children$ = children[0]) === null || _children$ === void 0
          ? void 0
          : _children$.type.__TableColumnGroup__) !== null &&
      _children$0$type$__Ta !== void 0
        ? _children$0$type$__Ta
        : false;

    if (useGroupHeader) {
      (function () {
        let columnIndex = 0;

        let _iterator2 = _createForOfIteratorHelper$2(
            _sortByCellGroupType(children)
          ),
          _step2;

        try {
          let _loop = function _loop() {
            let columnGroupReactElement = _step2.value;
            let cellGroupType = getCellGroupType(columnGroupReactElement);

            let columnGroupProps = _extractProps(columnGroupReactElement);

            columnGroupProps.index = _getElementIndex(
              columnGroupElements,
              cellGroupType
            );
            columnGroupElements[cellGroupType].push(columnGroupProps);
            elementTemplates.groupHeader.push(
              columnGroupReactElement.props.header
            );
            React__default['default'].Children.forEach(
              columnGroupReactElement.props.children,
              function (columnReactElement) {
                let columnProps = _extractProps(columnReactElement);

                columnProps.index = columnIndex++;
                columnProps.groupIdx = columnGroupProps.index;
                columnElements[cellGroupType].push(columnProps);

                _extractTemplates(elementTemplates, columnReactElement);
              }
            );
          };

          for (_iterator2.s(); !(_step2 = _iterator2.n()).done; ) {
            _loop();
          }
        } catch (err) {
          _iterator2.e(err);
        } finally {
          _iterator2.f();
        }
      })();
    } else {
      let _iterator3 = _createForOfIteratorHelper$2(
          _sortByCellGroupType(children)
        ),
        _step3;

      try {
        for (_iterator3.s(); !(_step3 = _iterator3.n()).done; ) {
          let columnReactElement = _step3.value;
          let cellGroupType = getCellGroupType(columnReactElement);

          let columnProps = _extractProps(columnReactElement);

          columnProps.index = _getElementIndex(columnElements, cellGroupType);
          columnElements[cellGroupType].push(columnProps);

          _extractTemplates(elementTemplates, columnReactElement);
        }
      } catch (err) {
        _iterator3.e(err);
      } finally {
        _iterator3.f();
      }
    }

    return {
      columnGroupElements,
      columnElements,
      elementTemplates,
      useGroupHeader,
    };
  }

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
  function clamp$1(value, min, max) {
    if (value < min) {
      return min;
    }

    if (value > max) {
      return max;
    }

    return value;
  }

  // Cache implementation based on Erik Rasmussen's `lru-memoize`:
  // https://github.com/erikras/lru-memoize
  let NOT_FOUND = 'NOT_FOUND';

  function createSingletonCache(equals) {
    let entry;
    return {
      get: function get(key) {
        if (entry && equals(entry.key, key)) {
          return entry.value;
        }

        return NOT_FOUND;
      },
      put: function put(key, value) {
        entry = {
          key,
          value,
        };
      },
      getEntries: function getEntries() {
        return entry ? [entry] : [];
      },
      clear: function clear() {
        entry = undefined;
      },
    };
  }

  function createLruCache(maxSize, equals) {
    let entries = [];

    function get(key) {
      let cacheIndex = entries.findIndex(function (entry) {
        return equals(key, entry.key);
      }); // We found a cached entry

      if (cacheIndex > -1) {
        let entry = entries[cacheIndex]; // Cached entry not at top of cache, move it to the top

        if (cacheIndex > 0) {
          entries.splice(cacheIndex, 1);
          entries.unshift(entry);
        }

        return entry.value;
      } // No entry found in cache, return sentinel

      return NOT_FOUND;
    }

    function put(key, value) {
      if (get(key) === NOT_FOUND) {
        // TODO Is unshift slow?
        entries.unshift({
          key,
          value,
        });

        if (entries.length > maxSize) {
          entries.pop();
        }
      }
    }

    function getEntries() {
      return entries;
    }

    function clear() {
      entries = [];
    }

    return {
      get,
      put,
      getEntries,
      clear,
    };
  }

  let defaultEqualityCheck = function defaultEqualityCheck(a, b) {
    return a === b;
  };
  function createCacheKeyComparator(equalityCheck) {
    return function areArgumentsShallowlyEqual(prev, next) {
      if (prev === null || next === null || prev.length !== next.length) {
        return false;
      } // Do this in a for loop (and not a `forEach` or an `every`) so we can determine equality as fast as possible.

      let length = prev.length;

      for (let i = 0; i < length; i++) {
        if (!equalityCheck(prev[i], next[i])) {
          return false;
        }
      }

      return true;
    };
  }
  // defaultMemoize now supports a configurable cache size with LRU behavior,
  // and optional comparison of the result value with existing values
  function defaultMemoize(func, equalityCheckOrOptions) {
    let providedOptions =
      typeof equalityCheckOrOptions === 'object'
        ? equalityCheckOrOptions
        : {
            equalityCheck: equalityCheckOrOptions,
          };
    let _providedOptions$equa = providedOptions.equalityCheck,
      equalityCheck =
        _providedOptions$equa === void 0
          ? defaultEqualityCheck
          : _providedOptions$equa,
      _providedOptions$maxS = providedOptions.maxSize,
      maxSize = _providedOptions$maxS === void 0 ? 1 : _providedOptions$maxS,
      resultEqualityCheck = providedOptions.resultEqualityCheck;
    let comparator = createCacheKeyComparator(equalityCheck);
    let cache =
      maxSize === 1
        ? createSingletonCache(comparator)
        : createLruCache(maxSize, comparator); // we reference arguments instead of spreading them for performance reasons

    function memoized() {
      let value = cache.get(arguments);

      if (value === NOT_FOUND) {
        // @ts-ignore
        value = func.apply(null, arguments);

        if (resultEqualityCheck) {
          let entries = cache.getEntries();
          let matchingEntry = entries.find(function (entry) {
            return resultEqualityCheck(entry.value, value);
          });

          if (matchingEntry) {
            value = matchingEntry.value;
          }
        }

        cache.put(arguments, value);
      }

      return value;
    }

    memoized.clearCache = function () {
      return cache.clear();
    };

    return memoized;
  }

  function getDependencies(funcs) {
    let dependencies = Array.isArray(funcs[0]) ? funcs[0] : funcs;

    if (
      !dependencies.every(function (dep) {
        return typeof dep === 'function';
      })
    ) {
      let dependencyTypes = dependencies
        .map(function (dep) {
          return typeof dep === 'function'
            ? 'function ' + (dep.name || 'unnamed') + '()'
            : typeof dep;
        })
        .join(', ');
      throw new Error(
        'createSelector expects all input-selectors to be functions, but received the following types: [' +
          dependencyTypes +
          ']'
      );
    }

    return dependencies;
  }

  function createSelectorCreator(memoize) {
    for (
      var _len = arguments.length,
        memoizeOptionsFromArgs = new Array(_len > 1 ? _len - 1 : 0),
        _key = 1;
      _key < _len;
      _key++
    ) {
      memoizeOptionsFromArgs[_key - 1] = arguments[_key];
    }

    let createSelector = function createSelector() {
      for (
        var _len2 = arguments.length, funcs = new Array(_len2), _key2 = 0;
        _key2 < _len2;
        _key2++
      ) {
        funcs[_key2] = arguments[_key2];
      }

      let _recomputations = 0;

      let _lastResult; // Due to the intricacies of rest params, we can't do an optional arg after `...funcs`.
      // So, start by declaring the default value here.
      // (And yes, the words 'memoize' and 'options' appear too many times in this next sequence.)

      let directlyPassedOptions = {
        memoizeOptions: undefined,
      }; // Normally, the result func or "output selector" is the last arg

      let resultFunc = funcs.pop(); // If the result func is actually an _object_, assume it's our options object

      if (typeof resultFunc === 'object') {
        directlyPassedOptions = resultFunc; // and pop the real result func off

        resultFunc = funcs.pop();
      }

      if (typeof resultFunc !== 'function') {
        throw new Error(
          'createSelector expects an output function after the inputs, but received: [' +
            typeof resultFunc +
            ']'
        );
      } // Determine which set of options we're using. Prefer options passed directly,
      // but fall back to options given to createSelectorCreator.

      let _directlyPassedOption = directlyPassedOptions,
        _directlyPassedOption2 = _directlyPassedOption.memoizeOptions,
        memoizeOptions =
          _directlyPassedOption2 === void 0
            ? memoizeOptionsFromArgs
            : _directlyPassedOption2; // Simplifying assumption: it's unlikely that the first options arg of the provided memoizer
      // is an array. In most libs I've looked at, it's an equality function or options object.
      // Based on that, if `memoizeOptions` _is_ an array, we assume it's a full
      // user-provided array of options. Otherwise, it must be just the _first_ arg, and so
      // we wrap it in an array so we can apply it.

      let finalMemoizeOptions = Array.isArray(memoizeOptions)
        ? memoizeOptions
        : [memoizeOptions];
      let dependencies = getDependencies(funcs);
      let memoizedResultFunc = memoize.apply(
        void 0,
        [
          function recomputationWrapper() {
            _recomputations++; // apply arguments instead of spreading for performance.

            return resultFunc.apply(null, arguments);
          },
        ].concat(finalMemoizeOptions)
      ); // If a selector is called with the exact same arguments we don't need to traverse our dependencies again.

      let selector = memoize(function dependenciesChecker() {
        let params = [];
        let length = dependencies.length;

        for (let i = 0; i < length; i++) {
          // apply arguments instead of spreading and mutate a local list of params for performance.
          // @ts-ignore
          params.push(dependencies[i].apply(null, arguments));
        } // apply arguments instead of spreading for performance.

        _lastResult = memoizedResultFunc.apply(null, params);
        return _lastResult;
      });
      Object.assign(selector, {
        resultFunc,
        memoizedResultFunc,
        dependencies,
        lastResult: function lastResult() {
          return _lastResult;
        },
        recomputations: function recomputations() {
          return _recomputations;
        },
        resetRecomputations: function resetRecomputations() {
          return (_recomputations = 0);
        },
      });
      return selector;
    }; // @ts-ignore

    return createSelector;
  }
  let createSelector = /* #__PURE__ */ createSelectorCreator(defaultMemoize);

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
  let shallowEqualSelector = createSelector;

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

  function _createForOfIteratorHelper$1(o, allowArrayLike) {
    let it =
      (typeof Symbol !== 'undefined' && o[Symbol.iterator]) || o['@@iterator'];
    if (!it) {
      if (
        Array.isArray(o) ||
        (it = _unsupportedIterableToArray$1(o)) ||
        (allowArrayLike && o && typeof o.length === 'number')
      ) {
        if (it) o = it;
        let i = 0;
        let F = function F() {};
        return {
          s: F,
          n: function n() {
            if (i >= o.length) return { done: true };
            return { done: false, value: o[i++] };
          },
          e: function e(_e) {
            throw _e;
          },
          f: F,
        };
      }
      throw new TypeError(
        'Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.'
      );
    }
    let normalCompletion = true,
      didErr = false,
      err;
    return {
      s: function s() {
        it = it.call(o);
      },
      n: function n() {
        let step = it.next();
        normalCompletion = step.done;
        return step;
      },
      e: function e(_e2) {
        didErr = true;
        err = _e2;
      },
      f: function f() {
        try {
          if (!normalCompletion && it['return'] != null) it['return']();
        } finally {
          if (didErr) throw err;
        }
      },
    };
  }

  function _unsupportedIterableToArray$1(o, minLen) {
    if (!o) return;
    if (typeof o === 'string') return _arrayLikeToArray$1(o, minLen);
    let n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === 'Object' && o.constructor) n = o.constructor.name;
    if (n === 'Map' || n === 'Set') return Array.from(o);
    if (n === 'Arguments' || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
      return _arrayLikeToArray$1(o, minLen);
  }

  function _arrayLikeToArray$1(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for (var i = 0, arr2 = new Array(len); i < len; i++) {
      arr2[i] = arr[i];
    }
    return arr2;
  }
  let emptyArray = [];
  let emptyObject = {};
  let cacheOptions = {
    memoizeOptions: {
      maxSize: 12, // 3 cell group types * 4 template types
    },
  };
  let sumPropWidths = createSelector(
    function (columns) {
      return columns || emptyArray;
    },
    function (columns) {
      return columns.reduce(function (accum, column) {
        return accum + column.props.width;
      }, 0);
    },
    cacheOptions
  );
  let getTotalWidth = createSelector(
    function (columns) {
      return columns || emptyArray;
    },
    function (columns) {
      return columns.reduce(function (accum, column) {
        return accum + column.width;
      }, 0);
    },
    cacheOptions
  );
  function getTotalWidthContainer(container) {
    return (
      getTotalWidth(container.fixed) +
      getTotalWidth(container.fixedRight) +
      getTotalWidth(container.scrollable)
    );
  }
  let getTotalFlexGrow = createSelector(
    function (container) {
      return container || emptyObject;
    },
    function (container) {
      let columns = Array.prototype.concat.call(
        container.fixed,
        container.scrollable,
        container.fixedRight
      );
      let flexGrow = 0;

      let _iterator = _createForOfIteratorHelper$1(columns),
        _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done; ) {
          let column = _step.value;
          flexGrow += column.flexGrow || 0;
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      return flexGrow;
    },
    cacheOptions
  );

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
  let BORDER_HEIGHT = 1;
  let MIN_BUFFER_ROWS = 3;
  let MAX_BUFFER_ROWS = 6;
  let ScrollbarState = {
    HIDDEN: 'hidden',
    JOINT_SCROLLBARS: 'JOINT_SCROLLBARS',
    VISIBLE: 'visible',
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
   *   cellGroupWrapperHeight: number,
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

  function roughHeights(
    columnElements,
    elementHeights,
    rowSettings,
    scrollFlags,
    tableSize,
    scrollbarXHeight,
    scrollbarYWidth
  ) {
    let cellGroupWrapperHeight = elementHeights.cellGroupWrapperHeight,
      footerHeight = elementHeights.footerHeight,
      headerHeight = elementHeights.headerHeight,
      groupHeaderHeight = elementHeights.groupHeaderHeight; // we don't need border height to be added to the table if we are using cellGroupWrapperHeight

    let borderHeight = cellGroupWrapperHeight ? 0 : 2 * BORDER_HEIGHT;
    let reservedHeight =
      footerHeight + headerHeight + groupHeaderHeight + borderHeight;
    let height = tableSize.height,
      maxHeight = tableSize.maxHeight,
      useMaxHeight = tableSize.useMaxHeight,
      width = tableSize.width;
    let maxComponentHeight = Math.round(useMaxHeight ? maxHeight : height);
    let roughAvailableHeight = maxComponentHeight - reservedHeight;
    let scrollStateX = getScrollStateX(
      columnElements,
      scrollFlags,
      width,
      scrollbarYWidth
    );
    /*
     * Early estimates of how much height we have to show rows.
     * We won't know which one is real until we know about horizontal scrollbar which
     * requires knowing about vertical scrollbar as well and that
     * requires scrollContentHeight which
     * requires us to have handled scrollTo / scrollToRow...
     */

    let minAvailableHeight = roughAvailableHeight;
    let maxAvailableHeight = roughAvailableHeight;

    switch (scrollStateX) {
      case ScrollbarState.VISIBLE: {
        minAvailableHeight -= scrollbarXHeight;
        maxAvailableHeight -= scrollbarXHeight;
        break;
      }

      case ScrollbarState.JOINT_SCROLLBARS: {
        minAvailableHeight -= scrollbarXHeight;
        break;
      }
    }

    return {
      bufferRowCount: getBufferRowCount(maxAvailableHeight, rowSettings),
      minAvailableHeight: Math.max(minAvailableHeight, 0),
      maxAvailableHeight: Math.max(maxAvailableHeight, 0),
      reservedHeight,
      scrollStateX,
    };
  }
  /**
   * @param {!Array.<{
   *   width: number,
   * }>} columnProps
   * @param {{
   *   overflowX: string,
   *   showScrollbarX: boolean,
   * }} scrollFlags
   * @param {number} width
   * @return {ScrollbarState}
   */

  function getScrollStateX(
    columnElements,
    scrollFlags,
    width,
    scrollbarYWidth
  ) {
    let overflowX = scrollFlags.overflowX,
      showScrollbarX = scrollFlags.showScrollbarX;
    let minColWidth = getTotalWidthContainer(columnElements);

    if (overflowX === 'hidden' || showScrollbarX === false) {
      return ScrollbarState.HIDDEN;
    } else if (minColWidth > width) {
      return ScrollbarState.VISIBLE;
    }

    if (minColWidth > width - scrollbarYWidth) {
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
    let bufferRowCount = rowSettings.bufferRowCount,
      rowHeight = rowSettings.rowHeight,
      subRowHeight = rowSettings.subRowHeight;

    if (bufferRowCount !== undefined) {
      console.log('buffer set: ' + bufferRowCount);
      return bufferRowCount;
    }

    let fullRowHeight = rowHeight + subRowHeight;
    let avgVisibleRowCount = Math.ceil(maxAvailableHeight / fullRowHeight) + 1;
    return clamp$1(
      Math.floor(avgVisibleRowCount / 2),
      MIN_BUFFER_ROWS,
      MAX_BUFFER_ROWS
    );
  }

  let roughHeightsSelector = shallowEqualSelector(
    [
      function (state) {
        return state.columnElements;
      },
      function (state) {
        return state.elementHeights;
      },
      function (state) {
        return state.rowSettings;
      },
      function (state) {
        return state.scrollFlags;
      },
      function (state) {
        return state.tableSize;
      },
      function (state) {
        return state.scrollbarXHeight;
      },
      function (state) {
        return state.scrollbarYWidth;
      },
    ],
    roughHeights
  );

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

  function scrollbarsVisible(roughHeights, scrollContentHeight, scrollFlags) {
    let overflowY = scrollFlags.overflowY,
      showScrollbarY = scrollFlags.showScrollbarY;
    let allowScrollbarY = overflowY !== 'hidden' && showScrollbarY !== false;
    let minAvailableHeight = roughHeights.minAvailableHeight,
      maxAvailableHeight = roughHeights.maxAvailableHeight,
      scrollStateX = roughHeights.scrollStateX;
    let scrollEnabledY = false;
    let scrollEnabledX = false;

    if (scrollStateX === ScrollbarState.VISIBLE) {
      scrollEnabledX = true;
    }

    if (allowScrollbarY && scrollContentHeight > maxAvailableHeight) {
      scrollEnabledY = true;
    } // Handle case where vertical scrollbar makes horizontal scrollbar necessary

    if (scrollEnabledY && scrollStateX === ScrollbarState.JOINT_SCROLLBARS) {
      scrollEnabledX = true;
    }

    let availableHeight = maxAvailableHeight;

    if (scrollEnabledX) {
      availableHeight = minAvailableHeight;
    }

    return {
      availableHeight,
      scrollEnabledX,
      scrollEnabledY,
    };
  }

  let scrollbarsVisible$1 = shallowEqualSelector(
    [
      roughHeightsSelector,
      function (state) {
        return state.scrollContentHeight;
      },
      function (state) {
        return state.scrollFlags;
      },
    ],
    scrollbarsVisible
  );

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
   * @param {!Object} state
   * @param {number} rowIdx
   * @return {number} The new row height
   */

  function updateRowHeight(state, rowIdx) {
    let rowSettings = state.rowSettings;

    let _state$getInternal = state.getInternal(),
      storedHeights = _state$getInternal.storedHeights,
      rowOffsetIntervalTree = _state$getInternal.rowOffsetIntervalTree;

    let rowHeightGetter = rowSettings.rowHeightGetter,
      subRowHeightGetter = rowSettings.subRowHeightGetter;
    let newHeight = rowHeightGetter(rowIdx) + subRowHeightGetter(rowIdx);
    let oldHeight = storedHeights[rowIdx];

    if (newHeight !== oldHeight) {
      rowOffsetIntervalTree.set(rowIdx, newHeight);
      storedHeights[rowIdx] = newHeight;
      state.scrollContentHeight += newHeight - oldHeight;
    }

    return storedHeights[rowIdx];
  }

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
  /**
   * Get the anchor for scrolling.
   * This will either be the first row's index and an offset, or the last row's index.
   * We also pass a flag indicating if the anchor has changed from the state
   *
   * @param {!Object} state
   * @param {!Object} newProps
   * @param {!Object} [oldProps]
   * @return {{
   *   firstIndex: number,
   *   firstOffset: number,
   *   lastIndex: number,
   *   changed: boolean,
   * }}
   */

  function getScrollAnchor(state, newProps, oldProps) {
    if (
      newProps.scrollToRow !== undefined &&
      newProps.scrollToRow !== null &&
      (!oldProps || newProps.scrollToRow !== oldProps.scrollToRow)
    ) {
      return scrollToRow(state, newProps.scrollToRow);
    }

    if (
      newProps.scrollTop !== undefined &&
      newProps.scrollTop !== null &&
      (!oldProps || newProps.scrollTop !== oldProps.scrollTop)
    ) {
      return scrollTo$1(state, newProps.scrollTop);
    }

    return {
      firstIndex: state.firstRowIndex,
      firstOffset: state.firstRowOffset,
      lastIndex: undefined,
      changed: false,
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

  function scrollTo$1(state, scrollY) {
    let _scrollbarsVisibleSel = scrollbarsVisible$1(state),
      availableHeight = _scrollbarsVisibleSel.availableHeight;

    let rowSettings = state.rowSettings,
      scrollContentHeight = state.scrollContentHeight;

    let _state$getInternal = state.getInternal(),
      rowOffsetIntervalTree = _state$getInternal.rowOffsetIntervalTree;

    let rowsCount = rowSettings.rowsCount;

    if (rowsCount === 0) {
      return {
        firstIndex: 0,
        firstOffset: 0,
        lastIndex: undefined,
        changed: state.firstRowIndex !== 0 || state.firstRowOffset !== 0,
      };
    }

    let firstIndex = 0;
    let firstOffset = 0;
    let lastIndex = undefined;

    if (scrollY <= 0);
    else if (scrollY >= scrollContentHeight - availableHeight) {
      // Scroll to the last row
      firstIndex = undefined;
      lastIndex = rowsCount - 1;
    } else {
      // Mark the row which will appear first in the viewport
      // We use this as our "marker" when scrolling even if updating rowOffsets
      // leads to it not being different from the scrollY specified
      let newRowIdx = rowOffsetIntervalTree.greatestLowerBound(scrollY);
      firstIndex = clamp$1(newRowIdx, 0, Math.max(rowsCount - 1, 0)); // Record how far into the first row we should scroll
      // firstOffset is a negative value representing how much larger scrollY is
      // than the scroll position of the first row in the viewport

      let firstRowPosition = rowOffsetIntervalTree.sumUntil(firstIndex);
      firstOffset = firstRowPosition - scrollY;
    }

    return {
      firstIndex,
      firstOffset,
      lastIndex,
      // NOTE (jordan) This changed heuristic may give false positives,
      // but that's fine since it's used as a filter to computeRenderedRows
      changed: true,
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
    let _scrollbarsVisibleSel2 = scrollbarsVisible$1(state),
      availableHeight = _scrollbarsVisibleSel2.availableHeight;

    let rowSettings = state.rowSettings,
      scrollY = state.scrollY;

    let _state$getInternal2 = state.getInternal(),
      rowOffsetIntervalTree = _state$getInternal2.rowOffsetIntervalTree,
      storedHeights = _state$getInternal2.storedHeights;

    let rowsCount = rowSettings.rowsCount;

    if (rowsCount === 0) {
      return {
        firstIndex: 0,
        firstOffset: 0,
        lastIndex: undefined,
        changed: state.firstRowIndex !== 0 || state.firstRowOffset !== 0,
      };
    }

    rowIndex = clamp$1(rowIndex, 0, Math.max(rowsCount - 1, 0));
    updateRowHeight(state, rowIndex);
    let rowBegin = rowOffsetIntervalTree.sumUntil(rowIndex);
    let rowEnd = rowBegin + storedHeights[rowIndex];
    let firstIndex = rowIndex;
    let lastIndex = undefined;

    if (rowBegin < scrollY);
    else if (scrollY + availableHeight < rowEnd) {
      // If after the viewport, set as the last row in the viewport
      firstIndex = undefined;
      lastIndex = rowIndex;
    } else {
      // If already in the viewport, do nothing.
      return {
        firstIndex: state.firstRowIndex,
        firstOffset: state.firstRowOffset,
        lastIndex: undefined,
        changed: false,
      };
    }

    return {
      firstIndex,
      firstOffset: 0,
      lastIndex,
      changed: true,
    };
  }

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

  let isNil_1 = isNil;

  /**
   * The base implementation of `_.clamp` which doesn't coerce arguments.
   *
   * @private
   * @param {number} number The number to clamp.
   * @param {number} [lower] The lower bound.
   * @param {number} upper The upper bound.
   * @returns {number} Returns the clamped number.
   */

  function baseClamp$1(number, lower, upper) {
    if (number === number) {
      if (upper !== undefined) {
        number = number <= upper ? number : upper;
      }
      if (lower !== undefined) {
        number = number >= lower ? number : lower;
      }
    }
    return number;
  }

  let _baseClamp = baseClamp$1;

  /** Used to match a single whitespace character. */

  let reWhitespace = /\s/;

  /**
   * Used by `_.trim` and `_.trimEnd` to get the index of the last non-whitespace
   * character of `string`.
   *
   * @private
   * @param {string} string The string to inspect.
   * @returns {number} Returns the index of the last non-whitespace character.
   */
  function trimmedEndIndex$1(string) {
    let index = string.length;

    while (index-- && reWhitespace.test(string.charAt(index))) {}
    return index;
  }

  let _trimmedEndIndex = trimmedEndIndex$1;

  let trimmedEndIndex = _trimmedEndIndex;

  /** Used to match leading whitespace. */
  let reTrimStart = /^\s+/;

  /**
   * The base implementation of `_.trim`.
   *
   * @private
   * @param {string} string The string to trim.
   * @returns {string} Returns the trimmed string.
   */
  function baseTrim$1(string) {
    return string
      ? string.slice(0, trimmedEndIndex(string) + 1).replace(reTrimStart, '')
      : string;
  }

  let _baseTrim = baseTrim$1;

  let baseTrim = _baseTrim,
    isObject = isObject_1,
    isSymbol = isSymbol_1;

  /** Used as references for various `Number` constants. */
  let NAN = 0 / 0;

  /** Used to detect bad signed hexadecimal string values. */
  let reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

  /** Used to detect binary string values. */
  let reIsBinary = /^0b[01]+$/i;

  /** Used to detect octal string values. */
  let reIsOctal = /^0o[0-7]+$/i;

  /** Built-in method references without a dependency on `root`. */
  let freeParseInt = parseInt;

  /**
   * Converts `value` to a number.
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Lang
   * @param {*} value The value to process.
   * @returns {number} Returns the number.
   * @example
   *
   * _.toNumber(3.2);
   * // => 3.2
   *
   * _.toNumber(Number.MIN_VALUE);
   * // => 5e-324
   *
   * _.toNumber(Infinity);
   * // => Infinity
   *
   * _.toNumber('3.2');
   * // => 3.2
   */
  function toNumber$3(value) {
    if (typeof value == 'number') {
      return value;
    }
    if (isSymbol(value)) {
      return NAN;
    }
    if (isObject(value)) {
      let other = typeof value.valueOf == 'function' ? value.valueOf() : value;
      value = isObject(other) ? other + '' : other;
    }
    if (typeof value != 'string') {
      return value === 0 ? value : +value;
    }
    value = baseTrim(value);
    let isBinary = reIsBinary.test(value);
    return isBinary || reIsOctal.test(value)
      ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
      : reIsBadHex.test(value)
      ? NAN
      : +value;
  }

  let toNumber_1 = toNumber$3;

  let baseClamp = _baseClamp,
    toNumber$2 = toNumber_1;

  /**
   * Clamps `number` within the inclusive `lower` and `upper` bounds.
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Number
   * @param {number} number The number to clamp.
   * @param {number} [lower] The lower bound.
   * @param {number} upper The upper bound.
   * @returns {number} Returns the clamped number.
   * @example
   *
   * _.clamp(-10, -5, 5);
   * // => -5
   *
   * _.clamp(10, -5, 5);
   * // => 5
   */
  function clamp(number, lower, upper) {
    if (upper === undefined) {
      upper = lower;
      lower = undefined;
    }
    if (upper !== undefined) {
      upper = toNumber$2(upper);
      upper = upper === upper ? upper : 0;
    }
    if (lower !== undefined) {
      lower = toNumber$2(lower);
      lower = lower === lower ? lower : 0;
    }
    return baseClamp(toNumber$2(number), lower, upper);
  }

  let clamp_1 = clamp;

  let arrayPush = _arrayPush,
    baseFlatten = _baseFlatten,
    copyArray = _copyArray,
    isArray$3 = isArray_1;

  /**
   * Creates a new array concatenating `array` with any additional arrays
   * and/or values.
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Array
   * @param {Array} array The array to concatenate.
   * @param {...*} [values] The values to concatenate.
   * @returns {Array} Returns the new concatenated array.
   * @example
   *
   * var array = [1];
   * var other = _.concat(array, 2, [3], [[4]]);
   *
   * console.log(other);
   * // => [1, 2, 3, [4]]
   *
   * console.log(array);
   * // => [1]
   */
  function concat() {
    let length = arguments.length;
    if (!length) {
      return [];
    }
    let args = Array(length - 1),
      array = arguments[0],
      index = length;

    while (index--) {
      args[index - 1] = arguments[index];
    }
    return arrayPush(
      isArray$3(array) ? copyArray(array) : [array],
      baseFlatten(args, 1)
    );
  }

  let concat_1 = concat;

  function _createForOfIteratorHelper(o, allowArrayLike) {
    let it =
      (typeof Symbol !== 'undefined' && o[Symbol.iterator]) || o['@@iterator'];
    if (!it) {
      if (
        Array.isArray(o) ||
        (it = _unsupportedIterableToArray(o)) ||
        (allowArrayLike && o && typeof o.length === 'number')
      ) {
        if (it) o = it;
        let i = 0;
        let F = function F() {};
        return {
          s: F,
          n: function n() {
            if (i >= o.length) return { done: true };
            return { done: false, value: o[i++] };
          },
          e: function e(_e) {
            throw _e;
          },
          f: F,
        };
      }
      throw new TypeError(
        'Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.'
      );
    }
    let normalCompletion = true,
      didErr = false,
      err;
    return {
      s: function s() {
        it = it.call(o);
      },
      n: function n() {
        let step = it.next();
        normalCompletion = step.done;
        return step;
      },
      e: function e(_e2) {
        didErr = true;
        err = _e2;
      },
      f: function f() {
        try {
          if (!normalCompletion && it['return'] != null) it['return']();
        } finally {
          if (didErr) throw err;
        }
      },
    };
  }

  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === 'string') return _arrayLikeToArray(o, minLen);
    let n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === 'Object' && o.constructor) n = o.constructor.name;
    if (n === 'Map' || n === 'Set') return Array.from(o);
    if (n === 'Arguments' || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
      return _arrayLikeToArray(o, minLen);
  }

  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for (var i = 0, arr2 = new Array(len); i < len; i++) {
      arr2[i] = arr[i];
    }
    return arr2;
  }
  /**
   * @typedef {{
   *   fixed: boolean,
   *   fixedRight: boolean,
   *   flexGrow: number,
   *   width: number,
   *   groupIdx?: number
   * }} columnDefinition
   */

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
   *   fixedColumnGroups: !Array.<columnDefinition>,
   *   fixedRightColumns: !Array.<columnDefinition>,
   *   fixedRightColumnGroups: !Array.<columnDefinition>,
   *   scrollableColumns: !Array.<columnDefinition>,
   *   scrollableColumnGroups: !Array.<columnDefinition>,
   *   maxScrollX: number,
   * }} The total width of all columns.
   */

  function columnWidths(
    columnGroupElements,
    columnElements,
    scrollEnabledY,
    width,
    scrollbarYWidth
  ) {
    let scrollbarSpace = scrollEnabledY ? scrollbarYWidth : 0;
    let viewportWidth = width - scrollbarSpace;

    let _flexWidths = flexWidths(
        columnGroupElements,
        columnElements,
        viewportWidth
      ),
      columnGroupElementsWithFlex = _flexWidths.columnGroupElements,
      columnElementsWithFlex = _flexWidths.columnElements;

    let _groupElementsByCellG = groupElementsByCellGroup(
        columnElementsWithFlex
      ),
      fixedColumns = _groupElementsByCellG.fixed,
      fixedRightColumns = _groupElementsByCellG.fixedRight,
      scrollableColumns = _groupElementsByCellG.scrollable;

    let _groupElementsByCellG2 = groupElementsByCellGroup(
        columnGroupElementsWithFlex
      ),
      fixedColumnGroups = _groupElementsByCellG2.fixed,
      fixedRightColumnGroups = _groupElementsByCellG2.fixedRight,
      scrollableColumnGroups = _groupElementsByCellG2.scrollable;

    let fixedColumnsTotalWidth = getTotalWidth(fixedColumns);
    let fixedRightColumnsTotalWidth = getTotalWidth(fixedRightColumns);
    let scrollableColumnsTotalWidth = getTotalWidth(scrollableColumns);
    let availableScrollWidth =
      viewportWidth - fixedColumnsTotalWidth - fixedRightColumnsTotalWidth;
    let maxScrollX = Math.max(
      0,
      fixedColumnsTotalWidth +
        fixedRightColumnsTotalWidth +
        scrollableColumnsTotalWidth -
        viewportWidth
    );
    return {
      columnGroupProps: concat_1(
        fixedColumnGroups,
        scrollableColumnGroups,
        fixedRightColumnGroups
      ),
      columnProps: concat_1(fixedColumns, scrollableColumns, fixedRightColumns),
      availableScrollWidth,
      fixedColumns,
      fixedRightColumns,
      scrollableColumns,
      fixedColumnGroups,
      fixedRightColumnGroups,
      scrollableColumnGroups,
      maxScrollX,
    };
  }
  /**
   * @param {!Array.<columnDefinition>} columnGroupProps
   * @param {!Array.<columnDefinition>} columnProps
   * @param {number} viewportWidth
   * @return {{
   *   columnGroupProps: !Array.<columnDefinition>,
   *   columnProps: !Array.<columnDefinition>
   * }}
   */

  function flexWidths(columnGroupElements, columnElements, viewportWidth) {
    let columnGroupElementsWithFlex = getEmptyElementsContainer();
    let columnElementsWithFlex = getEmptyElementsContainer();
    let columnsWidth = getTotalWidthContainer(columnElements);
    let remainingFlexGrow = getTotalFlexGrow(columnElements);
    let remainingFlexWidth = Math.max(viewportWidth - columnsWidth, 0);
    let columnGroupWidths = []; // calculate widths and offsets for each column based on flex

    for (let cellGroupType in columnElements) {
      let columnProps = columnElements[cellGroupType];
      let offset = 0;
      let columnIndex = 0;

      var _iterator = _createForOfIteratorHelper(columnProps),
        _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done; ) {
          let column = _step.value;
          let flexGrow = column.flexGrow || 0;
          let flexWidth = 0;

          if (flexGrow) {
            flexWidth = Math.floor(
              (flexGrow * remainingFlexWidth) / remainingFlexGrow
            );
          }

          let width = column.width + flexWidth;
          remainingFlexGrow -= flexGrow;
          remainingFlexWidth -= flexWidth;

          let newColumn = _extends({}, column, {
            width,
            offset,
          });

          offset += width;
          columnGroupWidths[column.groupIdx] =
            width + (columnGroupWidths[column.groupIdx] || 0);
          columnElementsWithFlex[cellGroupType][columnIndex] = newColumn;
          columnIndex++;
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    } // calculate widths and offsets for each column group

    for (let _cellGroupType in columnGroupElements) {
      let columnGroupProps = columnGroupElements[_cellGroupType];
      let _offset = 0;
      let index = 0;

      var _iterator2 = _createForOfIteratorHelper(columnGroupProps),
        _step2;

      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done; ) {
          let columnGroup = _step2.value;
          let _width = columnGroupWidths[columnGroup.index];

          let newColumnGroup = _extends({}, columnGroup, {
            width: _width,
            offset: _offset,
          });

          _offset += _width;
          columnGroupElementsWithFlex[_cellGroupType][index] = newColumnGroup;
          index++;
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
    }

    return {
      columnGroupElements: columnGroupElementsWithFlex,
      columnElements: columnElementsWithFlex,
    };
  }
  /**
   * @param {!Array.<columnDefinition>} elements
   * @return {{
   *   fixedColumns: !Array.<columnDefinition>,
   *   fixedRightColumns: !Array.<columnDefinition>,
   *   scrollableColumns: !Array.<columnDefinition>
   * }}
   */

  function groupElementsByCellGroup(elements) {
    return {
      fixed: elements.fixed,
      fixedRight: elements.fixedRight,
      scrollable: elements.scrollable,
    };
  }

  let columnWidths$1 = shallowEqualSelector(
    [
      function (state) {
        return state.columnGroupElements;
      },
      function (state) {
        return state.columnElements;
      },
      function (state) {
        return scrollbarsVisible$1(state).scrollEnabledY;
      },
      function (state) {
        return state.tableSize.width;
      },
      function (state) {
        return state.scrollbarYWidth;
      },
    ],
    columnWidths
  );

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
  /**
   * Initialize scrollX state
   *
   * @param {!Object} state
   * @param {!Object} props
   * @param {Object} oldProps
   * @return {!Object}
   */

  function initialize$1(state, props, oldProps) {
    let scrollLeft = props.scrollLeft;
    props.scrollToColumn;
    let scrollX = state.scrollX;

    if (
      scrollLeft !== undefined &&
      (!oldProps || scrollLeft !== oldProps.scrollLeft)
    ) {
      scrollX = scrollLeft;
    }

    scrollX = scrollTo(state, props, oldProps.scrollToColumn, scrollX);

    let _columnWidths = columnWidths$1(state),
      maxScrollX = _columnWidths.maxScrollX;

    scrollX = clamp_1(scrollX, 0, maxScrollX);

    _extends(state, {
      maxScrollX,
      scrollX,
    });
  }
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
    let scrollToColumn = props.scrollToColumn;

    if (isNil_1(scrollToColumn)) {
      return scrollX;
    }

    let _columnWidths2 = columnWidths$1(state),
      availableScrollWidth = _columnWidths2.availableScrollWidth,
      fixedColumns = _columnWidths2.fixedColumns,
      scrollableColumns = _columnWidths2.scrollableColumns;

    let fixedColumnsCount = fixedColumns.length;
    let scrollableColumnsCount = scrollableColumns.length;
    let noScrollableColumns = scrollableColumnsCount === 0;
    let scrollToUnchanged = scrollToColumn === oldScrollToColumn;
    let selectedColumnFixed = scrollToColumn < fixedColumnsCount;
    let selectedColumnFixedRight =
      scrollToColumn >= fixedColumnsCount + scrollableColumnsCount;

    if (
      scrollToUnchanged ||
      selectedColumnFixed ||
      selectedColumnFixedRight ||
      noScrollableColumns
    ) {
      return scrollX;
    } // Convert column index (0 indexed) to scrollable index (0 indexed)
    // and clamp to max scrollable index

    let clampedColumnIndex = Math.min(
      scrollToColumn - fixedColumnsCount,
      scrollableColumns.length - 1
    ); // Compute the width of all columns to the left of the column

    let previousWidth = 0;

    for (let columnIdx = 0; columnIdx < clampedColumnIndex; ++columnIdx) {
      previousWidth += scrollableColumns[columnIdx].width;
    } // Get width of specified column

    let selectedColumnWidth = scrollableColumns[clampedColumnIndex].width; // Compute the scroll position which sets the column on the right of the viewport
    // Must scroll at least far enough for end of column (previousWidth + selectedColumnWidth)
    // to be in viewport.

    let minScrollPosition =
      previousWidth + selectedColumnWidth - availableScrollWidth; // Handle offscreen to the left
    // If scrolled less than minimum amount, scroll to minimum amount
    // so column on right of viewport

    if (scrollX < minScrollPosition) {
      return minScrollPosition;
    } // Handle offscreen to the right
    // If scrolled more than previous columns, at least part of column will be offscreen to left
    // Scroll so column is flush with left edge of viewport

    if (scrollX > previousWidth) {
      return previousWidth;
    }

    return scrollX;
  }

  let columnStateHelper = {
    initialize: initialize$1,
  };

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
   *   scrollbarYHeight: number,
   *   visibleRowsHeight: number,
   * }}
   */

  function tableHeights(
    elementHeights,
    ownerHeight,
    reservedHeight,
    scrollContentHeight,
    scrollbarsVisible,
    useMaxHeight,
    scrollbarXHeight
  ) {
    let availableHeight = scrollbarsVisible.availableHeight,
      scrollEnabledX = scrollbarsVisible.scrollEnabledX;
    let reservedWithScrollbar = reservedHeight;

    if (scrollEnabledX) {
      reservedWithScrollbar += scrollbarXHeight;
    } // If less content than space for rows (bodyHeight), then
    // we should shrink the space for rows to fit our row content (scrollContentHeight).

    let bodyHeight = Math.min(availableHeight, scrollContentHeight); // If using max height, component should only be sized to content.
    // Otherwise use all available height.

    let rowContainerHeight = useMaxHeight ? bodyHeight : availableHeight;
    let componentHeight = rowContainerHeight + reservedWithScrollbar; // If we have an owner height and it's less than the component height,
    // adjust visible height so we show footer and scrollbar position at the bottom of owner.

    let visibleRowsHeight = rowContainerHeight;

    if (ownerHeight < componentHeight) {
      visibleRowsHeight = ownerHeight - reservedWithScrollbar;
    } // If using max height, virtual row container is scrollContentHeight, otherwise
    // it is the larger of that or the available height.

    let virtualRowContainerHeight = useMaxHeight
      ? scrollContentHeight
      : Math.max(scrollContentHeight, availableHeight); // contentHeight is the virtual rows height and reserved height,
    // or ownerHeight if that's larger

    let contentHeight = virtualRowContainerHeight + reservedWithScrollbar;

    if (ownerHeight) {
      contentHeight = Math.max(ownerHeight, contentHeight);
    } // Determine component offsets

    let footerHeight = elementHeights.footerHeight,
      groupHeaderHeight = elementHeights.groupHeaderHeight,
      headerHeight = elementHeights.headerHeight;
    let bodyOffsetTop = groupHeaderHeight + headerHeight;
    let footOffsetTop = bodyOffsetTop + visibleRowsHeight;
    let scrollbarXOffsetTop = footOffsetTop + footerHeight;
    let scrollbarYHeight = Math.max(0, footOffsetTop - bodyOffsetTop);
    return {
      bodyHeight,
      bodyOffsetTop,
      componentHeight,
      contentHeight,
      footOffsetTop,
      scrollbarXOffsetTop,
      scrollbarYHeight,
      visibleRowsHeight,
    };
  }

  let tableHeightsSelector = shallowEqualSelector(
    [
      function (state) {
        return state.elementHeights;
      },
      function (state) {
        return state.tableSize.ownerHeight;
      },
      function (state) {
        return roughHeightsSelector(state).reservedHeight;
      },
      function (state) {
        return state.scrollContentHeight;
      },
      scrollbarsVisible$1,
      function (state) {
        return state.tableSize.useMaxHeight;
      },
      function (state) {
        return state.scrollbarXHeight;
      },
    ],
    tableHeights
  );

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
    let rowRange = calculateRenderedRowRange(state, scrollAnchor);
    let rowSettings = state.rowSettings,
      scrollContentHeight = state.scrollContentHeight;
    let rowsCount = rowSettings.rowsCount;

    let _tableHeightsSelector = tableHeightsSelector(state),
      bodyHeight = _tableHeightsSelector.bodyHeight;

    let maxScrollY = scrollContentHeight - bodyHeight;
    let firstRowOffset; // NOTE (jordan) This handles #115 where resizing the viewport may
    // leave only a subset of rows shown, but no scrollbar to scroll up to the first rows.

    if (maxScrollY === 0) {
      if (rowRange.firstViewportIdx > 0) {
        rowRange = calculateRenderedRowRange(state, {
          firstOffset: 0,
          lastIndex: rowsCount - 1,
        });
      }

      firstRowOffset = 0;
    } else {
      firstRowOffset = rowRange.firstOffset;
    }

    let firstRowIndex = rowRange.firstViewportIdx;
    let endRowIndex = rowRange.endViewportIdx;
    computeRenderedRowOffsets(state, rowRange, state.scrolling);
    let scrollY = 0;

    if (rowsCount > 0) {
      scrollY = state.rowOffsets[rowRange.firstViewportIdx] - firstRowOffset;
    }

    scrollY = clamp_1(scrollY, 0, maxScrollY);

    _extends(state, {
      firstRowIndex,
      firstRowOffset,
      endRowIndex,
      maxScrollY,
      scrollY,
    });
  }
  /**
   * Determine the range of rows to render (buffer and viewport)
   * The leading and trailing buffer is based on a fixed count,
   * while the viewport rows are based on their height and the viewport height
   * We use the scrollAnchor to determine what either the first or last row
   * will be, as well as the offset.
   *
   * @param {!Object} state
   * @param {{
   *   firstIndex?: number,
   *   firstOffset: number,
   *   lastIndex: number,
   * }} scrollAnchor
   * @return {{
   *   endBufferIdx: number,
   *   endViewportIdx: number,
   *   firstBufferIdx: number,
   *   firstOffset: number,
   *   firstViewportIdx: number,
   * }}
   * @private
   */

  function calculateRenderedRowRange(state, scrollAnchor) {
    let _roughHeightsSelector = roughHeightsSelector(state),
      bufferRowCount = _roughHeightsSelector.bufferRowCount,
      maxAvailableHeight = _roughHeightsSelector.maxAvailableHeight;

    let rowsCount = state.rowSettings.rowsCount;

    if (rowsCount === 0) {
      return {
        endBufferIdx: 0,
        endViewportIdx: 0,
        firstBufferIdx: 0,
        firstOffset: 0,
        firstViewportIdx: 0,
      };
    } // If our first or last index is greater than our rowsCount,
    // treat it as if the last row is at the bottom of the viewport

    let firstIndex = scrollAnchor.firstIndex,
      firstOffset = scrollAnchor.firstOffset,
      lastIndex = scrollAnchor.lastIndex;

    if (firstIndex >= rowsCount || lastIndex >= rowsCount) {
      lastIndex = rowsCount - 1;
    } // Walk the viewport until filled with rows
    // If lastIndex is set, walk backward so that row is the last in the viewport

    let step = 1;
    let startIdx = firstIndex;
    let totalHeight = firstOffset;

    if (lastIndex !== undefined) {
      step = -1;
      startIdx = lastIndex;
      totalHeight = 0;
    } // Loop to walk the viewport until we've touched enough rows to fill its height

    let rowIdx = startIdx;
    let endIdx = rowIdx;

    while (
      rowIdx < rowsCount &&
      rowIdx >= 0 &&
      totalHeight < maxAvailableHeight
    ) {
      totalHeight += updateRowHeight(state, rowIdx);
      endIdx = rowIdx;
      rowIdx += step;
    }
    /* Handle the case where rows have shrunk and there's not enough content
       between the start scroll anchor and the end of the table to fill the available space.
       In this case process earlier rows as needed and act as if we've scrolled to the last row.
     */

    let forceScrollToLastRow = false;

    if (
      totalHeight < maxAvailableHeight &&
      rowIdx === rowsCount &&
      lastIndex === undefined
    ) {
      forceScrollToLastRow = true;
      rowIdx = firstIndex - 1;

      while (rowIdx >= 0 && totalHeight < maxAvailableHeight) {
        totalHeight += updateRowHeight(state, rowIdx);
        startIdx = rowIdx;
        --rowIdx;
      }
    } // Loop to walk the leading buffer

    let firstViewportIdx = Math.min(startIdx, endIdx);
    let firstBufferIdx = Math.max(firstViewportIdx - bufferRowCount, 0);

    for (rowIdx = firstBufferIdx; rowIdx < firstViewportIdx; rowIdx++) {
      updateRowHeight(state, rowIdx);
    } // Loop to walk the trailing buffer

    let endViewportIdx = Math.max(startIdx, endIdx) + 1;
    let endBufferIdx = Math.min(endViewportIdx + bufferRowCount, rowsCount);

    for (rowIdx = endViewportIdx; rowIdx < endBufferIdx; rowIdx++) {
      updateRowHeight(state, rowIdx);
    }

    let _scrollbarsVisibleSel = scrollbarsVisible$1(state),
      availableHeight = _scrollbarsVisibleSel.availableHeight;

    if (lastIndex !== undefined || forceScrollToLastRow) {
      // Calculate offset needed to position last row at bottom of viewport
      // This should be negative and represent how far the first row needs to be offscreen
      // NOTE (jordan): The first offset should always be 0 when lastIndex is defined
      // since we don't currently support scrolling the last row into view with an offset.
      firstOffset = firstOffset + Math.min(availableHeight - totalHeight, 0); // Handle a case where the offset puts the first row fully offscreen
      // This can happen if availableHeight & maxAvailableHeight are different

      let _state$getInternal = state.getInternal(),
        storedHeights = _state$getInternal.storedHeights;

      if (-1 * firstOffset >= storedHeights[firstViewportIdx]) {
        firstViewportIdx += 1;
        firstOffset += storedHeights[firstViewportIdx];
      }
    }

    return {
      endBufferIdx,
      endViewportIdx,
      firstBufferIdx,
      firstOffset,
      firstViewportIdx,
    };
  }
  /**
   * Walk the rows to render and compute the height offsets and
   * positions in the row buffer.
   *
   * @param {!Object} state
   * @param {{
   *   endBufferIdx: number,
   *   endViewportIdx: number,
   *   firstBufferIdx: number,
   *   firstViewportIdx: number,
   * }} rowRange
   * @param {boolean} viewportOnly
   * @private
   */

  function computeRenderedRowOffsets(state, rowRange, viewportOnly) {
    let _state$getInternal2 = state.getInternal(),
      rowBufferSet = _state$getInternal2.rowBufferSet,
      rowOffsetIntervalTree = _state$getInternal2.rowOffsetIntervalTree,
      storedHeights = _state$getInternal2.storedHeights;

    let endBufferIdx = rowRange.endBufferIdx,
      endViewportIdx = rowRange.endViewportIdx,
      firstBufferIdx = rowRange.firstBufferIdx,
      firstViewportIdx = rowRange.firstViewportIdx;
    let renderedRowsCount = endBufferIdx - firstBufferIdx;

    if (renderedRowsCount === 0) {
      state.rowOffsets = {};
      state.rows = [];
      return;
    }

    let startIdx = viewportOnly ? firstViewportIdx : firstBufferIdx;
    let endIdx = viewportOnly ? endViewportIdx : endBufferIdx; // output for this function

    let rows = []; // state.rows

    let rowOffsets = {}; // state.rowOffsets
    // incremental way for calculating rowOffset

    let runningOffset = rowOffsetIntervalTree.sumUntil(startIdx); // compute row index and offsets for every rows inside the buffer

    for (let rowIdx = startIdx; rowIdx < endIdx; rowIdx++) {
      // Update the offset for rendering the row
      rowOffsets[rowIdx] = runningOffset;
      runningOffset += storedHeights[rowIdx]; // Get position for the viewport row

      let rowPosition = addRowToBuffer(
        rowIdx,
        rowBufferSet,
        startIdx,
        endIdx,
        renderedRowsCount
      );
      rows[rowPosition] = rowIdx;
    } // now we modify the state with the newly calculated rows and offsets

    state.rows = rows;
    state.rowOffsets = rowOffsets;
  }
  /**
   * Add the row to the buffer set if it doesn't exist.
   * If addition isn't possible due to max buffer size, it'll replace an existing element outside the given range.
   *
   * @param {!number} rowIdx
   * @param {!number} rowBufferSet
   * @param {!number} startRange
   * @param {!number} endRange
   * @param {!number} maxBufferSize
   *
   * @return {?number} the position of the row after being added to the buffer set
   * @private
   */

  function addRowToBuffer(
    rowIdx,
    rowBufferSet,
    startRange,
    endRange,
    maxBufferSize
  ) {
    // Check if row already has a position in the buffer
    let rowPosition = rowBufferSet.getValuePosition(rowIdx); // Request a position in the buffer through eviction of another row

    if (rowPosition === null && rowBufferSet.getSize() >= maxBufferSize) {
      rowPosition = rowBufferSet.replaceFurthestValuePosition(
        startRange,
        endRange - 1, // replaceFurthestValuePosition uses closed interval from startRange to endRange
        rowIdx
      );
    }

    if (rowPosition === null) {
      rowPosition = rowBufferSet.getNewPositionForValue(rowIdx);
    }

    return rowPosition;
  }

  let propTypes = { exports: {} };

  let reactIs = { exports: {} };

  let reactIs_development = {};

  /** @license React v16.13.1
   * react-is.development.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */

  {
    (function () {
      // The Symbol used to tag the ReactElement-like types. If there is no native Symbol
      // nor polyfill, then a plain number is used for performance.
      let hasSymbol = typeof Symbol === 'function' && Symbol.for;
      let REACT_ELEMENT_TYPE = hasSymbol ? Symbol.for('react.element') : 0xeac7;
      let REACT_PORTAL_TYPE = hasSymbol ? Symbol.for('react.portal') : 0xeaca;
      let REACT_FRAGMENT_TYPE = hasSymbol
        ? Symbol.for('react.fragment')
        : 0xeacb;
      let REACT_STRICT_MODE_TYPE = hasSymbol
        ? Symbol.for('react.strict_mode')
        : 0xeacc;
      let REACT_PROFILER_TYPE = hasSymbol
        ? Symbol.for('react.profiler')
        : 0xead2;
      let REACT_PROVIDER_TYPE = hasSymbol
        ? Symbol.for('react.provider')
        : 0xeacd;
      let REACT_CONTEXT_TYPE = hasSymbol ? Symbol.for('react.context') : 0xeace; // TODO: We don't use AsyncMode or ConcurrentMode anymore. They were temporary
      // (unstable) APIs that have been removed. Can we remove the symbols?

      let REACT_ASYNC_MODE_TYPE = hasSymbol
        ? Symbol.for('react.async_mode')
        : 0xeacf;
      let REACT_CONCURRENT_MODE_TYPE = hasSymbol
        ? Symbol.for('react.concurrent_mode')
        : 0xeacf;
      let REACT_FORWARD_REF_TYPE = hasSymbol
        ? Symbol.for('react.forward_ref')
        : 0xead0;
      let REACT_SUSPENSE_TYPE = hasSymbol
        ? Symbol.for('react.suspense')
        : 0xead1;
      let REACT_SUSPENSE_LIST_TYPE = hasSymbol
        ? Symbol.for('react.suspense_list')
        : 0xead8;
      let REACT_MEMO_TYPE = hasSymbol ? Symbol.for('react.memo') : 0xead3;
      let REACT_LAZY_TYPE = hasSymbol ? Symbol.for('react.lazy') : 0xead4;
      let REACT_BLOCK_TYPE = hasSymbol ? Symbol.for('react.block') : 0xead9;
      let REACT_FUNDAMENTAL_TYPE = hasSymbol
        ? Symbol.for('react.fundamental')
        : 0xead5;
      let REACT_RESPONDER_TYPE = hasSymbol
        ? Symbol.for('react.responder')
        : 0xead6;
      let REACT_SCOPE_TYPE = hasSymbol ? Symbol.for('react.scope') : 0xead7;

      function isValidElementType(type) {
        return (
          typeof type === 'string' ||
          typeof type === 'function' || // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
          type === REACT_FRAGMENT_TYPE ||
          type === REACT_CONCURRENT_MODE_TYPE ||
          type === REACT_PROFILER_TYPE ||
          type === REACT_STRICT_MODE_TYPE ||
          type === REACT_SUSPENSE_TYPE ||
          type === REACT_SUSPENSE_LIST_TYPE ||
          (typeof type === 'object' &&
            type !== null &&
            (type.$$typeof === REACT_LAZY_TYPE ||
              type.$$typeof === REACT_MEMO_TYPE ||
              type.$$typeof === REACT_PROVIDER_TYPE ||
              type.$$typeof === REACT_CONTEXT_TYPE ||
              type.$$typeof === REACT_FORWARD_REF_TYPE ||
              type.$$typeof === REACT_FUNDAMENTAL_TYPE ||
              type.$$typeof === REACT_RESPONDER_TYPE ||
              type.$$typeof === REACT_SCOPE_TYPE ||
              type.$$typeof === REACT_BLOCK_TYPE))
        );
      }

      function typeOf(object) {
        if (typeof object === 'object' && object !== null) {
          let $$typeof = object.$$typeof;

          switch ($$typeof) {
            case REACT_ELEMENT_TYPE:
              var type = object.type;

              switch (type) {
                case REACT_ASYNC_MODE_TYPE:
                case REACT_CONCURRENT_MODE_TYPE:
                case REACT_FRAGMENT_TYPE:
                case REACT_PROFILER_TYPE:
                case REACT_STRICT_MODE_TYPE:
                case REACT_SUSPENSE_TYPE:
                  return type;

                default:
                  var $$typeofType = type && type.$$typeof;

                  switch ($$typeofType) {
                    case REACT_CONTEXT_TYPE:
                    case REACT_FORWARD_REF_TYPE:
                    case REACT_LAZY_TYPE:
                    case REACT_MEMO_TYPE:
                    case REACT_PROVIDER_TYPE:
                      return $$typeofType;

                    default:
                      return $$typeof;
                  }
              }

            case REACT_PORTAL_TYPE:
              return $$typeof;
          }
        }

        return undefined;
      } // AsyncMode is deprecated along with isAsyncMode

      let AsyncMode = REACT_ASYNC_MODE_TYPE;
      let ConcurrentMode = REACT_CONCURRENT_MODE_TYPE;
      let ContextConsumer = REACT_CONTEXT_TYPE;
      let ContextProvider = REACT_PROVIDER_TYPE;
      let Element = REACT_ELEMENT_TYPE;
      let ForwardRef = REACT_FORWARD_REF_TYPE;
      let Fragment = REACT_FRAGMENT_TYPE;
      let Lazy = REACT_LAZY_TYPE;
      let Memo = REACT_MEMO_TYPE;
      let Portal = REACT_PORTAL_TYPE;
      let Profiler = REACT_PROFILER_TYPE;
      let StrictMode = REACT_STRICT_MODE_TYPE;
      let Suspense = REACT_SUSPENSE_TYPE;
      let hasWarnedAboutDeprecatedIsAsyncMode = false; // AsyncMode should be deprecated

      function isAsyncMode(object) {
        {
          if (!hasWarnedAboutDeprecatedIsAsyncMode) {
            hasWarnedAboutDeprecatedIsAsyncMode = true; // Using console['warn'] to evade Babel and ESLint

            console['warn'](
              'The ReactIs.isAsyncMode() alias has been deprecated, ' +
                'and will be removed in React 17+. Update your code to use ' +
                'ReactIs.isConcurrentMode() instead. It has the exact same API.'
            );
          }
        }

        return (
          isConcurrentMode(object) || typeOf(object) === REACT_ASYNC_MODE_TYPE
        );
      }
      function isConcurrentMode(object) {
        return typeOf(object) === REACT_CONCURRENT_MODE_TYPE;
      }
      function isContextConsumer(object) {
        return typeOf(object) === REACT_CONTEXT_TYPE;
      }
      function isContextProvider(object) {
        return typeOf(object) === REACT_PROVIDER_TYPE;
      }
      function isElement(object) {
        return (
          typeof object === 'object' &&
          object !== null &&
          object.$$typeof === REACT_ELEMENT_TYPE
        );
      }
      function isForwardRef(object) {
        return typeOf(object) === REACT_FORWARD_REF_TYPE;
      }
      function isFragment(object) {
        return typeOf(object) === REACT_FRAGMENT_TYPE;
      }
      function isLazy(object) {
        return typeOf(object) === REACT_LAZY_TYPE;
      }
      function isMemo(object) {
        return typeOf(object) === REACT_MEMO_TYPE;
      }
      function isPortal(object) {
        return typeOf(object) === REACT_PORTAL_TYPE;
      }
      function isProfiler(object) {
        return typeOf(object) === REACT_PROFILER_TYPE;
      }
      function isStrictMode(object) {
        return typeOf(object) === REACT_STRICT_MODE_TYPE;
      }
      function isSuspense(object) {
        return typeOf(object) === REACT_SUSPENSE_TYPE;
      }

      reactIs_development.AsyncMode = AsyncMode;
      reactIs_development.ConcurrentMode = ConcurrentMode;
      reactIs_development.ContextConsumer = ContextConsumer;
      reactIs_development.ContextProvider = ContextProvider;
      reactIs_development.Element = Element;
      reactIs_development.ForwardRef = ForwardRef;
      reactIs_development.Fragment = Fragment;
      reactIs_development.Lazy = Lazy;
      reactIs_development.Memo = Memo;
      reactIs_development.Portal = Portal;
      reactIs_development.Profiler = Profiler;
      reactIs_development.StrictMode = StrictMode;
      reactIs_development.Suspense = Suspense;
      reactIs_development.isAsyncMode = isAsyncMode;
      reactIs_development.isConcurrentMode = isConcurrentMode;
      reactIs_development.isContextConsumer = isContextConsumer;
      reactIs_development.isContextProvider = isContextProvider;
      reactIs_development.isElement = isElement;
      reactIs_development.isForwardRef = isForwardRef;
      reactIs_development.isFragment = isFragment;
      reactIs_development.isLazy = isLazy;
      reactIs_development.isMemo = isMemo;
      reactIs_development.isPortal = isPortal;
      reactIs_development.isProfiler = isProfiler;
      reactIs_development.isStrictMode = isStrictMode;
      reactIs_development.isSuspense = isSuspense;
      reactIs_development.isValidElementType = isValidElementType;
      reactIs_development.typeOf = typeOf;
    })();
  }

  {
    reactIs.exports = reactIs_development;
  }

  /*
  object-assign
  (c) Sindre Sorhus
  @license MIT
  */
  /* eslint-disable no-unused-vars */
  let getOwnPropertySymbols = Object.getOwnPropertySymbols;
  let hasOwnProperty$1 = Object.prototype.hasOwnProperty;
  let propIsEnumerable = Object.prototype.propertyIsEnumerable;

  function toObject(val) {
    if (val === null || val === undefined) {
      throw new TypeError(
        'Object.assign cannot be called with null or undefined'
      );
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
      let test1 = new String('abc'); // eslint-disable-line no-new-wrappers
      test1[5] = 'de';
      if (Object.getOwnPropertyNames(test1)[0] === '5') {
        return false;
      }

      // https://bugs.chromium.org/p/v8/issues/detail?id=3056
      let test2 = {};
      for (let i = 0; i < 10; i++) {
        test2['_' + String.fromCharCode(i)] = i;
      }
      let order2 = Object.getOwnPropertyNames(test2).map(function (n) {
        return test2[n];
      });
      if (order2.join('') !== '0123456789') {
        return false;
      }

      // https://bugs.chromium.org/p/v8/issues/detail?id=3056
      let test3 = {};
      'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
        test3[letter] = letter;
      });
      if (
        Object.keys(Object.assign({}, test3)).join('') !==
        'abcdefghijklmnopqrst'
      ) {
        return false;
      }

      return true;
    } catch (err) {
      // We don't expect any of the above to throw, but better to be safe.
      return false;
    }
  }

  let objectAssign = shouldUseNative()
    ? Object.assign
    : function (target, source) {
        let from;
        let to = toObject(target);
        let symbols;

        for (let s = 1; s < arguments.length; s++) {
          from = Object(arguments[s]);

          for (let key in from) {
            if (hasOwnProperty$1.call(from, key)) {
              to[key] = from[key];
            }
          }

          if (getOwnPropertySymbols) {
            symbols = getOwnPropertySymbols(from);
            for (let i = 0; i < symbols.length; i++) {
              if (propIsEnumerable.call(from, symbols[i])) {
                to[symbols[i]] = from[symbols[i]];
              }
            }
          }
        }

        return to;
      };

  /**
   * Copyright (c) 2013-present, Facebook, Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */

  let ReactPropTypesSecret$2 = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

  let ReactPropTypesSecret_1 = ReactPropTypesSecret$2;

  let has$2 = Function.call.bind(Object.prototype.hasOwnProperty);

  /**
   * Copyright (c) 2013-present, Facebook, Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */

  let printWarning$1 = function () {};

  {
    var ReactPropTypesSecret$1 = ReactPropTypesSecret_1;
    var loggedTypeFailures = {};
    var has$1 = has$2;

    printWarning$1 = function (text) {
      let message = 'Warning: ' + text;
      if (typeof console !== 'undefined') {
        console.error(message);
      }
      try {
        // --- Welcome to debugging React ---
        // This error was thrown as a convenience so that you can use this stack
        // to find the callsite that caused this warning to fire.
        throw new Error(message);
      } catch (x) {
        /**/
      }
    };
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
  function checkPropTypes$1(
    typeSpecs,
    values,
    location,
    componentName,
    getStack
  ) {
    {
      for (let typeSpecName in typeSpecs) {
        if (has$1(typeSpecs, typeSpecName)) {
          var error;
          // Prop type validation may throw. In case they do, we don't want to
          // fail the render phase where it didn't fail before. So we log it.
          // After these have been cleaned up, we'll let them throw.
          try {
            // This is intentionally an invariant that gets caught. It's the same
            // behavior as without this statement except with a better message.
            if (typeof typeSpecs[typeSpecName] !== 'function') {
              let err = Error(
                (componentName || 'React class') +
                  ': ' +
                  location +
                  ' type `' +
                  typeSpecName +
                  '` is invalid; ' +
                  'it must be a function, usually from the `prop-types` package, but received `' +
                  typeof typeSpecs[typeSpecName] +
                  '`.' +
                  'This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.'
              );
              err.name = 'Invariant Violation';
              throw err;
            }
            error = typeSpecs[typeSpecName](
              values,
              typeSpecName,
              componentName,
              location,
              null,
              ReactPropTypesSecret$1
            );
          } catch (ex) {
            error = ex;
          }
          if (error && !(error instanceof Error)) {
            printWarning$1(
              (componentName || 'React class') +
                ': type specification of ' +
                location +
                ' `' +
                typeSpecName +
                '` is invalid; the type checker ' +
                'function must return `null` or an `Error` but returned a ' +
                typeof error +
                '. ' +
                'You may have forgotten to pass an argument to the type checker ' +
                'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' +
                'shape all require an argument).'
            );
          }
          if (
            error instanceof Error &&
            !(error.message in loggedTypeFailures)
          ) {
            // Only monitor this failure once because there tends to be a lot of the
            // same error.
            loggedTypeFailures[error.message] = true;

            let stack = getStack ? getStack() : '';

            printWarning$1(
              'Failed ' +
                location +
                ' type: ' +
                error.message +
                (stack != null ? stack : '')
            );
          }
        }
      }
    }
  }

  /**
   * Resets warning cache when testing.
   *
   * @private
   */
  checkPropTypes$1.resetWarningCache = function () {
    {
      loggedTypeFailures = {};
    }
  };

  let checkPropTypes_1 = checkPropTypes$1;

  /**
   * Copyright (c) 2013-present, Facebook, Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */

  let ReactIs$1 = reactIs.exports;
  let assign = objectAssign;

  let ReactPropTypesSecret = ReactPropTypesSecret_1;
  let has = has$2;
  let checkPropTypes = checkPropTypes_1;

  let printWarning = function () {};

  {
    printWarning = function (text) {
      let message = 'Warning: ' + text;
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
  }

  function emptyFunctionThatReturnsNull() {
    return null;
  }

  let factoryWithTypeCheckers = function (isValidElement, throwOnDirectAccess) {
    /* global Symbol */
    let ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
    let FAUX_ITERATOR_SYMBOL = '@@iterator'; // Before Symbol spec.

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
      let iteratorFn =
        maybeIterable &&
        ((ITERATOR_SYMBOL && maybeIterable[ITERATOR_SYMBOL]) ||
          maybeIterable[FAUX_ITERATOR_SYMBOL]);
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

    let ANONYMOUS = '<<anonymous>>';

    // Important!
    // Keep this list in sync with production version in `./factoryWithThrowingShims.js`.
    let ReactPropTypes = {
      array: createPrimitiveTypeChecker('array'),
      bigint: createPrimitiveTypeChecker('bigint'),
      bool: createPrimitiveTypeChecker('boolean'),
      func: createPrimitiveTypeChecker('function'),
      number: createPrimitiveTypeChecker('number'),
      object: createPrimitiveTypeChecker('object'),
      string: createPrimitiveTypeChecker('string'),
      symbol: createPrimitiveTypeChecker('symbol'),

      any: createAnyTypeChecker(),
      arrayOf: createArrayOfTypeChecker,
      element: createElementTypeChecker(),
      elementType: createElementTypeTypeChecker(),
      instanceOf: createInstanceTypeChecker,
      node: createNodeChecker(),
      objectOf: createObjectOfTypeChecker,
      oneOf: createEnumTypeChecker,
      oneOfType: createUnionTypeChecker,
      shape: createShapeTypeChecker,
      exact: createStrictShapeTypeChecker,
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
    function PropTypeError(message, data) {
      this.message = message;
      this.data = data && typeof data === 'object' ? data : {};
      this.stack = '';
    }
    // Make `instanceof Error` still work for returned errors.
    PropTypeError.prototype = Error.prototype;

    function createChainableTypeChecker(validate) {
      {
        var manualPropTypeCallCache = {};
        var manualPropTypeWarningCount = 0;
      }
      function checkType(
        isRequired,
        props,
        propName,
        componentName,
        location,
        propFullName,
        secret
      ) {
        componentName = componentName || ANONYMOUS;
        propFullName = propFullName || propName;

        if (secret !== ReactPropTypesSecret) {
          if (throwOnDirectAccess) {
            // New behavior only for users of `prop-types` package
            let err = new Error(
              'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
                'Use `PropTypes.checkPropTypes()` to call them. ' +
                'Read more at http://fb.me/use-check-prop-types'
            );
            err.name = 'Invariant Violation';
            throw err;
          } else if (typeof console !== 'undefined') {
            // Old behavior for people using React.PropTypes
            let cacheKey = componentName + ':' + propName;
            if (
              !manualPropTypeCallCache[cacheKey] &&
              // Avoid spamming the console because they are often not actionable except for lib authors
              manualPropTypeWarningCount < 3
            ) {
              printWarning(
                'You are manually calling a React.PropTypes validation ' +
                  'function for the `' +
                  propFullName +
                  '` prop on `' +
                  componentName +
                  '`. This is deprecated ' +
                  'and will throw in the standalone `prop-types` package. ' +
                  'You may be seeing this warning due to a third-party PropTypes ' +
                  'library. See https://fb.me/react-warning-dont-call-proptypes ' +
                  'for details.'
              );
              manualPropTypeCallCache[cacheKey] = true;
              manualPropTypeWarningCount++;
            }
          }
        }
        if (props[propName] == null) {
          if (isRequired) {
            if (props[propName] === null) {
              return new PropTypeError(
                'The ' +
                  location +
                  ' `' +
                  propFullName +
                  '` is marked as required ' +
                  ('in `' + componentName + '`, but its value is `null`.')
              );
            }
            return new PropTypeError(
              'The ' +
                location +
                ' `' +
                propFullName +
                '` is marked as required in ' +
                ('`' + componentName + '`, but its value is `undefined`.')
            );
          }
          return null;
        } else {
          return validate(
            props,
            propName,
            componentName,
            location,
            propFullName
          );
        }
      }

      let chainedCheckType = checkType.bind(null, false);
      chainedCheckType.isRequired = checkType.bind(null, true);

      return chainedCheckType;
    }

    function createPrimitiveTypeChecker(expectedType) {
      function validate(
        props,
        propName,
        componentName,
        location,
        propFullName,
        secret
      ) {
        let propValue = props[propName];
        let propType = getPropType(propValue);
        if (propType !== expectedType) {
          // `propValue` being instance of, say, date/regexp, pass the 'object'
          // check, but we can offer a more precise error message here rather than
          // 'of type `object`'.
          let preciseType = getPreciseType(propValue);

          return new PropTypeError(
            'Invalid ' +
              location +
              ' `' +
              propFullName +
              '` of type ' +
              ('`' +
                preciseType +
                '` supplied to `' +
                componentName +
                '`, expected ') +
              ('`' + expectedType + '`.'),
            { expectedType }
          );
        }
        return null;
      }
      return createChainableTypeChecker(validate);
    }

    function createAnyTypeChecker() {
      return createChainableTypeChecker(emptyFunctionThatReturnsNull);
    }

    function createArrayOfTypeChecker(typeChecker) {
      function validate(
        props,
        propName,
        componentName,
        location,
        propFullName
      ) {
        if (typeof typeChecker !== 'function') {
          return new PropTypeError(
            'Property `' +
              propFullName +
              '` of component `' +
              componentName +
              '` has invalid PropType notation inside arrayOf.'
          );
        }
        let propValue = props[propName];
        if (!Array.isArray(propValue)) {
          let propType = getPropType(propValue);
          return new PropTypeError(
            'Invalid ' +
              location +
              ' `' +
              propFullName +
              '` of type ' +
              ('`' +
                propType +
                '` supplied to `' +
                componentName +
                '`, expected an array.')
          );
        }
        for (let i = 0; i < propValue.length; i++) {
          let error = typeChecker(
            propValue,
            i,
            componentName,
            location,
            propFullName + '[' + i + ']',
            ReactPropTypesSecret
          );
          if (error instanceof Error) {
            return error;
          }
        }
        return null;
      }
      return createChainableTypeChecker(validate);
    }

    function createElementTypeChecker() {
      function validate(
        props,
        propName,
        componentName,
        location,
        propFullName
      ) {
        let propValue = props[propName];
        if (!isValidElement(propValue)) {
          let propType = getPropType(propValue);
          return new PropTypeError(
            'Invalid ' +
              location +
              ' `' +
              propFullName +
              '` of type ' +
              ('`' +
                propType +
                '` supplied to `' +
                componentName +
                '`, expected a single ReactElement.')
          );
        }
        return null;
      }
      return createChainableTypeChecker(validate);
    }

    function createElementTypeTypeChecker() {
      function validate(
        props,
        propName,
        componentName,
        location,
        propFullName
      ) {
        let propValue = props[propName];
        if (!ReactIs$1.isValidElementType(propValue)) {
          let propType = getPropType(propValue);
          return new PropTypeError(
            'Invalid ' +
              location +
              ' `' +
              propFullName +
              '` of type ' +
              ('`' +
                propType +
                '` supplied to `' +
                componentName +
                '`, expected a single ReactElement type.')
          );
        }
        return null;
      }
      return createChainableTypeChecker(validate);
    }

    function createInstanceTypeChecker(expectedClass) {
      function validate(
        props,
        propName,
        componentName,
        location,
        propFullName
      ) {
        if (!(props[propName] instanceof expectedClass)) {
          let expectedClassName = expectedClass.name || ANONYMOUS;
          let actualClassName = getClassName(props[propName]);
          return new PropTypeError(
            'Invalid ' +
              location +
              ' `' +
              propFullName +
              '` of type ' +
              ('`' +
                actualClassName +
                '` supplied to `' +
                componentName +
                '`, expected ') +
              ('instance of `' + expectedClassName + '`.')
          );
        }
        return null;
      }
      return createChainableTypeChecker(validate);
    }

    function createEnumTypeChecker(expectedValues) {
      if (!Array.isArray(expectedValues)) {
        {
          if (arguments.length > 1) {
            printWarning(
              'Invalid arguments supplied to oneOf, expected an array, got ' +
                arguments.length +
                ' arguments. ' +
                'A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z]).'
            );
          } else {
            printWarning(
              'Invalid argument supplied to oneOf, expected an array.'
            );
          }
        }
        return emptyFunctionThatReturnsNull;
      }

      function validate(
        props,
        propName,
        componentName,
        location,
        propFullName
      ) {
        let propValue = props[propName];
        for (let i = 0; i < expectedValues.length; i++) {
          if (is(propValue, expectedValues[i])) {
            return null;
          }
        }

        let valuesString = JSON.stringify(
          expectedValues,
          function replacer(key, value) {
            let type = getPreciseType(value);
            if (type === 'symbol') {
              return String(value);
            }
            return value;
          }
        );
        return new PropTypeError(
          'Invalid ' +
            location +
            ' `' +
            propFullName +
            '` of value `' +
            String(propValue) +
            '` ' +
            ('supplied to `' +
              componentName +
              '`, expected one of ' +
              valuesString +
              '.')
        );
      }
      return createChainableTypeChecker(validate);
    }

    function createObjectOfTypeChecker(typeChecker) {
      function validate(
        props,
        propName,
        componentName,
        location,
        propFullName
      ) {
        if (typeof typeChecker !== 'function') {
          return new PropTypeError(
            'Property `' +
              propFullName +
              '` of component `' +
              componentName +
              '` has invalid PropType notation inside objectOf.'
          );
        }
        let propValue = props[propName];
        let propType = getPropType(propValue);
        if (propType !== 'object') {
          return new PropTypeError(
            'Invalid ' +
              location +
              ' `' +
              propFullName +
              '` of type ' +
              ('`' +
                propType +
                '` supplied to `' +
                componentName +
                '`, expected an object.')
          );
        }
        for (let key in propValue) {
          if (has(propValue, key)) {
            let error = typeChecker(
              propValue,
              key,
              componentName,
              location,
              propFullName + '.' + key,
              ReactPropTypesSecret
            );
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
        printWarning(
          'Invalid argument supplied to oneOfType, expected an instance of array.'
        );
        return emptyFunctionThatReturnsNull;
      }

      for (let i = 0; i < arrayOfTypeCheckers.length; i++) {
        let checker = arrayOfTypeCheckers[i];
        if (typeof checker !== 'function') {
          printWarning(
            'Invalid argument supplied to oneOfType. Expected an array of check functions, but ' +
              'received ' +
              getPostfixForTypeWarning(checker) +
              ' at index ' +
              i +
              '.'
          );
          return emptyFunctionThatReturnsNull;
        }
      }

      function validate(
        props,
        propName,
        componentName,
        location,
        propFullName
      ) {
        let expectedTypes = [];
        for (let i = 0; i < arrayOfTypeCheckers.length; i++) {
          let checker = arrayOfTypeCheckers[i];
          let checkerResult = checker(
            props,
            propName,
            componentName,
            location,
            propFullName,
            ReactPropTypesSecret
          );
          if (checkerResult == null) {
            return null;
          }
          if (checkerResult.data && has(checkerResult.data, 'expectedType')) {
            expectedTypes.push(checkerResult.data.expectedType);
          }
        }
        let expectedTypesMessage =
          expectedTypes.length > 0
            ? ', expected one of type [' + expectedTypes.join(', ') + ']'
            : '';
        return new PropTypeError(
          'Invalid ' +
            location +
            ' `' +
            propFullName +
            '` supplied to ' +
            ('`' + componentName + '`' + expectedTypesMessage + '.')
        );
      }
      return createChainableTypeChecker(validate);
    }

    function createNodeChecker() {
      function validate(
        props,
        propName,
        componentName,
        location,
        propFullName
      ) {
        if (!isNode(props[propName])) {
          return new PropTypeError(
            'Invalid ' +
              location +
              ' `' +
              propFullName +
              '` supplied to ' +
              ('`' + componentName + '`, expected a ReactNode.')
          );
        }
        return null;
      }
      return createChainableTypeChecker(validate);
    }

    function invalidValidatorError(
      componentName,
      location,
      propFullName,
      key,
      type
    ) {
      return new PropTypeError(
        (componentName || 'React class') +
          ': ' +
          location +
          ' type `' +
          propFullName +
          '.' +
          key +
          '` is invalid; ' +
          'it must be a function, usually from the `prop-types` package, but received `' +
          type +
          '`.'
      );
    }

    function createShapeTypeChecker(shapeTypes) {
      function validate(
        props,
        propName,
        componentName,
        location,
        propFullName
      ) {
        let propValue = props[propName];
        let propType = getPropType(propValue);
        if (propType !== 'object') {
          return new PropTypeError(
            'Invalid ' +
              location +
              ' `' +
              propFullName +
              '` of type `' +
              propType +
              '` ' +
              ('supplied to `' + componentName + '`, expected `object`.')
          );
        }
        for (let key in shapeTypes) {
          let checker = shapeTypes[key];
          if (typeof checker !== 'function') {
            return invalidValidatorError(
              componentName,
              location,
              propFullName,
              key,
              getPreciseType(checker)
            );
          }
          let error = checker(
            propValue,
            key,
            componentName,
            location,
            propFullName + '.' + key,
            ReactPropTypesSecret
          );
          if (error) {
            return error;
          }
        }
        return null;
      }
      return createChainableTypeChecker(validate);
    }

    function createStrictShapeTypeChecker(shapeTypes) {
      function validate(
        props,
        propName,
        componentName,
        location,
        propFullName
      ) {
        let propValue = props[propName];
        let propType = getPropType(propValue);
        if (propType !== 'object') {
          return new PropTypeError(
            'Invalid ' +
              location +
              ' `' +
              propFullName +
              '` of type `' +
              propType +
              '` ' +
              ('supplied to `' + componentName + '`, expected `object`.')
          );
        }
        // We need to check all keys in case some are required but missing from props.
        let allKeys = assign({}, props[propName], shapeTypes);
        for (let key in allKeys) {
          let checker = shapeTypes[key];
          if (has(shapeTypes, key) && typeof checker !== 'function') {
            return invalidValidatorError(
              componentName,
              location,
              propFullName,
              key,
              getPreciseType(checker)
            );
          }
          if (!checker) {
            return new PropTypeError(
              'Invalid ' +
                location +
                ' `' +
                propFullName +
                '` key `' +
                key +
                '` supplied to `' +
                componentName +
                '`.' +
                '\nBad object: ' +
                JSON.stringify(props[propName], null, '  ') +
                '\nValid keys: ' +
                JSON.stringify(Object.keys(shapeTypes), null, '  ')
            );
          }
          let error = checker(
            propValue,
            key,
            componentName,
            location,
            propFullName + '.' + key,
            ReactPropTypesSecret
          );
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
            let iterator = iteratorFn.call(propValue);
            let step;
            if (iteratorFn !== propValue.entries) {
              while (!(step = iterator.next()).done) {
                if (!isNode(step.value)) {
                  return false;
                }
              }
            } else {
              // Iterator will provide entry [k,v] tuples rather than values.
              while (!(step = iterator.next()).done) {
                let entry = step.value;
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

      // falsy value can't be a Symbol
      if (!propValue) {
        return false;
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
      let propType = typeof propValue;
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
      let propType = getPropType(propValue);
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
      let type = getPreciseType(value);
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
    ReactPropTypes.resetWarningCache = checkPropTypes.resetWarningCache;
    ReactPropTypes.PropTypes = ReactPropTypes;

    return ReactPropTypes;
  };

  /**
   * Copyright (c) 2013-present, Facebook, Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */

  {
    let ReactIs = reactIs.exports;

    // By explicitly using `prop-types` you are opting into new development behavior.
    // http://fb.me/prop-types-in-prod
    let throwOnDirectAccess = true;
    propTypes.exports = factoryWithTypeCheckers(
      ReactIs.isElement,
      throwOnDirectAccess
    );
  }

  let PropTypes = propTypes.exports;

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
  let slashReplaceRegex = /\//g;
  let cache = {};

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
    let classNamesArray;

    if (_typeof(classNames) == 'object') {
      classNamesArray = Object.keys(classNames).filter(function (className) {
        return classNames[className];
      });
    } else {
      classNamesArray = Array.prototype.slice.call(arguments);
    }

    return classNamesArray.map(getClassName).join(' ');
  }

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
  let Keys = {
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
    NUMPAD_9: 105,
  };

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
  let _populated = false; // Browsers

  let _ie, _firefox, _opera, _webkit, _chrome; // Actual IE browser for compatibility mode

  let _ie_real_version; // Platforms

  let _osx, _windows, _linux, _android; // Architectures

  let _win64; // Devices

  let _iphone, _ipad, _native;

  let _mobile;

  function _populate() {
    if (_populated) {
      return;
    }

    _populated = true; // To work around buggy JS libraries that can't handle multi-digit
    // version numbers, Opera 10's user agent string claims it's Opera
    // 9, then later includes a Version/X.Y field:
    //
    // Opera/9.80 (foo) Presto/2.2.15 Version/10.10

    let uas = navigator.userAgent;
    let agent =
      /(?:MSIE.(\d+\.\d+))|(?:(?:Firefox|GranParadiso|Iceweasel).(\d+\.\d+))|(?:Opera(?:.+Version.|.)(\d+\.\d+))|(?:AppleWebKit.(\d+(?:\.\d+)?))|(?:Trident\/\d+\.\d+.*rv:(\d+\.\d+))/.exec(
        uas
      );
    let os = /(Mac OS X)|(Windows)|(Linux)/.exec(uas);
    _iphone = /\b(iPhone|iP[ao]d)/.exec(uas);
    _ipad = /\b(iP[ao]d)/.exec(uas);
    _android = /Android/i.exec(uas);
    _native = /FBAN\/\w+;/i.exec(uas);
    _mobile = /Mobile/i.exec(uas); // Note that the IE team blog would have you believe you should be checking
    // for 'Win64; x64'.  But MSDN then reveals that you can actually be coming
    // from either x64 or ia64;  so ultimately, you should just check for Win64
    // as in indicator of whether you're in 64-bit IE.  32-bit IE on 64-bit
    // Windows will send 'WOW64' instead.

    _win64 = !!/Win64/.exec(uas);

    if (agent) {
      _ie = agent[1]
        ? parseFloat(agent[1])
        : agent[5]
        ? parseFloat(agent[5])
        : NaN; // IE compatibility mode

      if (_ie && document && document.documentMode) {
        _ie = document.documentMode;
      } // grab the "true" ie version from the trident token if available

      let trident = /(?:Trident\/(\d+.\d+))/.exec(uas);
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
        let ver = /(?:Mac OS X (\d+(?:[._]\d+)?))/.exec(uas);
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
    },
  };

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

  let canUseDOM$1 = !!(
    typeof window !== 'undefined' &&
    window.document &&
    window.document.createElement
  );
  /**
   * Simple, lightweight module assisting with the detection and context of
   * Worker. Helps avoid circular dependencies and allows code to reason about
   * whether or not they are in a Worker, even if they never include the main
   * `ReactWorker` dependency.
   */

  let ExecutionEnvironment = {
    canUseDOM: canUseDOM$1,
    canUseWorkers: typeof Worker !== 'undefined',
    canUseEventListeners:
      canUseDOM$1 && !!(window.addEventListener || window.attachEvent),
    canUseViewport: canUseDOM$1 && !!window.screen,
    isInWorker: !canUseDOM$1, // For now, this is true - might change in the future.
  };

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
  let useHasFeature;

  if (ExecutionEnvironment.canUseDOM) {
    useHasFeature =
      document.implementation &&
      document.implementation.hasFeature && // always returns true in newer browsers as per the standard.
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
    if (
      !ExecutionEnvironment.canUseDOM ||
      (capture && !('addEventListener' in document))
    ) {
      return false;
    }

    let eventName = 'on' + eventNameSuffix;
    let isSupported = eventName in document;

    if (!isSupported) {
      let element = document.createElement('div');
      element.setAttribute(eventName, 'return;');
      isSupported = typeof element[eventName] === 'function';
    }

    if (!isSupported && useHasFeature && eventNameSuffix === 'wheel') {
      // This is the only way to test support for the `wheel` event in IE9+.
      isSupported = document.implementation.hasFeature('Events.wheel', '3.0');
    }

    return isSupported;
  }

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

  let PIXEL_STEP = 10;
  let LINE_HEIGHT = 40;
  let PAGE_HEIGHT = 800;
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

  function normalizeWheel(
    /*object*/
    event
  ) {
    /*object*/
    let sX = 0,
      // spinX, spinY
      sY = 0,
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
    } // side scrolling on FF with DOMMouseScroll

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
    } // Fall-back if spin cannot be determined

    if (pX && !sX) {
      sX = pX < 1 ? -1 : 1;
    }

    if (pY && !sY) {
      sY = pY < 1 ? -1 : 1;
    }

    return {
      spinX: sX,
      spinY: sY,
      pixelX: pX,
      pixelY: pY,
    };
  }
  /**
   * The best combination if you prefer spinX + spinY normalization.  It favors
   * the older DOMMouseScroll for Firefox, as FF does not include wheelDelta with
   * 'wheel' event, making spin speed determination impossible.
   */

  normalizeWheel.getEventType = function () /*string*/
  {
    return UserAgent_DEPRECATED.firefox()
      ? 'DOMMouseScroll'
      : isEventSupported('wheel')
      ? 'wheel'
      : 'mousewheel';
  };

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
  let nativeRequestAnimationFrame =
    globalThisPolyfill.requestAnimationFrame ||
    globalThisPolyfill.webkitRequestAnimationFrame ||
    globalThisPolyfill.mozRequestAnimationFrame ||
    globalThisPolyfill.oRequestAnimationFrame ||
    globalThisPolyfill.msRequestAnimationFrame;

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
  let lastTime = 0;
  /**
   * Here is the native and polyfill version of requestAnimationFrame.
   * Please don't use it directly and use requestAnimationFrame module instead.
   */

  let requestAnimationFrame =
    nativeRequestAnimationFrame ||
    function (callback) {
      let currTime = Date.now();
      let timeDelay = Math.max(0, 16 - (currTime - lastTime));
      lastTime = currTime + timeDelay;
      return globalThisPolyfill.setTimeout(function () {
        callback(Date.now());
      }, timeDelay);
    }; // Works around a rare bug in Safari 6 where the first request is never invoked.

  requestAnimationFrame(emptyFunction);

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

  let ReactWheelHandler = /*#__PURE__*/ (function () {
    /**
     * onWheel is the callback that will be called with right frame rate if
     * any wheel events happened
     * onWheel should is to be called with two arguments: deltaX and deltaY in
     * this order
     */
    function ReactWheelHandler(
      /*function*/
      onWheel,
      /*boolean|function*/
      handleScrollX,
      /*boolean|function*/
      handleScrollY,
      /*?boolean*/
      isRTL,
      /*?boolean*/
      preventDefault,
      /*?boolean*/
      stopPropagation
    ) {
      _classCallCheck$2(this, ReactWheelHandler);

      this._animationFrameID = null;
      this._deltaX = 0;
      this._deltaY = 0;
      this._didWheel = this._didWheel.bind(this);
      this._rootRef = null;

      if (typeof handleScrollX !== 'function') {
        handleScrollX = handleScrollX
          ? emptyFunction.thatReturnsTrue
          : emptyFunction.thatReturnsFalse;
      }

      if (typeof handleScrollY !== 'function') {
        handleScrollY = handleScrollY
          ? emptyFunction.thatReturnsTrue
          : emptyFunction.thatReturnsFalse;
      }

      this._handleScrollX = handleScrollX;
      this._handleScrollY = handleScrollY;
      this._preventDefault = preventDefault;
      this._stopPropagation = stopPropagation;
      this._onWheelCallback = onWheel;
      this.onWheel = this.onWheel.bind(this);
      this._isRTL = isRTL;
    }

    _createClass$2(
      ReactWheelHandler,
      [
        {
          key: 'onWheel',
          value: function onWheel(
            /*object*/
            event
          ) {
            if (this._preventDefault) {
              event.preventDefault();
            }

            let normalizedEvent = normalizeWheel(event); // if shift is held, swap the axis of scrolling.

            if (event.shiftKey && ReactWheelHandler._allowInternalAxesSwap()) {
              normalizedEvent =
                ReactWheelHandler._swapNormalizedWheelAxis(normalizedEvent);
            } else if (!event.shiftKey) {
              normalizedEvent.pixelX *= this._isRTL ? -1 : 1;
            }

            let deltaX = this._deltaX + normalizedEvent.pixelX;
            let deltaY = this._deltaY + normalizedEvent.pixelY;

            let handleScrollX = this._handleScrollX(deltaX, deltaY);

            let handleScrollY = this._handleScrollY(deltaY, deltaX);

            if (!handleScrollX && !handleScrollY) {
              return;
            }

            if (this._rootRef && !this._contains(event.target)) {
              return;
            }

            this._deltaX += handleScrollX ? normalizedEvent.pixelX : 0;
            this._deltaY += handleScrollY ? normalizedEvent.pixelY : 0; // This will result in a scroll to the table, so there's no need to let the parent containers scroll

            if (!event.defaultPrevented) {
              event.preventDefault();
            }

            let changed;

            if (this._deltaX !== 0 || this._deltaY !== 0) {
              if (this._stopPropagation) {
                event.stopPropagation();
              }

              changed = true;
            }

            if (changed === true && this._animationFrameID === null) {
              this._animationFrameID = requestAnimationFrame(this._didWheel);
            }
          },
        },
        {
          key: 'setRoot',
          value: function setRoot(rootRef) {
            this._rootRef = rootRef;
          },
        },
        {
          key: '_didWheel',
          value: function _didWheel() {
            this._animationFrameID = null;

            this._onWheelCallback(this._deltaX, this._deltaY);

            this._deltaX = 0;
            this._deltaY = 0;
          },
        },
        {
          key: '_contains',
          value: function _contains(target) {
            let parent = target;

            while (parent != document.body) {
              if (parent === this._rootRef) {
                return true;
              }

              parent = parent.parentNode;
            }

            return false;
          },
        },
      ],
      [
        {
          key: '_swapNormalizedWheelAxis',
          value: function _swapNormalizedWheelAxis(
            /*object*/
            normalizedEvent
          ) /*object*/
          {
            return {
              spinX: normalizedEvent.spinY,
              spinY: normalizedEvent.spinX,
              pixelX: normalizedEvent.pixelY,
              pixelY: normalizedEvent.pixelX,
            };
          },
        },
        {
          key: '_allowInternalAxesSwap',
          value: function _allowInternalAxesSwap() /*boolean*/
          {
            return navigator.platform !== 'MacIntel';
          },
        },
      ]
    );

    return ReactWheelHandler;
  })();

  /**
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
  /**
   * Upstream version of event listener. Does not take into account specific
   * nature of platform.
   */

  let EventListener = {
    /**
     * Listen to DOM events during the bubble phase.
     *
     * @param {DOMEventTarget} target DOM element to register listener on.
     * @param {string} eventType Event type, e.g. 'click' or 'mouseover'.
     * @param {function} callback Callback function.
     * @param {object} options Extra options to customize the listener
     * @return {object} Object with a `remove` method.
     */
    listen: function listen(target, eventType, callback) {
      let options =
        arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

      if (target.addEventListener) {
        target.addEventListener(eventType, callback, options || false);
        return {
          remove: function remove() {
            target.removeEventListener(eventType, callback, options || false);
          },
        };
      } else if (target.attachEvent) {
        target.attachEvent('on' + eventType, callback);
        return {
          remove: function remove() {
            target.detachEvent('on' + eventType, callback);
          },
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
          },
        };
      } else {
        {
          console.error(
            'Attempted to listen to events during the capture phase on a ' +
              'browser that does not support the capture phase. Your application ' +
              'will not receive some events.'
          );
        }

        return {
          remove: emptyFunction,
        };
      }
    },
    registerDefault: function registerDefault() {},
  };

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

  let cancelAnimationFrame =
    globalThisPolyfill.cancelAnimationFrame ||
    globalThisPolyfill.webkitCancelAnimationFrame ||
    globalThisPolyfill.mozCancelAnimationFrame ||
    globalThisPolyfill.oCancelAnimationFrame ||
    globalThisPolyfill.msCancelAnimationFrame ||
    globalThisPolyfill.clearTimeout;

  /**
   * Copyright Schrodinger, LLC
   * All rights reserved.
   *
   * This source code is licensed under the BSD-style license found in the
   * LICENSE file in the root directory of this source tree. An additional grant
   * of patent rights can be found in the PATENTS file in the same directory.
   *
   * @providesModule FixedDataTableEventHelper
   * @typechecks
   */
  /**
   * Gets the horizontal and vertical coordinates from a mouse or touch event.
   */

  function getCoordinatesFromEvent(
    /*object*/
    event
  ) {
    /*object*/
    let x = 0;
    let y = 0;

    if (!event.clientX || !event.clientY) {
      if (event.touches && event.touches.length > 0) {
        let touch = event.touches[0];
        x = touch.clientX;
        y = touch.clientY;
      }
    } else {
      x = event.clientX;
      y = event.clientY;
    }

    return {
      x,
      y,
    };
  }

  let FixedDataTableEventHelper = {
    getCoordinatesFromEvent,
  };

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

  let DOMMouseMoveTracker = /*#__PURE__*/ (function () {
    /**
     * onMove is the callback that will be called on every mouse move.
     * onMoveEnd is called on mouse up when movement has ended.
     */
    function DOMMouseMoveTracker(
      /*function*/
      onMove,
      /*function*/
      onMoveEnd,
      /*DOMElement*/
      domNode,
      /*boolean*/
      touchEnabled
    ) {
      _classCallCheck$2(this, DOMMouseMoveTracker);

      this._isDragging = false;
      this._isTouchEnabled = touchEnabled;
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

    _createClass$2(DOMMouseMoveTracker, [
      {
        key: 'captureMouseMoves',
        value: function captureMouseMoves(
          /*object*/
          event
        ) {
          if (
            !this._eventMoveToken &&
            !this._eventUpToken &&
            !this._eventLeaveToken
          ) {
            this._eventMoveToken = EventListener.listen(
              this._domNode,
              'mousemove',
              this._onMouseMove
            );
            this._eventUpToken = EventListener.listen(
              this._domNode,
              'mouseup',
              this._onMouseUp
            );
            this._eventLeaveToken = EventListener.listen(
              this._domNode,
              'mouseleave',
              this._onMouseEnd
            );
          }

          if (
            this._isTouchEnabled &&
            !this._eventTouchStartToken &&
            !this._eventTouchMoveToken &&
            !this._eventTouchEndToken
          ) {
            this._eventTouchStartToken = EventListener.listen(
              this._domNode,
              'touchstart',
              this._onMouseMove,
              {
                passive: false,
              }
            );
            this._eventTouchMoveToken = EventListener.listen(
              event.target,
              'touchmove',
              this._onMouseMove,
              {
                passive: false,
              }
            );
            this._eventTouchEndToken = EventListener.listen(
              event.target,
              'touchend',
              this._onMouseUp,
              {
                passive: false,
              }
            );
          }

          if (!this._isDragging) {
            this._deltaX = 0;
            this._deltaY = 0;
            this._isDragging = true;
            let coordinates =
              FixedDataTableEventHelper.getCoordinatesFromEvent(event);
            let x = coordinates.x;
            let y = coordinates.y;
            this._x = x;
            this._y = y;
          }

          event.preventDefault();
        },
        /**
         * This releases all of the listeners on document.body.
         */
      },
      {
        key: 'releaseMouseMoves',
        value: function releaseMouseMoves() {
          if (
            this._eventMoveToken &&
            this._eventUpToken &&
            this._eventLeaveToken
          ) {
            this._eventMoveToken.remove();

            this._eventMoveToken = null;

            this._eventUpToken.remove();

            this._eventUpToken = null;

            this._eventLeaveToken.remove();

            this._eventLeaveToken = null;
          }

          if (
            this._isTouchEnabled &&
            this._eventTouchStartToken &&
            this._eventTouchMoveToken &&
            this._eventTouchEndToken
          ) {
            this._eventTouchStartToken.remove();

            this._eventTouchStartToken = null;

            this._eventTouchMoveToken.remove();

            this._eventTouchMoveToken = null;

            this._eventTouchEndToken.remove();

            this._eventTouchEndToken = null;
          }

          if (this._animationFrameID !== null) {
            cancelAnimationFrame(this._animationFrameID);
            this._animationFrameID = null;
          }

          if (this._isDragging) {
            this._isDragging = false;
            this._x = null;
            this._y = null;
          }
        },
        /**
         * Returns whether or not if the mouse movement is being tracked.
         */
      },
      {
        key: 'isDragging',
        value: function isDragging() /*boolean*/
        {
          return this._isDragging;
        },
        /**
         * Calls onMove passed into constructor and updates internal state.
         */
      },
      {
        key: '_onMouseMove',
        value: function _onMouseMove(
          /*object*/
          event
        ) {
          let coordinates =
            FixedDataTableEventHelper.getCoordinatesFromEvent(event);
          let x = coordinates.x;
          let y = coordinates.y;
          this._deltaX += x - this._x;
          this._deltaY += y - this._y;

          if (this._animationFrameID === null) {
            // The mouse may move faster then the animation frame does.
            // Use `requestAnimationFramePolyfill` to avoid over-updating.
            this._animationFrameID = requestAnimationFrame(this._didMouseMove);
          }

          this._x = x;
          this._y = y;
          event.preventDefault();
        },
      },
      {
        key: '_didMouseMove',
        value: function _didMouseMove() {
          this._animationFrameID = null;

          this._onMove(this._deltaX, this._deltaY);

          this._deltaX = 0;
          this._deltaY = 0;
        },
        /**
         * Calls onMoveEnd passed into constructor and updates internal state.
         */
      },
      {
        key: '_onMouseUp',
        value: function _onMouseUp() {
          if (this._animationFrameID) {
            this._didMouseMove();
          }

          this._onMoveEnd(false);
        },
        /**
         * Calls onMoveEnd passed into the constructor, updates internal state, and cancels the move.
         */
      },
      {
        key: '_onMouseEnd',
        value: function _onMouseEnd() {
          this._onMoveEnd(true);
        },
      },
    ]);

    return DOMMouseMoveTracker;
  })();

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

  let CSS_VARS = {
    '--scrollbar-face-active-color': '#7d7d7d',
    '--scrollbar-face-color': '#c2c2c2',
    '--scrollbar-face-margin': '4px',
    '--scrollbar-face-radius': '6px',
    '--scrollbar-size': '15px',
    '--scrollbar-size-large': '17px',
    '--scrollbar-track-color': '#fff',
    '--border-color': '#d3d3d3',
    '--fbui-white': '#fff',
    '--fbui-desktop-background-light': '#f6f7f8',
  };
  /**
   * @param {string} name
   */

  function cssVar(name) {
    if (CSS_VARS.hasOwnProperty(name)) {
      return CSS_VARS[name];
    }

    throw new Error(
      'cssVar' + '("' + name + '"): Unexpected class transformation.'
    );
  }

  cssVar.CSS_VARS = CSS_VARS;

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
  let _hyphenPattern = /-(.)/g;
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

  /**
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
  let memoized = {};
  let prefixes = ['Webkit', 'ms', 'Moz', 'O'];
  let prefixRegex = new RegExp('^(' + prefixes.join('|') + ')');
  let testStyle = ExecutionEnvironment.canUseDOM
    ? document.createElement('div').style
    : {};

  function getWithPrefix(name) {
    for (let i = 0; i < prefixes.length; i++) {
      let prefixedName = prefixes[i] + name;

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
    let name = camelize(property);

    if (memoized[name] === undefined) {
      let capitalizedName = name.charAt(0).toUpperCase() + name.slice(1);

      if (prefixRegex.test(capitalizedName)) {
        invariant$1(
          false,
          'getVendorPrefixedName must only be called with unprefixed' +
            'CSS property names. It was called with %s',
          property
        );
      }

      memoized[name] =
        name in testStyle ? name : getWithPrefix(capitalizedName);
    }

    return memoized[name];
  }

  /**
   * Copyright Schrodinger, LLC
   * All rights reserved.
   *
   * This source code is licensed under the BSD-style license found in the
   * LICENSE file in the root directory of this source tree. An additional grant
   * of patent rights can be found in the PATENTS file in the same directory.
   *
   * @providesModule BrowserSupportCore
   */
  let BrowserSupportCore = {
    /**
     * @return {bool} True if browser supports css animations.
     */
    hasCSSAnimations: function hasCSSAnimations() {
      return !!getVendorPrefixedName('animationName');
    },

    /**
     * @return {bool} True if browser supports css transforms.
     */
    hasCSSTransforms: function hasCSSTransforms() {
      return !!getVendorPrefixedName('transform');
    },

    /**
     * @return {bool} True if browser supports css 3d transforms.
     */
    hasCSS3DTransforms: function hasCSS3DTransforms() {
      return !!getVendorPrefixedName('perspective');
    },

    /**
     * @return {bool} True if browser supports css transitions.
     */
    hasCSSTransitions: function hasCSSTransitions() {
      return !!getVendorPrefixedName('transition');
    },
  };

  /**
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
  let TRANSFORM = getVendorPrefixedName('transform');
  getVendorPrefixedName('backfaceVisibility');

  let translateDOMPositionXY = (function () {
    if (BrowserSupportCore.hasCSSTransforms()) {
      let ua = globalThisPolyfill.window
        ? globalThisPolyfill.window.navigator.userAgent
        : 'UNKNOWN';
      let isSafari = /Safari\//.test(ua) && !/Chrome\//.test(ua); // It appears that Safari messes up the composition order
      // of GPU-accelerated layers
      // (see bug https://bugs.webkit.org/show_bug.cgi?id=61824).
      // Use 2D translation instead.

      if (!isSafari && BrowserSupportCore.hasCSS3DTransforms()) {
        return function (
          /*object*/
          style,
          /*number*/
          x,
          /*number*/
          y
        ) {
          style[TRANSFORM] = 'translate3d(' + x + 'px,' + y + 'px,0)';
        };
      } else {
        return function (
          /*object*/
          style,
          /*number*/
          x,
          /*number*/
          y
        ) {
          style[TRANSFORM] = 'translate(' + x + 'px,' + y + 'px)';
        };
      }
    } else {
      return function (
        /*object*/
        style,
        /*number*/
        x,
        /*number*/
        y
      ) {
        style.left = x + 'px';
        style.top = y + 'px';
      };
    }
  })();

  /**
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

  function FixedDataTableTranslateDOMPosition(
    /*object*/
    style,
    /*number*/
    x,
    /*number*/
    y
  ) {
    let initialRender =
      arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
    let isRTL =
      arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;

    if (style.display === 'none') {
      return;
    }

    if (initialRender) {
      style.left = x + 'px';
      style.top = y + 'px';
    } else {
      if (BrowserSupportCore.hasCSSTransforms()) {
        x *= isRTL ? -1 : 1;
      }

      style.left = 0;
      translateDOMPositionXY(style, x, y);
    }

    if (isRTL) {
      style.right = style.left;
      style.left = 'auto';
    }
  }

  function _createSuper$h(Derived) {
    let hasNativeReflectConstruct = _isNativeReflectConstruct$h();
    return function _createSuperInternal() {
      let Super = _getPrototypeOf(Derived),
        result;
      if (hasNativeReflectConstruct) {
        let NewTarget = _getPrototypeOf(this).constructor;
        result = Reflect.construct(Super, arguments, NewTarget);
      } else {
        result = Super.apply(this, arguments);
      }
      return _possibleConstructorReturn$2(this, result);
    };
  }

  function _isNativeReflectConstruct$h() {
    if (typeof Reflect === 'undefined' || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === 'function') return true;
    try {
      Boolean.prototype.valueOf.call(
        Reflect.construct(Boolean, [], function () {})
      );
      return true;
    } catch (e) {
      return false;
    }
  }
  let UNSCROLLABLE_STATE = {
    position: 0,
    scrollable: false,
  };
  let FACE_MARGIN = parseInt(cssVar('--scrollbar-face-margin'), 10);
  let FACE_MARGIN_2 = FACE_MARGIN * 2;
  let FACE_SIZE_MIN = 30;
  let KEYBOARD_SCROLL_AMOUNT = 40;
  let _lastScrolledScrollbar = null;

  let Scrollbar = /*#__PURE__*/ (function (_React$PureComponent) {
    _inherits$2(Scrollbar, _React$PureComponent);

    let _super = _createSuper$h(Scrollbar);

    function Scrollbar(_props) {
      /*object*/
      let _this;

      _classCallCheck$2(this, Scrollbar);

      _this = _super.call(this, _props);

      _defineProperty$1(
        _assertThisInitialized(_this),
        '_onRefFace',
        function (ref) {
          return (_this._faceRef = ref);
        }
      );

      _defineProperty$1(
        _assertThisInitialized(_this),
        '_onRefRoot',
        function (ref) {
          return (_this._rootRef = ref);
        }
      );

      _defineProperty$1(
        _assertThisInitialized(_this),
        'scrollBy',
        function (
          /*number*/
          delta
        ) {
          _this._onWheel(delta);
        }
      );

      _defineProperty$1(
        _assertThisInitialized(_this),
        '_shouldHandleX',
        function (
          /*boolean*/
          /*number*/
          delta
        ) {
          return _this.props.orientation === 'horizontal'
            ? _this._shouldHandleChange(delta)
            : false;
        }
      );

      _defineProperty$1(
        _assertThisInitialized(_this),
        '_shouldHandleY',
        function (
          /*boolean*/
          /*number*/
          delta
        ) {
          return _this.props.orientation !== 'horizontal'
            ? _this._shouldHandleChange(delta)
            : false;
        }
      );

      _defineProperty$1(
        _assertThisInitialized(_this),
        '_shouldHandleChange',
        function (
          /*boolean*/
          /*number*/
          delta
        ) {
          let nextState = _this._calculateState(
            _this.state.position + delta,
            _this.props.size,
            _this.props.contentSize,
            _this.props.orientation
          );

          return nextState.position !== _this.state.position;
        }
      );

      _defineProperty$1(
        _assertThisInitialized(_this),
        '_calculateState',
        function (
          /*object*/
          /*number*/
          position,
          /*number*/
          size,
          /*number*/
          contentSize,
          /*string*/
          orientation
        ) {
          let clampedSize = Math.max(1, size);

          if (contentSize <= clampedSize) {
            return UNSCROLLABLE_STATE;
          }

          let stateKey = ''
            .concat(position, '_')
            .concat(clampedSize, '_')
            .concat(contentSize, '_')
            .concat(orientation);

          if (_this._stateKey === stateKey) {
            return _this._stateForKey;
          } // There are two types of positions here.
          // 1) Phisical position: changed by mouse / keyboard
          // 2) Logical position: changed by props.
          // The logical position will be kept as as internal state and the `render()`
          // function will translate it into physical position to render.

          let isHorizontal = orientation === 'horizontal';
          let scale = clampedSize / contentSize;
          let faceSize = clampedSize * scale;

          if (faceSize < FACE_SIZE_MIN) {
            scale = (clampedSize - FACE_SIZE_MIN) / (contentSize - clampedSize);
            faceSize = FACE_SIZE_MIN;
          }

          let scrollable = true;
          let maxPosition = contentSize - clampedSize;

          if (position < 0) {
            position = 0;
          } else if (position > maxPosition) {
            position = maxPosition;
          }

          let isDragging = _this._mouseMoveTracker
            ? _this._mouseMoveTracker.isDragging()
            : false; // This function should only return flat values that can be compared quiclky
          // by `ReactComponentWithPureRenderMixin`.

          let state = {
            faceSize,
            isDragging,
            isHorizontal,
            position,
            scale,
            scrollable,
          }; // cache the state for later use.

          _this._stateKey = stateKey;
          _this._stateForKey = state;
          return state;
        }
      );

      _defineProperty$1(
        _assertThisInitialized(_this),
        '_onWheelY',
        function (
          /*number*/
          deltaX,
          /*number*/
          deltaY
        ) {
          _this._onWheel(deltaY);
        }
      );

      _defineProperty$1(
        _assertThisInitialized(_this),
        '_onWheelX',
        function (
          /*number*/
          deltaX,
          /*number*/
          deltaY
        ) {
          _this._onWheel(deltaX);
        }
      );

      _defineProperty$1(
        _assertThisInitialized(_this),
        '_onWheel',
        function (
          /*number*/
          delta
        ) {
          let props = _this.props; // The mouse may move faster then the animation frame does.
          // Use `requestAnimationFrame` to avoid over-updating.

          _this._setNextState(
            _this._calculateState(
              _this.state.position + delta,
              props.size,
              props.contentSize,
              props.orientation
            )
          );
        }
      );

      _defineProperty$1(
        _assertThisInitialized(_this),
        '_onMouseDown',
        function (
          /*object*/
          event
        ) {
          /** @type {object} */
          let nextState;

          if (event.target !== _this._faceRef) {
            // Both `offsetX` and `layerX` are non-standard DOM property but they are
            // magically available for browsers somehow.
            let nativeEvent = event.nativeEvent;
            let position = _this.state.isHorizontal
              ? nativeEvent.offsetX ||
                nativeEvent.layerX ||
                _this.getTouchX(nativeEvent)
              : nativeEvent.offsetY ||
                nativeEvent.layerY ||
                _this.getTouchY(nativeEvent); // MouseDown on the scroll-track directly, move the center of the
            // scroll-face to the mouse position.

            let props = _this.props;
            position /= _this.state.scale;
            nextState = _this._calculateState(
              position - (_this.state.faceSize * 0.5) / _this.state.scale,
              props.size,
              props.contentSize,
              props.orientation
            );
          } else {
            nextState = {};
          }

          nextState.focused = true;

          _this._setNextState(nextState);

          _this._mouseMoveTracker.captureMouseMoves(event); // Focus the node so it may receive keyboard event.

          _this._rootRef.focus();
        }
      );

      _defineProperty$1(
        _assertThisInitialized(_this),
        '_onTouchCancel',
        function (
          /*object*/
          event
        ) {
          event.stopPropagation();
        }
      );

      _defineProperty$1(
        _assertThisInitialized(_this),
        '_onTouchEnd',
        function (
          /*object*/
          event
        ) {
          event.stopPropagation();
        }
      );

      _defineProperty$1(
        _assertThisInitialized(_this),
        '_onTouchMove',
        function (
          /*object*/
          event
        ) {
          event.stopPropagation();
        }
      );

      _defineProperty$1(
        _assertThisInitialized(_this),
        '_onTouchStart',
        function (
          /*object*/
          event
        ) {
          event.stopPropagation();

          _this._onMouseDown(event);
        }
      );

      _defineProperty$1(
        _assertThisInitialized(_this),
        '_onMouseMove',
        function (
          /*number*/
          deltaX,
          /*number*/
          deltaY
        ) {
          let props = _this.props;
          let delta = _this.state.isHorizontal
            ? deltaX * (_this.props.isRTL ? -1 : 1)
            : deltaY;
          delta /= _this.state.scale;
          /**
           * NOTE (pradeep): Starting from React 18, React batches multiple state updates together for improving performance.
           *
           * While this is generally good, the legacy code here (for whatever reason) expects state updates to be
           * unbatched.
           * This leads to https://github.com/schrodinger/fixed-data-table-2/issues/668, where the scrollbar doesn't
           * move as fast as the user's cursor when they drag the scrollbar thumb.
           * This causes the cursor and the scrollbar to go out of sync, which is a bit frustrating.
           *
           * I'm fixing this by using ReactDOM's flushSync API to make sure that the state update is flushed immediately.
           *
           * TODO (pradeep): While the fix works, we should really be relying on automatic batching for performance.
           *
           * (Read more on automatic batching by React here: https://github.com/reactwg/react-18/discussions/21)
           */

          let flushSync =
            ReactDOM__default['default'].flushSync ||
            function (fn) {
              return fn();
            }; // ReactDOM.flushSync doesn't exist in older versions of React

          flushSync(function () {
            return _this._setNextState(
              _this._calculateState(
                _this.state.position + delta,
                props.size,
                props.contentSize,
                props.orientation
              )
            );
          });
        }
      );

      _defineProperty$1(
        _assertThisInitialized(_this),
        '_onMouseMoveEnd',
        function () {
          _this._nextState = null;

          _this._mouseMoveTracker.releaseMouseMoves();

          _this.setState({
            isDragging: false,
          });
        }
      );

      _defineProperty$1(
        _assertThisInitialized(_this),
        '_onKeyDown',
        function (
          /*object*/
          event
        ) {
          let keyCode = event.keyCode;

          if (keyCode === Keys.TAB) {
            // Let focus move off the scrollbar.
            return;
          }

          let distance = KEYBOARD_SCROLL_AMOUNT;
          let direction = 0;

          if (_this.state.isHorizontal) {
            switch (keyCode) {
              case Keys.HOME:
                direction = -1;
                distance = _this.props.contentSize;
                break;

              case Keys.LEFT:
                direction = -1;
                break;

              case Keys.RIGHT:
                direction = 1;
                break;

              default:
                return;
            }
          }

          if (!_this.state.isHorizontal) {
            switch (keyCode) {
              case Keys.SPACE:
                if (event.shiftKey) {
                  direction = -1;
                } else {
                  direction = 1;
                }

                break;

              case Keys.HOME:
                direction = -1;
                distance = _this.props.contentSize;
                break;

              case Keys.UP:
                direction = -1;
                break;

              case Keys.DOWN:
                direction = 1;
                break;

              case Keys.PAGE_UP:
                direction = -1;
                distance = _this.props.size;
                break;

              case Keys.PAGE_DOWN:
                direction = 1;
                distance = _this.props.size;
                break;

              default:
                return;
            }
          }

          event.preventDefault();
          let props = _this.props;

          _this._setNextState(
            _this._calculateState(
              _this.state.position + distance * direction,
              props.size,
              props.contentSize,
              props.orientation
            )
          );
        }
      );

      _defineProperty$1(_assertThisInitialized(_this), '_onFocus', function () {
        _this.setState({
          focused: true,
        });
      });

      _defineProperty$1(_assertThisInitialized(_this), '_onBlur', function () {
        _this.setState({
          focused: false,
        });
      });

      _defineProperty$1(_assertThisInitialized(_this), '_blur', function () {
        let el = ReactDOM__default['default'].findDOMNode(
          _assertThisInitialized(_this)
        );

        if (!el) {
          return;
        }

        try {
          _this._onBlur();

          el.blur();
        } catch (oops) {
          // pass
        }
      });

      _defineProperty$1(
        _assertThisInitialized(_this),
        'getTouchX',
        function (
          /*object*/
          e
        ) {
          return Math.round(
            e.targetTouches[0].clientX - e.target.getBoundingClientRect().x
          );
        }
      );

      _defineProperty$1(
        _assertThisInitialized(_this),
        'getTouchY',
        function (
          /*object*/
          e
        ) {
          return Math.round(
            e.targetTouches[0].clientY - e.target.getBoundingClientRect().y
          );
        }
      );

      _defineProperty$1(
        _assertThisInitialized(_this),
        '_setNextState',
        function (
          /*object*/
          nextState,
          /*?object*/
          props
        ) {
          props = props || _this.props;
          let controlledPosition = props.position;
          let willScroll = _this.state.position !== nextState.position;

          if (controlledPosition === undefined) {
            let callback = willScroll ? _this._didScroll : undefined;

            _this.setState(nextState, callback);
          } else if (controlledPosition === nextState.position) {
            _this.setState(nextState);
          } else {
            // Scrolling is controlled. Don't update the state and let the owner
            // to update the scrollbar instead.
            if (
              nextState.position !== undefined &&
              nextState.position !== _this.state.position
            ) {
              _this.props.onScroll(nextState.position);
            }

            return;
          }

          if (
            willScroll &&
            _lastScrolledScrollbar !== _assertThisInitialized(_this)
          ) {
            _lastScrolledScrollbar && _lastScrolledScrollbar._blur();
            _lastScrolledScrollbar = _assertThisInitialized(_this);
          }
        }
      );

      _defineProperty$1(
        _assertThisInitialized(_this),
        '_didScroll',
        function () {
          _this.props.onScroll(_this.state.position);
        }
      );

      _this.state = _this._calculateState(
        _props.position || _props.defaultPosition || 0,
        _props.size,
        _props.contentSize,
        _props.orientation
      );
      _this._initialRender = true;
      return _this;
    }

    _createClass$2(Scrollbar, [
      {
        key: 'componentDidUpdate',
        value: function componentDidUpdate() {
          let controlledPosition = this.props.position;

          if (controlledPosition === undefined) {
            this._setNextState(
              this._calculateState(
                this.state.position,
                this.props.size,
                this.props.contentSize,
                this.props.orientation
              )
            );
          } else {
            this._setNextState(
              this._calculateState(
                controlledPosition,
                this.props.size,
                this.props.contentSize,
                this.props.orientation
              ),
              this.props
            );
          }
        },
      },
      {
        key: 'render',
        value: function render() /*?object*/
        {
          if (!this.state.scrollable) {
            return null;
          }

          let size = this.props.size;
          /** @type {React.CSSProperties} */

          let mainStyle;
          /** @type {React.CSSProperties} */

          let faceStyle;
          let isHorizontal = this.state.isHorizontal;
          let isVertical = !isHorizontal;
          let isActive = this.state.focused || this.state.isDragging;
          let faceSize = this.state.faceSize;
          let isOpaque = this.props.isOpaque;
          let verticalTop = this.props.verticalTop || 0;
          let mainClassName = cx({
            'ScrollbarLayout/main': true,
            'ScrollbarLayout/mainVertical': isVertical,
            'ScrollbarLayout/mainHorizontal': isHorizontal,
            'public/Scrollbar/main': true,
            'public/Scrollbar/mainOpaque': isOpaque,
            'public/Scrollbar/mainActive': isActive,
          });
          let faceClassName = cx({
            'ScrollbarLayout/face': true,
            'ScrollbarLayout/faceHorizontal': isHorizontal,
            'ScrollbarLayout/faceVertical': isVertical,
            'public/Scrollbar/faceActive': isActive,
            'public/Scrollbar/face': true,
          });
          let position = this.state.position * this.state.scale + FACE_MARGIN;

          if (isHorizontal) {
            mainStyle = {
              width: size,
            };
            faceStyle = {
              width: faceSize - FACE_MARGIN_2,
              top: 0,
              bottom: 0,
            };
            FixedDataTableTranslateDOMPosition(
              faceStyle,
              position,
              0,
              this._initialRender,
              this.props.isRTL
            );
          } else {
            mainStyle = {
              top: verticalTop,
              height: size,
            };

            if (this.props.isRTL) {
              mainStyle.left = mainStyle.right || 0;
              mainStyle.right = 'auto';
            }

            faceStyle = {
              height: faceSize - FACE_MARGIN_2,
            };
            FixedDataTableTranslateDOMPosition(
              faceStyle,
              0,
              position,
              this._initialRender,
              this.props.isRTL
            );
            faceStyle.left = 0;
            faceStyle.right = 0;
          }

          mainStyle.touchAction = 'none';
          mainStyle.zIndex = this.props.zIndex;

          if (this.props.trackColor === 'gray') {
            mainStyle.backgroundColor = cssVar(
              '--fbui-desktop-background-light'
            );
          }

          return /*#__PURE__*/ React__default['default'].createElement(
            'div',
            {
              onFocus: this._onFocus,
              onBlur: this._onBlur,
              onKeyDown: this._onKeyDown,
              onMouseDown: this._onMouseDown,
              onTouchCancel: this._onTouchCancel,
              onTouchEnd: this._onTouchEnd,
              onTouchMove: this._onTouchMove,
              onTouchStart: this._onTouchStart,
              className: mainClassName,
              style: mainStyle,
              ref: this._onRefRoot,
            },
            /*#__PURE__*/ React__default['default'].createElement('div', {
              ref: this._onRefFace,
              className: faceClassName,
              style: faceStyle,
            })
          );
        },
      },
      {
        key: 'componentDidMount',
        value: function componentDidMount() {
          let isHorizontal = this.props.orientation === 'horizontal';
          let onWheel = isHorizontal ? this._onWheelX : this._onWheelY;
          this._wheelHandler = new ReactWheelHandler(
            onWheel,
            this._shouldHandleX, // Should handle horizontal scroll
            this._shouldHandleY, // Should handle vertical scroll
            this.props.isRTL
          );
          this._rootRef &&
            this._rootRef.addEventListener(
              'wheel',
              this._wheelHandler.onWheel,
              {
                passive: false,
              }
            );
          this._mouseMoveTracker = new DOMMouseMoveTracker(
            this._onMouseMove,
            this._onMouseMoveEnd,
            document.documentElement,
            this.props.touchEnabled
          );

          if (
            this.props.position !== undefined &&
            this.state.position !== this.props.position
          ) {
            this._didScroll();
          }

          this._initialRender = false;
        },
      },
      {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
          this._rootRef &&
            this._rootRef.removeEventListener(
              'wheel',
              this._wheelHandler.onWheel,
              {
                passive: false,
              }
            );
          this._nextState = null;

          if (this._mouseMoveTracker) {
            this._mouseMoveTracker.releaseMouseMoves();

            this._mouseMoveTracker = null;
          }

          if (_lastScrolledScrollbar === this) {
            _lastScrolledScrollbar = null;
          }
        },
      },
    ]);

    return Scrollbar;
  })(React__default['default'].PureComponent);

  _defineProperty$1(Scrollbar, 'propTypes', {
    contentSize: PropTypes.number.isRequired,
    defaultPosition: PropTypes.number,
    isOpaque: PropTypes.bool,
    orientation: PropTypes.oneOf(['vertical', 'horizontal']),
    onScroll: PropTypes.func,
    position: PropTypes.number,
    size: PropTypes.number.isRequired,
    trackColor: PropTypes.oneOf(['gray']),
    touchEnabled: PropTypes.bool,
    zIndex: PropTypes.number,
    verticalTop: PropTypes.number,
    isRTL: PropTypes.bool,
  });

  _defineProperty$1(
    Scrollbar,
    'defaultProps',
    /*object*/
    {
      defaultPosition: 0,
      isOpaque: false,
      onScroll: emptyFunction,
      orientation: 'vertical',
      zIndex: 99,
    }
  );

  Scrollbar.KEYBOARD_SCROLL_AMOUNT = KEYBOARD_SCROLL_AMOUNT;
  Scrollbar.SIZE = parseInt(cssVar('--scrollbar-size'), 10);
  Scrollbar.OFFSET = 1;

  function n(n) {
    for (
      var r = arguments.length, t = Array(r > 1 ? r - 1 : 0), e = 1;
      e < r;
      e++
    )
      t[e - 1] = arguments[e];
    {
      let i = Y[n],
        o = i
          ? 'function' == typeof i
            ? i.apply(null, t)
            : i
          : 'unknown error nr: ' + n;
      throw Error('[Immer] ' + o);
    }
  }
  function r(n) {
    return !!n && !!n[Q];
  }
  function t(n) {
    return (
      !!n &&
      ((function (n) {
        if (!n || 'object' != typeof n) return !1;
        let r = Object.getPrototypeOf(n);
        if (null === r) return !0;
        let t = Object.hasOwnProperty.call(r, 'constructor') && r.constructor;
        return (
          t === Object ||
          ('function' == typeof t && Function.toString.call(t) === Z)
        );
      })(n) ||
        Array.isArray(n) ||
        !!n[L] ||
        !!n.constructor[L] ||
        s(n) ||
        v(n))
    );
  }
  function e(t) {
    return r(t) || n(23, t), t[Q].t;
  }
  function i(n, r, t) {
    void 0 === t && (t = !1),
      0 === o(n)
        ? (t ? Object.keys : nn)(n).forEach(function (e) {
            (t && 'symbol' == typeof e) || r(e, n[e], n);
          })
        : n.forEach(function (t, e) {
            return r(e, t, n);
          });
  }
  function o(n) {
    let r = n[Q];
    return r
      ? r.i > 3
        ? r.i - 4
        : r.i
      : Array.isArray(n)
      ? 1
      : s(n)
      ? 2
      : v(n)
      ? 3
      : 0;
  }
  function u(n, r) {
    return 2 === o(n) ? n.has(r) : Object.prototype.hasOwnProperty.call(n, r);
  }
  function a(n, r) {
    return 2 === o(n) ? n.get(r) : n[r];
  }
  function f(n, r, t) {
    let e = o(n);
    2 === e ? n.set(r, t) : 3 === e ? (n.delete(r), n.add(t)) : (n[r] = t);
  }
  function c(n, r) {
    return n === r ? 0 !== n || 1 / n == 1 / r : n != n && r != r;
  }
  function s(n) {
    return X && n instanceof Map;
  }
  function v(n) {
    return q && n instanceof Set;
  }
  function p(n) {
    return n.o || n.t;
  }
  function l(n) {
    if (Array.isArray(n)) return Array.prototype.slice.call(n);
    let r = rn(n);
    delete r[Q];
    for (let t = nn(r), e = 0; e < t.length; e++) {
      let i = t[e],
        o = r[i];
      !1 === o.writable && ((o.writable = !0), (o.configurable = !0)),
        (o.get || o.set) &&
          (r[i] = {
            configurable: !0,
            writable: !0,
            enumerable: o.enumerable,
            value: n[i],
          });
    }
    return Object.create(Object.getPrototypeOf(n), r);
  }
  function d(n, e) {
    return (
      void 0 === e && (e = !1),
      y(n) || r(n) || !t(n)
        ? n
        : (o(n) > 1 && (n.set = n.add = n.clear = n.delete = h),
          Object.freeze(n),
          e &&
            i(
              n,
              function (n, r) {
                return d(r, !0);
              },
              !0
            ),
          n)
    );
  }
  function h() {
    n(2);
  }
  function y(n) {
    return null == n || 'object' != typeof n || Object.isFrozen(n);
  }
  function b(r) {
    let t = tn[r];
    return t || n(18, r), t;
  }
  function m(n, r) {
    tn[n] || (tn[n] = r);
  }
  function _() {
    return U || n(0), U;
  }
  function j(n, r) {
    r && (b('Patches'), (n.u = []), (n.s = []), (n.v = r));
  }
  function O(n) {
    g(n), n.p.forEach(S), (n.p = null);
  }
  function g(n) {
    n === U && (U = n.l);
  }
  function w(n) {
    return (U = { p: [], l: U, h: n, m: !0, _: 0 });
  }
  function S(n) {
    let r = n[Q];
    0 === r.i || 1 === r.i ? r.j() : (r.O = !0);
  }
  function P(r, e) {
    e._ = e.p.length;
    let i = e.p[0],
      o = void 0 !== r && r !== i;
    return (
      e.h.g || b('ES5').S(e, r, o),
      o
        ? (i[Q].P && (O(e), n(4)),
          t(r) && ((r = M(e, r)), e.l || x(e, r)),
          e.u && b('Patches').M(i[Q].t, r, e.u, e.s))
        : (r = M(e, i, [])),
      O(e),
      e.u && e.v(e.u, e.s),
      r !== H ? r : void 0
    );
  }
  function M(n, r, t) {
    if (y(r)) return r;
    let e = r[Q];
    if (!e)
      return (
        i(
          r,
          function (i, o) {
            return A(n, e, r, i, o, t);
          },
          !0
        ),
        r
      );
    if (e.A !== n) return r;
    if (!e.P) return x(n, e.t, !0), e.t;
    if (!e.I) {
      (e.I = !0), e.A._--;
      let o = 4 === e.i || 5 === e.i ? (e.o = l(e.k)) : e.o;
      i(3 === e.i ? new Set(o) : o, function (r, i) {
        return A(n, e, o, r, i, t);
      }),
        x(n, o, !1),
        t && n.u && b('Patches').R(e, t, n.u, n.s);
    }
    return e.o;
  }
  function A(e, i, o, a, c, s) {
    if ((c === o && n(5), r(c))) {
      let v = M(e, c, s && i && 3 !== i.i && !u(i.D, a) ? s.concat(a) : void 0);
      if ((f(o, a, v), !r(v))) return;
      e.m = !1;
    }
    if (t(c) && !y(c)) {
      if (!e.h.F && e._ < 1) return;
      M(e, c), (i && i.A.l) || x(e, c);
    }
  }
  function x(n, r, t) {
    void 0 === t && (t = !1), n.h.F && n.m && d(r, t);
  }
  function z(n, r) {
    let t = n[Q];
    return (t ? p(t) : n)[r];
  }
  function I(n, r) {
    if (r in n)
      for (let t = Object.getPrototypeOf(n); t; ) {
        let e = Object.getOwnPropertyDescriptor(t, r);
        if (e) return e;
        t = Object.getPrototypeOf(t);
      }
  }
  function k(n) {
    n.P || ((n.P = !0), n.l && k(n.l));
  }
  function E(n) {
    n.o || (n.o = l(n.t));
  }
  function R(n, r, t) {
    let e = s(r)
      ? b('MapSet').N(r, t)
      : v(r)
      ? b('MapSet').T(r, t)
      : n.g
      ? (function (n, r) {
          let t = Array.isArray(n),
            e = {
              i: t ? 1 : 0,
              A: r ? r.A : _(),
              P: !1,
              I: !1,
              D: {},
              l: r,
              t: n,
              k: null,
              o: null,
              j: null,
              C: !1,
            },
            i = e,
            o = en;
          t && ((i = [e]), (o = on));
          let u = Proxy.revocable(i, o),
            a = u.revoke,
            f = u.proxy;
          return (e.k = f), (e.j = a), f;
        })(r, t)
      : b('ES5').J(r, t);
    return (t ? t.A : _()).p.push(e), e;
  }
  function D(e) {
    return (
      r(e) || n(22, e),
      (function n(r) {
        if (!t(r)) return r;
        let e,
          u = r[Q],
          c = o(r);
        if (u) {
          if (!u.P && (u.i < 4 || !b('ES5').K(u))) return u.t;
          (u.I = !0), (e = F(r, c)), (u.I = !1);
        } else e = F(r, c);
        return (
          i(e, function (r, t) {
            (u && a(u.t, r) === t) || f(e, r, n(t));
          }),
          3 === c ? new Set(e) : e
        );
      })(e)
    );
  }
  function F(n, r) {
    switch (r) {
      case 2:
        return new Map(n);
      case 3:
        return Array.from(n);
    }
    return l(n);
  }
  function N() {
    function t(n, r) {
      let t = s[n];
      return (
        t
          ? (t.enumerable = r)
          : (s[n] = t =
              {
                configurable: !0,
                enumerable: r,
                get() {
                  let r = this[Q];
                  return f(r), en.get(r, n);
                },
                set(r) {
                  let t = this[Q];
                  f(t), en.set(t, n, r);
                },
              }),
        t
      );
    }
    function e(n) {
      for (let r = n.length - 1; r >= 0; r--) {
        let t = n[r][Q];
        if (!t.P)
          switch (t.i) {
            case 5:
              a(t) && k(t);
              break;
            case 4:
              o(t) && k(t);
          }
      }
    }
    function o(n) {
      for (var r = n.t, t = n.k, e = nn(t), i = e.length - 1; i >= 0; i--) {
        let o = e[i];
        if (o !== Q) {
          let a = r[o];
          if (void 0 === a && !u(r, o)) return !0;
          let f = t[o],
            s = f && f[Q];
          if (s ? s.t !== a : !c(f, a)) return !0;
        }
      }
      let v = !!r[Q];
      return e.length !== nn(r).length + (v ? 0 : 1);
    }
    function a(n) {
      let r = n.k;
      if (r.length !== n.t.length) return !0;
      let t = Object.getOwnPropertyDescriptor(r, r.length - 1);
      if (t && !t.get) return !0;
      for (let e = 0; e < r.length; e++) if (!r.hasOwnProperty(e)) return !0;
      return !1;
    }
    function f(r) {
      r.O && n(3, JSON.stringify(p(r)));
    }
    var s = {};
    m('ES5', {
      J(n, r) {
        let e = Array.isArray(n),
          i = (function (n, r) {
            if (n) {
              for (var e = Array(r.length), i = 0; i < r.length; i++)
                Object.defineProperty(e, '' + i, t(i, !0));
              return e;
            }
            let o = rn(r);
            delete o[Q];
            for (let u = nn(o), a = 0; a < u.length; a++) {
              let f = u[a];
              o[f] = t(f, n || !!o[f].enumerable);
            }
            return Object.create(Object.getPrototypeOf(r), o);
          })(e, n),
          o = {
            i: e ? 5 : 4,
            A: r ? r.A : _(),
            P: !1,
            I: !1,
            D: {},
            l: r,
            t: n,
            k: i,
            o: null,
            O: !1,
            C: !1,
          };
        return Object.defineProperty(i, Q, { value: o, writable: !0 }), i;
      },
      S(n, t, o) {
        o
          ? r(t) && t[Q].A === n && e(n.p)
          : (n.u &&
              (function n(r) {
                if (r && 'object' == typeof r) {
                  let t = r[Q];
                  if (t) {
                    let e = t.t,
                      o = t.k,
                      f = t.D,
                      c = t.i;
                    if (4 === c)
                      i(o, function (r) {
                        r !== Q &&
                          (void 0 !== e[r] || u(e, r)
                            ? f[r] || n(o[r])
                            : ((f[r] = !0), k(t)));
                      }),
                        i(e, function (n) {
                          void 0 !== o[n] || u(o, n) || ((f[n] = !1), k(t));
                        });
                    else if (5 === c) {
                      if (
                        (a(t) && (k(t), (f.length = !0)), o.length < e.length)
                      )
                        for (let s = o.length; s < e.length; s++) f[s] = !1;
                      else for (let v = e.length; v < o.length; v++) f[v] = !0;
                      for (
                        let p = Math.min(o.length, e.length), l = 0;
                        l < p;
                        l++
                      )
                        o.hasOwnProperty(l) || (f[l] = !0),
                          void 0 === f[l] && n(o[l]);
                    }
                  }
                }
              })(n.p[0]),
            e(n.p));
      },
      K(n) {
        return 4 === n.i ? o(n) : a(n);
      },
    });
  }
  var G,
    U,
    W = 'undefined' != typeof Symbol && 'symbol' == typeof Symbol('x'),
    X = 'undefined' != typeof Map,
    q = 'undefined' != typeof Set,
    B =
      'undefined' != typeof Proxy &&
      void 0 !== Proxy.revocable &&
      'undefined' != typeof Reflect,
    H = W ? Symbol.for('immer-nothing') : (((G = {})['immer-nothing'] = !0), G),
    L = W ? Symbol.for('immer-draftable') : '__$immer_draftable',
    Q = W ? Symbol.for('immer-state') : '__$immer_state',
    Y = {
      0: 'Illegal state',
      1: 'Immer drafts cannot have computed properties',
      2: 'This object has been frozen and should not be mutated',
      3(n) {
        return (
          'Cannot use a proxy that has been revoked. Did you pass an object from inside an immer function to an async process? ' +
          n
        );
      },
      4: 'An immer producer returned a new value *and* modified its draft. Either return a new value *or* modify the draft.',
      5: 'Immer forbids circular references',
      6: 'The first or second argument to `produce` must be a function',
      7: 'The third argument to `produce` must be a function or undefined',
      8: 'First argument to `createDraft` must be a plain object, an array, or an immerable object',
      9: 'First argument to `finishDraft` must be a draft returned by `createDraft`',
      10: 'The given draft is already finalized',
      11: 'Object.defineProperty() cannot be used on an Immer draft',
      12: 'Object.setPrototypeOf() cannot be used on an Immer draft',
      13: 'Immer only supports deleting array indices',
      14: "Immer only supports setting array indices and the 'length' property",
      15(n) {
        return "Cannot apply patch, path doesn't resolve: " + n;
      },
      16: 'Sets cannot have "replace" patches.',
      17(n) {
        return 'Unsupported patch operation: ' + n;
      },
      18(n) {
        return (
          "The plugin for '" +
          n +
          "' has not been loaded into Immer. To enable the plugin, import and call `enable" +
          n +
          '()` when initializing your application.'
        );
      },
      20: 'Cannot use proxies if Proxy, Proxy.revocable or Reflect are not available',
      21(n) {
        return (
          "produce can only be called on things that are draftable: plain objects, arrays, Map, Set or classes that are marked with '[immerable]: true'. Got '" +
          n +
          "'"
        );
      },
      22(n) {
        return "'current' expects a draft, got: " + n;
      },
      23(n) {
        return "'original' expects a draft, got: " + n;
      },
      24: 'Patching reserved attributes like __proto__, prototype and constructor is not allowed',
    },
    Z = '' + Object.prototype.constructor,
    nn =
      'undefined' != typeof Reflect && Reflect.ownKeys
        ? Reflect.ownKeys
        : void 0 !== Object.getOwnPropertySymbols
        ? function (n) {
            return Object.getOwnPropertyNames(n).concat(
              Object.getOwnPropertySymbols(n)
            );
          }
        : Object.getOwnPropertyNames,
    rn =
      Object.getOwnPropertyDescriptors ||
      function (n) {
        let r = {};
        return (
          nn(n).forEach(function (t) {
            r[t] = Object.getOwnPropertyDescriptor(n, t);
          }),
          r
        );
      },
    tn = {},
    en = {
      get(n, r) {
        if (r === Q) return n;
        let e = p(n);
        if (!u(e, r))
          return (function (n, r, t) {
            let e,
              i = I(r, t);
            return i
              ? 'value' in i
                ? i.value
                : null === (e = i.get) || void 0 === e
                ? void 0
                : e.call(n.k)
              : void 0;
          })(n, e, r);
        let i = e[r];
        return n.I || !t(i)
          ? i
          : i === z(n.t, r)
          ? (E(n), (n.o[r] = R(n.A.h, i, n)))
          : i;
      },
      has(n, r) {
        return r in p(n);
      },
      ownKeys(n) {
        return Reflect.ownKeys(p(n));
      },
      set(n, r, t) {
        let e = I(p(n), r);
        if (null == e ? void 0 : e.set) return e.set.call(n.k, t), !0;
        if (!n.P) {
          let i = z(p(n), r),
            o = null == i ? void 0 : i[Q];
          if (o && o.t === t) return (n.o[r] = t), (n.D[r] = !1), !0;
          if (c(t, i) && (void 0 !== t || u(n.t, r))) return !0;
          E(n), k(n);
        }
        return (
          (n.o[r] === t &&
            'number' != typeof t &&
            (void 0 !== t || r in n.o)) ||
          ((n.o[r] = t), (n.D[r] = !0), !0)
        );
      },
      deleteProperty(n, r) {
        return (
          void 0 !== z(n.t, r) || r in n.t
            ? ((n.D[r] = !1), E(n), k(n))
            : delete n.D[r],
          n.o && delete n.o[r],
          !0
        );
      },
      getOwnPropertyDescriptor(n, r) {
        let t = p(n),
          e = Reflect.getOwnPropertyDescriptor(t, r);
        return e
          ? {
              writable: !0,
              configurable: 1 !== n.i || 'length' !== r,
              enumerable: e.enumerable,
              value: t[r],
            }
          : e;
      },
      defineProperty() {
        n(11);
      },
      getPrototypeOf(n) {
        return Object.getPrototypeOf(n.t);
      },
      setPrototypeOf() {
        n(12);
      },
    },
    on = {};
  i(en, function (n, r) {
    on[n] = function () {
      return (arguments[0] = arguments[0][0]), r.apply(this, arguments);
    };
  }),
    (on.deleteProperty = function (r, t) {
      return isNaN(parseInt(t)) && n(13), on.set.call(this, r, t, void 0);
    }),
    (on.set = function (r, t, e) {
      return (
        'length' !== t && isNaN(parseInt(t)) && n(14),
        en.set.call(this, r[0], t, e, r[0])
      );
    });
  let un = (function () {
      function e(r) {
        let e = this;
        (this.g = B),
          (this.F = !0),
          (this.produce = function (r, i, o) {
            if ('function' == typeof r && 'function' != typeof i) {
              let u = i;
              i = r;
              let a = e;
              return function (n) {
                let r = this;
                void 0 === n && (n = u);
                for (
                  var t = arguments.length, e = Array(t > 1 ? t - 1 : 0), o = 1;
                  o < t;
                  o++
                )
                  e[o - 1] = arguments[o];
                return a.produce(n, function (n) {
                  let t;
                  return (t = i).call.apply(t, [r, n].concat(e));
                });
              };
            }
            let f;
            if (
              ('function' != typeof i && n(6),
              void 0 !== o && 'function' != typeof o && n(7),
              t(r))
            ) {
              let c = w(e),
                s = R(e, r, void 0),
                v = !0;
              try {
                (f = i(s)), (v = !1);
              } finally {
                v ? O(c) : g(c);
              }
              return 'undefined' != typeof Promise && f instanceof Promise
                ? f.then(
                    function (n) {
                      return j(c, o), P(n, c);
                    },
                    function (n) {
                      throw (O(c), n);
                    }
                  )
                : (j(c, o), P(f, c));
            }
            if (!r || 'object' != typeof r) {
              if (
                (void 0 === (f = i(r)) && (f = r),
                f === H && (f = void 0),
                e.F && d(f, !0),
                o)
              ) {
                let p = [],
                  l = [];
                b('Patches').M(r, f, p, l), o(p, l);
              }
              return f;
            }
            n(21, r);
          }),
          (this.produceWithPatches = function (n, r) {
            if ('function' == typeof n)
              return function (r) {
                for (
                  var t = arguments.length, i = Array(t > 1 ? t - 1 : 0), o = 1;
                  o < t;
                  o++
                )
                  i[o - 1] = arguments[o];
                return e.produceWithPatches(r, function (r) {
                  return n.apply(void 0, [r].concat(i));
                });
              };
            let t,
              i,
              o = e.produce(n, r, function (n, r) {
                (t = n), (i = r);
              });
            return 'undefined' != typeof Promise && o instanceof Promise
              ? o.then(function (n) {
                  return [n, t, i];
                })
              : [o, t, i];
          }),
          'boolean' == typeof (null == r ? void 0 : r.useProxies) &&
            this.setUseProxies(r.useProxies),
          'boolean' == typeof (null == r ? void 0 : r.autoFreeze) &&
            this.setAutoFreeze(r.autoFreeze);
      }
      let i = e.prototype;
      return (
        (i.createDraft = function (e) {
          t(e) || n(8), r(e) && (e = D(e));
          let i = w(this),
            o = R(this, e, void 0);
          return (o[Q].C = !0), g(i), o;
        }),
        (i.finishDraft = function (r, t) {
          let e = r && r[Q];
          (e && e.C) || n(9), e.I && n(10);
          let i = e.A;
          return j(i, t), P(void 0, i);
        }),
        (i.setAutoFreeze = function (n) {
          this.F = n;
        }),
        (i.setUseProxies = function (r) {
          r && !B && n(20), (this.g = r);
        }),
        (i.applyPatches = function (n, t) {
          let e;
          for (e = t.length - 1; e >= 0; e--) {
            let i = t[e];
            if (0 === i.path.length && 'replace' === i.op) {
              n = i.value;
              break;
            }
          }
          e > -1 && (t = t.slice(e + 1));
          let o = b('Patches').$;
          return r(n)
            ? o(n, t)
            : this.produce(n, function (n) {
                return o(n, t);
              });
        }),
        e
      );
    })(),
    an = new un(),
    fn = an.produce;
  an.produceWithPatches.bind(an);
  an.setAutoFreeze.bind(an);
  an.setUseProxies.bind(an);
  an.applyPatches.bind(an);
  an.createDraft.bind(an);
  an.finishDraft.bind(an);
  let createNextState2 = fn;

  /** A function that accepts a potential "extra argument" value to be injected later,
   * and returns an instance of the thunk middleware that uses that value
   */
  function createThunkMiddleware(extraArgument) {
    // Standard Redux middleware definition pattern:
    // See: https://redux.js.org/tutorials/fundamentals/part-4-store#writing-custom-middleware
    let middleware = function middleware(_ref) {
      let dispatch = _ref.dispatch,
        getState = _ref.getState;
      return function (next) {
        return function (action) {
          // The thunk middleware looks for any functions that were passed to `store.dispatch`.
          // If this "action" is really a function, call it and return the result.
          if (typeof action === 'function') {
            // Inject the store's `dispatch` and `getState` methods, as well as any "extra arg"
            return action(dispatch, getState, extraArgument);
          } // Otherwise, pass the action down the middleware chain as usual

          return next(action);
        };
      };
    };

    return middleware;
  }

  let thunk = createThunkMiddleware(); // Attach the factory function so users can create a customized version
  // with whatever "extra arg" they want to inject into their thunks

  thunk.withExtraArgument = createThunkMiddleware;
  let thunkMiddleware = thunk;

  let __extends =
    (undefined && undefined.__extends) ||
    (function () {
      var extendStatics = function (d, b) {
        extendStatics =
          Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array &&
            function (d, b) {
              d.__proto__ = b;
            }) ||
          function (d, b) {
            for (let p in b)
              if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
          };
        return extendStatics(d, b);
      };
      return function (d, b) {
        if (typeof b !== 'function' && b !== null)
          throw new TypeError(
            'Class extends value ' + String(b) + ' is not a constructor or null'
          );
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype =
          b === null
            ? Object.create(b)
            : ((__.prototype = b.prototype), new __());
      };
    })();
  (undefined && undefined.__generator) ||
    function (thisArg, body) {
      let _ = {
          label: 0,
          sent() {
            if (t[0] & 1) throw t[1];
            return t[1];
          },
          trys: [],
          ops: [],
        },
        f,
        y,
        t,
        g;
      return (
        (g = { next: verb(0), throw: verb(1), return: verb(2) }),
        typeof Symbol === 'function' &&
          (g[Symbol.iterator] = function () {
            return this;
          }),
        g
      );
      function verb(n) {
        return function (v) {
          return step([n, v]);
        };
      }
      function step(op) {
        if (f) throw new TypeError('Generator is already executing.');
        while (_)
          try {
            if (
              ((f = 1),
              y &&
                (t =
                  op[0] & 2
                    ? y['return']
                    : op[0]
                    ? y['throw'] || ((t = y['return']) && t.call(y), 0)
                    : y.next) &&
                !(t = t.call(y, op[1])).done)
            )
              return t;
            if (((y = 0), t)) op = [op[0] & 2, t.value];
            switch (op[0]) {
              case 0:
              case 1:
                t = op;
                break;
              case 4:
                _.label++;
                return { value: op[1], done: false };
              case 5:
                _.label++;
                y = op[1];
                op = [0];
                continue;
              case 7:
                op = _.ops.pop();
                _.trys.pop();
                continue;
              default:
                if (
                  !((t = _.trys), (t = t.length > 0 && t[t.length - 1])) &&
                  (op[0] === 6 || op[0] === 2)
                ) {
                  _ = 0;
                  continue;
                }
                if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                  _.label = op[1];
                  break;
                }
                if (op[0] === 6 && _.label < t[1]) {
                  _.label = t[1];
                  t = op;
                  break;
                }
                if (t && _.label < t[2]) {
                  _.label = t[2];
                  _.ops.push(op);
                  break;
                }
                if (t[2]) _.ops.pop();
                _.trys.pop();
                continue;
            }
            op = body.call(thisArg, _);
          } catch (e) {
            op = [6, e];
            y = 0;
          } finally {
            f = t = 0;
          }
        if (op[0] & 5) throw op[1];
        return { value: op[0] ? op[1] : void 0, done: true };
      }
    };
  let __spreadArray =
    (undefined && undefined.__spreadArray) ||
    function (to, from) {
      for (let i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
      return to;
    };
  let __defProp = Object.defineProperty;
  let __getOwnPropSymbols = Object.getOwnPropertySymbols;
  let __hasOwnProp = Object.prototype.hasOwnProperty;
  let __propIsEnum = Object.prototype.propertyIsEnumerable;
  let __defNormalProp = function (obj, key, value) {
    return key in obj
      ? __defProp(obj, key, {
          enumerable: true,
          configurable: true,
          writable: true,
          value,
        })
      : (obj[key] = value);
  };
  let __spreadValues = function (a, b) {
    for (var prop in b || (b = {}))
      if (__hasOwnProp.call(b, prop)) __defNormalProp(a, prop, b[prop]);
    if (__getOwnPropSymbols)
      for (let _i = 0, _c = __getOwnPropSymbols(b); _i < _c.length; _i++) {
        var prop = _c[_i];
        if (__propIsEnum.call(b, prop)) __defNormalProp(a, prop, b[prop]);
      }
    return a;
  };
  let composeWithDevTools =
    typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      : function () {
          if (arguments.length === 0) return void 0;
          if (typeof arguments[0] === 'object') return compose;
          return compose.apply(null, arguments);
        };
  // src/isPlainObject.ts
  function isPlainObject(value) {
    if (typeof value !== 'object' || value === null) return false;
    let proto = Object.getPrototypeOf(value);
    if (proto === null) return true;
    let baseProto = proto;
    while (Object.getPrototypeOf(baseProto) !== null) {
      baseProto = Object.getPrototypeOf(baseProto);
    }
    return proto === baseProto;
  }
  // src/utils.ts
  function getTimeMeasureUtils(maxDelay, fnName) {
    let elapsed = 0;
    return {
      measureTime(fn) {
        let started = Date.now();
        try {
          return fn();
        } finally {
          let finished = Date.now();
          elapsed += finished - started;
        }
      },
      warnIfExceeded() {
        if (elapsed > maxDelay) {
          console.warn(
            fnName +
              ' took ' +
              elapsed +
              'ms, which is more than the warning threshold of ' +
              maxDelay +
              "ms. \nIf your state or actions are very large, you may want to disable the middleware as it might cause too much of a slowdown in development mode. See https://redux-toolkit.js.org/api/getDefaultMiddleware for instructions.\nIt is disabled in production builds, so you don't need to worry about that."
          );
        }
      },
    };
  }
  let MiddlewareArray = /** @class */ (function (_super) {
    __extends(MiddlewareArray, _super);
    function MiddlewareArray() {
      let args = [];
      for (let _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
      }
      let _this = _super.apply(this, args) || this;
      Object.setPrototypeOf(_this, MiddlewareArray.prototype);
      return _this;
    }
    Object.defineProperty(MiddlewareArray, Symbol.species, {
      get() {
        return MiddlewareArray;
      },
      enumerable: false,
      configurable: true,
    });
    MiddlewareArray.prototype.concat = function () {
      let arr = [];
      for (let _i = 0; _i < arguments.length; _i++) {
        arr[_i] = arguments[_i];
      }
      return _super.prototype.concat.apply(this, arr);
    };
    MiddlewareArray.prototype.prepend = function () {
      let arr = [];
      for (let _i = 0; _i < arguments.length; _i++) {
        arr[_i] = arguments[_i];
      }
      if (arr.length === 1 && Array.isArray(arr[0])) {
        return new (MiddlewareArray.bind.apply(
          MiddlewareArray,
          __spreadArray([void 0], arr[0].concat(this))
        ))();
      }
      return new (MiddlewareArray.bind.apply(
        MiddlewareArray,
        __spreadArray([void 0], arr.concat(this))
      ))();
    };
    return MiddlewareArray;
  })(Array);
  let prefix = 'Invariant failed';
  function invariant(condition, message) {
    if (condition) {
      return;
    }
    throw new Error(prefix + ': ' + (message || ''));
  }
  function stringify(obj, serializer, indent, decycler) {
    return JSON.stringify(obj, getSerialize(serializer, decycler), indent);
  }
  function getSerialize(serializer, decycler) {
    let stack = [],
      keys = [];
    if (!decycler)
      decycler = function (_, value) {
        if (stack[0] === value) return '[Circular ~]';
        return (
          '[Circular ~.' + keys.slice(0, stack.indexOf(value)).join('.') + ']'
        );
      };
    return function (key, value) {
      if (stack.length > 0) {
        let thisPos = stack.indexOf(this);
        ~thisPos ? stack.splice(thisPos + 1) : stack.push(this);
        ~thisPos ? keys.splice(thisPos, Infinity, key) : keys.push(key);
        if (~stack.indexOf(value)) value = decycler.call(this, key, value);
      } else stack.push(value);
      return serializer == null ? value : serializer.call(this, key, value);
    };
  }
  function isImmutableDefault(value) {
    return (
      typeof value !== 'object' ||
      value === null ||
      typeof value === 'undefined' ||
      Object.isFrozen(value)
    );
  }
  function trackForMutations(isImmutable, ignorePaths, obj) {
    let trackedProperties = trackProperties(isImmutable, ignorePaths, obj);
    return {
      detectMutations() {
        return detectMutations(
          isImmutable,
          ignorePaths,
          trackedProperties,
          obj
        );
      },
    };
  }
  function trackProperties(isImmutable, ignorePaths, obj, path) {
    if (ignorePaths === void 0) {
      ignorePaths = [];
    }
    if (path === void 0) {
      path = '';
    }
    let tracked = { value: obj };
    if (!isImmutable(obj)) {
      tracked.children = {};
      for (let key in obj) {
        let childPath = path ? path + '.' + key : key;
        if (ignorePaths.length && ignorePaths.indexOf(childPath) !== -1) {
          continue;
        }
        tracked.children[key] = trackProperties(
          isImmutable,
          ignorePaths,
          obj[key],
          childPath
        );
      }
    }
    return tracked;
  }
  function detectMutations(
    isImmutable,
    ignorePaths,
    trackedProperty,
    obj,
    sameParentRef,
    path
  ) {
    if (ignorePaths === void 0) {
      ignorePaths = [];
    }
    if (sameParentRef === void 0) {
      sameParentRef = false;
    }
    if (path === void 0) {
      path = '';
    }
    let prevObj = trackedProperty ? trackedProperty.value : void 0;
    let sameRef = prevObj === obj;
    if (sameParentRef && !sameRef && !Number.isNaN(obj)) {
      return { wasMutated: true, path };
    }
    if (isImmutable(prevObj) || isImmutable(obj)) {
      return { wasMutated: false };
    }
    let keysToDetect = {};
    for (var key in trackedProperty.children) {
      keysToDetect[key] = true;
    }
    for (var key in obj) {
      keysToDetect[key] = true;
    }
    for (var key in keysToDetect) {
      let childPath = path ? path + '.' + key : key;
      if (ignorePaths.length && ignorePaths.indexOf(childPath) !== -1) {
        continue;
      }
      let result = detectMutations(
        isImmutable,
        ignorePaths,
        trackedProperty.children[key],
        obj[key],
        sameRef,
        childPath
      );
      if (result.wasMutated) {
        return result;
      }
    }
    return { wasMutated: false };
  }
  function createImmutableStateInvariantMiddleware(options) {
    if (options === void 0) {
      options = {};
    }
    let _c = options.isImmutable,
      isImmutable = _c === void 0 ? isImmutableDefault : _c,
      ignoredPaths = options.ignoredPaths,
      _d = options.warnAfter,
      warnAfter = _d === void 0 ? 32 : _d,
      ignore = options.ignore;
    ignoredPaths = ignoredPaths || ignore;
    let track = trackForMutations.bind(null, isImmutable, ignoredPaths);
    return function (_c) {
      let getState = _c.getState;
      let state = getState();
      let tracker = track(state);
      let result;
      return function (next) {
        return function (action) {
          let measureUtils = getTimeMeasureUtils(
            warnAfter,
            'ImmutableStateInvariantMiddleware'
          );
          measureUtils.measureTime(function () {
            state = getState();
            result = tracker.detectMutations();
            tracker = track(state);
            invariant(
              !result.wasMutated,
              "A state mutation was detected between dispatches, in the path '" +
                (result.path || '') +
                "'.  This may cause incorrect behavior. (https://redux.js.org/style-guide/style-guide#do-not-mutate-state)"
            );
          });
          let dispatchedAction = next(action);
          measureUtils.measureTime(function () {
            state = getState();
            result = tracker.detectMutations();
            tracker = track(state);
            result.wasMutated &&
              invariant(
                !result.wasMutated,
                'A state mutation was detected inside a dispatch, in the path: ' +
                  (result.path || '') +
                  '. Take a look at the reducer(s) handling the action ' +
                  stringify(action) +
                  '. (https://redux.js.org/style-guide/style-guide#do-not-mutate-state)'
              );
          });
          measureUtils.warnIfExceeded();
          return dispatchedAction;
        };
      };
    };
  }
  // src/serializableStateInvariantMiddleware.ts
  function isPlain(val) {
    let type = typeof val;
    return (
      type === 'undefined' ||
      val === null ||
      type === 'string' ||
      type === 'boolean' ||
      type === 'number' ||
      Array.isArray(val) ||
      isPlainObject(val)
    );
  }
  function findNonSerializableValue(
    value,
    path,
    isSerializable,
    getEntries,
    ignoredPaths
  ) {
    if (path === void 0) {
      path = '';
    }
    if (isSerializable === void 0) {
      isSerializable = isPlain;
    }
    if (ignoredPaths === void 0) {
      ignoredPaths = [];
    }
    let foundNestedSerializable;
    if (!isSerializable(value)) {
      return {
        keyPath: path || '<root>',
        value,
      };
    }
    if (typeof value !== 'object' || value === null) {
      return false;
    }
    let entries =
      getEntries != null ? getEntries(value) : Object.entries(value);
    let hasIgnoredPaths = ignoredPaths.length > 0;
    for (let _i = 0, entries_1 = entries; _i < entries_1.length; _i++) {
      let _c = entries_1[_i],
        key = _c[0],
        nestedValue = _c[1];
      let nestedPath = path ? path + '.' + key : key;
      if (hasIgnoredPaths && ignoredPaths.indexOf(nestedPath) >= 0) {
        continue;
      }
      if (!isSerializable(nestedValue)) {
        return {
          keyPath: nestedPath,
          value: nestedValue,
        };
      }
      if (typeof nestedValue === 'object') {
        foundNestedSerializable = findNonSerializableValue(
          nestedValue,
          nestedPath,
          isSerializable,
          getEntries,
          ignoredPaths
        );
        if (foundNestedSerializable) {
          return foundNestedSerializable;
        }
      }
    }
    return false;
  }
  function createSerializableStateInvariantMiddleware(options) {
    if (options === void 0) {
      options = {};
    }
    let _c = options.isSerializable,
      isSerializable = _c === void 0 ? isPlain : _c,
      getEntries = options.getEntries,
      _d = options.ignoredActions,
      ignoredActions = _d === void 0 ? [] : _d,
      _e = options.ignoredActionPaths,
      ignoredActionPaths =
        _e === void 0 ? ['meta.arg', 'meta.baseQueryMeta'] : _e,
      _f = options.ignoredPaths,
      ignoredPaths = _f === void 0 ? [] : _f,
      _g = options.warnAfter,
      warnAfter = _g === void 0 ? 32 : _g,
      _h = options.ignoreState,
      ignoreState = _h === void 0 ? false : _h,
      _j = options.ignoreActions,
      ignoreActions = _j === void 0 ? false : _j;
    return function (storeAPI) {
      return function (next) {
        return function (action) {
          let result = next(action);
          let measureUtils = getTimeMeasureUtils(
            warnAfter,
            'SerializableStateInvariantMiddleware'
          );
          if (
            !ignoreActions &&
            !(
              ignoredActions.length &&
              ignoredActions.indexOf(action.type) !== -1
            )
          ) {
            measureUtils.measureTime(function () {
              let foundActionNonSerializableValue = findNonSerializableValue(
                action,
                '',
                isSerializable,
                getEntries,
                ignoredActionPaths
              );
              if (foundActionNonSerializableValue) {
                let keyPath = foundActionNonSerializableValue.keyPath,
                  value = foundActionNonSerializableValue.value;
                console.error(
                  'A non-serializable value was detected in an action, in the path: `' +
                    keyPath +
                    '`. Value:',
                  value,
                  '\nTake a look at the logic that dispatched this action: ',
                  action,
                  '\n(See https://redux.js.org/faq/actions#why-should-type-be-a-string-or-at-least-serializable-why-should-my-action-types-be-constants)',
                  '\n(To allow non-serializable values see: https://redux-toolkit.js.org/usage/usage-guide#working-with-non-serializable-data)'
                );
              }
            });
          }
          if (!ignoreState) {
            measureUtils.measureTime(function () {
              let state = storeAPI.getState();
              let foundStateNonSerializableValue = findNonSerializableValue(
                state,
                '',
                isSerializable,
                getEntries,
                ignoredPaths
              );
              if (foundStateNonSerializableValue) {
                let keyPath = foundStateNonSerializableValue.keyPath,
                  value = foundStateNonSerializableValue.value;
                console.error(
                  'A non-serializable value was detected in the state, in the path: `' +
                    keyPath +
                    '`. Value:',
                  value,
                  '\nTake a look at the reducer(s) handling this action type: ' +
                    action.type +
                    '.\n(See https://redux.js.org/faq/organizing-state#can-i-put-functions-promises-or-other-non-serializable-items-in-my-store-state)'
                );
              }
            });
            measureUtils.warnIfExceeded();
          }
          return result;
        };
      };
    };
  }
  // src/getDefaultMiddleware.ts
  function isBoolean(x) {
    return typeof x === 'boolean';
  }
  function curryGetDefaultMiddleware() {
    return function curriedGetDefaultMiddleware(options) {
      return getDefaultMiddleware(options);
    };
  }
  function getDefaultMiddleware(options) {
    if (options === void 0) {
      options = {};
    }
    let _c = options.thunk,
      thunk = _c === void 0 ? true : _c,
      _d = options.immutableCheck,
      immutableCheck = _d === void 0 ? true : _d,
      _e = options.serializableCheck,
      serializableCheck = _e === void 0 ? true : _e;
    let middlewareArray = new MiddlewareArray();
    if (thunk) {
      if (isBoolean(thunk)) {
        middlewareArray.push(thunkMiddleware);
      } else {
        middlewareArray.push(
          thunkMiddleware.withExtraArgument(thunk.extraArgument)
        );
      }
    }
    {
      if (immutableCheck) {
        let immutableOptions = {};
        if (!isBoolean(immutableCheck)) {
          immutableOptions = immutableCheck;
        }
        middlewareArray.unshift(
          createImmutableStateInvariantMiddleware(immutableOptions)
        );
      }
      if (serializableCheck) {
        let serializableOptions = {};
        if (!isBoolean(serializableCheck)) {
          serializableOptions = serializableCheck;
        }
        middlewareArray.push(
          createSerializableStateInvariantMiddleware(serializableOptions)
        );
      }
    }
    return middlewareArray;
  }
  // src/configureStore.ts
  let IS_PRODUCTION = 'development' === 'production';
  function configureStore(options) {
    let curriedGetDefaultMiddleware = curryGetDefaultMiddleware();
    let _c = options || {},
      _d = _c.reducer,
      reducer = _d === void 0 ? void 0 : _d,
      _e = _c.middleware,
      middleware = _e === void 0 ? curriedGetDefaultMiddleware() : _e,
      _f = _c.devTools,
      devTools = _f === void 0 ? true : _f,
      _g = _c.preloadedState,
      preloadedState = _g === void 0 ? void 0 : _g,
      _h = _c.enhancers,
      enhancers = _h === void 0 ? void 0 : _h;
    let rootReducer;
    if (typeof reducer === 'function') {
      rootReducer = reducer;
    } else if (isPlainObject(reducer)) {
      rootReducer = combineReducers(reducer);
    } else {
      throw new Error(
        '"reducer" is a required argument, and must be a function or an object of functions that can be passed to combineReducers'
      );
    }
    let finalMiddleware = middleware;
    if (typeof finalMiddleware === 'function') {
      finalMiddleware = finalMiddleware(curriedGetDefaultMiddleware);
      if (!Array.isArray(finalMiddleware)) {
        throw new Error(
          'when using a middleware builder function, an array of middleware must be returned'
        );
      }
    }
    if (
      finalMiddleware.some(function (item) {
        return typeof item !== 'function';
      })
    ) {
      throw new Error(
        'each middleware provided to configureStore must be a function'
      );
    }
    let middlewareEnhancer = applyMiddleware.apply(void 0, finalMiddleware);
    let finalCompose = compose;
    if (devTools) {
      finalCompose = composeWithDevTools(
        __spreadValues(
          {
            trace: !IS_PRODUCTION,
          },
          typeof devTools === 'object' && devTools
        )
      );
    }
    let storeEnhancers = [middlewareEnhancer];
    if (Array.isArray(enhancers)) {
      storeEnhancers = __spreadArray([middlewareEnhancer], enhancers);
    } else if (typeof enhancers === 'function') {
      storeEnhancers = enhancers(storeEnhancers);
    }
    let composedEnhancer = finalCompose.apply(void 0, storeEnhancers);
    return createStore(rootReducer, preloadedState, composedEnhancer);
  }
  // src/createAction.ts
  function createAction(type, prepareAction) {
    function actionCreator() {
      let args = [];
      for (let _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
      }
      if (prepareAction) {
        let prepared = prepareAction.apply(void 0, args);
        if (!prepared) {
          throw new Error('prepareAction did not return an object');
        }
        return __spreadValues(
          __spreadValues(
            {
              type,
              payload: prepared.payload,
            },
            'meta' in prepared && { meta: prepared.meta }
          ),
          'error' in prepared && { error: prepared.error }
        );
      }
      return { type, payload: args[0] };
    }
    actionCreator.toString = function () {
      return '' + type;
    };
    actionCreator.type = type;
    actionCreator.match = function (action) {
      return action.type === type;
    };
    return actionCreator;
  }
  // src/mapBuilders.ts
  function executeReducerBuilderCallback(builderCallback) {
    let actionsMap = {};
    let actionMatchers = [];
    let defaultCaseReducer;
    var builder = {
      addCase(typeOrActionCreator, reducer) {
        {
          if (actionMatchers.length > 0) {
            throw new Error(
              '`builder.addCase` should only be called before calling `builder.addMatcher`'
            );
          }
          if (defaultCaseReducer) {
            throw new Error(
              '`builder.addCase` should only be called before calling `builder.addDefaultCase`'
            );
          }
        }
        let type =
          typeof typeOrActionCreator === 'string'
            ? typeOrActionCreator
            : typeOrActionCreator.type;
        if (type in actionsMap) {
          throw new Error(
            'addCase cannot be called with two reducers for the same action type'
          );
        }
        actionsMap[type] = reducer;
        return builder;
      },
      addMatcher(matcher, reducer) {
        {
          if (defaultCaseReducer) {
            throw new Error(
              '`builder.addMatcher` should only be called before calling `builder.addDefaultCase`'
            );
          }
        }
        actionMatchers.push({ matcher, reducer });
        return builder;
      },
      addDefaultCase(reducer) {
        {
          if (defaultCaseReducer) {
            throw new Error('`builder.addDefaultCase` can only be called once');
          }
        }
        defaultCaseReducer = reducer;
        return builder;
      },
    };
    builderCallback(builder);
    return [actionsMap, actionMatchers, defaultCaseReducer];
  }
  // src/createReducer.ts
  function isStateFunction(x) {
    return typeof x === 'function';
  }
  function createReducer(
    initialState,
    mapOrBuilderCallback,
    actionMatchers,
    defaultCaseReducer
  ) {
    if (actionMatchers === void 0) {
      actionMatchers = [];
    }
    let _c =
        typeof mapOrBuilderCallback === 'function'
          ? executeReducerBuilderCallback(mapOrBuilderCallback)
          : [mapOrBuilderCallback, actionMatchers, defaultCaseReducer],
      actionsMap = _c[0],
      finalActionMatchers = _c[1],
      finalDefaultCaseReducer = _c[2];
    let getInitialState;
    if (isStateFunction(initialState)) {
      getInitialState = function () {
        return createNextState2(initialState(), function () {});
      };
    } else {
      let frozenInitialState_1 = createNextState2(initialState, function () {});
      getInitialState = function () {
        return frozenInitialState_1;
      };
    }
    function reducer(state, action) {
      if (state === void 0) {
        state = getInitialState();
      }
      let caseReducers = __spreadArray(
        [actionsMap[action.type]],
        finalActionMatchers
          .filter(function (_c) {
            let matcher = _c.matcher;
            return matcher(action);
          })
          .map(function (_c) {
            let reducer2 = _c.reducer;
            return reducer2;
          })
      );
      if (
        caseReducers.filter(function (cr) {
          return !!cr;
        }).length === 0
      ) {
        caseReducers = [finalDefaultCaseReducer];
      }
      return caseReducers.reduce(function (previousState, caseReducer) {
        if (caseReducer) {
          if (r(previousState)) {
            let draft = previousState;
            var result = caseReducer(draft, action);
            if (typeof result === 'undefined') {
              return previousState;
            }
            return result;
          } else if (!t(previousState)) {
            var result = caseReducer(previousState, action);
            if (typeof result === 'undefined') {
              if (previousState === null) {
                return previousState;
              }
              throw Error(
                'A case reducer on a non-draftable value must not return undefined'
              );
            }
            return result;
          } else {
            return createNextState2(previousState, function (draft) {
              return caseReducer(draft, action);
            });
          }
        }
        return previousState;
      }, state);
    }
    reducer.getInitialState = getInitialState;
    return reducer;
  }
  // src/createSlice.ts
  function getType2(slice, actionKey) {
    return slice + '/' + actionKey;
  }
  function createSlice(options) {
    let name = options.name;
    if (!name) {
      throw new Error('`name` is a required option for createSlice');
    }
    let initialState =
      typeof options.initialState == 'function'
        ? options.initialState
        : createNextState2(options.initialState, function () {});
    let reducers = options.reducers || {};
    let reducerNames = Object.keys(reducers);
    let sliceCaseReducersByName = {};
    let sliceCaseReducersByType = {};
    let actionCreators = {};
    reducerNames.forEach(function (reducerName) {
      let maybeReducerWithPrepare = reducers[reducerName];
      let type = getType2(name, reducerName);
      let caseReducer;
      let prepareCallback;
      if ('reducer' in maybeReducerWithPrepare) {
        caseReducer = maybeReducerWithPrepare.reducer;
        prepareCallback = maybeReducerWithPrepare.prepare;
      } else {
        caseReducer = maybeReducerWithPrepare;
      }
      sliceCaseReducersByName[reducerName] = caseReducer;
      sliceCaseReducersByType[type] = caseReducer;
      actionCreators[reducerName] = prepareCallback
        ? createAction(type, prepareCallback)
        : createAction(type);
    });
    function buildReducer() {
      let _c =
          typeof options.extraReducers === 'function'
            ? executeReducerBuilderCallback(options.extraReducers)
            : [options.extraReducers],
        _d = _c[0],
        extraReducers = _d === void 0 ? {} : _d,
        _e = _c[1],
        actionMatchers = _e === void 0 ? [] : _e,
        _f = _c[2],
        defaultCaseReducer = _f === void 0 ? void 0 : _f;
      let finalCaseReducers = __spreadValues(
        __spreadValues({}, extraReducers),
        sliceCaseReducersByType
      );
      return createReducer(
        initialState,
        finalCaseReducers,
        actionMatchers,
        defaultCaseReducer
      );
    }
    let _reducer;
    return {
      name,
      reducer(state, action) {
        if (!_reducer) _reducer = buildReducer();
        return _reducer(state, action);
      },
      actions: actionCreators,
      caseReducers: sliceCaseReducersByName,
      getInitialState() {
        if (!_reducer) _reducer = buildReducer();
        return _reducer.getInitialState();
      },
    };
  }
  let alm = 'listenerMiddleware';
  createAction(alm + '/add');
  createAction(alm + '/removeAll');
  createAction(alm + '/remove');
  // src/index.ts
  N();

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
  /**
   * Returns the default initial state for the redux store.
   * This must be a brand new, independent object for each table instance
   * or issues may occur due to multiple tables sharing data.
   *
   * @return {!Object}
   */

  function getInitialState() {
    let internalState = createInternalState();
    return {
      /*
       * Input state set from props
       */
      columnElements: [],
      columnGroupElements: [],
      elementTemplates: {
        cell: [],
        footer: [],
        groupHeader: [],
        header: [],
      },
      elementHeights: {
        footerHeight: 0,
        groupHeaderHeight: 0,
        headerHeight: 0,
      },
      propsRevision: null,
      rowSettings: {
        bufferRowCount: undefined,
        rowAttributesGetter: undefined,
        rowHeight: 0,
        rowHeightGetter: function rowHeightGetter() {
          return 0;
        },
        rowsCount: 0,
        subRowHeight: 0,
        subRowHeightGetter: function subRowHeightGetter() {
          return 0;
        },
      },
      scrollFlags: {
        overflowX: 'auto',
        overflowY: 'auto',
        showScrollbarX: true,
        showScrollbarY: true,
      },
      tableSize: {
        height: undefined,
        maxHeight: 0,
        ownerHeight: undefined,
        useMaxHeight: false,
        width: 0,
      },

      /*
       * Output state passed as props to the the rendered FixedDataTable
       * NOTE (jordan) rows may contain undefineds if we don't need all the buffer positions
       */
      firstRowIndex: 0,
      firstRowOffset: 0,
      maxScrollX: 0,
      maxScrollY: 0,
      rowOffsets: {},
      rows: [],
      // rowsToRender
      scrollContentHeight: 0,
      scrollX: 0,
      scrollbarXHeight: Scrollbar.SIZE,
      scrollY: 0,
      scrollbarYWidth: Scrollbar.SIZE,
      scrolling: false,

      /**
       * Internal state is only used by reducers.
       * NOTE (jordan, pradeep): Internal state is altered in place, so don't trust it for redux history or immutabability checks.
       * We also purposefully avoid keeping the raw internal state as part of the redux store.
       * Instead a getter can be used to retrieve the internal state.
       *
       * 1. Large data structures in internal state like `rowHeights` are mutated by reducers.
       *    Since we don't care about immutability, we avoid overheads seen in a typical immutable data structure.
       *
       * 2. Immer internally uses proxies on the entire redux store state inorder to detect state mutations in reducers,
       *    but watching large data structures is inefficient and slows down reducers.
       *    Internal state isn't a direct part of the redux store state because we separated it through a getter.
       *    This means there's no proxies watching over the internal state, and hence mutating it has no overheads.
       *
       * @type {!Function}
       */
      getInternal: function getInternal() {
        return internalState;
      },
    };
  }
  /** @returns {!InternalState} */

  function createInternalState() {
    return {
      rowBufferSet: new IntegerBufferSet(),
      rowOffsetIntervalTree: null,
      // PrefixIntervalTree
      storedHeights: [],
    };
  }

  let slice = createSlice({
    name: 'FDT',

    /*
     * NOTE (pradeep, wcjordan): The initial state will be populated through the `initialize` reducer.
     * We can't preset the state using the `initialState` field because we need a brand new, independent object
     * for each table instance, or issues may occur due to multiple tables sharing data (see #369 for an example)
     */
    initialState: {},
    reducers: {
      initialize: function initialize(state, action) {
        let props = action.payload;

        _extends(state, getInitialState());

        setStateFromProps(state, props);
        initializeRowHeightsAndOffsets(state);
        let scrollAnchor = getScrollAnchor(state, props);
        computeRenderedRows(state, scrollAnchor);
        columnStateHelper.initialize(state, props, {});
      },
      propChange: function propChange(state, action) {
        let _action$payload = action.payload,
          newProps = _action$payload.newProps,
          oldProps = _action$payload.oldProps;
        let oldState = clone_1(e(state));
        setStateFromProps(state, newProps);

        if (
          oldProps.rowsCount !== newProps.rowsCount ||
          oldProps.rowHeight !== newProps.rowHeight ||
          oldProps.subRowHeight !== newProps.subRowHeight
        ) {
          initializeRowHeightsAndOffsets(state);
        }

        if (oldProps.rowsCount !== newProps.rowsCount) {
          state.getInternal().rowBufferSet = new IntegerBufferSet();
        }

        let scrollAnchor = getScrollAnchor(state, newProps, oldProps); // If anything has changed in state, update our rendered rows

        if (!shallowEqual(state, oldState) || scrollAnchor.changed) {
          computeRenderedRows(state, scrollAnchor);
        }

        columnStateHelper.initialize(state, newProps, oldProps); // if scroll values have changed, then we're scrolling!

        if (
          state.scrollX !== oldState.scrollX ||
          state.scrollY !== oldState.scrollY
        ) {
          state.scrolling = state.scrolling || true;
        } // TODO REDUX_MIGRATION solve w/ evil-diff
        // TODO (jordan) check if relevant props unchanged and
        // children column widths and flex widths are unchanged
        // alternatively shallow diff and reconcile props
      },
      scrollEnd: function scrollEnd(state) {
        state.scrolling = false;
        let previousScrollAnchor = {
          firstIndex: state.firstRowIndex,
          firstOffset: state.firstRowOffset,
          lastIndex: state.lastIndex,
        };
        computeRenderedRows(state, previousScrollAnchor);
      },
      scrollToY: function scrollToY(state, action) {
        let scrollY = action.payload;
        state.scrolling = true;
        let scrollAnchor = scrollTo$1(state, scrollY);
        computeRenderedRows(state, scrollAnchor);
      },
      scrollToX: function scrollToX(state, action) {
        let scrollX = action.payload;
        state.scrolling = true;
        state.scrollX = scrollX;
      },
    },
  });
  /**
   * Initialize row heights (storedHeights) & offsets based on the default rowHeight
   *
   * @param {!Object} state
   * @private
   */

  function initializeRowHeightsAndOffsets(state) {
    let _state$rowSettings = state.rowSettings,
      rowHeight = _state$rowSettings.rowHeight,
      rowsCount = _state$rowSettings.rowsCount,
      subRowHeight = _state$rowSettings.subRowHeight;
    let defaultFullRowHeight = rowHeight + subRowHeight;
    let rowOffsetIntervalTree = PrefixIntervalTree.uniform(
      rowsCount,
      defaultFullRowHeight
    );
    let scrollContentHeight = rowsCount * defaultFullRowHeight;
    let storedHeights = new Array(rowsCount);

    for (let idx = 0; idx < rowsCount; idx++) {
      storedHeights[idx] = defaultFullRowHeight;
    }

    state.scrollContentHeight = scrollContentHeight;

    _extends(state.getInternal(), {
      rowOffsetIntervalTree,
      storedHeights,
    });
  }
  /**
   * @param {!Object} state
   * @param {!Object} props
   * @return {!Object}
   * @private
   */

  function setStateFromProps(state, props) {
    let _convertColumnElement = convertColumnElementsToData(props.children),
      columnGroupElements = _convertColumnElement.columnGroupElements,
      columnElements = _convertColumnElement.columnElements,
      elementTemplates = _convertColumnElement.elementTemplates,
      useGroupHeader = _convertColumnElement.useGroupHeader;

    _extends(state, {
      columnGroupElements,
      columnElements,
      elementTemplates,
      propsRevision: state.propsRevision + 1,
    }); // NOTE (pradeep): We pre-freeze these large collections to avoid
    // performance bottle necks
    //
    // From Immer's docs:
    //     Immer freezes everything recursively. For large data objects
    //     that won't be changed in the future this might be over-kill,
    //     in that case it can be more efficient to shallowly
    //     pre-freeze data using the freeze utility.

    Object.freeze(state.columnElements);
    Object.freeze(state.columnGroupElements);
    Object.freeze(state.elementTemplates);
    state.elementHeights = _extends(
      {},
      state.elementHeights,
      pick_1(props, [
        'cellGroupWrapperHeight',
        'footerHeight',
        'groupHeaderHeight',
        'headerHeight',
      ])
    );

    if (!useGroupHeader) {
      state.elementHeights.groupHeaderHeight = 0;
    }

    state.rowSettings = _extends(
      {},
      state.rowSettings,
      pick_1(props, [
        'bufferRowCount',
        'rowHeight',
        'rowsCount',
        'subRowHeight',
      ])
    );
    let _state$rowSettings2 = state.rowSettings,
      rowHeight = _state$rowSettings2.rowHeight,
      subRowHeight = _state$rowSettings2.subRowHeight;

    state.rowSettings.rowHeightGetter =
      props.rowHeightGetter ||
      function () {
        return rowHeight;
      };

    state.rowSettings.subRowHeightGetter =
      props.subRowHeightGetter ||
      function () {
        return subRowHeight || 0;
      };

    state.rowSettings.rowAttributesGetter = props.rowAttributesGetter;
    state.scrollFlags = _extends(
      {},
      state.scrollFlags,
      pick_1(props, [
        'overflowX',
        'overflowY',
        'showScrollbarX',
        'showScrollbarY',
      ])
    );
    state.tableSize = _extends(
      {},
      state.tableSize,
      pick_1(props, ['height', 'maxHeight', 'ownerHeight', 'width'])
    );
    state.tableSize.useMaxHeight = state.tableSize.height === undefined;
    state.scrollbarXHeight = props.scrollbarXHeight;
    state.scrollbarYWidth = props.scrollbarYWidth;
  }

  let reducer = slice.reducer,
    actions = slice.actions;
  let initialize = actions.initialize,
    propChange = actions.propChange,
    scrollEnd = actions.scrollEnd,
    scrollToX = actions.scrollToX,
    scrollToY = actions.scrollToY;

  /**
   * Copyright Schrodinger, LLC
   * All rights reserved.
   *
   * @providesModule scrollActions
   */

  let getScrollActions = function getScrollActions(store, getProps) {
    let scrollActions = bindActionCreators(
      {
        scrollToX,
        scrollToY,
        scrollEnd,
      },
      store.dispatch
    );
    /**
     * Scrolls the table horizontally to position
     *
     * @param {number} scrollX
     */

    let smartScrollToX = function smartScrollToX(scrollPos) {
      let _store$getState = store.getState(),
        scrollX = _store$getState.scrollX;
      _store$getState.scrolling;

      if (scrollPos === scrollX) {
        return;
      } // This is a workaround to prevent content blurring. This happens when translate3d
      // is applied with non-rounded values to elements having text.

      let roundedScrollPos = Math.round(scrollPos);

      let _getProps = getProps(),
        onHorizontalScroll = _getProps.onHorizontalScroll;

      if (onHorizontalScroll ? onHorizontalScroll(roundedScrollPos) : true) {
        scrollActions.scrollToX(roundedScrollPos);
      }
    };
    /**
     * Scrolls the table vertically to position
     *
     * @param {number} scrollY
     */

    let smartScrollToY = function smartScrollToY(scrollPos) {
      let _store$getState2 = store.getState(),
        scrollY = _store$getState2.scrollY;

      if (scrollPos === scrollY) {
        return;
      }

      let _getProps2 = getProps(),
        onVerticalScroll = _getProps2.onVerticalScroll;

      if (onVerticalScroll ? onVerticalScroll(scrollPos) : true) {
        scrollActions.scrollToY(scrollPos);
      }
    };

    return {
      scrollToX: smartScrollToX,
      scrollToY: smartScrollToY,
      stopScroll: scrollActions.scrollEnd,
    };
  };

  let baseGetTag$1 = _baseGetTag,
    isObjectLike$1 = isObjectLike_1;

  /** `Object#toString` result references. */
  let numberTag = '[object Number]';

  /**
   * Checks if `value` is classified as a `Number` primitive or object.
   *
   * **Note:** To exclude `Infinity`, `-Infinity`, and `NaN`, which are
   * classified as numbers, use the `_.isFinite` method.
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a number, else `false`.
   * @example
   *
   * _.isNumber(3);
   * // => true
   *
   * _.isNumber(Number.MIN_VALUE);
   * // => true
   *
   * _.isNumber(Infinity);
   * // => true
   *
   * _.isNumber('3');
   * // => false
   */
  function isNumber$1(value) {
    return (
      typeof value == 'number' ||
      (isObjectLike$1(value) && baseGetTag$1(value) == numberTag)
    );
  }

  let isNumber_1 = isNumber$1;

  let isNumber = isNumber_1;

  /**
   * Checks if `value` is `NaN`.
   *
   * **Note:** This method is based on
   * [`Number.isNaN`](https://mdn.io/Number/isNaN) and is not the same as
   * global [`isNaN`](https://mdn.io/isNaN) which returns `true` for
   * `undefined` and other non-number values.
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is `NaN`, else `false`.
   * @example
   *
   * _.isNaN(NaN);
   * // => true
   *
   * _.isNaN(new Number(NaN));
   * // => true
   *
   * isNaN(undefined);
   * // => true
   *
   * _.isNaN(undefined);
   * // => false
   */
  function isNaN$1(value) {
    // An `NaN` primitive is the only value that is not equal to itself.
    // Perform the `toStringTag` check first to avoid errors with some
    // ActiveX objects in IE.
    return isNumber(value) && value != +value;
  }

  let _isNaN = isNaN$1;

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
   * @param {function} [setTimeoutFunc] - an implementation of setTimeout
   *  if nothing is passed in the default setTimeout function is used
   * @param {function} [clearTimeoutFunc] - an implementation of clearTimeout
   *  if nothing is passed in the default clearTimeout function is used
   */
  function debounce(func, wait, context, setTimeoutFunc, clearTimeoutFunc) {
    setTimeoutFunc = setTimeoutFunc || setTimeout;
    clearTimeoutFunc = clearTimeoutFunc || clearTimeout;
    let timeout;

    function debouncer() {
      for (
        var _len = arguments.length, args = new Array(_len), _key = 0;
        _key < _len;
        _key++
      ) {
        args[_key] = arguments[_key];
      }

      debouncer.reset();

      let callback = function callback() {
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

  function joinClasses(
    className
    /*, ... */
  ) {
    if (!className) {
      className = '';
    }

    let nextClass;
    let argLength = arguments.length;

    if (argLength > 1) {
      for (let ii = 1; ii < argLength; ii++) {
        nextClass = arguments[ii];

        if (nextClass) {
          className = (className ? className + ' ' : '') + nextClass;
        }
      }
    }

    return className;
  }

  /**
   * Copyright Schrodinger, LLC
   * All rights reserved.
   *
   * This source code is licensed under the BSD-style license found in the
   * LICENSE file in the root directory of this source tree. An additional grant
   * of patent rights can be found in the PATENTS file in the same directory.
   *
   * @providesModule ariaAttributes
   */
  /**
   * Calculate the aria attributes for the rows and the grid.
   *
   * @param {number} rowsCount
   * @param {boolean} useGroupHeader
   * @param {boolean} useFooter
   * @return {{
   *   ariaGroupHeaderIndex: number,
   *   ariaHeaderIndex: number,
   *   ariaFooterIndex: number,
   *   ariaRowCount: number,
   *   ariaRowIndexOffset: number
   * }}
   */

  function calculateAriaAttributes(rowsCount, useGroupHeader, useFooter) {
    // first we calculate the default attribute values (without assuming group header or footer exists)
    let ariaGroupHeaderIndex = 1;
    let ariaHeaderIndex = 1;
    let ariaFooterIndex = rowsCount + 2;
    let ariaRowCount = rowsCount + 1; // offset to add to aria-rowindex (note that aria-rowindex is 1-indexed based, and since
    // we also need to add 1 for the header, the base offset will be 2)

    let ariaRowIndexOffset = 2; // if group header exists, then increase the indices and offsets by 1

    if (useGroupHeader) {
      ariaHeaderIndex++;
      ariaRowCount++;
      ariaFooterIndex++;
      ariaRowIndexOffset++;
    } // if footer exists, then row count increases by 1

    if (useFooter) {
      ariaRowCount++;
    }

    return {
      ariaGroupHeaderIndex,
      ariaHeaderIndex,
      ariaFooterIndex,
      ariaRowCount,
      ariaRowIndexOffset,
    };
  }

  let ariaAttributesSelector = shallowEqualSelector(
    [
      function (state) {
        return state.rowsCount;
      },
      function (state) {
        return state.groupHeaderHeight > 0;
      },
      function (state) {
        return state.footerHeight > 0;
      },
    ],
    calculateAriaAttributes
  );

  /**
   * Creates a base function for methods like `_.forIn` and `_.forOwn`.
   *
   * @private
   * @param {boolean} [fromRight] Specify iterating from right to left.
   * @returns {Function} Returns the new base function.
   */

  function createBaseFor$1(fromRight) {
    return function (object, iteratee, keysFunc) {
      let index = -1,
        iterable = Object(object),
        props = keysFunc(object),
        length = props.length;

      while (length--) {
        let key = props[fromRight ? length : ++index];
        if (iteratee(iterable[key], key, iterable) === false) {
          break;
        }
      }
      return object;
    };
  }

  let _createBaseFor = createBaseFor$1;

  let createBaseFor = _createBaseFor;

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
  let baseFor$1 = createBaseFor();

  let _baseFor = baseFor$1;

  let baseFor = _baseFor,
    keys = keys_1;

  /**
   * The base implementation of `_.forOwn` without support for iteratee shorthands.
   *
   * @private
   * @param {Object} object The object to iterate over.
   * @param {Function} iteratee The function invoked per iteration.
   * @returns {Object} Returns `object`.
   */
  function baseForOwn$1(object, iteratee) {
    return object && baseFor(object, iteratee, keys);
  }

  let _baseForOwn = baseForOwn$1;

  let isArrayLike$2 = isArrayLike_1;

  /**
   * Creates a `baseEach` or `baseEachRight` function.
   *
   * @private
   * @param {Function} eachFunc The function to iterate over a collection.
   * @param {boolean} [fromRight] Specify iterating from right to left.
   * @returns {Function} Returns the new base function.
   */
  function createBaseEach$1(eachFunc, fromRight) {
    return function (collection, iteratee) {
      if (collection == null) {
        return collection;
      }
      if (!isArrayLike$2(collection)) {
        return eachFunc(collection, iteratee);
      }
      let length = collection.length,
        index = fromRight ? length : -1,
        iterable = Object(collection);

      while (fromRight ? index-- : ++index < length) {
        if (iteratee(iterable[index], index, iterable) === false) {
          break;
        }
      }
      return collection;
    };
  }

  let _createBaseEach = createBaseEach$1;

  let baseForOwn = _baseForOwn,
    createBaseEach = _createBaseEach;

  /**
   * The base implementation of `_.forEach` without support for iteratee shorthands.
   *
   * @private
   * @param {Array|Object} collection The collection to iterate over.
   * @param {Function} iteratee The function invoked per iteration.
   * @returns {Array|Object} Returns `collection`.
   */
  let baseEach$1 = createBaseEach(baseForOwn);

  let _baseEach = baseEach$1;

  let identity = identity_1;

  /**
   * Casts `value` to `identity` if it's not a function.
   *
   * @private
   * @param {*} value The value to inspect.
   * @returns {Function} Returns cast function.
   */
  function castFunction$1(value) {
    return typeof value == 'function' ? value : identity;
  }

  let _castFunction = castFunction$1;

  let arrayEach = _arrayEach,
    baseEach = _baseEach,
    castFunction = _castFunction,
    isArray$2 = isArray_1;

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
    let func = isArray$2(collection) ? arrayEach : baseEach;
    return func(collection, castFunction(iteratee));
  }

  let forEach_1 = forEach;

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
  /**
   * Lists of cell templates & component props for
   * the fixed and scrollable columns and column groups
   *
   * @param {{
   *   columnGroupProps: !Array.<!Object>,
   *   columnProps: !Array.<!Object>,
   * }} columnWidths
   * @param {{
   *   cell: !Array.<React.ReactElement>,
   *   footer: !Array.<React.ReactElement>,
   *   groupHeader: !Array.<React.ReactElement>,
   *   header: !Array.<React.ReactElement>,
   * }} elementTemplates
   * @return {{
   *   fixedColumnGroups: !Array.<cellDetails>,
   *   fixedRightColumnGroups: !Array.<cellDetails>,
   *   scrollableColumnGroups: !Array.<cellDetails>,
   *   fixedColumns: !Array.<columnDetails>,
   *   fixedRightColumns: !Array.<columnDetails>,
   *   scrollableColumns: !Array.<columnDetails>,
   * }}
   */

  function columnTemplates(columnWidths, elementTemplates) {
    let columnGroupProps = columnWidths.columnGroupProps,
      columnProps = columnWidths.columnProps; // Ugly transforms to extract data into a row consumable format.
    // TODO (jordan) figure out if this can efficiently be merged with
    // the result of convertColumnElementsToData.

    let fixedColumnGroups = [];
    let fixedRightColumnGroups = [];
    let scrollableColumnGroups = [];
    forEach_1(columnGroupProps, function (columnGroup, index) {
      let groupData = {
        props: columnGroup,
        template: elementTemplates.groupHeader[index],
      };

      if (columnGroup.fixed) {
        fixedColumnGroups.push(groupData);
      } else if (columnGroup.fixedRight) {
        fixedRightColumnGroups.push(groupData);
      } else {
        scrollableColumnGroups.push(groupData);
      }
    });
    let fixedColumns = {
      cell: [],
      header: [],
      footer: [],
    };
    let fixedRightColumns = {
      cell: [],
      header: [],
      footer: [],
    };
    let scrollableColumns = {
      cell: [],
      header: [],
      footer: [],
    };
    forEach_1(columnProps, function (column, index) {
      let columnContainer = scrollableColumns;

      if (column.fixed) {
        columnContainer = fixedColumns;
      } else if (column.fixedRight) {
        columnContainer = fixedRightColumns;
      }

      columnContainer.cell.push({
        props: column,
        template: elementTemplates.cell[index],
      });
      columnContainer.header.push({
        props: column,
        template: elementTemplates.header[index],
      });
      columnContainer.footer.push({
        props: column,
        template: elementTemplates.footer[index],
      });
    });
    return {
      fixedColumnGroups,
      fixedColumns,
      fixedRightColumnGroups,
      fixedRightColumns,
      scrollableColumnGroups,
      scrollableColumns,
    };
  }

  let columnTemplatesSelector = shallowEqualSelector(
    [
      function (state) {
        return columnWidths$1(state);
      },
      function (state) {
        return state.elementTemplates;
      },
    ],
    columnTemplates
  );

  /**
   * Checks `value` to determine whether a default value should be returned in
   * its place. The `defaultValue` is returned if `value` is `NaN`, `null`,
   * or `undefined`.
   *
   * @static
   * @memberOf _
   * @since 4.14.0
   * @category Util
   * @param {*} value The value to check.
   * @param {*} defaultValue The default value.
   * @returns {*} Returns the resolved value.
   * @example
   *
   * _.defaultTo(1, 10);
   * // => 1
   *
   * _.defaultTo(undefined, 10);
   * // => 10
   */

  function defaultTo(value, defaultValue) {
    return value == null || value !== value ? defaultValue : value;
  }

  let defaultTo_1 = defaultTo;

  /* Built-in method references for those with the same name as other `lodash` methods. */

  let nativeMax = Math.max,
    nativeMin = Math.min;

  /**
   * The base implementation of `_.inRange` which doesn't coerce arguments.
   *
   * @private
   * @param {number} number The number to check.
   * @param {number} start The start of the range.
   * @param {number} end The end of the range.
   * @returns {boolean} Returns `true` if `number` is in the range, else `false`.
   */
  function baseInRange$1(number, start, end) {
    return number >= nativeMin(start, end) && number < nativeMax(start, end);
  }

  let _baseInRange = baseInRange$1;

  let toNumber$1 = toNumber_1;

  /** Used as references for various `Number` constants. */
  let INFINITY = 1 / 0,
    MAX_INTEGER = 1.7976931348623157e308;

  /**
   * Converts `value` to a finite number.
   *
   * @static
   * @memberOf _
   * @since 4.12.0
   * @category Lang
   * @param {*} value The value to convert.
   * @returns {number} Returns the converted number.
   * @example
   *
   * _.toFinite(3.2);
   * // => 3.2
   *
   * _.toFinite(Number.MIN_VALUE);
   * // => 5e-324
   *
   * _.toFinite(Infinity);
   * // => 1.7976931348623157e+308
   *
   * _.toFinite('3.2');
   * // => 3.2
   */
  function toFinite$1(value) {
    if (!value) {
      return value === 0 ? value : 0;
    }
    value = toNumber$1(value);
    if (value === INFINITY || value === -INFINITY) {
      let sign = value < 0 ? -1 : 1;
      return sign * MAX_INTEGER;
    }
    return value === value ? value : 0;
  }

  let toFinite_1 = toFinite$1;

  let baseInRange = _baseInRange,
    toFinite = toFinite_1,
    toNumber = toNumber_1;

  /**
   * Checks if `n` is between `start` and up to, but not including, `end`. If
   * `end` is not specified, it's set to `start` with `start` then set to `0`.
   * If `start` is greater than `end` the params are swapped to support
   * negative ranges.
   *
   * @static
   * @memberOf _
   * @since 3.3.0
   * @category Number
   * @param {number} number The number to check.
   * @param {number} [start=0] The start of the range.
   * @param {number} end The end of the range.
   * @returns {boolean} Returns `true` if `number` is in the range, else `false`.
   * @see _.range, _.rangeRight
   * @example
   *
   * _.inRange(3, 2, 4);
   * // => true
   *
   * _.inRange(4, 8);
   * // => true
   *
   * _.inRange(4, 2);
   * // => false
   *
   * _.inRange(2, 2);
   * // => false
   *
   * _.inRange(1.2, 2);
   * // => true
   *
   * _.inRange(5.2, 4);
   * // => false
   *
   * _.inRange(-3, -2, -6);
   * // => true
   */
  function inRange(number, start, end) {
    start = toFinite(start);
    if (end === undefined) {
      end = start;
      start = 0;
    } else {
      end = toFinite(end);
    }
    number = toNumber(number);
    return baseInRange(number, start, end);
  }

  let inRange_1 = inRange;

  function _objectWithoutPropertiesLoose(source, excluded) {
    if (source == null) return {};
    let target = {};
    let sourceKeys = Object.keys(source);
    let key, i;

    for (i = 0; i < sourceKeys.length; i++) {
      key = sourceKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      target[key] = source[key];
    }

    return target;
  }

  function _objectWithoutProperties(source, excluded) {
    if (source == null) return {};
    let target = _objectWithoutPropertiesLoose(source, excluded);
    let key, i;

    if (Object.getOwnPropertySymbols) {
      let sourceSymbolKeys = Object.getOwnPropertySymbols(source);

      for (i = 0; i < sourceSymbolKeys.length; i++) {
        key = sourceSymbolKeys[i];
        if (excluded.indexOf(key) >= 0) continue;
        if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
        target[key] = source[key];
      }
    }

    return target;
  }

  let _excluded$6 = [
    'height',
    'width',
    'isVisible',
    'style',
    'className',
    'children',
    'columnKey',
    'columnIndex',
    'rowIndex',
    'left',
    'cellGroupType',
    'isHeader',
    'isGroupHeader',
    'maxWidth',
    'minWidth',
    'touchEnabled',
  ];

  function ownKeys$5(object, enumerableOnly) {
    let keys = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
      let symbols = Object.getOwnPropertySymbols(object);
      enumerableOnly &&
        (symbols = symbols.filter(function (sym) {
          return Object.getOwnPropertyDescriptor(object, sym).enumerable;
        })),
        keys.push.apply(keys, symbols);
    }
    return keys;
  }

  function _objectSpread$5(target) {
    for (let i = 1; i < arguments.length; i++) {
      var source = null != arguments[i] ? arguments[i] : {};
      i % 2
        ? ownKeys$5(Object(source), !0).forEach(function (key) {
            _defineProperty$1(target, key, source[key]);
          })
        : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(
            target,
            Object.getOwnPropertyDescriptors(source)
          )
        : ownKeys$5(Object(source)).forEach(function (key) {
            Object.defineProperty(
              target,
              key,
              Object.getOwnPropertyDescriptor(source, key)
            );
          });
    }
    return target;
  }

  function _createSuper$g(Derived) {
    let hasNativeReflectConstruct = _isNativeReflectConstruct$g();
    return function _createSuperInternal() {
      let Super = _getPrototypeOf(Derived),
        result;
      if (hasNativeReflectConstruct) {
        let NewTarget = _getPrototypeOf(this).constructor;
        result = Reflect.construct(Super, arguments, NewTarget);
      } else {
        result = Super.apply(this, arguments);
      }
      return _possibleConstructorReturn$2(this, result);
    };
  }

  function _isNativeReflectConstruct$g() {
    if (typeof Reflect === 'undefined' || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === 'function') return true;
    try {
      Boolean.prototype.valueOf.call(
        Reflect.construct(Boolean, [], function () {})
      );
      return true;
    } catch (e) {
      return false;
    }
  }
  /**
   * NOTE (pradeep): This component is deprecated since it uses a lot of wrapper DIV nodes for styling/layout.
   * The replacement is src/FixedDataTableCell.js which uses a single wrapper to achieve the same table cell layout.
   *
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
   *
   * @deprecated
   */

  let FixedDataTableCellDefault$1 = /*#__PURE__*/ (function (_React$Component) {
    _inherits$2(FixedDataTableCellDefault, _React$Component);

    let _super = _createSuper$g(FixedDataTableCellDefault);

    function FixedDataTableCellDefault() {
      _classCallCheck$2(this, FixedDataTableCellDefault);

      return _super.apply(this, arguments);
    }

    _createClass$2(FixedDataTableCellDefault, [
      {
        key: 'render',
        value: function render() {
          //Remove some props like columnKey and rowIndex so we don't pass it into the div
          let _this$props = this.props,
            height = _this$props.height,
            width = _this$props.width;
          _this$props.isVisible;
          let style = _this$props.style,
            className = _this$props.className,
            children = _this$props.children;
          _this$props.columnKey;
          _this$props.columnIndex;
          _this$props.rowIndex;
          _this$props.left;
          _this$props.cellGroupType;
          _this$props.isHeader;
          _this$props.isGroupHeader;
          _this$props.maxWidth;
          _this$props.minWidth;
          _this$props.touchEnabled;
          let props = _objectWithoutProperties(_this$props, _excluded$6);

          let innerStyle = _objectSpread$5(
            {
              height,
              width,
            },
            style
          );

          return /*#__PURE__*/ React__default['default'].createElement(
            'div',
            _extends({}, props, {
              className: joinClasses(
                cx('fixedDataTableCellLayout/wrap1'),
                cx('public/fixedDataTableCell/wrap1'),
                className
              ),
              style: innerStyle,
            }),
            /*#__PURE__*/ React__default['default'].createElement(
              'div',
              {
                className: joinClasses(
                  cx('fixedDataTableCellLayout/wrap2'),
                  cx('public/fixedDataTableCell/wrap2')
                ),
              },
              /*#__PURE__*/ React__default['default'].createElement(
                'div',
                {
                  className: joinClasses(
                    cx('fixedDataTableCellLayout/wrap3'),
                    cx('public/fixedDataTableCell/wrap3')
                  ),
                },
                /*#__PURE__*/ React__default['default'].createElement(
                  'div',
                  {
                    className: cx('public/fixedDataTableCell/cellContent'),
                  },
                  children
                )
              )
            )
          );
        },
      },
    ]);

    return FixedDataTableCellDefault;
  })(React__default['default'].Component);

  _defineProperty$1(FixedDataTableCellDefault$1, 'propTypes', {
    /**
     * Outer height of the cell.
     */
    height: PropTypes.number,

    /**
     * Outer width of the cell.
     */
    width: PropTypes.number,

    /**
     * Optional prop that if specified on the `Column` will be passed to the
     * cell. It can be used to uniquely identify which column is the cell is in.
     */
    columnKey: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

    /**
     * Optional prop that represents the rows index in the table.
     * For the 'cell' prop of a Column, this parameter will exist for any
     * cell in a row with a positive index.
     *
     * Below that entry point the user is welcome to consume or
     * pass the prop through at their discretion.
     */
    rowIndex: PropTypes.number,

    /**
     * Whether this cell is currently within the viewport.
     */
    isVisible: PropTypes.bool,
  });

  /**
   * Copyright (c) 2013-present, Facebook, Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */

  function componentWillMount() {
    // Call this.constructor.gDSFP to support sub-classes.
    let state = this.constructor.getDerivedStateFromProps(
      this.props,
      this.state
    );
    if (state !== null && state !== undefined) {
      this.setState(state);
    }
  }

  function componentWillReceiveProps(nextProps) {
    // Call this.constructor.gDSFP to support sub-classes.
    // Use the setState() updater to ensure state isn't stale in certain edge cases.
    function updater(prevState) {
      let state = this.constructor.getDerivedStateFromProps(
        nextProps,
        prevState
      );
      return state !== null && state !== undefined ? state : null;
    }
    // Binding "this" is important for shallow renderer support.
    this.setState(updater.bind(this));
  }

  function componentWillUpdate(nextProps, nextState) {
    try {
      var prevProps = this.props;
      var prevState = this.state;
      this.props = nextProps;
      this.state = nextState;
      this.__reactInternalSnapshotFlag = true;
      this.__reactInternalSnapshot = this.getSnapshotBeforeUpdate(
        prevProps,
        prevState
      );
    } finally {
      this.props = prevProps;
      this.state = prevState;
    }
  }

  // React may warn about cWM/cWRP/cWU methods being deprecated.
  // Add a flag to suppress these warnings for this special case.
  componentWillMount.__suppressDeprecationWarning = true;
  componentWillReceiveProps.__suppressDeprecationWarning = true;
  componentWillUpdate.__suppressDeprecationWarning = true;

  function polyfill(Component) {
    let prototype = Component.prototype;

    if (!prototype || !prototype.isReactComponent) {
      throw new Error('Can only polyfill class components');
    }

    if (
      typeof Component.getDerivedStateFromProps !== 'function' &&
      typeof prototype.getSnapshotBeforeUpdate !== 'function'
    ) {
      return Component;
    }

    // If new component APIs are defined, "unsafe" lifecycles won't be called.
    // Error if any of these lifecycles are present,
    // Because they would work differently between older and newer (16.3+) versions of React.
    let foundWillMountName = null;
    let foundWillReceivePropsName = null;
    let foundWillUpdateName = null;
    if (typeof prototype.componentWillMount === 'function') {
      foundWillMountName = 'componentWillMount';
    } else if (typeof prototype.UNSAFE_componentWillMount === 'function') {
      foundWillMountName = 'UNSAFE_componentWillMount';
    }
    if (typeof prototype.componentWillReceiveProps === 'function') {
      foundWillReceivePropsName = 'componentWillReceiveProps';
    } else if (
      typeof prototype.UNSAFE_componentWillReceiveProps === 'function'
    ) {
      foundWillReceivePropsName = 'UNSAFE_componentWillReceiveProps';
    }
    if (typeof prototype.componentWillUpdate === 'function') {
      foundWillUpdateName = 'componentWillUpdate';
    } else if (typeof prototype.UNSAFE_componentWillUpdate === 'function') {
      foundWillUpdateName = 'UNSAFE_componentWillUpdate';
    }
    if (
      foundWillMountName !== null ||
      foundWillReceivePropsName !== null ||
      foundWillUpdateName !== null
    ) {
      let componentName = Component.displayName || Component.name;
      let newApiName =
        typeof Component.getDerivedStateFromProps === 'function'
          ? 'getDerivedStateFromProps()'
          : 'getSnapshotBeforeUpdate()';

      throw Error(
        'Unsafe legacy lifecycles will not be called for components using new component APIs.\n\n' +
          componentName +
          ' uses ' +
          newApiName +
          ' but also contains the following legacy lifecycles:' +
          (foundWillMountName !== null ? '\n  ' + foundWillMountName : '') +
          (foundWillReceivePropsName !== null
            ? '\n  ' + foundWillReceivePropsName
            : '') +
          (foundWillUpdateName !== null ? '\n  ' + foundWillUpdateName : '') +
          '\n\nThe above lifecycles should be removed. Learn more about this warning here:\n' +
          'https://fb.me/react-async-component-lifecycle-hooks'
      );
    }

    // React <= 16.2 does not support static getDerivedStateFromProps.
    // As a workaround, use cWM and cWRP to invoke the new static lifecycle.
    // Newer versions of React will ignore these lifecycles if gDSFP exists.
    if (typeof Component.getDerivedStateFromProps === 'function') {
      prototype.componentWillMount = componentWillMount;
      prototype.componentWillReceiveProps = componentWillReceiveProps;
    }

    // React <= 16.2 does not support getSnapshotBeforeUpdate.
    // As a workaround, use cWU to invoke the new lifecycle.
    // Newer versions of React will ignore that lifecycle if gSBU exists.
    if (typeof prototype.getSnapshotBeforeUpdate === 'function') {
      if (typeof prototype.componentDidUpdate !== 'function') {
        throw new Error(
          'Cannot polyfill getSnapshotBeforeUpdate() for components that do not define componentDidUpdate() on the prototype'
        );
      }

      prototype.componentWillUpdate = componentWillUpdate;

      let componentDidUpdate = prototype.componentDidUpdate;

      prototype.componentDidUpdate = function componentDidUpdatePolyfill(
        prevProps,
        prevState,
        maybeSnapshot
      ) {
        // 16.3+ will not execute our will-update method;
        // It will pass a snapshot value to did-update though.
        // Older versions will require our polyfilled will-update value.
        // We need to handle both cases, but can't just check for the presence of "maybeSnapshot",
        // Because for <= 15.x versions this might be a "prevContext" object.
        // We also can't just check "__reactInternalSnapshot",
        // Because get-snapshot might return a falsy value.
        // So check for the explicit __reactInternalSnapshotFlag flag to determine behavior.
        let snapshot = this.__reactInternalSnapshotFlag
          ? this.__reactInternalSnapshot
          : maybeSnapshot;

        componentDidUpdate.call(this, prevProps, prevState, snapshot);
      };
    }

    return Component;
  }

  let _excluded$5 = [
    'height',
    'width',
    'isVisible',
    'style',
    'className',
    'children',
    'columnKey',
    'columnIndex',
    'rowIndex',
    'left',
    'cellGroupType',
    'isHeader',
    'isGroupHeader',
    'maxWidth',
    'minWidth',
    'touchEnabled',
  ];

  function ownKeys$4(object, enumerableOnly) {
    let keys = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
      let symbols = Object.getOwnPropertySymbols(object);
      enumerableOnly &&
        (symbols = symbols.filter(function (sym) {
          return Object.getOwnPropertyDescriptor(object, sym).enumerable;
        })),
        keys.push.apply(keys, symbols);
    }
    return keys;
  }

  function _objectSpread$4(target) {
    for (let i = 1; i < arguments.length; i++) {
      var source = null != arguments[i] ? arguments[i] : {};
      i % 2
        ? ownKeys$4(Object(source), !0).forEach(function (key) {
            _defineProperty$1(target, key, source[key]);
          })
        : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(
            target,
            Object.getOwnPropertyDescriptors(source)
          )
        : ownKeys$4(Object(source)).forEach(function (key) {
            Object.defineProperty(
              target,
              key,
              Object.getOwnPropertyDescriptor(source, key)
            );
          });
    }
    return target;
  }

  function _createSuper$f(Derived) {
    let hasNativeReflectConstruct = _isNativeReflectConstruct$f();
    return function _createSuperInternal() {
      let Super = _getPrototypeOf(Derived),
        result;
      if (hasNativeReflectConstruct) {
        let NewTarget = _getPrototypeOf(this).constructor;
        result = Reflect.construct(Super, arguments, NewTarget);
      } else {
        result = Super.apply(this, arguments);
      }
      return _possibleConstructorReturn$2(this, result);
    };
  }

  function _isNativeReflectConstruct$f() {
    if (typeof Reflect === 'undefined' || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === 'function') return true;
    try {
      Boolean.prototype.valueOf.call(
        Reflect.construct(Boolean, [], function () {})
      );
      return true;
    } catch (e) {
      return false;
    }
  }
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

  let FixedDataTableCellDefault = /*#__PURE__*/ (function (_React$Component) {
    _inherits$2(FixedDataTableCellDefault, _React$Component);

    let _super = _createSuper$f(FixedDataTableCellDefault);

    function FixedDataTableCellDefault() {
      _classCallCheck$2(this, FixedDataTableCellDefault);

      return _super.apply(this, arguments);
    }

    _createClass$2(FixedDataTableCellDefault, [
      {
        key: 'render',
        value: function render() {
          //Remove some props which we don't pass into div
          let _this$props = this.props,
            height = _this$props.height,
            width = _this$props.width;
          _this$props.isVisible;
          let style = _this$props.style,
            className = _this$props.className,
            children = _this$props.children;
          _this$props.columnKey;
          _this$props.columnIndex;
          _this$props.rowIndex;
          _this$props.left;
          _this$props.cellGroupType;
          _this$props.isHeader;
          _this$props.isGroupHeader;
          _this$props.maxWidth;
          _this$props.minWidth;
          _this$props.touchEnabled;
          let props = _objectWithoutProperties(_this$props, _excluded$5);

          let innerStyle = _objectSpread$4(
            {
              height,
              width,
            },
            style
          );

          return /*#__PURE__*/ React__default['default'].createElement(
            'div',
            _extends({}, props, {
              className: joinClasses(
                cx('fixedDataTableCellLayout/wrap'),
                cx('public/fixedDataTableCell/wrap'),
                cx('public/fixedDataTableCell/cellContent'),
                className
              ),
              style: innerStyle,
            }),
            children
          );
        },
      },
    ]);

    return FixedDataTableCellDefault;
  })(React__default['default'].Component);

  _defineProperty$1(FixedDataTableCellDefault, 'propTypes', {
    /**
     * Outer height of the cell.
     */
    height: PropTypes.number,

    /**
     * Outer width of the cell.
     */
    width: PropTypes.number,

    /**
     * Optional prop that if specified on the `Column` will be passed to the
     * cell. It can be used to uniquely identify which column is the cell is in.
     */
    columnKey: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

    /**
     * Optional prop that represents the rows index in the table.
     * For the 'cell' prop of a Column, this parameter will exist for any
     * cell in a row with a positive index.
     *
     * Below that entry point the user is welcome to consume or
     * pass the prop through at their discretion.
     */
    rowIndex: PropTypes.number,

    /**
     * Whether this cell is currently within the viewport.
     */
    isVisible: PropTypes.bool,
  });

  /**
   * Copyright Schrodinger, LLC
   * All rights reserved.
   *
   * This source code is licensed under the BSD-style license found in the
   * LICENSE file in the root directory of this source tree. An additional grant
   * of patent rights can be found in the PATENTS file in the same directory.
   *
   */
  let FixedDataTableContext = /*#__PURE__*/ React__default[
    'default'
  ].createContext({});

  let baseGet = _baseGet;

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
    let result = object == null ? undefined : baseGet(object, path);
    return result === undefined ? defaultValue : result;
  }

  let get_1 = get;

  function _createSuper$e(Derived) {
    let hasNativeReflectConstruct = _isNativeReflectConstruct$e();
    return function _createSuperInternal() {
      let Super = _getPrototypeOf(Derived),
        result;
      if (hasNativeReflectConstruct) {
        let NewTarget = _getPrototypeOf(this).constructor;
        result = Reflect.construct(Super, arguments, NewTarget);
      } else {
        result = Super.apply(this, arguments);
      }
      return _possibleConstructorReturn$2(this, result);
    };
  }

  function _isNativeReflectConstruct$e() {
    if (typeof Reflect === 'undefined' || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === 'function') return true;
    try {
      Boolean.prototype.valueOf.call(
        Reflect.construct(Boolean, [], function () {})
      );
      return true;
    } catch (e) {
      return false;
    }
  }
  let DRAG_SCROLL_SPEED = 15;
  let DRAG_SCROLL_BUFFER = 100;

  let DragProxy = /*#__PURE__*/ (function (_React$PureComponent) {
    _inherits$2(DragProxy, _React$PureComponent);

    let _super = _createSuper$e(DragProxy);

    function DragProxy() {
      let _this;

      _classCallCheck$2(this, DragProxy);

      for (
        var _len = arguments.length, args = new Array(_len), _key = 0;
        _key < _len;
        _key++
      ) {
        args[_key] = arguments[_key];
      }

      _this = _super.call.apply(_super, [this].concat(args));

      _defineProperty$1(_assertThisInitialized(_this), 'state', {
        displacement: 0,
      });

      _defineProperty$1(
        _assertThisInitialized(_this),
        'containerRef',
        /*#__PURE__*/ React__default['default'].createRef()
      );

      _defineProperty$1(
        _assertThisInitialized(_this),
        'onTouchEnd',
        function (ev) {
          if (_this.props.touchEnabled) ev.stopPropagation();
        }
      );

      _defineProperty$1(
        _assertThisInitialized(_this),
        'onTouchMove',
        function (ev) {
          if (_this.props.touchEnabled) ev.stopPropagation();
        }
      );

      _defineProperty$1(
        _assertThisInitialized(_this),
        'onMouseMove',
        function (deltaX) {
          _this.cursorDeltaX += deltaX * (_this.context.isRTL ? -1 : 1);
        }
      );

      _defineProperty$1(
        _assertThisInitialized(_this),
        'onMouseUp',
        function () {
          cancelAnimationFrame(_this.frameId);

          _this.setState({
            displacement: 0,
            isReordering: false,
          });

          _this.updateColumnOrder();

          _this.frameId = null;
          _this.cursorDeltaX = 0;

          _this.mouseMoveTracker.releaseMouseMoves();
        }
      );

      _defineProperty$1(
        _assertThisInitialized(_this),
        'initializeDOMMouseMoveTracker',
        function (event) {
          _this.mouseMoveTracker = new DOMMouseMoveTracker(
            _this.onMouseMove,
            _this.onMouseUp,
            document.body,
            _this.props.touchEnabled
          );

          _this.mouseMoveTracker.captureMouseMoves(event);
        }
      );

      _defineProperty$1(
        _assertThisInitialized(_this),
        'updateDisplacementPeriodically',
        function () {
          /**
           * NOTE (pradeep): We use requestAnimationFrame to update the dragged displacement periodically.
           * This occurs when the user drags the cell near the edges of the viewport.
           * We cannot rely on just `onMouseMove` alone because the user might simply keep the cursor
           * stationary at the edges of the table, which doesn't trigger an `onMouseMove` event.
           */
          _this.frameId = requestAnimationFrame(
            _this.updateDisplacementPeriodically
          );

          _this.updateDisplacementWithScroll();
        }
      );

      _defineProperty$1(
        _assertThisInitialized(_this),
        'getBoundedDeltaX',
        function (deltaX) {
          let groupWidth = 0;
          let groupStart = 0;
          let cellGroupType = _this.props.cellGroupType;
          let groupHeaderExists = _this.context.groupHeaderHeight > 0;

          if (groupHeaderExists && !_this.props.isGroupHeader) {
            // this is a normal header cell within a column group
            let group = _this.context.getColumnGroupByChild(
              _this.props.columnIndex
            );

            groupWidth = group.width;
            groupStart = group.offset;
          } else {
            // This is either a normal header cell that's not within a column group, or this is a column group header cell.
            // In either case, the bounds will be within the cell group.
            groupWidth = _this.context.getCellGroupWidth(cellGroupType);
          } // subtract current cell width to make sure the right edge doesn't go past the bounds

          let maxReachableDisplacement = groupWidth - _this.props.width;
          return clamp_1(
            deltaX,
            -_this.originalLeft + groupStart,
            -_this.originalLeft + maxReachableDisplacement + groupStart
          );
        }
      );

      _defineProperty$1(
        _assertThisInitialized(_this),
        'updateDisplacementWithScroll',
        function () {
          let scrollStart = _this.scrollStart;
          let cellGroupType = _this.props.cellGroupType;
          let _this$context = _this.context,
            scrollX = _this$context.scrollX,
            maxScrollX = _this$context.maxScrollX,
            availableScrollWidth = _this$context.availableScrollWidth;
          let deltaX = _this.cursorDeltaX; // we scroll the table if the dragged cell is part of a scrollable column and is dragged near the edges of the viewport

          if (cellGroupType === CellGroupType.SCROLLABLE) {
            // Relative dragX position on scroll
            let dragX = _this.originalLeft - scrollStart + deltaX;
            deltaX += scrollX - scrollStart; // Scroll the table left or right if we drag near the edges of the table

            if (dragX > availableScrollWidth - DRAG_SCROLL_BUFFER) {
              scrollX = Math.min(scrollX + DRAG_SCROLL_SPEED, maxScrollX);
            } else if (dragX <= DRAG_SCROLL_BUFFER) {
              scrollX = Math.max(scrollX - DRAG_SCROLL_SPEED, 0);
            }

            _this.context.scrollToX(scrollX);
          }

          deltaX = _this.getBoundedDeltaX(deltaX);

          _this.setState({
            displacement: deltaX,
          });
        }
      );

      _defineProperty$1(
        _assertThisInitialized(_this),
        'isColumnMovedToRight',
        function (deltaX) {
          return deltaX > 0;
        }
      );

      _defineProperty$1(
        _assertThisInitialized(_this),
        'isColumnMovedToLeft',
        function (deltaX) {
          return deltaX < 0;
        }
      );

      _defineProperty$1(
        _assertThisInitialized(_this),
        'updateColumnOrder',
        function () {
          let cellGroupType = _this.props.cellGroupType;

          let localOffset = _this.getBoundedDeltaX(
            _this.cursorDeltaX + _this.context.scrollX - _this.scrollStart
          ); // if we're reordering to the right, then the target point is at the right edge of the cell
          // otherwise the target point is at the left edge of the cell

          let offset =
            localOffset >= 0
              ? _this.props.width + localOffset + _this.props.left
              : localOffset + _this.props.left;
          let target;
          let targetColumnOffset;

          if (_this.props.isGroupHeader) {
            let _this$context$getColu = _this.context.getColumnGroupAtOffset(
                offset,
                cellGroupType
              ),
              columnGroup = _this$context$getColu.columnGroup,
              columnGroupOffset = _this$context$getColu.distanceFromOffset;

            target = columnGroup;
            targetColumnOffset = columnGroupOffset;
          } else {
            let _this$context$getColu2 = _this.context.getColumnAtOffset(
                offset,
                cellGroupType
              ),
              column = _this$context$getColu2.column,
              columnOffset = _this$context$getColu2.distanceFromOffset;

            target = column;
            targetColumnOffset = columnOffset;
          }

          let columnBeforeIndex = null;
          let columnAfterIndex = null; // If we're reordering to the left, the dragged cell will be dropped to the left side of the target
          // only if it goes behind the center of the target column.

          if (target.index < _this.props.columnIndex) {
            if (targetColumnOffset <= target.width / 2) {
              columnBeforeIndex = target.index - 1;
              columnAfterIndex = target.index;
            } else {
              columnBeforeIndex = target.index;
              columnAfterIndex = target.index + 1;
            }
          } else {
            // If we're reordering to the right, the dragged cell will be dropped to the right side of the target
            // only if it goes beyond the center of the target column.
            if (targetColumnOffset >= target.width / 2) {
              columnBeforeIndex = target.index;
              columnAfterIndex = target.index + 1;
            } else {
              columnBeforeIndex = target.index - 1;
              columnAfterIndex = target.index;
            }
          } // increase/decrease offset to get the column after/before the dragged cell

          if (columnBeforeIndex === _this.props.columnIndex) {
            --columnBeforeIndex;
          }

          if (columnAfterIndex === _this.props.columnIndex) {
            ++columnAfterIndex;
          }

          let columnCount = _this.props.isGroupHeader
            ? _this.context.getColumnGroupCount()
            : _this.context.getColumnCount();
          let columnBefore;
          let columnAfter; // figure out what column lies at columnBeforeIndex and columnAfterIndex

          if (inRange_1(columnBeforeIndex, 0, columnCount)) {
            columnBefore = _this.props.isGroupHeader
              ? _this.context.getColumnGroup(columnBeforeIndex)
              : _this.context.getColumn(columnBeforeIndex);
          }

          if (inRange_1(columnAfterIndex, 0, columnCount)) {
            columnAfter = _this.props.isGroupHeader
              ? _this.context.getColumnGroup(columnAfterIndex)
              : _this.context.getColumn(columnAfterIndex);
          } // let the user know that reordering has ended and supply the column before/after keys

          _this.props.onColumnReorderEnd({
            columnBefore: get_1(columnBefore, 'columnKey'),
            columnAfter: get_1(columnAfter, 'columnKey'),
            reorderColumn: _this.props.columnKey,
          });
        }
      );

      return _this;
    }

    _createClass$2(DragProxy, [
      {
        key: 'componentDidMount',
        value: function componentDidMount() {
          // the first param to cloneNode is `true` to indicate a deep clone
          let draggedContents = this.props.contents.parentNode.cloneNode(true);
          draggedContents.firstChild.classList.add(
            cx('public/fixedDataTableCell/reordering')
          );
          this.containerRef.current.appendChild(draggedContents);
          this.startDrag();
        },
      },
      {
        key: 'render',
        value: function render() {
          this.context.isRTL ? -1 : 1;
          let style = {
            position: 'absolute',
          };
          FixedDataTableTranslateDOMPosition(
            style,
            this.state.displacement,
            0,
            true,
            this.context.isRTL
          ); // render an empty placeholder which later gets injected with the dragged contents

          return /*#__PURE__*/ React__default['default'].createElement('div', {
            style,
            ref: this.containerRef,
          });
        },
      },
      {
        key: 'startDrag',
        value: function startDrag() {
          this.cursorDeltaX = 0;
          this.scrollStart = this.context.scrollX;
          this.originalLeft = this.props.left;
          this.initializeDOMMouseMoveTracker(this.props.reorderStartEvent);
          this.setState({
            displacement: 0,
            isReordering: true,
          });
          this.frameId = requestAnimationFrame(
            this.updateDisplacementPeriodically
          );
        },
      },
    ]);

    return DragProxy;
  })(React__default['default'].PureComponent);

  DragProxy.contextType = FixedDataTableContext;
  DragProxy.propTypes = {
    columnIndex: PropTypes.number.isRequired,
    columnKey: PropTypes.string.isRequired,
    contents: PropTypes.object.isRequired,
    cellGroupType: PropTypes.string,
    isGroupHeader: PropTypes.bool,
    isRTL: PropTypes.bool,
    left: PropTypes.number.isRequired,
    onColumnReorderStart: PropTypes.func.isRequired,
    reorderStartEvent: PropTypes.object.isRequired,
    touchEnabled: PropTypes.bool,
    width: PropTypes.number.isRequired,
  };

  function _createSuper$d(Derived) {
    let hasNativeReflectConstruct = _isNativeReflectConstruct$d();
    return function _createSuperInternal() {
      let Super = _getPrototypeOf(Derived),
        result;
      if (hasNativeReflectConstruct) {
        let NewTarget = _getPrototypeOf(this).constructor;
        result = Reflect.construct(Super, arguments, NewTarget);
      } else {
        result = Super.apply(this, arguments);
      }
      return _possibleConstructorReturn$2(this, result);
    };
  }

  function _isNativeReflectConstruct$d() {
    if (typeof Reflect === 'undefined' || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === 'function') return true;
    try {
      Boolean.prototype.valueOf.call(
        Reflect.construct(Boolean, [], function () {})
      );
      return true;
    } catch (e) {
      return false;
    }
  }
  // This internally doesn't use React's Context.Consumer API, but instead uses FixedDataTableContext's subscriber API to listen to changes.
  // The subscription API ensures that even if the component is rendered in an external VDOM which is not under the FDT instance, it can still detect context value changes.

  let ExternalContextProvider = /*#__PURE__*/ (function (_React$PureComponent) {
    _inherits$2(ExternalContextProvider, _React$PureComponent);

    let _super = _createSuper$d(ExternalContextProvider);

    function ExternalContextProvider(props) {
      let _this;

      _classCallCheck$2(this, ExternalContextProvider);

      _this = _super.call(this, props);
      let FixedDataTableContextValue = props.value;
      _this.unsubscribe = FixedDataTableContextValue.subscribe(function (
        contextValue
      ) {
        _this.setState({
          FixedDataTableContextValue: contextValue,
        });
      });
      _this.state = {
        FixedDataTableContextValue,
      };
      return _this;
    }

    _createClass$2(ExternalContextProvider, [
      {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
          // make sure we cleanup our subscription to FDT's context
          this.unsubscribe();
        },
      },
      {
        key: 'render',
        value: function render() {
          let FixedDataTableContextValue =
            this.state.FixedDataTableContextValue;
          return /*#__PURE__*/ React__default['default'].createElement(
            FixedDataTableContext.Provider,
            {
              value: FixedDataTableContextValue,
            },
            this.props.children
          );
        },
      },
    ]);

    return ExternalContextProvider;
  })(React__default['default'].PureComponent);

  /**
   * This method returns `undefined`.
   *
   * @static
   * @memberOf _
   * @since 2.3.0
   * @category Util
   * @example
   *
   * _.times(2, _.noop);
   * // => [undefined, undefined]
   */

  function noop() {
    // No operation performed.
  }

  let noop_1 = noop;

  let _excluded$4 = [
    'onColumnReorderStart',
    'onColumnReorderEnd',
    'reorderStartEvent',
    'children',
  ];

  function _createSuper$c(Derived) {
    let hasNativeReflectConstruct = _isNativeReflectConstruct$c();
    return function _createSuperInternal() {
      let Super = _getPrototypeOf(Derived),
        result;
      if (hasNativeReflectConstruct) {
        let NewTarget = _getPrototypeOf(this).constructor;
        result = Reflect.construct(Super, arguments, NewTarget);
      } else {
        result = Super.apply(this, arguments);
      }
      return _possibleConstructorReturn$2(this, result);
    };
  }

  function _isNativeReflectConstruct$c() {
    if (typeof Reflect === 'undefined' || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === 'function') return true;
    try {
      Boolean.prototype.valueOf.call(
        Reflect.construct(Boolean, [], function () {})
      );
      return true;
    } catch (e) {
      return false;
    }
  }
  let BORDER_WIDTH$1 = 1;
  /**
   * ![Reorder Cell](../images/ReorderCell.png "Reorder Cell")
   *
   * Cell HOC that enables reordering functionality by rendering a handle, which can be used to drag the cell around.
   *
   * Example usage:
   * ```
   * <Column
   *   columnKey="firstName"
   *   header={
   *     <Plugins.ReorderCell
   *       onColumnReorderStart={(columnKey) => {
   *         console.log("Starting reordering:", columnKey);
   *       }}
   *       onColumnReorderEnd={(columnBeforeKey, columnAfterKey, reorderColumnKey) => {
   *         console.log(columnBeforeKey, " comes before ", reorderColumnKey);
   *         console.log(columnAfterKey, " comes after ", reorderColumnKey);
   *       }}
   *     >
   *       First Name
   *     </Plugins.ReorderCell>
   *   }
   *   cell={<DataCell>Name</DataCell>}
   *   width={200}
   * />
   * ```
   *
   * Live example at https://schrodinger.github.io/fixed-data-table-2/example-reorder.html
   */

  let ReorderCell = /*#__PURE__*/ (function (_React$PureComponent) {
    _inherits$2(ReorderCell, _React$PureComponent);

    let _super = _createSuper$c(ReorderCell);

    function ReorderCell() {
      let _this;

      _classCallCheck$2(this, ReorderCell);

      for (
        var _len = arguments.length, args = new Array(_len), _key = 0;
        _key < _len;
        _key++
      ) {
        args[_key] = arguments[_key];
      }

      _this = _super.call.apply(_super, [this].concat(args));

      _defineProperty$1(_assertThisInitialized(_this), 'state', {
        isReordering: false,
      });

      _defineProperty$1(_assertThisInitialized(_this), 'dragContainer', null);

      _defineProperty$1(
        _assertThisInitialized(_this),
        'cellRef',
        /*#__PURE__*/ React__default['default'].createRef()
      );

      _defineProperty$1(_assertThisInitialized(_this), 'isMounted', false);

      _defineProperty$1(
        _assertThisInitialized(_this),
        'setReorderHandle',
        function (element) {
          if (element) {
            element.addEventListener('mousedown', _this.onMouseDown, {
              passive: false,
            });
            element.addEventListener('touchstart', _this.onTouchStart, {
              passive: false,
            });
          }
        }
      );

      _defineProperty$1(
        _assertThisInitialized(_this),
        'onTouchStart',
        function (ev) {
          if (!_this.props.touchEnabled) {
            return;
          }

          _this.onMouseDown(ev);
        }
      );

      _defineProperty$1(
        _assertThisInitialized(_this),
        'onMouseDown',
        function (event) {
          _this.onDragStart(event);
        }
      );

      _defineProperty$1(
        _assertThisInitialized(_this),
        'onDragStart',
        function (event) {
          _this.createDragContainer();

          _this.renderDragProxy(event);

          _this.props.onColumnReorderStart(_this.props.columnKey);
        }
      );

      _defineProperty$1(
        _assertThisInitialized(_this),
        'onColumnReorderEnd',
        function (ev) {
          if (_this.isMounted) {
            _this.setState({
              isReordering: false,
            });
          }

          _this.removeDragContainer();

          _this.props.onColumnReorderEnd(ev);
        }
      );

      _defineProperty$1(
        _assertThisInitialized(_this),
        'createDragContainer',
        function () {
          // create a container for the drag proxy
          _this.dragContainer = document.createElement('div'); // store the column key in the DOM to easily identify what column is being dragged around

          _this.dragContainer.dataset.columnKey = _this.props.columnKey; // Place the container inside the parent cell group so that our dragged cell ends up in the correct heirarchy.
          // This is important for correct styling and layout calculations.

          let cellGroup = _this.cellRef.current.closest(
            '.fixedDataTableCellGroupLayout_cellGroup'
          );

          cellGroup.appendChild(_this.dragContainer);
        }
      );

      _defineProperty$1(
        _assertThisInitialized(_this),
        'getDragContainer',
        function () {
          if (_this.dragContainer) {
            return _this.dragContainer;
          } // get the cell group containing our cell

          let cellGroup = _this.cellRef.current.closest(
            '.fixedDataTableCellGroupLayout_cellGroup'
          ); // find the drag container within the cell group

          _this.dragContainer = cellGroup.querySelector(
            '[data-column-key="'.concat(_this.props.columnKey, '"]')
          );
          return _this.dragContainer;
        }
      );

      _defineProperty$1(
        _assertThisInitialized(_this),
        'removeDragContainer',
        function () {
          // since the drag container is going to be removed, also unmount the drag proxy
          ReactDOM__default['default'].unmountComponentAtNode(
            _this.dragContainer
          );

          _this.dragContainer.remove();

          _this.dragContainer = null;
        }
      );

      return _this;
    }

    _createClass$2(ReorderCell, [
      {
        key: 'componentDidMount',
        value: function componentDidMount() {
          this.isMounted = true;
          /**
           * NOTE (pradeep): Important! Check if this cell was "already" being dragged by the user.
           * This is a slightly rare case, and happens under the following steps:
           *   1. User starts reordering on cell "A", which creates the draggable proxy cell "B".
           *   2. If cell B is dragged far away such that the column associated with the cell goes outside the viewport, this effectively unmounts all cells in that column, including cell "A".
           *   2. Now if the user drags cell "B" back such that the column associated with the cell becomes visible, then another instance of cell "A" will be mounted.
           *   3. The new instance of cell "A" now needs to figure out that the dragged proxy cell "B" already exists, and if so it should be in a reordering state.
           */

          let draggedCellColumnKey = get_1(
            this.getDragContainer(),
            'dataset.columnKey'
          );
          let isReordering =
            toString_1(this.props.columnKey) === draggedCellColumnKey;

          if (isReordering) {
            // NOTE (pradeep): rerender the drag proxy to alert it that this instance is the new parent
            this.renderDragProxy({});
            this.setState({
              isReordering: true,
            });
          }
        },
      },
      {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
          this.isMounted = false;
        },
      },
      {
        key: 'render',
        value: function render() {
          if (this.state.isReordering) {
            // If we're in the middle of reordering then return null here.
            // The rendering responsibility will instead be taken care of by the drag proxy instead.
            return null;
          }

          let _this$props = this.props;
          _this$props.onColumnReorderStart;
          _this$props.onColumnReorderEnd;
          _this$props.reorderStartEvent;
          let children = _this$props.children,
            props = _objectWithoutProperties(_this$props, _excluded$4);

          let className = joinClasses(
            cx({
              'public/fixedDataTableCell/resizeReorderCellContainer': true,
            }),
            props.className
          );
          let reorderClasses = joinClasses(
            className,
            cx({
              'public/fixedDataTableCell/hasReorderHandle': true,
            })
          );
          let style = {
            height: props.height,
            width: props.width - BORDER_WIDTH$1,
          };
          let content;

          if (
            /*#__PURE__*/ React__default['default'].isValidElement(children)
          ) {
            content = /*#__PURE__*/ React__default['default'].cloneElement(
              children,
              props
            );
          } else if (typeof children === 'function') {
            content = children(props);
          } else {
            content = /*#__PURE__*/ React__default['default'].createElement(
              FixedDataTableCellDefault,
              props,
              children
            );
          }

          return /*#__PURE__*/ React__default['default'].createElement(
            'div',
            {
              className: reorderClasses,
              style,
              ref: this.cellRef,
            },
            this.renderReorderHandle(),
            content
          );
        },
      },
      {
        key: 'renderReorderHandle',
        value: function renderReorderHandle() {
          let style = {
            height: this.props.height,
          };
          return /*#__PURE__*/ React__default['default'].createElement('div', {
            ref: this.setReorderHandle,
            className: cx({
              'fixedDataTableCellLayout/columnReorderContainer': true,
              'fixedDataTableCellLayout/columnReorderContainer/active': false,
            }),
            style,
          });
        },
      },
      {
        key: 'renderDragProxy',
        value:
          /**
           * Render a proxy version of our cell that can be dragged around without repercussions to component unmounts.
           */
          function renderDragProxy(reorderStartEvent) {
            let _this2 = this;

            let additionalProps = {
              isDragProxy: true,
              reorderStartEvent,
              onColumnReorderEnd: this.onColumnReorderEnd,
              contents: this.cellRef.current,
            };
            ReactDOM__default['default'].render(
              /*#__PURE__*/
              // Since we're effectively rendering the proxy in a separate VDOM root, we cannot directly pass in our context.
              // To solve this, we use ExternalContextProvider to pass down the context value.
              // ExternalContextProvider also ensures that even if our cell gets unmounted, the dragged cell still receives updates from context.
              React__default['default'].createElement(
                ExternalContextProvider,
                {
                  value: this.context,
                },
                /*#__PURE__*/ React__default['default'].createElement(
                  DragProxy,
                  _extends({}, this.props, additionalProps)
                )
              ),
              this.getDragContainer(), // we consider our cell in a reordering state as soon as the drag proxy gets mounted
              function () {
                return _this2.setState({
                  isReordering: true,
                });
              }
            );
          },
      },
    ]);

    return ReorderCell;
  })(React__default['default'].PureComponent);

  ReorderCell.contextType = FixedDataTableContext;
  ReorderCell.defaultProps = {
    onColumnReorderStart: noop_1,
  };
  ReorderCell.propTypes = {
    /**
     * Outer height of the cell.
     */
    height: PropTypes.number,

    /**
     * Outer width of the cell.
     */
    width: PropTypes.number,

    /**
     * Optional prop that if specified on the `Column` will be passed to the
     * cell. It can be used to uniquely identify which column is the cell is in.
     */
    columnKey: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

    /**
     * Optional prop that represents the rows index in the table.
     * For the 'cell' prop of a Column, this parameter will exist for any
     * cell in a row with a positive index.
     *
     * Below that entry point the user is welcome to consume or
     * pass the prop through at their discretion.
     */
    rowIndex: PropTypes.number,

    /**
     * The left offset in pixels of the cell.
     * Space between cell's left edge and left edge of table
     */
    left: PropTypes.number,

    /**
     * Whether touch is enabled or not.
     */
    touchEnabled: PropTypes.bool,

    /**
     * The minimum width of the column.
     */
    minWidth: PropTypes.number,

    /**
     * The maximum width of the column.
     */
    maxWidth: PropTypes.number,

    /**
     * Callback function which is called when reordering starts
     * ```
     * function(columnKey: string)
     * ```
     */
    onColumnReorderStart: PropTypes.func,

    /**
     * Callback function which is called when reordering ends
     * ```
     * function({columnBefore: string, columnAfter: string, reorderColumn: string})
     * ```
     */
    onColumnReorderEnd: PropTypes.func.isRequired,
  };

  let canUseDOM = !!(
    typeof window !== 'undefined' &&
    window.document &&
    window.document.createElement
  );

  let _createClass$1 = (function () {
    function defineProperties(target, props) {
      for (let i = 0; i < props.length; i++) {
        let descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ('value' in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }
    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  })();

  function _classCallCheck$1(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError('Cannot call a class as a function');
    }
  }

  function _possibleConstructorReturn$1(self, call) {
    if (!self) {
      throw new ReferenceError(
        "this hasn't been initialised - super() hasn't been called"
      );
    }
    return call && (typeof call === 'object' || typeof call === 'function')
      ? call
      : self;
  }

  function _inherits$1(subClass, superClass) {
    if (typeof superClass !== 'function' && superClass !== null) {
      throw new TypeError(
        'Super expression must either be null or a function, not ' +
          typeof superClass
      );
    }
    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true,
      },
    });
    if (superClass)
      Object.setPrototypeOf
        ? Object.setPrototypeOf(subClass, superClass)
        : (subClass.__proto__ = superClass);
  }

  let Portal$3 = (function (_React$Component) {
    _inherits$1(Portal, _React$Component);

    function Portal() {
      _classCallCheck$1(this, Portal);

      return _possibleConstructorReturn$1(
        this,
        (Portal.__proto__ || Object.getPrototypeOf(Portal)).apply(
          this,
          arguments
        )
      );
    }

    _createClass$1(Portal, [
      {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
          if (this.defaultNode) {
            document.body.removeChild(this.defaultNode);
          }
          this.defaultNode = null;
        },
      },
      {
        key: 'render',
        value: function render() {
          if (!canUseDOM) {
            return null;
          }
          if (!this.props.node && !this.defaultNode) {
            this.defaultNode = document.createElement('div');
            document.body.appendChild(this.defaultNode);
          }
          return ReactDOM__default['default'].createPortal(
            this.props.children,
            this.props.node || this.defaultNode
          );
        },
      },
    ]);

    return Portal;
  })(React__default['default'].Component);

  Portal$3.propTypes = {
    children: PropTypes.node.isRequired,
    node: PropTypes.any,
  };

  let Portalv4 = Portal$3;

  let _createClass = (function () {
    function defineProperties(target, props) {
      for (let i = 0; i < props.length; i++) {
        let descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ('value' in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }
    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  })();

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError('Cannot call a class as a function');
    }
  }

  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError(
        "this hasn't been initialised - super() hasn't been called"
      );
    }
    return call && (typeof call === 'object' || typeof call === 'function')
      ? call
      : self;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== 'function' && superClass !== null) {
      throw new TypeError(
        'Super expression must either be null or a function, not ' +
          typeof superClass
      );
    }
    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true,
      },
    });
    if (superClass)
      Object.setPrototypeOf
        ? Object.setPrototypeOf(subClass, superClass)
        : (subClass.__proto__ = superClass);
  }

  let Portal$2 = (function (_React$Component) {
    _inherits(Portal, _React$Component);

    function Portal() {
      _classCallCheck(this, Portal);

      return _possibleConstructorReturn(
        this,
        (Portal.__proto__ || Object.getPrototypeOf(Portal)).apply(
          this,
          arguments
        )
      );
    }

    _createClass(Portal, [
      {
        key: 'componentDidMount',
        value: function componentDidMount() {
          this.renderPortal();
        },
      },
      {
        key: 'componentDidUpdate',
        value: function componentDidUpdate(props) {
          this.renderPortal();
        },
      },
      {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
          ReactDOM__default['default'].unmountComponentAtNode(
            this.defaultNode || this.props.node
          );
          if (this.defaultNode) {
            document.body.removeChild(this.defaultNode);
          }
          this.defaultNode = null;
          this.portal = null;
        },
      },
      {
        key: 'renderPortal',
        value: function renderPortal(props) {
          if (!this.props.node && !this.defaultNode) {
            this.defaultNode = document.createElement('div');
            document.body.appendChild(this.defaultNode);
          }

          let children = this.props.children;
          // https://gist.github.com/jimfb/d99e0678e9da715ccf6454961ef04d1b
          if (typeof this.props.children.type === 'function') {
            children = React__default['default'].cloneElement(
              this.props.children
            );
          }

          this.portal = ReactDOM__default[
            'default'
          ].unstable_renderSubtreeIntoContainer(
            this,
            children,
            this.props.node || this.defaultNode
          );
        },
      },
      {
        key: 'render',
        value: function render() {
          return null;
        },
      },
    ]);

    return Portal;
  })(React__default['default'].Component);

  let LegacyPortal = Portal$2;

  Portal$2.propTypes = {
    children: PropTypes.node.isRequired,
    node: PropTypes.any,
  };

  let Portal = void 0;

  if (ReactDOM__default['default'].createPortal) {
    Portal = Portalv4;
  } else {
    Portal = LegacyPortal;
  }

  let Portal$1 = Portal;

  function _createSuper$b(Derived) {
    let hasNativeReflectConstruct = _isNativeReflectConstruct$b();
    return function _createSuperInternal() {
      let Super = _getPrototypeOf(Derived),
        result;
      if (hasNativeReflectConstruct) {
        let NewTarget = _getPrototypeOf(this).constructor;
        result = Reflect.construct(Super, arguments, NewTarget);
      } else {
        result = Super.apply(this, arguments);
      }
      return _possibleConstructorReturn$2(this, result);
    };
  }

  function _isNativeReflectConstruct$b() {
    if (typeof Reflect === 'undefined' || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === 'function') return true;
    try {
      Boolean.prototype.valueOf.call(
        Reflect.construct(Boolean, [], function () {})
      );
      return true;
    } catch (e) {
      return false;
    }
  }

  let ResizerLine = /*#__PURE__*/ (function (_React$PureComponent) {
    _inherits$2(ResizerLine, _React$PureComponent);

    let _super = _createSuper$b(ResizerLine);

    function ResizerLine() {
      _classCallCheck$2(this, ResizerLine);

      return _super.apply(this, arguments);
    }

    _createClass$2(ResizerLine, [
      {
        key: 'render',
        value: function render() {
          if (!this.props.visible) {
            return null;
          }

          let style = {
            height: this.props.height,
            top: this.props.top,
            left: this.props.left,
          };
          return /*#__PURE__*/ React__default['default'].createElement(
            Portal$1,
            null,
            /*#__PURE__*/ React__default['default'].createElement(
              'div',
              {
                className: joinClasses(
                  cx('fixedDataTableColumnResizerLineLayout/main'),
                  cx('public/fixedDataTableColumnResizerLine/main')
                ),
                style,
              },
              /*#__PURE__*/ React__default['default'].createElement('div', {
                className: cx(
                  'fixedDataTableColumnResizerLineLayout/mouseArea'
                ),
                style: {
                  height: this.props.height,
                },
              })
            )
          );
        },
      },
    ]);

    return ResizerLine;
  })(React__default['default'].PureComponent);

  _defineProperty$1(ResizerLine, 'propTypes', {
    /**
     *  It is true if columnResizing is true in ResizerKnob due to mouse down event
     */
    visible: PropTypes.bool.isRequired,

    /**
     * This is the height of the line
     */
    height: PropTypes.number.isRequired,

    /**
     * Left position of ResizerLine
     */
    left: PropTypes.number.isRequired,

    /**
     * Top position of resizer line
     */
    top: PropTypes.number.isRequired,
  });

  function ownKeys$3(object, enumerableOnly) {
    let keys = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
      let symbols = Object.getOwnPropertySymbols(object);
      enumerableOnly &&
        (symbols = symbols.filter(function (sym) {
          return Object.getOwnPropertyDescriptor(object, sym).enumerable;
        })),
        keys.push.apply(keys, symbols);
    }
    return keys;
  }

  function _objectSpread$3(target) {
    for (let i = 1; i < arguments.length; i++) {
      var source = null != arguments[i] ? arguments[i] : {};
      i % 2
        ? ownKeys$3(Object(source), !0).forEach(function (key) {
            _defineProperty$1(target, key, source[key]);
          })
        : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(
            target,
            Object.getOwnPropertyDescriptors(source)
          )
        : ownKeys$3(Object(source)).forEach(function (key) {
            Object.defineProperty(
              target,
              key,
              Object.getOwnPropertyDescriptor(source, key)
            );
          });
    }
    return target;
  }

  function _createSuper$a(Derived) {
    let hasNativeReflectConstruct = _isNativeReflectConstruct$a();
    return function _createSuperInternal() {
      let Super = _getPrototypeOf(Derived),
        result;
      if (hasNativeReflectConstruct) {
        let NewTarget = _getPrototypeOf(this).constructor;
        result = Reflect.construct(Super, arguments, NewTarget);
      } else {
        result = Super.apply(this, arguments);
      }
      return _possibleConstructorReturn$2(this, result);
    };
  }

  function _isNativeReflectConstruct$a() {
    if (typeof Reflect === 'undefined' || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === 'function') return true;
    try {
      Boolean.prototype.valueOf.call(
        Reflect.construct(Boolean, [], function () {})
      );
      return true;
    } catch (e) {
      return false;
    }
  }

  let ResizerKnob = /*#__PURE__*/ (function (_React$PureComponent) {
    _inherits$2(ResizerKnob, _React$PureComponent);

    let _super = _createSuper$a(ResizerKnob);

    /**
     * Ref to ResizerKnob
     * @type {HTMLDivElement}
     */

    /**
     *
     * @type {DOMMouseMoveTracker}
     */
    function ResizerKnob(props) {
      let _this;

      _classCallCheck$2(this, ResizerKnob);

      _this = _super.call(this, props);

      _defineProperty$1(_assertThisInitialized(_this), 'initialState', {
        /**
         * @type {boolean} Set true when column resizing starts. It is used to make ResizerLine visible.
         */
        isColumnResizing: false,

        /**
         * @type {number} X coordinate of ResizerLine during resizing. It is passed do to ResizerLine to render at appropriate position.
         */
        currentMouseXCoordinate: 0,

        /**
         * @type {number} Total displacement of mouse calculated from initial position when resizing started
         */
        totalDisplacement: 0,

        /**
         * @type {number} Top position of ResizerKnow. It is passed to ResizerLine to render at appropriate position.
         */
        top: 0,
      });

      _defineProperty$1(
        _assertThisInitialized(_this),
        'state',
        _objectSpread$3({}, _this.initialState)
      );

      _defineProperty$1(_assertThisInitialized(_this), 'resizerKnobRef', null);

      _defineProperty$1(
        _assertThisInitialized(_this),
        'mouseMoveTracker',
        null
      );

      _defineProperty$1(
        _assertThisInitialized(_this),
        'setResizerKnobRef',
        function (element) {
          _this.resizerKnobRef = element;
        }
      );

      _defineProperty$1(
        _assertThisInitialized(_this),
        'initializeDOMMouseMoveTracker',
        function (event) {
          _this.mouseMoveTracker = new DOMMouseMoveTracker(
            _this.onMouseMove,
            _this.onMouseUp,
            document.body,
            _this.props.touchEnabled
          );

          _this.mouseMoveTracker.captureMouseMoves(event);
        }
      );

      _defineProperty$1(
        _assertThisInitialized(_this),
        'onTouchStart',
        function (event) {
          if (_this.props.touchEnabled) {
            _this.onMouseDown(event);
          }
        }
      );

      _defineProperty$1(
        _assertThisInitialized(_this),
        'onMouseDown',
        function (ev) {
          _this.initializeDOMMouseMoveTracker(ev);

          let initialMouseXCoordinate =
            FixedDataTableEventHelper.getCoordinatesFromEvent(ev).x;

          _this.setState({
            initialMouseXCoordinate,
            isColumnResizing: true,
            totalDisplacement: 0,
            currentMouseXCoordinate: initialMouseXCoordinate,
          });
        }
      );

      _defineProperty$1(
        _assertThisInitialized(_this),
        'onMouseUp',
        function () {
          let _this$getMinMaxWidth = _this.getMinMaxWidth(),
            minWidth = _this$getMinMaxWidth.minWidth,
            maxWidth = _this$getMinMaxWidth.maxWidth;

          let newWidth = clamp$1(
            _this.props.width +
              _this.state.totalDisplacement * (_this.props.isRTL ? -1 : 1),
            minWidth,
            maxWidth
          );

          _this.mouseMoveTracker.releaseMouseMoves();

          _this.setState(
            {
              isColumnResizing: false,
              totalDisplacement: 0,
            },
            function () {
              _this.props.onColumnResizeEnd(newWidth, _this.props.columnKey);
            }
          );
        }
      );

      _defineProperty$1(
        _assertThisInitialized(_this),
        'onMouseMove',
        function (displacementX) {
          let _this$props = _this.props,
            isRTL = _this$props.isRTL,
            width = _this$props.width;
          let _this$state = _this.state,
            initialMouseXCoordinate = _this$state.initialMouseXCoordinate,
            previousTotalDisplacement = _this$state.totalDisplacement; // displacementX is negative if movement is in left direction

          let newTotalDisplacement = previousTotalDisplacement + displacementX;
          let newResizerLineXCoordinate =
            initialMouseXCoordinate + newTotalDisplacement;

          let _this$getMinMaxWidth2 = _this.getMinMaxWidth(),
            minWidth = _this$getMinMaxWidth2.minWidth,
            maxWidth = _this$getMinMaxWidth2.maxWidth;

          let currentWidth = width + newTotalDisplacement * (isRTL ? -1 : 1); // Limit the resizer line to not move ahead or back of maxWidth and minWidth respectively

          if (currentWidth < minWidth || currentWidth > maxWidth) {
            // If new position is going out of bounds, instead of updating,  use the previous value
            newResizerLineXCoordinate = _this.state.currentMouseXCoordinate;
          }

          _this.setState({
            totalDisplacement: newTotalDisplacement,
            currentMouseXCoordinate: newResizerLineXCoordinate,
          });
        }
      );

      _defineProperty$1(
        _assertThisInitialized(_this),
        'getMinMaxWidth',
        function () {
          return {
            minWidth: _this.props.minWidth || 0,
            maxWidth: _this.props.maxWidth || Number.MAX_SAFE_INTEGER,
          };
        }
      );

      _defineProperty$1(
        _assertThisInitialized(_this),
        'suppressEventIfInTouchMode',
        function (event) {
          if (!_this.props.touchEnabled) {
            return;
          }

          event.preventDefault();
          event.stopPropagation();
        }
      );

      return _this;
    }

    _createClass$2(ResizerKnob, [
      {
        key: 'componentDidMount',
        value: function componentDidMount() {
          this.setState({
            top: this.resizerKnobRef.getBoundingClientRect().top,
          });
          this.setupHandlers();
        },
      },
      {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
          this.cleanupHandlers();
        },
      },
      {
        key: 'render',
        value: function render() {
          let resizerKnobStyle = {
            height: this.props.height,
          };
          let resizerLine = /*#__PURE__*/ React__default[
            'default'
          ].createElement(ResizerLine, {
            height: this.props.resizerLineHeight,
            visible: !!this.state.isColumnResizing,
            left: this.state.currentMouseXCoordinate,
            top: this.state.top,
          });
          return /*#__PURE__*/ React__default['default'].createElement(
            'div',
            {
              className: cx('fixedDataTableCellLayout/columnResizerContainer'),
              ref: this.setResizerKnobRef,
              style: resizerKnobStyle,
            },
            resizerLine
          );
        },
      },
      {
        key: 'setupHandlers',
        value: function setupHandlers() {
          this.resizerKnobRef.addEventListener('mousedown', this.onMouseDown, {
            passive: false,
          });
          this.resizerKnobRef.addEventListener(
            'touchstart',
            this.onTouchStart,
            {
              passive: false,
            }
          );
          this.resizerKnobRef.addEventListener(
            'touchmove',
            this.suppressEventIfInTouchMode,
            {
              passive: false,
            }
          );
          this.resizerKnobRef.addEventListener(
            'touchend',
            this.suppressEventIfInTouchMode,
            {
              passive: false,
            }
          );
        },
      },
      {
        key: 'cleanupHandlers',
        value: function cleanupHandlers() {
          this.resizerKnobRef.removeEventListener(
            'mousedown',
            this.onMouseDown,
            {
              passive: false,
            }
          );
          this.resizerKnobRef.removeEventListener(
            'touchstart',
            this.onTouchStart,
            {
              passive: false,
            }
          );
          this.resizerKnobRef.removeEventListener(
            'touchmove',
            this.suppressEventIfInTouchMode,
            {
              passive: false,
            }
          );
          this.resizerKnobRef.removeEventListener(
            'touchend',
            this.suppressEventIfInTouchMode,
            {
              passive: false,
            }
          );
        },
        /**
         * Registers event listeners for mouse tracking
         * @param {MouseEvent} event
         */
      },
    ]);

    return ResizerKnob;
  })(React__default['default'].PureComponent);

  ResizerKnob.propTypes = {
    /**
     * Optional prop that if specified on the `Column` will be passed to the
     * cell. It can be used to uniquely identify which column is the cell is in.
     */
    columnKey: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
      .isRequired,

    /**
     * The minimum width of the column.
     */
    minWidth: PropTypes.number,

    /**
     * The maximum width of the column.
     */
    maxWidth: PropTypes.number,

    /**
     * Outer width of the cell.
     */
    width: PropTypes.number.isRequired,

    /**
     * Line of resizing line
     */
    resizerLineHeight: PropTypes.number.isRequired,

    /**
     * Whether touch is enabled or not.
     */
    touchEnabled: PropTypes.bool,

    /**
     * True if FDT has right to left orientation
     */
    isRTL: PropTypes.bool,

    /**
     * Callback function which is called when reordering ends
     */
    onColumnResizeEnd: PropTypes.func.isRequired,

    /**
     * Outer height of the cell.
     */
    height: PropTypes.number.isRequired,
  };

  let _excluded$3 = [
    'children',
    'minWidth',
    'maxWidth',
    'onColumnResizeEnd',
    'onColumnReorderEnd',
    'rowIndex',
    'left',
    'touchEnabled',
    'cellGroupType',
    'onColumnReorderStart',
  ];

  function _createSuper$9(Derived) {
    let hasNativeReflectConstruct = _isNativeReflectConstruct$9();
    return function _createSuperInternal() {
      let Super = _getPrototypeOf(Derived),
        result;
      if (hasNativeReflectConstruct) {
        let NewTarget = _getPrototypeOf(this).constructor;
        result = Reflect.construct(Super, arguments, NewTarget);
      } else {
        result = Super.apply(this, arguments);
      }
      return _possibleConstructorReturn$2(this, result);
    };
  }

  function _isNativeReflectConstruct$9() {
    if (typeof Reflect === 'undefined' || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === 'function') return true;
    try {
      Boolean.prototype.valueOf.call(
        Reflect.construct(Boolean, [], function () {})
      );
      return true;
    } catch (e) {
      return false;
    }
  }
  let BORDER_WIDTH = 1;
  /**
   * ![Resize Cell](../images/ResizeCell.png "Resize Cell")
   *
   * Cell HOC that enables resizing functionality by rendering a draggable handle.
   *
   * Example usage:
   * ```
   * <Column
   *   columnKey="firstName"
   *   header={
   *     <ResizeCell
   *       onColumnResizeEnd={(newWidth, columnKey) => {
   *         console.log("New width: ", newWidth);
   *       }}
   *       minWidth={50}
   *       maxWidth={300}
   *     >
   *       First Name
   *     </ResizeCell>
   *   }
   *   cell={<DataCell>Name</DataCell>}
   *   width={150}
   * />
   * ```
   *
   * Live example at https://schrodinger.github.io/fixed-data-table-2/example-resize.html
   */

  let ResizeCell = /*#__PURE__*/ (function (_React$PureComponent) {
    _inherits$2(ResizeCell, _React$PureComponent);

    let _super = _createSuper$9(ResizeCell);

    function ResizeCell() {
      _classCallCheck$2(this, ResizeCell);

      return _super.apply(this, arguments);
    }

    _createClass$2(ResizeCell, [
      {
        key: 'render',
        value: function render() {
          let _this$props = this.props,
            children = _this$props.children;
          _this$props.minWidth;
          _this$props.maxWidth;
          _this$props.onColumnResizeEnd;
          _this$props.onColumnReorderEnd;
          _this$props.rowIndex;
          _this$props.left;
          _this$props.touchEnabled;
          _this$props.cellGroupType;
          _this$props.onColumnReorderStart;
          let props = _objectWithoutProperties(_this$props, _excluded$3);

          ({
            height: props.height,
            width: props.width - BORDER_WIDTH,
          });

          if (this.context.isRTL);

          let content;

          if (
            /*#__PURE__*/ React__default['default'].isValidElement(children)
          ) {
            content = /*#__PURE__*/ React__default['default'].cloneElement(
              children,
              props
            );
          } else if (typeof children === 'function') {
            content = children(props);
          } else {
            content = /*#__PURE__*/ React__default['default'].createElement(
              FixedDataTableCellDefault,
              props,
              children
            );
          }

          return /*#__PURE__*/ React__default['default'].createElement(
            React__default['default'].Fragment,
            null,
            /*#__PURE__*/ React__default['default'].createElement(ResizerKnob, {
              height: this.props.height,
              resizerLineHeight: this.context.tableHeight,
              onColumnResizeEnd: this.props.onColumnResizeEnd,
              width: this.props.width,
              minWidth: this.props.minWidth,
              maxWidth: this.props.maxWidth,
              columnKey: this.props.columnKey,
              touchEnabled: this.props.touchEnabled,
              isRTL: this.context.isRTL,
            }),
            content
          );
        },
      },
    ]);

    return ResizeCell;
  })(React__default['default'].PureComponent);

  ResizeCell.contextType = FixedDataTableContext;
  ResizeCell.propTypes = {
    /**
     * Optional prop that if specified on the `Column` will be passed to the
     * cell. It can be used to uniquely identify which column is the cell is in.
     */
    columnKey: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

    /**
     * The minimum width of the column.
     */
    minWidth: PropTypes.number,

    /**
     * The maximum width of the column.
     */
    maxWidth: PropTypes.number,

    /**
     * Outer width of the cell.
     */
    width: PropTypes.number,

    /**
     * Whether touch is enabled or not.
     */
    touchEnabled: PropTypes.bool,

    /**
     * True if FDT has right to left orientation
     */
    isRTL: PropTypes.bool,

    /**
     * Callback function which is called when reordering ends
     *
     * ```
     * function(newWidth: number, columnKey: string)
     * ```
     */
    onColumnResizeEnd: PropTypes.func.isRequired,

    /**
     * Outer height of the cell.
     */
    height: PropTypes.number,
  };

  let _excluded$2 = ['cell'],
    _excluded2 = ['cell'],
    _excluded3 = [
      'height',
      'width',
      'columnIndex',
      'isVisible',
      'columnKey',
      'isHeaderOrFooter',
      'touchEnabled',
    ];

  function ownKeys$2(object, enumerableOnly) {
    let keys = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
      let symbols = Object.getOwnPropertySymbols(object);
      enumerableOnly &&
        (symbols = symbols.filter(function (sym) {
          return Object.getOwnPropertyDescriptor(object, sym).enumerable;
        })),
        keys.push.apply(keys, symbols);
    }
    return keys;
  }

  function _objectSpread$2(target) {
    for (let i = 1; i < arguments.length; i++) {
      var source = null != arguments[i] ? arguments[i] : {};
      i % 2
        ? ownKeys$2(Object(source), !0).forEach(function (key) {
            _defineProperty$1(target, key, source[key]);
          })
        : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(
            target,
            Object.getOwnPropertyDescriptors(source)
          )
        : ownKeys$2(Object(source)).forEach(function (key) {
            Object.defineProperty(
              target,
              key,
              Object.getOwnPropertyDescriptor(source, key)
            );
          });
    }
    return target;
  }

  function _createSuper$8(Derived) {
    let hasNativeReflectConstruct = _isNativeReflectConstruct$8();
    return function _createSuperInternal() {
      let Super = _getPrototypeOf(Derived),
        result;
      if (hasNativeReflectConstruct) {
        let NewTarget = _getPrototypeOf(this).constructor;
        result = Reflect.construct(Super, arguments, NewTarget);
      } else {
        result = Super.apply(this, arguments);
      }
      return _possibleConstructorReturn$2(this, result);
    };
  }

  function _isNativeReflectConstruct$8() {
    if (typeof Reflect === 'undefined' || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === 'function') return true;
    try {
      Boolean.prototype.valueOf.call(
        Reflect.construct(Boolean, [], function () {})
      );
      return true;
    } catch (e) {
      return false;
    }
  }

  let FixedDataTableCell = /*#__PURE__*/ (function (_React$Component) {
    _inherits$2(FixedDataTableCell, _React$Component);

    let _super = _createSuper$8(FixedDataTableCell);

    function FixedDataTableCell() {
      _classCallCheck$2(this, FixedDataTableCell);

      return _super.apply(this, arguments);
    }

    _createClass$2(FixedDataTableCell, [
      {
        key: 'shouldComponentUpdate',
        value:
          /**
           * PropTypes are disabled in this component, because having them on slows
           * down the FixedDataTable hugely in DEV mode. You can enable them back for
           * development, but please don't commit this component with enabled propTypes.
           */
          function shouldComponentUpdate(nextProps) {
            if (
              nextProps.isScrolling &&
              this.props.rowIndex === nextProps.rowIndex &&
              this.props.isVisible === nextProps.isVisible
            ) {
              return false;
            } //Performance check not enabled

            if (!nextProps.pureRendering) {
              return true;
            }

            let _this$props = this.props,
              oldCell = _this$props.cell,
              oldProps = _objectWithoutProperties(_this$props, _excluded$2);

            let newCell = nextProps.cell,
              newProps = _objectWithoutProperties(nextProps, _excluded2);

            if (!shallowEqual(oldProps, newProps)) {
              return true;
            }

            if (!oldCell || !newCell || oldCell.type !== newCell.type) {
              return true;
            }

            if (!shallowEqual(oldCell.props, newCell.props)) {
              return true;
            }

            return false;
          },
      },
      {
        key: 'render',
        value: function render() /*object*/
        {
          let _this$props2 = this.props,
            height = _this$props2.height,
            width = _this$props2.width;
          _this$props2.columnIndex;
          let isVisible = _this$props2.isVisible;
          _this$props2.columnKey;
          let isHeaderOrFooter = _this$props2.isHeaderOrFooter,
            touchEnabled = _this$props2.touchEnabled,
            props = _objectWithoutProperties(_this$props2, _excluded3);

          let style = {
            height,
            width,
          };

          if (this.props.isRTL) {
            style.right = props.left;
          } else {
            style.left = props.left;
          }

          let className = joinClasses(
            cx({
              'fixedDataTableCellLayout/main': true,
              'fixedDataTableCellLayout/lastChild': props.lastChild,
              'fixedDataTableCellLayout/alignRight': props.align === 'right',
              'fixedDataTableCellLayout/alignCenter': props.align === 'center',
              'public/fixedDataTableCell/alignRight': props.align === 'right',
              'public/fixedDataTableCell/highlighted': props.highlighted,
              'public/fixedDataTableCell/main': true,
            }),
            props.className
          );
          let cellProps = {
            touchEnabled,
            isVisible,
            isHeader: this.props.isHeader,
            isGroupHeader: this.props.isGroupHeader,
            cellGroupType: this.props.cellGroupType,
            columnIndex: this.props.columnIndex,
            columnKey: this.props.columnKey,
            height: this.props.height,
            width: this.props.width,
            left: this.props.left,
          };

          if (props.rowIndex >= 0) {
            cellProps.rowIndex = props.rowIndex;
          }

          let content;

          if (
            this.props.isHeader &&
            (this.props.onColumnResizeEnd || this.props.onColumnReorderEnd)
          ) {
            // NOTE: Use plugins manually for backward compatibility. Will be removed in future release.
            if (this.props.onColumnResizeEnd && this.props.onColumnReorderEnd) {
              cellProps = _objectSpread$2(
                _objectSpread$2({}, cellProps),
                {},
                {
                  minWidth: this.props.minWidth,
                  maxWidth: this.props.maxWidth,
                }
              );
              content = /*#__PURE__*/ React__default['default'].createElement(
                ReorderCell,
                _extends({}, cellProps, {
                  onColumnReorderEnd: this.props.onColumnReorderEnd,
                }),
                /*#__PURE__*/ React__default['default'].createElement(
                  ResizeCell,
                  {
                    onColumnResizeEnd: this.props.onColumnResizeEnd,
                  },
                  props.cell
                )
              );
            } else if (this.props.onColumnReorderEnd) {
              content = /*#__PURE__*/ React__default['default'].createElement(
                ReorderCell,
                _extends({}, cellProps, {
                  onColumnReorderEnd: this.props.onColumnReorderEnd,
                }),
                props.cell
              );
            } else {
              cellProps = _objectSpread$2(
                _objectSpread$2({}, cellProps),
                {},
                {
                  minWidth: this.props.minWidth,
                  maxWidth: this.props.maxWidth,
                }
              );
              content = /*#__PURE__*/ React__default['default'].createElement(
                ResizeCell,
                _extends({}, cellProps, {
                  onColumnResizeEnd: this.props.onColumnResizeEnd,
                }),
                props.cell
              );
            }
          } else if (
            /*#__PURE__*/ React__default['default'].isValidElement(props.cell)
          ) {
            content = /*#__PURE__*/ React__default['default'].cloneElement(
              props.cell,
              cellProps
            );
          } else if (typeof props.cell === 'function') {
            content = props.cell(cellProps);
          } else {
            content = /*#__PURE__*/ React__default['default'].createElement(
              FixedDataTableCellDefault$1,
              cellProps,
              props.cell
            );
          }

          let role = isHeaderOrFooter ? 'columnheader' : 'gridcell';
          return /*#__PURE__*/ React__default['default'].createElement(
            'div',
            {
              className,
              style,
              role,
            },
            content
          );
        },
      },
    ]);

    return FixedDataTableCell;
  })(React__default['default'].Component);

  _defineProperty$1(FixedDataTableCell, 'propTypes_DISABLED_FOR_PERFORMANCE', {
    isScrolling: PropTypes.bool,
    align: PropTypes.oneOf(['left', 'center', 'right']),
    className: PropTypes.string,
    highlighted: PropTypes.bool,
    width: PropTypes.number.isRequired,
    minWidth: PropTypes.number,
    maxWidth: PropTypes.number,
    height: PropTypes.number.isRequired,
    cell: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.element,
      PropTypes.func,
    ]),
    columnKey: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

    /**
     * The row index that will be passed to `cellRenderer` to render.
     */
    rowIndex: PropTypes.number.isRequired,

    /**
     * The left offset in pixels of the cell.
     */
    left: PropTypes.number,

    /**
     * Flag for enhanced performance check
     */
    pureRendering: PropTypes.bool,

    /**
     * Whether touch is enabled or not.
     */
    touchEnabled: PropTypes.bool,

    /**
     * Whether the cell group is part of the header or footer
     */
    isHeaderOrFooter: PropTypes.bool,

    /**
     * If the component should render for RTL direction
     */
    isRTL: PropTypes.bool,

    /**
     * Whether this cell is visible (i.e, inside the viewport) or not.
     */
    isVisible: PropTypes.bool.isRequired,

    /**
     * @deprecated
     *
     * Callback that is called when resizer has been released
     * and column needs to be updated.
     *
     * Only for backward compatibility.
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
    onColumnResizeEnd: PropTypes.func,

    /**
     * @deprecated
     *
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
    onColumnReorderEnd: PropTypes.func,

    /**
     * Whether these cells belong to the header/group-header
     */
    isHeader: PropTypes.bool,

    /**
     * Whether the cells belongs to the fixed group
     */
    cellGroupType: PropTypes.oneOf([
      CellGroupType.FIXED,
      CellGroupType.FIXED_RIGHT,
      CellGroupType.SCROLLABLE,
    ]),
  });

  _defineProperty$1(
    FixedDataTableCell,
    'defaultProps',
    /*object*/
    {
      align: 'left',
      highlighted: false,
    }
  );

  let FixedDataTableCell$1 = polyfill(FixedDataTableCell);

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
  let _excluded$1 = ['offsetLeft'];

  function _createSuper$7(Derived) {
    let hasNativeReflectConstruct = _isNativeReflectConstruct$7();
    return function _createSuperInternal() {
      let Super = _getPrototypeOf(Derived),
        result;
      if (hasNativeReflectConstruct) {
        let NewTarget = _getPrototypeOf(this).constructor;
        result = Reflect.construct(Super, arguments, NewTarget);
      } else {
        result = Super.apply(this, arguments);
      }
      return _possibleConstructorReturn$2(this, result);
    };
  }

  function _isNativeReflectConstruct$7() {
    if (typeof Reflect === 'undefined' || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === 'function') return true;
    try {
      Boolean.prototype.valueOf.call(
        Reflect.construct(Boolean, [], function () {})
      );
      return true;
    } catch (e) {
      return false;
    }
  }

  let FixedDataTableCellGroupImpl = /*#__PURE__*/ (function (_React$Component) {
    _inherits$2(FixedDataTableCellGroupImpl, _React$Component);

    let _super = _createSuper$7(FixedDataTableCellGroupImpl);

    /**
     * PropTypes are disabled in this component, because having them on slows
     * down the FixedDataTable hugely in DEV mode. You can enable them back for
     * development, but please don't commit this component with enabled propTypes.
     */
    function FixedDataTableCellGroupImpl(props) {
      let _this;

      _classCallCheck$2(this, FixedDataTableCellGroupImpl);

      _this = _super.call(this, props);

      _defineProperty$1(
        _assertThisInitialized(_this),
        '_renderCell',
        function (
          /*object*/
          /*number*/
          rowIndex,
          /*number*/
          height,
          /*object*/
          columnProps,
          /*object*/
          cellTemplate,
          /*number*/
          left,
          /*string*/
          key,
          /*boolean*/
          isHorizontallyVisible
        ) {
          let className = columnProps.cellClassName;
          let pureRendering = columnProps.pureRendering || false;
          let onColumnReorderEndCallback = columnProps.isReorderable
            ? _this.props.onColumnReorderEndCallback
            : null;
          let onColumnResizeEndCallback = columnProps.isResizable
            ? _this.props.onColumnResizeEndCallback
            : null;
          return /*#__PURE__*/ React__default['default'].createElement(
            FixedDataTableCell$1,
            {
              columnIndex: columnProps.index,
              isScrolling: _this.props.isScrolling,
              isHeaderOrFooter: _this.props.isHeaderOrFooter,
              isHeader: _this.props.isHeader,
              isGroupHeader: _this.props.isGroupHeader,
              align: columnProps.align,
              className,
              height,
              key,
              maxWidth: columnProps.maxWidth,
              minWidth: columnProps.minWidth,
              touchEnabled: _this.props.touchEnabled,
              onColumnResizeEnd: onColumnResizeEndCallback,
              onColumnReorderEnd: onColumnReorderEndCallback,
              rowIndex,
              columnKey: columnProps.columnKey,
              width: columnProps.width,
              left,
              cell: cellTemplate,
              pureRendering,
              isRTL: _this.props.isRTL,
              cellGroupType: _this.props.cellGroupType,
              isVisible: _this.props.isVisible && isHorizontallyVisible,
            }
          );
        }
      );

      _this._initialRender = true;
      return _this;
    }

    _createClass$2(FixedDataTableCellGroupImpl, [
      {
        key: 'componentDidMount',
        value: function componentDidMount() {
          this._initialRender = false;
        },
      },
      {
        key: 'render',
        value: function render() /*object*/
        {
          let props = this.props;
          let columns = props.columns;
          let cells = new Array(columns.length);
          let contentWidth = sumPropWidths(columns);
          let currentPosition = 0;

          for (let i = 0, j = columns.length; i < j; i++) {
            let columnProps = columns[i].props;
            let cellTemplate = columns[i].template;
            let recyclable = columnProps.allowCellsRecycling;
            let isHorizontallyVisible =
              currentPosition - props.left <= props.width &&
              currentPosition - props.left + columnProps.width >= 0;

            if (!recyclable || isHorizontallyVisible) {
              let key = columnProps.columnKey || 'cell_' + i;
              cells[i] = this._renderCell(
                props.rowIndex,
                props.rowHeight,
                columnProps,
                cellTemplate,
                currentPosition,
                key,
                isHorizontallyVisible
              );
            }

            currentPosition += columnProps.width;
          }

          let style = {
            height: props.height,
            position: 'absolute',
            width: contentWidth,
            zIndex: props.zIndex,
          };
          FixedDataTableTranslateDOMPosition(
            style,
            -1 * props.left,
            0,
            this._initialRender,
            this.props.isRTL
          );
          return /*#__PURE__*/ React__default['default'].createElement(
            'div',
            {
              className: cx('fixedDataTableCellGroupLayout/cellGroup'),
              style,
            },
            cells
          );
        },
      },
    ]);

    return FixedDataTableCellGroupImpl;
  })(React__default['default'].Component);

  _defineProperty$1(
    FixedDataTableCellGroupImpl,
    'propTypes_DISABLED_FOR_PERFORMANCE',
    {
      /**
       * Array of per column configuration properties.
       */
      columns: PropTypes.array.isRequired,
      isScrolling: PropTypes.bool,
      left: PropTypes.number,
      height: PropTypes.number.isRequired,

      /**
       * Height of fixedDataTableCellGroupLayout/cellGroupWrapper.
       */
      cellGroupWrapperHeight: PropTypes.number,
      rowHeight: PropTypes.number.isRequired,
      rowIndex: PropTypes.number.isRequired,
      width: PropTypes.number.isRequired,
      zIndex: PropTypes.number.isRequired,
      touchEnabled: PropTypes.bool,
      isHeaderOrFooter: PropTypes.bool,
      isRTL: PropTypes.bool,

      /**
       * Callback that is called when resizer has been released
       * and column needs to be updated.
       *
       * Only for backward compatibility.
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
      onColumnResizeEndCallback: PropTypes.func,

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
      onColumnReorderEndCallback: PropTypes.func,

      /**
       * Whether these cells belong to the header/group-header
       */
      isHeader: PropTypes.bool,

      /**
       * Whether this cell group is visible (i.e, vertically within the viewport) or not.
       */
      isVisible: PropTypes.bool.isRequired,
    }
  );

  let FixedDataTableCellGroup = /*#__PURE__*/ (function (_React$Component2) {
    _inherits$2(FixedDataTableCellGroup, _React$Component2);

    let _super2 = _createSuper$7(FixedDataTableCellGroup);

    function FixedDataTableCellGroup() {
      _classCallCheck$2(this, FixedDataTableCellGroup);

      return _super2.apply(this, arguments);
    }

    _createClass$2(FixedDataTableCellGroup, [
      {
        key: 'shouldComponentUpdate',
        value:
          /**
           * PropTypes are disabled in this component, because having them on slows
           * down the FixedDataTable hugely in DEV mode. You can enable them back for
           * development, but please don't commit this component with enabled propTypes.
           */
          function shouldComponentUpdate(
            /*object*/
            nextProps
          ) /*boolean*/
          {
            /// if offsets and visibility haven't changed for the same cell group while scrolling, then skip update
            return !(
              nextProps.isScrolling &&
              this.props.rowIndex === nextProps.rowIndex &&
              this.props.left === nextProps.left &&
              this.props.offsetLeft === nextProps.offsetLeft &&
              this.props.isVisible === nextProps.isVisible
            );
          },
      },
      {
        key: 'render',
        value: function render() /*object*/
        {
          let _this$props = this.props,
            offsetLeft = _this$props.offsetLeft,
            props = _objectWithoutProperties(_this$props, _excluded$1);

          let style = {
            height: props.cellGroupWrapperHeight || props.height,
            width: props.width,
          };

          if (this.props.isRTL) {
            style.right = offsetLeft;
          } else {
            style.left = offsetLeft;
          }

          return /*#__PURE__*/ React__default['default'].createElement(
            'div',
            {
              style,
              className: cx('fixedDataTableCellGroupLayout/cellGroupWrapper'),
            },
            /*#__PURE__*/ React__default['default'].createElement(
              FixedDataTableCellGroupImpl,
              props
            )
          );
        },
      },
    ]);

    return FixedDataTableCellGroup;
  })(React__default['default'].Component);

  _defineProperty$1(
    FixedDataTableCellGroup,
    'propTypes_DISABLED_FOR_PERFORMANCE',
    {
      isScrolling: PropTypes.bool,

      /**
       * Height of the row.
       */
      height: PropTypes.number.isRequired,
      offsetLeft: PropTypes.number,
      left: PropTypes.number,

      /**
       * Z-index on which the row will be displayed. Used e.g. for keeping
       * header and footer in front of other rows.
       */
      zIndex: PropTypes.number.isRequired,
    }
  );

  _defineProperty$1(
    FixedDataTableCellGroup,
    'defaultProps',
    /*object*/
    {
      left: 0,
      offsetLeft: 0,
    }
  );

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
  let _excluded = ['offsetTop', 'zIndex'];

  function _createSuper$6(Derived) {
    let hasNativeReflectConstruct = _isNativeReflectConstruct$6();
    return function _createSuperInternal() {
      let Super = _getPrototypeOf(Derived),
        result;
      if (hasNativeReflectConstruct) {
        let NewTarget = _getPrototypeOf(this).constructor;
        result = Reflect.construct(Super, arguments, NewTarget);
      } else {
        result = Super.apply(this, arguments);
      }
      return _possibleConstructorReturn$2(this, result);
    };
  }

  function _isNativeReflectConstruct$6() {
    if (typeof Reflect === 'undefined' || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === 'function') return true;
    try {
      Boolean.prototype.valueOf.call(
        Reflect.construct(Boolean, [], function () {})
      );
      return true;
    } catch (e) {
      return false;
    }
  }

  let HEADER_BORDER_BOTTOM_WIDTH = 1;
  /**
   * Component that renders the row for <FixedDataTable />.
   * This component should not be used directly by developer. Instead,
   * only <FixedDataTable /> should use the component internally.
   */

  let FixedDataTableRowImpl = /*#__PURE__*/ (function (_React$Component) {
    _inherits$2(FixedDataTableRowImpl, _React$Component);

    let _super = _createSuper$6(FixedDataTableRowImpl);

    function FixedDataTableRowImpl() {
      let _this;

      _classCallCheck$2(this, FixedDataTableRowImpl);

      for (
        var _len = arguments.length, args = new Array(_len), _key = 0;
        _key < _len;
        _key++
      ) {
        args[_key] = arguments[_key];
      }

      _this = _super.call.apply(_super, [this].concat(args));

      _defineProperty$1(_assertThisInitialized(_this), 'mouseLeaveIndex', null);

      _defineProperty$1(
        _assertThisInitialized(_this),
        '_getRowExpanded',
        function (
          /*number*/
          subRowHeight
        ) /*?object*/
        {
          if (_this.props.rowExpanded) {
            let rowExpandedProps = {
              rowIndex: _this.props.index,
              height: subRowHeight,
              width: _this.props.width,
            };
            let rowExpanded;

            if (
              /*#__PURE__*/ React__default['default'].isValidElement(
                _this.props.rowExpanded
              )
            ) {
              rowExpanded = /*#__PURE__*/ React__default[
                'default'
              ].cloneElement(_this.props.rowExpanded, rowExpandedProps);
            } else if (typeof _this.props.rowExpanded === 'function') {
              rowExpanded = _this.props.rowExpanded(rowExpandedProps);
            }

            return rowExpanded;
          }
        }
      );

      _defineProperty$1(
        _assertThisInitialized(_this),
        '_renderColumnsLeftShadow',
        function (
          /*number*/
          left
        ) /*?object*/
        {
          let className = cx({
            'fixedDataTableRowLayout/fixedColumnsDivider': left > 0,
            'fixedDataTableRowLayout/columnsShadow': _this.props.scrollLeft > 0,
            'public/fixedDataTableRow/fixedColumnsDivider': left > 0,
            'public/fixedDataTableRow/columnsShadow':
              _this.props.scrollLeft > 0,
          });
          let dividerHeight = _this.props.cellGroupWrapperHeight
            ? _this.props.cellGroupWrapperHeight - HEADER_BORDER_BOTTOM_WIDTH
            : _this.props.height;
          let style = {
            left,
            height: dividerHeight,
          };

          if (_this.props.isRTL) {
            style.right = left;
            style.left = 'auto';
          }

          return /*#__PURE__*/ React__default['default'].createElement('div', {
            className,
            style,
          });
        }
      );

      _defineProperty$1(
        _assertThisInitialized(_this),
        '_renderFixedRightColumnsShadow',
        function (
          /*number*/
          left
        ) /*?object*/
        {
          let className = cx(
            'fixedDataTableRowLayout/columnsShadow',
            'fixedDataTableRowLayout/columnsRightShadow',
            'fixedDataTableRowLayout/fixedColumnsDivider',
            'public/fixedDataTableRow/columnsShadow',
            'public/fixedDataTableRow/columnsRightShadow',
            'public/fixedDataTableRow/fixedColumnsDivider'
          );
          let style = {
            height: _this.props.height,
            left,
          };

          if (_this.props.isRTL) {
            style.right = left;
            style.left = 'auto';
          }

          return /*#__PURE__*/ React__default['default'].createElement('div', {
            className,
            style,
          });
        }
      );

      _defineProperty$1(
        _assertThisInitialized(_this),
        '_renderColumnsRightShadow',
        function (
          /*number*/
          totalWidth
        ) /*?object*/
        {
          if (
            Math.ceil(_this.props.scrollLeft + _this.props.width) <
            Math.floor(totalWidth)
          ) {
            let className = cx(
              'fixedDataTableRowLayout/columnsShadow',
              'fixedDataTableRowLayout/columnsRightShadow',
              'public/fixedDataTableRow/columnsShadow',
              'public/fixedDataTableRow/columnsRightShadow'
            );
            let style = {
              height: _this.props.height,
            };
            return /*#__PURE__*/ React__default['default'].createElement(
              'div',
              {
                className,
                style,
              }
            );
          }
        }
      );

      _defineProperty$1(
        _assertThisInitialized(_this),
        '_onClick',
        function (
          /*object*/
          event
        ) {
          _this.props.onClick(event, _this.props.index);
        }
      );

      _defineProperty$1(
        _assertThisInitialized(_this),
        '_onContextMenu',
        function (
          /*object*/
          event
        ) {
          _this.props.onContextMenu(event, _this.props.index);
        }
      );

      _defineProperty$1(
        _assertThisInitialized(_this),
        '_onDoubleClick',
        function (
          /*object*/
          event
        ) {
          _this.props.onDoubleClick(event, _this.props.index);
        }
      );

      _defineProperty$1(
        _assertThisInitialized(_this),
        '_onMouseUp',
        function (
          /*object*/
          event
        ) {
          _this.props.onMouseUp(event, _this.props.index);
        }
      );

      _defineProperty$1(
        _assertThisInitialized(_this),
        '_onMouseDown',
        function (
          /*object*/
          event
        ) {
          _this.props.onMouseDown(event, _this.props.index);
        }
      );

      _defineProperty$1(
        _assertThisInitialized(_this),
        '_onMouseEnter',
        function (
          /*object*/
          event
        ) {
          /**
           * This is necessary so that onMouseLeave is fired with the initial
           * row index since this row could be updated with a different index
           * when scrolling.
           */
          _this.mouseLeaveIndex = _this.props.index;

          if (_this.props.onMouseEnter) {
            _this.props.onMouseEnter(event, _this.props.index);
          }
        }
      );

      _defineProperty$1(
        _assertThisInitialized(_this),
        '_onMouseLeave',
        function (
          /*object*/
          event
        ) {
          if (_this.mouseLeaveIndex === null) {
            _this.mouseLeaveIndex = _this.props.index;
          }

          _this.props.onMouseLeave(event, _this.mouseLeaveIndex);

          _this.mouseLeaveIndex = null;
        }
      );

      _defineProperty$1(
        _assertThisInitialized(_this),
        '_onTouchStart',
        function (
          /*object*/
          event
        ) {
          _this.props.onTouchStart(event, _this.props.index);
        }
      );

      _defineProperty$1(
        _assertThisInitialized(_this),
        '_onTouchEnd',
        function (
          /*object*/
          event
        ) {
          _this.props.onTouchEnd(event, _this.props.index);
        }
      );

      _defineProperty$1(
        _assertThisInitialized(_this),
        '_onTouchMove',
        function (
          /*object*/
          event
        ) {
          _this.props.onTouchMove(event, _this.props.index);
        }
      );

      return _this;
    }

    _createClass$2(FixedDataTableRowImpl, [
      {
        key: 'shouldComponentUpdate',
        value: function shouldComponentUpdate(nextProps) {
          // only skip updates while scrolling
          if (!nextProps.isScrolling) {
            return true;
          } // if row is not visible then no need to render it
          // change in visibility is handled by the parent

          if (!nextProps.visible) {
            return false;
          } // if row's visibility has changed, then update it

          if (this.props.visible !== nextProps.visible) {
            return true;
          } // Only update the row if scrolling leads to a change in horizontal offsets.
          // The vertical offset is taken care of by the wrapper

          return !(
            this.props.index === nextProps.index &&
            this.props.scrollLeft === nextProps.scrollLeft
          );
        },
      },
      {
        key: 'render',
        value: function render() /*object*/
        {
          let subRowHeight = this.props.subRowHeight || 0;
          let style = {
            width: this.props.width,
            height: this.props.height + subRowHeight,
          };
          let className = cx({
            'fixedDataTableRowLayout/main': true,
            'public/fixedDataTableRow/main': true,
            'public/fixedDataTableRow/highlighted': this.props.index % 2 === 1,
            'public/fixedDataTableRow/odd': this.props.index % 2 === 1,
            'public/fixedDataTableRow/even': this.props.index % 2 === 0,
          });
          let fixedColumnsWidth = sumPropWidths(this.props.fixedColumns);
          let fixedColumns = /*#__PURE__*/ React__default[
            'default'
          ].createElement(FixedDataTableCellGroup, {
            key: 'fixed_cells',
            isScrolling: this.props.isScrolling,
            height: this.props.height,
            cellGroupWrapperHeight: this.props.cellGroupWrapperHeight,
            left: 0,
            width: fixedColumnsWidth,
            zIndex: 2,
            columns: this.props.fixedColumns,
            touchEnabled: this.props.touchEnabled,
            onColumnResizeEndCallback: this.props.onColumnResizeEndCallback,
            onColumnReorderEndCallback: this.props.onColumnReorderEndCallback,
            rowHeight: this.props.height,
            rowIndex: this.props.index,
            isHeaderOrFooter: this.props.isHeaderOrFooter,
            isHeader: this.props.isHeader,
            isGroupHeader: this.props.isGroupHeader,
            isRTL: this.props.isRTL,
            cellGroupType: CellGroupType.FIXED,
            isVisible: this.props.visible,
          });

          let columnsLeftShadow =
            this._renderColumnsLeftShadow(fixedColumnsWidth);

          let fixedRightColumnsWidth = sumPropWidths(
            this.props.fixedRightColumns
          );
          let scrollbarOffset = this.props.showScrollbarY
            ? this.props.scrollbarYWidth
            : 0;
          let fixedRightColumns = /*#__PURE__*/ React__default[
            'default'
          ].createElement(FixedDataTableCellGroup, {
            key: 'fixed_right_cells',
            isScrolling: this.props.isScrolling,
            height: this.props.height,
            cellGroupWrapperHeight: this.props.cellGroupWrapperHeight,
            offsetLeft:
              this.props.width - fixedRightColumnsWidth - scrollbarOffset,
            width: fixedRightColumnsWidth,
            zIndex: 2,
            columns: this.props.fixedRightColumns,
            touchEnabled: this.props.touchEnabled,
            onColumnResizeEndCallback: this.props.onColumnResizeEndCallback,
            onColumnReorderEndCallback: this.props.onColumnReorderEndCallback,
            rowHeight: this.props.height,
            rowIndex: this.props.index,
            isHeaderOrFooter: this.props.isHeaderOrFooter,
            isHeader: this.props.isHeader,
            isGroupHeader: this.props.isGroupHeader,
            isRTL: this.props.isRTL,
            cellGroupType: CellGroupType.FIXED_RIGHT,
            isVisible: this.props.visible,
          });
          let fixedRightColumnsShadow = fixedRightColumnsWidth
            ? this._renderFixedRightColumnsShadow(
                this.props.width - fixedRightColumnsWidth - scrollbarOffset - 5
              )
            : null;
          let scrollableColumns = /*#__PURE__*/ React__default[
            'default'
          ].createElement(FixedDataTableCellGroup, {
            key: 'scrollable_cells',
            isScrolling: this.props.isScrolling,
            height: this.props.height,
            cellGroupWrapperHeight: this.props.cellGroupWrapperHeight,
            align: 'right',
            left: this.props.scrollLeft,
            offsetLeft: fixedColumnsWidth,
            width:
              this.props.width -
              fixedColumnsWidth -
              fixedRightColumnsWidth -
              scrollbarOffset,
            zIndex: 0,
            columns: this.props.scrollableColumns,
            touchEnabled: this.props.touchEnabled,
            onColumnResizeEndCallback: this.props.onColumnResizeEndCallback,
            onColumnReorderEndCallback: this.props.onColumnReorderEndCallback,
            rowHeight: this.props.height,
            rowIndex: this.props.index,
            isHeaderOrFooter: this.props.isHeaderOrFooter,
            isHeader: this.props.isHeader,
            isGroupHeader: this.props.isGroupHeader,
            isRTL: this.props.isRTL,
            cellGroupType: CellGroupType.SCROLLABLE,
            isVisible: this.props.visible,
          });
          let scrollableColumnsWidth = sumPropWidths(
            this.props.scrollableColumns
          );

          let columnsRightShadow = this._renderColumnsRightShadow(
            fixedColumnsWidth + scrollableColumnsWidth
          );

          let rowExpanded = this._getRowExpanded(subRowHeight);

          let rowExpandedStyle = {
            height: subRowHeight,
            top: this.props.height,
            width: this.props.width,
          };
          let scrollbarSpacer = null;

          if (this.props.showScrollbarY) {
            let spacerStyles = {
              width: scrollbarOffset,
              height: this.props.height,
              // Since the box-sizing = border-box the border on the table is included in the width
              // so we need to account for the left and right border
              left: this.props.isRTL
                ? 2
                : this.props.width - scrollbarOffset - 2,
            };
            scrollbarSpacer = /*#__PURE__*/ React__default[
              'default'
            ].createElement('div', {
              style: spacerStyles,
              className: cx('public/fixedDataTable/scrollbarSpacer'),
            });
          }

          return /*#__PURE__*/ React__default['default'].createElement(
            'div',
            _extends(
              {
                className: joinClasses(className, this.props.className),
                role: 'row',
                'aria-rowindex': this.props.ariaRowIndex,
              },
              this.props.attributes,
              {
                onClick: this.props.onClick ? this._onClick : null,
                onContextMenu: this.props.onContextMenu
                  ? this._onContextMenu
                  : null,
                onDoubleClick: this.props.onDoubleClick
                  ? this._onDoubleClick
                  : null,
                onMouseDown: this.props.onMouseDown ? this._onMouseDown : null,
                onMouseUp: this.props.onMouseUp ? this._onMouseUp : null,
                onMouseEnter:
                  this.props.onMouseEnter || this.props.onMouseLeave
                    ? this._onMouseEnter
                    : null,
                onMouseLeave: this.props.onMouseLeave
                  ? this._onMouseLeave
                  : null,
                onTouchStart: this.props.onTouchStart
                  ? this._onTouchStart
                  : null,
                onTouchEnd: this.props.onTouchEnd ? this._onTouchEnd : null,
                onTouchMove: this.props.onTouchMove ? this._onTouchMove : null,
                style,
              }
            ),
            /*#__PURE__*/ React__default['default'].createElement(
              'div',
              {
                className: cx('fixedDataTableRowLayout/body'),
              },
              fixedColumns,
              scrollableColumns,
              columnsLeftShadow,
              fixedRightColumns,
              fixedRightColumnsShadow,
              scrollbarSpacer
            ),
            rowExpanded &&
              /*#__PURE__*/ React__default['default'].createElement(
                'div',
                {
                  className: cx('fixedDataTableRowLayout/rowExpanded'),
                  style: rowExpandedStyle,
                },
                rowExpanded
              ),
            columnsRightShadow
          );
        },
      },
    ]);

    return FixedDataTableRowImpl;
  })(React__default['default'].Component);

  _defineProperty$1(FixedDataTableRowImpl, 'propTypes', {
    isScrolling: PropTypes.bool,

    /**
     * Array of data for the fixed columns.
     */
    fixedColumns: PropTypes.array.isRequired,

    /**
     * Array of <FixedDataTableColumn /> for the fixed columns positioned at end of the table.
     */
    fixedRightColumns: PropTypes.array.isRequired,

    /**
     * Height of the row.
     */
    height: PropTypes.number.isRequired,

    /**
     * Height of fixedDataTableCellGroupLayout/cellGroupWrapper.
     */
    cellGroupWrapperHeight: PropTypes.number,

    /**
     * Height of the content to be displayed below the row.
     */
    subRowHeight: PropTypes.number,

    /**
     * the row expanded.
     */
    rowExpanded: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),

    /**
     * The row index.
     */
    index: PropTypes.number.isRequired,

    /**
     * Array of data for the scrollable columns.
     */
    scrollableColumns: PropTypes.array.isRequired,

    /**
     * The distance between the left edge of the table and the leftmost portion
     * of the row currently visible in the table.
     */
    scrollLeft: PropTypes.number.isRequired,

    /**
     * Width of the row.
     */
    width: PropTypes.number.isRequired,

    /**
     * Fire when a row is clicked.
     */
    onClick: PropTypes.func,

    /**
     * Fire when a contextual-menu is requested above a row.
     */
    onContextMenu: PropTypes.func,

    /**
     * Fire when a row is double clicked.
     */
    onDoubleClick: PropTypes.func,

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
    onColumnReorderEndCallback: PropTypes.func,
    touchEnabled: PropTypes.bool,

    /**
     * Whether the row is part of the header or footer.
     */
    isHeaderOrFooter: PropTypes.bool,

    /**
     * The value of the aria-rowindex attribute.
     */
    ariaRowIndex: PropTypes.number,

    /**
     * Whether the grid should be in RTL mode
     */
    isRTL: PropTypes.bool,

    /**
     * DOM attributes to be applied to the row.
     */
    attributes: PropTypes.object,

    /**
     * Callback that is called when resizer has been released
     * and column needs to be updated.
     *
     * Only for backward compatibility.
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
    onColumnResizeEndCallback: PropTypes.func,

    /**
     * Whether these cells belong to the header
     */
    isHeader: PropTypes.bool,

    /**
     * Whether these cells belong to the group-header
     */
    isGroupHeader: PropTypes.bool,

    /**
     * Function to change the scroll position by interacting with the store.
     */
    scrollToX: PropTypes.func,
  });

  let FixedDataTableRow = /*#__PURE__*/ (function (_React$Component2) {
    _inherits$2(FixedDataTableRow, _React$Component2);

    let _super2 = _createSuper$6(FixedDataTableRow);

    function FixedDataTableRow(props) {
      let _this2;

      _classCallCheck$2(this, FixedDataTableRow);

      _this2 = _super2.call(this, props);
      _this2._initialRender = true;
      return _this2;
    }

    _createClass$2(FixedDataTableRow, [
      {
        key: 'componentDidMount',
        value: function componentDidMount() {
          this._initialRender = false;
        },
      },
      {
        key: 'shouldComponentUpdate',
        value: function shouldComponentUpdate(nextProps) {
          // only skip updates while scrolling
          if (!nextProps.isScrolling) {
            return true;
          } // if row's visibility has changed, then update it

          if (this.props.visible !== nextProps.visible) {
            return true;
          } // if row is still not visible then no need to update

          if (!nextProps.visible) {
            return false;
          } // if offsets haven't changed for the same row while scrolling, then skip update

          return !(
            nextProps.isScrolling &&
            this.props.index === nextProps.index &&
            this.props.offsetTop === nextProps.offsetTop &&
            this.props.scrollLeft === nextProps.scrollLeft
          );
        },
      },
      {
        key: 'render',
        value: function render() /*object*/
        {
          let _this$props = this.props,
            offsetTop = _this$props.offsetTop,
            zIndex = _this$props.zIndex,
            rowProps = _objectWithoutProperties(_this$props, _excluded);

          let style = {
            width: this.props.width,
            height: this.props.height,
            zIndex: zIndex ? zIndex : 0,
            visibility: rowProps.visible ? 'visible' : 'hidden',
          };
          FixedDataTableTranslateDOMPosition(
            style,
            0,
            offsetTop,
            this._initialRender,
            this.props.isRTL
          );
          return /*#__PURE__*/ React__default['default'].createElement(
            'div',
            {
              style,
              className: cx('fixedDataTableRowLayout/rowWrapper'),
            },
            /*#__PURE__*/ React__default['default'].createElement(
              FixedDataTableRowImpl,
              rowProps
            )
          );
        },
      },
    ]);

    return FixedDataTableRow;
  })(React__default['default'].Component);

  _defineProperty$1(FixedDataTableRow, 'propTypes', {
    isScrolling: PropTypes.bool,

    /**
     * Height of the row.
     */
    height: PropTypes.number.isRequired,

    /**
     * Z-index on which the row will be displayed. Used e.g. for keeping
     * header and footer in front of other rows.
     */
    zIndex: PropTypes.number,

    /**
     * The vertical position where the row should render itself
     */
    offsetTop: PropTypes.number.isRequired,

    /**
     * Pass false to hide the row via CSS
     */
    visible: PropTypes.bool.isRequired,

    /**
     * Width of the row.
     */
    width: PropTypes.number.isRequired,
  });

  function _createSuper$5(Derived) {
    let hasNativeReflectConstruct = _isNativeReflectConstruct$5();
    return function _createSuperInternal() {
      let Super = _getPrototypeOf(Derived),
        result;
      if (hasNativeReflectConstruct) {
        let NewTarget = _getPrototypeOf(this).constructor;
        result = Reflect.construct(Super, arguments, NewTarget);
      } else {
        result = Super.apply(this, arguments);
      }
      return _possibleConstructorReturn$2(this, result);
    };
  }

  function _isNativeReflectConstruct$5() {
    if (typeof Reflect === 'undefined' || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === 'function') return true;
    try {
      Boolean.prototype.valueOf.call(
        Reflect.construct(Boolean, [], function () {})
      );
      return true;
    } catch (e) {
      return false;
    }
  }

  let FixedDataTableBufferedRows = /*#__PURE__*/ (function (_React$Component) {
    _inherits$2(FixedDataTableBufferedRows, _React$Component);

    let _super = _createSuper$5(FixedDataTableBufferedRows);

    function FixedDataTableBufferedRows(props) {
      let _this;

      _classCallCheck$2(this, FixedDataTableBufferedRows);

      _this = _super.call(this, props);
      _this._staticRowArray = [];
      _this._initialRender = true;
      return _this;
    }

    _createClass$2(FixedDataTableBufferedRows, [
      {
        key: 'componentDidMount',
        value: function componentDidMount() {
          this._initialRender = false;
        },
      },
      {
        key: 'shouldComponentUpdate',
        value: function shouldComponentUpdate() /*boolean*/
        {
          // Don't add PureRenderMixin to this component please.
          return true;
        },
      },
      {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
          this._staticRowArray.length = 0;
        },
      },
      {
        key: 'render',
        value: function render() /*object*/
        {
          let _this$props = this.props,
            offsetTop = _this$props.offsetTop,
            rowOffsets = _this$props.rowOffsets,
            scrollTop = _this$props.scrollTop,
            isScrolling = _this$props.isScrolling,
            rowsToRender = _this$props.rowsToRender;
          rowsToRender = rowsToRender || [];

          if (isScrolling) {
            // allow static array to grow while scrolling
            this._staticRowArray.length = Math.max(
              this._staticRowArray.length,
              rowsToRender.length
            );
          } else {
            // when scrolling is done, static array can shrink to fit the buffer
            this._staticRowArray.length = rowsToRender.length;
          }
          /**
           * NOTE (pradeep): To increase vertical scrolling performance, we only translate the parent container.
           * This means, rows at a particular index won't need to be rerendered.
           *
           * But browsers have limits and are unable to translate the container past a limit (known here as bufferHeight).
           * To work around this, we wrap the translated amount over bufferHeight.
           *
           * For the container, the wrapped offset will be:
           *    const containerOffsetTop = offsetTop - (scrollTop % bufferHeight);
           *
           * Similarly, the row offset will also need to be wrapped:
           *    const rowOffsetTop = rowOffset - (Math.floor(scrollTop / bufferHeight) * bufferHeight);
           *
           * Therefore,
           *    (rowOffsetTop + containerOffsetTop)
           *      = offsetTop - (scrollTop % bufferHeight) + rowOffset - (Math.floor(scrollTop / bufferHeight) * bufferHeight)
           *      = offsetTop + rowOffset - scrollTop
           */

          let bufferHeight = 1000000;
          let containerOffsetTop = offsetTop - (scrollTop % bufferHeight); // render each row from the buffer into the static row array

          for (let i = 0; i < this._staticRowArray.length; i++) {
            var _this$_staticRowArray;

            // if the row doesn't exist in the buffer set, then take the previous one
            let rowIndex = defaultTo_1(
              rowsToRender[i],
              (_this$_staticRowArray = this._staticRowArray[i]) === null ||
                _this$_staticRowArray === void 0
                ? void 0
                : _this$_staticRowArray.props.index
            );

            if (
              isNil_1(rowIndex) ||
              !inRange_1(rowIndex, 0, this.props.rowSettings.rowsCount)
            ) {
              this._staticRowArray[i] = null;
              continue;
            }

            let rowOffsetTop =
              rowOffsets[rowIndex] -
              Math.floor(scrollTop / bufferHeight) * bufferHeight;
            this._staticRowArray[i] = this.renderRow({
              rowIndex,
              key: i,
              rowOffsetTop,
            });
          } // We translate all the rows together with a parent div. This saves a lot of renders.

          let style = {
            position: 'relative',
          };
          FixedDataTableTranslateDOMPosition(
            style,
            0,
            containerOffsetTop,
            false
          ); // NOTE (pradeep): Sort the rows by row index so that they appear with the right order in the DOM (see #221)

          let sortedRows = this._staticRowArray
            .slice()
            .sort(this.rowSortComparator);

          return /*#__PURE__*/ React__default['default'].createElement(
            'div',
            {
              style,
            },
            sortedRows
          );
        },
        /**
         * @typedef RowProps
         * @prop {number} rowIndex
         * @prop {number} key
         * @prop {number} rowOffsetTop
         *
         * @param {RowProps} rowProps
         * @return {!Object}
         */
      },
      {
        key: 'renderRow',
        value: function renderRow(_ref) /*object*/
        {
          let rowIndex = _ref.rowIndex,
            key = _ref.key,
            rowOffsetTop = _ref.rowOffsetTop;
          let props = this.props;
          let rowClassNameGetter = props.rowClassNameGetter || emptyFunction;
          let rowProps = {};
          rowProps.height = this.props.rowSettings.rowHeightGetter(rowIndex);
          rowProps.subRowHeight =
            this.props.rowSettings.subRowHeightGetter(rowIndex);
          rowProps.offsetTop = rowOffsetTop;
          rowProps.key = props.rowKeyGetter
            ? props.rowKeyGetter(rowIndex)
            : key;
          rowProps.attributes =
            props.rowSettings.rowAttributesGetter &&
            props.rowSettings.rowAttributesGetter(rowIndex);
          let hasBottomBorder =
            rowIndex === props.rowSettings.rowsCount - 1 &&
            props.showLastRowBorder;
          rowProps.className = joinClasses(
            rowClassNameGetter(rowIndex),
            cx('public/fixedDataTable/bodyRow'),
            cx({
              'fixedDataTableLayout/hasBottomBorder': hasBottomBorder,
              'public/fixedDataTable/hasBottomBorder': hasBottomBorder,
            })
          );
          let visible = inRange_1(
            rowIndex,
            this.props.firstViewportRowIndex,
            this.props.endViewportRowIndex
          );
          return /*#__PURE__*/ React__default['default'].createElement(
            FixedDataTableRow,
            _extends(
              {
                key,
                index: rowIndex,
                ariaRowIndex: rowIndex + props.ariaRowIndexOffset,
                isScrolling: props.isScrolling,
                width: props.width,
                rowExpanded: props.rowExpanded,
                scrollLeft: Math.round(props.scrollLeft),
                fixedColumns: props.fixedColumns,
                fixedRightColumns: props.fixedRightColumns,
                scrollableColumns: props.scrollableColumns,
                onClick: props.onRowClick,
                onContextMenu: props.onRowContextMenu,
                onDoubleClick: props.onRowDoubleClick,
                onMouseDown: props.onRowMouseDown,
                onMouseUp: props.onRowMouseUp,
                onMouseEnter: props.onRowMouseEnter,
                onMouseLeave: props.onRowMouseLeave,
                onTouchStart: props.onRowTouchStart,
                onTouchEnd: props.onRowTouchEnd,
                onTouchMove: props.onRowTouchMove,
                showScrollbarY: props.showScrollbarY,
                scrollbarYWidth: props.scrollbarYWidth,
                isRTL: props.isRTL,
                visible,
              },
              rowProps
            )
          );
        },
        /**
         * @param {?React.ReactElement} rowA
         * @param {?React.ReactElement} rowB
         * @returns {number}
         * @private
         */
      },
      {
        key: 'rowSortComparator',
        value: function rowSortComparator(rowA, rowB) {
          let _rowA$props$ariaRowIn, _rowB$props$ariaRowIn;

          // NOTE (pradeep): Aria row index can't be zero, but the row itself can be undefined.
          // I picked -1 as the default here. As long as the default sites outside the usual row index range,
          // it should work. I purposefully didn't choose Infinity or -Infinity, as they might break
          // arithmetic operations.
          return (
            ((_rowA$props$ariaRowIn =
              rowA === null || rowA === void 0
                ? void 0
                : rowA.props.ariaRowIndex) !== null &&
            _rowA$props$ariaRowIn !== void 0
              ? _rowA$props$ariaRowIn
              : -1) -
            ((_rowB$props$ariaRowIn =
              rowB === null || rowB === void 0
                ? void 0
                : rowB.props.ariaRowIndex) !== null &&
            _rowB$props$ariaRowIn !== void 0
              ? _rowB$props$ariaRowIn
              : -1)
          );
        },
      },
    ]);

    return FixedDataTableBufferedRows;
  })(React__default['default'].Component);

  _defineProperty$1(FixedDataTableBufferedRows, 'propTypes', {
    ariaRowIndexOffset: PropTypes.number,
    isScrolling: PropTypes.bool,
    firstViewportRowIndex: PropTypes.number.isRequired,
    endViewportRowIndex: PropTypes.number.isRequired,
    fixedColumns: PropTypes.array.isRequired,
    fixedRightColumns: PropTypes.array.isRequired,
    height: PropTypes.number.isRequired,
    offsetTop: PropTypes.number.isRequired,
    onRowClick: PropTypes.func,
    onRowContextMenu: PropTypes.func,
    onRowDoubleClick: PropTypes.func,
    onRowMouseDown: PropTypes.func,
    onRowMouseUp: PropTypes.func,
    onRowMouseEnter: PropTypes.func,
    onRowMouseLeave: PropTypes.func,
    onRowTouchStart: PropTypes.func,
    onRowTouchEnd: PropTypes.func,
    onRowTouchMove: PropTypes.func,
    rowClassNameGetter: PropTypes.func,
    rowExpanded: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
    rowOffsets: PropTypes.object.isRequired,
    rowKeyGetter: PropTypes.func,
    rowSettings: PropTypes.shape({
      rowAttributesGetter: PropTypes.func,
      rowHeightGetter: PropTypes.func,
      rowsCount: PropTypes.number.isRequired,
      subRowHeightGetter: PropTypes.func,
    }),
    rowsToRender: PropTypes.array.isRequired,
    scrollLeft: PropTypes.number.isRequired,
    scrollTop: PropTypes.number.isRequired,
    scrollableColumns: PropTypes.array.isRequired,
    showLastRowBorder: PropTypes.bool,
    showScrollbarY: PropTypes.bool,
    width: PropTypes.number.isRequired,
    isRTL: PropTypes.bool,
  });

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
  let MOVE_AMPLITUDE = 1.6;
  let DECELERATION_AMPLITUDE = 1.6;
  let DECELERATION_FACTOR = 325;
  let TRACKER_TIMEOUT = 100;

  let ReactTouchHandler = /*#__PURE__*/ (function () {
    /**
     * onTouchScroll is the callback that will be called with right frame rate if
     * any touch events happened
     * onTouchScroll should is to be called with two arguments: deltaX and deltaY in
     * this order
     */
    function ReactTouchHandler(
      /*function*/
      onTouchScroll,
      /*boolean|function*/
      handleScrollX,
      /*boolean|function*/
      handleScrollY,
      /*?boolean*/
      preventDefault,
      /*?boolean*/
      stopPropagation
    ) {
      _classCallCheck$2(this, ReactTouchHandler);

      // The animation frame id for the drag scroll
      this._dragAnimationId = null; // The interval id for tracking the drag velocity

      this._trackerId = null; // Used to track the drag scroll delta while waiting for an animation frame

      this._deltaX = 0;
      this._deltaY = 0; // The last touch we processed while dragging.  Used to compute the delta and velocity above

      this._lastTouchX = 0;
      this._lastTouchY = 0; // Used to track a moving average of the scroll velocity while dragging

      this._velocityX = 0;
      this._velocityY = 0; // An accummulated drag scroll delta used to calculate velocity

      this._accumulatedDeltaX = 0;
      this._accumulatedDeltaY = 0; // Timestamp from the last interval frame we used to track velocity

      this._lastFrameTimestamp = Date.now(); // Timestamp from the last animation frame we used to autoscroll after drag stop

      this._autoScrollTimestamp = Date.now();

      if (typeof handleScrollX !== 'function') {
        handleScrollX = handleScrollX
          ? emptyFunction.thatReturnsTrue
          : emptyFunction.thatReturnsFalse;
      }

      if (typeof handleScrollY !== 'function') {
        handleScrollY = handleScrollY
          ? emptyFunction.thatReturnsTrue
          : emptyFunction.thatReturnsFalse;
      }

      this._handleScrollX = handleScrollX;
      this._handleScrollY = handleScrollY;
      this._preventDefault = preventDefault;
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

    _createClass$2(ReactTouchHandler, [
      {
        key: 'onTouchStart',
        value: function onTouchStart(
          /*object*/
          event
        ) {
          // Start tracking drag delta for scrolling
          this._lastTouchX = event.touches[0].pageX;
          this._lastTouchY = event.touches[0].pageY; // Reset our velocity and intermediate data used to compute velocity

          this._velocityX = 0;
          this._velocityY = 0;
          this._accumulatedDeltaX = 0;
          this._accumulatedDeltaY = 0;
          this._lastFrameTimestamp = Date.now(); // Setup interval for tracking velocity

          clearInterval(this._trackerId);
          this._trackerId = setInterval(this._track, TRACKER_TIMEOUT);

          if (this._stopPropagation) {
            event.stopPropagation();
          }
        },
      },
      {
        key: 'onTouchEnd',
        value: function onTouchEnd(
          /*object*/
          event
        ) {
          // Stop tracking velocity
          clearInterval(this._trackerId);
          this._trackerId = null; // Initialize decelerating autoscroll on drag stop

          requestAnimationFrame(this._startAutoScroll);

          if (this._stopPropagation) {
            event.stopPropagation();
          }
        },
      },
      {
        key: 'onTouchCancel',
        value: function onTouchCancel(
          /*object*/
          event
        ) {
          // Stop tracking velocity
          clearInterval(this._trackerId);
          this._trackerId = null;

          if (this._stopPropagation) {
            event.stopPropagation();
          }
        },
      },
      {
        key: 'onTouchMove',
        value: function onTouchMove(
          /*object*/
          event
        ) {
          if (this._preventDefault) {
            event.preventDefault();
          }

          let moveX = event.touches[0].pageX;
          let moveY = event.touches[0].pageY; // Compute delta scrolled since last drag
          // Mobile, scrolling is inverted

          this._deltaX = MOVE_AMPLITUDE * (this._lastTouchX - moveX);
          this._deltaY = MOVE_AMPLITUDE * (this._lastTouchY - moveY);

          let handleScrollX = this._handleScrollX(this._deltaX, this._deltaY);

          let handleScrollY = this._handleScrollY(this._deltaY, this._deltaX);

          if (!handleScrollX && !handleScrollY) {
            return;
          } // If we can handle scroll update last touch for computing delta

          if (handleScrollX) {
            this._lastTouchX = moveX;
          } else {
            this._deltaX = 0;
          }

          if (handleScrollY) {
            this._lastTouchY = moveY;
          } else {
            this._deltaY = 0;
          } // The event will result in a scroll to the table, so there's no need to also let the parent containers scroll

          if (!event.defaultPrevented) {
            event.preventDefault();
          } // Ensure minimum delta magnitude is met to avoid jitter

          let changed = false;

          if (Math.abs(this._deltaX) > 2 || Math.abs(this._deltaY) > 2) {
            if (this._stopPropagation) {
              event.stopPropagation();
            }

            changed = true;
          } // Request animation frame to trigger scroll of computed delta

          if (changed === true && this._dragAnimationId === null) {
            this._dragAnimationId = requestAnimationFrame(this._didTouchMove);
          }
        },
        /**
         * Fire scroll callback based on computed drag delta.
         * Also track accummulated delta so we can calculate velocity
         */
      },
      {
        key: '_didTouchMove',
        value: function _didTouchMove() {
          this._dragAnimationId = null;

          this._onTouchScrollCallback(this._deltaX, this._deltaY);

          this._accumulatedDeltaX += this._deltaX;
          this._accumulatedDeltaY += this._deltaY;
          this._deltaX = 0;
          this._deltaY = 0;
        },
        /**
         * Compute velocity based on a weighted average of drag over last 100 ms and
         * previous velocity.  Combining into a moving average results in a smoother scroll.
         */
      },
      {
        key: '_track',
        value: function _track() {
          let now = Date.now();
          let elapsed = now - this._lastFrameTimestamp;
          let oldVelocityX = this._velocityX;
          let oldVelocityY = this._velocityY; // We compute velocity using a weighted average of the current velocity and the previous velocity
          // If the previous velocity is 0, put the full weight on the last 100 ms

          let weight = 0.8;

          if (elapsed < TRACKER_TIMEOUT) {
            weight *= elapsed / TRACKER_TIMEOUT;
          }

          if (oldVelocityX === 0 && oldVelocityY === 0) {
            weight = 1;
          } // Formula for computing weighted average of velocity

          this._velocityX =
            weight *
            ((TRACKER_TIMEOUT * this._accumulatedDeltaX) / (1 + elapsed));

          if (weight < 1) {
            this._velocityX += (1 - weight) * oldVelocityX;
          }

          this._velocityY =
            weight *
            ((TRACKER_TIMEOUT * this._accumulatedDeltaY) / (1 + elapsed));

          if (weight < 1) {
            this._velocityY += (1 - weight) * oldVelocityY;
          }

          this._accumulatedDeltaX = 0;
          this._accumulatedDeltaY = 0;
          this._lastFrameTimestamp = now;
        },
        /**
         * To kick off deceleration / momentum scrolling,
         * handle any scrolling from a drag which was waiting for an animation frame
         * Then update our velocity
         * Finally start the momentum scrolling handler (autoScroll)
         */
      },
      {
        key: '_startAutoScroll',
        value: function _startAutoScroll() {
          this._autoScrollTimestamp = Date.now();

          if (this._deltaX > 0 || this.deltaY > 0) {
            this._didTouchMove();
          }

          this._track();

          this._autoScroll();
        },
        /**
         * Compute a scroll delta with an exponential decay based on time elapsed since drag was released.
         * This is called recursively on animation frames until the delta is below a threshold (5 pixels)
         */
      },
      {
        key: '_autoScroll',
        value: function _autoScroll() {
          let elapsed = Date.now() - this._autoScrollTimestamp;

          let factor =
            DECELERATION_AMPLITUDE * Math.exp(-elapsed / DECELERATION_FACTOR);
          let deltaX = factor * this._velocityX;
          let deltaY = factor * this._velocityY;

          if (Math.abs(deltaX) <= 5 || !this._handleScrollX(deltaX, deltaY)) {
            deltaX = 0;
          }

          if (Math.abs(deltaY) <= 5 || !this._handleScrollY(deltaY, deltaX)) {
            deltaY = 0;
          }

          if (deltaX !== 0 || deltaY !== 0) {
            this._onTouchScrollCallback(deltaX, deltaY);

            requestAnimationFrame(this._autoScroll);
          }
        },
      },
    ]);

    return ReactTouchHandler;
  })();

  function _createSuper$4(Derived) {
    let hasNativeReflectConstruct = _isNativeReflectConstruct$4();
    return function _createSuperInternal() {
      let Super = _getPrototypeOf(Derived),
        result;
      if (hasNativeReflectConstruct) {
        let NewTarget = _getPrototypeOf(this).constructor;
        result = Reflect.construct(Super, arguments, NewTarget);
      } else {
        result = Super.apply(this, arguments);
      }
      return _possibleConstructorReturn$2(this, result);
    };
  }

  function _isNativeReflectConstruct$4() {
    if (typeof Reflect === 'undefined' || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === 'function') return true;
    try {
      Boolean.prototype.valueOf.call(
        Reflect.construct(Boolean, [], function () {})
      );
      return true;
    } catch (e) {
      return false;
    }
  }
  let ARROW_SCROLL_SPEED = 25;
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

  let FixedDataTable = /*#__PURE__*/ (function (_React$Component) {
    _inherits$2(FixedDataTable, _React$Component);

    let _super = _createSuper$4(FixedDataTable);

    function FixedDataTable(_props) {
      let _this;

      _classCallCheck$2(this, FixedDataTable);

      _this = _super.call(this, _props);

      _defineProperty$1(
        _assertThisInitialized(_this),
        '_shouldHandleTouchX',
        function (
          /*boolean*/
          /*number*/
          delta
        ) {
          return (
            _this.props.touchScrollEnabled && _this._shouldHandleWheelX(delta)
          );
        }
      );

      _defineProperty$1(
        _assertThisInitialized(_this),
        '_shouldHandleTouchY',
        function (
          /*boolean*/
          /*number*/
          delta
        ) {
          return (
            _this.props.touchScrollEnabled && _this._shouldHandleWheelY(delta)
          );
        }
      );

      _defineProperty$1(
        _assertThisInitialized(_this),
        '_shouldHandleWheelX',
        function (
          /*boolean*/
          /*number*/
          delta
        ) {
          let _this$props = _this.props,
            maxScrollX = _this$props.maxScrollX,
            scrollFlags = _this$props.scrollFlags,
            scrollX = _this$props.scrollX;
          let overflowX = scrollFlags.overflowX;

          if (overflowX === 'hidden') {
            return false;
          }

          delta = Math.round(delta);

          if (delta === 0) {
            return false;
          }

          return (
            (delta < 0 && scrollX > 0) || (delta >= 0 && scrollX < maxScrollX)
          );
        }
      );

      _defineProperty$1(
        _assertThisInitialized(_this),
        '_shouldHandleWheelY',
        function (
          /*boolean*/
          /*number*/
          delta
        ) {
          let _this$props2 = _this.props,
            maxScrollY = _this$props2.maxScrollY,
            scrollFlags = _this$props2.scrollFlags,
            scrollY = _this$props2.scrollY;
          let overflowY = scrollFlags.overflowY;

          if (overflowY === 'hidden' || delta === 0) {
            return false;
          }

          delta = Math.round(delta);

          if (delta === 0) {
            return false;
          }

          return (
            (delta < 0 && scrollY > 0) || (delta >= 0 && scrollY < maxScrollY)
          );
        }
      );

      _defineProperty$1(
        _assertThisInitialized(_this),
        '_reportContentHeight',
        function () {
          let _tableHeightsSelector = tableHeightsSelector(_this.props),
            contentHeight = _tableHeightsSelector.contentHeight;

          let onContentHeightChange = _this.props.onContentHeightChange;

          if (contentHeight !== _this._contentHeight && onContentHeightChange) {
            onContentHeightChange(contentHeight);
          }

          _this._contentHeight = contentHeight;
        }
      );

      _defineProperty$1(
        _assertThisInitialized(_this),
        '_renderRows',
        function (
          /*object*/
          /*number*/
          offsetTop,
          fixedCellTemplates,
          fixedRightCellTemplates,
          scrollableCellTemplates,
          bodyHeight,
          /*number*/
          ariaRowIndexOffset
        ) {
          let _scrollbarsVisible = scrollbarsVisible$1(_this.props),
            scrollEnabledY = _scrollbarsVisible.scrollEnabledY;

          let props = _this.props;
          return /*#__PURE__*/ React__default['default'].createElement(
            FixedDataTableBufferedRows,
            {
              ariaRowIndexOffset,
              isScrolling: props.scrolling,
              fixedColumns: fixedCellTemplates,
              fixedRightColumns: fixedRightCellTemplates,
              firstViewportRowIndex: props.firstRowIndex,
              endViewportRowIndex: props.endRowIndex,
              height: bodyHeight,
              offsetTop,
              onRowClick: props.onRowClick,
              onRowContextMenu: props.onRowContextMenu,
              onRowDoubleClick: props.onRowDoubleClick,
              onRowMouseUp: props.onRowMouseUp,
              onRowMouseDown: props.onRowMouseDown,
              onRowMouseEnter: props.onRowMouseEnter,
              onRowMouseLeave: props.onRowMouseLeave,
              onRowTouchStart: props.touchScrollEnabled
                ? props.onRowTouchStart
                : null,
              onRowTouchEnd: props.touchScrollEnabled
                ? props.onRowTouchEnd
                : null,
              onRowTouchMove: props.touchScrollEnabled
                ? props.onRowTouchMove
                : null,
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
              rowOffsets: props.rowOffsets,
              showScrollbarY: scrollEnabledY,
              scrollbarYWidth: props.scrollbarYWidth,
              isRTL: props.isRTL,
            }
          );
        }
      );

      _defineProperty$1(
        _assertThisInitialized(_this),
        '_onRef',
        function (div) {
          _this._divRef = div;

          if (_this._wheelHandler) {
            if (_this.props.stopReactWheelPropagation) {
              _this._wheelHandler.setRoot(div);
            } else {
              _this._wheelHandler.setRoot(null);
            }
          }
        }
      );

      _defineProperty$1(
        _assertThisInitialized(_this),
        '_onScroll',
        function (
          /*number*/
          deltaX,
          /*number*/
          deltaY
        ) {
          let _this$props3 = _this.props,
            maxScrollX = _this$props3.maxScrollX,
            maxScrollY = _this$props3.maxScrollY,
            onHorizontalScroll = _this$props3.onHorizontalScroll,
            onVerticalScroll = _this$props3.onVerticalScroll,
            scrollActions = _this$props3.scrollActions,
            scrollFlags = _this$props3.scrollFlags,
            scrollX = _this$props3.scrollX,
            scrollY = _this$props3.scrollY;
          _this$props3.scrolling;
          let overflowX = scrollFlags.overflowX,
            overflowY = scrollFlags.overflowY;
          let x = scrollX;
          let y = scrollY;

          if (Math.abs(deltaY) > Math.abs(deltaX) && overflowY !== 'hidden') {
            y += deltaY;
            y = y < 0 ? 0 : y;
            y = y > maxScrollY ? maxScrollY : y; //NOTE (jordan) This is a hacky workaround to prevent FDT from setting its internal state

            if (onVerticalScroll ? onVerticalScroll(y) : true) {
              scrollActions.scrollToY(y);
            }
          } else if (deltaX && overflowX !== 'hidden') {
            x += deltaX;
            x = x < 0 ? 0 : x;
            x = x > maxScrollX ? maxScrollX : x; // This is a workaround to prevent content blurring. This happens when translate3d
            // is applied with non-rounded values to elements having text.

            let roundedX = Math.round(x); //NOTE (asif) This is a hacky workaround to prevent FDT from setting its internal state

            if (onHorizontalScroll ? onHorizontalScroll(roundedX) : true) {
              scrollActions.scrollToX(roundedX);
            }
          }
        }
      );

      _defineProperty$1(
        _assertThisInitialized(_this),
        '_scrollTo',
        function (
          /*number*/
          scrollX,
          /*number*/
          scrollY
        ) {
          _this.props.scrollActions.scrollToX(scrollX);

          _this.props.scrollActions.scrollToY(scrollY);
        }
      );

      _defineProperty$1(
        _assertThisInitialized(_this),
        '_didScroll',
        function (
          /* !object */
          prevProps
        ) {
          let _this$props4 = _this.props,
            onScrollStart = _this$props4.onScrollStart,
            scrollX = _this$props4.scrollX,
            scrollY = _this$props4.scrollY,
            onHorizontalScroll = _this$props4.onHorizontalScroll,
            onVerticalScroll = _this$props4.onVerticalScroll,
            ownerHeight = _this$props4.tableSize.ownerHeight,
            scrolling = _this$props4.scrolling;
          let oldEndRowIndex = prevProps.endRowIndex,
            oldFirstRowIndex = prevProps.firstRowIndex,
            oldScrollX = prevProps.scrollX,
            oldScrollY = prevProps.scrollY,
            oldOwnerHeight = prevProps.tableSize.ownerHeight,
            oldScrolling = prevProps.scrolling; // check if scroll values have changed - we have an extra check on NaN because (NaN !== NaN)

          let ownerHeightChanged =
            ownerHeight !== oldOwnerHeight &&
            !(_isNaN(ownerHeight) && _isNaN(oldOwnerHeight));
          let scrollXChanged = scrollX !== oldScrollX;
          let scrollYChanged = scrollY !== oldScrollY; // if none of the above changed, then a scroll didn't happen at all

          if (!ownerHeightChanged && !scrollXChanged && !scrollYChanged) {
            return;
          } // only call onScrollStart if scrolling wasn't on previously

          if (!oldScrolling && scrolling && onScrollStart) {
            onScrollStart(
              oldScrollX,
              oldScrollY,
              oldFirstRowIndex,
              oldEndRowIndex
            );
          }

          if (scrollXChanged && onHorizontalScroll) {
            onHorizontalScroll(scrollX);
          }

          if (scrollYChanged && onVerticalScroll) {
            onVerticalScroll(scrollY);
          } // debounced version of didScrollStop as we don't immediately stop scrolling

          _this._didScrollStop();
        }
      );

      _defineProperty$1(
        _assertThisInitialized(_this),
        '_didScrollStopSync',
        function () {
          let _this$props5 = _this.props,
            endRowIndex = _this$props5.endRowIndex,
            firstRowIndex = _this$props5.firstRowIndex,
            onScrollEnd = _this$props5.onScrollEnd,
            scrollActions = _this$props5.scrollActions,
            scrollX = _this$props5.scrollX,
            scrollY = _this$props5.scrollY,
            scrolling = _this$props5.scrolling;

          if (!scrolling) {
            return;
          }

          scrollActions.stopScroll();

          if (onScrollEnd) {
            onScrollEnd(scrollX, scrollY, firstRowIndex, endRowIndex);
          }
        }
      );

      _this._didScrollStop = debounce(
        _this._didScrollStopSync,
        200,
        _assertThisInitialized(_this)
      );
      _this._onKeyDown = _this._onKeyDown.bind(_assertThisInitialized(_this));

      _this._setupHandlers();

      return _this;
    }

    _createClass$2(FixedDataTable, [
      {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
          this._cleanupHandlers(); // Cancel any pending debounced scroll handling and handle immediately.

          this._didScrollStop.reset();

          this._didScrollStopSync();
        },
      },
      {
        key: '_setupHandlers',
        value: function _setupHandlers() {
          if (!this._wheelHandler) {
            this._wheelHandler = new ReactWheelHandler(
              this._onScroll,
              this._shouldHandleWheelX,
              this._shouldHandleWheelY,
              this.props.isRTL,
              this.props.stopScrollDefaultHandling,
              this.props.stopScrollPropagation
            );
          }

          if (!this._touchHandler) {
            this._touchHandler = new ReactTouchHandler(
              this._onScroll,
              this._shouldHandleTouchX,
              this._shouldHandleTouchY,
              this.props.stopScrollDefaultHandling,
              this.props.stopScrollPropagation
            );
          } // TODO (pradeep): Remove these and pass to our table component directly after
          // React provides an API where event handlers can be specified to be non-passive (facebook/react#6436)

          if (this._divRef) {
            this._divRef.addEventListener('wheel', this._wheelHandler.onWheel, {
              passive: false,
            });
          }

          if (this.props.touchScrollEnabled && this._divRef) {
            this._divRef.addEventListener(
              'touchmove',
              this._touchHandler.onTouchMove,
              {
                passive: false,
              }
            );
          }
        },
      },
      {
        key: '_cleanupHandlers',
        value: function _cleanupHandlers() {
          if (this._wheelHandler) {
            if (this._divRef) {
              this._divRef.removeEventListener(
                'wheel',
                this._wheelHandler.onWheel,
                {
                  passive: false,
                }
              );
            }

            this._wheelHandler = null;
          }

          if (this._touchHandler) {
            if (this._divRef) {
              this._divRef.removeEventListener(
                'touchmove',
                this._touchHandler.onTouchMove,
                {
                  passive: false,
                }
              );
            }

            this._touchHandler = null;
          }
        },
      },
      {
        key: '_onKeyDown',
        value: function _onKeyDown(event) {
          let _tableHeightsSelector2 = tableHeightsSelector(this.props),
            scrollbarYHeight = _tableHeightsSelector2.scrollbarYHeight;

          if (this.props.keyboardPageEnabled) {
            switch (event.key) {
              case 'PageDown':
                this._onScroll(0, scrollbarYHeight);

                event.preventDefault();
                break;

              case 'PageUp':
                this._onScroll(0, scrollbarYHeight * -1);

                event.preventDefault();
                break;
            }
          }

          if (this.props.keyboardScrollEnabled) {
            switch (event.key) {
              case 'ArrowDown':
                this._onScroll(0, ARROW_SCROLL_SPEED);

                event.preventDefault();
                break;

              case 'ArrowUp':
                this._onScroll(0, ARROW_SCROLL_SPEED * -1);

                event.preventDefault();
                break;

              case 'ArrowRight':
                this._onScroll(ARROW_SCROLL_SPEED, 0);

                event.preventDefault();
                break;

              case 'ArrowLeft':
                this._onScroll(ARROW_SCROLL_SPEED * -1, 0);

                event.preventDefault();
                break;
            }
          }
        },
      },
      {
        key: 'shouldComponentUpdate',
        value: function shouldComponentUpdate(nextProps) {
          return !shallowEqual(this.props, nextProps);
        },
      },
      {
        key: 'componentDidMount',
        value: function componentDidMount() {
          this._setupHandlers();

          this._reportContentHeight();

          this._reportScrollBarsUpdates();
        },
      },
      {
        key: 'componentDidUpdate',
        value: function componentDidUpdate(
          /*object*/
          prevProps
        ) {
          this._didScroll(prevProps);

          this._reportContentHeight();

          this._reportScrollBarsUpdates();
        },
        /**
         * Method to report scrollbars updates
         * @private
         */
      },
      {
        key: '_reportScrollBarsUpdates',
        value: function _reportScrollBarsUpdates() {
          let _tableHeightsSelector3 = tableHeightsSelector(this.props),
            bodyOffsetTop = _tableHeightsSelector3.bodyOffsetTop,
            scrollbarXOffsetTop = _tableHeightsSelector3.scrollbarXOffsetTop,
            visibleRowsHeight = _tableHeightsSelector3.visibleRowsHeight;

          let _this$props6 = this.props,
            width = _this$props6.tableSize.width,
            scrollContentHeight = _this$props6.scrollContentHeight,
            scrollY = _this$props6.scrollY,
            scrollX = _this$props6.scrollX;
          let newScrollState = {
            viewportHeight: visibleRowsHeight,
            contentHeight: scrollContentHeight,
            scrollbarYOffsetTop: bodyOffsetTop,
            scrollY,
            viewportWidth: width,
            contentWidth: width + this.props.maxScrollX,
            scrollbarXOffsetTop,
            scrollX,
            scrollTo: this._scrollTo,
            scrollToX: this.props.scrollActions.scrollToX,
            scrollToY: this.props.scrollActions.scrollToY,
          };

          if (!shallowEqual(this.previousScrollState, newScrollState)) {
            this.props.onScrollBarsUpdate(newScrollState);
            this.previousScrollState = newScrollState;
          }
        },
      },
      {
        key: 'render',
        value: function render() /*object*/
        {
          let _ariaAttributesSelect = ariaAttributesSelector(this.props),
            ariaGroupHeaderIndex = _ariaAttributesSelect.ariaGroupHeaderIndex,
            ariaHeaderIndex = _ariaAttributesSelect.ariaHeaderIndex,
            ariaFooterIndex = _ariaAttributesSelect.ariaFooterIndex,
            ariaRowCount = _ariaAttributesSelect.ariaRowCount,
            ariaRowIndexOffset = _ariaAttributesSelect.ariaRowIndexOffset;

          let _columnTemplatesSelec = columnTemplatesSelector(this.props),
            fixedColumnGroups = _columnTemplatesSelec.fixedColumnGroups,
            fixedColumns = _columnTemplatesSelec.fixedColumns,
            fixedRightColumnGroups =
              _columnTemplatesSelec.fixedRightColumnGroups,
            fixedRightColumns = _columnTemplatesSelec.fixedRightColumns,
            scrollableColumnGroups =
              _columnTemplatesSelec.scrollableColumnGroups,
            scrollableColumns = _columnTemplatesSelec.scrollableColumns;

          let _tableHeightsSelector4 = tableHeightsSelector(this.props),
            bodyHeight = _tableHeightsSelector4.bodyHeight,
            bodyOffsetTop = _tableHeightsSelector4.bodyOffsetTop,
            componentHeight = _tableHeightsSelector4.componentHeight,
            footOffsetTop = _tableHeightsSelector4.footOffsetTop,
            scrollbarXOffsetTop = _tableHeightsSelector4.scrollbarXOffsetTop,
            visibleRowsHeight = _tableHeightsSelector4.visibleRowsHeight;

          let _this$props7 = this.props,
            className = _this$props7.className,
            elementHeights = _this$props7.elementHeights,
            gridAttributesGetter = _this$props7.gridAttributesGetter;
          _this$props7.maxScrollX;
          let maxScrollY = _this$props7.maxScrollY,
            onColumnReorderEndCallback =
              _this$props7.onColumnReorderEndCallback,
            onColumnResizeEndCallback = _this$props7.onColumnResizeEndCallback,
            scrollContentHeight = _this$props7.scrollContentHeight,
            scrollX = _this$props7.scrollX,
            scrollY = _this$props7.scrollY,
            scrolling = _this$props7.scrolling,
            tableSize = _this$props7.tableSize,
            touchScrollEnabled = _this$props7.touchScrollEnabled,
            scrollbarYWidth = _this$props7.scrollbarYWidth;
          let ownerHeight = tableSize.ownerHeight,
            width = tableSize.width;
          let cellGroupWrapperHeight = elementHeights.cellGroupWrapperHeight,
            footerHeight = elementHeights.footerHeight,
            groupHeaderHeight = elementHeights.groupHeaderHeight,
            headerHeight = elementHeights.headerHeight;

          let _scrollbarsVisible2 = scrollbarsVisible$1(this.props),
            scrollEnabledX = _scrollbarsVisible2.scrollEnabledX,
            scrollEnabledY = _scrollbarsVisible2.scrollEnabledY;

          let attributes = gridAttributesGetter && gridAttributesGetter();
          let groupHeader;

          if (groupHeaderHeight > 0) {
            groupHeader = /*#__PURE__*/ React__default['default'].createElement(
              FixedDataTableRow,
              {
                key: 'group_header',
                ariaRowIndex: ariaGroupHeaderIndex,
                isHeaderOrFooter: true,
                isScrolling: scrolling,
                className: joinClasses(
                  cx('fixedDataTableLayout/header'),
                  cx('public/fixedDataTable/header')
                ),
                width,
                height: groupHeaderHeight,
                cellGroupWrapperHeight,
                index: 0,
                zIndex: 1,
                offsetTop: 0,
                scrollLeft: scrollX,
                fixedColumns: fixedColumnGroups,
                fixedRightColumns: fixedRightColumnGroups,
                scrollableColumns: scrollableColumnGroups,
                visible: true,
                touchEnabled: touchScrollEnabled,
                onColumnResizeEndCallback,
                onColumnReorderEndCallback,
                showScrollbarY: scrollEnabledY,
                scrollbarYWidth,
                isRTL: this.props.isRTL,
                isHeader: true,
                isGroupHeader: true,
              }
            );
          }

          let scrollbarY;

          if (scrollEnabledY) {
            scrollbarY = this.props.scrollbarY;
          }

          let scrollbarX;

          if (scrollEnabledX) {
            scrollbarX = this.props.scrollbarX;
          }

          let footer = null;

          if (footerHeight) {
            footer = /*#__PURE__*/ React__default['default'].createElement(
              FixedDataTableRow,
              {
                key: 'footer',
                ariaRowIndex: ariaFooterIndex,
                isHeaderOrFooter: true,
                isScrolling: scrolling,
                className: joinClasses(
                  cx('fixedDataTableLayout/footer'),
                  cx('public/fixedDataTable/footer')
                ),
                width,
                height: footerHeight,
                index: -1,
                zIndex: 1,
                offsetTop: footOffsetTop,
                visible: true,
                fixedColumns: fixedColumns.footer,
                fixedRightColumns: fixedRightColumns.footer,
                scrollableColumns: scrollableColumns.footer,
                scrollLeft: scrollX,
                showScrollbarY: scrollEnabledY,
                scrollbarYWidth,
                isRTL: this.props.isRTL,
              }
            );
          }

          let rows = this._renderRows(
            bodyOffsetTop,
            fixedColumns.cell,
            fixedRightColumns.cell,
            scrollableColumns.cell,
            bodyHeight,
            ariaRowIndexOffset
          );

          let header = /*#__PURE__*/ React__default['default'].createElement(
            FixedDataTableRow,
            {
              key: 'header',
              ariaRowIndex: ariaHeaderIndex,
              isHeaderOrFooter: true,
              isScrolling: scrolling,
              className: joinClasses(
                cx('fixedDataTableLayout/header'),
                cx('public/fixedDataTable/header')
              ),
              width,
              height: headerHeight,
              cellGroupWrapperHeight,
              index: -1,
              zIndex: 1,
              offsetTop: groupHeaderHeight,
              scrollLeft: scrollX,
              visible: true,
              fixedColumns: fixedColumns.header,
              fixedRightColumns: fixedRightColumns.header,
              scrollableColumns: scrollableColumns.header,
              touchEnabled: touchScrollEnabled,
              onColumnResizeEndCallback,
              onColumnReorderEndCallback,
              showScrollbarY: scrollEnabledY,
              scrollbarYWidth,
              isRTL: this.props.isRTL,
              isHeader: true,
            }
          );
          let topShadow;

          if (scrollY) {
            topShadow = /*#__PURE__*/ React__default['default'].createElement(
              'div',
              {
                className: joinClasses(
                  cx('fixedDataTableLayout/topShadow'),
                  cx('public/fixedDataTable/topShadow')
                ),
                style: {
                  top: bodyOffsetTop,
                },
              }
            );
          } // ownerScrollAvailable is true if the rows rendered will overflow the owner element
          // so we show a shadow in that case even if the FDT component can't scroll anymore

          let ownerScrollAvailable =
            ownerHeight &&
            ownerHeight < componentHeight &&
            scrollContentHeight > visibleRowsHeight;
          let bottomShadow;

          if (ownerScrollAvailable || scrollY < maxScrollY) {
            bottomShadow = /*#__PURE__*/ React__default[
              'default'
            ].createElement('div', {
              className: joinClasses(
                cx('fixedDataTableLayout/bottomShadow'),
                cx('public/fixedDataTable/bottomShadow')
              ),
              style: {
                top: footOffsetTop,
              },
            });
          }

          let tabIndex = null;

          if (
            this.props.keyboardPageEnabled ||
            this.props.keyboardScrollEnabled
          ) {
            tabIndex = 0;
          }

          let tableClassName = className;

          if (this.props.isRTL) {
            tableClassName = joinClasses(
              tableClassName,
              'fixedDataTable_isRTL'
            );
          }

          return /*#__PURE__*/ React__default['default'].createElement(
            'div',
            _extends(
              {
                className: joinClasses(
                  tableClassName,
                  cx('fixedDataTableLayout/main'),
                  cx('public/fixedDataTable/main')
                ),
                role: 'grid',
                'aria-rowcount': ariaRowCount,
              },
              attributes,
              {
                tabIndex,
                onKeyDown: this._onKeyDown,
                onTouchStart: touchScrollEnabled
                  ? this._touchHandler.onTouchStart
                  : null,
                onTouchEnd: touchScrollEnabled
                  ? this._touchHandler.onTouchEnd
                  : null,
                onTouchCancel: touchScrollEnabled
                  ? this._touchHandler.onTouchCancel
                  : null,
                ref: this._onRef,
                style: {
                  height: componentHeight,
                  width,
                },
              }
            ),
            /*#__PURE__*/ React__default['default'].createElement(
              'div',
              {
                className: cx('fixedDataTableLayout/rowsContainer'),
                style: {
                  height: scrollbarXOffsetTop,
                  width,
                },
              },
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
      },
    ]);

    return FixedDataTable;
  })(React__default['default'].Component);

  _defineProperty$1(FixedDataTable, 'propTypes', {
    // TODO (jordan) Remove propType of width without losing documentation (moved to tableSize)

    /**
     * Pixel width of table. If all columns do not fit,
     * a horizontal scrollbar will appear.
     */
    width: PropTypes.number.isRequired,
    // TODO (jordan) Remove propType of height without losing documentation (moved to tableSize)

    /**
     * Pixel height of table. If all rows do not fit,
     * a vertical scrollbar will appear.
     *
     * Either `height` or `maxHeight` must be specified.
     */
    height: PropTypes.number,

    /**
     * Class name to be passed into parent container
     */
    className: PropTypes.string,
    // TODO (jordan) Remove propType of maxHeight without losing documentation (moved to tableSize)

    /**
     * Maximum pixel height of table. If all rows do not fit,
     * a vertical scrollbar will appear.
     *
     * Either `height` or `maxHeight` must be specified.
     */
    maxHeight: PropTypes.number,
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
    ownerHeight: PropTypes.number,
    // TODO (jordan) Remove propType of overflowX & overflowY without losing documentation (moved to scrollFlags)
    overflowX: PropTypes.oneOf(['hidden', 'auto']),
    overflowY: PropTypes.oneOf(['hidden', 'auto']),

    /**
     * Boolean flag indicating of touch scrolling should be enabled
     * This feature is current in beta and may have bugs
     */
    touchScrollEnabled: PropTypes.bool,

    /**
     * Boolean flags to control if scrolling with keys is enabled
     */
    keyboardScrollEnabled: PropTypes.bool,
    keyboardPageEnabled: PropTypes.bool,

    /**
     * Scrollbar X to be rendered
     */
    scrollbarX: PropTypes.node,

    /**
     * Height to be reserved for scrollbar X
     */
    scrollbarXHeight: PropTypes.number,

    /**
     * Scrollbar Y to be rendered
     */
    scrollbarY: PropTypes.node,

    /**
     * Width to be reserved for scrollbar Y
     */
    scrollbarYWidth: PropTypes.number,

    /**
     * Function to listen to scroll bars related updates like scroll position, visible rows height, all rows height,....
     */
    onScrollBarsUpdate: PropTypes.func,
    // TODO Remove propType of defaultScrollbars without losing documentation (this is required for FixedDataTableContainer only)

    /**
     * Default scrollbars provided by FDT-2 will be rendered, pass false if you want to render custom scrollbars (by passing scrollbarX and scrollbarY props)
     */
    defaultScrollbars: PropTypes.bool,
    // TODO (jordan) Remove propType of showScrollbarX & showScrollbarY without losing documentation (moved to scrollFlags)

    /**
     * Hide the scrollbar but still enable scroll functionality
     */
    showScrollbarX: PropTypes.bool,
    showScrollbarY: PropTypes.bool,

    /**
     * Callback when horizontally scrolling the grid.
     *
     * Return false to stop propagation.
     */
    onHorizontalScroll: PropTypes.func,

    /**
     * Callback when vertically scrolling the grid.
     *
     * Return false to stop propagation.
     */
    onVerticalScroll: PropTypes.func,
    // TODO (jordan) Remove propType of rowsCount without losing documentation (moved to rowSettings)

    /**
     * Number of rows in the table.
     */
    rowsCount: PropTypes.number.isRequired,
    // TODO (jordan) Remove propType of rowHeight without losing documentation (moved to rowSettings)

    /**
     * Pixel height of rows unless `rowHeightGetter` is specified and returns
     * different value.
     */
    rowHeight: PropTypes.number.isRequired,
    // TODO (jordan) Remove propType of rowHeightGetter without losing documentation (moved to rowSettings)

    /**
     * If specified, `rowHeightGetter(index)` is called for each row and the
     * returned value overrides `rowHeight` for particular row.
     */
    rowHeightGetter: PropTypes.func,
    // TODO (jordan) Remove propType of subRowHeight without losing documentation (moved to rowSettings)

    /**
     * Pixel height of sub-row unless `subRowHeightGetter` is specified and returns
     * different value.  Defaults to 0 and no sub-row being displayed.
     */
    subRowHeight: PropTypes.number,
    // TODO (jordan) Remove propType of subRowHeightGetter without losing documentation (moved to rowSettings)

    /**
     * If specified, `subRowHeightGetter(index)` is called for each row and the
     * returned value overrides `subRowHeight` for particular row.
     */
    subRowHeightGetter: PropTypes.func,

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
    rowExpanded: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),

    /**
     * To get any additional CSS classes that should be added to a row,
     * `rowClassNameGetter(index)` is called.
     */
    rowClassNameGetter: PropTypes.func,

    /**
     * If specified, `rowKeyGetter(index)` is called for each row and the
     * returned value overrides `key` for the particular row.
     */
    rowKeyGetter: PropTypes.func,
    // TODO (jordan) Remove propType of groupHeaderHeight without losing documentation (moved to elementHeights)

    /**
     * Pixel height of the column group header.
     */
    groupHeaderHeight: PropTypes.number,
    // TODO (jordan) Remove propType of headerHeight without losing documentation (moved to elementHeights)

    /**
     * Pixel height of header.
     */
    headerHeight: PropTypes.number.isRequired,

    /**
     * Pixel height of fixedDataTableCellGroupLayout/cellGroupWrapper.
     * Default is headerHeight and groupHeaderHeight.
     *
     * This can be used with CSS to make a header cell span both the group & normal header row.
     * Setting this to a value larger than height will cause the content to
     * overflow the height. This is useful when adding a 2nd table as the group
     * header and vertically merging the 2 headers when a column is not part
     * of a group. Here are the necessary CSS changes:
     *
     * Both headers:
     *  - cellGroupWrapper needs overflow-x: hidden and pointer-events: none
     *  - cellGroup needs pointer-events: auto to reenable them on child els
     * Group header:
     *  - Layout/main needs overflow: visible and a higher z-index
     *  - CellLayout/main needs overflow-y: visible
     *  - cellGroup needs overflow: visible
     */
    cellGroupWrapperHeight: PropTypes.number,
    // TODO (jordan) Remove propType of footerHeight without losing documentation (moved to elementHeights)

    /**
     * Pixel height of footer.
     */
    footerHeight: PropTypes.number,

    /**
     * Value of horizontal scroll.
     */
    scrollLeft: PropTypes.number,
    // TODO (jordan) Remove propType of scrollToRow & scrollToColumn without losing documentation

    /**
     * Index of column to scroll to.
     */
    scrollToColumn: PropTypes.number,

    /**
     * Value of vertical scroll.
     */
    scrollTop: PropTypes.number,

    /**
     * Index of row to scroll to.
     */
    scrollToRow: PropTypes.number,

    /**
     * Callback that is called when scrolling starts. The current horizontal and vertical scroll values,
     * and the current first and last row indexes will be provided to the callback.
     */
    onScrollStart: PropTypes.func,

    /**
     * Callback that is called when scrolling ends. The new horizontal and vertical scroll values,
     * and the new first and last row indexes will be provided to the callback.
     */
    onScrollEnd: PropTypes.func,

    /**
     * If enabled scroll events will not be propagated outside of the table.
     */
    stopReactWheelPropagation: PropTypes.bool,

    /**
     * If enabled scroll events will never be bubbled to the browser default handler.
     * If disabled (default when unspecified), scroll events will be bubbled up if the scroll
     * doesn't lead to a change in scroll offsets, which is preferable if you like
     * the page/container to scroll up when the table is already scrolled up max.
     */
    stopScrollDefaultHandling: PropTypes.bool,

    /**
     * If enabled scroll events will not be propagated outside of the table.
     */
    stopScrollPropagation: PropTypes.bool,

    /**
     * Callback that is called when `rowHeightGetter` returns a different height
     * for a row than the `rowHeight` prop. This is necessary because initially
     * table estimates heights of some parts of the content.
     */
    onContentHeightChange: PropTypes.func,

    /**
     * Callback that is called when a row is clicked.
     */
    onRowClick: PropTypes.func,

    /**
     * Callback that is called when a contextual-menu event happens on a row.
     */
    onRowContextMenu: PropTypes.func,

    /**
     * Callback that is called when a row is double clicked.
     */
    onRowDoubleClick: PropTypes.func,

    /**
     * Callback that is called when a mouse-down event happens on a row.
     */
    onRowMouseDown: PropTypes.func,

    /**
     * Callback that is called when a mouse-up event happens on a row.
     */
    onRowMouseUp: PropTypes.func,

    /**
     * Callback that is called when a mouse-enter event happens on a row.
     */
    onRowMouseEnter: PropTypes.func,

    /**
     * Callback that is called when a mouse-leave event happens on a row.
     */
    onRowMouseLeave: PropTypes.func,

    /**
     * Callback that is called when a touch-start event happens on a row.
     */
    onRowTouchStart: PropTypes.func,

    /**
     * Callback that is called when a touch-end event happens on a row.
     */
    onRowTouchEnd: PropTypes.func,

    /**
     * Callback that is called when a touch-move event happens on a row.
     */
    onRowTouchMove: PropTypes.func,

    /**
     * @deprecated This prop is deprecated in favor of the ResizeCell plugin
     * component. Please refer to the "Resizable columns" example for usage.
     *
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
    onColumnResizeEndCallback: PropTypes.func,

    /**
     * @deprecated This prop is deprecated in favor of the ReorderCell plugin
     * component. Please refer to the "Reorderable columns" example for usage.
     *
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
    onColumnReorderEndCallback: PropTypes.func,

    /**
     * Whether the grid should be in RTL mode
     */
    isRTL: PropTypes.bool,
    // TODO (jordan) Remove propType of bufferRowCount without losing documentation

    /**
     * The number of rows outside the viewport to prerender. Defaults to roughly
     * half of the number of visible rows.
     */
    bufferRowCount: PropTypes.number,
    // TODO (pradeep): Move elementHeights to a selector instead of passing it through redux as state variables

    /**
     * Row heights of the header, groupheader, footer, and cell group wrapper
     * grouped into a single object.
     *
     * @ignore
     */
    elementHeights: PropTypes.shape({
      cellGroupWrapperHeight: PropTypes.number,
      footerHeight: PropTypes.number,
      groupHeaderHeight: PropTypes.number,
      headerHeight: PropTypes.number,
    }),

    /**
     * Callback that returns an object of html attributes to add to the grid element
     */
    gridAttributesGetter: PropTypes.func,
    // TODO (pradeep) Remove propType of rowAttributesGetter without losing documentation (moved to rowSettings)

    /**
     * Callback that returns an object of html attributes to add to each row element.
     *
     * ```
     * function(rowIndex: number)
     * ```
     */
    rowAttributesGetter: PropTypes.func,
  });

  _defineProperty$1(
    FixedDataTable,
    'defaultProps',
    /*object*/
    {
      elementHeights: {
        cellGroupWrapperHeight: undefined,
        footerHeight: 0,
        groupHeaderHeight: 0,
        headerHeight: 0,
      },
      keyboardScrollEnabled: false,
      keyboardPageEnabled: false,
      touchScrollEnabled: false,
      stopScrollPropagation: false,
    }
  );

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
  let FixedDataTableStore = {
    get: function get() {
      return configureStore({
        reducer,
        devTools: true,
        middleware: function middleware(getDefaultMiddleware) {
          return getDefaultMiddleware({
            // Todo(deshpsuy): Have to disable immutableCheck because state has circular JSON somewhere in it. Need to investigate it.
            immutableCheck: false,
            serializableCheck: false,
          });
        },
      });
    },
  };

  let baseKeys$1 = _baseKeys,
    getTag$1 = _getTag,
    isArguments = isArguments_1,
    isArray$1 = isArray_1,
    isArrayLike$1 = isArrayLike_1,
    isBuffer = isBuffer$3.exports,
    isPrototype = _isPrototype,
    isTypedArray = isTypedArray_1;

  /** `Object#toString` result references. */
  let mapTag$1 = '[object Map]',
    setTag$1 = '[object Set]';

  /** Used for built-in method references. */
  let objectProto = Object.prototype;

  /** Used to check objects for own properties. */
  let hasOwnProperty = objectProto.hasOwnProperty;

  /**
   * Checks if `value` is an empty object, collection, map, or set.
   *
   * Objects are considered empty if they have no own enumerable string keyed
   * properties.
   *
   * Array-like values such as `arguments` objects, arrays, buffers, strings, or
   * jQuery-like collections are considered empty if they have a `length` of `0`.
   * Similarly, maps and sets are considered empty if they have a `size` of `0`.
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is empty, else `false`.
   * @example
   *
   * _.isEmpty(null);
   * // => true
   *
   * _.isEmpty(true);
   * // => true
   *
   * _.isEmpty(1);
   * // => true
   *
   * _.isEmpty([1, 2, 3]);
   * // => false
   *
   * _.isEmpty({ 'a': 1 });
   * // => false
   */
  function isEmpty(value) {
    if (value == null) {
      return true;
    }
    if (
      isArrayLike$1(value) &&
      (isArray$1(value) ||
        typeof value == 'string' ||
        typeof value.splice == 'function' ||
        isBuffer(value) ||
        isTypedArray(value) ||
        isArguments(value))
    ) {
      return !value.length;
    }
    let tag = getTag$1(value);
    if (tag == mapTag$1 || tag == setTag$1) {
      return !value.size;
    }
    if (isPrototype(value)) {
      return !baseKeys$1(value).length;
    }
    for (let key in value) {
      if (hasOwnProperty.call(value, key)) {
        return false;
      }
    }
    return true;
  }

  let isEmpty_1 = isEmpty;

  function _createSuper$3(Derived) {
    let hasNativeReflectConstruct = _isNativeReflectConstruct$3();
    return function _createSuperInternal() {
      let Super = _getPrototypeOf(Derived),
        result;
      if (hasNativeReflectConstruct) {
        let NewTarget = _getPrototypeOf(this).constructor;
        result = Reflect.construct(Super, arguments, NewTarget);
      } else {
        result = Super.apply(this, arguments);
      }
      return _possibleConstructorReturn$2(this, result);
    };
  }

  function _isNativeReflectConstruct$3() {
    if (typeof Reflect === 'undefined' || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === 'function') return true;
    try {
      Boolean.prototype.valueOf.call(
        Reflect.construct(Boolean, [], function () {})
      );
      return true;
    } catch (e) {
      return false;
    }
  }

  let ScrollContainer = /*#__PURE__*/ (function (_React$Component) {
    _inherits$2(ScrollContainer, _React$Component);

    let _super = _createSuper$3(ScrollContainer);

    function ScrollContainer() {
      let _this;

      _classCallCheck$2(this, ScrollContainer);

      for (
        var _len = arguments.length, _args = new Array(_len), _key = 0;
        _key < _len;
        _key++
      ) {
        _args[_key] = arguments[_key];
      }

      _this = _super.call.apply(_super, [this].concat(_args));

      _defineProperty$1(_assertThisInitialized(_this), 'state', {});

      _defineProperty$1(
        _assertThisInitialized(_this),
        '_onScrollBarsUpdate',
        function (args) {
          _this.setState(args);
        }
      );

      _defineProperty$1(
        _assertThisInitialized(_this),
        '_onVerticalScroll',
        function (
          /*number*/
          scrollPos
        ) {
          if (_this.state.scrollToY !== undefined) {
            _this.state.scrollToY(scrollPos);
          }
        }
      );

      _defineProperty$1(
        _assertThisInitialized(_this),
        '_onHorizontalScroll',
        function (
          /*number*/
          scrollPos
        ) {
          if (_this.state.scrollToX !== undefined) {
            _this.state.scrollToX(scrollPos);
          }
        }
      );

      return _this;
    }

    _createClass$2(ScrollContainer, [
      {
        key: 'render',
        value: function render() {
          let scrollbarY =
            !isEmpty_1(this.state) &&
            /*#__PURE__*/ React__default['default'].createElement(Scrollbar, {
              size: this.state.viewportHeight,
              contentSize: this.state.contentHeight,
              onScroll: this._onVerticalScroll,
              verticalTop: this.state.scrollbarYOffsetTop,
              position: this.state.scrollY,
              touchEnabled: this.props.touchScrollEnabled,
              isRTL: this.props.isRTL,
            });
          let scrollbarX =
            !isEmpty_1(this.state) &&
            /*#__PURE__*/ React__default['default'].createElement(
              HorizontalScrollbar,
              {
                contentSize: this.state.contentWidth,
                offset: this.state.scrollbarXOffsetTop,
                onScroll: this._onHorizontalScroll,
                position: this.state.scrollX,
                size: this.state.viewportWidth,
                touchEnabled: this.props.touchScrollEnabled,
                isRTL: this.props.isRTL,
              }
            );
          return /*#__PURE__*/ React__default['default'].cloneElement(
            this.props.children,
            {
              onScrollBarsUpdate: this._onScrollBarsUpdate,
              scrollbarX,
              scrollbarY,
            }
          );
        },
      },
    ]);

    return ScrollContainer;
  })(React__default['default'].Component);

  var HorizontalScrollbar = /*#__PURE__*/ (function (_React$PureComponent) {
    _inherits$2(HorizontalScrollbar, _React$PureComponent);

    let _super2 = _createSuper$3(HorizontalScrollbar);

    function HorizontalScrollbar() {
      _classCallCheck$2(this, HorizontalScrollbar);

      return _super2.apply(this, arguments);
    }

    _createClass$2(HorizontalScrollbar, [
      {
        key: 'render',
        value: function render() /*object*/
        {
          let _this$props = this.props,
            offset = _this$props.offset,
            size = _this$props.size;
          let outerContainerStyle = {
            height: Scrollbar.SIZE,
            width: size,
          };
          let innerContainerStyle = {
            height: Scrollbar.SIZE,
            overflow: 'hidden',
            width: size,
            top: offset,
          };
          return /*#__PURE__*/ React__default['default'].createElement(
            'div',
            {
              className: joinClasses(
                cx('public/fixedDataTable/horizontalScrollbar')
              ),
              style: outerContainerStyle,
            },
            /*#__PURE__*/ React__default['default'].createElement(
              'div',
              {
                style: innerContainerStyle,
              },
              /*#__PURE__*/ React__default['default'].createElement(
                Scrollbar,
                _extends({}, this.props, {
                  isOpaque: true,
                  orientation: 'horizontal',
                  offset: undefined,
                })
              )
            )
          );
        },
      },
    ]);

    return HorizontalScrollbar;
  })(React__default['default'].PureComponent);

  _defineProperty$1(HorizontalScrollbar, 'propTypes', {
    contentSize: PropTypes.number.isRequired,
    offset: PropTypes.number.isRequired,
    onScroll: PropTypes.func.isRequired,
    position: PropTypes.number.isRequired,
    size: PropTypes.number.isRequired,
    isRTL: PropTypes.bool,
  });

  /**
   * Copyright Schrodinger, LLC
   * All rights reserved.
   *
   * This source code is licensed under the BSD-style license found in the
   * LICENSE file in the root directory of this source tree. An additional grant
   * of patent rights can be found in the PATENTS file in the same directory.
   *
   */

  let getApiDataSelector = function getApiDataSelector() {
    return shallowEqualSelector(
      [
        function (state) {
          return tableHeightsSelector(state).componentHeight;
        },
        function (state) {
          return state.elementHeights.groupHeaderHeight;
        },
        function (state) {
          return state.scrollX;
        },
        function (state) {
          return state.maxScrollX;
        },
        function (state) {
          return columnWidths$1(state).availableScrollWidth;
        },
        function (state) {
          return state.isRTL;
        },
        function (state) {
          return state.touchScrollEnabled;
        },
      ],
      function (
        /*number*/
        tableHeight,
        /*number*/
        groupHeaderHeight,
        /*number*/
        scrollX,
        /*number*/
        maxScrollX,
        /*number*/
        availableScrollWidth,
        /*boolean*/
        isRTL,
        /*boolean*/
        touchEnabled
      ) {
        return {
          tableHeight,
          groupHeaderHeight,
          scrollX,
          maxScrollX,
          availableScrollWidth,
          isRTL,
          touchEnabled,
        };
      }
    );
  };

  let baseGetTag = _baseGetTag,
    isArray = isArray_1,
    isObjectLike = isObjectLike_1;

  /** `Object#toString` result references. */
  let stringTag = '[object String]';

  /**
   * Checks if `value` is classified as a `String` primitive or object.
   *
   * @static
   * @since 0.1.0
   * @memberOf _
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a string, else `false`.
   * @example
   *
   * _.isString('abc');
   * // => true
   *
   * _.isString(1);
   * // => false
   */
  function isString$1(value) {
    return (
      typeof value == 'string' ||
      (!isArray(value) && isObjectLike(value) && baseGetTag(value) == stringTag)
    );
  }

  let isString_1 = isString$1;

  /**
   * The base implementation of `_.property` without support for deep paths.
   *
   * @private
   * @param {string} key The key of the property to get.
   * @returns {Function} Returns the new accessor function.
   */

  function baseProperty$1(key) {
    return function (object) {
      return object == null ? undefined : object[key];
    };
  }

  let _baseProperty = baseProperty$1;

  let baseProperty = _baseProperty;

  /**
   * Gets the size of an ASCII `string`.
   *
   * @private
   * @param {string} string The string inspect.
   * @returns {number} Returns the string size.
   */
  let asciiSize$1 = baseProperty('length');

  let _asciiSize = asciiSize$1;

  /** Used to compose unicode character classes. */

  let rsAstralRange$1 = '\\ud800-\\udfff',
    rsComboMarksRange$1 = '\\u0300-\\u036f',
    reComboHalfMarksRange$1 = '\\ufe20-\\ufe2f',
    rsComboSymbolsRange$1 = '\\u20d0-\\u20ff',
    rsComboRange$1 =
      rsComboMarksRange$1 + reComboHalfMarksRange$1 + rsComboSymbolsRange$1,
    rsVarRange$1 = '\\ufe0e\\ufe0f';

  /** Used to compose unicode capture groups. */
  let rsZWJ$1 = '\\u200d';

  /** Used to detect strings with [zero-width joiners or code points from the astral planes](http://eev.ee/blog/2015/09/12/dark-corners-of-unicode/). */
  let reHasUnicode = RegExp(
    '[' + rsZWJ$1 + rsAstralRange$1 + rsComboRange$1 + rsVarRange$1 + ']'
  );

  /**
   * Checks if `string` contains Unicode symbols.
   *
   * @private
   * @param {string} string The string to inspect.
   * @returns {boolean} Returns `true` if a symbol is found, else `false`.
   */
  function hasUnicode$1(string) {
    return reHasUnicode.test(string);
  }

  let _hasUnicode = hasUnicode$1;

  /** Used to compose unicode character classes. */

  let rsAstralRange = '\\ud800-\\udfff',
    rsComboMarksRange = '\\u0300-\\u036f',
    reComboHalfMarksRange = '\\ufe20-\\ufe2f',
    rsComboSymbolsRange = '\\u20d0-\\u20ff',
    rsComboRange =
      rsComboMarksRange + reComboHalfMarksRange + rsComboSymbolsRange,
    rsVarRange = '\\ufe0e\\ufe0f';

  /** Used to compose unicode capture groups. */
  let rsAstral = '[' + rsAstralRange + ']',
    rsCombo = '[' + rsComboRange + ']',
    rsFitz = '\\ud83c[\\udffb-\\udfff]',
    rsModifier = '(?:' + rsCombo + '|' + rsFitz + ')',
    rsNonAstral = '[^' + rsAstralRange + ']',
    rsRegional = '(?:\\ud83c[\\udde6-\\uddff]){2}',
    rsSurrPair = '[\\ud800-\\udbff][\\udc00-\\udfff]',
    rsZWJ = '\\u200d';

  /** Used to compose unicode regexes. */
  let reOptMod = rsModifier + '?',
    rsOptVar = '[' + rsVarRange + ']?',
    rsOptJoin =
      '(?:' +
      rsZWJ +
      '(?:' +
      [rsNonAstral, rsRegional, rsSurrPair].join('|') +
      ')' +
      rsOptVar +
      reOptMod +
      ')*',
    rsSeq = rsOptVar + reOptMod + rsOptJoin,
    rsSymbol =
      '(?:' +
      [
        rsNonAstral + rsCombo + '?',
        rsCombo,
        rsRegional,
        rsSurrPair,
        rsAstral,
      ].join('|') +
      ')';

  /** Used to match [string symbols](https://mathiasbynens.be/notes/javascript-unicode). */
  let reUnicode = RegExp(
    rsFitz + '(?=' + rsFitz + ')|' + rsSymbol + rsSeq,
    'g'
  );

  /**
   * Gets the size of a Unicode `string`.
   *
   * @private
   * @param {string} string The string inspect.
   * @returns {number} Returns the string size.
   */
  function unicodeSize$1(string) {
    let result = (reUnicode.lastIndex = 0);
    while (reUnicode.test(string)) {
      ++result;
    }
    return result;
  }

  let _unicodeSize = unicodeSize$1;

  let asciiSize = _asciiSize,
    hasUnicode = _hasUnicode,
    unicodeSize = _unicodeSize;

  /**
   * Gets the number of symbols in `string`.
   *
   * @private
   * @param {string} string The string to inspect.
   * @returns {number} Returns the string size.
   */
  function stringSize$1(string) {
    return hasUnicode(string) ? unicodeSize(string) : asciiSize(string);
  }

  let _stringSize = stringSize$1;

  let baseKeys = _baseKeys,
    getTag = _getTag,
    isArrayLike = isArrayLike_1,
    isString = isString_1,
    stringSize = _stringSize;

  /** `Object#toString` result references. */
  let mapTag = '[object Map]',
    setTag = '[object Set]';

  /**
   * Gets the size of `collection` by returning its length for array-like
   * values or the number of own enumerable string keyed properties for objects.
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Collection
   * @param {Array|Object|string} collection The collection to inspect.
   * @returns {number} Returns the collection size.
   * @example
   *
   * _.size([1, 2, 3]);
   * // => 3
   *
   * _.size({ 'a': 1, 'b': 2 });
   * // => 2
   *
   * _.size('pebbles');
   * // => 7
   */
  function size(collection) {
    if (collection == null) {
      return 0;
    }
    if (isArrayLike(collection)) {
      return isString(collection) ? stringSize(collection) : collection.length;
    }
    let tag = getTag(collection);
    if (tag == mapTag || tag == setTag) {
      return collection.size;
    }
    return baseKeys(collection).length;
  }

  let size_1 = size;

  /**
   * Copyright Schrodinger, LLC
   * All rights reserved.
   *
   * This source code is licensed under the BSD-style license found in the
   * LICENSE file in the root directory of this source tree. An additional grant
   * of patent rights can be found in the PATENTS file in the same directory.
   *
   */
  /**
   * Minimal data of a column that we expose through our APIs
   */

  let _getMinimalColumn = function _getMinimalColumn(column) {
    return {
      offset: column.offset,
      width: column.width,
      index: column.index,
      columnKey: column.columnKey,
    };
  };
  /**
   * Minimal data of a column group that we expose through our APIs
   */

  let _getMinimalColumnGroup = function _getMinimalColumnGroup(columnGroup) {
    return {
      offset: columnGroup.offset,
      width: columnGroup.width,
      index: columnGroup.index,
      columnKey: columnGroup.columnKey,
    };
  };
  /**
   * Return all exposed APIs
   *
   * @param {!Object} state
   * @param {!Object} api
   * @returns
   */

  let getApiMethodsSelector = function getApiMethodsSelector() {
    return shallowEqualSelector(
      [
        function (state) {
          return columnWidths$1(state);
        },
        function (state, actions) {
          return actions;
        },
      ],
      function (
        /*object*/
        columnWidths,
        /*object*/
        actions
      ) {
        let fixedColumns = columnWidths.fixedColumns,
          fixedRightColumns = columnWidths.fixedRightColumns,
          scrollableColumns = columnWidths.scrollableColumns,
          fixedColumnGroups = columnWidths.fixedColumnGroups,
          fixedRightColumnGroups = columnWidths.fixedRightColumnGroups,
          scrollableColumnGroups = columnWidths.scrollableColumnGroups;

        let validateColumnIndex = function validateColumnIndex(columnIndex) {
          let totalColumns =
            fixedColumns.length +
            scrollableColumns.length +
            fixedRightColumns.length;

          if (
            columnIndex < 0 ||
            columnIndex >= totalColumns ||
            !Number.isInteger(columnIndex)
          ) {
            throw 'columnIndex must be an integer between 0 and '.concat(
              totalColumns - 1,
              ' inclusive'
            );
          }
        };

        let validateColumnGroupIndex = function validateColumnGroupIndex(
          columnGroupIndex
        ) {
          let totalColumnGroups =
            fixedColumnGroups.length +
            scrollableColumnGroups.length +
            fixedRightColumnGroups.length;

          if (
            columnGroupIndex < 0 ||
            columnGroupIndex >= totalColumnGroups ||
            !Number.isInteger(columnGroupIndex)
          ) {
            throw 'columnGroupIndex must be an integer between 0 and '.concat(
              totalColumnGroups - 1,
              ' inclusive'
            );
          }
        };

        let validateCellGroupType = function validateCellGroupType(
          cellGroupType
        ) {
          let allowNil =
            arguments.length > 1 && arguments[1] !== undefined
              ? arguments[1]
              : false;

          if (allowNil && isNil_1(cellGroupType)) {
            return;
          }

          if (
            cellGroupType !== CellGroupType.FIXED &&
            cellGroupType !== CellGroupType.FIXED_RIGHT &&
            cellGroupType !== CellGroupType.SCROLLABLE
          ) {
            throw 'Invalid CellGroupType';
          }
        };

        let _getCellGroupTypeFromColumnIndex =
          function _getCellGroupTypeFromColumnIndex(columnIndex) {
            if (columnIndex < fixedColumns.length) {
              return CellGroupType.FIXED;
            }

            if (columnIndex < fixedColumns.length + scrollableColumns.length) {
              return CellGroupType.SCROLLABLE;
            }

            return CellGroupType.FIXED_RIGHT;
          };

        let _getCellGroupTypeFromColumnGroupIndex =
          function _getCellGroupTypeFromColumnGroupIndex(columnGroupIndex) {
            if (columnGroupIndex < fixedColumnGroups.length) {
              return CellGroupType.FIXED;
            }

            if (
              columnGroupIndex <
              fixedColumnGroups.length + scrollableColumnGroups.length
            ) {
              return CellGroupType.SCROLLABLE;
            }

            return CellGroupType.FIXED_RIGHT;
          };

        let _getLocalColumnIndex = function _getLocalColumnIndex(
          columnIndex,
          cellGroupType
        ) {
          if (cellGroupType === CellGroupType.FIXED) {
            return columnIndex;
          }

          if (cellGroupType === CellGroupType.SCROLLABLE) {
            return columnIndex - fixedColumns.length;
          } else if (cellGroupType === CellGroupType.FIXED_RIGHT) {
            return columnIndex - fixedColumns.length - scrollableColumns.length;
          }
        };

        let _getLocalColumnGroupIndex = function _getLocalColumnGroupIndex(
          columnGroupIndex,
          cellGroupType
        ) {
          if (cellGroupType === CellGroupType.FIXED) {
            return columnGroupIndex;
          }

          if (cellGroupType === CellGroupType.SCROLLABLE) {
            return columnGroupIndex - fixedColumnGroups.length;
          } else if (cellGroupType === CellGroupType.FIXED_RIGHT) {
            return (
              columnGroupIndex -
              fixedColumnGroups.length -
              scrollableColumnGroups.length
            );
          }
        };

        let getCellGroupWidth = function getCellGroupWidth() {
          let cellGroupType =
            arguments.length > 0 && arguments[0] !== undefined
              ? arguments[0]
              : CellGroupType.SCROLLABLE;
          validateCellGroupType(cellGroupType);

          let container = _getColumnContainerByCellGroupType(cellGroupType);

          return container.reduce(function (sum, column) {
            return sum + column.width;
          }, 0);
        };

        let _getColumn = function _getColumn(columnIndex, cellGroupType) {
          let container = _getColumnContainerByCellGroupType(cellGroupType);

          let localColumnIndex = _getLocalColumnIndex(
            columnIndex,
            cellGroupType
          );

          return container[localColumnIndex];
        };

        let getColumn = function getColumn(columnIndex) {
          validateColumnIndex(columnIndex);

          let cellGroupType = _getCellGroupTypeFromColumnIndex(columnIndex);

          let column = _getColumn(columnIndex, cellGroupType);

          return _getMinimalColumn(column);
        };

        let getColumnCount = function getColumnCount() {
          let cellGroupType =
            arguments.length > 0 && arguments[0] !== undefined
              ? arguments[0]
              : null;
          validateCellGroupType(cellGroupType, true);

          if (isNil_1(cellGroupType)) {
            return (
              fixedColumns.length +
              scrollableColumns.length +
              fixedRightColumns.length
            );
          }

          let container = _getColumnContainerByCellGroupType(cellGroupType);

          return container.length;
        };

        let getColumnGroupCount = function getColumnGroupCount() {
          let cellGroupType =
            arguments.length > 0 && arguments[0] !== undefined
              ? arguments[0]
              : null;
          validateCellGroupType(cellGroupType, true);

          if (isNil_1(cellGroupType)) {
            return (
              fixedColumnGroups.length +
              scrollableColumnGroups.length +
              fixedRightColumnGroups.length
            );
          }

          let container =
            _getColumnGroupContainerByCellGroupType(cellGroupType);

          return container.length;
        };

        let _getColumnGroup = function _getColumnGroup(
          columnGroupIndex,
          cellGroupType
        ) {
          let container =
            _getColumnGroupContainerByCellGroupType(cellGroupType);

          let localColumnGroupIndex = _getLocalColumnGroupIndex(
            columnGroupIndex,
            cellGroupType
          );

          return _getMinimalColumnGroup(container[localColumnGroupIndex]);
        };

        let getColumnGroup = function getColumnGroup(columnGroupIndex) {
          validateColumnGroupIndex(columnGroupIndex);

          let cellGroupType =
            _getCellGroupTypeFromColumnGroupIndex(columnGroupIndex);

          return _getColumnGroup(columnGroupIndex, cellGroupType);
        };

        let getColumnGroupByChild = function getColumnGroupByChild(
          columnIndex
        ) {
          validateColumnIndex(columnIndex);

          let cellGroupType = _getCellGroupTypeFromColumnIndex(columnIndex);

          let groupIndex = _getColumn(columnIndex, cellGroupType).groupIdx;

          let columnGroup = _getColumnGroupByAbsoluteIndex(groupIndex);

          return _getMinimalColumnGroup(columnGroup);
        };

        var _getColumnContainerByCellGroupType =
          function _getColumnContainerByCellGroupType(cellGroupType) {
            if (cellGroupType === CellGroupType.FIXED) {
              return fixedColumns;
            } else if (cellGroupType === CellGroupType.FIXED_RIGHT) {
              return fixedRightColumns;
            } else if (cellGroupType === CellGroupType.SCROLLABLE) {
              return scrollableColumns;
            } else {
              throw 'Invalid cell group type';
            }
          };

        var _getColumnGroupContainerByCellGroupType =
          function _getColumnGroupContainerByCellGroupType(cellGroupType) {
            if (cellGroupType === CellGroupType.FIXED) {
              return fixedColumnGroups;
            } else if (cellGroupType === CellGroupType.FIXED_RIGHT) {
              return fixedRightColumnGroups;
            } else if (cellGroupType === CellGroupType.SCROLLABLE) {
              return scrollableColumnGroups;
            } else {
              throw 'Invalid cell group type';
            }
          };

        var _getColumnGroupByAbsoluteIndex =
          function _getColumnGroupByAbsoluteIndex(absoluteIndex) {
            let fixedCount = size_1(fixedColumnGroups);
            let scrollableCount = size_1(scrollableColumnGroups);
            let fixedRightCount = size_1(fixedRightColumnGroups);

            if (inRange_1(absoluteIndex, 0, fixedCount)) {
              return fixedColumnGroups[absoluteIndex];
            } else if (
              inRange_1(absoluteIndex, fixedCount, fixedCount + scrollableCount)
            ) {
              return scrollableColumnGroups[absoluteIndex - fixedCount];
            } else if (
              inRange_1(
                absoluteIndex,
                fixedCount + scrollableCount,
                fixedCount + scrollableCount + fixedRightCount
              )
            ) {
              return fixedRightColumnGroups[
                absoluteIndex - fixedCount - scrollableCount
              ];
            } else {
              throw 'Invalid absolute column group index';
            }
          };

        let _getElementAtOffset = function _getElementAtOffset(
          container,
          offset
        ) {
          if (container.length === 0) {
            return {
              element: null,
              distanceFromOffset: null,
            };
          }

          let currentOffset = 0;
          let index = 0;

          while (index !== container.length) {
            if (currentOffset > offset) {
              break;
            }

            currentOffset += container[index].width;
            index++;
          }

          index = clamp_1(index - 1, 0, container.length - 1);
          return {
            element: container[index],
            distanceFromOffset:
              container[index].width - (currentOffset - offset),
          };
        };

        let getColumnAtOffset = function getColumnAtOffset(offset) {
          let cellGroupType =
            arguments.length > 1 && arguments[1] !== undefined
              ? arguments[1]
              : CellGroupType.SCROLLABLE;
          validateCellGroupType(cellGroupType);

          let container = _getColumnContainerByCellGroupType(cellGroupType);

          let _getElementAtOffset2 = _getElementAtOffset(container, offset),
            element = _getElementAtOffset2.element,
            distanceFromOffset = _getElementAtOffset2.distanceFromOffset;

          if (element) {
            element = _getMinimalColumnGroup(element);
          }

          return {
            column: element,
            distanceFromOffset,
          };
        };

        let getColumnGroupAtOffset = function getColumnGroupAtOffset(offset) {
          let cellGroupType =
            arguments.length > 1 && arguments[1] !== undefined
              ? arguments[1]
              : CellGroupType.SCROLLABLE;
          validateCellGroupType(cellGroupType);

          let container =
            _getColumnGroupContainerByCellGroupType(cellGroupType);

          let _getElementAtOffset3 = _getElementAtOffset(container, offset),
            element = _getElementAtOffset3.element,
            distanceFromOffset = _getElementAtOffset3.distanceFromOffset;

          if (element) {
            element = _getMinimalColumnGroup(element);
          }

          return {
            columnGroup: element,
            distanceFromOffset,
          };
        };

        let scrollToX = actions.scrollToX;
        return {
          /** get element */
          getColumn,
          getColumnGroup,
          getColumnGroupByChild,

          /** get element at offset */
          getColumnAtOffset,
          getColumnGroupAtOffset,

          /** get cell group width */
          getCellGroupWidth,

          /** get count */
          getColumnCount,
          getColumnGroupCount,

          /** actions */
          scrollToX,
        };
      }
    );
  };

  function ownKeys$1(object, enumerableOnly) {
    let keys = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
      let symbols = Object.getOwnPropertySymbols(object);
      enumerableOnly &&
        (symbols = symbols.filter(function (sym) {
          return Object.getOwnPropertyDescriptor(object, sym).enumerable;
        })),
        keys.push.apply(keys, symbols);
    }
    return keys;
  }

  function _objectSpread$1(target) {
    for (let i = 1; i < arguments.length; i++) {
      var source = null != arguments[i] ? arguments[i] : {};
      i % 2
        ? ownKeys$1(Object(source), !0).forEach(function (key) {
            _defineProperty$1(target, key, source[key]);
          })
        : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(
            target,
            Object.getOwnPropertyDescriptors(source)
          )
        : ownKeys$1(Object(source)).forEach(function (key) {
            Object.defineProperty(
              target,
              key,
              Object.getOwnPropertyDescriptor(source, key)
            );
          });
    }
    return target;
  }
  /**
   * Factory to create a wrapper which exposes the API.
   * This is required because we want to maintain seperate API instances per FDT table instances, so as to facilitate caching and subscription per instance.
   */

  let createApi = function createApi() {
    // NOTE (pradeep): We provide subscription functionality so that plugin consumers can listen for API value changes
    let subscribers = []; // Keep track of the latest computed API values

    let apiValue = null;
    /**
     * Method to add a subscriber that listens to api value changes.
     * @param {Function} subscriber
     * @returns {Function}
     */

    let subscribe = function subscribe(subscriber) {
      subscribers = subscribers.concat(subscriber); // return a method which can be called to remove the subscriber

      return function () {
        let subcriberIndex = subscribers.indexOf(subscriber);
        subscribers.splice(subcriberIndex, 1);
      };
    };

    let getApiData = getApiDataSelector();
    let getApiMethods = getApiMethodsSelector();
    return {
      /**
       * Memoizer for calculating api value
       *
       * @param {Object} state
       */
      getValue: shallowEqualSelector(
        [
          function (state) {
            return getApiData(state);
          },
          function (state, actions) {
            return getApiMethods(state, actions);
          },
        ],
        function (apiData, apiMethods) {
          apiValue = _objectSpread$1(
            _objectSpread$1(_objectSpread$1({}, apiData), apiMethods),
            {},
            {
              subscribe,
            }
          );
          return apiValue;
        }
      ),

      /**
       * Notify all subscribers with the latest API value
       */
      notify: function notify() {
        subscribers.forEach(function (subscriber) {
          return subscriber(apiValue);
        });
      },
    };
  };

  function ownKeys(object, enumerableOnly) {
    let keys = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
      let symbols = Object.getOwnPropertySymbols(object);
      enumerableOnly &&
        (symbols = symbols.filter(function (sym) {
          return Object.getOwnPropertyDescriptor(object, sym).enumerable;
        })),
        keys.push.apply(keys, symbols);
    }
    return keys;
  }

  function _objectSpread(target) {
    for (let i = 1; i < arguments.length; i++) {
      var source = null != arguments[i] ? arguments[i] : {};
      i % 2
        ? ownKeys(Object(source), !0).forEach(function (key) {
            _defineProperty$1(target, key, source[key]);
          })
        : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(
            target,
            Object.getOwnPropertyDescriptors(source)
          )
        : ownKeys(Object(source)).forEach(function (key) {
            Object.defineProperty(
              target,
              key,
              Object.getOwnPropertyDescriptor(source, key)
            );
          });
    }
    return target;
  }

  function _createSuper$2(Derived) {
    let hasNativeReflectConstruct = _isNativeReflectConstruct$2();
    return function _createSuperInternal() {
      let Super = _getPrototypeOf(Derived),
        result;
      if (hasNativeReflectConstruct) {
        let NewTarget = _getPrototypeOf(this).constructor;
        result = Reflect.construct(Super, arguments, NewTarget);
      } else {
        result = Super.apply(this, arguments);
      }
      return _possibleConstructorReturn$2(this, result);
    };
  }

  function _isNativeReflectConstruct$2() {
    if (typeof Reflect === 'undefined' || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === 'function') return true;
    try {
      Boolean.prototype.valueOf.call(
        Reflect.construct(Boolean, [], function () {})
      );
      return true;
    } catch (e) {
      return false;
    }
  }

  let FixedDataTableContainer = /*#__PURE__*/ (function (_React$Component) {
    _inherits$2(FixedDataTableContainer, _React$Component);

    let _super = _createSuper$2(FixedDataTableContainer);

    function FixedDataTableContainer(props) {
      let _this;

      _classCallCheck$2(this, FixedDataTableContainer);

      _this = _super.call(this, props);
      _this.reduxStore = FixedDataTableStore.get();
      _this.scrollActions = getScrollActions(_this.reduxStore, function () {
        return _this.props;
      });

      _this.reduxStore.dispatch(initialize(props));

      _this.unsubscribe = _this.reduxStore.subscribe(
        _this.onStoreUpdate.bind(_assertThisInitialized(_this))
      );
      _this.state = {
        boundState: FixedDataTableContainer.getBoundState(_this.reduxStore),
        // the state from the redux store
        reduxStore: _this.reduxStore,
        // put store instance in local state so that getDerivedStateFromProps can access it
        props, // put props in local state so that getDerivedStateFromProps can access it
      };
      _this.fixedDataTableApi = createApi();
      _this.previousApiValue = null;
      return _this;
    }

    _createClass$2(
      FixedDataTableContainer,
      [
        {
          key: 'componentWillUnmount',
          value: function componentWillUnmount() {
            if (this.unsubscribe) {
              this.unsubscribe();
              this.unsubscribe = null;
            }

            this.reduxStore = null;
          },
        },
        {
          key: 'componentDidUpdate',
          value: function componentDidUpdate() {
            this.notifyApiValueChanges();
          },
          /**
           * Returns FDT's public API.
           *
           * @public
           * @returns
           */
        },
        {
          key: 'getApi',
          value: function getApi() {
            return this.fixedDataTableApi.getValue(
              _objectSpread(
                _objectSpread({}, this.props),
                this.reduxStore.getState()
              ),
              this.scrollActions
            );
          },
          /**
           * Notify all subscribers of the API if API value got changed.
           */
        },
        {
          key: 'notifyApiValueChanges',
          value: function notifyApiValueChanges() {
            let fixedDataTableContextValue = this.getApi();

            if (this.previousApiValue !== fixedDataTableContextValue) {
              this.fixedDataTableApi.notify();
              this.previousApiValue = fixedDataTableContextValue;
            }
          },
        },
        {
          key: 'render',
          value: function render() {
            let fixedDataTableContextValue = this.getApi();
            let fdt = /*#__PURE__*/ React__default['default'].createElement(
              FixedDataTable,
              _extends({}, this.props, this.state.boundState, {
                scrollActions: this.scrollActions,
              })
            ); // For backward compatibility, by default we render FDT-2 scrollbars

            if (this.props.defaultScrollbars) {
              return /*#__PURE__*/ React__default['default'].createElement(
                FixedDataTableContext.Provider,
                {
                  value: fixedDataTableContextValue,
                },
                /*#__PURE__*/ React__default['default'].createElement(
                  ScrollContainer,
                  this.props,
                  fdt
                )
              );
            }

            return /*#__PURE__*/ React__default['default'].createElement(
              FixedDataTableContext.Provider,
              {
                value: fixedDataTableContextValue,
              },
              fdt
            );
          },
        },
        {
          key: 'onStoreUpdate',
          value: function onStoreUpdate() {
            let newBoundState = FixedDataTableContainer.getBoundState(
              this.reduxStore
            ); // If onStoreUpdate was called through a prop change, then skip updating local state.
            // This is fine because getDerivedStateFromProps already calculates the new state.

            if (
              this.state.boundState.propsRevision !==
              newBoundState.propsRevision
            ) {
              return;
            }

            this.setState({
              boundState: newBoundState,
            });
          },
        },
      ],
      [
        {
          key: 'getDerivedStateFromProps',
          value: function getDerivedStateFromProps(nextProps, currentState) {
            invariant$1(
              nextProps.height !== undefined ||
                nextProps.maxHeight !== undefined,
              'You must set either a height or a maxHeight'
            ); // getDerivedStateFromProps is called for both prop and state updates.
            // If props are unchanged here, then there's no need to recalculate derived state.

            if (nextProps === currentState.props) {
              // return null to indicate that state should be unchanged
              return null;
            } // Props have changed, so update the redux store with the latest props

            currentState.reduxStore.dispatch(
              propChange({
                newProps: nextProps,
                oldProps: currentState.props,
              })
            ); // return the new state from the updated redux store

            return {
              boundState: FixedDataTableContainer.getBoundState(
                currentState.reduxStore
              ),
              props: nextProps,
            };
          },
        },
        {
          key: 'getBoundState',
          value: function getBoundState(reduxStore) {
            let state = reduxStore.getState();
            let boundState = pick_1(state, [
              'columnGroupElements',
              'columnElements',
              'elementHeights',
              'elementTemplates',
              'firstRowIndex',
              'endRowIndex',
              'maxScrollX',
              'maxScrollY',
              'propsRevision',
              'rows',
              'rowOffsets',
              'rowSettings',
              'scrollContentHeight',
              'scrollFlags',
              'scrollX',
              'scrollY',
              'scrolling',
              'scrollJumpedX',
              'scrollJumpedY',
              'tableSize',
            ]);
            return boundState;
          },
        },
      ]
    );

    return FixedDataTableContainer;
  })(React__default['default'].Component);

  _defineProperty$1(FixedDataTableContainer, 'defaultProps', {
    defaultScrollbars: true,
    scrollbarXHeight: Scrollbar.SIZE,
    scrollbarYWidth: Scrollbar.SIZE,
  });

  let FixedDataTableContainer$1 = polyfill(FixedDataTableContainer);

  function _createSuper$1(Derived) {
    let hasNativeReflectConstruct = _isNativeReflectConstruct$1();
    return function _createSuperInternal() {
      let Super = _getPrototypeOf(Derived),
        result;
      if (hasNativeReflectConstruct) {
        let NewTarget = _getPrototypeOf(this).constructor;
        result = Reflect.construct(Super, arguments, NewTarget);
      } else {
        result = Super.apply(this, arguments);
      }
      return _possibleConstructorReturn$2(this, result);
    };
  }

  function _isNativeReflectConstruct$1() {
    if (typeof Reflect === 'undefined' || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === 'function') return true;
    try {
      Boolean.prototype.valueOf.call(
        Reflect.construct(Boolean, [], function () {})
      );
      return true;
    } catch (e) {
      return false;
    }
  }
  /**
   * Component that defines the attributes of table column.
   */

  let FixedDataTableColumn = /*#__PURE__*/ (function (_React$Component) {
    _inherits$2(FixedDataTableColumn, _React$Component);

    let _super = _createSuper$1(FixedDataTableColumn);

    function FixedDataTableColumn() {
      _classCallCheck$2(this, FixedDataTableColumn);

      return _super.apply(this, arguments);
    }

    _createClass$2(FixedDataTableColumn, [
      {
        key: 'render',
        value: function render() {
          {
            throw new Error(
              'Component <FixedDataTableColumn /> should never render'
            );
          }
        },
      },
    ]);

    return FixedDataTableColumn;
  })(React__default['default'].Component);

  _defineProperty$1(FixedDataTableColumn, '__TableColumn__', true);

  _defineProperty$1(FixedDataTableColumn, 'propTypes', {
    /**
     * The horizontal alignment of the table cell content.
     */
    align: PropTypes.oneOf(['left', 'center', 'right']),

    /**
     * Controls if the column is fixed when scrolling in the X axis.
     */
    fixed: PropTypes.bool,

    /**
     * Controls if the column is fixed to the right side of the table when scrolling in the X axis.
     */
    fixedRight: PropTypes.bool,

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
    header: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),

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
    cell: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),

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
    footer: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),

    /**
     * This is used to uniquely identify the column, and is not required unless
     * you a resizing columns. This will be the key given in the
     * `onColumnResizeEndCallback` on the Table.
     */
    columnKey: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

    /**
     * The pixel width of the column.
     */
    width: PropTypes.number.isRequired,

    /**
     * If this is a resizable column this is its minimum pixel width.
     */
    minWidth: PropTypes.number,

    /**
     * If this is a resizable column this is its maximum pixel width.
     */
    maxWidth: PropTypes.number,

    /**
     * The grow factor relative to other columns. Same as the flex-grow API
     * from http://www.w3.org/TR/css3-flexbox/. Basically, take any available
     * extra width and distribute it proportionally according to all columns'
     * flexGrow values. Defaults to zero (no-flexing).
     */
    flexGrow: PropTypes.number,

    /**
     * @deprecated This prop is deprecated in favor of the ResizeCell plugin
     * component. Please refer to the "Resizable columns" example for usage.
     *
     * Whether the column can be resized.
     * Please note that if a column has a flex grow, once you resize
     * the column, this will be set to 0.
     *
     * This property only provides the UI for the column resizing. If this
     * is set to true, you will need to set the onColumnResizeEndCallback table
     * property and render your columns appropriately.
     */
    isResizable: PropTypes.bool,

    /**
     * @deprecated This prop is deprecated in favor of the ReorderCell plugin
     * component. Please refer to the "Reorderable columns" example for usage.
     *
     * Whether the column can be dragged to reorder.
     *
     * This property only provides the UI for the column reordering. If this
     * is set to true, you will need to set the onColumnReorderEndCallback table
     * property and render your columns appropriately.
     */
    isReorderable: PropTypes.bool,

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
    allowCellsRecycling: PropTypes.bool,

    /**
     * Flag to enable performance check when rendering. Stops the component from
     * rendering if none of it's passed in props have changed
     */
    pureRendering: PropTypes.bool,

    /**
     * Additional classnames to be added to cells under this column.
     */
    cellClassName: PropTypes.string,
  });

  _defineProperty$1(FixedDataTableColumn, 'defaultProps', {
    allowCellsRecycling: false,
    fixed: false,
    fixedRight: false,
  });

  function _createSuper(Derived) {
    let hasNativeReflectConstruct = _isNativeReflectConstruct();
    return function _createSuperInternal() {
      let Super = _getPrototypeOf(Derived),
        result;
      if (hasNativeReflectConstruct) {
        let NewTarget = _getPrototypeOf(this).constructor;
        result = Reflect.construct(Super, arguments, NewTarget);
      } else {
        result = Super.apply(this, arguments);
      }
      return _possibleConstructorReturn$2(this, result);
    };
  }

  function _isNativeReflectConstruct() {
    if (typeof Reflect === 'undefined' || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === 'function') return true;
    try {
      Boolean.prototype.valueOf.call(
        Reflect.construct(Boolean, [], function () {})
      );
      return true;
    } catch (e) {
      return false;
    }
  }
  /**
   * Component that defines the attributes of a table column group.
   */

  let FixedDataTableColumnGroup = /*#__PURE__*/ (function (_React$Component) {
    _inherits$2(FixedDataTableColumnGroup, _React$Component);

    let _super = _createSuper(FixedDataTableColumnGroup);

    function FixedDataTableColumnGroup() {
      _classCallCheck$2(this, FixedDataTableColumnGroup);

      return _super.apply(this, arguments);
    }

    _createClass$2(FixedDataTableColumnGroup, [
      {
        key: 'render',
        value: function render() {
          {
            throw new Error(
              'Component <FixedDataTableColumnGroup /> should never render'
            );
          }
        },
      },
    ]);

    return FixedDataTableColumnGroup;
  })(React__default['default'].Component);

  _defineProperty$1(FixedDataTableColumnGroup, '__TableColumnGroup__', true);

  _defineProperty$1(FixedDataTableColumnGroup, 'propTypes', {
    /**
     * The horizontal alignment of the table cell content.
     */
    align: PropTypes.oneOf(['left', 'center', 'right']),

    /**
     * Controls if the column group is fixed when scrolling in the X axis.
     */
    fixed: PropTypes.bool,

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
    header: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  });

  _defineProperty$1(FixedDataTableColumnGroup, 'defaultProps', {
    fixed: false,
  });

  /**
   * Copyright Schrodinger, LLC
   * All rights reserved.
   *
   * This source code is licensed under the BSD-style license found in the
   * LICENSE file in the root directory of this source tree. An additional grant
   * of patent rights can be found in the PATENTS file in the same directory.
   *
   * @providesModule index
   */
  let version = '2.0.2';
  let Plugins = {
    ResizeCell,
    ReorderCell,
  };

  exports.Cell = FixedDataTableCellDefault$1;
  exports.Column = FixedDataTableColumn;
  exports.ColumnGroup = FixedDataTableColumnGroup;
  exports.Context = FixedDataTableContext;
  exports.DataCell = FixedDataTableCellDefault;
  exports.Plugins = Plugins;
  exports.Table = FixedDataTableContainer$1;
  exports.version = version;

  Object.defineProperty(exports, '__esModule', { value: true });
});
//# sourceMappingURL=fixed-data-table.js.map
