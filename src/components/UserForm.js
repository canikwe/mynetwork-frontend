import React from 'react'
import { connect } from 'react-redux'
import { addingContact, updatingUser } from '../redux/actions'
import { Segment, Grid, Button } from 'semantic-ui-react'

class UserForm extends React.Component {
  constructor(){
    super()
    this.state = {
      id: '',
      avatar: 'https://ayogo.com/wp-content/uploads/2015/06/jp-avatar-placeholder.png',
      bio: '',
      first_name: '',
      last_name: '',
      email: '',
      username: '',
      password: '',
      // password_confirm: ''
    }
  }

  componentDidMount() {
    if (this.props.user.id) {
      const { id, avatar, bio, first_name, last_name, email, username } = this.props.user
      this.setState({ id, avatar, bio, first_name, last_name, email, username })
    }
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = () => {
    // debugger
    //check password and password_confirm are identical (else throw alert)
    if (this.state.first_name === '' ||
        this.state.last_name === '' ||
        this.state.username === '' ||
        this.state.email === '' ||
        this.state.avatar === '') {
          alert('Please fill out all required fields')
        } else {
          this.props.user.id ? this.props.updatingUser(this.state) : this.props.addingContact(this.state)
          this.resetState()
          //put a redirect here
        }

  }

  resetState = () => {
    this.setState({
      avatar: 'https://ayogo.com/wp-content/uploads/2015/06/jp-avatar-placeholder.png',
      bio: '',
      first_name: '',
      last_name: '',
      email: '',
      username: '',
      password: '',
      // password_confirm: ''
    })
  }

  render(){
    const { avatar, bio, first_name, last_name, email, username, password, password_confirm } = this.state
    return(
      <Segment raised>
        <Grid columns={2}>
        <Grid.Column>


          <div className="ui form">
            <img className='ui small image' src={ avatar } alt='user_avatar'/><br />
            <label htmlFor='avatar'>Avatar: </label><br />
            <input type='text' name='avatar' value={ avatar } onChange={this.handleChange}></input><br />

          
              <label htmlFor='bio'>Bio:</label><br />
              <textarea name='bio' rows='6' value={ bio } onChange={this.handleChange}></textarea>
            </div>
          </Grid.Column>

          <Grid.Column>

          <div className='ui form'>
          <label htmlFor='first_name'>First Name: </label>
          <input type='text' name='first_name' value={ first_name } onChange={this.handleChange}></input><br />
  
          <label htmlFor='last_name'>Last Name: </label>
          <input type='text' name='last_name' value={ last_name } onChange={this.handleChange}></input><br />
  
          <label htmlFor='username'>Username: </label>
          <input type='text' name='username' value={ username } onChange={this.handleChange}></input><br />
          
          <label htmlFor='email'>Email: </label>
          <input type='text' name='email' value={ email } onChange={this.handleChange}></input><br />

  
          <label htmlFor='password'>Password: </label>
          <input type='password' name='password' value={ password } onChange={this.handleChange}></input><br />
          
          <label htmlFor='password_confirm'>Password Confirmation: </label>
          <input type='password' name='password_confirm' value={ password_confirm } onChange={this.handleChange}></input><br />
  
          <Button onClick={this.handleSubmit} >Submit</Button>
          </div>
        </Grid.Column>
        </Grid>

      </Segment>
    )

  }

}

const mapStateToProps = state => {
  return {user: state.user}
}

const mapDispatchToProps = dispatch => {
  return {
    addingContact: (contact) => dispatch(addingContact(contact)),
    updatingUser: (user) => dispatch(updatingUser(user))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserForm)