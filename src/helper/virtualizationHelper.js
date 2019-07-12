/**
 * Copyright Schrodinger, LLC
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule virtualizationHelper
 */

'use strict';

/**
 * Compute offsets and key positions for elements in the given range.
 *
 * @param {!IntegerBufferSet} elementBufferSet
 * @param {!PrefixIntervalTree} elementOffsetIntervalTree
 * @param {!number} startIdx (inclusive)
 * @param {!number} endIdx (exclusive)
 * @param {!number} maxBufferSize
 *
 * @return {{
 *  elements: !Array.<number>,
 *  elementOffsets: !Object.<string, number>
 * }}
 * @private
 */
function computeVirtualizedElements(elementBufferSet, elementOffsetIntervalTree, startIdx, endIdx, maxBufferSize) {
  // output for this function
  const elements = []; // state.columnsToRender
  const elementOffsets = {}; // state.columnOffsets

  // incremental way for calculating columnOffset
  let runningOffset = elementOffsetIntervalTree.sumUntil(startIdx);

  // compute column index and offsets for every columns inside the buffer
  for (let columnIdx = startIdx; columnIdx < endIdx; columnIdx++) {
    // Update the offset for rendering the column
    elementOffsets[columnIdx] = runningOffset;
    runningOffset += elementOffsetIntervalTree.get(columnIdx);

    // Get position for the viewport column
    const position = addElementToBuffer(columnIdx, elementBufferSet, startIdx, endIdx, maxBufferSize);
    elements[position] = columnIdx;
  }
  
  return {
    elements,
    elementOffsets,
  }
}

/**
 * Add the element to the buffer set.
 *
 * Doesn't add if element already exists.
 * Also, if addition isn't possible due to max buffer size, it'll find an existing
 * element outside the given range, and replace it.
 *
 * @param {!number} elementIdx
 * @param {!IntegerBufferSet} elementBufferSet
 * @param {!number} startIdx (inclusive)
 * @param {!number} endIdx (exclusive)
 * @param {!number} maxBufferSize
 *
 * @return {?number} the position of the element after being added to the buffer set
 * @private
 */
function addElementToBuffer(elementIdx, elementBufferSet, startIdx, endIdx, maxBufferSize) {
  // Check if element already has a position in the buffer
  let elementPosition = elementBufferSet.getValuePosition(elementIdx);

  // Request a position in the buffer through eviction of another element
  if (elementPosition === null && elementBufferSet.getSize() >= maxBufferSize)  {
    elementPosition = elementBufferSet.replaceFurthestValuePosition(
      startIdx,
      endIdx - 1, // replaceFurthestValuePosition uses closed interval from startIdx to endIdx
      elementIdx
    );
  }

  if (elementPosition === null) {
    elementPosition = elementBufferSet.getNewPositionForValue(elementIdx);
  }

  return elementPosition;
}

export { addElementToBuffer, computeVirtualizedElements };
export default computeVirtualizedElements;
