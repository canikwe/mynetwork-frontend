import React, { Component } from 'react';
import './App.scss';
import { connect } from 'react-redux'
import { testAction, fetchingUser, notifyReminders, clearLoading } from './redux/actions'
import { Route, Switch, Redirect } from 'react-router-dom'
import Homepage from './containers/Homepage'
import Login from './components/Login'
import ContactForm from './components/ContactForm'
import NewUserContainer from './containers/NewUserContainer'
import EditUserContainer from './containers/EditUserContainer'
import NavBar from './components/NavBar'
import Calendar from './components/Calendar'
import ContactCardContainer from './containers/ContactCardContainer'
import { isEmpty } from 'lodash'
import toast from 'toasted-notes'
import { Image } from 'semantic-ui-react'
import 'toasted-notes/src/styles.css'
import Home from './containers/Home'
import { formatReminderToast } from './helper/functions';
import Footer from './components/Footer';

class App extends Component {

  componentDidMount(){
    this.props.testAction()
    const token = localStorage.getItem('token')

    if (token) {
      this.props.fetchingUser()
    } else {
      this.props.clearLoading()
    }
    
  }

  componentDidUpdate(){
    this.props.reminders.forEach(r => {
      if (r.match && !r.notified && !r.snoozed) {
        this.alerts(r)
        this.props.notifyReminders(r)
      }
    })
  }

  alerts = reminder => {
    return reminder.match ? toast.notify(formatReminderToast(reminder, this.props.contacts), {position: 'bottom-left', duration: null}) : null
  }

  render() {
    if (this.props.loading) {
      return (
        <div className="App">
          <NavBar />
          <div className='loading'>
            <Image
              centered src='./images/loading_screen.gif' />
          </div>
        </div>
      )
    } else {
      return (
        <div className="App">
          <NavBar />
          <main>
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

              <Route exact path='/friends' render={() => {
                return !isEmpty(this.props.user) ? <ContactCardContainer /> : <Redirect to='/login' />
              }}
              />

              <Route exact path='/home' component={Home}/>

              <Redirect from='*' to='/' />

            </Switch>
          </main>
          <Footer />
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
    notifications: state.notifications,
    contacts: state.contacts
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
