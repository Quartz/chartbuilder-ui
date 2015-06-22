var React = require("react");
var PropTypes = React.PropTypes;
var PureRenderMixin = React.addons.PureRenderMixin;

var Dropdown = React.createClass({

	propTypes: {
		options: PropTypes.arrayOf(PropTypes.shape({
			value: PropTypes.any.isRequired,
			content: PropTypes.node
			})).isRequired,
		onChange: PropTypes.func.isRequired,
		className: PropTypes.string
	},

	_handleSelect: function(e) {
		var val = e.target.value;
		this.props.onChange(val);
	},

	render: function() {
		var dropdownOptions = this.props.options.map(function(option, i) {
			return <DropdownOption
				value={option.value}
				content={option.content}
				key={i}
			/>;
		});
		return (
			<div
				className={["cb-dropdown", this.props.className].join(" ")}
			>
				<select
					className="cb-dropdown-select"
					onChange={this._handleSelect}
					key={this.props.id}
					value={this.props.value}
				>
					{dropdownOptions}
				</select>
			</div>
		)
	}
});

var DropdownOption = React.createClass({

	mixins: [ PureRenderMixin ],

	render: function() {
		return <option value={this.props.value}>{this.props.content}</option>;
	}
});

module.exports = Dropdown;
