import React from 'react';
import FixedDataTableTranslateDOMPosition from '../FixedDataTableTranslateDOMPosition';
import cx from '../vendor_upstream/stubs/cx';

function CellGroup(props) {
  var style = {
    height: props.cellGroupWrapperHeight || props.height,
    position: 'absolute',
    width: props.contentWidth,
    zIndex: props.zIndex,
  };

  FixedDataTableTranslateDOMPosition(
    style,
    -1 * props.left,
    0,
    props._initialRender,
    props.isRTL
  );

  if (props.isRTL) {
    style.right = props.offsetLeft;
  } else {
    style.left = props.offsetLeft;
  }
  return (
    <div
      className={cx('fixedDataTableCellGroupLayout/cellGroup')}
      style={style}
    >
      {props.sortedCells}
    </div>
  );
}
export default CellGroup;
