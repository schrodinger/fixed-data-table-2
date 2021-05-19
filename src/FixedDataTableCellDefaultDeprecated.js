/**
 * Copyright Schrodinger, LLC
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule FixedDataTableCellDefaultDeprecated
 * @typechecks
 */

import React from 'react';
import PropTypes from 'prop-types';

import cx from './vendor_upstream/stubs/cx';
import joinClasses from './vendor_upstream/core/joinClasses';

/**
 * NOTE (pradeep): This component is deprecated since it uses a lot of wrapper DIV nodes for styling/layout.
 * The replacement is src/FixedDataTableCell.js which uses a single wrapper to achieve the same table cell layout.
 *
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
    //Remove some props like columnKey and rowIndex so we don't pass it into the div
    var {
      height,
      width,
      style,
      className,
      children,
      columnKey,
      rowIndex,
      ...props
    } = this.props;

    var innerStyle = {
      height,
      width,
      ...style,
    };

    return (
      <div
        {...props}
        className={joinClasses(
          cx('fixedDataTableCellLayout/wrap1'),
          cx('public/fixedDataTableCell/wrap1'),
          className
        )}
        style={innerStyle}
      >
        <div
          className={joinClasses(
            cx('fixedDataTableCellLayout/wrap2'),
            cx('public/fixedDataTableCell/wrap2')
          )}
        >
          <div
            className={joinClasses(
              cx('fixedDataTableCellLayout/wrap3'),
              cx('public/fixedDataTableCell/wrap3')
            )}
          >
            <div className={cx('public/fixedDataTableCell/cellContent')}>
              {children}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default FixedDataTableCellDefault;
