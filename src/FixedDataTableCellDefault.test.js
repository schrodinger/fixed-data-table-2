import React from 'react';
import FixedDataTableCellDefault from 'FixedDataTableCellDefault';
import ShallowRenderer from 'react-test-renderer/shallow';

it('renders correctly', () => {
  const props = {
  }

  const renderer = new ShallowRenderer();
  renderer.render(<FixedDataTableCellDefault {...props}></FixedDataTableCellDefault>);
  const result = renderer.getRenderOutput();
  expect(result).toMatchSnapshot();
});