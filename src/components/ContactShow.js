import React from 'react'
import { Image, Header, Container, List, Icon, Divider } from 'semantic-ui-react'
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
    editModal: false
  }

  toggleEditModal = () => this.setState({editModal: !this.state.editModal})

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
    const {contact: {avatar, name, created_at, details, encounters}, reminders} = this.props
    return(
      <React.Fragment>
        <Header as='h2' dividing>
          <Image circular src={ avatar } />{ name }
            <Header.Content>
              <Header.Subheader>Friends since { moment(created_at).format('ll') }</Header.Subheader>
            </Header.Content>
          </Header>
          <Container>
            <p>
              {details}
            </p>
  
            <List animated selection verticalAlign='middle'>
              {reminders.map(r => {
                return (
                  <React.Fragment key={r.id}>
                    <List.Item active={!r.expired} onClick={this.toggleEditModal}>
                      {/* <List.Content floated='right'>
                        <p>{ moment(r.start_date).format('MMMM Do, YYYY') }</p>
                      </List.Content> */}
                      <List.Content>
                        <Icon name='bell outline' color={this.displayPriorityColor(r)}/>
                        { formatReminder(r, null, name) }
                      </List.Content>
                    </List.Item>
                    <EditReminder modalOpen={this.state.editModal} reminder={r} modalClose={this.toggleEditModal} contact={this.props.contact}/>
                </React.Fragment>
                )
              })}
            </List>
          </Container>
          <Divider />
          <Container>
            <List>
              {encounters.map(e => (
                <List.Item key={e.id}>
                  {`${e.verb} ${name} on ${moment(e.date).format('MMMM DD YY')}`}
                </List.Item>)
              )}
            </List>
          </Container>
          <Divider />
          <p />
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => {
  return { recurringReminders: state.recurring }
}

export default connect(mapStateToProps)(ConactCardShow)