var React = require('react/addons');

var selfClosingTypes = "area base br col command embed hr img input " +
"keygen link meta param source track wbr".split(" ");

var elementTypes = "a abbr address area article aside audio b base bdi bdo big blockquote body br " +
  "button canvas caption cite code col colgroup data datalist dd del details dfn " +
  "dialog div dl dt em embed fieldset figcaption figure footer form h1 h2 h3 h4 h5 " +
  "h6 head header hr html i iframe img input ins kbd keygen label legend li link " +
  "main map mark menu menuitem meta meter nav noscript object ol optgroup option " +
  "put p param picture pre progress q rp rt ruby s samp script section select " +
  "small source span strong style sub summary sup table tbody td textarea tfoot th " +
  "thead time title tr track u ul var video wbr".split(" ");


var margin = 30;

var JSXRenderer = React.createClass({

  propTypes: {
    excludedAttributes : React.PropTypes.array
  },

  getDefaultProps: function () {
    return {
      excludedAttributes: []
    };
  },

  getInitialState: function () {
    return {
      propDetail: null
    }
  },

  render: function () {

    return (
      <div style={{position: "relative"}}>
        {this._getPropDetailNode()}
        <code>
          {this._getChildren()}
        </code>
      </div>
    );
  },

  _getPropDetailNode: function () {

    if (!this.state.propDetail) return null;

    var styles = {position: "absolute"};

    return <div style={styles}></div>;

  },

  _getChildren: function (children) {

    children = children || this.props.children;

    var styles = {
      marginLeft: margin
    };

    return React.Children.map(children, function (child) {

      var markupLiteral;

      if (this._isTextNode(child)) {
        markupLiteral = "{\"" + child + "\"}";
      } else {
        markupLiteral = this._getEmptyNode(child)
        var grandkids = child.props.children;

        if (grandkids && grandkids.length) {
          markupLiteral = this._getNodeWithChildren(child);
        }
      }

      return <div style={styles}>{markupLiteral}</div>;
    }.bind(this));

  },

  _isSelfClosing: function (child) {

    var displayName = this._getDisplayName(child);

    if (elementTypes.indexOf(displayName) === -1) return true;

    return selfClosingTypes.indexOf(displayName) >= 0;

  },

  _isTextNode: function (child) {
    return typeof child === "string";
  },

  _getEmptyNode: function (child) {

    var displayName = this._getDisplayName(child);

    if (this._isSelfClosing(child)) return this._getSelfClosingNode(child);

    return <div>{"<" + displayName + "></" + displayName + ">"}</div>;
  },

  _getSelfClosingNode: function (child) {
    return this._getOpeningNode(child, true);
  },

  _getOpeningNode: function (child, selfClosing) {
    var header = "<" + this._getDisplayName(child);
    var footer = ">";
    if (selfClosing) footer = " /" + footer;

    var attribs = this._getAttributes(child, footer),
      attributesNode = null;
    if (attribs.length > 0) {
      attribs[attribs.length - 1].style = {float: "left"};
      attributesNode = (
        <div style={{marginLeft: margin}}>
          {attribs}
        </div>);
    } else {
      header += footer;
    }
    return (
      <div>{header}
        {attributesNode}
      </div>
    );
  },

  _getAttributes: function (child, appendCloser) {

    var self = this;

    var excluded = ["children"].concat(this.props.excludedAttributes
      .filter(function (element) {
        return element.indexOf(self._getDisplayName(child) + ".") >= 0;
      }).map(function (element) {
        return element.replace(self._getDisplayName(child) + ".", "");
      }));

    var keyVals = [];
    for (var prop in child.props) {
      if (child.props.hasOwnProperty(prop)) {
        if (excluded.indexOf(prop) >= 0) continue;
        var leftSide = child.props[prop];

        var typeOf = typeof leftSide;

        if (typeOf === "string") {
          leftSide = "\"" + leftSide + "\"";
        } else if (typeOf === "boolean" || typeOf === "number") {
          //nothing to do
        } else if (typeOf === "function") {
          leftSide = "function(){}"
        } else if (Array.isArray(leftSide)) {
          leftSide = "[]";
        } else {
          leftSide = "{}";
        }

        leftSide = "{" + leftSide + "}";

        keyVals.push([prop, "=", leftSide].join(""));
      }
    }

    if (keyVals.length && appendCloser) keyVals[keyVals.length - 1] = keyVals[keyVals.length - 1] + appendCloser;

    return keyVals.map(function (keyVal) {
      return <div>{keyVal}</div>;
    });
  },

  _getClosingNode: function (child) {
    return <div>{"</" + this._getDisplayName(child) + ">"}</div>;
  },

  _getNodeWithChildren: function (child) {
    return (
      <div>
        {this._getOpeningNode(child)}
        {this._getChildren(child.props.children)}
        {this._getClosingNode(child)}
      </div>
    );
  },

  _getDisplayName: function (child) {

    var type = child.type;
    if (typeof type === "string") return type;

    if (type.displayName) return type.displayName;

    return "?";
  }

});

module.exports = JSXRenderer;