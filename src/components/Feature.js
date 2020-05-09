import React from 'react'
import { Grid } from 'semantic-ui-react'
import '../App.css'
import Logo from './Logo'
import RemindersList from './RemindersList'

const Feature = () => {

  return (
    <Grid celled='internally' stackable columns='equal'>
      <Grid.Column>
        <Logo />
      </Grid.Column>

      <Grid.Column width={6}>
        <RemindersList />
      </Grid.Column>
    </Grid>
  )
}

export default Feature