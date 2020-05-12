import { Cell } from 'fixed-data-table-2';
import React from 'react';
import ResizerKnob  from './ResizerKnob.js';

class ResizeReorderCell extends React.PureComponent {
  render() {
    const {children, minWidth, maxWidth, onColumnResizeEndCallback, rowIndex, columnKey, left, cellGroupLeft, touchEnabled, isRTL, tableHeight, ...props} = this.props;
    var _columnResizerStyle = {
      height: props.height
    };
    console.log(this.props.tableHeight);
    var resizerComponent = (
      <ResizerKnob
        columnResizerStyle={_columnResizerStyle}
        resizerLineHeight={tableHeight}
        onColumnResizeEnd={onColumnResizeEndCallback}
        left={left}
        width={props.width}
        minWidth={minWidth}
        maxWidth={maxWidth}
        columnKey={columnKey}
        cellGroupLeft={cellGroupLeft} 
        touchEnabled={touchEnabled}
        isRTL={isRTL} />);
    return (
      <div>
        {resizerComponent}
        <Cell {...props}>
          {children}
        </Cell>
      </div>
    );
  }
}

export default ResizeReorderCell;
