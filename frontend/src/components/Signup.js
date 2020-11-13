import React, { Component } from 'react';
import '../css/signup.css';
import { Redirect, Link } from 'react-router-dom';
import { Select } from 'react-materialize';



import { storage } from '../firebase';



class Signup extends Component {
  state = {
    email:'',
    username:'',
    password:'',
    passwordConfirm:'',
    borough:1,
    avatar_img:null,
    error:false,
    didUpload: false,
    image:null
          }

  componentDidMount(){
  this.props.checkAuthenticateStatus()
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  handleUploadChange = e => {
    if(e.target.files[0]) {
      this.setState({image:e.target.files[0]})
    }
    setTimeout(()=> {
      console.log(this.state.image)
    },1000)
  }
  handleSelect = e => {
    this.setState({
      borough: e.target.value
    })
  }

  upload = (e) => {
    e.preventDefault();
    const { image } = this.state


    const uploadTask = storage.ref(`images/${image.name}`).put(image);

    uploadTask.on(
      "stage_changedd",
      snapshot => {},
      error => {
        console.log(error);
      },
      ()=> {
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then(url => {
            this.setState({ avatar_img:url, didUpload: true })
          
          })
          .catch(err => console.log(err))

      }
    )


  }

  onSubmitNewUser = e => {
    e.preventDefault();
    let newuserData = {
      username: this.state.username,
      password:this.state.password,
      email:this.state.email,
      community_id:+this.state.borough,
      avatar_img:this.state.avatar_img
    }
    // console.log(newuserData);
    if(this.state.password===this.state.passwordConfirm){
      this.props.newUser(newuserData);
      this.setState({
        username:"",
        password:"",
        passwordConfirm:'',
        borough:1,
        email:"",
        avatar_img:"",
        error:false
      })
    }else{
      this.setState({
        error:true
      })
    }
  }

  render(){
    return (
      <div className='container SignUpContainer'>
        <div className='container'>
          <h4>Sign Up</h4>
        </div>
        <form className='input-field col s6 FormContainer' onSubmit={this.onSubmitNewUser}>
          <div className='input-field col s6'>
            <label htmlFor="signup_email">Email</label>
              <input
                type='email'
                className="validate"
                id="'signup_email'"
                name='email'
                value={this.state.emailInput}
                onChange={this.handleChange}
                required
              />
            </div>
            <div className='input-field col s6'>
              <label htmlFor="username">Username</label>
              <input
                type='text'
                className='signup_username'
                name='username'
                value={this.state.usernameInput}
                onChange={this.handleChange}
                required
              />
            </div>
            <div className ='input-field col s6'>
              <Select name='borough' onChange={this.handleSelect}>
                <option value='0'>Select Borough</option>
                <option value='1'>Manhattan</option>
                <option value='2'>Queens</option>
                <option value='3'>Bronx</option>
                <option value='4'>Brooklyn</option>
                <option value='5'>Staten Island</option>
              </Select>
            </div>
            <div className='input-field col s6'>
              <label htmlFor="password">Password</label>
              <input
                type='password'
                className='signup_password'
                name='password'
                value={this.state.passwordInput}
                onChange={this.handleChange}
              />
            </div>
            <div className='input-field col s6'>
              <label htmlFor="passwordConfirm">Confirm Password</label>
              <input
                type='password'
                className='confirm_password'
                name='passwordConfirm'
                value={this.state.passwordConfirm}
                onChange={this.handleChange}
              />
            </div>
            <div className="file-field input-field">
              <div className="btn-small waves-effect waves-light">
                <span>Select Image</span>
                  <input
                    type="file"
                    name="avatar"
                    accept=".jpg, .jpeg, .png"
                    onChange={this.handleUploadChange}/>
                    
              </div>
              <button className="btn-small waves-effect waves-light" onClick={this.upload}>Upload</button>
              
              {this.state.didUpload ? 
              <>
              <p>File successfully uploaded</p>
              <br/>
              <button className="btn-small waves-effect waves-light" type="submit" name="action">Sign Up
                <i className="material-icons right">send</i>
              </button>
              </>
              :<h4>Complete form</h4>
            
              }
            </div>
            
        </form>
        {this.props.isLoggedIn
          ? <Redirect to={`/profile/${this.props.auth.userId}`}></Redirect>
          : null }
        {this.state.error?<p>Check Input Entries</p>:null}

        <div className="container">
          <h4>Already a member? <Link to="/login">Login</Link></h4>
        </div>
      </div>
    )
  }

}

export default Signup
