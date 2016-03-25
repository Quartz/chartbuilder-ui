// wrapper around react-tangle, with a label

var React = require("react");
var PropTypes = React.PropTypes;
var TangleText = require("react-tangle");

var LabelledTangle = React.createClass({
	displayName: "LabelledTangle",


	propTypes: {
		className: PropTypes.string,
		onChange: PropTypes.func,
		onInput: PropTypes.func,
		min: PropTypes.number,
		max: PropTypes.number,
		pixelDistance: PropTypes.number,
		step: PropTypes.number,
		value: PropTypes.number.isRequired
	},

	getDefaultProps: function () {
		return {
			pixelDistance: 10,
			step: 1
		};
	},

	render: function () {
		return React.createElement(
			"div",
			{ className: ["cb-labelled-tangle", this.props.className].join(" ") },
			React.createElement(
				"label",
				{ className: this.props.labelClass },
				this.props.label
			),
			React.createElement(TangleText, {
				className: ["cb-tangle", this.props.tangleClass].join(" "),
				onChange: this.props.onChange,
				onInput: this.props.onInput,
				min: this.props.min,
				max: this.props.max,
				step: this.props.step,
				value: this.props.value,
				pixelDistance: this.props.pixelDistance
			})
		);
	}
});

module.exports = LabelledTangle;