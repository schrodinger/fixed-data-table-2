import React from 'react';
import FixedDataTable from 'FixedDataTable';
import ShallowRenderer from 'react-test-renderer/shallow';

it('renders correctly', () => {
  const props = {
    width: 100,
    height: 100,
    rowsCount: 0,
    rowHeight: 20,
  }

  const renderer = new ShallowRenderer();
  renderer.render(<FixedDataTable {...props}></FixedDataTable>);
  const result = renderer.getRenderOutput();
  expect(result).toMatchSnapshot();
});