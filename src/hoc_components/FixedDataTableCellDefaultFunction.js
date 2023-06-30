import React from 'react';
import cx from '../vendor_upstream/stubs/cx';
import joinClasses from '../vendor_upstream/core/joinClasses';

function CellDefault(props) {
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
    onColumnReorderStart,
    shouldUseLegacyComponents,
    ...props_remaining
  } = props;
  var innerStyle = {
    height: props.height,
    width: props.width,
    ...props.style_default,
    ...props.style,
  };
  if (props.onColumnReorderEnd !== undefined) innerStyle.left = '12px';

  return (
    <div
      {...props_remaining}
      className={joinClasses(
        cx('fixedDataTableCellLayout/wrap'),
        cx('public/fixedDataTableCell/wrap'),
        cx('public/fixedDataTableCell/cellContent'),
        props.className,
        props.className_default
      )}
      style={innerStyle}
    >
      {props.children}
    </div>
  );
}
export default CellDefault;
