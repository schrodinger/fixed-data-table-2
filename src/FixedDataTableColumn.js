/**
 * Copyright Schrodinger, LLC
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule FixedDataTableColumn
 * @typechecks
 */

import React from 'react';
import PropTypes from 'prop-types';

/**
 * Component that defines the attributes of table column.
 */
class FixedDataTableColumn extends React.Component {
  static __TableColumn__ = true;

  static propTypes = {
    /**
     * The horizontal alignment of the table cell content.
     */
    align: PropTypes.oneOf(['left', 'center', 'right']),

    /**
     * Controls if the column is fixed when scrolling in the X axis.
     */
    fixed: PropTypes.bool,

    /**
     * Controls if the column is fixed to the right side of the table when scrolling in the X axis.
     */
    fixedRight: PropTypes.bool,

    /**
     * The header cell for this column.
     * This can either be a string a React element, or a function that generates
     * a React Element. Passing in a string will render a default header cell
     * with that string. By default, the React element passed in can expect to
     * receive the following props:
     *
     * ```
     * props: {
     *   columnKey: string // (of the column, if given)
     *   height: number // (supplied from the Table or rowHeightGetter)
     *   width: number // (supplied from the Column)
     * }
     * ```
     *
     * Because you are passing in your own React element, you can feel free to
     * pass in whatever props you may want or need.
     *
     * If you pass in a function, you will receive the same props object as the
     * first argument.
     */
    header: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),

    /**
     * This is the body cell that will be cloned for this column.
     * This can either be a string a React element, or a function that generates
     * a React Element. Passing in a string will render a default header cell
     * with that string. By default, the React element passed in can expect to
     * receive the following props:
     *
     * ```
     * props: {
     *   rowIndex; number // (the row index of the cell)
     *   columnKey: string // (of the column, if given)
     *   height: number // (supplied from the Table or rowHeightGetter)
     *   width: number // (supplied from the Column)
     * }
     * ```
     *
     * Because you are passing in your own React element, you can feel free to
     * pass in whatever props you may want or need.
     *
     * If you pass in a function, you will receive the same props object as the
     * first argument.
     */
    cell: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),

    /**
     * This is the footer cell for this column.
     * This can either be a string a React element, or a function that generates
     * a React Element. Passing in a string will render a default header cell
     * with that string. By default, the React element passed in can expect to
     * receive the following props:
     *
     * ```
     * props: {
     *   columnKey: string // (of the column, if given)
     *   height: number // (supplied from the Table or rowHeightGetter)
     *   width: number // (supplied from the Column)
     * }
     * ```
     *
     * Because you are passing in your own React element, you can feel free to
     * pass in whatever props you may want or need.
     *
     * If you pass in a function, you will receive the same props object as the
     * first argument.
     */
    footer: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),

    /**
     * This is used to uniquely identify the column, and is not required unless
     * you a resizing columns. This will be the key given in the
     * `onColumnResizeEndCallback` on the Table.
     */
    columnKey: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

    /**
     * The pixel width of the column.
     */
    width: PropTypes.number.isRequired,

    /**
     * If this is a resizable column this is its minimum pixel width.
     */
    minWidth: PropTypes.number,

    /**
     * If this is a resizable column this is its maximum pixel width.
     */
    maxWidth: PropTypes.number,

    /**
     * The grow factor relative to other columns. Same as the flex-grow API
     * from http://www.w3.org/TR/css3-flexbox/. Basically, take any available
     * extra width and distribute it proportionally according to all columns'
     * flexGrow values. Defaults to zero (no-flexing).
     */
    flexGrow: PropTypes.number,

    /**
     * @deprecated This prop is deprecated in favor of the ResizeReorder plugin
     * component. Please refer the Resizable Columns example.
     *
     * Whether the column can be resized.
     * Please note that if a column has a flex grow, once you resize
     * the column, this will be set to 0.
     *
     * This property only provides the UI for the column resizing. If this
     * is set to true, you will need to set the onColumnResizeEndCallback table
     * property and render your columns appropriately.
     */
    isResizable: PropTypes.bool,

    /**
     * @deprecated This prop is deprecated in favor of the ResizeReorder plugin
     * component. Please refer the Reorderable Columns example.
     *
     * Whether the column can be dragged to reorder.
     *
     * This property only provides the UI for the column reordering. If this
     * is set to true, you will need to set the onColumnReorderEndCallback table
     * property and render your columns appropriately.
     */
    isReorderable: PropTypes.bool,

    /**
     * Whether cells in this column can be removed from document when outside
     * of viewport as a result of horizontal scrolling.
     * Setting this property to true allows the table to not render cells in
     * particular column that are outside of viewport for visible rows. This
     * allows to create table with many columns and not have vertical scrolling
     * performance drop.
     * Setting the property to false will keep previous behaviour and keep
     * cell rendered if the row it belongs to is visible.
     */
    allowCellsRecycling: PropTypes.bool,

    /**
     * Flag to enable performance check when rendering. Stops the component from
     * rendering if none of it's passed in props have changed
     */
    pureRendering: PropTypes.bool,

    /**
     * Additional classnames to be added to cells under this column.
     */
    cellClassName: PropTypes.string,
  };

  static defaultProps = {
    allowCellsRecycling: false,
    fixed: false,
    fixedRight: false,
  };

  render() {
    if (__DEV__) {
      throw new Error('Component <FixedDataTableColumn /> should never render');
    }
    return null;
  }
}

export default FixedDataTableColumn;
