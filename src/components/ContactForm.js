import React from 'react'
import { connect } from 'react-redux'
import { addingContact, updatingContact } from '../redux/actions'
import { Link } from 'react-router-dom'
import { Segment, Button } from 'semantic-ui-react'

class ContactForm extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      id: this.props.contact ? this.props.contact.id : '',
      first_name: this.props.contact ? this.props.contact.first_name : '',
      last_name: this.props.contact ? this.props.contact.last_name : ''
    }
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  submitForm = (e) => {
    e.preventDefault()
    // console.log(this.props)

    if (this.state.first_name === '') {
      alert('A girl has no name, but a contact must.')
    } else if (this.props.contact) {
      const updatedContact = {contact_info: {id: this.state.id}, requested_attributes: {...this.state, id: this.props.contact.friend_id}}

      this.props.updatingContact(this.state.id, updatedContact)
      this.props.handleClose('editContactModal')
      } else {
      const newContact = {...this.state, requestor_id: this.props.id}

      this.props.addingContact(newContact)
      this.props.handleClose()
    }
  }

  render(){
    // console.log(this.state)
    return (
      <Segment padded>
        {this.props.contact ? <h3>Edit {this.props.contact.name}</h3> : <h3>Add a new Contact!</h3> }
  
        <form className='ui form' onSubmit={this.submitForm}>
          <label htmlFor="first_name">First Name:</label>
          <input type='text' value={this.state.first_name} name='first_name' onChange={this.handleChange}></input><br />
          <label htmlFor='last_name'>Last Name:</label>
          <input type='text' value={this.state.last_name} name='last_name' onChange={this.handleChange}></input><br />
          <Button>Submit</Button>

        </form>

        <Link to='/' onClick={() => this.props.handleClose('editContactModal')}>BACH TO BUSINESS</Link>

      </Segment>
    )

  }
}

const mapStateToProps = state => {
  return {id: state.user.id}
}

const mapDispatchToProps = dispatch => {
  return {
    addingContact: (contact) => dispatch(addingContact(contact)),
    updatingContact: (id, contact) => dispatch(updatingContact(id, contact))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ContactForm)