/**
 * Copyright Schrodinger, LLC
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule ScrollContainer
 * @typechecks
 */

import React from 'react';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';

import cx from '../vendor_upstream/stubs/cx';
import joinClasses from '../vendor_upstream/core/joinClasses';

import Scrollbar from './Scrollbar';

class ScrollContainer extends React.Component {
  state = {};

  _onScrollBarsUpdate = (args) => {
    this.setState(args);
  };

  _onVerticalScroll = (/*number*/ scrollPos) => {
    if (this.state.scrollToY !== undefined) {
      this.state.scrollToY(scrollPos);
    }
  };

  _onHorizontalScroll = (/*number*/ scrollPos) => {
    if (this.state.scrollToX !== undefined) {
      this.state.scrollToX(scrollPos);
    }
  };

  render() {
    const scrollbarY = !isEmpty(this.state) && (
      <Scrollbar
        size={this.state.viewportHeight}
        contentSize={this.state.contentHeight}
        onScroll={this._onVerticalScroll}
        verticalTop={this.state.scrollbarYOffsetTop}
        position={this.state.scrollY}
        touchEnabled={this.props.touchScrollEnabled}
        isRTL={this.props.isRTL}
      />
    );
    const scrollbarX = !isEmpty(this.state) && (
      <HorizontalScrollbar
        contentSize={this.state.contentWidth}
        offset={this.state.scrollbarXOffsetTop}
        onScroll={this._onHorizontalScroll}
        position={this.state.scrollX}
        size={this.state.viewportWidth}
        touchEnabled={this.props.touchScrollEnabled}
        isRTL={this.props.isRTL}
      />
    );

    return React.cloneElement(this.props.children, {
      onScrollBarsUpdate: this._onScrollBarsUpdate,
      scrollbarX,
      scrollbarY,
    });
  }
}

class HorizontalScrollbar extends React.PureComponent {
  static propTypes = {
    contentSize: PropTypes.number.isRequired,
    offset: PropTypes.number.isRequired,
    onScroll: PropTypes.func.isRequired,
    position: PropTypes.number.isRequired,
    size: PropTypes.number.isRequired,
    isRTL: PropTypes.bool,
  };

  render() /*object*/ {
    const { offset, size } = this.props;

    const outerContainerStyle = {
      height: Scrollbar.SIZE,
      width: size,
    };
    const innerContainerStyle = {
      height: Scrollbar.SIZE,
      overflow: 'hidden',
      width: size,
      top: offset,
    };

    return (
      <div
        className={joinClasses(cx('public/fixedDataTable/horizontalScrollbar'))}
        style={outerContainerStyle}
      >
        <div style={innerContainerStyle}>
          <Scrollbar
            {...this.props}
            isOpaque={true}
            orientation="horizontal"
            offset={undefined}
          />
        </div>
      </div>
    );
  }
}

export default ScrollContainer;
