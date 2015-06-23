### Chartbuilder UI React components

React components that make up the UI for [Quartz Chartbuilder](https://github.com/Quartz/Chartbuilder).

Here's a dead-simple [demo page](http://quartz.github.io/chartbuilder-ui/).

To use in your React project:

1. npm install chartbuilder-ui
2. `require` any of the components defined by Chartbuilder UI.

Chartbuilder UI's components:

* Alert
* Button
* ButtonGroup
* ColorPicker
* Dropdown
* TextArea
* TextInput
* LabelledTangle
* Toggle

Developing locally:

* Clone this repo and run `npm install`

To view an example page and develop locally:

    1. `npm run dev` to watch files for changes
    2. `npm start` to launch a simple http server
    3. Navigate to `localhost:8080`

To build the css that modules using Chartbuilder UI will consume:

    npm run build

More docs are coming. For now, [Example.jsx](Example.jsx) shows how each
component ought to be used.
