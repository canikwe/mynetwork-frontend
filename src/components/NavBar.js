import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { logoutUser } from '../redux/actions'
import { Menu, Dropdown, Modal, Segment, Label, Icon, Popup } from 'semantic-ui-react'
import { isEmpty } from 'lodash'
import ContactForm from './ContactForm'

class NavBar extends Component {
  state = { activeItem: 'home', modalOpen: false }

  handleOpen = () => this.setState({modalOpen: true})

  handleClose = () => this.setState({modalOpen: false})

  newContactForm = () => {
    return (
      <Modal
        open={this.state.modalOpen}
        onClose={this.handleClose} 
      >
        <ContactForm handleClose={this.handleClose}/>
      </Modal>
    )
  }

  avatar = () => {
    return (
      <span>
        <Label
          // className='filter'
          size='large'
          color='blue'
          circular>{`${this.props.user.first_name.slice(0, 1)}${this.props.user.last_name.slice(0, 1)}`}
        </Label>
      </span>
    )
  }

  logout = () => {
    localStorage.clear('token')
    this.props.logoutUser()
  }

  render() {
    return (
      <nav>
        <Menu 
          // pointing 
          // secondary 
          inverted 
          // fluid
          stackable

        >
        { !isEmpty(this.props.user) ?

          <React.Fragment>
            
            <Menu.Item 
              name='home' 
              // active={ this.props.location.pathname === '/' } 
              as={ Link } to='/'
            >
              <Icon name='leaf' size='big' color='teal' />
            </Menu.Item>

            <Menu.Menu  position='right'>
              <Menu.Item
                name='home'
                as={Link} to='/friends'
              >
                <Icon name='group' size='large'/>
              </Menu.Item>

              <Menu.Item 
                name='calendar' 
                // active={ this.props.location.pathname === '/calendar' }
                as={ Link } to='/calendar'
              >
                <Icon name='calendar' size='large'/>
              </Menu.Item> 

              <Menu.Item 
                name='notifications' 
                // active={ this.props.location.pathname === '/calendar' }
                // as={ Link } to='/'
              >
                <span>
                  
                  {
                    this.props.reminders.length ?
                    <>
                      <Icon name='bell' size='large' />
                      <Label color='red' floating circular size='mini'>
                        {this.props.reminders.length}
                      </Label>
                    </>
                    : 
                    <Popup content='All done for today!' trigger={<Icon name='bell' size='large' />} />
                  }
                </span>
              </Menu.Item> 
              <Dropdown
                trigger={this.avatar()}
                pointing='top right' 
                icon={null}             
                >
                <Dropdown.Menu>
                  <Dropdown.Item as={ Link } to='/profile/edit'>Edit Profile</Dropdown.Item>
                  <Dropdown.Item onClick={this.handleOpen}>New Contact</Dropdown.Item>
                  <Dropdown.Item onClick={this.logout}>Logout</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Menu.Menu>
          </React.Fragment>
          : 
            // <Menu.Item 
            //   name='about' 
            //   active={activeItem === 'about'} 
            //   onClick={this.handleItemClick} 
            //   as={ Link } to='/about'
            // /> 

            <Menu.Item header><h2>myNetwork</h2></Menu.Item>
          }
        </Menu>
        {this.newContactForm()}
      </nav>
    )
  }
}

const mapStateToProps = state => {
  return { user: state.user, reminders: state.reminders.filter(r => r.match && !r.snoozed) }
}

const mapDispatchToProps = dispatch => {
  return {
    logoutUser: () => dispatch(logoutUser())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NavBar))