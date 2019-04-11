import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux'
import { testAction,fetchingUser } from './redux/actions'
import { Route, Switch, Redirect } from 'react-router-dom'
import Homepage from './containers/Homepage'
import Login from './components/Login'
import ContactForm from './components/ContactForm'
import NewUserContainer from './containers/NewUserContainer'
import EditUserContainer from './containers/EditUserContainer'
import NavBar from './components/NavBar'
import Calendar from './components/Calendar'
// import {isEmpty} from 'lodash'


class App extends Component {
  componentDidMount(){
    this.props.testAction()

    //Use for quick login before implementing AUTH. DON'T FORGET TO IMPORT FETCHINGUSER FROM ACTIONS
    this.props.fetchingUser(26)
  }

  render() {
    return (
      <div className="App">
        <NavBar />
        <Switch>
          <Route exact path='/login' component={Login} />
          <Route exact path='/' component={Homepage} />
          <Route exact path='/contacts/new' component={ContactForm} />
          <Route exact path='/signup' component={NewUserContainer} />
          <Route exact path='/profile/edit' component={EditUserContainer} />
          <Route exact path='/calendar' component={Calendar} />
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
    //Delete after auth implementation!!
    fetchingUser: (id) => dispatch(fetchingUser(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
