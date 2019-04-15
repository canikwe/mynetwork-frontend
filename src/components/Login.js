import React from 'react'
import { connect } from 'react-redux'
import { authenticatingUser, clearError } from '../redux/actions'
import { Link } from 'react-router-dom'
import { Segment, Button, Divider, Grid } from 'semantic-ui-react'
import { isEmpty } from 'lodash'
import toaster from 'toasted-notes';
import 'toasted-notes/src/styles.css';

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
      toaster.notify('Username must be filled out', {duration: null})
    } else if (this.state.password === ''){
      toaster.notify('Password must be filled out', {duration: null})
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

  displayAlert = () => {
    if (!isEmpty(this.props.error)) {
      toaster.notify(this.props.error, {duration: null})
      this.props.clearError()
    }
  }

  resetForm = () => {
    this.setState({
      username: '',
      password: ''
    })
  }

  render() {
    return (
      <div className='wrapper' >
      <Grid centered textAlign='left'>
        <Grid.Row>
          <h1>myNetwork</h1>
        </Grid.Row>
        <Grid.Row>
          <Segment >
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
              <Grid.Column textAlign='center' verticalAlign='middle'>
                <Button content='Sign Up' as={ Link } to='/signup' icon='signup' size='big'/>
              </Grid.Column>
            </Grid>
            <Divider vertical>Or</Divider>
          </Segment>
        </Grid.Row>
      </Grid>
        {this.displayAlert()}
        
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
    authenticatingUser: (params) => dispatch(authenticatingUser(params)),
    clearError: () => dispatch(clearError())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)