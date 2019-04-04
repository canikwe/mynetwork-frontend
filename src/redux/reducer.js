import { combineReducers } from 'redux'
import {
  TESTING_REDUCER,
  FETCHED_USER,
  LOADING_USER,
  ADD_REMINDER
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

const rootReducer = combineReducers({
  reduxConnection: reduxConnection,
  user: updateUser,
  reminders: updateReminders,
  loading: loadingReducer
})

export default rootReducer