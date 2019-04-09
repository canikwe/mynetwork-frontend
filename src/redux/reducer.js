import { combineReducers } from 'redux'
import {
  TESTING_REDUCER,
  FETCHED_USER,
  LOADING_USER,
  ADD_REMINDER,
  ADD_CONTACT,
  UPDATE_REMINDER,
  DELETE_REMINDER,
  DELETE_CONTACT,
  UPDATE_CONTACT,
  UPDATE_SEARCH_TERM
} from './types'

const reduxConnection = (state='connected', action) => {
  switch (action.type){
    case TESTING_REDUCER:
      return state
  default:
    return state
  }
}

const updateUser = (state={}, action) => {
  switch(action.type){
    case FETCHED_USER:
      return action.user
    default:
      return state
  }
}

const updateReminders = (state=[], action) => {
  
  switch(action.type){
    case FETCHED_USER:
      return action.user.reminders
    case ADD_REMINDER:
      return [...state, action.reminder]
    case UPDATE_REMINDER:
      return state.map(r => r.id === action.reminder.id ? action.reminder : r)
    case DELETE_REMINDER:
      return state.filter(r => r.id !== action.reminder.id)
    case DELETE_CONTACT:
      return state.filter(r => r.contact_id !== action.contact.id)
    default:
      return state
  }
}

const updateContacts = (state=[], action) => {
  
  switch(action.type){
    case FETCHED_USER:
      return action.user.contacts
    case ADD_CONTACT:
      return [...state, action.contact]
    case UPDATE_CONTACT:
      return state.map(c => c.id === action.contact.id ? action.contact : c)
    case DELETE_CONTACT:
      return state.filter(c => c.id !== action.contact.id)
    default:
      return state
  }
}

const loadingReducer = (state = true, action) => {
  switch(action.type){
    case LOADING_USER:
      return true
    case FETCHED_USER:
      return false
    default:
      return state
  }
}

const updateSearchTerm = (state = '', action) => {
  switch(action.type){
    case UPDATE_SEARCH_TERM:
      return action.searchTerm
    default:
      return state
  }
}

const rootReducer = combineReducers({
  reduxConnection: reduxConnection,
  user: updateUser,
  contacts: updateContacts,
  reminders: updateReminders,
  loading: loadingReducer,
  searchTerm: updateSearchTerm
})

export default rootReducer