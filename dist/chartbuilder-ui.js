(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/*
 * <Alert
 *	className=string
 *	type=required string ["default", "warning", "error", "success"]
 *	text=required string
 * >
 */

var React = require("react");
var PropTypes = React.PropTypes;

var Alert = React.createClass({displayName: "Alert",

	propTypes: {
		type: PropTypes.string.isRequired,
		text: PropTypes.string.isRequired,
		className: PropTypes.string,
		onClick: PropTypes.func
	},

	getDefaultProps: function() {
		return {
			type: "default",
			text: "Hello!"
		};
	},

	render: function() {

		if( typeof(this.props.onClick) === 'undefined' ){
			this.props.onClick = null;
		}

		return (
			React.createElement("div", {className: ["cb-alert", this.props.type].join(" "), onClick: this.props.onClick}, 
				React.createElement("span", {className: ["cb-alert-icon", this.props.type].join(" ")}), 
				React.createElement("p", {className: "cb-alert-text"}, 
					this.props.text
				)
			)
		);
	}
});

module.exports = Alert;


},{"react":undefined}],2:[function(require,module,exports){
/*
 * <AlertGroup
 *	className=string
 *	alerts = array [{type, text}]
 *
 * >
 */

var React = require("react");
var PropTypes = React.PropTypes;

var Alert = require('./Alert.jsx');

var AlertGroup = React.createClass({displayName: "AlertGroup",

	propTypes: {
		alerts: PropTypes.arrayOf(React.PropTypes.shape({
			type: PropTypes.string,
			text: PropTypes.string
		})).isRequired,
		className: PropTypes.string
	},

	render: function() {

		var alerts = this.props.alerts.map(function(alert, i) {
			return (
					React.createElement(Alert, {
						key: i, 
						type: alert.type, 
						text: alert.text}
					)
			);
		}, this);

		return (
			React.createElement("div", {className: ["cb-alert-group", this.props.className].join(" ")}, 
					alerts
			)
		);
	}
});

module.exports = AlertGroup;


},{"./Alert.jsx":1,"react":undefined}],3:[function(require,module,exports){
/*
 * <Button
 *  className=string
 *  text=required string
 *  onClick=required func
 * >
 */

var React = require("react");
var cx = require("classnames");
var PropTypes = React.PropTypes;
var PureRenderMixin = require("react-addons-pure-render-mixin");

var Button = React.createClass({displayName: "Button",

  mixins: [ PureRenderMixin ],

  propTypes: {
    text: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    className: PropTypes.string,
    value: PropTypes.any,
    active: PropTypes.bool,
    disabled: PropTypes.bool
  },

  getDefaultProps: function() {
    return {
      active: false,
      disabled: false
    };
  },

  onClick: function(e) {
    e.preventDefault();
    if( typeof( this.props.onClick ) !== 'undefined' ) {
      this.props.onClick(e);
    } else {
      return void(0);
    }

  },

  render: function() {
    var className = cx({
      "active": this.props.active
    });

    return (
      React.createElement("button", {
        className: ["cb-button", this.props.className, className].join(" "), 
        onClick: this.onClick, 
        value: this.props.value, 
        disabled: this.props.disabled
      }, 
        this.props.text
      )
    );
  }
});

module.exports = Button;


},{"classnames":12,"react":undefined,"react-addons-pure-render-mixin":14}],4:[function(require,module,exports){
// Button group with an active state based on currently selected button

var React = require("react");
var cx = require("classnames");
var PropTypes = React.PropTypes;

var Button = require('./Button.jsx');

var ButtonGroup = React.createClass({displayName: "ButtonGroup",

	propTypes: {
		value: React.PropTypes.any.isRequired,
		buttons: React.PropTypes.arrayOf(React.PropTypes.shape({
			value: React.PropTypes.any.isRequired,
			content: React.PropTypes.node,
			title: React.PropTypes.string
			})).isRequired,
		onClick: React.PropTypes.func.isRequired,
		className: React.PropTypes.string
	},

	_handleClick: function(e) {
		var val = e.target.value;
		this.props.onClick(val);
	},

	render: function() {
		var buttons = this.props.buttons.map(function(button, i) {
			return (
					React.createElement(Button, {
						key: "" + i, 
						value: button.value, 
						active: this.props.value === button.value, 
						onClick: this._handleClick, 
						text: button.content || "" + button.value, 
						className: "button-group-button"}
					)
			);
		}, this);
		return (
			React.createElement("div", {className: ["cb-button-group", this.props.className].join(" ")}, 
					buttons
			)
		)
	}
});

module.exports = ButtonGroup;


},{"./Button.jsx":3,"classnames":12,"react":undefined}],5:[function(require,module,exports){
/*
 * <ColorPicker
 *	onUpdate=required func to handle updates
 *	index=number
 *	className=string
 *	numColors=required number of colors to include (handled in css)
 *	labelText=string
 *	labelClass=string
 * >
 */

var React = require("react");
var PureRenderMixin = require("react-addons-pure-render-mixin")
var cx = require("classnames");
var PropTypes = React.PropTypes;

var ColorPicker = React.createClass({displayName: "ColorPicker",

	propTypes: {
		index: PropTypes.number,
		onChange: PropTypes.func.isRequired,
		className: PropTypes.string,
		numColors: PropTypes.number.isRequired,
		labelText: PropTypes.string,
		labelClass: PropTypes.string
	},

	mixins: [ PureRenderMixin ],

	getInitialState: function() {
		return { active: false };
	},

	_togglePicker: function(e) {
		if (this.state.active) {
			e.stopPropagation();
			document.body.removeEventListener('click', this._togglePicker);
		} else {
			document.body.addEventListener('click', this._togglePicker);
		}
		this.setState({ active: !this.state.active });
	},

	_handleInput: function(colorIndex) {
		this.props.onChange(colorIndex);
	},

	render: function() {
		var colorPickerEls = [];
		var label = null;
		var labelClass = null;

		if ( this.props.labelText && this.props.labelText !== "" ) {
			labelClass = [ "cb-colorpicker-label", this.props.labelClass ].join(" ");
			label = (
				React.createElement("label", {onClick: this._togglePicker, className: labelClass}, 
					this.props.labelText
				)
			);
		}

		for (var i = 0, l = this.props.numColors; i < l; i++) {
			colorPickerEls.push(
				React.createElement(ColorPickerEl, {
					onChange: this._handleInput.bind(null, i), 
					index: i, 
					key: i}
				)
			);
		}

		var className = cx({
			"cb-colorpicker-els": true,
			"active": this.state.active
		});

		var activeClass = cx({ "active": this.state.active });

		return (
			React.createElement("div", {className: "cb-colorpicker " + activeClass}, 
				label, 
				React.createElement("div", {
					className: "cb-colorpicker-current cb-colorpicker-color-" + this.props.colorIndex, 
					onClick: this._togglePicker}
				), 
				React.createElement("div", {className: className}, 
					colorPickerEls
				)
			)
		);
	}

});

var ColorPickerEl = React.createClass({displayName: "ColorPickerEl",

	shouldComponentUpdate: function(nextProps, nextState) {
		return (this.props.index !== nextProps.index);
	},

	render: function() {
		return (
			React.createElement("div", {
				className: "cb-colorpicker-el cb-colorpicker-color-" + this.props.index, 
				onClick: this.props.onChange.bind(null, this.props.index), 
				onMouseOver: this.props.onChange.bind(null, this.props.index)}
			)
		);
	}

});

module.exports = ColorPicker;


},{"classnames":12,"react":undefined,"react-addons-pure-render-mixin":14}],6:[function(require,module,exports){
var React = require("react");
var PropTypes = React.PropTypes;
var PureRenderMixin = require("react-addons-pure-render-mixin");

var Dropdown = React.createClass({displayName: "Dropdown",

	propTypes: {
		options: PropTypes.arrayOf(PropTypes.shape({
			value: PropTypes.any.isRequired,
			content: PropTypes.node
			})).isRequired,
		onChange: PropTypes.func.isRequired,
		className: PropTypes.string
	},

	_handleSelect: function(e) {
		var val = e.target.value;
		this.props.onChange(val);
	},

	render: function() {
		var dropdownOptions = this.props.options.map(function(option, i) {
			return React.createElement(DropdownOption, {
				value: option.value, 
				content: option.content, 
				key: i}
			);
		});
		return (
			React.createElement("div", {
				className: ["cb-dropdown", this.props.className].join(" ")
			}, 
				React.createElement("select", {
					className: "cb-dropdown-select", 
					onChange: this._handleSelect, 
					key: this.props.id, 
					value: this.props.value
				}, 
					dropdownOptions
				)
			)
		)
	}
});

var DropdownOption = React.createClass({displayName: "DropdownOption",

	mixins: [ PureRenderMixin ],

	render: function() {
		return React.createElement("option", {value: this.props.value}, this.props.content);
	}
});

module.exports = Dropdown;


},{"react":undefined,"react-addons-pure-render-mixin":14}],7:[function(require,module,exports){
// wrapper around react-tangle, with a label

var React = require("react");
var PropTypes = React.PropTypes;
var TangleText = require("react-tangle");

var LabelledTangle = React.createClass({displayName: "LabelledTangle",

	propTypes: {
		className: PropTypes.string,
		onChange: PropTypes.func,
		onInput: PropTypes.func,
		min: PropTypes.number,
		max: PropTypes.number,
		pixelDistance: PropTypes.number,
		step: PropTypes.number,
		value: PropTypes.number.isRequired
	},

	getDefaultProps: function() {
		return {
			pixelDistance: 10,
			step: 1
		};
	},

	render: function() {
		return (
		React.createElement("div", {className: ["cb-labelled-tangle", this.props.className].join(" ")}, 
			React.createElement("label", {className: this.props.labelClass}, this.props.label), 
			React.createElement(TangleText, {
				className: ["cb-tangle", this.props.tangleClass].join(" "), 
				onChange: this.props.onChange, 
				onInput: this.props.onInput, 
				min: this.props.min, 
				max: this.props.max, 
				step: this.props.step, 
				value: this.props.value, 
				pixelDistance: this.props.pixelDistance}
			)
		)
		);
	}
});

module.exports = LabelledTangle;


},{"react":undefined,"react-tangle":15}],8:[function(require,module,exports){
/*
 * <TextArea
 *	onInput=required func to handle input
 *	placeholder=string to label input
 *	className=string
 *	isValid=bool set false to add invalid class on the parent element
 *	isRequired=bool set true to add isReuired on the parent element
 * >
 */


var React = require("react");
var PropTypes = React.PropTypes;
var cx = require("classnames");

var TextArea = React.createClass({displayName: "TextArea",
	propTypes: {
		onChange: PropTypes.func,
		onFocus: PropTypes.func,
		onBlur: PropTypes.func,
		className: PropTypes.string,
		placeholder: PropTypes.string,
		value: PropTypes.string,
		defaultValue: PropTypes.string,
		isRequired: PropTypes.bool,
		isValid: PropTypes.bool
	},

	_handleInput: function(e) {
		var _input = e.target.value;
		this.props.onChange(_input);
	},

	getDefaultProps: function() {
		return {
			placeholder: "Enter text here...",
			isValid: true,
			required: false
		};
	},

	render: function() {

		var classNames = cx(this.props.className, {
			'cb-text-area': true,
			'required': this.props.isRequired,
			'invalid': !this.props.isValid
		});

		var label = this.props.placeholder ? (
			React.createElement("label", null, 
				this.props.placeholder
			)
		) : null;

		return (
			React.createElement("div", {className: classNames}, 
				label, 
				React.createElement("textarea", {
					onChange: this._handleInput, 
					onFocus: this.props.onFocus, 
					onBlur: this.props.onBlur, 
					value: this.props.value, 
					defaultValue: this.props.defaultValue, 
					isRequired: this.props.isRequired, 
					isValid: this.props.isValid}
				)
			)
		);
	},
});

module.exports = TextArea;


},{"classnames":12,"react":undefined}],9:[function(require,module,exports){
/*
 * <TextInput
 *	onInput=required func to handle input
 *	placeholder=string to label input
 *	className=string
 *	isValid=bool set false to add invalid class on the parent element
 *	isRequired=bool set true to add isReuired on the parent element
 * >
 */

var React = require("react");
var ReactDOM = require("react-dom");
var PropTypes = React.PropTypes;
var cx = require("classnames");

var TextInput = React.createClass({displayName: "TextInput",

	propTypes: {
		onBlur: PropTypes.func,
		onChange: PropTypes.func,
		onFocus: PropTypes.func,
		className: PropTypes.string,
		value: PropTypes.string,
		placeholder: PropTypes.string,
		isRequired: PropTypes.bool,
		isValid: PropTypes.bool
	},

	getInitialState: function() {
		return {
			isFocused : false
		}
	},

	getDefaultProps: function() {
		return {
			type: 'text',
			isRequired: false,
			isValid: true,
			value: ''
		};
	},

	_focusClass: function() {
		return this.state.isFocused || this.props.value.length > 0;
	},

	render: function() {
		var labelClass = cx({ 'focus': this._focusClass() });

		var label = this.props.placeholder ? (
			React.createElement("label", {className: labelClass}, 
				this.props.placeholder
			)
		) : null;

		var classNames = cx(this.props.className, {
			'cb-text-input': true,
			'required': this.props.isRequired,
			'invalid': !this.props.isValid
		});

		return (
			React.createElement("div", {className: classNames}, 
				label, 

					React.createElement("input", {
						ref: "input", 
						type: this.props.type, 
						onBlur: this._handleInputBlur, 
						onChange: this._handleInput, 
						onFocus: this._handleInputFocus, 
						value: this.props.value, 
						isRequired: this.props.isRequired, 
						isValid: this.props.isValid}
					)
			)
		);
	},

	_handleInput: function(e) {
		var input = e.target.value;
		this.props.onChange(input);
	},

	_handleInputBlur: function(e) {
		this.setState({ isFocused: false });
		if (this.props.onBlur) this.props.onFocus(e);
	},

	_handleInputFocus: function(e) {
		this.setState({ isFocused: true });
		if (this.props.onFocus) this.props.onFocus(e);
	}

});

module.exports = TextInput;


},{"classnames":12,"react":undefined,"react-dom":undefined}],10:[function(require,module,exports){
/*
 * <Toggle
 *	className=string
 *	label=required string
 *	onToggle=func
 *	toggled=bool
 * >
 */

var React = require("react");
var PropTypes = React.PropTypes;
var PureRenderMixin = require("react-addons-pure-render-mixin");

var Toggle = React.createClass({displayName: "Toggle",

	mixins: [ PureRenderMixin ],

	propTypes: {
		className: PropTypes.string,
		label: PropTypes.string.isRequired,
		onToggle: PropTypes.func,
		toggled: PropTypes.bool
	},

	getDefaultProps: function() {
		return {
			toggled: false
		};
	},

	getInitialState: function() {
		return {
			toggled: this.props.toggled ||
				false
		};
	},

	handleClick: function() {
		this.setState({ toggled: !this.state.toggled }, function() {
			if (this.props.onToggle) {
				this.props.onToggle(this.state.toggled);
			}
		});
	},

	render: function() {
		var toggleClass = this.state.toggled ? 'toggled' : '';
		return (
			React.createElement("div", {className: ["cb-toggle", toggleClass, this.props.className].join(" "), onClick: this.handleClick}, 
				React.createElement("div", {className: "cb-toggle-container"}), 
				React.createElement("div", {className: "cb-toggle-switch"}), 
				React.createElement("input", {
					checked: this.state.toggled, 
					readOnly: true, 
					type: "checkbox", 
					name: this.props.name}
				), 
				React.createElement("label", null, this.props.label)
			)
		);
	}
});

module.exports = Toggle;


},{"react":undefined,"react-addons-pure-render-mixin":14}],11:[function(require,module,exports){
module.exports = {
  Alert: require("./components/Alert.jsx"),
  AlertGroup: require("./components/AlertGroup.jsx"),
  Button: require("./components/Button.jsx"),
  ButtonGroup: require("./components/ButtonGroup.jsx"),
  ColorPicker: require("./components/ColorPicker.jsx"),
  Dropdown: require("./components/Dropdown.jsx"),
  TextArea: require("./components/TextArea.jsx"),
  TextInput: require("./components/TextInput.jsx"),
  LabelledTangle: require("./components/LabelledTangle.jsx"),
  Toggle: require("./components/Toggle.jsx")
};


},{"./components/Alert.jsx":1,"./components/AlertGroup.jsx":2,"./components/Button.jsx":3,"./components/ButtonGroup.jsx":4,"./components/ColorPicker.jsx":5,"./components/Dropdown.jsx":6,"./components/LabelledTangle.jsx":7,"./components/TextArea.jsx":8,"./components/TextInput.jsx":9,"./components/Toggle.jsx":10}],12:[function(require,module,exports){
/*!
  Copyright (c) 2016 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/
/* global define */

(function () {
	'use strict';

	var hasOwn = {}.hasOwnProperty;

	function classNames () {
		var classes = [];

		for (var i = 0; i < arguments.length; i++) {
			var arg = arguments[i];
			if (!arg) continue;

			var argType = typeof arg;

			if (argType === 'string' || argType === 'number') {
				classes.push(arg);
			} else if (Array.isArray(arg)) {
				classes.push(classNames.apply(null, arg));
			} else if (argType === 'object') {
				for (var key in arg) {
					if (hasOwn.call(arg, key) && arg[key]) {
						classes.push(key);
					}
				}
			}
		}

		return classes.join(' ');
	}

	if (typeof module !== 'undefined' && module.exports) {
		module.exports = classNames;
	} else if (typeof define === 'function' && typeof define.amd === 'object' && define.amd) {
		// register as 'classnames', consistent with npm package name
		define('classnames', [], function () {
			return classNames;
		});
	} else {
		window.classNames = classNames;
	}
}());

},{}],13:[function(require,module,exports){
/**
 * Copyright 2013-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule shallowEqual
 * @typechecks
 * 
 */

'use strict';

var hasOwnProperty = Object.prototype.hasOwnProperty;

/**
 * Performs equality by iterating through keys on an object and returning false
 * when any key has values which are not strictly equal between the arguments.
 * Returns true when the values of all keys are strictly equal.
 */
function shallowEqual(objA, objB) {
  if (objA === objB) {
    return true;
  }

  if (typeof objA !== 'object' || objA === null || typeof objB !== 'object' || objB === null) {
    return false;
  }

  var keysA = Object.keys(objA);
  var keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) {
    return false;
  }

  // Test for A's keys different from B.
  var bHasOwnProperty = hasOwnProperty.bind(objB);
  for (var i = 0; i < keysA.length; i++) {
    if (!bHasOwnProperty(keysA[i]) || objA[keysA[i]] !== objB[keysA[i]]) {
      return false;
    }
  }

  return true;
}

module.exports = shallowEqual;
},{}],14:[function(require,module,exports){
module.exports = require('react/lib/ReactComponentWithPureRenderMixin');
},{"react/lib/ReactComponentWithPureRenderMixin":16}],15:[function(require,module,exports){
var React = require('react');

var TangleText = React.createClass({displayName: "TangleText",
  propTypes: {
    value: React.PropTypes.number.isRequired,
    onChange: React.PropTypes.func.isRequired,
    min: React.PropTypes.number,
    max: React.PropTypes.number,
    step: React.PropTypes.number,
    pixelDistance: React.PropTypes.number,
    className: React.PropTypes.string,
    onInput: React.PropTypes.func,
    format: React.PropTypes.func
  },
  getDefaultProps: function() {
    return {
      min: -Infinity,
      max: Infinity,
      step: 1,
      pixelDistance: null,
      className: 'react-tangle-input',
      format: function(x) { return x; },
      onInput: function() { }
    };
  },
  componentWillMount: function() {
    this.__isMouseDown = false;
  },
  componentWillReceiveProps: function(nextProps) {
    this.setState({ value: nextProps.value });
  },
  getInitialState: function() {
    return { value: this.props.value };
  },
  bounds: function(num) {
    num = Math.max(num, this.props.min);
    num = Math.min(num, this.props.max);
    return num;
  },
  onChange: function(e) {
    this.setState({ value: e.target.value });
  },
  onBlur: function(e) {
    var parsed = parseFloat(this.state.value);
    if (isNaN(parsed)) {
      this.setState({ value: this.props.value });
    } else {
      this.props.onChange(this.bounds(parsed));
      this.setState({ value: this.bounds(parsed) });
    }
  },
  onMouseMove: function(e) {
    var change;
    if (this.props.pixelDistance > 0) {
      change = Math.floor((this.startX - e.screenX) / this.props.pixelDistance);
    } else {
      change = this.startX - e.screenX;
    }
    this.dragged = true;
    var value = this.bounds(this.startValue - (change * this.props.step));
    this.setState({ value: value });
    this.props.onInput(value);
  },
  onMouseDown: function(e) {
    // short circuit if currently editing number
    if (e.target === document.activeElement || e.button !== 0) return;
    this.__isMouseDown = true;

    e.preventDefault();

    this.dragged = false;
    this.startX = e.screenX;
    this.startValue = this.state.value;

    window.addEventListener('mousemove', this.onMouseMove);
    window.addEventListener('mouseup', this.onMouseUp);
  },
  onMouseUp: function(e) {
    if (this.__isMouseDown) {
      e.preventDefault();
      window.removeEventListener('mousemove', this.onMouseMove);
      window.removeEventListener('mouseup', this.onMouseUp);
      if (this.dragged) this.onBlur();
      this.__isMouseDown = false;
    }
  },
  onDoubleClick: function(e) {
    e.target.focus();
  },
  onKeyDown: function(e) {
    var value;
    if (e.which == 38) {
      // UP
      e.preventDefault();
      value = this.state.value + this.props.step;
      this.setState({ value: value });
      this.props.onInput(value);
    } else if (e.which == 40) {
      // DOWN
      e.preventDefault();
      value = this.state.value - this.props.step;
      this.setState({ value: value });
      this.props.onInput(value);
    } else if (e.which == 13) {
      // ENTER
      this.onBlur(e);
      e.target.blur();
    }
  },
  render: function() {
    return (
      React.createElement("div", null, 
        React.createElement("input", {
          className: this.props.className, 
          disabled: this.props.disabled, 
          type: "text", 
          onChange: this.onChange, 
          onMouseDown: this.onMouseDown, 
          onKeyDown: this.onKeyDown, 
          onMouseUp: this.onMouseUp, 
          onDoubleClick: this.onDoubleClick, 
          onBlur: this.onBlur, 
          value: this.props.format(this.state.value)})
      )
    );
  }
});

module.exports = TangleText;


},{"react":undefined}],16:[function(require,module,exports){
/**
 * Copyright 2013-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule ReactComponentWithPureRenderMixin
 */

'use strict';

var shallowCompare = require('./shallowCompare');

/**
 * If your React component's render function is "pure", e.g. it will render the
 * same result given the same props and state, provide this Mixin for a
 * considerable performance boost.
 *
 * Most React components have pure render functions.
 *
 * Example:
 *
 *   var ReactComponentWithPureRenderMixin =
 *     require('ReactComponentWithPureRenderMixin');
 *   React.createClass({
 *     mixins: [ReactComponentWithPureRenderMixin],
 *
 *     render: function() {
 *       return <div className={this.props.className}>foo</div>;
 *     }
 *   });
 *
 * Note: This only checks shallow equality for props and state. If these contain
 * complex data structures this mixin may have false-negatives for deeper
 * differences. Only mixin to components which have simple props and state, or
 * use `forceUpdate()` when you know deep data structures have changed.
 */
var ReactComponentWithPureRenderMixin = {
  shouldComponentUpdate: function (nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }
};

module.exports = ReactComponentWithPureRenderMixin;
},{"./shallowCompare":17}],17:[function(require,module,exports){
/**
 * Copyright 2013-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
* @providesModule shallowCompare
*/

'use strict';

var shallowEqual = require('fbjs/lib/shallowEqual');

/**
 * Does a shallow comparison for props and state.
 * See ReactComponentWithPureRenderMixin
 */
function shallowCompare(instance, nextProps, nextState) {
  return !shallowEqual(instance.props, nextProps) || !shallowEqual(instance.state, nextState);
}

module.exports = shallowCompare;
},{"fbjs/lib/shallowEqual":13}]},{},[11]);
