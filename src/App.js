import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux'
import { testAction, fetchingUser } from './redux/actions'
import { Route, Switch, Redirect } from 'react-router-dom'
import Homepage from './containers/Homepage'
import Login from './components/Login'
import ReminderForm from './components/ReminderForm';



class App extends Component {
  componentDidMount(){
    this.props.testAction()
    this.props.fetchingUser(19)
  }

  render() {
    console.log(this.props)
    return (
      <div className="App">
        <div>Nav Bar Goes Here!</div>
        <Switch>
          <Route exact path='/login' component={Login} />
          <Route exact path='/' component={Homepage} />
          <Route exact path='/reminders/new' component={ReminderForm} />
          <Redirect from='*' to='/' />

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
    testAction: () => dispatch(testAction()),
    fetchingUser: (id) => dispatch(fetchingUser(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
