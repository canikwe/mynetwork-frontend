import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux'


class App extends Component {
  render() {
    console.log(this.props)
    return (
      <div className="App">
      I am an app

      </div>
    );
  }
}

const mapStateToProps = state => {
  return {user: state.user}
}

export default connect(mapStateToProps)(App);
