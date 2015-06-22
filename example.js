var React = require("react");
require("react/addons");
global.p = React.addons.Perf;

var container = document.querySelector(".chartbuilder-ui");
var Example = require("./Example.jsx");

document.addEventListener("DOMContentLoaded", function() {
	// Render parent chartbuilder component
	React.render(<Example />, container);
});
