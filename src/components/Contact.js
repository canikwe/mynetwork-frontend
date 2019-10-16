import React, { Component } from 'react'
import {Card, Icon, Image, Dimmer, Button} from 'semantic-ui-react'

class Contact extends Component {
    constructor(){
        super()
        this.state = {
            active: false
        }
    }

    handleShow = () => this.setState({ active: true })
    handleHide = () => this.setState({ active: false })
    

    render(){
        const { active } = this.state
        const { contact } = this.props

        if (contact){
            return (
                <div>
                    <Dimmer.Dimmable as={Card} blurring dimmed={active}>
                        {/* <Card raised> */}
                            <Card.Content>
                                <Image
                                    floated='left'
                                    size='mini'
                                    src='https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png'
                                />
                                <Card.Header>{contact.name}</Card.Header>
                                <Card.Meta>
                                    <span className='date'>{contact.kind}</span>
                                </Card.Meta>
                                <Card.Description>
                                    {contact.details}
                                </Card.Description>
                                <a onClick={this.handleShow}>More... </a>
                            </Card.Content>
                            <Card.Content extra>
                                <a>
                                    <Icon name='leaf' />
                                    2 Upcoming Reminders
                                </a>
                                <br />
                                <a>
                                    <Icon name='exclamation' />
                                    1 Overdue Task
                                </a>
                            </Card.Content>
                        {/* </Card> */}

                        <Dimmer
                            active={active}
                            onMouseLeave={this.handleHide}
                        >
                            <Card.Content>
                                <Card.Header>
                                    Contact's activity feed will go here.
                                </Card.Header>
                            </Card.Content>
                        </Dimmer>
                    </Dimmer.Dimmable>
                </div>
            )
        } else {
            return <h3>No contact here... Something went wrong!</h3>
        }

    }
}

export default Contact