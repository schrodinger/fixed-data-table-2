/**
 * Copyright Schrodinger, LLC
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * This is to be used with the ResizerKnob. It is a read line
 * that when you click on a column that is resizable appears and allows
 * you to resize the corresponding column.
 * @providesModule ResizerLine
 * @typechecks
 */

import React from 'react';
import { Portal } from 'react-portal';
import PropTypes from 'prop-types';

import cx from 'cx';

class ResizerLine extends React.PureComponent {
  static propTypes = {
    /**
     *  It is true if columnResizing is true in ResizerKnob due to mouse down event
     */
    visible: PropTypes.bool.isRequired,

    /**
     * This is the height of the line
     */
    height: PropTypes.number.isRequired,

    /**
     * The ResizerKnob DOM object instance.
     */
    instance: PropTypes.object,

    /**
     * X coordinate that will be left position of ResizerLine
     */
    xCoordinate: PropTypes.number
  };

  instanceDetails = {
    left: 0,
    top: 0,
  };

  /**
   * Check for coordinates of ResizerKnob and update top and left accordingly
   * @param nextProps
   */
  componentWillReceiveProps(nextProps) {
    if (nextProps.instance) {
      this.instanceDetails.top = nextProps.instance.getBoundingClientRect().top;
      this.instanceDetails.left = nextProps.instance.getBoundingClientRect().left;
    }
  }

  render() {
    if (!this.props.visible)
      return null;

    const style = {
      width: 1,
      height: this.props.height,
      top: this.instanceDetails.top,
      position: 'fixed',
      left: this.props.xCoordinate
    };

    return (
      <Portal>
        <div
          className={cx({
            'fixedDataTableColumnResizerLineLayout/main': true,
            'public/fixedDataTableColumnResizerLine/main': true,
          })}
          style={style}>
          <div
            className={cx('fixedDataTableColumnResizerLineLayout/mouseArea')}
            style={{ height: this.props.height }}
          />
        </div>
      </Portal>
    );
  }

}

export default ResizerLine;
