import React from 'react'
import { connect } from 'react-redux'
import { Header, Segment, Grid, Icon, Divider, Button } from 'semantic-ui-react'
import moment from 'moment'

const ReminderShow = ({reminder: {interval, msg, period, priority, recurring, start}}) => {
  return (
    <React.Fragment>
      <Header as='h4' floated='left'>{moment(start).format('ll')}</Header>
      <Header as='h2' floated='right'> { msg } - { period }</Header>

      <Divider clearing />
      
    </React.Fragment>
  )
}

export default ReminderShow