import React from 'react'
import Feature from '../components/Feature'

const week = {
  '1': 'Monday',
  '2': 'Tuesday',
  '3': 'Wednesday',
  '4': 'Thursday',
  '5': 'Friday',
  '6': 'Saturday',
  '7': 'Sunday'
}

// Date.prototype.getWeek = function() {
//     var onejan = new Date(this.getFullYear(),0,1);
//     return Math.ceil((((this - onejan) / 86400000) + onejan.getDay()+1)/7);
// } 

const newAlert = {day: 3, msg: "call Mom"}


const alerts = reminder => {
  const today = (new Date()).getDay()
  // debugger

	if (reminder.day === today){
		console.log(`${reminder.msg} today!`)
	} else if (reminder.day === (today - 1)){
		console.log(`Remember to ${reminder.msg} tomorrow`)
  }
  else if (reminder.day < today && reminder.day !== (today - 1)){
    console.log(`${reminder.msg} next ${week[reminder.day]}`)
  }
  else {
    console.log(`Remember to ${reminder.msg} on ${week[reminder.day]}`)
  }
}

export default () => {
  return (
    <div>
      <h1>Homepage</h1>
      <Feature />
      {alerts(newAlert)}
    </div>
  )
}