/*
 * <AlertGroup
 *	className=string
 *	alerts = array [{type, text}]
 *
 * >
 */

var React = require("react");
var PropTypes = require('prop-types');
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');

var Alert = require('./Alert.jsx');

var AlertGroup = React.createClass({

	propTypes: {
		alerts: PropTypes.arrayOf(PropTypes.shape({
			type: PropTypes.string,
			text: PropTypes.string
		})).isRequired,
		className: PropTypes.string
	},

	render: function() {

		var alerts = this.props.alerts.map(function(alert, i) {
			return (
					<Alert
						key={i}
						type={alert.type}
						text={alert.text}
					/>
			);
		}, this);

		return (
			<div className={["cb-alert-group", this.props.className].join(" ")} >
				<ReactCSSTransitionGroup transitionName="cb-alert" component="div" className="animation-container" transitionEnterTimeout={600} transitionLeaveTimeout={600}>
					{alerts}
				</ReactCSSTransitionGroup>
			</div>
		);
	}
});

module.exports = AlertGroup;
