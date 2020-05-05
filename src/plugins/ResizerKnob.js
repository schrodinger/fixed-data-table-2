import React from 'react';
import cx from 'cx';
import joinClasses from 'joinClasses';
import FixedDataTableEventHelper from 'FixedDataTableEventHelper';
import ResizerLine from './ResizerLine';
import emptyFunction from 'emptyFunction';



class ResizerKnob extends React.Component {
  initialState = {
    isColumnResizing: undefined,
    left: undefined,
    width: undefined,
    minWidth: undefined,
    maxWidth: undefined,
    initialEvent: undefined,
    key: undefined
  };

  state = {...this.initialState};

  clearState = () => {
    this.setState(
      this.initialState
    );
  }

  componentDidMount(){
    this.setState({
      instance: this.curRef
    });
  }

  render() {
    const dragKnob =
    <ResizerLine
      height={this.props.resizerLineHeight}
      initialWidth={this.state.width || 0}
      minWidth={this.state.minWidth || 0}
      maxWidth={this.state.maxWidth || Number.MAX_VALUE}
      visible={!!this.state.isColumnResizing}
      leftOffset={this.state.left || 0}
      knobHeight={this.props.columnResizerStyle.height}
      initialEvent={this.state.initialEvent}
      onColumnResizeEnd={this.props.onColumnResizeEnd}
      columnKey={this.state.key}
      touchEnabled={this.props.touchScrollEnabled}
      clearState={this.clearState}
      isRTL={this.props.isRTL}
      instance={this.state.instance}
    />;

    return(
      <div
        className={cx('fixedDataTableCellLayout/columnResizerContainer')}
        ref={(element) => this.curRef=element}
        style={this.props.columnResizerStyle}
        onMouseDown={this._onColumnResizerMouseDown}
        onTouchStart={this.props.touchEnabled ? this._onColumnResizerMouseDown : null}
        onTouchEnd={this.props.touchEnabled ? this._suppressEvent : null}
        onTouchMove={this.props.touchEnabled ? this._suppressEvent : null}> 
        {dragKnob}
        <div
          className={joinClasses(
            cx('fixedDataTableCellLayout/columnResizerKnob'),
            cx('public/fixedDataTableCell/columnResizerKnob'),
          )}
          style={this.props.columnResizerStyle}
        />
      </div>
    );
  }

  _onColumnResizerMouseDown = (/*object*/ event) => {;
    this._onColumnResize(
      this.props.cellGroupLeft,
      this.props.width,
      this.props.minWidth,
      this.props.maxWidth,
      this.props.columnKey,
      event
    );
    /**
     * This prevents the rows from moving around when we resize the
     * headers on touch devices.
     */
    if (this.props.touchEnabled) {
      event.preventDefault();
      event.stopPropagation();
    }
  }

  _onColumnResize = (
    /*number*/ left,
    /*number*/ width,
    /*?number*/ minWidth,
    /*?number*/ maxWidth,
    /*string|number*/ columnKey,
    /*object*/ event
    ) => {
      this.onColumnResize(
        this.props.offsetLeft,
        left - this.props.left + width,
        width,
        minWidth,
        maxWidth,
        columnKey,
        event
      );
    }

  onColumnResize = (
    /*number*/ combinedWidth,
    /*number*/ leftOffset,
    /*number*/ cellWidth,
    /*?number*/ cellMinWidth,
    /*?number*/ cellMaxWidth,
    /*number|string*/ columnKey,
    /*object*/ event
    ) => {
      const coordinates = FixedDataTableEventHelper.getCoordinatesFromEvent(event);
      const clientX = coordinates.x;
      const clientY = coordinates.y;
      this.resizeColumn({
        cellMinWidth,
        cellMaxWidth,
        cellWidth,
        columnKey,
        combinedWidth,
        clientX,
        clientY,
        leftOffset,
      });
    }

  resizeColumn(resizeData) {
    let {
      cellMinWidth,
      cellMaxWidth,
      cellWidth,
      columnKey,
      combinedWidth,
      clientX,
      clientY,
      leftOffset
    } = resizeData;
    this.setState ({
      isColumnResizing: true,
      left: leftOffset + combinedWidth - cellWidth,
      width: cellWidth,
      minWidth: cellMinWidth,
      maxWidth: cellMaxWidth,
      initialEvent: {
        clientX: clientX,
        clientY: clientY,
        preventDefault: emptyFunction
      },
      key: columnKey
    });
  }

  _suppressEvent = (/*object*/ event) => {
    event.preventDefault();
    event.stopPropagation();
  }

};

export default ResizerKnob;