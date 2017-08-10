/**
 * Copyright Schrodinger, LLC
 */
import { assert } from 'chai';
import verticalHeights from 'verticalHeights';

describe('verticalHeights', function() {
  let footerHeightIn;
  let groupHeaderHeightIn;
  let headerHeightIn;
  let height;
  let horizontalScrollbarVisible;
  let maxHeight;
  let ownerHeight;
  let scrollContentHeight;
  let useGroupHeader;

  beforeEach(function() {
    footerHeightIn = 10;
    groupHeaderHeightIn = 35;
    headerHeightIn = 40;
    height = 800;
    horizontalScrollbarVisible = false;
    maxHeight = undefined;
    ownerHeight = undefined;
    scrollContentHeight = 2000;
    useGroupHeader = true;
  });

  it('should compute appropriate component heights', function() {
    const {
      availableHeight,
      bodyHeight,
      componentHeight,
      contentHeight,
      footerHeight,
      groupHeaderHeight,
      headerHeight,
      visibleRowsHeight,
    } = verticalHeights.resultFunc(footerHeightIn, groupHeaderHeightIn,
      headerHeightIn, height, horizontalScrollbarVisible, maxHeight,
      ownerHeight, scrollContentHeight, useGroupHeader);

    assert.strictEqual(availableHeight, 713, 'availableHeight incorrect');
    assert.strictEqual(bodyHeight, 713, 'bodyHeight incorrect');
    assert.strictEqual(componentHeight, 800, 'componentHeight incorrect');
    assert.strictEqual(contentHeight, 2087, 'contentHeight incorrect');
    assert.strictEqual(footerHeight, 10, 'footerHeight incorrect');
    assert.strictEqual(groupHeaderHeight, 35, 'groupHeaderHeight incorrect');
    assert.strictEqual(headerHeight, 40, 'headerHeight incorrect');
    assert.strictEqual(visibleRowsHeight, 713, 'visibleRowsHeight incorrect');
  });

  it('should ignore groupHeaderHeight when not using group header', function() {
    useGroupHeader = false;
    const {
      availableHeight,
      bodyHeight,
      componentHeight,
      contentHeight,
      footerHeight,
      groupHeaderHeight,
      headerHeight,
      visibleRowsHeight,
    } = verticalHeights.resultFunc(footerHeightIn, groupHeaderHeightIn,
      headerHeightIn, height, horizontalScrollbarVisible, maxHeight,
      ownerHeight, scrollContentHeight, useGroupHeader);

    assert.strictEqual(availableHeight, 748, 'availableHeight incorrect');
    assert.strictEqual(bodyHeight, 748, 'bodyHeight incorrect');
    assert.strictEqual(componentHeight, 800, 'componentHeight incorrect');
    assert.strictEqual(contentHeight, 2052, 'contentHeight incorrect');
    assert.strictEqual(footerHeight, 10, 'footerHeight incorrect');
    assert.strictEqual(groupHeaderHeight, 0, 'groupHeaderHeight incorrect');
    assert.strictEqual(headerHeight, 40, 'headerHeight incorrect');
    assert.strictEqual(visibleRowsHeight, 748, 'visibleRowsHeight incorrect');
  });

  it('should adjust when horizontal scrollbar is visible', function() {
    horizontalScrollbarVisible = true;
    const {
      availableHeight,
      bodyHeight,
      componentHeight,
      contentHeight,
      footerHeight,
      groupHeaderHeight,
      headerHeight,
      visibleRowsHeight,
    } = verticalHeights.resultFunc(footerHeightIn, groupHeaderHeightIn,
      headerHeightIn, height, horizontalScrollbarVisible, maxHeight,
      ownerHeight, scrollContentHeight, useGroupHeader);

    assert.strictEqual(availableHeight, 698, 'availableHeight incorrect');
    assert.strictEqual(bodyHeight, 698, 'bodyHeight incorrect');
    assert.strictEqual(componentHeight, 800, 'componentHeight incorrect');
    assert.strictEqual(contentHeight, 2102, 'contentHeight incorrect');
    assert.strictEqual(footerHeight, 10, 'footerHeight incorrect');
    assert.strictEqual(groupHeaderHeight, 35, 'groupHeaderHeight incorrect');
    assert.strictEqual(headerHeight, 40, 'headerHeight incorrect');
    assert.strictEqual(visibleRowsHeight, 698, 'visibleRowsHeight incorrect');
  });

  it('should not have negative available height', function() {
    height = 50;
    const {
      availableHeight,
      bodyHeight,
      componentHeight,
      contentHeight,
      footerHeight,
      groupHeaderHeight,
      headerHeight,
      visibleRowsHeight,
    } = verticalHeights.resultFunc(footerHeightIn, groupHeaderHeightIn,
      headerHeightIn, height, horizontalScrollbarVisible, maxHeight,
      ownerHeight, scrollContentHeight, useGroupHeader);

    assert.strictEqual(availableHeight, 0, 'availableHeight incorrect');
    assert.strictEqual(bodyHeight, 0, 'bodyHeight incorrect');
    assert.strictEqual(componentHeight, 87, 'componentHeight incorrect');
    assert.strictEqual(contentHeight, 2087, 'contentHeight incorrect');
    assert.strictEqual(footerHeight, 10, 'footerHeight incorrect');
    assert.strictEqual(groupHeaderHeight, 35, 'groupHeaderHeight incorrect');
    assert.strictEqual(headerHeight, 40, 'headerHeight incorrect');
    assert.strictEqual(visibleRowsHeight, 0, 'visibleRowsHeight incorrect');
  });

  it('should collapse rows body height when not enough content', function() {
    scrollContentHeight = 100;
    const {
      availableHeight,
      bodyHeight,
      componentHeight,
      contentHeight,
      footerHeight,
      groupHeaderHeight,
      headerHeight,
      visibleRowsHeight,
    } = verticalHeights.resultFunc(footerHeightIn, groupHeaderHeightIn,
      headerHeightIn, height, horizontalScrollbarVisible, maxHeight,
      ownerHeight, scrollContentHeight, useGroupHeader);

    assert.strictEqual(availableHeight, 713, 'availableHeight incorrect');
    assert.strictEqual(bodyHeight, 100, 'bodyHeight incorrect');
    assert.strictEqual(componentHeight, 800, 'componentHeight incorrect');
    assert.strictEqual(contentHeight, 800, 'contentHeight incorrect');
    assert.strictEqual(footerHeight, 10, 'footerHeight incorrect');
    assert.strictEqual(groupHeaderHeight, 35, 'groupHeaderHeight incorrect');
    assert.strictEqual(headerHeight, 40, 'headerHeight incorrect');
    assert.strictEqual(visibleRowsHeight, 713, 'visibleRowsHeight incorrect');
  });

  it('should use max height when specified instead of height', function() {
    height = undefined;
    maxHeight = 800;
    const {
      availableHeight,
      bodyHeight,
      componentHeight,
      contentHeight,
      footerHeight,
      groupHeaderHeight,
      headerHeight,
      visibleRowsHeight,
    } = verticalHeights.resultFunc(footerHeightIn, groupHeaderHeightIn,
      headerHeightIn, height, horizontalScrollbarVisible, maxHeight,
      ownerHeight, scrollContentHeight, useGroupHeader);

    assert.strictEqual(availableHeight, 713, 'availableHeight incorrect');
    assert.strictEqual(bodyHeight, 713, 'bodyHeight incorrect');
    assert.strictEqual(componentHeight, 800, 'componentHeight incorrect');
    assert.strictEqual(contentHeight, 2087, 'contentHeight incorrect');
    assert.strictEqual(footerHeight, 10, 'footerHeight incorrect');
    assert.strictEqual(groupHeaderHeight, 35, 'groupHeaderHeight incorrect');
    assert.strictEqual(headerHeight, 40, 'headerHeight incorrect');
    assert.strictEqual(visibleRowsHeight, 713, 'visibleRowsHeight incorrect');
  });

  it('should collapse whole component when not enough content and max height specified', function() {
    height = undefined;
    maxHeight = 800;
    scrollContentHeight = 100;
    const {
      availableHeight,
      bodyHeight,
      componentHeight,
      contentHeight,
      footerHeight,
      groupHeaderHeight,
      headerHeight,
      visibleRowsHeight,
    } = verticalHeights.resultFunc(footerHeightIn, groupHeaderHeightIn,
      headerHeightIn, height, horizontalScrollbarVisible, maxHeight,
      ownerHeight, scrollContentHeight, useGroupHeader);

    assert.strictEqual(availableHeight, 713, 'availableHeight incorrect');
    assert.strictEqual(bodyHeight, 100, 'bodyHeight incorrect');
    assert.strictEqual(componentHeight, 187, 'componentHeight incorrect');
    assert.strictEqual(contentHeight, 187, 'contentHeight incorrect');
    assert.strictEqual(footerHeight, 10, 'footerHeight incorrect');
    assert.strictEqual(groupHeaderHeight, 35, 'groupHeaderHeight incorrect');
    assert.strictEqual(headerHeight, 40, 'headerHeight incorrect');
    assert.strictEqual(visibleRowsHeight, 100, 'visibleRowsHeight incorrect');
  });

  it('should adjust visibleRowsHeight to ownerHeight when specified', function() {
    ownerHeight = 300;
    const {
      availableHeight,
      bodyHeight,
      componentHeight,
      contentHeight,
      footerHeight,
      groupHeaderHeight,
      headerHeight,
      visibleRowsHeight,
    } = verticalHeights.resultFunc(footerHeightIn, groupHeaderHeightIn,
      headerHeightIn, height, horizontalScrollbarVisible, maxHeight,
      ownerHeight, scrollContentHeight, useGroupHeader);

    assert.strictEqual(availableHeight, 713, 'availableHeight incorrect');
    assert.strictEqual(bodyHeight, 713, 'bodyHeight incorrect');
    assert.strictEqual(componentHeight, 800, 'componentHeight incorrect');
    assert.strictEqual(contentHeight, 2087, 'contentHeight incorrect');
    assert.strictEqual(footerHeight, 10, 'footerHeight incorrect');
    assert.strictEqual(groupHeaderHeight, 35, 'groupHeaderHeight incorrect');
    assert.strictEqual(headerHeight, 40, 'headerHeight incorrect');
    assert.strictEqual(visibleRowsHeight, 213, 'visibleRowsHeight incorrect');
  });

  it('should grow the component to ownerHeight, even when collapsing due to useMaxHeight', function() {
    height = undefined;
    maxHeight = 800;
    scrollContentHeight = 100;
    ownerHeight = 300;
    const {
      availableHeight,
      bodyHeight,
      componentHeight,
      contentHeight,
      footerHeight,
      groupHeaderHeight,
      headerHeight,
      visibleRowsHeight,
    } = verticalHeights.resultFunc(footerHeightIn, groupHeaderHeightIn,
      headerHeightIn, height, horizontalScrollbarVisible, maxHeight,
      ownerHeight, scrollContentHeight, useGroupHeader);

    assert.strictEqual(availableHeight, 713, 'availableHeight incorrect');
    assert.strictEqual(bodyHeight, 100, 'bodyHeight incorrect');
    assert.strictEqual(componentHeight, 187, 'componentHeight incorrect');
    assert.strictEqual(contentHeight, 300, 'contentHeight incorrect');
    assert.strictEqual(footerHeight, 10, 'footerHeight incorrect');
    assert.strictEqual(groupHeaderHeight, 35, 'groupHeaderHeight incorrect');
    assert.strictEqual(headerHeight, 40, 'headerHeight incorrect');
    assert.strictEqual(visibleRowsHeight, 100, 'visibleRowsHeight incorrect');
  });
});
