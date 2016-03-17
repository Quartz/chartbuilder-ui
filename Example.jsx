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
			text: "Enter some text above.",
			type: "default"
		},
		"too_short": {
			text: "Your input is too short.",
			type: "error"
		},
		"too_short_warn": {
			text: "Your input is long enough, but still unsafe.",
			type: "warning"
		}
	},
	numColors: 11,
	alertGroupError: [{
		text: "Some error.",
		type: "error"
	}],

	alertGroupWarning: [{
		text: "Some warning.",
		type: "warning"
	}],

	alertGroupBunch: [{
		text: "Some warning.",
		type: "warning"
	},
	{
		text: "Some error.",
		type: "error"
	},
	{
		text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ullamcorper sed odio a lacinia. Praesent at convallis dui. Vestibulum sagittis nulla ligula, a fermentum nisl auctor sit amet. Duis odio dui, dictum at nisi vitae, molestie maximus leo. Nulla facilisi. Cras eu urna nisl. Sed tristique pretium rutrum.",
		type: "error"
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
			textAreaNotRequired: "",
			disabled: true,
			isTextAreaValid: true,
			isTextAreaNotRequiredValid: true
		};
	},

	_handleEvent: function(k, v) {
		console.log(k, v);
		var state = this.state;
		state[k] = v;
		this.setState(state);
	},

	_validateInput: function() {
		var input = typeof this.state.textInputNotRequired === 'string' ? this.state.textInputNotRequired : '';
		if ( input.length === 0 ) {
			return exampleData.inputAlerts.empty;
		} else if ( input.length < 5 ) {
			return exampleData.inputAlerts.too_short;
		} else if ( input.length >=5 ) {
			return exampleData.inputAlerts.too_short_warn;
		}
	},

	_validateInputGroup: function() {
		var input = this.state.textInputRequired;
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

	_isValidInputText: function(text) {

		if (typeof text === 'string' && text.length > 0) {
			return /pass/i.test(text);
		} else {
			return true;
		}

	},

	render: function() {
		var self = this;
		var currentState = JSON.stringify(this.state, null, 2);
		var inputAlert = this._validateInput();
		var buttonOn = (this.state.buttonActive) ? "on" : "off";
		var inputAlertGroup = this._validateInputGroup();
		var isTextAreaNotRequiredValid = this._isValidInputText(this.state.textAreaNotRequired);
		var isTextAreaValid = this._isValidInputText(this.state.textArea);
		var isTextInputRequiredValid = this._isValidInputText(this.state.textInputRequired);
		var isTextInputNotRequiredValid = this._isValidInputText(this.state.textInputNotRequired);
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
						isRequired={true}
						isValid={isTextAreaValid}
					/>
					<h2>Text area no required</h2>
					<TextArea
						onChange={this._handleEvent.bind(null, "textAreaNotRequired")}
						value={this.state.textAreaNotRequired}
						isValid={isTextAreaNotRequiredValid}
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

					<h2>Text inputm type in pass to remove the error state</h2>
					<TextInput
						onChange={this._handleEvent.bind(null, "textInputNotRequired")}
						placeholder="Input text"
						value={this.state.textInputNotRequired}
						isValid={isTextInputNotRequiredValid}
					/>
					<h2>Alert</h2>
					<Alert
						type={inputAlert.type}
						text={inputAlert.text}
					/>
					<h2>Text input required, type in error, warning, or bunch to show different alert group states</h2>
					<TextInput
						className="cb-text-input-example"
						onChange={this._handleEvent.bind(null, "textInputRequired")}
						placeholder="Super long input text placeholder"
						value={this.state.textInputRequired}
						isRequired={true}
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