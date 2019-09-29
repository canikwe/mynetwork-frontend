import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux'
import { testAction, fetchingUser, notifyReminders, clearLoading } from './redux/actions/actions'
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
import { Image } from 'semantic-ui-react'
import 'toasted-notes/src/styles.css';

class App extends Component {
  // constructor(){
  //   super()
  //   this.state = {
  //     notified: false
  //   }
  // }

  componentDidMount(){
    this.props.testAction()
    const token = localStorage.getItem('token')
    if (token) {
      this.props.fetchingUser(token)
    } else {
      this.props.clearLoading()
    }
    
  }

  componentDidUpdate(){
    this.props.reminders.map(r => {
      if (r.match && !r.notified && !r.snoozed) {
        this.alerts(r)
        this.props.notifyReminders(r)
      }
    })
  }

  alerts = reminder => {
    return reminder.match ? toast.notify(reminder.msg, {position: 'bottom-left', duration: null}) : null
  }

  render() {
    if (this.props.loading) {
      return (
        <div className="App">
          <NavBar />
      {/* <Dimmer active>
        <Loader size='massive'>Loading</Loader>
      </Dimmer> */}
      <div className='loading'>
        <Image
          centered src='https://cdn.dribbble.com/users/563824/screenshots/4268258/untitled_180_3.gif' />
      </div>
      {/* <Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png' />
      <Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png' /> */}
        </div>
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
    reminders: state.reminders,
    notifications: state.notifications
  }
}

const mapDispatchToProps = dispatch => {
  return {
    testAction: () => dispatch(testAction()),
    //Delete after auth implementation!!
    fetchingUser: (token) => dispatch(fetchingUser(token)),
    notifyReminders: (r) => dispatch(notifyReminders(r)),
    clearLoading: () => dispatch(clearLoading())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
