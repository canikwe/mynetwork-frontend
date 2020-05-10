import React from 'react'
import { Image, Header, Container, List, Icon, Divider, Modal, Grid, GridRow, Button } from 'semantic-ui-react'
import { connect } from 'react-redux'
import EditReminder from './EditReminder'
import moment from 'moment';
import { formatReminder } from '../helper/functions'


// const displayPriorityColor = (r) => {
//   switch (r.priority){
//     case 1:
//       return 'red'
//     case 2:
//       return 'yellow'
//     case 3:
//       return 'blue'
//     case 4: 
//       return 'grey'
//     default:
//       return 'blue'
//   }
// }

//Display the next recurrance or the date it ended
// const displayNextRecurrance = (r) => {
//   if (r.recurring) {
//     props.recurring.find(rec => {
//       return r.id === rec.id && moment(rec.start) <= moment()
//     }).start
//   }
// }

class ConactCardShow extends React.PureComponent {
  state = {
    editModal: false,
    editedReminder: {}
  }

  toggleEditModal = r => this.setState({editModal: !this.state.editModal, editingReminder: r})

  displayPriorityColor = (r) => {
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

  render(){
    const {contact: {avatar, name, created_at, details, encounters, kind}, reminders} = this.props
    return(
      <Grid columns='equal' padded stackable>
        <Grid.Row>
          <Grid.Column>
            <Header as='h2' dividing>
              <Image circular src={ avatar } />{ name }
                <Header.Content>
                  <Header.Subheader>Friends since { moment(created_at).format('ll') }</Header.Subheader>
                </Header.Content>
              </Header>
          </Grid.Column>
        </Grid.Row>

        <Grid.Row columns={2}>
          <Grid.Column width={4}>
            <Button>{kind}</Button>
          </Grid.Column>
          <Grid.Column>
            <p>
              {details}
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc maximus, nulla ut commodo sagittis, sapien dui mattis dui, non pulvinar lorem felis nec erat
            </p>
          </Grid.Column>
        </Grid.Row>

        <Grid.Row columns={4}>
          <Grid.Column>
            <Button>Add Reminder</Button>
          </Grid.Column>
          <Grid.Column>
            <Button>Log Encounter</Button>
          </Grid.Column>
          <Grid.Column>
            <Button>Edit Friend</Button>
          </Grid.Column>
          <Grid.Column>
            <Button>Remove Contact</Button>
          </Grid.Column>
        </Grid.Row>

        <Grid.Row columns={2}>
          <Grid.Column>
            <Header.Subheader>Current Reminders</Header.Subheader>
            <List animated selection verticalAlign='middle'>
              {reminders.map(r => {
                return (
                  <React.Fragment key={r.id}>
                    <List.Item active={!r.expired} onClick={() => this.toggleEditModal(r)}>
                      {/* <List.Content floated='right'>
                        <p>{ moment(r.start_date).format('MMMM Do, YYYY') }</p>
                      </List.Content> */}
                      <List.Content>
                        <Icon name='bell outline' color={this.displayPriorityColor(r)}/>
                        { formatReminder(r, null, name) }
                      </List.Content>
                    </List.Item>
          
                </React.Fragment>
                )
              })}
            {
              this.state.editModal ?
                <EditReminder modalOpen={this.state.editModal} reminder={this.state.editingReminder} modalClose={this.toggleEditModal} contact={this.props.contact} />
                : null
            }
            </List>
          </Grid.Column>
          <Grid.Column>
            <Header.Subheader>Activity Feed</Header.Subheader>
            <List>
              {encounters.map(e => (
                <List.Item key={e.id}>
                  {`${e.verb} ${name} on ${moment(e.date).format('MMMM DD YY')}`}
                </List.Item>)
              )}
            </List>
          </Grid.Column>
        </Grid.Row>
          {/* <Container>
  
          </Container>
          <Divider />
          <Container>
          </Container>
          <Divider />
          <p /> */}
      </Grid>
    )
  }
}

const mapStateToProps = state => {
  return { recurringReminders: state.recurring }
}

export default connect(mapStateToProps)(ConactCardShow)