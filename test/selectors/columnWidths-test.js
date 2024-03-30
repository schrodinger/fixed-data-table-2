/**
 * Copyright Schrodinger, LLC
 */
import { expect } from '@jest/globals';
import columnWidths from '../../src/selectors/columnWidths';
import Scrollbar from '../../src/plugins/Scrollbar';

describe('columnWidths', function () {
  let columnGroupElementsIn;
  let columnElementsIn;
  let scrollEnabledY;
  let width;

  beforeEach(function () {
    scrollEnabledY = false;
    width = 100;

    const fixedGroup1 = [
      {
        id: 1,
        fixed: true,
        flexGrow: 10,
        width: 50,
        groupIdx: 0,
      },
      {
        id: 2,
        fixed: true,
        width: 60,
        groupIdx: 0,
      },
    ];
    const fixedGroup2 = [
      {
        id: 3,
        fixed: true,
        width: 90,
        groupIdx: 1,
      },
      {
        id: 4,
        fixed: true,
        width: 10,
        groupIdx: 1,
      },
    ];
    const scrollableGroup1 = [
      {
        id: 5,
        fixed: false,
        flexGrow: 5,
        width: 50,
        groupIdx: 2,
      },
      {
        id: 6,
        fixed: false,
        flexGrow: 10,
        width: 20,
        groupIdx: 2,
      },
    ];
    const scrollableGroup2 = [
      {
        id: 7,
        fixed: false,
        flexGrow: 1,
        width: 100,
        groupIdx: 3,
      },
    ];
    columnElementsIn = {
      fixed: [...fixedGroup1, ...fixedGroup2],
      scrollable: [...scrollableGroup1, ...scrollableGroup2],
      fixedRight: [],
    };
    columnGroupElementsIn = {
      fixed: [
        {
          fixed: true,
          width: 110,
          index: 0,
        },
        {
          fixed: true,
          width: 100,
          index: 1,
        },
      ],
      scrollable: [
        {
          fixed: false,
          width: 70,
          index: 2,
        },
        {
          fixed: false,
          width: 100,
          index: 3,
        },
      ],
      fixedRight: [],
    };
  });

  it('should partition columns on fixed flag', function () {
    const { columnProps, fixedColumns, scrollableColumns } =
      columnWidths.resultFunc(
        columnGroupElementsIn,
        columnElementsIn,
        scrollEnabledY,
        width,
        Scrollbar.SIZE
      );
    expect(columnProps.map((column) => column.id)).toEqual([
      1, 2, 3, 4, 5, 6, 7,
    ]);
    expect(fixedColumns.map((column) => column.id)).toEqual([1, 2, 3, 4]);
    expect(scrollableColumns.map((column) => column.id)).toEqual([5, 6, 7]);
  });

  it('should maintain widths when no surplus', function () {
    const { columnGroupProps, columnProps, fixedColumns, scrollableColumns } =
      columnWidths.resultFunc(
        columnGroupElementsIn,
        columnElementsIn,
        scrollEnabledY,
        width,
        Scrollbar.SIZE
      );

    expect(columnGroupProps.map((column) => column.width)).toEqual([
      110, 100, 70, 100,
    ]);
    expect(columnProps.map((column) => column.width)).toEqual([
      50, 60, 90, 10, 50, 20, 100,
    ]);
    expect(fixedColumns.map((column) => column.width)).toEqual([
      50, 60, 90, 10,
    ]);
    expect(scrollableColumns.map((column) => column.width)).toEqual([
      50, 20, 100,
    ]);
  });

  it('should distribute flex width', function () {
    width = 640;

    const { columnGroupProps, columnProps, fixedColumns, scrollableColumns } =
      columnWidths.resultFunc(
        columnGroupElementsIn,
        columnElementsIn,
        scrollEnabledY,
        width,
        Scrollbar.SIZE
      );

    expect(columnGroupProps.map((column) => column.width)).toEqual([
      110 + 100,
      100,
      70 + 150,
      100 + 10,
    ]);
    expect(columnProps.map((column) => column.width)).toEqual([
      50 + 100,
      60,
      90,
      10,
      50 + 50,
      20 + 100,
      100 + 10,
    ]);
    expect(fixedColumns.map((column) => column.width)).toEqual([
      50 + 100,
      60,
      90,
      10,
    ]);
    expect(scrollableColumns.map((column) => column.width)).toEqual([
      50 + 50,
      20 + 100,
      100 + 10,
    ]);
  });

  it('should take into account scrollbar visibility', function () {
    width = 656;
    scrollEnabledY = true;

    const { columnGroupProps, columnProps, fixedColumns, scrollableColumns } =
      columnWidths.resultFunc(
        columnGroupElementsIn,
        columnElementsIn,
        scrollEnabledY,
        width,
        Scrollbar.SIZE
      );

    expect(columnGroupProps.map((column) => column.width)).toEqual([
      110 + 100,
      100,
      70 + 150,
      100 + 11,
    ]);
    expect(columnProps.map((column) => column.width)).toEqual([
      50 + 100,
      60,
      90,
      10,
      50 + 50,
      20 + 100,
      100 + 11,
    ]);
    expect(fixedColumns.map((column) => column.width)).toEqual([
      50 + 100,
      60,
      90,
      10,
    ]);
    expect(scrollableColumns.map((column) => column.width)).toEqual([
      50 + 50,
      20 + 100,
      100 + 11,
    ]);
  });

  it('should compute availableScrollWidth and maxScrollX', function () {
    width = 300;

    const { availableScrollWidth, maxScrollX } = columnWidths.resultFunc(
      columnGroupElementsIn,
      columnElementsIn,
      scrollEnabledY,
      width,
      Scrollbar.SIZE
    );

    expect(availableScrollWidth).toBe(90);
    expect(maxScrollX).toBe(80);
  });
});
