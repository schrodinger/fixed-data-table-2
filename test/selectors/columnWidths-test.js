/**
 * Copyright Schrodinger, LLC
 */
import { assert } from 'chai';
import columnWidths from '../../src/selectors/columnWidths';
import Scrollbar from '../../src/plugins/Scrollbar';

describe('columnWidths', function () {
  let columnGroupPropsIn;
  let columnPropsIn;
  let scrollEnabledY;
  let width;

  beforeEach(function () {
    scrollEnabledY = false;
    width = 100;

    const fixedGroup1 = [
      {
        id: 2,
        fixed: true,
        flexGrow: 10,
        width: 50,
        groupIdx: 0,
      },
      {
        id: 4,
        fixed: true,
        width: 60,
        groupIdx: 0,
      },
    ];
    const fixedGroup2 = [
      {
        id: 5,
        fixed: true,
        width: 90,
        groupIdx: 2,
      },
      {
        id: 7,
        fixed: true,
        width: 10,
        groupIdx: 2,
      },
    ];
    const scrollableGroup1 = [
      {
        id: 1,
        fixed: false,
        flexGrow: 5,
        width: 50,
        groupIdx: 1,
      },
      {
        id: 3,
        fixed: false,
        flexGrow: 10,
        width: 20,
        groupIdx: 1,
      },
    ];
    const scrollableGroup2 = [
      {
        id: 6,
        fixed: false,
        flexGrow: 1,
        width: 100,
        groupIdx: 3,
      },
    ];
    columnPropsIn = [].concat(
      fixedGroup1,
      scrollableGroup1,
      fixedGroup2,
      scrollableGroup2
    );

    columnGroupPropsIn = [
      {
        fixed: true,
        width: 110,
      },
      {
        fixed: false,
        width: 70,
      },
      {
        fixed: true,
        width: 100,
      },
      {
        fixed: false,
        width: 100,
      },
    ];
  });

  it('should partition columns on fixed flag', function () {
    const {
      columnProps,
      fixedColumns,
      scrollableColumns,
    } = columnWidths.resultFunc(
      columnGroupPropsIn,
      columnPropsIn,
      scrollEnabledY,
      width,
      Scrollbar.SIZE
    );
    assert.deepEqual(
      columnProps.map((column) => column.id),
      [2, 4, 1, 3, 5, 7, 6]
    );
    assert.deepEqual(
      fixedColumns.map((column) => column.id),
      [2, 4, 5, 7]
    );
    assert.deepEqual(
      scrollableColumns.map((column) => column.id),
      [1, 3, 6]
    );
  });

  it('should maintain widths when no surplus', function () {
    const {
      columnGroupProps,
      columnProps,
      fixedColumns,
      scrollableColumns,
    } = columnWidths.resultFunc(
      columnGroupPropsIn,
      columnPropsIn,
      scrollEnabledY,
      width,
      Scrollbar.SIZE
    );

    assert.deepEqual(
      columnGroupProps.map((column) => column.width),
      [110, 70, 100, 100]
    );
    assert.deepEqual(
      columnProps.map((column) => column.width),
      [50, 60, 50, 20, 90, 10, 100]
    );
    assert.deepEqual(
      fixedColumns.map((column) => column.width),
      [50, 60, 90, 10]
    );
    assert.deepEqual(
      scrollableColumns.map((column) => column.width),
      [50, 20, 100]
    );
  });

  it('should distribute flex width', function () {
    width = 640;

    const {
      columnGroupProps,
      columnProps,
      fixedColumns,
      scrollableColumns,
    } = columnWidths.resultFunc(
      columnGroupPropsIn,
      columnPropsIn,
      scrollEnabledY,
      width,
      Scrollbar.SIZE
    );

    assert.deepEqual(
      columnGroupProps.map((column) => column.width),
      [110 + 100, 70 + 150, 100, 100 + 10]
    );
    assert.deepEqual(
      columnProps.map((column) => column.width),
      [50 + 100, 60, 50 + 50, 20 + 100, 90, 10, 100 + 10]
    );
    assert.deepEqual(
      fixedColumns.map((column) => column.width),
      [50 + 100, 60, 90, 10]
    );
    assert.deepEqual(
      scrollableColumns.map((column) => column.width),
      [50 + 50, 20 + 100, 100 + 10]
    );
  });

  it('should take into account scrollbar visibility', function () {
    width = 656;
    scrollEnabledY = true;

    const {
      columnGroupProps,
      columnProps,
      fixedColumns,
      scrollableColumns,
    } = columnWidths.resultFunc(
      columnGroupPropsIn,
      columnPropsIn,
      scrollEnabledY,
      width,
      Scrollbar.SIZE
    );

    assert.deepEqual(
      columnGroupProps.map((column) => column.width),
      [110 + 100, 70 + 150, 100, 100 + 11]
    );
    assert.deepEqual(
      columnProps.map((column) => column.width),
      [50 + 100, 60, 50 + 50, 20 + 100, 90, 10, 100 + 11]
    );
    assert.deepEqual(
      fixedColumns.map((column) => column.width),
      [50 + 100, 60, 90, 10]
    );
    assert.deepEqual(
      scrollableColumns.map((column) => column.width),
      [50 + 50, 20 + 100, 100 + 11]
    );
  });

  it('should compute availableScrollWidth and maxScrollX', function () {
    width = 300;

    const { availableScrollWidth, maxScrollX } = columnWidths.resultFunc(
      columnGroupPropsIn,
      columnPropsIn,
      scrollEnabledY,
      width,
      Scrollbar.SIZE
    );

    assert.strictEqual(
      availableScrollWidth,
      90,
      'availableScrollWidth incorrect'
    );
    assert.strictEqual(maxScrollX, 80, 'maxScrollX incorrect');
  });
});
