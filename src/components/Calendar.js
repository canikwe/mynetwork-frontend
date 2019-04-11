import React from 'react'
import { Card, Grid } from 'semantic-ui-react'
import { range } from 'lodash' 


const calendar = (date) => {
  
  const year = date.getFullYear()
  const month = date.getMonth()
  const days = new Date(year, month, 0).getDate()

  return days
}

const displayCal = () => {
  return <Grid columns={7}>

    {range(calendar(new Date())).map(date => <Card key={date} content='hello'/>)}
  </Grid>
}

export default () => {
  return (
    <div>
      <h1>Calendar</h1>
        {console.log(range(calendar(new Date())))}
        {/* {range(calendar(new Date())).map(date => <Segment key={date} compact content='hello'/>)} */}
        {displayCal()}
    </div>
  )

}