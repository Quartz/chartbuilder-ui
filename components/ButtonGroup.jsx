// Button group with an active state based on currently selected button

var React = require("react");
var cx = require("classnames");
var PropTypes = require('prop-types');

var Button = require('./Button.jsx');

var ButtonGroup = React.createClass({

	propTypes: {
		value: PropTypes.any.isRequired,
		buttons: PropTypes.arrayOf(PropTypes.shape({
			value: PropTypes.any.isRequired,
			content: PropTypes.node,
			title: PropTypes.string
			})).isRequired,
		onClick: PropTypes.func.isRequired,
		className: PropTypes.string
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
