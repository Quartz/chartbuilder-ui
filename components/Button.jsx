/*
 * <Button
 *  className=string
 *  text=required string
 *  onClick=required func
 * >
 */

var React = require("react");
var cx = require("classnames");
var PropTypes = React.PropTypes;
var PureRenderMixin = require("react-addons-pure-render-mixin");

var Button = React.createClass({

  mixins: [ PureRenderMixin ],

  propTypes: {
    text: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    className: PropTypes.string,
    value: PropTypes.any,
    active: PropTypes.bool,
    disabled: PropTypes.bool
  },

  getDefaultProps: function() {
    return {
      active: false,
      disabled: false
    };
  },

  onClick: function(e) {
    e.preventDefault();
    if( typeof( this.props.onClick ) !== 'undefined' ) {
      this.props.onClick(e);
    } else {
      return void(0);
    }

  },

  render: function() {
    var className = cx({
      "active": this.props.active
    });

    return (
      <button
        className={["cb-button", this.props.className, className].join(" ")}
        onClick={this.onClick}
        value={this.props.value}
        disabled={this.props.disabled}
      >
        {this.props.text}
      </button>
    );
  }
});

module.exports = Button;
