import {
  TESTING_REDUCER, FETCHED_USER, LOADING_USER
} from './types'

const URL = () =>{
  return `http://localhost:3000/api/v1/`
}
function fetchedUser(user){
  return {type: FETCHED_USER, user}
}

function loadingUser(){
  return {type: LOADING_USER}
}

function fetchingUser(id){
  return (dispatch) => {
    dispatch(loadingUser)
    
    fetch(`${URL()}users/${id}`)
    .then(res => res.json())
    .then(user => {
      console.log(user)
  
      dispatch(fetchedUser(user))
    })
  }
}

function testAction(){
  return {type: TESTING_REDUCER}
}

export { testAction, fetchingUser }