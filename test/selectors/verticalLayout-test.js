/**
 * Copyright Schrodinger, LLC
 */
import { assert } from 'chai';
import verticalLayout from 'verticalLayout';

describe('verticalLayout', function() {
  it('should return offsets based on component heights', function() {
    const heights = {
      footerHeight: 10,
      groupHeaderHeight: 30,
      headerHeight: 60,
      visibleRowsHeight: 600,
    };
    assert.deepEqual(verticalLayout.resultFunc(heights), {
      bodyOffsetTop: 90,
      footOffsetTop: 690,
      headerOffsetTop: 30,
      rowsContainerHeight: 700,
    });
  });
});
