import React from 'react'
import { connect } from 'react-redux'
import ContactCard from '../components/ContactCard'
import { Checkbox } from 'semantic-ui-react'

class ContactCardContainer extends React.PureComponent {
  state = { checked: false }
  toggle = () => this.setState({ checked: !this.state.checked })

  filteredContacts = () => {
    return this.props.contacts.filter(c => c.name.toLowerCase().includes(this.props.searchTerm.toLowerCase()))
  }

  render() {
    
    return(
      <div>
        <Checkbox 
          slider
          label='Sort By Name'
          checked={this.state.checked}
          onChange={this.toggle}
        />
        <p />
        <div className='ui four stackable cards'>
          {this.state.checked ?
            this.filteredContacts().sort((a, b) => {
              const nameA = a.name
              const nameB = b.name

              if (nameA < nameB) {
                return -1
              }
              if (nameA > nameB) {
                return 1
              }
              return 0
            }).map(c => <ContactCard key={c.id} contact={c} />)
          :
            this.filteredContacts().sort((a, b) => {
              const createdA = new Date(a.created_at)
              const createdB = new Date(b.created_at)

              if (createdB < createdA) {
                return -1
              }
              if (createdB > createdA) {
                return 1
              }
                return 0
            }).map(c => <ContactCard key={c.id} contact={c} />)

          }
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    contacts: state.contacts,
    searchTerm: state.searchTerm
  }
}

export default connect(mapStateToProps)(ContactCardContainer)