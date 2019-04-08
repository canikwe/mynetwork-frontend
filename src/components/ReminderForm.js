import React from 'react'
// import { week } from '../Dates'
import { connect } from 'react-redux'
import { addingReminder, updatingReminder } from '../redux/actions'
import '../App.css'

class ReminderForm extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      id: props.reminder ? props.reminder.id : null,
      msg: props.reminder ? props.reminder.msg : '',
      start_date: props.reminder ? props.reminder.start_date : new Date(),
      interval: props.reminder ? props.reminder.interval : 1,
      period: props.reminder ? props.reminder.period : 'weekly',
      snoozed: props.reminder ? props.reminder.snoozed : false,
      current: props.reminder ? props.reminder.current : '',
      contact_id: props.contact.id
    }
  }

  componentDidMount(){
    console.log(this.state, this.props)
  //  const { reminder } = this.props.reminder
  //   reminder ?
  //   (this.setState({
  //     msg: reminder.msg,
  //     day: reminder.day,
  //     date: reminder.date,
  //   })) : null
  }

  handleChange = e => {
    
    switch (e.target.name){
      case 'snoozed':
        return this.setState({snoozed: !this.state.snoozed})
      default:
        return this.setState({[e.target.name]: e.target.value})
    }
  }

  // addDay = e => {
    
  //   const dayEntry = parseInt(e.target.value)
  //   // const dayVal = this.state.day.includes(dayEntry) ? this.state.day : [...this.state.day, dayEntry]
    
  //   this.setState({day: [dayEntry]})
    
  // }

  handleSubmit =(e) => {
    e.preventDefault()
    console.log(this.state)
    console.log(this.props)
    
    if (this.props.reminder) {
      this.props.updatingReminder(this.state)
      this.props.handleClose('editReminderModalOpen')
    } else {
      this.props.addingReminder(this.state)
      this.props.handleClose('newReminderModalOpen')
    }
    this.resetForm()
  }

  resetForm = () => {
    this.setState({
      msg: '',
      day: 0,
      date: '',
      contact_id: 1
    })
  }

  render() {
    
    if (this.props.loading) {
      return <h2>Loading...</h2>
    } else {
      return(
        <div className='new-reminder'>
          <h2>{this.props.title}</h2>
          <form onSubmit={this.handleSubmit}>
            <label htmlFor='msg'>Message: </label>
            <input type='text' name='msg' value={this.state.msg} onChange={this.handleChange}></input><br />
    
            {/* <label htmlFor='day'>Weekday: </label>
            <select name='day' onChange={this.addDay}>
            <option value={this.state.day}>--Please Select A Day--</option>
              {week().map(day => <option key={day[0]} value={day[0]}>{day[1]}</option>)}
            </select><br /> */}

            {/* <label htmlFor='contact_id'>Who Dis For?: </label>
            <select name='contact_id' onChange={this.handleChange}>
            <option>--Please Select A Contact--</option>
              {this.props.contacts.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select><br /> */}

            <label htmlFor='start_date'>Start Date: </label>
            <input type='date' name='start_date' value={this.state.start_date} onChange={this.handleChange}></input> <br />

            <label htmlFor='interval'>Interval: </label>
            <input type='number' name='interval' value={this.state.interval} onChange={this.handleChange}></input> <br />

            <label htmlFor='period'>Period: </label>
            <select name='period' onChange={this.handleChange}>
              <option value='daily'>Daily</option>
              <option value='weekly'>Weekly</option>
              <option value='monthly'>Monthly</option>
              <option value='yearly'>Yearly</option>
            </select><br />
            {/* <input type='text' name='period' value={this.state.period} onChange={this.handleChange}></input> <br /> */}



            <label htmlFor='snoozed'>Snoozed ? </label>
            <input type='checkbox' name='snoozed' value={this.state.snoozed} checked={this.state.snoozed} onChange={this.handleChange}></input> <br />

            <label htmlFor='current'>Current: </label>
            <input type='date' name='current' value={this.state.current} onChange={this.handleChange}></input> <br />
          

            <button type='submit'>Submit</button>
    
          </form>
          
        </div>
      )}
  }
}

const mapStateToProps = state => {
  return {
    contacts: state.contacts,
    loading: state.loading
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addingReminder: (reminder) => dispatch(addingReminder(reminder)),
    updatingReminder: (reminder) => dispatch(updatingReminder(reminder))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReminderForm)
// export default ReminderForm