import React from 'react';
import FixedDataTable from 'FixedDataTable';
import FixedDataTableColumn from 'FixedDataTableColumn';
import ShallowRenderer from 'react-test-renderer/shallow';

it('renders correctly', () => {
  const props = {
    width: 600,
    rowsCount: 0,
    rowHeight: 100,
    headerHeight: 50,
  }

  const renderer = new ShallowRenderer();
  renderer.render(<FixedDataTable {...props} />);
  const result = renderer.getRenderOutput();
  expect(result).toMatchSnapshot();
});