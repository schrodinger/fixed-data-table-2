import React from 'react';
import FixedDataTableTranslateDOMPosition from './FixedDataTableTranslateDOMPosition';
import cx from './vendor_upstream/stubs/cx';
import joinClasses from './vendor_upstream/core/joinClasses';

function Row(props) {
  const subRowHeight = props.subRowHeight || 0;
  let style = {
    width: props.width,
    height: props.height + subRowHeight,
    zIndex: props.zIndex ? props.zIndex : 0,
    position: 'absolute',
  };
  if (!props.visible) {
    style.display = 'none';
  }
  FixedDataTableTranslateDOMPosition(
    style,
    0,
    props.offsetTop || 0,
    props._initialRender,
    props.isRTL
  );

  let className = cx({
    'fixedDataTableRowLayout/main': true,
    'public/fixedDataTableRow/main': true,
    'public/fixedDataTableRow/highlighted': props.index % 2 === 1,
    'public/fixedDataTableRow/odd': props.index % 2 === 1,
    'public/fixedDataTableRow/even': props.index % 2 === 0,
  });
  return (
    <div
      className={joinClasses(
        className,
        props.className,
        cx('fixedDataTableRowLayout/body'),
        cx('fixedDataTableRowLayout/rowWrapper')
      )}
      role={'row'}
      aria-rowindex={props.ariaRowIndex}
      {...props.attributes}
      onClick={props.onClick ? props._onClick : null}
      onContextMenu={props.onContextMenu ? props._onContextMenu : null}
      onDoubleClick={props.onDoubleClick ? props._onDoubleClick : null}
      onMouseDown={props.onMouseDown ? props._onMouseDown : null}
      onMouseUp={props.onMouseUp ? props._onMouseUp : null}
      onMouseEnter={
        props.onMouseEnter || props.onMouseLeave ? props._onMouseEnter : null
      }
      onMouseLeave={props.onMouseLeave ? props._onMouseLeave : null}
      onTouchStart={props.onTouchStart ? props._onTouchStart : null}
      onTouchEnd={props.onTouchEnd ? props._onTouchEnd : null}
      onTouchMove={props.onTouchMove ? props._onTouchMove : null}
      style={style}
    >
      {props.fixedColumns}
      {props.scrollableColumns}
      {props.columnsLeftShadow}
      {props.fixedRightColumns}
      {props.fixedRightColumnsShadow}
      {props.scrollbarSpacer}
      {props.rowExpanded && (
        <div
          className={cx('fixedDataTableRowLayout/rowExpanded')}
          style={props.rowExpandedStyle}
        >
          {props.rowExpanded}
        </div>
      )}
      {props.columnsRightShadow}
    </div>
  );
}
export default Row;
