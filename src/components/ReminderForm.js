import React from 'react'
import { week } from '../Dates'
import { connect } from 'react-redux'
import { addingReminder, updatingReminder, deletingReminder } from '../redux/actions'
import { Link } from 'react-router-dom'
import '../App.css'

class ReminderForm extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      id: props.reminder ? props.reminder.id : '',
      msg: props.reminder ? props.reminder.msg : '',
      day: props.reminder && props.reminder.day ? props.reminder.day : [],
      date: props.reminder && props.reminder.date ? props.reminder.date : "",
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
      case 'day':
        return this.setState({day: [parseInt(e.target.value)], date: ""})
      case 'date':
        return this.setState({date: e.target.value, day: []})
      default:
        return this.setState({[e.target.name]: e.target.value})
    }
  }

  addDay = e => {
    
    const dayEntry = parseInt(e.target.value)
    // const dayVal = this.state.day.includes(dayEntry) ? this.state.day : [...this.state.day, dayEntry]
    
    this.setState({day: [dayEntry]})
    
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
    // debugger
    if (this.props.loading) {
      return <h2>Loading...</h2>
    } else {
      return(
        <div className='new-reminder'>
          <h2>{this.props.title}</h2>
          <form onSubmit={(e) => {
            e.preventDefault()
            console.log(this.props)
            
            this.props.reminder ? 
            this.props.updatingReminder(this.state) : this.props.addingReminder(this.state)
            this.resetForm()
            }}>
            <label htmlFor='msg'>Message: </label>
            <input type='text' name='msg' value={this.state.msg} onChange={this.handleChange}></input><br />
    
            <label htmlFor='day'>Weekday: </label>
            <select name='day' onChange={this.addDay}>
            <option value={this.state.day}>--Please Select A Day--</option>
              {week().map(day => <option key={day[0]} value={day[0]}>{day[1]}</option>)}
            </select><br />

            {/* <label htmlFor='contact_id'>Who Dis For?: </label>
            <select name='contact_id' onChange={this.handleChange}>
            <option>--Please Select A Contact--</option>
              {this.props.contacts.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select><br /> */}

            <label htmlFor='date'>Date: </label>
            <input type='date' name='date' value={this.state.date} onChange={this.handleChange}></input> <br />
            <button type='submit'>Submit</button>
    
          </form>

          <Link to='/' onClick={() => this.props.deletingReminder(this.props.reminder)}>Delete Reminder</Link>
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
    updatingReminder: (reminder) => dispatch(updatingReminder(reminder)),
    deletingReminder: (reminder) => dispatch(deletingReminder(reminder))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReminderForm)
// export default ReminderForm