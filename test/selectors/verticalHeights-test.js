/**
 * Copyright Schrodinger, LLC
 */
import { assert } from 'chai';
import verticalHeights from 'verticalHeights';

describe('verticalHeights', function() {
  let footerHeightIn;
  let groupHeaderHeightIn;
  let headerHeightIn;
  let ownerHeight;
  let roughHeights;
  let scrollContentHeight;
  let scrollbarsVisible;


  beforeEach(function() {
    footerHeightIn = 10;
    groupHeaderHeightIn = 35;
    headerHeightIn = 40;
    ownerHeight = undefined;
    roughHeights = {
      reservedHeight: 87,
      useMaxHeight: false,
    };
    scrollContentHeight = 2000;
    scrollbarsVisible = {
      availableHeight: 713,
      scrollsHorizontally: false,
    };
  });

  it('should compute appropriate component heights', function() {
    const {
      bodyHeight,
      bodyOffsetTop,
      componentHeight,
      contentHeight,
      footOffsetTop,
      headerOffsetTop,
      rowsContainerHeight,
      visibleRowsHeight,
    } = verticalHeights.resultFunc(footerHeightIn, groupHeaderHeightIn,
      headerHeightIn, roughHeights, ownerHeight, scrollContentHeight,
      scrollbarsVisible);

    assert.strictEqual(bodyHeight, 713, 'bodyHeight incorrect');
    assert.strictEqual(bodyOffsetTop, 75, 'bodyOffsetTop incorrect');
    assert.strictEqual(componentHeight, 800, 'componentHeight incorrect');
    assert.strictEqual(contentHeight, 2087, 'contentHeight incorrect');
    assert.strictEqual(footOffsetTop, 788, 'footOffsetTop incorrect');
    assert.strictEqual(headerOffsetTop, 35, 'headerOffsetTop incorrect');
    assert.strictEqual(rowsContainerHeight, 798, 'rowsContainerHeight incorrect');
    assert.strictEqual(visibleRowsHeight, 713, 'visibleRowsHeight incorrect');
  });

  it('should adjust when horizontal scrollbar is visible', function() {
    scrollbarsVisible = {
      availableHeight: 698,
      scrollsHorizontally: true,
    };
    const {
      bodyHeight,
      bodyOffsetTop,
      componentHeight,
      contentHeight,
      footOffsetTop,
      headerOffsetTop,
      rowsContainerHeight,
      visibleRowsHeight,
    } = verticalHeights.resultFunc(footerHeightIn, groupHeaderHeightIn,
      headerHeightIn, roughHeights, ownerHeight, scrollContentHeight,
      scrollbarsVisible);

    assert.strictEqual(bodyHeight, 698, 'bodyHeight incorrect');
    assert.strictEqual(bodyOffsetTop, 75, 'bodyOffsetTop incorrect');
    assert.strictEqual(componentHeight, 800, 'componentHeight incorrect');
    assert.strictEqual(contentHeight, 2102, 'contentHeight incorrect');
    assert.strictEqual(footOffsetTop, 773, 'footOffsetTop incorrect');
    assert.strictEqual(headerOffsetTop, 35, 'headerOffsetTop incorrect');
    assert.strictEqual(rowsContainerHeight, 783, 'rowsContainerHeight incorrect');
    assert.strictEqual(visibleRowsHeight, 698, 'visibleRowsHeight incorrect');
  });

  it('should collapse rows body height when not enough content', function() {
    scrollContentHeight = 100;
    const {
      bodyHeight,
      bodyOffsetTop,
      componentHeight,
      contentHeight,
      footOffsetTop,
      headerOffsetTop,
      rowsContainerHeight,
      visibleRowsHeight,
    } = verticalHeights.resultFunc(footerHeightIn, groupHeaderHeightIn,
      headerHeightIn, roughHeights, ownerHeight, scrollContentHeight,
      scrollbarsVisible);

    assert.strictEqual(bodyHeight, 100, 'bodyHeight incorrect');
    assert.strictEqual(bodyOffsetTop, 75, 'bodyOffsetTop incorrect');
    assert.strictEqual(componentHeight, 800, 'componentHeight incorrect');
    assert.strictEqual(contentHeight, 800, 'contentHeight incorrect');
    assert.strictEqual(footOffsetTop, 788, 'footOffsetTop incorrect');
    assert.strictEqual(headerOffsetTop, 35, 'headerOffsetTop incorrect');
    assert.strictEqual(rowsContainerHeight, 798, 'rowsContainerHeight incorrect');
    assert.strictEqual(visibleRowsHeight, 713, 'visibleRowsHeight incorrect');
  });

  it('should not be affected by use max height when content exceeds height', function() {
    roughHeights.useMaxHeight = true;
    const {
      bodyHeight,
      bodyOffsetTop,
      componentHeight,
      contentHeight,
      footOffsetTop,
      headerOffsetTop,
      rowsContainerHeight,
      visibleRowsHeight,
    } = verticalHeights.resultFunc(footerHeightIn, groupHeaderHeightIn,
      headerHeightIn, roughHeights, ownerHeight, scrollContentHeight,
      scrollbarsVisible);

    assert.strictEqual(bodyHeight, 713, 'bodyHeight incorrect');
    assert.strictEqual(bodyOffsetTop, 75, 'bodyOffsetTop incorrect');
    assert.strictEqual(componentHeight, 800, 'componentHeight incorrect');
    assert.strictEqual(contentHeight, 2087, 'contentHeight incorrect');
    assert.strictEqual(footOffsetTop, 788, 'footOffsetTop incorrect');
    assert.strictEqual(headerOffsetTop, 35, 'headerOffsetTop incorrect');
    assert.strictEqual(rowsContainerHeight, 798, 'rowsContainerHeight incorrect');
    assert.strictEqual(visibleRowsHeight, 713, 'visibleRowsHeight incorrect');
  });

  it('should collapse whole component when not enough content and max height specified', function() {
    scrollContentHeight = 100;
    roughHeights.useMaxHeight = true;
    const {
      bodyHeight,
      bodyOffsetTop,
      componentHeight,
      contentHeight,
      footOffsetTop,
      headerOffsetTop,
      rowsContainerHeight,
      visibleRowsHeight,
    } = verticalHeights.resultFunc(footerHeightIn, groupHeaderHeightIn,
      headerHeightIn, roughHeights, ownerHeight, scrollContentHeight,
      scrollbarsVisible);

    assert.strictEqual(bodyHeight, 100, 'bodyHeight incorrect');
    assert.strictEqual(bodyOffsetTop, 75, 'bodyOffsetTop incorrect');
    assert.strictEqual(componentHeight, 187, 'componentHeight incorrect');
    assert.strictEqual(contentHeight, 187, 'contentHeight incorrect');
    assert.strictEqual(footOffsetTop, 175, 'footOffsetTop incorrect');
    assert.strictEqual(headerOffsetTop, 35, 'headerOffsetTop incorrect');
    assert.strictEqual(rowsContainerHeight, 185, 'rowsContainerHeight incorrect');
    assert.strictEqual(visibleRowsHeight, 100, 'visibleRowsHeight incorrect');
  });

  it('should adjust visibleRowsHeight to ownerHeight when specified', function() {
    ownerHeight = 300;
    const {
      bodyHeight,
      bodyOffsetTop,
      componentHeight,
      contentHeight,
      footOffsetTop,
      headerOffsetTop,
      rowsContainerHeight,
      visibleRowsHeight,
    } = verticalHeights.resultFunc(footerHeightIn, groupHeaderHeightIn,
      headerHeightIn, roughHeights, ownerHeight, scrollContentHeight,
      scrollbarsVisible);

    assert.strictEqual(bodyHeight, 713, 'bodyHeight incorrect');
    assert.strictEqual(bodyOffsetTop, 75, 'bodyOffsetTop incorrect');
    assert.strictEqual(componentHeight, 800, 'componentHeight incorrect');
    assert.strictEqual(contentHeight, 2087, 'contentHeight incorrect');
    assert.strictEqual(footOffsetTop, 288, 'footOffsetTop incorrect');
    assert.strictEqual(headerOffsetTop, 35, 'headerOffsetTop incorrect');
    assert.strictEqual(rowsContainerHeight, 298, 'rowsContainerHeight incorrect');
    assert.strictEqual(visibleRowsHeight, 213, 'visibleRowsHeight incorrect');
  });

  it('should grow the component to ownerHeight, even when collapsing due to useMaxHeight', function() {
    ownerHeight = 300;
    scrollContentHeight = 100;
    roughHeights.useMaxHeight = true;
    const {
      bodyHeight,
      bodyOffsetTop,
      componentHeight,
      contentHeight,
      footOffsetTop,
      headerOffsetTop,
      rowsContainerHeight,
      visibleRowsHeight,
    } = verticalHeights.resultFunc(footerHeightIn, groupHeaderHeightIn,
      headerHeightIn, roughHeights, ownerHeight, scrollContentHeight,
      scrollbarsVisible);

    assert.strictEqual(bodyHeight, 100, 'bodyHeight incorrect');
    assert.strictEqual(bodyOffsetTop, 75, 'bodyOffsetTop incorrect');
    assert.strictEqual(componentHeight, 187, 'componentHeight incorrect');
    assert.strictEqual(contentHeight, 300, 'contentHeight incorrect');
    assert.strictEqual(footOffsetTop, 175, 'footOffsetTop incorrect');
    assert.strictEqual(headerOffsetTop, 35, 'headerOffsetTop incorrect');
    assert.strictEqual(rowsContainerHeight, 185, 'rowsContainerHeight incorrect');
    assert.strictEqual(visibleRowsHeight, 100, 'visibleRowsHeight incorrect');
  });
});
