/**
 * Copyright Schrodinger, LLC
 */

var React = require('react');

var PropTypes = require('prop-types');

var createReactClass = require('create-react-class');

var PendingPool = {};
var ReadyPool = {};
var imageIdCounter = 0;

var ExampleImage = createReactClass({
  displayName: 'ExampleImage',

  propTypes: {
    src: PropTypes.string.isRequired,
  },

  getInitialState() {
    return {
      ready: false,
    };
  },

  componentWillMount() {
    this.componentId = imageIdCounter++;
    this._load(this.props.src);
  },

  componentWillReceiveProps(nextProps) {
    if (nextProps.src !== this.props.src) {
      this.setState({src: null});
      this._load(nextProps.src);
    }
  },

  componentWillUnmount() {
    var loadingPool = PendingPool[this.props.src];
    if (loadingPool) {
      delete loadingPool[this.componentId];
    }
  },

  render() {
    var style = this.state.src ?
      { backgroundImage : 'url(' + this.state.src + ')'} :
      undefined;

    return <div className="exampleImage" style={style} />;
  },

  _load(/*string*/ src) {
    if (ReadyPool[src]) {
      this.setState({src: src});
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
      Object.keys(callbackPool).forEach(componentId => {
        callbackPool[componentId](src);
      });
      delete PendingPool[src];
      img.onload = null;
      src = undefined;
    };
    img.src = src;
  },

  _onLoad(/*string*/ src) {
    ReadyPool[src] = true;
    if (src === this.props.src) {
      this.setState({
        src: src,
      });
    }
  },
});


module.exports = ExampleImage;
