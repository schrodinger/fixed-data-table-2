/**
 * Copyright Schrodinger, LLC
 */

import React from 'react';

import PropTypes from 'prop-types';

var PendingPool = {};
var ReadyPool = {};
var imageIdCounter = 0;

class ExampleImage extends React.Component {
  static propTypes = {
    src: PropTypes.string.isRequired,
  };

  state = {
    ready: false,
  };

  componentDidMount() {
    this.componentId = imageIdCounter++;
    this._load(this.props.src);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.src !== this.props.src) {
      this.setState({ src: null });
      this._load(this.props.src);
    }
  }

  componentWillUnmount() {
    var loadingPool = PendingPool[this.props.src];
    if (loadingPool) {
      delete loadingPool[this.componentId];
    }
  }

  render() {
    var style = this.state.src
      ? { backgroundImage: 'url(' + this.state.src + ')' }
      : undefined;

    return <div className="exampleImage" style={style} />;
  }

  _load = (/*string*/ src) => {
    if (ReadyPool[src]) {
      this.setState({ src: src });
      return;
    }

    if (PendingPool[src]) {
      PendingPool[src][this.componentId] = this._onLoad;
      return;
    }

    var callbackPool = {};
    PendingPool[src] = callbackPool;
    callbackPool[this.componentId] = this._onLoad;

    var img = new Image();
    img.onload = () => {
      Object.keys(callbackPool).forEach((componentId) => {
        callbackPool[componentId](src);
      });
      delete PendingPool[src];
      img.onload = null;
      src = undefined;
    };
    img.src = src;
  };

  _onLoad = (/*string*/ src) => {
    ReadyPool[src] = true;
    if (src === this.props.src) {
      this.setState({
        src: src,
      });
    }
  };
}

export default ExampleImage;
