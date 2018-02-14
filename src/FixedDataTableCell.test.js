import React from 'react';
import FixedDataTableCell from 'FixedDataTableCell';
import ShallowRenderer from 'react-test-renderer/shallow';

it('renders correctly', () => {
  const props = {
  }

  const renderer = new ShallowRenderer();
  renderer.render(<FixedDataTableCell {...props}></FixedDataTableCell>);
  const result = renderer.getRenderOutput();
  expect(result).toMatchSnapshot();
});