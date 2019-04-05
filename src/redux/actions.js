import {
  TESTING_REDUCER, FETCHED_USER, LOADING_USER, ADD_REMINDER, ADD_CONTACT
} from './types'

const URL = () =>{
  return `http://localhost:3000/api/v1`
}
function fetchedUser(user){
  return {type: FETCHED_USER, user}
}

function loadingUser(){
  return {type: LOADING_USER}
}

function fetchingUser(id){
  return (dispatch) => {
    dispatch(loadingUser)
    
    fetch(`${URL()}/users/${id}`)
    .then(res => res.json())
    .then(user => {
      console.log(user)
  
      dispatch(fetchedUser(user))
    })
  }
}

function addingReminder(newReminderData) {
  return (dispatch) => {
    
    fetch(`${URL()}/reminders`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(newReminderData)
    })
    .then(res => res.json())
    .then(newReminderObject => dispatch(addReminder(newReminderObject)))
  }
}

const addReminder = (newReminderObj) => {
  return {type: ADD_REMINDER, reminder: newReminderObj}
}

const addingContact = (contact) => {
  return (dispatch) => {
    fetch(`${URL()}/users`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(contact)
    })
    .then(res => res.json())
    .then(newContactObj => dispatch(addContact(newContactObj)))
  }
}

const addContact = (newContactObj) => {
  return {type: ADD_CONTACT, contact: newContactObj}
}

function testAction(){
  return {type: TESTING_REDUCER}
}

export { testAction, fetchingUser, addingReminder, addingContact }