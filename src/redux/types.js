export const URL = () => {
  return `http://localhost:3000/api/v1`
}

export const authHeaders = () => {
  const token = localStorage.getItem('token')
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  }
}

export const FETCHED_USER = 'FETCHED_USER'

export const TESTING_REDUCER = 'TESTING_REDUCER'

export const LOADING_USER = 'LOADING_USER'

export const UPDATING_USER = 'UPDATING_USER'

export const ADD_CONTACT = 'ADD_CONTACT'

export const UPDATE_CONTACT = 'UPDATE_CONTACT'

export const DELETE_CONTACT = 'DELETE_CONTACT'

export const ADD_REMINDER = 'ADD_REMINDER'

export const NOTIFY_REMINDERS = 'NOTIFY_REMINDERS'

export const UPDATE_REMINDER = 'UPDATE_REMINDER'

export const DELETE_REMINDER = 'DELETE_REMINDER'

export const UPDATE_SEARCH_TERM = 'UPDATE_SEARCH_TERM'

export const THROW_ERROR = 'THROW_ERROR'

export const CREATE_RECURRENCE = 'CREATE_RECURRENCE'

export const CLEAR_ERROR = 'CLEAR_ERROR'

export const LOGOUT_USER = 'LOGOUT_USER'

export const CLEAR_LOADING = 'CLEAR_LOADING'

export const SET_PRIORITY_FILTER = 'SET_PRIORITY_FILTER'

export const CREATE_ENCOUNTER = 'CREATE_ENCOUNTER'

export const DELETE_ENCOUNTER = 'DELETE_ENCOUNTER'

export const SET_FEATURED_REMINDER = 'SET_FEATURED_REMINDE'
