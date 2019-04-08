import React from 'react'
import { connect } from 'react-redux'
import { authenticatingUser } from '../redux/actions'
import { Link } from 'react-router-dom'

class Login extends React.Component {
  constructor(){
    super()
    this.state = {
      username: '',
      password: ''
    }
  }
  handleClick = event => {
    event.preventDefault()
    console.log('attempting to log in with no credentials')
    this.props.authenticatingUser({user: this.state})
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  render() {
    return (
      <div>
        <h1>Login Page</h1>
        <form onSubmit={this.handleClick}>
          <label htmlFor='username'>Username: </label>
          <input type='text' name='username' onChange={this.handleChange} value={this.state.username}></input>

          <label htmlFor='password'>Password: </label>
          <input type='text' name='password' onChange={this.handleChange} value={this.state.password}></input><br />

          <button type='submit'>Submit</button>
        </form>

      <Link to='/' >Homepage</Link>
      </div>
    )
  }

}

const mapDispatchToProps = dispatch => {
  return { 
    // loadingUser: (user) => dispatch(loadingUser(user)),
    authenticatingUser: (params) => dispatch(authenticatingUser(params)) 
  }
}

export default connect(null, mapDispatchToProps)(Login)