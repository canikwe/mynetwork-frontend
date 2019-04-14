import React from 'react'
import { connect } from 'react-redux'
import Feature from '../components/Feature'
// import Filter from '../components/Filter'
import ContactCardContainer from './ContactCardContainer'
import { Grid } from 'semantic-ui-react'
// import toast from 'toasted-notes'
import 'toasted-notes/src/styles.css';

// const alerts = reminder => {

//   return reminder.match ? toast.notify(reminder.msg, {position: 'bottom-left', duration: null}) : null
//   // reminder.day.forEach(d => {
//   //   if (d === todayWeekday()){
//   //     console.log(`${reminder.msg} today!`, d)
//   //   } else if (d === (todayWeekday() + 1)){
//   //     console.log(`Remember to ${reminder.msg} tomorrow`, d)
//   //   }
//   //   else if (d < todayWeekday() && d !== (todayWeekday() - 1)){
//   //     console.log(`${reminder.msg} next ${week()[d]}`)
//   //   }
//   // })

  
// }


const Homepage =  props => {
  if (props.loading) {
    return <h1>Loading, please wait... </h1>
  } else {
    return (
     <div className='wrapper'>
      <Grid width={ 14 }>
        <Grid.Row>
          <Grid.Column >
            <h1>myNetwork Homepage</h1>
          </Grid.Column>
        </Grid.Row>

        <Grid.Row>
          <Grid.Column>
            <Feature />
          </Grid.Column>
        </Grid.Row>

        {/* <Grid.Row centered>
          <Grid.Column>
            <Filter />
          </Grid.Column>
        </Grid.Row> */}

        <Grid.Row>
          <Grid.Column>
            <ContactCardContainer />
          </Grid.Column>
        </Grid.Row>

      </Grid>

      {/* {props.reminders.map(r => alerts(r))} */}
      {/* {toast.notify('Hello World', {position: 'bottom-left'})} */}

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