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
import NavBar from './components/NavBar'
import Calendar from './components/Calendar'
import {isEmpty} from 'lodash'


class App extends Component {
  componentDidMount(){
    this.props.testAction()
    const token = localStorage.getItem('token')
    if (token) {
      this.props.fetchingUser(token)
    }
    
    
  }

  render() {
    return (
      <div className="App">
        <NavBar />
        <Switch>

          <Route exact path='/' render={() => {
            return isEmpty(this.props.user) ? <Redirect to='/login' /> : <Homepage />
          }}
          />

          <Route exact path='/login' render={() => {
            return isEmpty(this.props.user) ? <Login /> : <Redirect to='/' />
          }}
          />

          <Route exact path='/contacts/new' component={ContactForm} />
          <Route exact path='/signup' component={NewUserContainer} />
          <Route exact path='/profile/edit' component={EditUserContainer} />
          <Route exact path='/calendar' component={Calendar} />
          {/* <Route component={NotFound} /> */}
          <Redirect from='*' to='/' />

        </Switch>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    loading: state.loading
  }
}

const mapDispatchToProps = dispatch => {
  return {
    testAction: () => dispatch(testAction()),
    //Delete after auth implementation!!
    fetchingUser: (token) => dispatch(fetchingUser(token))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
