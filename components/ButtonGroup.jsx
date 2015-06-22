// Button group with an active state based on currently selected button

var React = require("react");
require("react/addons");
var cx = React.addons.classSet;
var PropTypes = React.PropTypes;

var Button = require('./Button.jsx');

var ButtonGroup = React.createClass({

	propTypes: {
		value: React.PropTypes.any.isRequired,
		buttons: React.PropTypes.arrayOf(React.PropTypes.shape({
			value: React.PropTypes.any.isRequired,
			content: React.PropTypes.node,
			title: React.PropTypes.string
			})).isRequired,
		onClick: React.PropTypes.func.isRequired,
		className: React.PropTypes.string
	},

	_handleClick: function(e) {
		var val = e.target.value;
		this.props.onClick(val);
	},

	render: function() {
		var buttons = this.props.buttons.map(function(button, i) {
			return (
					<Button
						key={"" + i}
						value={button.value}
						active={this.props.value === button.value}
						onClick={this._handleClick}
						text={button.content || "" + button.value}
						className="button-group-button"
					/>
			);
		}, this);
		return (
			<div className={["cb-button-group", this.props.className].join(" ")} >
					{buttons}
			</div>
		)
	}
});

module.exports = ButtonGroup;
