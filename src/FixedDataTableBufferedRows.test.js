import React from 'react';
import FixedDataTableBufferedRows from 'FixedDataTableBufferedRows';
import ShallowRenderer from 'react-test-renderer/shallow';

it('renders correctly', () => {
  const props = {
    fixedColumns: [],
    height: 200,
    offsetTop: 10,
    rowHeights: { '0': 20 },
    rowsToRender: [],
    scrollLeft: 10,
    scrollTop: 20,
    scrollableColumns: [],
    width: 100,
  }

  const renderer = new ShallowRenderer();
  renderer.render(<FixedDataTableBufferedRows {...props}></FixedDataTableBufferedRows>);
  const result = renderer.getRenderOutput();
  expect(result).toMatchSnapshot();
});