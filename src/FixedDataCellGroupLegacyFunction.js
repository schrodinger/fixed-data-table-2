import React from 'react';
import FixedDataTableTranslateDOMPosition from './FixedDataTableTranslateDOMPosition';
import cx from './vendor_upstream/stubs/cx';
function CellGroupLegacy(props) {
  let style_wrapper = {
    height: props.cellGroupWrapperHeight || props.height,
    width: props.width,
  };

  if (props.isRTL) {
    style_wrapper.right = props.offsetLeft;
  } else {
    style_wrapper.left = props.offsetLeft;
  }

  let style_inner = {
    height: props.height,
    position: 'absolute',
    width: props.contentWidth,
    zIndex: props.zIndex,
  };
  FixedDataTableTranslateDOMPosition(
    style_inner,
    -1 * props.left,
    0,
    props._initialRender,
    props.isRTL
  );

  return (
    <div
      style={style_wrapper}
      className={cx('fixedDataTableCellGroupLayout/cellGroupWrapper')}
    >
      <div
        className={cx('fixedDataTableCellGroupLayout/cellGroup')}
        style={style_inner}
      >
        {props.sortedCells}
      </div>
    </div>
  );
}
export default CellGroupLegacy;
