import React from 'react';
import cx from '../vendor_upstream/stubs/cx';
import joinClasses from '../vendor_upstream/core/joinClasses';

function CellDefaultLegacy(props) {
  const {
    height,
    width,
    style,
    styleDefault,
    className,
    classNameDefault,
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
    onColumnReorderEnd,
    ...propsRemaining
  } = props;
  const innerStyle = {
    height: props.height,
    width: props.width,
    ...style,
  };

  return (
    <div
      {...propsRemaining}
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
