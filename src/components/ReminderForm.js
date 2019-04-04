import React from 'react'
import { week } from '../Dates'
import { connect } from 'react-redux'
import { addingReminder } from '../redux/actions'
import { Link } from 'react-router-dom'

class ReminderForm extends React.Component {
  constructor(){
    super()
    this.state = {
      msg: '',
      day: [],
      date: '',
      contact_id: 1
    }
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  addDay = e => {
    const dayEntry = e.target.value
    // const dayVal = this.state.day.includes(dayEntry) ? this.state.day : [...this.state.day, dayEntry]
    
    this.setState({
      day: [dayEntry]
    })
    
  }

  resetForm = () => {
    this.setState({
      msg: '',
      day: '',
      date: '',
      contact_id: 1
    })
  }

  render() {
    // console.log(this.props.contacts)
    // debugger
    if (this.props.loading) {
      return <h2>Loading...</h2>
    } else {
      return(
        <div className='new-reminder'>
          <h2>Create a new reminder!</h2>
          <form onSubmit={(e) => {
            e.preventDefault()
            this.props.addingReminder(this.state)
            this.resetForm()
            }}>
            <label htmlFor='msg'>Message: </label>
            <input type='text' name='msg' value={this.state.msg} onChange={this.handleChange}></input><br />
    
            <label htmlFor='date'>Weekday: </label>
            <select name='day' onChange={this.addDay}>
            <option>--Please Select A Date--</option>
              {week().map(day => <option key={day[0]} value={day[0]}>{day[1]}</option>)}
            </select><br />

            <label htmlFor='contact_id'>Who Dis For?: </label>
            <select name='contact_id' onChange={this.handleChange}>
            <option>--Please Select A Contact--</option>
              {this.props.contacts.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select><br />

            <label htmlFor='date'>Date: </label>
            <input type='date' name='date' value={this.state.date} onChange={this.handleChange}></input> <br />
            <button type='submit'>Submit</button>
    
          </form>
          <Link to='/'>BCK TO BUSINESS</Link>
        </div>
      )}
  }
}

const mapStateToProps = state => {
  return {
    contacts: state.user.contacts,
    loading: state.loading
  }
}

const mapDispatchToProps = dispatch => {
  return {addingReminder: (reminder) => dispatch(addingReminder(reminder))}
}

export default connect(mapStateToProps, mapDispatchToProps)(ReminderForm)
// export default ReminderForm