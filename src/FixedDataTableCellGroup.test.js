import React from 'react';
import FixedDataTableCellGroup from 'FixedDataTableCellGroup';
import ShallowRenderer from 'react-test-renderer/shallow';

it('renders correctly', () => {
  const props = {
  }

  const renderer = new ShallowRenderer();
  renderer.render(<FixedDataTableCellGroup {...props}></FixedDataTableCellGroup>);
  const result = renderer.getRenderOutput();
  expect(result).toMatchSnapshot();
});