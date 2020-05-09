import {
  TESTING_REDUCER, 
  SET_PRIORITY_FILTER,
  ADD_ENCOUNTER
} from '../types'
import { addingContact, deletingContact, updatingContact, updateSearchTerm } from './contacts_actions'
import { addingReminder, notifyReminders, updatingReminder, deletingReminder } from './reminders_actions'
import { logoutUser, updatingUser, clearError, authenticatingUser, addingUser, fetchingUser, clearLoading } from './user_actions'

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