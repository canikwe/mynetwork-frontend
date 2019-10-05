import React from 'react'
import Logo from '../components/Logo'
import Reminders from '../components/Reminders'
import Contact from '../components/Contact'
import { connect } from 'react-redux'

import { Card } from 'semantic-ui-react'

const Home = props => {
    return (
        <>
            <h1>Welcome to your new Homepage</h1>
            <div className='homepage-container'>
                <Logo />
                <Reminders />
            </div>
            <Card.Group centered stackable>
                {!!props.contacts ? props.contacts.map(c => {
                    return <Contact key={c.id} contact={c}/>
                }) : null}
            </Card.Group>
        </>
    )
}

const mapStateToProps = state => {
    return ({
        contacts: state.contacts
    })
}

export default connect(mapStateToProps)(Home)