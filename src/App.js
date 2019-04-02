import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux'
import {fetchingUser} from './redux/actions'
import { Route, Switch, withRouter } from 'react-router-dom'
import Homepage from './components/Homepage'
import Login from './components/Login'


class App extends Component {
  componentDidMount(){
    this.props.fetchingUser()
  }

  render() {
    console.log(this.props)
    return (
      <div className="App">
        <div>Nav Bar Goes Here!</div>
        <Switch>
          <Route exact path='/login' component={Login} />
          <Route exact path='/' component={Homepage} />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {user: state.user}
}

const mapDispatchToProps = dispatch => {
  return {
    fetchingUser: () => dispatch(fetchingUser())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
