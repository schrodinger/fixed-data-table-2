/**
 * Copyright Schrodinger, LLC
 */
import { assert } from 'chai';
import roughHeights, { ScrollbarState } from '../../src/selectors/roughHeights';
import Scrollbar from '../../src/plugins/Scrollbar';

describe('roughHeights', function () {
  let columnProps;
  let elementHeights;
  let rowSettings;
  let scrollFlags;
  let tableSize;

  beforeEach(function () {
    columnProps = [
      {
        fixed: true,
        width: 250,
      },
      {
        fixed: false,
        width: 350,
      },
    ];
    elementHeights = {
      footerHeight: 0,
      groupHeaderHeight: 0,
      headerHeight: 0,
    };
    rowSettings = {
      bufferRowCount: undefined,
      rowHeight: 50,
      subRowHeight: 0,
    };
    scrollFlags = {
      overflowX: 'auto',
      showScrollbarX: true,
    };
    tableSize = {
      height: 452,
      maxHeight: 0,
      useMaxHeight: false,
      width: 800,
    };
  });

  describe('height calculations', function () {
    beforeEach(function () {
      elementHeights = {
        footerHeight: 10,
        groupHeaderHeight: 35,
        headerHeight: 40,
      };
      tableSize.height = 800;
    });

    it('should estimate component heights', function () {
      const result = roughHeights.resultFunc(
        columnProps,
        elementHeights,
        rowSettings,
        scrollFlags,
        tableSize,
        Scrollbar.SIZE,
        Scrollbar.SIZE
      );

      assert.deepEqual(result, {
        bufferRowCount: 6,
        minAvailableHeight: 713,
        maxAvailableHeight: 713,
        reservedHeight: 87,
        scrollStateX: ScrollbarState.HIDDEN,
      });
    });

    it('should adjust to scrollbar visibility', function () {
      tableSize.width = 500;

      const result = roughHeights.resultFunc(
        columnProps,
        elementHeights,
        rowSettings,
        scrollFlags,
        tableSize,
        Scrollbar.SIZE,
        Scrollbar.SIZE
      );

      assert.deepEqual(result, {
        bufferRowCount: 6,
        minAvailableHeight: 698,
        maxAvailableHeight: 698,
        reservedHeight: 87,
        scrollStateX: ScrollbarState.VISIBLE,
      });
    });

    it('should adjust to scrollbar possible visibility', function () {
      tableSize.width = 610;

      const result = roughHeights.resultFunc(
        columnProps,
        elementHeights,
        rowSettings,
        scrollFlags,
        tableSize,
        Scrollbar.SIZE,
        Scrollbar.SIZE
      );

      assert.deepEqual(result, {
        bufferRowCount: 6,
        minAvailableHeight: 698,
        maxAvailableHeight: 713,
        reservedHeight: 87,
        scrollStateX: ScrollbarState.JOINT_SCROLLBARS,
      });
    });

    it('should use maxHeight when appropriate', function () {
      tableSize = {
        height: undefined,
        maxHeight: 400,
        useMaxHeight: true,
        width: 610,
      };

      const result = roughHeights.resultFunc(
        columnProps,
        elementHeights,
        rowSettings,
        scrollFlags,
        tableSize,
        Scrollbar.SIZE,
        Scrollbar.SIZE
      );

      assert.deepEqual(result, {
        bufferRowCount: 4,
        minAvailableHeight: 298,
        maxAvailableHeight: 313,
        reservedHeight: 87,
        scrollStateX: ScrollbarState.JOINT_SCROLLBARS,
      });
    });

    it('should not have negative available height', function () {
      tableSize.height = 50;
      tableSize.width = 610;

      const result = roughHeights.resultFunc(
        columnProps,
        elementHeights,
        rowSettings,
        scrollFlags,
        tableSize,
        Scrollbar.SIZE,
        Scrollbar.SIZE
      );

      assert.deepEqual(result, {
        bufferRowCount: 3,
        minAvailableHeight: 0,
        maxAvailableHeight: 0,
        reservedHeight: 87,
        scrollStateX: ScrollbarState.JOINT_SCROLLBARS,
      });
    });
  });

  describe('scrollStateX', function () {
    beforeEach(function () {
      columnProps = [
        {
          fixed: true,
          width: 250,
        },
        {
          fixed: false,
          width: 750,
        },
      ];
    });

    it('should show scrollbar if content width exceeds width', function () {
      const result = roughHeights.resultFunc(
        columnProps,
        elementHeights,
        rowSettings,
        scrollFlags,
        tableSize,
        Scrollbar.SIZE,
        Scrollbar.SIZE
      );

      assert.strictEqual(result.scrollStateX, ScrollbarState.VISIBLE);
    });

    it('should have a conditional scrollbar if content is within a scrollbar size of width', function () {
      columnProps[0].width -= 210;

      const result = roughHeights.resultFunc(
        columnProps,
        elementHeights,
        rowSettings,
        scrollFlags,
        tableSize,
        Scrollbar.SIZE,
        Scrollbar.SIZE
      );

      assert.strictEqual(result.scrollStateX, ScrollbarState.JOINT_SCROLLBARS);
    });

    it('should show not show scrollbar if content width is less than width', function () {
      columnProps[1].width -= 500;

      const result = roughHeights.resultFunc(
        columnProps,
        elementHeights,
        rowSettings,
        scrollFlags,
        tableSize,
        Scrollbar.SIZE,
        Scrollbar.SIZE
      );

      assert.strictEqual(result.scrollStateX, ScrollbarState.HIDDEN);
    });

    it('should not show scrollbar if overflowX is hidden', function () {
      scrollFlags.overflowX = 'hidden';

      const result = roughHeights.resultFunc(
        columnProps,
        elementHeights,
        rowSettings,
        scrollFlags,
        tableSize,
        Scrollbar.SIZE,
        Scrollbar.SIZE
      );

      assert.strictEqual(result.scrollStateX, ScrollbarState.HIDDEN);
    });

    it('should not show scrollbar if showScrollbarX is false', function () {
      scrollFlags.showScrollbarX = false;

      const result = roughHeights.resultFunc(
        columnProps,
        elementHeights,
        rowSettings,
        scrollFlags,
        tableSize,
        Scrollbar.SIZE,
        Scrollbar.SIZE
      );

      assert.strictEqual(result.scrollStateX, ScrollbarState.HIDDEN);
    });
  });

  describe('bufferRowCount', function () {
    it('should return half the max visible rows count', function () {
      const result = roughHeights.resultFunc(
        columnProps,
        elementHeights,
        rowSettings,
        scrollFlags,
        tableSize,
        Scrollbar.SIZE,
        Scrollbar.SIZE
      );

      assert.deepEqual(result, {
        bufferRowCount: 5,
        minAvailableHeight: 450,
        maxAvailableHeight: 450,
        reservedHeight: 2,
        scrollStateX: ScrollbarState.HIDDEN,
      });
    });

    it('should round max visible rows count up', function () {
      tableSize.height = 427;

      const result = roughHeights.resultFunc(
        columnProps,
        elementHeights,
        rowSettings,
        scrollFlags,
        tableSize,
        Scrollbar.SIZE,
        Scrollbar.SIZE
      );

      assert.deepEqual(result, {
        bufferRowCount: 5,
        minAvailableHeight: 425,
        maxAvailableHeight: 425,
        reservedHeight: 2,
        scrollStateX: ScrollbarState.HIDDEN,
      });
    });

    it('should round buffer rows count down', function () {
      tableSize.height = 402;

      const result = roughHeights.resultFunc(
        columnProps,
        elementHeights,
        rowSettings,
        scrollFlags,
        tableSize,
        Scrollbar.SIZE,
        Scrollbar.SIZE
      );

      assert.deepEqual(result, {
        bufferRowCount: 4,
        minAvailableHeight: 400,
        maxAvailableHeight: 400,
        reservedHeight: 2,
        scrollStateX: ScrollbarState.HIDDEN,
      });
    });

    it('should be at least 3', function () {
      tableSize.height = 152;

      const result = roughHeights.resultFunc(
        columnProps,
        elementHeights,
        rowSettings,
        scrollFlags,
        tableSize,
        Scrollbar.SIZE,
        Scrollbar.SIZE
      );

      assert.deepEqual(result, {
        bufferRowCount: 3,
        minAvailableHeight: 150,
        maxAvailableHeight: 150,
        reservedHeight: 2,
        scrollStateX: ScrollbarState.HIDDEN,
      });
    });

    it('should be at most 6', function () {
      tableSize.height = 652;

      const result = roughHeights.resultFunc(
        columnProps,
        elementHeights,
        rowSettings,
        scrollFlags,
        tableSize,
        Scrollbar.SIZE,
        Scrollbar.SIZE
      );

      assert.deepEqual(result, {
        bufferRowCount: 6,
        minAvailableHeight: 650,
        maxAvailableHeight: 650,
        reservedHeight: 2,
        scrollStateX: ScrollbarState.HIDDEN,
      });
    });

    it('should be settable via prop', function () {
      rowSettings.bufferRowCount = 1;

      const result = roughHeights.resultFunc(
        columnProps,
        elementHeights,
        rowSettings,
        scrollFlags,
        tableSize,
        Scrollbar.SIZE,
        Scrollbar.SIZE
      );

      assert.deepEqual(result, {
        bufferRowCount: 1,
        minAvailableHeight: 450,
        maxAvailableHeight: 450,
        reservedHeight: 2,
        scrollStateX: ScrollbarState.HIDDEN,
      });
    });
  });
});
