// A textarea component

var React = require("react");
var PropTypes = React.PropTypes;
var cx = require("classnames");

var TextArea = React.createClass({
	propTypes: {
		onChange: PropTypes.func,
		onFocus: PropTypes.func,
		onBlur: PropTypes.func,
		className: PropTypes.string,
		placeholder: PropTypes.string,
		value: PropTypes.string,
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
			<label>
				{this.props.placeholder}
			</label>
		) : null;

		return (
			<div className={classNames}>
				{label}
				<textarea
					onChange={this._handleInput}
					onFocus={this.props.onFocus}
					onBlur={this.props.onBlur}
					value={this.props.value}
					isRequired={this.props.isRequired}
					isValid={this.props.isValid}
				/>
			</div>
		);
	},
});

module.exports = TextArea;
