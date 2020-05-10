import React from 'react'
import { Container, List } from 'semantic-ui-react'

const Footer = () => {
  return (
    <footer>
      <Container className='footer'>
        <List bulleted horizontal link>
          <List.Item as='a'>Copyright 2020 Chine Anikwe</List.Item>
          <List.Item as='a'>Frontend Repo</List.Item>
          <List.Item as='a'>Backend Repo</List.Item>
        </List>
      </Container>
    </footer>
  )
}

export default Footer