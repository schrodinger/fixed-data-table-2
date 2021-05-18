/**
 * Copyright Schrodinger, LLC
 */
import { assert } from 'chai';
import tableHeights from '../../src/selectors/tableHeights';
import Scrollbar from '../../src/plugins/Scrollbar';

describe('tableHeights', function () {
  let elementHeights;
  let ownerHeight;
  let reservedHeight;
  let scrollContentHeight;
  let scrollbarsVisible;
  let useMaxHeight;

  beforeEach(function () {
    elementHeights = {
      footerHeight: 10,
      groupHeaderHeight: 35,
      headerHeight: 40,
    };
    ownerHeight = undefined;
    reservedHeight = 87;
    scrollContentHeight = 2000;
    scrollbarsVisible = {
      availableHeight: 713,
      scrollEnabledX: false,
    };
    useMaxHeight = false;
  });

  it('should compute appropriate component heights', function () {
    const result = tableHeights.resultFunc(
      elementHeights,
      ownerHeight,
      reservedHeight,
      scrollContentHeight,
      scrollbarsVisible,
      useMaxHeight,
      Scrollbar.SIZE
    );

    assert.deepEqual(result, {
      bodyHeight: 713,
      bodyOffsetTop: 75,
      componentHeight: 800,
      contentHeight: 2087,
      footOffsetTop: 788,
      scrollbarXOffsetTop: 798,
      scrollbarYHeight: 713,
      visibleRowsHeight: 713,
    });
  });

  it('should adjust when horizontal scrollbar is visible', function () {
    scrollbarsVisible = {
      availableHeight: 698,
      scrollEnabledX: true,
    };

    const result = tableHeights.resultFunc(
      elementHeights,
      ownerHeight,
      reservedHeight,
      scrollContentHeight,
      scrollbarsVisible,
      useMaxHeight,
      Scrollbar.SIZE
    );

    assert.deepEqual(result, {
      bodyHeight: 698,
      bodyOffsetTop: 75,
      componentHeight: 800,
      contentHeight: 2102,
      footOffsetTop: 773,
      scrollbarXOffsetTop: 783,
      scrollbarYHeight: 698,
      visibleRowsHeight: 698,
    });
  });

  it('should collapse rows body height when not enough content', function () {
    scrollContentHeight = 100;

    const result = tableHeights.resultFunc(
      elementHeights,
      ownerHeight,
      reservedHeight,
      scrollContentHeight,
      scrollbarsVisible,
      useMaxHeight,
      Scrollbar.SIZE
    );

    assert.deepEqual(result, {
      bodyHeight: 100,
      bodyOffsetTop: 75,
      componentHeight: 800,
      contentHeight: 800,
      footOffsetTop: 788,
      scrollbarXOffsetTop: 798,
      scrollbarYHeight: 713,
      visibleRowsHeight: 713,
    });
  });

  it('should not be affected by use max height when content exceeds height', function () {
    useMaxHeight = true;

    const result = tableHeights.resultFunc(
      elementHeights,
      ownerHeight,
      reservedHeight,
      scrollContentHeight,
      scrollbarsVisible,
      useMaxHeight,
      Scrollbar.SIZE
    );

    assert.deepEqual(result, {
      bodyHeight: 713,
      bodyOffsetTop: 75,
      componentHeight: 800,
      contentHeight: 2087,
      footOffsetTop: 788,
      scrollbarXOffsetTop: 798,
      scrollbarYHeight: 713,
      visibleRowsHeight: 713,
    });
  });

  it('should collapse whole component when not enough content and max height specified', function () {
    scrollContentHeight = 100;
    useMaxHeight = true;

    const result = tableHeights.resultFunc(
      elementHeights,
      ownerHeight,
      reservedHeight,
      scrollContentHeight,
      scrollbarsVisible,
      useMaxHeight,
      Scrollbar.SIZE
    );

    assert.deepEqual(result, {
      bodyHeight: 100,
      bodyOffsetTop: 75,
      componentHeight: 187,
      contentHeight: 187,
      footOffsetTop: 175,
      scrollbarXOffsetTop: 185,
      scrollbarYHeight: 100,
      visibleRowsHeight: 100,
    });
  });

  it('should adjust visibleRowsHeight to ownerHeight when specified', function () {
    ownerHeight = 300;

    const result = tableHeights.resultFunc(
      elementHeights,
      ownerHeight,
      reservedHeight,
      scrollContentHeight,
      scrollbarsVisible,
      useMaxHeight,
      Scrollbar.SIZE
    );

    assert.deepEqual(result, {
      bodyHeight: 713,
      bodyOffsetTop: 75,
      componentHeight: 800,
      contentHeight: 2087,
      footOffsetTop: 288,
      scrollbarXOffsetTop: 298,
      scrollbarYHeight: 213,
      visibleRowsHeight: 213,
    });
  });

  it('should grow the component to ownerHeight, even when collapsing due to useMaxHeight', function () {
    ownerHeight = 300;
    scrollContentHeight = 100;
    useMaxHeight = true;

    const result = tableHeights.resultFunc(
      elementHeights,
      ownerHeight,
      reservedHeight,
      scrollContentHeight,
      scrollbarsVisible,
      useMaxHeight,
      Scrollbar.SIZE
    );

    assert.deepEqual(result, {
      bodyHeight: 100,
      bodyOffsetTop: 75,
      componentHeight: 187,
      contentHeight: 300,
      footOffsetTop: 175,
      scrollbarXOffsetTop: 185,
      scrollbarYHeight: 100,
      visibleRowsHeight: 100,
    });
  });
});
