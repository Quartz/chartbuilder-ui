/*
 * <ColorPicker
 *	onUpdate=required func to handle updates
 *	index=number
 *	className=string
 *	numColors=required number of colors to include (handled in css)
 * >
 */

var React = require("react/addons");
var PureRenderMixin = React.addons.PureRenderMixin;
var cx = React.addons.classSet;
var PropTypes = React.PropTypes;

var ColorPicker = React.createClass({

	propTypes: {
		index: PropTypes.number,
		onChange: PropTypes.func.isRequired,
		className: PropTypes.string,
		numColors: PropTypes.number.isRequired
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
		var self = this;
		var colorPickerEls = [];

		for (var i = 0, l = this.props.numColors; i < l; i++) {
			colorPickerEls.push(
				<ColorPickerEl
					onChange={this._handleInput.bind(null, i)}
					index={i}
					key={i}
				/>
			);
		}

		var className = cx({
			"cb-colorpicker-els": true,
			"active": this.state.active
		});

		return (
			<div className="cb-colorpicker">
				<div
					className={"cb-colorpicker-current cb-colorpicker-color-" + this.props.colorIndex}
					onClick={this._togglePicker}
				/>
				<div className={className}>
					{colorPickerEls}
				</div>
			</div>
		);
	}

});

var ColorPickerEl = React.createClass({

	shouldComponentUpdate: function(nextProps, nextState) {
		return (this.props.index !== nextProps.index);
	},

	render: function() {
		return (
			<div
				className={"cb-colorpicker-el cb-colorpicker-color-" + this.props.index}
				onClick={this.props.onChange.bind(null, this.props.index)}
				onMouseOver={this.props.onChange.bind(null, this.props.index)}
			/>
		);
	}

});

module.exports = ColorPicker;
