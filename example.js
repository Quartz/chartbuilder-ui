var React = require("react");
var ReactDOM = require("react-dom")
global.p = require("react-addons-perf");

var container = document.querySelector(".chartbuilder-ui");
var Example = require("./Example.jsx");

document.addEventListener("DOMContentLoaded", function() {
	// Render parent chartbuilder component
	ReactDOM.render(<Example />, container);
});
