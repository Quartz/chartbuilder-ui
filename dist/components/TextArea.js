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

var TextArea = React.createClass({
	displayName: "TextArea",

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

	_handleInput: function (e) {
		var _input = e.target.value;
		this.props.onChange(_input);
	},

	getDefaultProps: function () {
		return {
			placeholder: "Enter text here...",
			isValid: true,
			required: false
		};
	},

	render: function () {

		var classNames = cx(this.props.className, {
			'cb-text-area': true,
			'required': this.props.isRequired,
			'invalid': !this.props.isValid
		});

		var label = this.props.placeholder ? React.createElement(
			"label",
			null,
			this.props.placeholder
		) : null;

		return React.createElement(
			"div",
			{ className: classNames },
			label,
			React.createElement("textarea", {
				onChange: this._handleInput,
				onFocus: this.props.onFocus,
				onBlur: this.props.onBlur,
				value: this.props.value,
				defaultValue: this.props.defaultValue,
				isRequired: this.props.isRequired,
				isValid: this.props.isValid
			})
		);
	}
});

module.exports = TextArea;