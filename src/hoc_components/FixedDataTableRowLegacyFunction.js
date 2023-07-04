import React from 'react';
import FixedDataTableTranslateDOMPosition from '../FixedDataTableTranslateDOMPosition';
import cx from '../vendor_upstream/stubs/cx';
import joinClasses from '../vendor_upstream/core/joinClasses';

function RowLegacy(props) {
  const subRowHeight = props.subRowHeight || 0;
  const styleWrapper = {
    width: props.width,
    height: props.height,
    zIndex: props.zIndex ? props.zIndex : 0,
  };
  if (!props.visible) {
    styleWrapper.display = 'none';
  }
  FixedDataTableTranslateDOMPosition(
    styleWrapper,
    0,
    props.offsetTop || 0,
    props._initialRender,
    props.isRTL
  );
  const styleInner = {
    width: props.width,
    height: props.height + subRowHeight,
  };
  const className = cx({
    'fixedDataTableRowLayout/main': true,
    'public/fixedDataTableRow/main': true,
    'public/fixedDataTableRow/highlighted': props.index % 2 === 1,
    'public/fixedDataTableRow/odd': props.index % 2 === 1,
    'public/fixedDataTableRow/even': props.index % 2 === 0,
  });
  return (
    <div
      style={styleWrapper}
      className={cx('fixedDataTableRowLayout/rowWrapper')}
    >
      <div
        className={joinClasses(className, props.className)}
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
        style={styleInner}
      >
        <div className={cx('fixedDataTableRowLayout/body')}>
          {props.fixedColumns}
          {props.scrollableColumns}
          {props.columnsLeftShadow}
          {props.fixedRightColumns}
          {props.fixedRightColumnsShadow}
          {props.scrollbarSpacer}
        </div>
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
    </div>
  );
}
export default RowLegacy;
