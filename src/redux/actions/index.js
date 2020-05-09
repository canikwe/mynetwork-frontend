import { TESTING_REDUCER } from '../types'
import { addingContact, deletingContact, updatingContact, updateSearchTerm } from './contacts'
import { addingReminder, notifyReminders, updatingReminder, deletingReminder, filterCalendar } from './reminders'
import { logoutUser, updatingUser, clearError, authenticatingUser, addingUser, fetchingUser, clearLoading } from './users'
import { creatingEncounter } from './encounters'

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
  creatingEncounter
}