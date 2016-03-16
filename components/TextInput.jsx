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
		className: PropTypes.string,
		onBlur: PropTypes.func,
		onChange: PropTypes.func,
		onFocus: PropTypes.func,
		value: PropTypes.string,
		placeholder: PropTypes.string,
		isRequired: PropTypes.bool,
		validateHandler: PropTypes.func
	},

	getInitialState: function() {
		return {
			isFocused: false,
			isValid: true
		}
	},

	getDefaultProps: function() {
		return {
			type: 'text',
			isRequired: false
		};
	},

	render: function() {

		var labelClass = cx({ 'focus': (this.props.value ||
					this.state.isFocused ||
					this.state.hasValue) });

		var label = this.props.placeholder ? (
			<label className={labelClass}>
				{this.props.placeholder}
			</label>
		) : null;

		var classNames = cx({
			'cb-text-input': true,
			propClassName: (typeof propClassName === 'string' && propClassName.length > 0),
			'required': this.props.isRequired,
			'invalid': !this.state.isValid
		});

		var propClassName = this.props.className;

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
						validateHandler={this.props.validateHandler}
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
		this.setState({
			hasValue: input,
			isValid: this._validateHandler(input)
		});
		this.props.onChange(input);
	},

	_handleInputBlur: function(e) {
		this.setState({ isFocused: false });
		if (this.props.onBlur) this.props.onFocus(e);
	},

	_handleInputFocus: function(e) {
		this.setState({ isFocused: true });
		if (this.props.onFocus) this.props.onFocus(e);
	},

	_validateHandler: function(input) {

		if ( typeof this.props.validateHandler === 'function' ) {
			return this.props.validateHandler(input);
		} else {
			return true;
		}
	}

});

module.exports = TextInput;
