import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { logoutUser } from '../redux/actions'
import { Menu, Dropdown, Modal, Segment, Label } from 'semantic-ui-react'
import { isEmpty } from 'lodash'
import ContactForm from './ContactForm'
import Filter from '../components/Filter'

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

  logout = () => {
    localStorage.clear('token')
    this.props.logoutUser()
  }

  render() {
    const { activeItem } = this.state

    return (
      <Segment inverted>
        <Menu 
          pointing 
          secondary 
          inverted 
          fluid 
          // widths={3}
        >
        { !isEmpty(this.props.user) ?

          <React.Fragment>

            <Menu.Item 
              name='home' 
              active={activeItem === 'home'} 
              onClick={this.handleItemClick} 
              as={ Link } to='/'
            />

            <Menu.Item 
              name='calendar' 
              active={activeItem === 'calendar'} 
              onClick={this.handleItemClick} 
              as={ Link } to='/calendar'
            /> 

            <Menu.Menu  position='right'>

            <Menu.Item header><h2>myNetwork</h2></Menu.Item>
            </Menu.Menu>

          <Menu.Menu position='right'>

          <Filter />

            <Dropdown
              trigger={<Label
                className='filter'
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
            <Menu.Item 
              name='about' 
              active={activeItem === 'about'} 
              onClick={this.handleItemClick} 
              as={ Link } to='/about'
            /> 
          }
        </Menu>
        {this.newContactForm()}
      </Segment>
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

export default connect(mapStateToProps, mapDispatchToProps)(NavBar)