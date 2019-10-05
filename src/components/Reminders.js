import React from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import { Loader, Segment, Dimmer } from 'semantic-ui-react'

const Reminders = props => {
    if (!props.todaysReminders){
        return (
            <Segment>
                <Dimmer active inverted>
                    <Loader>Loading</Loader>
                </Dimmer>
            </Segment>
        )
    } else {
        return (
            <div>
                <h4>Today's Reminders:</h4>
                <ul>
                    {props.todaysReminders.length === 0 ? <li>No reminders today</li> : (
                        props.todaysReminders.map(r => <li key={r.id}>{moment(r.start_date).format('MMMM Do, YYYY')} - {r.msg}</li>)
                    )}
                </ul>
                
                <hr/>
    
                <h4>This Week's Reminders:</h4>
                <ul>
                    {props.thisWeeksReminders.length === 0 ? 'No more reminders this week!' : (
                        props.thisWeeksReminders.map(r => <li key={r.id}>{moment(r.start_date).format('MMMM Do, YYYY')} - {r.msg}</li>)
                    )}
                </ul>
    
                <hr />
    
                <h4>Upcoming Reminders:</h4>
                <ul>
                    {props.upComingReminders.length === 0 ? 'No Upcoming Reminders' : (
                        props.upComingReminders.map(r => <li key={r.id}>{moment(r.start_date).format('MMMM Do, YYYY')} - {r.msg}</li>)
                    )}
                </ul>
            </div>
        )   
    }
}

const mapStateToProps = state => {
    const todaysReminders = []
    const thisWeeksReminders = []
    const upComingReminders = []
    const today = moment(new Date, 'YYYYMMDD')

    state.recurringReminders.forEach(r => {
        const reminderDate = moment(r.start, 'YYYYMMDD')
        
        if (today.isSame(reminderDate, 'day')) {
            todaysReminders.push(r) 
        } else if (today.isAfter(reminderDate, 'week') && today.isSame(reminderDate, 'week')){
            thisWeeksReminders.push(r)
        } else if (today.isAfter(reminderDate, 'week')){
            upComingReminders.push(r)
        }
    })

    return ({
        todaysReminders, thisWeeksReminders, upComingReminders
    })
}
export default connect(mapStateToProps)(Reminders)