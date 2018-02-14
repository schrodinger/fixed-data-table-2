import React from 'react';
import FixedDataTableColumnReorderHandle from 'FixedDataTableColumnReorderHandle';
import ShallowRenderer from 'react-test-renderer/shallow';

it('renders correctly', () => {
  const props = {
  }

  const renderer = new ShallowRenderer();
  renderer.render(<FixedDataTableColumnReorderHandle {...props}></FixedDataTableColumnReorderHandle>);
  const result = renderer.getRenderOutput();
  expect(result).toMatchSnapshot();
});