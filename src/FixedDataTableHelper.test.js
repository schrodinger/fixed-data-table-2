import React from 'react';
import FixedDataTableColumnGroup from 'FixedDataTableColumnGroup';
import FixedDataTableColumn from 'FixedDataTableColumn';
import {
  DIR_SIGN,
  CELL_VISIBILITY_TOLERANCE,
  renderToString,
  forEachColumn,
  mapColumns,
} from 'FixedDataTableHelper';
import ShallowRenderer from 'react-test-renderer/shallow';

it('test constant DIR_SIGN', () => {
  expect(DIR_SIGN).toBe(+1);
});

it('test constant CELL_VISIBILITY_TOLERANCE', () => {
  expect(CELL_VISIBILITY_TOLERANCE).toBe(5);
});

it('test renderToString', () => {
  expect(renderToString()).toBe('');
  expect(renderToString(null)).toBe('');
  expect(renderToString(1)).toBe('1');
});

describe('test forEachColumn', () => {
  it('calls function for single child', () => {
    const props = {
      width: 100,
    };

    const child = <FixedDataTableColumn {...props} />

    const callback = jest.fn();

    forEachColumn(child, callback);
    expect(callback.mock.calls.length).toBe(1);
  });

  it('calls function for each child', () => {
    const props = {
      width: 100,
    };

    const children = [
      <FixedDataTableColumnGroup>
        <FixedDataTableColumn {...props} />
        <FixedDataTableColumn {...props} />
      </FixedDataTableColumnGroup>,
      <FixedDataTableColumnGroup>
        <FixedDataTableColumn {...props} />
      </FixedDataTableColumnGroup>,
      <FixedDataTableColumnGroup />,
      <FixedDataTableColumn {...props} />
    ];

    const callback = jest.fn();

    forEachColumn(children, callback);
    expect(callback.mock.calls.length).toBe(4);
  })
});

describe('test mapColumns', () => {
  it('map single column to its key', () => {
    const props = {
      width: 100,
    };

    const child = <FixedDataTableColumn id={7} {...props} />

    const mapFunction = (component) => <div {...component.props} />;

    const mappedChildren = mapColumns(child, mapFunction);
    expect(child).toMatchSnapshot();
    expect(mappedChildren).toMatchSnapshot();

  })
  it('map list of columns and columnGroups to their keys', () => {
    const props = {
      width: 100,
    };

    const children = [
      <FixedDataTableColumnGroup>
        <FixedDataTableColumn id={1} {...props} />
        <FixedDataTableColumn id={2} {...props} />
      </FixedDataTableColumnGroup>,
      <FixedDataTableColumnGroup>
        <FixedDataTableColumn id={3} {...props} />
      </FixedDataTableColumnGroup>,
      <FixedDataTableColumnGroup />,
      <FixedDataTableColumn id={4} {...props} />
    ];

    const mapFunction = (component) => <div {...component.props} />;

    const mappedChildren = mapColumns(children, mapFunction);
    expect(children).toMatchSnapshot();
    expect(mappedChildren).toMatchSnapshot();
  })
})