import React from 'react'
import { Image, Header, Container, List, Icon, Divider } from 'semantic-ui-react'
import { connect } from 'react-redux'
import moment from 'moment';

const  displayPriorityColor = (r) => {
  switch (r.priority){
    case 1:
      return 'red'
    case 2:
      return 'yellow'
    case 3:
      return 'blue'
    case 4: 
      return 'grey'
    default:
      return 'blue'
  }
}

//Display the next recurrance or the date it ended
// const displayNextRecurrance = (r) => {
//   if (r.recurring) {
//     props.recurring.find(rec => {
//       return r.id === rec.id && moment(rec.start) <= moment()
//     }).start
//   }
// }

const ConactCardShow = ({contact: {avatar, name, created_at, details}, reminders}) => {
  return(
    <React.Fragment>
      <Header as='h2' dividing>
        <Image circular src={ avatar } />{ name }
          <Header.Content>
            <Header.Subheader >Friends since {moment(created_at).calendar()}</Header.Subheader>
          </Header.Content>
        </Header>
        <Container>
          <p>
            {details}
          </p>

          <List divided verticalAlign='middle'>
            {reminders.map(r => {
              return (
              <List.Item key={r.id}>
                {/* <List.Content floated='right'>
                  <p>{ moment(r.start_date).format('MMMM Do, YYYY') }</p>
                </List.Content> */}
                <List.Content>
                  <Icon name='bell outline' color={displayPriorityColor(r)}/>
                  {r.msg}
                </List.Content>
              </List.Item>
              )
            })}
          </List>
        </Container>
        <Divider />
        <p />
    </React.Fragment>
  )
}

const mapStateToProps = state => {
  return { recurringReminders: state.recurring }
}

export default connect(mapStateToProps)(ConactCardShow)