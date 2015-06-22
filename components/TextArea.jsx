// A textarea component

var React = require("react");
var PropTypes = React.PropTypes;

var TextArea = React.createClass({
	propTypes: {
		onChange: PropTypes.func,
		onFocus: PropTypes.func,
		className: PropTypes.string,
		defaultValue: PropTypes.string,
		placeholder: PropTypes.string,
		value: PropTypes.string
	},

	_handleInput: function(e) {
		var _input = e.target.value;
		this.props.onChange(_input);
	},

	getDefaultProps: function() {
		return {
			placeholder: "Enter text here..."
		};
	},

	render: function() {
		return (
			<textarea
				onChange={this._handleInput}
				onFocus={this.props.onFocus}
				value={this.props.value}
				defaultValue={this.props.defaultValue}
				placeholder={this.props.placeholder}
				className={["cb-text-area", this.props.className].join(" ")}
			/>
		);
	},
});

module.exports = TextArea;
