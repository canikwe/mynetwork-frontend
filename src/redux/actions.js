//action creators

function testAction(){
  return {type: "TESTING_REDUCER"}
}

function fetchingUser(){
  return (dispatch) => {
    dispatch(loading)
  }
}

export { testAction }