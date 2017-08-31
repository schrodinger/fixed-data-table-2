/**
 * Copyright Schrodinger, LLC
 */
import { ScrollbarState } from 'horizontalScrollbarVisible';
import { assert } from 'chai';
import roughHeights from 'roughHeights';

describe('roughHeights', function() {
  let footerHeightIn;
  let groupHeaderHeightIn;
  let headerHeightIn;
  let height;
  let horizontalScrollbarVisible;
  let maxHeight;


  beforeEach(function() {
    footerHeightIn = 10;
    groupHeaderHeightIn = 35;
    headerHeightIn = 40;
    height = 800;
    maxHeight = 0;
    horizontalScrollbarVisible = ScrollbarState.HIDDEN;
  });

  it('should estimate component heights', function() {
    const result = roughHeights.resultFunc(footerHeightIn, groupHeaderHeightIn,
      headerHeightIn, height, horizontalScrollbarVisible, maxHeight);
    assert.deepEqual(result, {
      minAvailableHeight: 713,
      maxAvailableHeight: 713,
      reservedHeight: 87,
      useMaxHeight: false,
    });
  });

  it('should adjust to scrollbar visibility', function() {
    horizontalScrollbarVisible = ScrollbarState.VISIBLE;
    const result = roughHeights.resultFunc(footerHeightIn, groupHeaderHeightIn,
      headerHeightIn, height, horizontalScrollbarVisible, maxHeight);
    assert.deepEqual(result, {
      minAvailableHeight: 698,
      maxAvailableHeight: 698,
      reservedHeight: 87,
      useMaxHeight: false,
    });
  });

  it('should adjust to scrollbar possible visibility', function() {
    horizontalScrollbarVisible = ScrollbarState.IF_VERTICAL_VISIBLE;
    const result = roughHeights.resultFunc(footerHeightIn, groupHeaderHeightIn,
      headerHeightIn, height, horizontalScrollbarVisible, maxHeight);
    assert.deepEqual(result, {
      minAvailableHeight: 698,
      maxAvailableHeight: 713,
      reservedHeight: 87,
      useMaxHeight: false,
    });
  });

  it('should use maxHeight when appropriate', function() {
    height = undefined;
    maxHeight = 400;
    horizontalScrollbarVisible = ScrollbarState.IF_VERTICAL_VISIBLE;
    const result = roughHeights.resultFunc(footerHeightIn, groupHeaderHeightIn,
      headerHeightIn, height, horizontalScrollbarVisible, maxHeight);
    assert.deepEqual(result, {
      minAvailableHeight: 298,
      maxAvailableHeight: 313,
      reservedHeight: 87,
      useMaxHeight: true,
    });
  });

  it('should not have negative available height', function() {
    height = 50;
    horizontalScrollbarVisible = ScrollbarState.IF_VERTICAL_VISIBLE;
    const result = roughHeights.resultFunc(footerHeightIn, groupHeaderHeightIn,
      headerHeightIn, height, horizontalScrollbarVisible, maxHeight);
    assert.deepEqual(result, {
      minAvailableHeight: 0,
      maxAvailableHeight: 0,
      reservedHeight: 87,
      useMaxHeight: false,
    });
  });
});
