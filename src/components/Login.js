import React from 'react'
// import { withRouter, Link } from 'react-router-dom'

class Login extends React.Component {
  constructor(){
    super()
    this.state = {
      // username:
    }
  }
  handleClick = event => {
    event.preventDefault()
    console.log('attempting to log in with no credentials')
  }

  render() {
    return (
      <div>
        <h1>Login Page</h1>
        <form onSubmit={this.handleClick}>
          <label htmlFor='username'>Username: </label>
          <input type='text' name='username'></input>
          <label htmlFor='password'>Password: </label>
          <input type='text'></input><br />
          <button type='submit'>Submit</button>
        </form>
      </div>
    )
  }

}

export default Login