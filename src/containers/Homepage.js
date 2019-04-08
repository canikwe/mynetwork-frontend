import React from 'react'
import { connect } from 'react-redux'
import Feature from '../components/Feature'
import Filter from '../components/Filter'
import ContactCardContainer from './ContactCardContainer'
import { Link } from 'react-router-dom'
import { Grid } from 'semantic-ui-react'

// const week = () => ({
//   '0': 'Sunday',
//   '1': 'Monday',
//   '2': 'Tuesday',
//   '3': 'Wednesday',
//   '4': 'Thursday',
//   '5': 'Friday',
//   '6': 'Saturday'

// })

// Date.prototype.getWeek = function() {
//     var onejan = new Date(this.getFullYear(),0,1);
//     return Math.ceil((((this - onejan) / 86400000) + onejan.getDay()+1)/7);
// } 

// const todayWeekday = () => (new Date()).getDay()

const alerts = reminder => {

  return reminder.match ? console.log(reminder.msg) : null
  // reminder.day.forEach(d => {
  //   if (d === todayWeekday()){
  //     console.log(`${reminder.msg} today!`, d)
  //   } else if (d === (todayWeekday() + 1)){
  //     console.log(`Remember to ${reminder.msg} tomorrow`, d)
  //   }
  //   else if (d < todayWeekday() && d !== (todayWeekday() - 1)){
  //     console.log(`${reminder.msg} next ${week()[d]}`)
  //   }
  // })

  
}

// const dayAlert = day => {

// }

// const dateAlert = date => {
  
// }

const Homepage =  props => {
  if (props.loading) {
    return <h1>Loading, please wait... </h1>
  } else {
    return (
     <div>
      <h1>My Awesome Homepage</h1>
      <Grid>
        <Grid.Row>
          <Grid.Column width={15}>
            <Link to='/profile/edit'> Edit Profile</Link><br />
            <Link to='/contacts/new'> New Contact</Link>
          </Grid.Column>
        </Grid.Row>

        <Grid.Row>
          <Grid.Column>
            <Feature alert={alerts}/>
          </Grid.Column>
        </Grid.Row>

        <Grid.Row>
          <Grid.Column>
            <Filter />
          </Grid.Column>
        </Grid.Row>

        <Grid.Row>
          <Grid.Column>
            <ContactCardContainer />
          </Grid.Column>
        </Grid.Row>

      </Grid>
      {/* <Route exact path='/user/edit' component={ UserSettingsForm } /> */}

      
      {props.reminders.map(r => alerts(r))}

      {/* {props.reminders.filter(r => r.date !== null && new Date(r.date) >= new Date()).map(r => console.log(r.msg, new Date(r.date)))} */}
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