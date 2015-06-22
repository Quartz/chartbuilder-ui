/*
 * <Toggle
 *	className=string
 *	label=required string
 *	onToggle=func
 *	toggled=bool
 * >
 */

var React = require("react");
require("react/addons");
var PropTypes = React.PropTypes;

var Toggle = React.createClass({

	mixins: [ React.addons.PureRenderMixin ],

	propTypes: {
		className: PropTypes.string,
		label: PropTypes.string.isRequired,
		onToggle: PropTypes.func,
		toggled: PropTypes.bool
	},

	getDefaultProps: function() {
		return {
			toggled: false
		};
	},

	getInitialState: function() {
		return {
			toggled: this.props.toggled ||
				false
		};
	},

	handleClick: function() {
		this.setState({ toggled: !this.state.toggled }, function() {
			if (this.props.onToggle) {
				this.props.onToggle(this.state.toggled);
			}
		});
	},

	render: function() {
		var toggleClass = this.state.toggled ? 'toggled' : '';
		return (
			<div className={["cb-toggle", toggleClass, this.props.className].join(" ")} onClick={this.handleClick}>
				<div className="cb-toggle-container"></div>
				<div className="cb-toggle-switch"></div>
				<input
					checked={this.state.toggled}
					readOnly={true}
					type="checkbox"
					name={this.props.name}
				/>
				<label>{this.props.label}</label>
			</div>
		);
	}
});

module.exports = Toggle;
