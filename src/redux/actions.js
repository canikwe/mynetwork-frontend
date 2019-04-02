//action creators

const URL = () =>{
  return `http://localhost:3000/api/v1/users/7`
}

function fetchingUser(){
  return (dispatch) => {
    
    fetch(URL())
    .then(res => res.json())
    .then(user => {
      console.log(user)
  
      dispatch(fetchedUser(user))
    })

  }
}

function testAction(){
  return {type: "TESTING_REDUCER"}
}

function fetchedUser(user){
  return {type: "FETCHED_USER", user}
}


export { testAction, fetchedUser, fetchingUser }