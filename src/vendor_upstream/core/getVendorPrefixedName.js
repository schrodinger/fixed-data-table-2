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

import invariant from '../../stubs/invariant';

import ExecutionEnvironment from './ExecutionEnvironment';
import camelize from './camelize';

const memoized = {};
const prefixes = ['Webkit', 'ms', 'Moz', 'O'];
const prefixRegex = new RegExp('^(' + prefixes.join('|') + ')');
const testStyle = ExecutionEnvironment.canUseDOM
  ? document.createElement('div').style
  : {};

function getWithPrefix(name) {
  for (let i = 0; i < prefixes.length; i++) {
    const prefixedName = prefixes[i] + name;
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
  const name = camelize(property);
  if (memoized[name] === undefined) {
    const capitalizedName = name.charAt(0).toUpperCase() + name.slice(1);
    if (prefixRegex.test(capitalizedName)) {
      invariant(
        false,
        'getVendorPrefixedName must only be called with unprefixed' +
          'CSS property names. It was called with %s',
        property
      );
    }
    memoized[name] = name in testStyle ? name : getWithPrefix(capitalizedName);
  }
  return memoized[name];
}

export default getVendorPrefixedName;
