import moment from 'moment'
// eslint-disable-next-line
import {
  FETCHED_USER,
  ADD_REMINDER,
  UPDATE_REMINDER,
  DELETE_REMINDER,
  DELETE_CONTACT,
  LOGOUT_USER,
  NOTIFY_REMINDERS,
  SET_PRIORITY_FILTER
} from '../types'

const getRecurringEvents = reminder => {

  let recurrence = {}
  const start = moment(reminder.start_date)
  const end = moment(reminder.end_date)
  // debugger
  switch (reminder.period) {
    case 'daily':
      recurrence = start.recur(end).every(reminder.interval).day()

      // console.log(recurrence.all('L'))
      return recurrence.all("L").map(r => { return { ...reminder, start: new Date(r), all_day: true } })

    case 'weekly':
      recurrence = start.recur(end).every(reminder.interval).weeks()

      // console.log(recurrence.all('L'))
      return recurrence.all("L").map(r => { return { ...reminder, start: new Date(r), all_day: true } })
    case 'monthly':
      recurrence = start.recur(end).every(reminder.interval).months()

      // console.log(recurrence.all('L'))
      return recurrence.all("L").map(r => { return { ...reminder, start: new Date(r), all_day: true } })

    case 'yearly':
      recurrence = start.recur(end).every(reminder.interval).years()

      // console.log(recurrence.all('L'))
      return recurrence.all("L").map(r => { return { ...reminder, start: new Date(r), all_day: true } })

    default:
      return [recurrence]
  }
}


const remindersReducer = (state = [], action) => {

  switch (action.type) {
    case FETCHED_USER:
      return action.payload.reminders
    case ADD_REMINDER:
      return [...state, action.reminder]
    case UPDATE_REMINDER:
      return state.map(r => r.id === action.reminder.id ? action.reminder : r)
    case NOTIFY_REMINDERS:
      return state.map(r => r.id === action.reminder.id ? { ...r, notified: true } : r)
    case DELETE_REMINDER:
      return state.filter(r => r.id !== action.reminder.id)
    case DELETE_CONTACT:
      return state.filter(r => r.contact_id !== action.contact.id)
    case LOGOUT_USER:
      return []
    default:
      return state
  }
}


const recurringRemindersReducer = (state = [], action) => {
  switch (action.type) {
    case FETCHED_USER:
      const rec = []
      action.payload.reminders.forEach(r => {
        rec.push(...getRecurringEvents(r))
      })
      return rec
    case ADD_REMINDER:
      return [...state, ...getRecurringEvents(action.reminder)]
    case UPDATE_REMINDER:
      return [...state.filter(r => r.id !== action.reminder.id), ...getRecurringEvents(action.reminder)]
    case DELETE_REMINDER:
      return state.filter(r => r.id !== action.reminder.id)
    case DELETE_CONTACT:
      return state.filter(r => r.contact_id !== action.contact.id)
    case LOGOUT_USER:
      return []
    default: return state
  }
}

const calendarFilterReducer = (state = '', action) => {
  switch (action.type) {
    case SET_PRIORITY_FILTER:
      return action.term
    default:
      return state
  }
}

export { remindersReducer, recurringRemindersReducer, calendarFilterReducer }