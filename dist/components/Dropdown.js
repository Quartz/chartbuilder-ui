var React = require("react");
var PropTypes = React.PropTypes;
var PureRenderMixin = require("react-addons-pure-render-mixin");

var Dropdown = React.createClass({
	displayName: "Dropdown",


	propTypes: {
		options: PropTypes.arrayOf(PropTypes.shape({
			value: PropTypes.any.isRequired,
			content: PropTypes.node
		})).isRequired,
		onChange: PropTypes.func.isRequired,
		className: PropTypes.string
	},

	_handleSelect: function (e) {
		var val = e.target.value;
		this.props.onChange(val);
	},

	render: function () {
		var dropdownOptions = this.props.options.map(function (option, i) {
			return React.createElement(DropdownOption, {
				value: option.value,
				content: option.content,
				key: i
			});
		});
		return React.createElement(
			"div",
			{
				className: ["cb-dropdown", this.props.className].join(" ")
			},
			React.createElement(
				"select",
				{
					className: "cb-dropdown-select",
					onChange: this._handleSelect,
					key: this.props.id,
					value: this.props.value
				},
				dropdownOptions
			)
		);
	}
});

var DropdownOption = React.createClass({
	displayName: "DropdownOption",


	mixins: [PureRenderMixin],

	render: function () {
		return React.createElement(
			"option",
			{ value: this.props.value },
			this.props.content
		);
	}
});

module.exports = Dropdown;