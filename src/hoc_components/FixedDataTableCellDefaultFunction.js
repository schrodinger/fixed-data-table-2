import React from 'react';
import cx from '../vendor_upstream/stubs/cx';
import joinClasses from '../vendor_upstream/core/joinClasses';

function CellDefault(props) {
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
    onColumnReorderStart,
    shouldUseLegacyComponents,
    onColumnReorderEnd,
    ...propsRemaining
  } = props;
  const innerStyle = {
    height: props.height,
    width: props.width,
    ...props.styleDefault,
    ...props.style,
  };
  if (props.onColumnReorderEnd !== undefined) innerStyle.left = '12px';

  return (
    <div
      {...propsRemaining}
      className={joinClasses(
        cx('fixedDataTableCellLayout/wrap'),
        cx('public/fixedDataTableCell/wrap'),
        cx('public/fixedDataTableCell/cellContent'),
        props.className,
        props.classNameDefault
      )}
      style={innerStyle}
    >
      {props.children}
    </div>
  );
}
export default CellDefault;
