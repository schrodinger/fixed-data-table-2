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
 * @file Big blue line which is visible while resizing
 */

import React from 'react';
import { Portal } from 'react-portal';
import PropTypes from 'prop-types';

import cx from '../../vendor_upstream/stubs/cx';
import joinClasses from '../../vendor_upstream/core/joinClasses';

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
     * Left position of ResizerLine
     */
    left: PropTypes.number.isRequired,

    /**
     * Top position of resizer line
     */
    top: PropTypes.number.isRequired,
  };

  render() {
    if (!this.props.visible) {
      return null;
    }

    const style = {
      height: this.props.height,
      top: this.props.top,
      left: this.props.left,
    };

    return (
      <Portal>
        <div
          className={joinClasses(
            cx('fixedDataTableColumnResizerLineLayout/main'),
            cx('public/fixedDataTableColumnResizerLine/main')
          )}
          style={style}
        >
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
