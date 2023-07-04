import React from 'react';
import FixedDataTableTranslateDOMPosition from '../FixedDataTableTranslateDOMPosition';
import cx from '../vendor_upstream/stubs/cx';
function CellGroupLegacy(props) {
  const styleWrapper = {
    height: props.cellGroupWrapperHeight || props.height,
    width: props.width,
  };

  if (props.isRTL) {
    styleWrapper.right = props.offsetLeft;
  } else {
    styleWrapper.left = props.offsetLeft;
  }

  const styleInner = {
    height: props.height,
    position: 'absolute',
    width: props.contentWidth,
    zIndex: props.zIndex,
  };
  FixedDataTableTranslateDOMPosition(
    styleInner,
    -1 * props.left,
    0,
    props._initialRender,
    props.isRTL
  );

  return (
    <div
      style={styleWrapper}
      className={cx('fixedDataTableCellGroupLayout/cellGroupWrapper')}
    >
      <div
        className={cx('fixedDataTableCellGroupLayout/cellGroup')}
        style={styleInner}
      >
        {props.sortedCells}
      </div>
    </div>
  );
}
export default CellGroupLegacy;
