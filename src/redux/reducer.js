import { combineReducers } from 'redux'

const updateUser = (state={}, action) => {
  switch(action.type){
    case "TESTING_REDUCER":
      return state
    default:
      return state
  }
}

const rootReducer = combineReducers({
  user: updateUser
})

export default rootReducer