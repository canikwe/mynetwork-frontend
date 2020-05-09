import {
  TESTING_REDUCER, 
  FETCHED_USER, 
  LOADING_USER, 
  UPDATING_USER, 
  THROW_ERROR,
  CLEAR_ERROR,
  LOGOUT_USER,
  CLEAR_LOADING,
  SET_PRIORITY_FILTER,
  ADD_ENCOUNTER
} from '../types'
import { addingContact, deletingContact, updatingContact, updateSearchTerm } from './contacts_actions'
import { addingReminder, notifyReminders, updatingReminder, deletingReminder } from './reminders_actions'

const URL = () =>{
  return `http://localhost:3000/api/v1`
}

const headers = () => {
  const token = localStorage.getItem('token')
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  }
}

//Initial User Fetch, loading into state, and error handling
function fetchedUser(payload){
  return {type: FETCHED_USER, payload}
}

function loadingUser(){
  return {type: LOADING_USER}
}

const clearLoading = () => {
  return {type: CLEAR_LOADING}
}

const displayError = (errors) => {
  return {type: THROW_ERROR, errors}
}

function fetchingUser(token){
  return (dispatch) => {
    dispatch(loadingUser)
    
    fetch(`${URL()}/profile`, {
      headers: headers()
    })
    .then(res => res.json())
    .then(data => {
      if (data.user.id !== undefined) {
        console.log(data.user)
        dispatch(fetchedUser(data))
      } else {
        dispatch(clearLoading())
      }
    })
  }
}

const addingUser = user => {
  return (dispatch) => {
    dispatch(loadingUser)

    fetch(`${URL()}/users`, {
      method: 'POST',
      // headers: {'Content-Type': 'application/json'},
      body: user
    })
    .then(res => res.json())
    .then(data => {
      console.log(data)
      if (data.authenticated) {
        dispatch(fetchedUser(data))
        localStorage.setItem('token', data.token)
      } else {
        console.log(data.message)
        dispatch(displayError(data))
        dispatch(clearLoading())
      }
    })
  }
}


const authenticatingUser = params => {
  return (dispatch) => {
    dispatch(loadingUser)

    fetch(`http://localhost:3000/api/v1/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(params)
    })
    .then(res => res.json())
    .then(data => {
      console.log(data)
      if (data.authenticated) {
        dispatch(fetchedUser(data))
        localStorage.setItem('token', data.token)
      } else {
        console.log(data)
        dispatch(displayError(data.message))
        dispatch(clearLoading())
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

const updatingUser = (user, id) => {  
  return dispatch => {
    fetch(`${URL()}/users/${id}`, {
      method: 'PATCH',
      headers: headers(),
      body: user
    })
    .then(res => res.json())
    .then(data => {
      console.log(data)
      dispatch(updateUser(data))
    })
  }
}

const logoutUser = () => {
  return {type: LOGOUT_USER}
}

const addingEncounter = encounter => {
  return (dispatch) => {
    fetch(`${URL()}/encounters`, {
      method: 'POST',
      headers: headers(),
      body: JSON.stringify({ encounter })
    })
    .then(res => res.json())
    .then(console.log)
  }
}

const filterCalendar = term => {
  return { type: SET_PRIORITY_FILTER, term}
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
  notifyReminders,
  addingUser,
  clearLoading,
  filterCalendar,
  addingEncounter
}