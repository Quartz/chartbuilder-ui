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
		alerts: PropTypes.array.isRequired
	},

	render: function() {

		var alertArr = this.props.alerts;

		var alerts;

		if ( alertArr.length > 0 && typeof alertArr.map === 'function' ) {

			alerts = alertArr.map(function(alert, i) {
				return (
						<Alert
							key={i}
							alertType={alert.alertType}
							alertText={alert.alertText}
						/>
				);
			}, this);

		}

		return (
			<div className={["cb-alert-group", this.props.className].join(" ")} >
					{alerts}
			</div>
		);
	}
});

module.exports = AlertGroup;
