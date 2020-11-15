import React, { useState, useEffect, useRef } from 'react';
import '../css/signup.css';
import { Redirect, Link } from 'react-router-dom';

import { upload, validateEmail, validateUsername, validateSelect, areEqual, checkEvent } from '../util/functions.js'

const formDivCss = "input-field col s6"



function Signup (props) {
  const [ image, setImage ] = useState(null);
  const [ progress, setProgress ] = useState(0);
  const [ hasUploaded, setHasUploaded ] =useState(false);
  const passRef = useRef(null)
  const validateInputs = e => {
    e.preventDefault();
    if(checkEvent(e)) return
    
    const { email, username, password, passwordConfirm, borough } = e.target.parentElement.parentElement.elements;

    let currentProgress = 0;

    currentProgress += validateEmail(email.value) ? 20 : 0;

    currentProgress += validateUsername(username.value) ?  20 : 0;

    currentProgress += validateSelect(borough.value) ? 20 : 0;
 
    currentProgress += areEqual(passwordConfirm.value,password.value) ? 20 : 0;

    currentProgress += hasUploaded ? 20: 0;

    setProgress(currentProgress)
    /*
    borough id = int
    */
    // let newuserData = {
    //   username: this.state.username,
    //   password:this.state.password,
    //   email:this.state.email,
    //   community_id:+this.state.borough,
    //   avatar_img:this.state.avatar_img
    // }

    // if(this.state.password===this.state.passwordConfirm){
    //   this.props.newUser(newuserData);

    // }else{
    //   // this.setState({
    //   //   error:true
    //   // })
    // }
  }

  const createNewUser = e => {
    e.preventDefault();

  }
  const handleImage = e => {
    if(e.target.files[0]) {
      setImage(e.target.files[0])
    }
  }
  const uploadImage = e => {
    e.preventDefault();
    e.persist();
    upload(image, setImage);
    setHasUploaded(true);
    setTimeout(()=> {
      passRef.current.focus()
    },500)
    
    
    
  }
  useEffect(()=> {
    console.log(props)
    props.checkAuthenticateStatus()
  },[])
  return(
    <div className='container SignUpContainer'>
      <div className='container'>
      <h4>Sign Up</h4>
        <label htmlFor="progress">Progress{` ${progress}%`}</label>
        <div className={"my-range"}>
          <div className={"progress"} style={{width:`${progress}%`,background:`${ progress === 100 ? "rgb(1,53,107)" : "rgb(142,228,175)"}`}}  name="progress">  </div>
        </div>
      </div>

    <form className={`${formDivCss} formContainer`}  onBlur={validateInputs}>
      <div className={formDivCss}>
        <label htmlFor="signup_email">Email</label>
          <input
            type='email'
            className="validate"
            id="'signup_email'"
            name='email'
            required
          />
      </div>

      <div className={formDivCss}>
        <label htmlFor="username">Username</label>
        <input
          type='text'
          name='username'
          required
        />
      </div>

      <div className={formDivCss}>
      <select name='borough' required>
        <option value='0'>Select Borough</option>
        <option value='1'>Manhattan</option>
        <option value='2'>Queens</option>
        <option value='3'>Bronx</option>
        <option value='4'>Brooklyn</option>
        <option value='5'>Staten Island</option>
      </select>

      </div>

      <div className={formDivCss}>
        <label htmlFor="password">Password</label>
        <input
          type='password'
          name='password'
          required
        />
      </div>

      <div className={formDivCss}>
        <label htmlFor="passwordConfirm">Confirm Password</label>
        <input
          type='password'
          name='passwordConfirm'
          ref={passRef}
          required
        />
      </div>
           
      <div className={`img-container`} 
        style ={{display:"flex", alignContent:"center",justifyContent:"space-between"}}>
        
        
        {image ?
        <>
          <button className="btn-large waves-effect waves-light" onClick={uploadImage}>Upload</button>
          {hasUploaded?<p id="msg-upload">Upload Successful</p>: null}
        </>
        : 
        <>
        <label id={"upload-button"} htmlFor={'file-upload'}> SELECT IMAGE</label>
          <input
            id={"file-upload"}
            type="file"
            name="avatar"
            accept=".jpg, .jpeg, .png"
            onChange={handleImage}
          />
          
        </>}
    
      </div>
      <div className={formDivCss} style={{display:"flex", justifyContent:"center"}}>
      <button 
        className={`btn-large waves-effect waves-light ${hasUploaded && progress === 100 ? "" : "disabled"}`} 
        type="submit" name="action">Sign Up<i className="material-icons right">send</i>
      </button>
      </div>
    </form>
    {props.isLoggedIn ? 
      <Redirect to={`/profile/${props.auth.userId}`}></Redirect>
      : null
    }

    <div className="container">
      <h4>Already a member? <Link to="/login">Login</Link></h4>
    </div>
</div>
  )
}




// class Signup extends Component {
//   state = {
//     progress:0,
//     email:'',
//     username:'',
//     password:'',
//     passwordConfirm:'',
//     borough:1,
//     avatar_img:null,
//     error:false,
//     didUpload: false,
//     image:null
//   }

//   componentDidMount(){
//   this.props.checkAuthenticateStatus()
//   }

//   handleChange = e => {
//     this.setState({
//       [e.target.name]: e.target.value
//     })
//   }
//   handleUploadChange = e => {
//     if(e.target.files[0]) {
//       this.setState({image:e.target.files[0]})
//     }
//   }
//   handleSelect = e => {
//     this.setState({
//       borough: e.target.value
//     })
//   }

//   uploadImage = (e) => {
//     e.preventDefault();
//     const { image } = this.state

//     upload(image, this.successfulUpload)

//   }
//   successfulUpload = (url) => {
//     this.setState({ avatar_img:url, didUpload: true })
//   }

//   onSubmitNewUser = e => {
//     e.preventDefault();
//     let newuserData = {
//       username: this.state.username,
//       password:this.state.password,
//       email:this.state.email,
//       community_id:+this.state.borough,
//       avatar_img:this.state.avatar_img
//     }

//     if(this.state.password===this.state.passwordConfirm){
//       this.props.newUser(newuserData);
//       this.setState({
//         username:"",
//         password:"",
//         passwordConfirm:'',
//         borough:1,
//         email:"",
//         avatar_img:"",
//         error:false
//       })
//     }else{
//       this.setState({
//         error:true
//       })
//     }
//   }
//   listen =(e)=> {
//    let firstTest = this.validateEmail(e.target.value);
//     console.log(firstTest);
//    let secondTest
//   }
//   isValidPunctuation( input ) {
//     let periodIndex = input.indexOf(".");
//       if(input[periodIndex  + 1] === "." || input[periodIndex  - 1] ===".") {
//         return false;
//       }
//       return true;
//   }
//   validateEmail(input) {

//     let isOnlyLatinChar = input.match(/[^a-z0-9@\.]/);
//     let [userName, domain] = input.split('@')
//     let isValidPunctuationUser = true;
//     let isValidPunctuationDomain = false;
//     let emailLengthCheck = input.length <= 128
//     if(userName.includes(".")){
//       isValidPunctuationUser = this.isValidPunctuation(userName)
//     }
//     if(domain.includes(".")) {
//       isValidPunctuationDomain = this.isValidPunctuation(domain)
//     }

//     console.log(isOnlyLatinChar, isValidPunctuationDomain,isValidPunctuationUser,emailLengthCheck)
//     return(
//           !isOnlyLatinChar && 
//           isValidPunctuationDomain && 
//           isValidPunctuationUser && 
//           emailLengthCheck
//           )
//   }
//   validateUsername(input){
//     return input.length > 1 && input.length < 33;
//   }
//   render(){
//     const { progress } = this.state
//     return (
//       <div className='container SignUpContainer'>
//         <div className='container'>
//           <h4>Sign Up</h4>
//           <input 
//             type="range" 
//             id="volume" 
//             name="volume"
//             readOnly={progress}
//             min="0" max="100" />
//       <label htmlFor="volume">Progress{` ${progress}%`}</label>
//         </div>
//         <form className='input-field col s6 FormContainer'onBlur={this.listen} onSubmit={this.onSubmitNewUser}>
//           <input type="text" name="testo"/>
//           <div className='input-field col s6'>
//             <label htmlFor="signup_email">Email</label>
//               <input
//                 type='email'
//                 className="validate"
//                 id="'signup_email'"
//                 name='email'
//                 value={this.state.emailInput}
//                 onChange={this.handleChange}
//                 required
//               />
//             </div>
//             <div className='input-field col s6'>
//               <label htmlFor="username">Username</label>
//               <input
//                 type='text'
//                 className='signup_username'
//                 name='username'
//                 value={this.state.usernameInput}
//                 onChange={this.handleChange}
//                 required
//               />
//             </div>
//             <div className ='input-field col s6'>
//               <Select name='borough' onChange={this.handleSelect} required>
//                 <option value='0'>Select Borough</option>
//                 <option value='1'>Manhattan</option>
//                 <option value='2'>Queens</option>
//                 <option value='3'>Bronx</option>
//                 <option value='4'>Brooklyn</option>
//                 <option value='5'>Staten Island</option>
//               </Select>
//             </div>
//             <div className='input-field col s6'>
//               <label htmlFor="password">Password</label>
//               <input
//                 type='password'
//                 className='signup_password'
//                 name='password'
//                 value={this.state.passwordInput}
//                 onChange={this.handleChange}
//                 required
//               />
//             </div>
//             <div className='input-field col s6'>
//               <label htmlFor="passwordConfirm">Confirm Password</label>
//               <input
//                 type='password'
//                 className='confirm_password'
//                 name='passwordConfirm'
//                 value={this.state.passwordConfirm}
//                 onChange={this.handleChange}
//                 required
//               />
//             </div>
//             <div className="file-field input-field">
//               <div className="btn-small waves-effect waves-light">
//                 <span>Select Image</span>
//                   <input
//                     type="file"
//                     name="avatar"
//                     accept=".jpg, .jpeg, .png"
//                     onChange={this.handleUploadChange}
//                 />
                    
//               </div>
//               {this.state.avatar_img ?<button className="btn-small waves-effect waves-light" onClick={this.uploadImage}>Upload</button> : null}
//               <br/>
//               <button className={`btn-small waves-effect waves-light ${!this.state.didUpload ? "disabled" : ""}`} type="submit" name="action">Sign Up
//                 <i className="material-icons right">send</i>
//               </button>



//             </div>
            
//         </form>
//         {this.props.isLoggedIn
//           ? <Redirect to={`/profile/${this.props.auth.userId}`}></Redirect>
//           : null }
//         {this.state.error?<p>Check Input Entries</p>:null}

//         <div className="container">
//           <h4>Already a member? <Link to="/login">Login</Link></h4>
//         </div>
//       </div>
//     )
//   }

// }

export default Signup
