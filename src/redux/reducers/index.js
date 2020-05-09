// eslint-disable-next-line
import { combineReducers } from 'redux'
import { remindersReducer, recurringRemindersReducer, calendarFilterReducer } from './reminders'
import { contactsReducer, searchTermReducer } from './contacts'
import { userReducer, loadingReducer, notificationReducer } from './users'
import { TESTING_REDUCER } from '../types'



const reduxConnection = (state='connected', action) => {
  switch (action.type){
    case TESTING_REDUCER:
      return state
  default:
    return state
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