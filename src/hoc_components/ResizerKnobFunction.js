import React from 'react';
import cx from '../vendor_upstream/stubs/cx';

function ResizerKnobFunction(props) {
  const resizerKnobStyle = {
    height: props.height,
    left:
      props.onColumnReorderEnd === undefined
        ? props.left + props.width - 6
        : props.width - 6,
  };
  return (
    <div
      className={cx('fixedDataTableCellLayout/columnResizerContainer')}
      ref={props.settingRef}
      style={resizerKnobStyle}
      onMouseDown={props.onMouseDown}
      onTouchStart={props.touchEnabled ? props.onMouseDown : null}
      onTouchEnd={props.touchEnabled ? props.suppressEvent : null}
      onTouchMove={props.touchEnabled ? props.suppressEvent : null}
    >
      {props.resizerLine}
    </div>
  );
}
export default ResizerKnobFunction;
