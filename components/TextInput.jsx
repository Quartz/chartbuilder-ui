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
    //validateHandler: PropTypes.func,
    //isValid:
	},

	getInitialState: function() {
		return {
			isFocused: false
		}
	},

	getDefaultProps: function() {
		return {
			type: 'text',
			isRequired: false
		};
	},

  _focusClass: function() {
    return ( this.props.value || this.state.isFocused );
  },

	render: function() {
    var labelClassName = cx({ 'focus': this._focusClass() });

		var label = this.props.placeholder ? (
			<label className={labelClassName}>
				{this.props.placeholder}
			</label>
		) : null;

		var propClassName = this.props.className;

		var divClassName = cx( propClassName, {
			'cb-text-input': true,
			'required': this.props.isRequired,
			'invalid': !this.props.isValid
		});

		return (
			<div className={divClassName}>
				{label}
				<input
					ref='input'
					type={this.props.type}
					onBlur={this._handleInputBlur}
					onChange={this._handleInput}
					onFocus={this._handleInputFocus}
					value={this.props.value}
					isRequired={this.props.isRequired}
				/>
			</div>
		);
	},

	_handleInput: function(e) {
		var input = e.target.value;
		//this.setState({ isValid: this._validateHandler(input) });
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

	//_validateHandler: function(input) {
		//if ( typeof this.props.validateHandler === 'function' ) {
			//return this.props.validateHandler(input);
		//} else {
			//return true;
		//}
	//}

});

module.exports = TextInput;
