import React from 'react';
import cx from './vendor_upstream/stubs/cx';
import joinClasses from './vendor_upstream/core/joinClasses';

function CellDefaultLegacy(props) {
  var {
    height,
    width,
    style,
    style_default,
    className,
    className_default,
    children,
    columnKey,
    columnIndex,
    rowIndex,
    left,
    cellGroupType,
    isHeader,
    isGroupHeader,
    maxWidth,
    minWidth,
    shouldUseLegacyComponents,
    ...props_remaining
  } = props;
  let innerStyle = {
    height: props.height,
    width: props.width,
    ...style,
  };

  return (
    <div
      {...props_remaining}
      className={joinClasses(
        cx('fixedDataTableCellLayout/wrap'),
        cx('public/fixedDataTableCell/wrap'),
        cx('public/fixedDataTableCell/cellContent'),
        props.className
      )}
      style={innerStyle}
    >
      {props.children}
    </div>
  );
}
export default CellDefaultLegacy;
