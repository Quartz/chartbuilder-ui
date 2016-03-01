/*
 * <Alert
 *	className=string
 *	alertType=required string ["default", "warning", "error", "success"]
 *	alertText=required string
 * >
 */

var React = require("react");
var PropTypes = React.PropTypes;

var Alert = React.createClass({

	propTypes: {
		alertType: PropTypes.string.isRequired,
		alertText: PropTypes.string.isRequired,
		className: PropTypes.string,
		onClick: PropTypes.func
	},

	getDefaultProps: function() {
		return {
			alertType: "default",
			alertText: "Hello!"
		};
	},

	render: function() {

		if( typeof(this.props.onClick) === 'undefined' ){
			this.props.onClick = null;
		}

		return (
			<div className={["cb-alert", this.props.alertType, this.props.className].join(" ").trim()} onClick={this.props.onClick} >
				<span className="cb-alert-icon"></span>
				<p className="cb-alert-text">
					{this.props.alertText}
				</p>
			</div>
		);
	}
});

module.exports = Alert;
