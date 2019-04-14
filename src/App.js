import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux'
import { testAction, fetchingUser, snoozeReminders } from './redux/actions'
import { Route, Switch, Redirect } from 'react-router-dom'
import Homepage from './containers/Homepage'
import Login from './components/Login'
import ContactForm from './components/ContactForm'
import NewUserContainer from './containers/NewUserContainer'
import EditUserContainer from './containers/EditUserContainer'
import NavBar from './components/NavBar'
import Calendar from './components/Calendar'
import { isEmpty } from 'lodash'
import toast from 'toasted-notes'
import 'toasted-notes/src/styles.css';

class App extends Component {
  // constructor(){
  //   super()
  //   this.state = {
  //     notified: false
  //   }
  // }

  componentDidMount(){
    console.log('mounted')
    this.props.testAction()
    const token = localStorage.getItem('token')
    if (token) {
      this.props.fetchingUser(token)
      // if (!this.state.notfied){
      //   this.props.reminders.map(r => this.alerts(r))
      //   this.setState({notified: true})
      // }
    }
    
  }

  componentDidUpdate(){
    this.props.reminders.map(r => {
      if (r.match && !r.snoozed) {
        this.alerts(r)
        this.props.snoozeReminders(r)
      }
    })
  }

  alerts = reminder => {
    return reminder.match ? toast.notify(reminder.msg, {position: 'bottom-left', duration: null}) : null
  }

  render() {
    if (this.props.loading) {
      return (
        <React.Fragment>
          <NavBar />
          <h1>Loading, please wait... </h1>
        </React.Fragment>
      )
    } else {
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

            <Route exact path='/contacts/new' render={() => {
              return !isEmpty(this.props.user) ? <ContactForm /> : <Redirect to='/login' />
            }}
            />

            <Route exact path='/signup' render={() => {
              return isEmpty(this.props.user) ? <NewUserContainer /> : <Redirect to='/' />
            }}
            />

            <Route exact path='/profile/edit' render={() => {
              return !isEmpty(this.props.user) ? <EditUserContainer /> : <Redirect to='/login' />
            }} 
            />

            <Route exact path='/calendar' render={() => {
              return !isEmpty(this.props.user) ? <Calendar /> : <Redirect to='/login' />
            }}
            />
            {/* <Route component={NotFound} /> */}
            <Redirect from='*' to='/' />

          </Switch>
          {/* {this.props.reminders.map(r => this.alerts(r))} */}

        </div>
      );
    }
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    loading: state.loading,
    reminders: state.reminders
  }
}

const mapDispatchToProps = dispatch => {
  return {
    testAction: () => dispatch(testAction()),
    //Delete after auth implementation!!
    fetchingUser: (token) => dispatch(fetchingUser(token)),
    snoozeReminders: (r) => dispatch(snoozeReminders(r))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
