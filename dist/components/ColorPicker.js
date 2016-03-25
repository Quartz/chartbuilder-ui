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
var PureRenderMixin = require("react-addons-pure-render-mixin");
var cx = require("classnames");
var PropTypes = React.PropTypes;

var ColorPicker = React.createClass({
	displayName: "ColorPicker",


	propTypes: {
		index: PropTypes.number,
		onChange: PropTypes.func.isRequired,
		className: PropTypes.string,
		numColors: PropTypes.number.isRequired,
		labelText: PropTypes.string,
		labelClass: PropTypes.string
	},

	mixins: [PureRenderMixin],

	getInitialState: function () {
		return { active: false };
	},

	_togglePicker: function (e) {
		if (this.state.active) {
			e.stopPropagation();
			document.body.removeEventListener('click', this._togglePicker);
		} else {
			document.body.addEventListener('click', this._togglePicker);
		}
		this.setState({ active: !this.state.active });
	},

	_handleInput: function (colorIndex) {
		this.props.onChange(colorIndex);
	},

	render: function () {
		var colorPickerEls = [];
		var label = null;
		var labelClass = null;

		if (this.props.labelText && this.props.labelText !== "") {
			labelClass = ["cb-colorpicker-label", this.props.labelClass].join(" ");
			label = React.createElement(
				"label",
				{ onClick: this._togglePicker, className: labelClass },
				this.props.labelText
			);
		}

		for (var i = 0, l = this.props.numColors; i < l; i++) {
			colorPickerEls.push(React.createElement(ColorPickerEl, {
				onChange: this._handleInput.bind(null, i),
				index: i,
				key: i
			}));
		}

		var className = cx({
			"cb-colorpicker-els": true,
			"active": this.state.active
		});

		var activeClass = cx({ "active": this.state.active });

		return React.createElement(
			"div",
			{ className: "cb-colorpicker " + activeClass },
			label,
			React.createElement("div", {
				className: "cb-colorpicker-current cb-colorpicker-color-" + this.props.colorIndex,
				onClick: this._togglePicker
			}),
			React.createElement(
				"div",
				{ className: className },
				colorPickerEls
			)
		);
	}

});

var ColorPickerEl = React.createClass({
	displayName: "ColorPickerEl",


	shouldComponentUpdate: function (nextProps, nextState) {
		return this.props.index !== nextProps.index;
	},

	render: function () {
		return React.createElement("div", {
			className: "cb-colorpicker-el cb-colorpicker-color-" + this.props.index,
			onClick: this.props.onChange.bind(null, this.props.index),
			onMouseOver: this.props.onChange.bind(null, this.props.index)
		});
	}

});

module.exports = ColorPicker;