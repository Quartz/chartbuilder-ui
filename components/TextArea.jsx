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
		validateHandler: PropTypes.func
	},

	getInitialState: function() {
		return {
			isValid: true
		}
	},

	getDefaultProps: function() {
		return {
			isRequired: false
		};
	},

	_handleInput: function(e) {
		var _input = e.target.value;

		this.setState({
			isValid: this._validateHandler(_input)
		});


		this.props.onChange(_input);
	},

	getDefaultProps: function() {
		return {
			placeholder: "Enter text here..."
		};
	},

	_validateHandler: function(input) {

		if ( typeof this.props.validateHandler === 'function' ) {
			return this.props.validateHandler(input);
		} else {
			return true;
		}
	},

	render: function() {
		var propClassName = this.props.className;

		var classNames = cx({
			'cb-text-area': true,
			propClassName: (typeof propClassName === 'string' && propClassName.length > 0),
			'required': this.props.isRequired,
			'invalid': !this.state.isValid
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
					validateHandler={this.props.validateHandler}
				/>
			</div>
		);
	},
});

module.exports = TextArea;
