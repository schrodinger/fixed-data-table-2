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

'use strict';

/*
 * @param {*} a
 * @param {*} b
 * @return {boolean}
 */
function defaultComparator(a, b) {
  return a < b;
}

class Heap {
  constructor(items, comparator) {
    this._items = items || [];
    this._size = this._items.length;
    this._comparator = comparator || defaultComparator;
    this._heapify();
  }

  /*
   * @return {boolean}
   */
  empty() {
    return this._size === 0;
  }

  /*
   * @return {*}
   */
  pop() {
    if (this._size === 0) {
      return;
    }

    const elt = this._items[0];

    const lastElt = this._items.pop();
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
  push(item) {
    this._items[this._size++] = item;
    this._bubbleUp(this._size - 1);
  }

  /*
   * @return {number}
   */
  size() {
    return this._size;
  }

  /*
   * @return {*}
   */
  peek() {
    if (this._size === 0) {
      return;
    }

    return this._items[0];
  }

  _heapify() {
    for (let index = Math.floor((this._size + 1) / 2); index >= 0; index--) {
      this._sinkDown(index);
    }
  }

  /*
   * @parent {number} index
   */
  _bubbleUp(index) {
    const elt = this._items[index];
    while (index > 0) {
      const parentIndex = Math.floor((index + 1) / 2) - 1;
      const parentElt = this._items[parentIndex];

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
  _sinkDown(index) {
    const elt = this._items[index];

    while (true) {
      const leftChildIndex = 2 * (index + 1) - 1;
      const rightChildIndex = 2 * (index + 1);
      let swapIndex = -1;

      if (leftChildIndex < this._size) {
        const leftChild = this._items[leftChildIndex];
        if (this._comparator(leftChild, elt)) {
          swapIndex = leftChildIndex;
        }
      }

      if (rightChildIndex < this._size) {
        const rightChild = this._items[rightChildIndex];
        if (this._comparator(rightChild, elt)) {
          if (
            swapIndex === -1 ||
            this._comparator(rightChild, this._items[swapIndex])
          ) {
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
}

export default Heap;
