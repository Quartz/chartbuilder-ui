// Big example

var React = require("react");

var Alert = require("./components/Alert.jsx");
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
			boldText: "Hello!",
			alertType: "default"
		},
		"too_short": {
			alertText: "Your input is too short.",
			boldText: "Error!",
			alertType: "error"
		},
		"too_short_warn": {
			alertText: "Your input is long enough, but still unsafe.",
			boldText: "Warning!",
			alertType: "warning"
		},
		"success": {
			alertText: "Looks good.",
			boldText: "Success!",
			alertType: "success"
		}
	},
	numColors: 11
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
		} else if (input.length >= 10) {
			return exampleData.inputAlerts.success;
		}
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
						boldText={inputAlert.boldText}
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
