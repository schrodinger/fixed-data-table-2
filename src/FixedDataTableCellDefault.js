/**
 * Copyright Schrodinger, LLC
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule FixedDataTableCellDefault
 * @typechecks
 */

import React from 'react';
import PropTypes from 'prop-types';

import cx from './vendor_upstream/stubs/cx';
import joinClasses from './vendor_upstream/core/joinClasses';
import ResizerKnob from './plugins/ResizeReorder/ResizerKnob';

/**
 * Component that handles default cell layout and styling.
 *
 * All props unless specified below will be set onto the top level `div`
 * rendered by the cell.
 *
 * Example usage via from a `Column`:
 * ```
 * const MyColumn = (
 *   <Column
 *     cell={({rowIndex, width, height}) => (
 *       <Cell
 *         width={width}
 *         height={height}
 *         className="my-class">
 *         Cell number: <span>{rowIndex}</span>
 *        </Cell>
 *     )}
 *     width={100}
 *   />
 * );
 * ```
 */
class FixedDataTableCellDefault extends React.Component {
  static propTypes = {
    /**
     * Outer height of the cell.
     */
    height: PropTypes.number,

    /**
     * Outer width of the cell.
     */
    width: PropTypes.number,

    /**
     * Optional prop that if specified on the `Column` will be passed to the
     * cell. It can be used to uniquely identify which column is the cell is in.
     */
    columnKey: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

    /**
     * Optional prop that represents the rows index in the table.
     * For the 'cell' prop of a Column, this parameter will exist for any
     * cell in a row with a positive index.
     *
     * Below that entry point the user is welcome to consume or
     * pass the prop through at their discretion.
     */
    rowIndex: PropTypes.number,
  };

  render() {
    //Remove some props which we don't pass into div

    var {
      height,
      width,
      style,
      className,
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
      ...props
    } = this.props;

    var innerStyle = {
      height,
      width,
      ...style,
    };
    // let abc = parseInt(innerStyle.left) + 12
    // innerStyle.left=toString(abc)
    // if(this.props.isHeader){
    //   return (
    //     <div
    //     // {...this.props}
    //     className={joinClasses(
    //       cx('fixedDataTableCellLayout/wrap'),
    //       cx('public/fixedDataTableCell/wrap'),
    //       cx('public/fixedDataTableCell/cellContent'),
    //       className
    //     )}
    //     style={innerStyle}
    //   >
    //     {/* if(this.props.isHeader){ */}
    //       <ResizerKnob
    //       height={this.props.height}
    //       resizerLineHeight={this.props.tableHeight}
    //       onColumnResizeEnd={this.props.onColumnResizeEnd}
    //       width={this.props.width}
    //       minWidth={this.props.minWidth}
    //       maxWidth={this.props.maxWidth}
    //       columnKey={this.props.columnKey}
    //       touchEnabled={this.props.touchEnabled}
    //       isRTL={this.props.isRTL}
    //     />
    //     {/* } */}

    //     {children}
    //   </div>
    //   );
    // }
    // else{
    return (
      <div
        {...props}
        className={joinClasses(
          cx('fixedDataTableCellLayout/wrap'),
          cx('public/fixedDataTableCell/wrap'),
          cx('public/fixedDataTableCell/cellContent'),
          className
        )}
        style={innerStyle}
      >
        {children}
      </div>
    );
    // }
  }
}

export default FixedDataTableCellDefault;
