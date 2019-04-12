import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Menu, Dropdown, Modal, Button } from 'semantic-ui-react'
import ContactForm from './ContactForm'

class NavBar extends Component {
  state = { activeItem: 'home', modalOpen: false }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  handleOpen = () => this.setState({modalOpen: true})

  handleClose = () => this.setState({modalOpen: false})

  newContactForm = () => {
    //edit modal goes here
    return (
      <Modal
        open={this.state.modalOpen}
        onClose={this.handleClose} 
      >
        <ContactForm handleClose={this.handleClose}/>
      </Modal>
    )
  }

  render() {
    const { activeItem } = this.state

    return (
      <div>
        <Menu pointing secondary>
          <Menu.Item 
            name='home' 
            active={activeItem === 'home'} 
            onClick={this.handleItemClick} 
            as={ Link } to='/'
          />

          <Menu.Menu position='right'>
          <Button.Group color='teal'>
          <Button>{this.props.user.name}</Button>
            <Dropdown
              as={Button}
              pointing='top right'              
            >
              <Dropdown.Menu>
                <Dropdown.Item as={ Link } to='/profile/edit'>Edit Profile</Dropdown.Item>
                <Dropdown.Item onClick={this.handleOpen}>New Contact</Dropdown.Item>
                <Dropdown.Item as={ Link } to='/login'>Logout</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            </Button.Group>
          </Menu.Menu>
        </Menu>
        
        {this.newContactForm()}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {user: state.user}
}

export default connect(mapStateToProps)(NavBar)