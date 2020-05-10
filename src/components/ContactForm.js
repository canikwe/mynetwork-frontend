import React from 'react'
import { connect } from 'react-redux'
import { addingContact, updatingContact } from '../redux/actions'
import { Segment, Button, Grid, Dropdown } from 'semantic-ui-react'
import toast from 'toasted-notes'
import 'toasted-notes/src/styles.css';

class ContactForm extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      id: this.props.contact ? this.props.contact.id : '',
      first_name: this.props.contact ? this.props.contact.first_name : '',
      last_name: this.props.contact ? this.props.contact.last_name : '',
      kind: this.props.contact ? this.props.contact.kind : '',
      details: this.props.contact ? this.props.contact.details : '',
      avatar: this.props.contact ? this.props.contact.avatar : 'https://ayogo.com/wp-content/uploads/2015/06/jp-avatar-placeholder.png'
    }
  }

  handleChange = e => this.setState({[e.target.name]: e.target.value})
  handleKindChange = (e, { value }) => this.setState({kind: value})


  submitForm = () => {
    // e.preventDefault()
    // console.log(this.props)

    if (this.state.first_name === '') {
      toast.notify('A girl has no name, but a contact must.', {duration: null})

    } else if (this.props.contact) {
        const updatedContact = {
          contact: { 
            id: this.state.id,
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            kind: this.state.kind,
            details: this.state.details,
            user_id: this.props.id
          }
        }
        this.props.updatingContact(this.state.id, updatedContact)
        this.props.handleClose('editContactModal')
      } else {
      const newContact = {
        contact: {
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            avatar: this.state.avatar,
            user_id: this.props.id,
            kind: this.state.kind,
            details: this.state.details
          }
        }
      this.props.addingContact(newContact)
      this.props.handleClose()
      }
  }

  kindDropdown = () => {
    return ([
      {key: 'family', text: 'Family', value: 'Family'},
      {key: 'friend', text:'Friend', value: 'Friend'},
      {key: 'colleague', text: 'Colleague', value: 'Colleague'},
      {key: 'acquaintance', text: 'Acquaintance', value:'Acquaintance'}
    ])
  }

  render(){
    // console.log(this.state)
    return (
      // <Segment padded>
        <Grid padded columns={2}>
          <Grid.Row>
            {this.props.contact ? <h3>Edit {this.props.contact.name}</h3> : <h3>Add a new Contact!</h3> }
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <div className='ui form'>
                <img className='ui small image' src={ this.state.avatar } alt='user_avatar'/><br />
                <input type='text' value={this.state.avatar} name='avatar' onChange={this.handleChange}></input><br />


              </div>
            </Grid.Column>
            <Grid.Column>
              <div className='ui form' >
                <label htmlFor="first_name">First Name:</label>
                <input type='text' value={this.state.first_name} name='first_name' onChange={this.handleChange}></input><p />
                <label htmlFor='last_name'>Last Name:</label>
                <input type='text' value={this.state.last_name} name='last_name' onChange={this.handleChange}></input><p />
                <label htmlFor="avatar">Type:</label>
                <Dropdown
                  name='kind'
                  placeholder="Select and option"
                  options={this.kindDropdown()}
                  onChange={this.handleKindChange}
                  value={this.state.kind}
                  selection
                /><p />

                <label htmlFor="first_name">Details: </label>
                <textarea name='details' rows='3' value={ this.state.details } onChange={this.handleChange}></textarea><p />
              <Button onClick={this.submitForm}>Submit</Button>
            </div>

          </Grid.Column>
        </Grid.Row>
        </Grid>
      // </Segment>
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