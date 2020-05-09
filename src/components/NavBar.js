import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { logoutUser } from '../redux/actions'
import { Menu, Dropdown, Modal, Segment, Label } from 'semantic-ui-react'
import { isEmpty } from 'lodash'
import ContactForm from './ContactForm'
import Filter from '../components/Filter'

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

  logout = () => {
    localStorage.clear('token')
    this.props.logoutUser()
  }

  render() {
    return (
      <>
        <Menu 
          pointing 
          secondary 
          // inverted 
          fluid
          stackable

        >
        { !isEmpty(this.props.user) ?

          <React.Fragment>
            
            <Menu.Item 
              name='home' 
              active={ this.props.location.pathname === '/' } 
              as={ Link } to='/'
            />

            <Menu.Item 
              name='calendar' 
              active={ this.props.location.pathname === '/calendar' }
              as={ Link } to='/calendar'
            /> 

            <Menu.Menu  position='right'>

              <Menu.Item header><h2>myNetwork</h2></Menu.Item>
            </Menu.Menu>

          <Menu.Menu position='right'>

          {/* <Filter /> */}

            <Dropdown
              trigger={<Label
                // className='filter'
                size='massive'
                color='blue'
                circular>{`${this.props.user.first_name.slice(0, 1)}${this.props.user.last_name.slice(0, 1)}`}
                </Label>}
              pointing='top right'              
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
      </>
    )
  }
}

const mapStateToProps = state => {
  return {user: state.user}
}

const mapDispatchToProps = dispatch => {
  return {
    logoutUser: () => dispatch(logoutUser())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NavBar))