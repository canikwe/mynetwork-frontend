import {
  TESTING_REDUCER, 
  FETCHED_USER, 
  LOADING_USER, 
  ADD_REMINDER, 
  ADD_CONTACT, 
  UPDATE_REMINDER, 
  DELETE_REMINDER, 
  DELETE_CONTACT, 
  UPDATING_USER, 
  UPDATE_CONTACT, 
  UPDATE_SEARCH_TERM, 
  THROW_ERROR,
  CLEAR_ERROR,
  LOGOUT_USER,
  SNOOZE_REMINDERS
} from './types'



const URL = () =>{
  return `http://localhost:3000/api/v1`
}

//Initial User Fetch, loading into state, and error handling
function fetchedUser(user){
  return {type: FETCHED_USER, user}
}

function loadingUser(){
  return {type: LOADING_USER}
}

const displayError = (errors) => {
  return {type: THROW_ERROR, errors}
}

function fetchingUser(token){
  return (dispatch) => {
    dispatch(loadingUser)
    
    fetch(`${URL()}/profile`, {
      headers: {
        'Authentication': `Bearer ${token}`
      }
    })
    .then(res => res.json())
    .then(user => {
      console.log(user)
      dispatch(fetchedUser(user))
    })
  }
}

const addingUser = user => {
  return (dispatch) => {
    dispatch(loadingUser)

    fetch(`${URL()}/users`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(user)
    })
    .then(res => res.json())
    .then(data => {
      console.log(data)
      if (data.authenticated) {
        dispatch(fetchedUser(data.user))
        localStorage.setItem('token', data.token)
      } else {
        console.log(data.message)
        dispatch(displayError(data))
      }
    })
  }
}


const authenticatingUser = params => {
  return (dispatch) => {
    dispatch(loadingUser)

    fetch(`http://localhost:3000/api/v1/login`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(params)
    })
    .then(res => res.json())
    .then(data => {
      console.log(data)
      if (data.authenticated) {
        dispatch(fetchedUser(data.user))
        localStorage.setItem('token', data.token)
      } else {
        console.log(data)
        dispatch(displayError(data.message))
      }
    })
    .catch((error) => {
      dispatch(displayError(error))
      throw error
    })
  }
}

const clearError = () => {
  return {type: CLEAR_ERROR}
}

const updateUser = user => {
  return {type: UPDATING_USER, user: user}
}

const updatingUser = user => {
  return dispatch => {
    fetch(`${URL()}/users/${user.id}`, {
      method: 'PATCH',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(user)
    })
    .then(res => res.json())
    .then(user => {
      console.log(user)
      dispatch(updateUser(user))
    })
  }
}

const logoutUser = () => {
  return {type: LOGOUT_USER}
}

//Contacts Actions
const addContact = (newContactObj) => {
  return {type: ADD_CONTACT, contact: newContactObj}
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

const updateContact = contact => {
  return {type: UPDATE_CONTACT, contact: contact}
}

const updatingContact = (id, contact) => {
  // debugger
  return (dispatch) => {
    fetch(`${URL()}/contacts/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(contact)
    })
    .then(res => res.json())
    .then(updatedContact => dispatch(updateContact(updatedContact)))
  }
}

const deleteContact = contact => {
  return {type: DELETE_CONTACT, contact: contact}
}

const deletingContact = contact => {
  return dispatch => {
    fetch(`${URL()}/contacts/${contact.id}`, {
      method: 'DELETE'
    })
    .then(res => res.json())
    .then(contactObj => {
      console.log(contactObj)
      dispatch(deleteContact(contactObj))
    })
  }
}

//Reminders Actions
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

const snoozeReminders = () => {
  return {type: SNOOZE_REMINDERS}
}

const addReminder = (newReminderObj) => {
  return {type: ADD_REMINDER, reminder: newReminderObj}
}

const updateReminder = (reminderObj) => {
  return {type: UPDATE_REMINDER, reminder: reminderObj}
}

const updatingReminder = reminder => {
  return (dispatch) => {
    fetch(`${URL()}/reminders/${reminder.id}`, {
      method: 'PATCH',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(reminder)
    })
    .then(res => res.json())
    .then(reminderObj => {
      console.log(reminderObj)
      dispatch(updateReminder(reminderObj))
    })
  }
}

const deleteReminder = reminderObj => {
  return {type: DELETE_REMINDER, reminder: reminderObj}
}

const deletingReminder = reminder => {
  return (dispatch) => {
    fetch(`${URL()}/reminders/${reminder.id}`, {
      method: "DELETE"
    })
    .then(res => res.json())
    .then(reminderObj => {
      console.log(reminderObj)
      dispatch(deleteReminder(reminderObj))
    })
  }
}

const updateSearchTerm = searchTerm => {
  return { type: UPDATE_SEARCH_TERM, searchTerm }
}

function testAction(){
  return {type: TESTING_REDUCER}
}

export {
  testAction,
  fetchingUser,
  addingReminder,
  addingContact,
  updatingReminder,
  deletingReminder,
  deletingContact,
  updatingUser,
  updatingContact,
  authenticatingUser,
  updateSearchTerm,
  clearError,
  logoutUser,
  snoozeReminders,
  addingUser
}