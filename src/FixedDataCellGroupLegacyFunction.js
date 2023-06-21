import React from 'react';
import FixedDataTableTranslateDOMPosition from './FixedDataTableTranslateDOMPosition';
import cx from './vendor_upstream/stubs/cx';
function CellGroupLegacy(props) {
  var style1 = {
    height: props.cellGroupWrapperHeight || props.height,
    width: props.width,
  };

  if (props.isRTL) {
    style1.right = props.offsetLeft;
  } else {
    style1.left = props.offsetLeft;
  }

  var style2 = {
    height: props.height,
    position: 'absolute',
    width: props.contentWidth,
    zIndex: props.zIndex,
  };
  FixedDataTableTranslateDOMPosition(
    style2,
    -1 * props.left,
    0,
    props._initialRender,
    props.isRTL
  );

  return (
    <div
      style={style1}
      className={cx('fixedDataTableCellGroupLayout/cellGroupWrapper')}
    >
      <div
        className={cx('fixedDataTableCellGroupLayout/cellGroup')}
        style={style2}
      >
        {props.sortedCells}
      </div>
    </div>
  );
}
export default CellGroupLegacy;
