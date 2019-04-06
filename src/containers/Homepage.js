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

const todayWeekday = () => (new Date()).getDay()

const alerts = reminder => {

  reminder.day.forEach(d => {
    if (d === todayWeekday()){
      console.log(`${reminder.msg} today!`)
    } else if (d === (todayWeekday() - 1)){
      console.log(`Remember to ${reminder.msg} tomorrow`)
    }
    else if (d < todayWeekday() && d !== (todayWeekday() - 1)){
      console.log(`${reminder.msg} next ${week()[d]}`)
    }
  })

  
}

const dayAlert = day => {

}

const dateAlert = date => {
  
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
      
      {props.reminders.filter(r => r.day >= todayWeekday() - 1).sort((a, b) => b.day - a.day).map(r => console.log(alerts(r)))}

      {props.reminders.filter(r => r.date !== null && new Date(r.date) >= new Date()).map(r => console.log(r.msg, new Date(r.date)))}
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