import { combineReducers } from 'redux'
import {
  TESTING_REDUCER,
  FETCHED_USER,
  LOADING_USER,
  UPDATING_USER,
  ADD_REMINDER,
  ADD_CONTACT,
  UPDATE_REMINDER,
  DELETE_REMINDER,
  DELETE_CONTACT,
  UPDATE_CONTACT,
  UPDATE_SEARCH_TERM,
  THROW_ERROR
} from './types'

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
      return action.user
    case UPDATING_USER:
      return action.user
    default:
      return state
  }
}

const remindersReducer = (state=[], action) => {
  
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

const contactsReducer = (state=[], action) => {
  
  switch(action.type){
    case FETCHED_USER:
      return action.user.contacts
    case ADD_CONTACT:
      return [...state, action.contact]
    case UPDATE_CONTACT:
    // debugger
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

const searchTermReducer = (state = '', action) => {
  switch(action.type){
    case UPDATE_SEARCH_TERM:
      return action.searchTerm
    default:
      return state
  }
}

const errorsReducer = (state= {}, action) => {
  switch(action.type) {
    case THROW_ERROR:
      return action.error
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
  error: errorsReducer
})

export default rootReducer