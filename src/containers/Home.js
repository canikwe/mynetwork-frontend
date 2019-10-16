import React from 'react'
import Logo from '../components/Logo'
import Reminders from '../components/Reminders'
import ContactGroup from '../containers/ContactGroup'
import StatsContainer from '../containers/StatsContainer'

const Home = () => {
    return (
        <>
            <h1>Welcome to your new Homepage</h1>
            <div className='homepage-container'> {/* this className is misleading. Refactor to use grid and contain the entire page?*/}
                <Logo />
                <Reminders />
            </div>

            <div>
                <h1>"Wonder begets wisdom, DJ Chine"</h1>
                <StatsContainer />
            </div>

            <div>
                <ContactGroup />
            </div>
        </>
    )
}


export default Home

//If reusing, Pass some identifier to the Contact Group component so the mapStateToProps function will give one component the starred contacts and the other will give the neglected contacts?
