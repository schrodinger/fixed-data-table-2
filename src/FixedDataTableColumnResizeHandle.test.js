import React from 'react';
import FixedDataTableColumnResizeHandle from 'FixedDataTableColumnResizeHandle';
import ShallowRenderer from 'react-test-renderer/shallow';

it('renders correctly', () => {
  const props = {
    height: 100,
    knobHeight: 20,
    leftOffset: 0,
    visible: true,
  }

  const renderer = new ShallowRenderer();
  renderer.render(<FixedDataTableColumnResizeHandle {...props}></FixedDataTableColumnResizeHandle>);
  const result = renderer.getRenderOutput();
  expect(result).toMatchSnapshot();
});