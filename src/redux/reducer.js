import { combineReducers } from 'redux'

const updateUser = (state={}, action) => {
  switch(action.type){
    case "TESTING_REDUCER":
      return state
    case "FETCHED_USER":
      return action.user
    default:
      return state
  }
}

const rootReducer = combineReducers({
  user: updateUser
})

export default rootReducer