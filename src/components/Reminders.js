import React from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import { Loader, Segment, Dimmer } from 'semantic-ui-react'

const Reminders = props => {
    if (!props.todaysReminders) {
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
                        props.todaysReminders.map((r, key) => <li key={key}>{moment(r.start).format('MMMM Do, YYYY')} - {r.msg} ---- You have {Math.floor(Math.random() * 10)} remaining Todos for this reminder!</li>)
                    )}
                </ul>

                <hr />

                <h4>This Week's Reminders:</h4>
                <ul>
                    {props.thisWeeksReminders.length === 0 ? 'No more reminders this week!' : (
                        props.thisWeeksReminders.map((r, key) => <li key={key}>{moment(r.start).format('MMMM Do, YYYY')} - {r.msg}</li>)
                    )}
                </ul>

                <hr />

                <h4>Upcoming Reminders:</h4>
                <ul>
                    {props.upComingReminders.length === 0 ? 'No Upcoming Reminders' : (
                        props.upComingReminders.map((r, key) => <li key={key}>{moment(r.start).format('MMMM Do, YYYY')} - {r.msg}</li>)
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
    const today = moment(new Date(), 'YYYYMMDD')

    state.recurringReminders.forEach(r => {
        const reminderDate = moment(r.start, 'YYYYMMDD')

        if (today.isSame(reminderDate, 'day')) {
            todaysReminders.push(r)
        } else if (reminderDate.isAfter(today, 'day') && today.isSame(reminderDate, 'week')) {
            thisWeeksReminders.push(r)
        } else if (reminderDate.isAfter(today, 'week')) {
            upComingReminders.push(r)
        }
    })

    return ({
        todaysReminders, thisWeeksReminders, upComingReminders
    })
}
export default connect(mapStateToProps)(Reminders)