import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux'
import { testAction, fetchingUser } from './redux/actions'
import { Route, Switch, Redirect } from 'react-router-dom'
import Homepage from './containers/Homepage'
import Login from './components/Login'
import ContactForm from './components/ContactForm'
import NewUserContainer from './containers/NewUserContainer'
import EditUserContainer from './containers/EditUserContainer'




class App extends Component {
  componentDidMount(){
    this.props.testAction()
    this.props.fetchingUser(19)
  }

  render() {
    return (
      <div className="App">
        <div>Nav Bar Goes Here!</div>
        <Switch>
          <Route exact path='/login' component={Login} />
          <Route exact path='/' component={Homepage} />
          <Route exact path='/contacts/new' component={ContactForm} />
          <Route exact path='/signup' component={NewUserContainer} />
          <Route exact path='/profile/edit' component={EditUserContainer} />
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
