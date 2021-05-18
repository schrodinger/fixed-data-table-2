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

'use strict';

import { createSelectorCreator, defaultMemoize } from 'reselect';

import shallowEqual from '../vendor_upstream/core/shallowEqual';

export default createSelectorCreator(defaultMemoize, shallowEqual);
