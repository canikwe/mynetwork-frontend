import React from 'react'
import { connect } from 'react-redux'
import Feature from '../components/Feature'
import ContactCardContainer from './ContactCardContainer'
import { Link } from 'react-router-dom'

const week = () => ({
  '0': 'Sunday',
  '1': 'Monday',
  '2': 'Tuesday',
  '3': 'Wednesday',
  '4': 'Thursday',
  '5': 'Friday',
  '6': 'Saturday'

})

// Date.prototype.getWeek = function() {
//     var onejan = new Date(this.getFullYear(),0,1);
//     return Math.ceil((((this - onejan) / 86400000) + onejan.getDay()+1)/7);
// } 


const alerts = reminder => {
  const today = (new Date()).getDay()

	if (reminder.day === today){
		console.log(`${reminder.msg} today!`)
	} else if (reminder.day === (today - 1)){
		console.log(`Remember to ${reminder.msg} tomorrow`)
  }
  else if (reminder.day < today && reminder.day !== (today - 1)){
    console.log(`${reminder.msg} next ${week()[reminder.day]}`)
  }
  // else {
  //   console.log(`Remember to ${reminder.msg} on ${week()[reminder.day]}`)
  // }
}

const Homepage =  props => {
  console.log(props)
  if (props.loading) {
    return <h1>Loading, please wait... </h1>
  } else {
    return (
     <div>
      <h1>My Awesome Homepage</h1>
      <Link to='/reminders/new'> New Reminder</Link><br />
      <Link to='/contacts/new'> New Contact</Link>

      <Feature alert={alerts}/>
      <ContactCardContainer />
      {props.reminders.map(r => console.log(alerts(r)))}
     </div>
   )
  }
}

const mapStateToProps = state => {
  return {
    loading: state.loading,
    user: state.user,
    reminders: state.reminders
  }
}

export default connect(mapStateToProps)(Homepage)