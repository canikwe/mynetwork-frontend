import React from 'react'
import { connect } from 'react-redux'
import { authenticatingUser } from '../redux/actions'
import { Link } from 'react-router-dom'
import { Segment, Button, Divider, Grid } from 'semantic-ui-react'
import { isEmpty } from 'lodash'

class Login extends React.Component {
  constructor(){
    super()
    this.state = {
      username: '',
      password: ''
    }
  }
  handleSubmit = event => {
    event.preventDefault()

    if (this.state.username === ''){
      alert('Username must be filled out')
    } else if (this.state.password === ''){
      alert('Password must be filled out')
    } else{
      this.props.authenticatingUser({user: this.state})
      this.resetForm()
    }
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  resetForm = () => {
    this.setState({
      username: '',
      password: ''
    })
  }

  render() {
    return (
      <div className='wrapper'>
        <h1>myNetwork</h1>
        <Segment>
          <Grid columns={2} relaxed='very' stackable>
            <Grid.Column>
              <form className='ui form' onSubmit={this.handleSubmit}>
                <div className='required field'>
                  <label htmlFor='username'>Username: </label>
                  <input type='text' name='username' onChange={this.handleChange} value={this.state.username}></input>
                </div>

                <div className='required field'>
                  <label htmlFor='password'>Password: </label>
                  <input type='password' name='password' onChange={this.handleChange} value={this.state.password}></input><br />
                </div>
                <button className='ui button primary' type='submit'>Submit</button>
              </form>
            </Grid.Column>
            <Grid.Column verticalAlign='middle'>
              <Button content='Sign Up' as={ Link } to='/signup' icon='signup' size='big'/>
            </Grid.Column>
          </Grid>
          <Divider vertical>Or</Divider>
        </Segment>
        
        {!isEmpty(this.props.error) ? alert(this.props.error.message) : null}
        
      </div>
    )
  }

}

const mapStateToProps = state => {
  return {error: state.error}
}

const mapDispatchToProps = dispatch => {
  return { 
    // loadingUser: (user) => dispatch(loadingUser(user)),
    authenticatingUser: (params) => dispatch(authenticatingUser(params)) 
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)