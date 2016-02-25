/*
 * <AlertGroup
 *	className=string
 *	alerts = array [{alertType, alertText}]
 *
 * >
 */

var React = require("react");
var PropTypes = React.PropTypes;

var Alert = require('./Alert.jsx');

var AlertGroup = React.createClass({

	propTypes: {
		alerts: PropTypes.arrayOf(React.PropTypes.shape({
			alertType: PropTypes.string,
			alertText: PropTypes.string
		})).isRequired,
		className: PropTypes.string
	},

	render: function() {

		var alerts = this.props.alerts.map(function(alert, i) {
			return (
					<Alert
						key={i}
						alertType={alert.alertType}
						alertText={alert.alertText}
					/>
			);
		}, this);

		return (
			<div className={["cb-alert-group", this.props.className].join(" ")} >
					{alerts}
			</div>
		);
	}
});

module.exports = AlertGroup;
