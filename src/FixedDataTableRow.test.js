import React from 'react';
import FixedDataTableRow from 'FixedDataTableRow';
import ShallowRenderer from 'react-test-renderer/shallow';

it('renders correctly', () => {
  const props = {
    width: 100,
    height: 100,
    offsetTop: 0,
    rowsCount: 0,
    rowHeight: 20,
    fixedColumns: [],
    index: 0,
    scrollableColumns: 0,
    scrollLeft: 10,
    scrollTop: 20,
  }

  const renderer = new ShallowRenderer();
  renderer.render(<FixedDataTableRow {...props}></FixedDataTableRow>);
  const result = renderer.getRenderOutput();
  expect(result).toMatchSnapshot();
});