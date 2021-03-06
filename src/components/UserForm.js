import React from 'react'
import { connect } from 'react-redux'
import { addingUser, updatingUser, clearError } from '../redux/actions'
import { Segment, Grid, Button } from 'semantic-ui-react'
import { isEmpty } from 'lodash'
import toast from 'toasted-notes'
import 'toasted-notes/src/styles.css';

class UserForm extends React.Component {
  constructor(){
    super()
    this.state = {
      id: '',
      avatar: 'https://ayogo.com/wp-content/uploads/2015/06/jp-avatar-placeholder.png',
      bio: '',
      first_name: '',
      last_name: '',
      email: '',
      username: '',
      password: '',
      // password_confirm: '',
      splash_image: '',
      photo: {}
    }
  }

  componentDidMount() {
    if (this.props.user.id) {
      const { id, avatar, bio, first_name, last_name, email, username, splash_image } = this.props.user
      this.setState({ id, avatar, bio, first_name, last_name, email, username, splash_image })
    }
  }

  componentDidUpdate() {
    if (this.props.notifications.length >= 1 || !isEmpty(this.props.notifications)) {
      if (this.props.notifications.status !== 500) {
        console.log(isEmpty(this.props.notifications.message))
        this.props.notifications.message.forEach(e => toast.notify(e, {duration: null}))
        this.props.clearError()
      } else {
        toast.notify(this.props.notifications.error, {duration: null})
        this.props.clearError()
      }
    }
  }

  handleChange = e => {
    if (e.target.name !== 'photo'){
      this.setState({
        [e.target.name]: e.target.value
      })
    } else {
      this.setState({
        [e.target.name]: e.target.files[0]
      })
    }
  }

  handleSubmit = () => {
    // debugger
    //check password and password_confirm are identical (else throw alert)
    const data = new FormData()
    const formObj = {...this.state}

    if (isEmpty(formObj['photo'])) delete formObj['photo']
    console.log(formObj)
    
    if (this.props.user.id) {
      for (let key in formObj){
        data.append(key, formObj[key])
      }
      this.props.updatingUser(data, this.state.id)
    } else {
      for (let key in formObj){
        if (key !== 'id'){
          data.append(key, formObj[key])
        }
      }
      this.props.addingUser(data)
    }

    this.resetState()

    // debugger
    // if (this.state.first_name === '' ||
    //     this.state.last_name === '' ||
    //     this.state.username === '' ||
    //     this.state.email === '' ||
    //     this.state.avatar === '') {
    //       toast.notify('Please fill out all required fields', {duration: null})
    //     } else {
          
    //       if (this.props.user.id){
    //         this.props.updatingUser({user: {user_info: this.state}})
    //       } else {
    //         this.props.addingUser({user: {user_info: this.state}})
    //       }
    //       // this.resetState()
    //     }

  }

  //   displayAlert = () => {
  //     debugger
  //   if (!isEmpty(this.props.error)) {
  //     debugger
  //     this.props.notifications.forEach(e => {
  //       console.log(e)
  //       alert(e)
  //     })
  //     this.props.clearError()
  //   }
  // }

  resetState = () => {
    this.setState({
      avatar: 'https://ayogo.com/wp-content/uploads/2015/06/jp-avatar-placeholder.png',
      bio: '',
      first_name: '',
      last_name: '',
      email: '',
      username: '',
      password: '',
      photo: {}
      // password_confirm: ''
    })
  }

  render(){
    const { avatar, bio, first_name, last_name, email, username, password, splash_image } = this.state
    return(
      <Segment raised>
        <Grid columns={2}>
        <Grid.Column>


          <div className="ui form">
            <Segment compact>
              <img className='ui small image' src={ avatar } alt='user_avatar'/>
            </Segment>
            <label htmlFor='avatar'>Avatar: </label><br />
            <input type='text' name='avatar' value={ avatar } onChange={this.handleChange}></input><br />


            {/* <input type='file' name='splash_image' accept='image/*' onChange={this.handleChange}></input> */}
            
            { splash_image !== '' ?
            <Segment>
              <img className='ui img-splash' alt='user_splash_img' src={ splash_image } />
            </Segment> : null }

            <label htmlFor='splash_image'>Splash Image: </label><br />
            <input type='text' name='splash_image' value={ splash_image } onChange={this.handleChange}></input><br />
            
          </div>
          </Grid.Column>

          <Grid.Column>

          <div className='ui form'>
          <label htmlFor='first_name'>First Name: </label>
          <input type='text' name='first_name' value={ first_name } onChange={this.handleChange}></input><br />
  
          <label htmlFor='last_name'>Last Name: </label>
          <input type='text' name='last_name' value={ last_name } onChange={this.handleChange}></input><br />
  
          <label htmlFor='username'>Username: </label>
          <input type='text' name='username' value={ username } onChange={this.handleChange}></input><br />
          
          <label htmlFor='email'>Email: </label>
          <input type='text' name='email' value={ email } onChange={this.handleChange}></input><br />

  
          <label htmlFor='password'>Password: </label>
          <input type='password' name='password' value={ password } onChange={this.handleChange}></input><br />
{/*           
          <label htmlFor='password_confirm'>Password Confirmation: </label>
          <input type='password' name='password_confirm' value={ password_confirm } onChange={this.handleChange}></input><br /> */}

          <label htmlFor='bio'>Bio:</label><br />
          <textarea name='bio' rows='6' value={ bio } onChange={this.handleChange}></textarea><p />

          <label htmlFor='photo'>Photo:</label><br />
          <input type='file' name='photo' onChange={this.handleChange}/> 

  
          <Button onClick={this.handleSubmit} >Submit</Button>
          </div>
        </Grid.Column>
        </Grid>
        {/* {this.displayAlert()} */}
        <img src={`http://localhost:3000${this.props.user.photo}`} />

      </Segment>
    )

  }

}

const mapStateToProps = state => {
  return {
    user: state.user,
    notifications: state.notifications
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addingUser: (contact) => dispatch(addingUser(contact)),
    updatingUser: (user, id) => dispatch(updatingUser(user, id)),
    clearError: () => dispatch(clearError())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserForm)