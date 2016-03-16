/*
 * <TextInput
 *	id=required string identifier
 *	onInput=required func to handle input
 *	label=string to label input
 *	className=string
 * >
 */

var React = require("react");
var ReactDOM = require("react-dom");
var PropTypes = React.PropTypes;
var cx = require("classnames");

var TextInput = React.createClass({

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
			isFocused: false
		}
	},

	getDefaultProps: function() {
		return {
			type: 'text',
			isRequired: false,
			isValid: true
		};
	},

	_focusClass: function() {
		return this.props.value || this.state.isFocused || (this.state.input && this.state.input.length > 0);
	},

	render: function() {
		var labelClass = cx({ 'focus': this._focusClass() });

		var label = this.props.placeholder ? (
			<label className={labelClass}>
				{this.props.placeholder}
			</label>
		) : null;

		var classNames = cx(this.props.className, {
			'cb-text-input': true,
			'required': this.props.isRequired,
			'invalid': !this.props.isValid
		});

		return (
			<div className={classNames}>
				{label}

					<input
						ref='input'
						type={this.props.type}
						onBlur={this._handleInputBlur}
						onChange={this._handleInput}
						onFocus={this._handleInputFocus}
						value={this.props.value}
						isRequired={this.props.isRequired}
						isValid={this.props.isValid}
					/>
			</div>
		);
	},

	blur: function() {
		if (this.isMounted()) ReactDOM.findDOMNode('input').blur();
	},

	focus: function() {
		if (this.isMounted()) ReactDOM.findDOMNode('input').focus();
	},

	_handleInput: function(e) {
		var input = e.target.value;
		this.setState({ input: input });
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
