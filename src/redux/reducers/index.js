import moment from 'moment'
// eslint-disable-next-line
import recur from 'moment-recur'
import { combineReducers } from 'redux'
import { remindersReducer, recurringRemindersReducer, calendarFilterReducer } from './reminders'
import {
  TESTING_REDUCER,
  FETCHED_USER,
  LOADING_USER,
  UPDATING_USER,
  ADD_CONTACT,
  DELETE_CONTACT,
  UPDATE_CONTACT,
  UPDATE_SEARCH_TERM,
  THROW_ERROR,
  CLEAR_ERROR,
  LOGOUT_USER,
  CLEAR_LOADING,
} from '../types'



const reduxConnection = (state='connected', action) => {
  switch (action.type){
    case TESTING_REDUCER:
      return state
  default:
    return state
  }
}

const userReducer = (state={}, action) => {
  switch(action.type){
    case FETCHED_USER:
      return action.payload.user
    case UPDATING_USER:
      return action.user.user
    case LOGOUT_USER:
      return {}
    default:
      return state
  }
}

const contactsReducer = (state=[], action) => {
  
  switch(action.type){
    case FETCHED_USER:
      return action.payload.contacts
    case ADD_CONTACT:
      return [...state, action.contact]
    case UPDATE_CONTACT:
      return state.map(c => c.id === action.contact.id ? action.contact : c)
    case DELETE_CONTACT:
      return state.filter(c => c.id !== action.contact.id)
    case LOGOUT_USER:
      return []
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
    case CLEAR_LOADING:
      return false
    default:
      return state
  }
}

const searchTermReducer = (state = '', action) => {
  switch(action.type){
    case UPDATE_SEARCH_TERM:
      return action.searchTerm
    case LOGOUT_USER:
      return ''
    default:
      return state
  }
}

const notificationReducer = (state=[], action) => {
  switch(action.type) {
    case THROW_ERROR:
      console.log(action.errors)
      return action.errors
    case UPDATING_USER:
      return {message: [action.user.message]}
    case CLEAR_ERROR:
      return []
    default: return state
  }
}

const rootReducer = combineReducers({
  reduxConnection: reduxConnection,
  user: userReducer,
  contacts: contactsReducer,
  reminders: remindersReducer,
  loading: loadingReducer,
  searchTerm: searchTermReducer,
  notifications: notificationReducer,
  recurringReminders: recurringRemindersReducer,
  calendarFilter: calendarFilterReducer
})

export default rootReducer