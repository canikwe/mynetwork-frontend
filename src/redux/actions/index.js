import { TESTING_REDUCER } from '../types'
import { addingContact, deletingContact, updatingContact, updateSearchTerm } from './contacts_actions'
import { addingReminder, notifyReminders, updatingReminder, deletingReminder, filterCalendar } from './reminders_actions'
import { logoutUser, updatingUser, clearError, authenticatingUser, addingUser, fetchingUser, clearLoading } from './user_actions'
import { creatingEncounter } from './encountersActions'

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