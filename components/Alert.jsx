/*
 * <Alert
 *	className=string
 *	alertType=required string ["default", "success", "warning", "error"]
 *	alertText=required string
 *	boldText=string
 * >
 */

var React = require("react");
var PropTypes = React.PropTypes;

var Alert = React.createClass({

	propTypes: {
		alertType: PropTypes.string.isRequired,
		alertText: PropTypes.string.isRequired,
		className: PropTypes.string,
		boldText: PropTypes.string,
		onClick: PropTypes.func
	},

	getDefaultProps: function() {
		return {
			altertType: "default",
			boldText: "",
			alertText: "Hello!"
		};
	},

	render: function() {
		var alertTypeClass = "cb-alert-" + this.props.alertType;
		var boldText;
		if (this.props.boldText) {
			boldText = <strong>{this.props.boldText + " "}</strong>;
		}

		if( typeof(this.props.onClick) === 'undefined' ){
			this.props.onClick = null;
		}

		return (
			<div className={["cb-alert", alertTypeClass].join(" ")} onClick={this.props.onClick} >
				<p className="cb-alert-text">
					{boldText}
					{this.props.alertText}
				</p>
			</div>
		);
	}
});

module.exports = Alert;
