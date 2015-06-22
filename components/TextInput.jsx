/*
 * <TextInput
 *	id=required string identifier
 *	onInput=required func to handle input
 *	label=string to label input
 *	className=string
 * >
 */

var React = require("react");
var PropTypes = React.PropTypes;

var TextInput = React.createClass({

	propTypes: {
		className: PropTypes.string,
		onBlur: PropTypes.func,
		onChange: PropTypes.func,
		onFocus: PropTypes.func,
		value: PropTypes.string,
		placeholder: PropTypes.string
	},

	getInitialState: function() {
		return {
			isFocused: false
		}
	},

	getDefaultProps: function() {
		return {
			type: 'text'
		};
	},

	render: function() {
		var labelClass = ( this.props.value ||
			this.state.isFocused ||
			this.state.hasValue) ? 'focus' : '';
		var label = this.props.placeholder ? (
			<label className={labelClass}>
				{this.props.placeholder}
			</label>
		) : null;

		return (
			<div className={["cb-text-input", this.props.className].join(" ")}>
			{label}
			<input
				ref='input'
				type={this.props.type}
				onBlur={this._handleInputBlur}
				onChange={this._handleInput}
				onFocus={this._handleInputFocus}
				value={this.props.value}
			/>
			</div>
		);
	},

	blur: function() {
		if (this.isMounted()) React.findDOMNode('input').blur();
	},

	focus: function() {
		if (this.isMounted()) React.findDOMNode('input').focus();
	},

	_handleInput: function(e) {
		var input = e.target.value;
		this.setState({ hasValue: input });
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
