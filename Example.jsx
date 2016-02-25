// Big example

var React = require("react");

var Alert = require("./components/Alert.jsx");
var AlertGroup = require("./components/AlertGroup.jsx");
var Button = require("./components/Button.jsx");
var ButtonGroup = require("./components/ButtonGroup.jsx");
var ColorPicker = require("./components/ColorPicker.jsx");
var Dropdown = require("./components/Dropdown.jsx");
var TextArea = require("./components/TextArea.jsx");
var TextInput = require("./components/TextInput.jsx");
var LabelledTangle = require("./components/LabelledTangle.jsx");
var Toggle = require("./components/Toggle.jsx");

var exampleData = {
	buttons: [
		{ title: "button1", content: "button1", value: "1" },
		{ title: "button2", content: "button2", value: "2" },
		{ title: "button3", content: "button3", value: "3" },
		{ title: "button4", content: "button4", value: "4" },
		{ title: "button5", content: "button5", value: "5" }
	],
	dropdowns: [
		{ content: "option1", value: "1" },
		{ content: "option2", value: "2" },
		{ content: "option3", value: "3" },
		{ content: "option4", value: "4" },
		{ content: "option5", value: "5" }
	],
	inputAlerts: {
		"empty": {
			alertText: "Enter some text above.",
			alertType: "default"
		},
		"too_short": {
			alertText: "Your input is too short.",
			alertType: "error"
		},
		"too_short_warn": {
			alertText: "Your input is long enough, but still unsafe.",
			alertType: "warning"
		}
	},
	numColors: 11,
	alerts:[{
		alertText: "Some warning.",
		alertType: "warning"
	},
	{
		alertText: "Some error.",
		alertType: "error"
	},
	{
		alertText: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ullamcorper sed odio a lacinia. Praesent at convallis dui. Vestibulum sagittis nulla ligula, a fermentum nisl auctor sit amet. Duis odio dui, dictum at nisi vitae, molestie maximus leo. Nulla facilisi. Cras eu urna nisl. Sed tristique pretium rutrum.",
		alertType: "error"
	},
	{

	}],
	alertGroupError: [{
		alertText: "Some error.",
		alertType: "error"
	}],

	alertGroupWarning: [{
		alertText: "Some warning.",
		alertType: "warning"
	}],
	alertGroupBunch: [{
		alertText: "Some warning.",
		alertType: "warning"
	},
	{
		alertText: "Some error.",
		alertType: "error"
	},
	{
		alertText: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ullamcorper sed odio a lacinia. Praesent at convallis dui. Vestibulum sagittis nulla ligula, a fermentum nisl auctor sit amet. Duis odio dui, dictum at nisi vitae, molestie maximus leo. Nulla facilisi. Cras eu urna nisl. Sed tristique pretium rutrum.",
		alertType: "error"
	}],
	alertGroupEmpty: []

};

var ExampleParent = React.createClass({

	getInitialState: function() {
		return {
			buttonGroup: "1",
			buttonActive: true,
			tangleVal: 0,
			colorIndex: 0,
			shareButton: 0,
			textInput: "",
			textArea: "",
			disabled: true
		};
	},

	_handleEvent: function(k, v) {
		console.log(k, v);
		var state = this.state;
		state[k] = v;
		this.setState(state);
	},

	_validateInput: function() {
		var input = this.state.textInput;
		if (input.length === 0) {
			return exampleData.inputAlerts.empty;
		} else if (input.length < 5) {
			return exampleData.inputAlerts.too_short;
		} else if (input.length >=5 && input.length < 10) {
			return exampleData.inputAlerts.too_short_warn;
		}
	},

	_validateInputGroup: function() {
		var input = this.state.textInput;
		var alertGroup;

		switch(input) {
			case '':
				alertGroup = exampleData.alertGroupEmpty;
				break;
			case 'error':
				alertGroup = exampleData.alertGroupError;
				break;
			case 'warning':
				alertGroup = exampleData.alertGroupWarning;
				break;
			case 'bunch':
				alertGroup = exampleData.alertGroupBunch;
				break;
			default:
				alertGroup = exampleData.alertGroupEmpty;
				break;
		}

		return alertGroup;

	},

	_toggleButton: function() {
		newButtonState = !this.state.buttonActive;
		this._handleEvent("buttonActive", newButtonState);
	},

	render: function() {
		var self = this;
		var currentState = JSON.stringify(this.state, null, 2);
		var inputAlert = this._validateInput();
		var buttonOn = (this.state.buttonActive) ? "on" : "off";
		var inputAlertGroup = this._validateInputGroup();
		return (
			<div className="ui-container">
				<div className="examples">
					<h2 className={"cb-colorpicker-label-" + this.state.colorIndex}>
						Colorpicker
					</h2>
					<ColorPicker
						onChange={this._handleEvent.bind(null, "colorIndex")}
						numColors={exampleData.numColors}
						colorIndex={this.state.colorIndex}
						labelText={"Color"}
					/>
					<h2>Text area</h2>
					<TextArea
						onChange={this._handleEvent.bind(null, "textArea")}
						value={this.state.textArea}
					/>
					<h2>Dropdown</h2>
					<Dropdown
						onChange={this._handleEvent.bind(null, "dropdown")}
						options={exampleData.dropdowns}
					/>
					<h2>Button</h2>
					<Button
						text={"Button is " + buttonOn}
						onClick={this._toggleButton}
						className={this.state.buttonActive ? '' : 'disabled'}
					/>
					<h2>Disabled Button</h2>
					<Button
						text="Disabled button"
						onClick={this._toggleButton}
						className={this.state.buttonActive ? '' : 'disabled'}
						disabled={this.state.disabled}
					/>
					<h2>Button group</h2>
					<ButtonGroup
						onClick={this._handleEvent.bind(null, "buttonGroup")}
						buttons={exampleData.buttons}
						value={this.state.buttonGroup}
					/>
					<h2>Text input</h2>
					<TextInput
						className="cb-text-input"
						onChange={this._handleEvent.bind(null, "textInput")}
						placeholder="Input text"
					/>
					<h2>Alert</h2>
					<Alert
						alertType={inputAlert.alertType}
						alertText={inputAlert.alertText}
					/>

					<h2>AlertGroup</h2>
					<AlertGroup
						alerts={inputAlertGroup}
					/>

					<h2>Labelled tangle</h2>
					<LabelledTangle
						className="cb-labelled-tangle"
						label="Tangle label"
						labelClass="cb-tangle-label"
						tangleClass="cb-tangle-input"
						onChange={this._handleEvent.bind(null, "tangleVal")}
						onInput={this._handleEvent.bind(null, "tangleVal")}
						value={this.state.tangleVal}
					/>
					<h2>Toggle</h2>
					<Toggle
						onToggle={this._handleEvent.bind(null, "toggle1")}
						label="toggle on/off (default toggled)" toggled={true}
					/>
					<Toggle
						onToggle={this._handleEvent.bind(null, "toggle2")}
						label="toggle another thing on/off"
					/>
				</div>
				<div className="current-state">
					<pre>{currentState}</pre>
				</div>
			</div>
		);
	}

});

module.exports = ExampleParent;
