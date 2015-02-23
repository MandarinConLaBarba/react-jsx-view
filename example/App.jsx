var React = require('react'),
  JSXView = require('../index'),
  cx = require('react/lib/cx');

var App = React.createClass({

  getInitialState: function() {
    return {};
  },

  render: function() {

    var sample = this._getSample();

    return (
      <div className="container">
        <div className="row">
          <div className="col-lg-12 hero">
            <h1><code>{"<JSXView/>"}</code></h1>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-12 hero">
            <h3>Check out the code for this demo <a href="https://github.com/MandarinConLaBarba/react-jsx-view/blob/master/example/App.jsx">here</a>.</h3>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-6">
            <div className="panel panel-default">
              <div className="panel-heading"><h4 className="panel-title">{"Components"}</h4></div>
              <div className="panel-body">
                {sample}
              </div>
            </div>

          </div>
          <div className="col-lg-6">
            <div className="panel panel-default">
              <div className="panel-heading"><h4 className="panel-title">{"JSX"}</h4></div>
              <div className="panel-body">
                <JSXView>
                  {sample}
                </JSXView>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  },

  _getSample: function () {

    var buttonText = [
      "Destroy the Replicants",
      "Save the Replicants",
      "Travel to the Offworld",
      "Play Chess with Sebastian"];

    return (
      <div className="btn-group-vertical btn-group-lg text-center">
        {buttonText.map(function (txt, indx) {
          return this._getButtonNode(indx, txt);
        }.bind(this))}
      </div>
    );
  },

  _getButtonNode: function (number, text) {
    var className= cx({
        'btn btn-default': true,
        'active': this.state["button" + number + "Pressed"]
    });

    return <button key={"button-" + number}
      className={className}
      onClick={this._toggleButton.bind(this, number)}>{text}</button>
  },

  _toggleButton: function (number) {
    var mutation = {},
      key = "button" + number + "Pressed";
    mutation[key] = !this.state[key];

    this.setState(mutation);
  }
});


module.exports = App;