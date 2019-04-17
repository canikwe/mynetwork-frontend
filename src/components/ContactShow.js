import React from 'react'
import { Image, Header, Container, List, Icon, Divider } from 'semantic-ui-react'
import moment from 'moment';


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
                  <Button>Add</Button>
                </List.Content> */}
                <List.Content>
                  <Icon name='bell outline' color='red'/>
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

export default ConactCardShow