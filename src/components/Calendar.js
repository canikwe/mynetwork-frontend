import React, { PureComponent } from 'react'
import BigCalendar from 'react-big-calendar'
import moment from 'moment'
import { connect } from 'react-redux'
import ReminderForm from '../components/ReminderForm'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { Dropdown, Menu, Modal, Button, Header } from 'semantic-ui-react'


const localizer = BigCalendar.momentLocalizer(moment)


class Calendar extends React.PureComponent {
  constructor() {
    super()
    this.state = {
      modalOpen: false,
      featuredEvent: {}
    }
  }
  

  handleOpen = (event) => this.setState({modalOpen: true, featuredEvent: event})
  handleClose = () => this.setState({modalOpen: false})

  editContactBtn = () => {
    //edit modal goes here
    return (
      <Modal
        // trigger={<Button 
        //   onClick={() => this.handleOpen('editContactModal')}
        //   icon='edit outline' 
        //   basic color='grey'
        // />}
        open={this.state.modalOpen}
        onClose={this.handleClose} 
        size='tiny'
      >
        {/* <ContactForm contact={null} handleClose={this.handleClose}/> */}
      </Modal>
    )
  }

  render() {
    if (this.props.loading) {
      return <h1>Loading...</h1>
    } else {
      return (
        <div className='wrapper calendar'>
          <h1>Calendar</h1>
            <BigCalendar
              localizer={localizer}
              events={this.props.recurringReminders}
              startAccessor='start'
              endAccessor='start'
              titleAccessor='msg'
              defaultView='month'
              views={['month', 'day', 'week']}
              alldayaccessor='all_day'
              popup
              selectable
              onSelectEvent={(event, e) => {this.handleOpen(event)}}
            />

        <Modal
        // trigger={<Button 
        //   onClick={() => this.handleOpen('editContactModal')}
        //   icon='edit outline' 
        //   basic color='grey'
        // />}
        open={this.state.modalOpen}
        onClose={this.handleClose} 
        size='small'
      >
        <ReminderForm 
          contact={null} 
          title={'Update reminder!'} 
          reminder={this.state.featuredEvent} 
          handleClose={this.handleClose}
        />
      </Modal>

        </div>
      )
    }

  }
}



const mapStateToProps = state => {
  return {
    reminders: state.reminders,
    loading: state.loading,
    recurringReminders: state.recurringReminders
  }
}

export default connect(mapStateToProps)(Calendar)