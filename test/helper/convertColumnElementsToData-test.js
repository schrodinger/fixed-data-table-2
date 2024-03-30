/**
 * Copyright Schrodinger, LLC
 */
import { expect, jest } from '@jest/globals';
import forEach from 'lodash/forEach';
import * as React from 'react';

import convertColumnElementsToData from '../../src/helper/convertColumnElementsToData';

function column(overrides) {
  return {
    align: undefined,
    allowCellsRecycling: undefined,
    cellClassName: undefined,
    columnKey: undefined,
    fixed: undefined,
    fixedRight: undefined,
    flexGrow: undefined,
    index: undefined,
    isReorderable: undefined,
    isResizable: undefined,
    maxWidth: undefined,
    minWidth: undefined,
    pureRendering: undefined,
    width: undefined,
    ...overrides,
  };
}

describe('convertColumnElementsToData', function () {
  beforeAll(function () {
    jest.spyOn(React.Children, 'forEach').mockImplementation(forEach);
  });

  afterAll(function () {
    jest.restoreAllMocks();
  });

  let column1;
  let column2;
  let column3;
  beforeEach(function () {
    column1 = {
      props: {
        columnKey: 'bob',
        fixed: true,
        width: 100,
        cell: { id: 'c1' },
        header: { id: 'h1' },
        footer: { id: 'f1' },
      },
      type: { __TableColumn__: true },
    };
    column2 = {
      props: {
        columnKey: 'sue',
        fixed: false,
        width: 50,
        cell: { id: 'c2' },
        header: { id: 'h2' },
        footer: { id: 'f2' },
      },
      type: { __TableColumn__: true },
    };
    column3 = {
      props: {
        columnKey: 'bill',
        fixed: false,
        width: 200,
        cell: { id: 'c3' },
        header: { id: 'h3' },
        footer: { id: 'f3' },
      },
      type: { __TableColumn__: true },
    };
  });

  it('should return appropriate columnGroupElements, columnElements, and elementTemplates', function () {
    const {
      columnGroupElements,
      columnElements,
      elementTemplates,
      useGroupHeader,
    } = convertColumnElementsToData([
      {
        props: {
          fixed: true,
          children: [column1, column2],
          header: { id: 'g1' },
        },
        type: { __TableColumnGroup__: true },
      },
      {
        props: {
          fixed: false,
          children: [column3],
          header: { id: 'g2' },
        },
        type: { __TableColumnGroup__: true },
      },
    ]);

    expect(columnGroupElements).toEqual({
      fixed: [column({ fixed: true, index: 0 })],
      scrollable: [column({ fixed: false, index: 1 })],
      fixedRight: [],
    });
    expect(columnElements).toEqual({
      fixed: [
        column({
          columnKey: 'bob',
          fixed: true,
          width: 100,
          groupIdx: 0,
          index: 0,
        }),
        column({
          columnKey: 'sue',
          fixed: false,
          width: 50,
          groupIdx: 0,
          index: 1,
        }),
      ],
      scrollable: [
        column({
          columnKey: 'bill',
          fixed: false,
          width: 200,
          groupIdx: 1,
          index: 2,
        }),
      ],
      fixedRight: [],
    });
    expect(elementTemplates).toEqual({
      cell: [{ id: 'c1' }, { id: 'c2' }, { id: 'c3' }],
      footer: [{ id: 'f1' }, { id: 'f2' }, { id: 'f3' }],
      groupHeader: [{ id: 'g1' }, { id: 'g2' }],
      header: [{ id: 'h1' }, { id: 'h2' }, { id: 'h3' }],
    });
    expect(useGroupHeader).toBe(true);
  });

  it('should not specify a groupIdx if none exists', function () {
    const {
      columnGroupElements,
      columnElements,
      elementTemplates,
      useGroupHeader,
    } = convertColumnElementsToData([column1, column2]);

    expect(columnGroupElements).toEqual({
      fixed: [],
      scrollable: [],
      fixedRight: [],
    });
    expect(columnElements).toEqual({
      fixed: [
        column({
          columnKey: 'bob',
          fixed: true,
          width: 100,
          index: 0,
        }),
      ],
      scrollable: [
        column({
          columnKey: 'sue',
          fixed: false,
          width: 50,
          index: 1,
        }),
      ],
      fixedRight: [],
    });
    expect(elementTemplates).toEqual({
      cell: [{ id: 'c1' }, { id: 'c2' }],
      footer: [{ id: 'f1' }, { id: 'f2' }],
      groupHeader: [],
      header: [{ id: 'h1' }, { id: 'h2' }],
    });
    expect(useGroupHeader).toBe(false);
  });

  it('should include all necessary props and remove all others', function () {
    const testColumn = {
      props: {
        align: 'center',
        allowCellsRecycling: true,
        cellClassName: 'myClass',
        columnKey: 'test',
        extraneousProp: 'hello',
        extraneousProp2: "I'm not useful!",
        flexGrow: 10,
        fixed: true,
        isReorderable: true,
        isResizable: true,
        maxWidth: 200,
        minWidth: 50,
        width: 100,
      },
      type: { __TableColumn__: true },
    };

    const { columnElements } = convertColumnElementsToData([testColumn]);

    expect(columnElements).toEqual({
      fixed: [
        column({
          align: 'center',
          allowCellsRecycling: true,
          cellClassName: 'myClass',
          columnKey: 'test',
          flexGrow: 10,
          fixed: true,
          isReorderable: true,
          isResizable: true,
          maxWidth: 200,
          minWidth: 50,
          width: 100,
          index: 0,
        }),
      ],
      scrollable: [],
      fixedRight: [],
    });
  });

  it('should include undefined placeholders for missing header and footer templates', function () {
    delete column1.props.header;
    delete column1.props.footer;

    const { columnElements, elementTemplates } = convertColumnElementsToData([
      column1,
      column2,
    ]);

    expect(columnElements).toEqual({
      fixed: [
        column({
          columnKey: 'bob',
          fixed: true,
          width: 100,
          index: 0,
        }),
      ],
      scrollable: [
        column({
          columnKey: 'sue',
          fixed: false,
          width: 50,
          index: 1,
        }),
      ],
      fixedRight: [],
    });

    expect(elementTemplates).toEqual({
      cell: [{ id: 'c1' }, { id: 'c2' }],
      footer: [undefined, { id: 'f2' }],
      groupHeader: [],
      header: [undefined, { id: 'h2' }],
    });
  });
});
