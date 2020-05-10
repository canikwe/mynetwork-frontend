import React from 'react'
import ContactCard from './ContactCard'
import { Card } from 'semantic-ui-react'

const FeaturedContactCardContainer = ({contacts, title, description}) => {
  return (
    <div className='featured-contacts'>
      <h3>{title}</h3>
      <p className='contact-container-desc'>{description}</p>
      <Card.Group itemsPerRow={4}>
        {contacts.map(c => <ContactCard key={c.id} contact={c} />)}
      </Card.Group>
    </div>
  )
}

export default FeaturedContactCardContainer