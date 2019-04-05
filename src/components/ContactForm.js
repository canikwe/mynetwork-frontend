import React from 'react'
import { connect } from 'react-redux'
import { addingContact } from '../redux/actions'
import { Link } from 'react-router-dom'

class ContactForm extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      first_name: '',
      last_name: ''
    }
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  submitForm = (e) => {
    e.preventDefault()
    const newContact = {...this.state, requestor_id: this.props.id}
    
    this.props.addingContact(newContact)
    this.setState({
      first_name: '',
      last_name: ''
    })
  }

  render(){
    console.log(this.props)
    return (
      <div className='new-reminder'>
        <h3>Add a new Contact!</h3>
  
        <form onSubmit={this.submitForm}>
          <label htmlFor="first_name">First Name:</label>
          <input type='text' value={this.state.first_name} name='first_name' onChange={this.handleChange}></input><br />
          <label htmlFor='last_name'>Last Name:</label>
          <input type='text' value={this.state.last_name} name='last_name' onChange={this.handleChange}></input><br />
          <button>Submit</button>

        </form>

        <Link to='/'>BACH TO BUSINESS</Link>

      </div>
    )

  }
}

const mapStateToProps = state => {
  return {id: state.user.id}
}

const mapDispatchToProps = dispatch => {
  return {addingContact: (contact) => dispatch(addingContact(contact))}
}

export default connect(mapStateToProps, mapDispatchToProps)(ContactForm)