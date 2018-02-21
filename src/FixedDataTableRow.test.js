import React from 'react';
import FixedDataTableRow from 'FixedDataTableRow';
import ShallowRenderer from 'react-test-renderer/shallow';

it('renders correctly', () => {
  const props = {
    fixedColumns: [],
    height: 100,
    index: 0,
    scrollableColumns: [],
    scrollLeft: 30,
    visible: true,
    offsetTop: 40,
    width: 220,
  }

  const renderer = new ShallowRenderer();
  renderer.render(<FixedDataTableRow {...props}></FixedDataTableRow>);
  const result = renderer.getRenderOutput();
  expect(result).toMatchSnapshot();
});