var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self, call) {if (!self) {throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call && (typeof call === "object" || typeof call === "function") ? call : self;}function _inherits(subClass, superClass) {if (typeof superClass !== "function" && superClass !== null) {throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;}var MIN_X = 0,
MAX_X = 500;var

App = function (_React$Component) {_inherits(App, _React$Component);
  function App() {_classCallCheck(this, App);var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this));_this.




























    _handleMouseDown = function () {
      _this.setState({ dragging: true });
    };_this.

    _handleMouseMove = function (e) {
      if (_this.state.dragging) {
        var pos = _this.state.pos + e.movementX;
        if (pos < MIN_X) pos = MIN_X;
        if (pos > MAX_X) pos = MAX_X;
        _this.setState({
          pos: pos,
          currentColor: _this.getColorValue(pos / MAX_X) });

      }
    };_this.

    _handleMouseUp = function () {
      _this.setState({ dragging: false });
    };_this.

    getColorValue = function (waypoint) {
      //returns a color value based on percentage between two colors

      //find what two colors is the waypoint in between
      var colorMap = _this.state.colorMap;
      for (var index = 1; index <= colorMap.length - 1; index++) {
        if (waypoint <= colorMap[index].location) {
          break;
        }
      }
      var color1 = _this.HEXtoRGB(colorMap[index - 1].color);
      var color2 = _this.HEXtoRGB(colorMap[index].color);
      var location1 = colorMap[index - 1].location;
      var location2 = colorMap[index].location;
      //-->if there are more than 2 colors in the gradient map:
      //1) calculate the range relative to the gradient locations between the two colors
      //2) find the percentage/location of where the waypoint is within that range
      var range = location2 - location1;
      var waypointPerc = (waypoint - location1) / range;
      var lower = 1 - waypointPerc;
      var upper = waypointPerc;

      //then calculate the color value by mixing the two colors together
      //--> the mixing value is depending on 'lower' and 'upper' value of the location
      //example: at a location scale of 0 - 1, find the color value at location 0.75 between color RED and color GREEN. Therefore the result color will be a mixture of 75% of green and 25% of red

      var rgb = [
      Math.round(color1[0] * lower + color2[0] * upper),
      Math.round(color1[1] * lower + color2[1] * upper),
      Math.round(color1[2] * lower + color2[2] * upper)];

      _this.setState({
        rgb: rgb });

      return _this.RGBtoHEX(rgb);
    };_this.state = { colorMap: [{ color: '#0099f7', location: 0 }, { color: '#8e58d3', location: 0.5 }, { color: '#f2492b', location: 1 }], dragging: false, currentColor: '', rgb: [], pos: 25 };return _this;}_createClass(App, [{ key: 'componentDidMount', value: function componentDidMount() {this.setState({ currentColor: this.getColorValue(this.state.pos / MAX_X) }); //initial value
    } }, { key: 'componentWillMount', value: function componentWillMount() {document.addEventListener('mousemove', this._handleMouseMove);document.addEventListener('mouseup', this._handleMouseUp);} }, { key: 'HEXtoRGB', value: function HEXtoRGB(

    color) {
      var hex = color;
      hex = hex.replace("#", "");
      var result = [
      parseInt(hex.substring(0, 2), 16),
      parseInt(hex.substring(2, 4), 16),
      parseInt(hex.substring(4, 6), 16)];

      return result;
    } }, { key: 'RGBtoHEX', value: function RGBtoHEX(

    color) {
      var result = "#";
      color.map(function (color) {
        var hex = color.toString(16);
        if (hex.length == 1) {
          hex = "0" + hex;
        }
        result = result + hex;
      });
      return result;
    } }, { key: 'render', value: function render()

    {
      var pos = {
        position: 'absolute',
        left: this.state.pos };

      var color = { backgroundColor: this.state.currentColor };
      return React.createElement('div', { className: 'container', style: color },
        React.createElement('div', { className: 'pickerContainer' },
          React.createElement('div', { className: 'color' },
            React.createElement('div', { style: color }),
            React.createElement('h1', null, this.state.currentColor)),

          React.createElement('div', { className: 'gradient' },
            React.createElement('div', { className: 'background' }),
            React.createElement('div', { style: pos,
                className: 'selectorContainer',
                onMouseDown: this._handleMouseDown },
              React.createElement('div', { className: 'selector' }))),


          React.createElement('div', { className: 'pos' }, React.createElement('h1', null, 'LOCATION: ', parseFloat((this.state.pos / MAX_X).toFixed(2))),
            React.createElement('h1', null, 'RGB (', this.state.rgb[0], ',', this.state.rgb[1], ',', this.state.rgb[2], ')'))),


        React.createElement('p', null, 'made with react by ', React.createElement('a', { href: 'https://www.syli.me', target: '_blank' }, 'shoe')));

    } }]);return App;}(React.Component);


React.render(React.createElement(App, null), document.getElementById('app'));