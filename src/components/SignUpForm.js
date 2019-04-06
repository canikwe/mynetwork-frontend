import React from 'react'
import '../App.css'
import { connect } from 'react-redux'
import { addingContact } from '../redux/actions'

class SignUpForm extends React.Component {
  constructor(){
    super()
    this.state = {
      img: 'https://ayogo.com/wp-content/uploads/2015/06/jp-avatar-placeholder.png',
      bio: '',
      first_name: '',
      last_name: '',
      email: '',
      // password: '',
      // password_confirm: ''
    }
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = e => {
    e.preventDefault()

    //check password and password_confirm are identical (else throw alert)
    console.log(this.state)
    this.props.addingContact(this.state)
    this.resetState()
    //put a redirect here
  }

  resetState = () => {
    this.setState({
      img: 'https://ayogo.com/wp-content/uploads/2015/06/jp-avatar-placeholder.png',
      bio: '',
      first_name: '',
      last_name: '',
      email: '',
      // password: '',
      // password_confirm: ''
    })
  }

  render(){
    const { img, bio, first_name, last_name, email, password, password_confirm } = this.state
    return(
      <React.Fragment>
        <h2>Sign Up Here!</h2>
  
        <form onSubmit={this.handleSubmit}>
          <img className='avatar' src={ img } alt='user_avatar'/><br />
          <label htmlFor='avatar'>Avatar</label><br />
  
          <label htmlFor='bio'>Bio:</label><br />
          <textarea name='bio' rows='10' cols='30' value={ bio } onChange={this.handleChange}></textarea><br />
  
          <label htmlFor='first_name'>First Name: </label>
          <input type='text' name='first_name' value={ first_name } onChange={this.handleChange}></input><br />
  
          <label htmlFor='last_name'>Last Name: </label>
          <input type='text' name='last_name' value={ last_name } onChange={this.handleChange}></input><br />
  
          <label htmlFor='email'>Email: </label>
          <input type='text' name='email' value={ email } onChange={this.handleChange}></input><br />
  
          {/* <label htmlFor='password'>Password: </label>
          <input type='password' name='password' value={ password } onChange={this.handleChange}></input><br />
  
          <label htmlFor='password_confirm'>Password Confirmation: </label>
          <input type='password' name='password_confirm' value={ password_confirm } onChange={this.handleChange}></input><br /> */}
  
          <button type='submit'>Submit</button>
        </form>
      </React.Fragment>
    )

  }

}

const mapDispatchToProps = dispatch => {
  return {addingContact: (contact) => dispatch(addingContact(contact))}
}

export default connect(null, mapDispatchToProps)(SignUpForm)