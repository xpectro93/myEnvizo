import React, { useState, useEffect, useRef } from 'react';
import './signup.css';
import { Redirect, Link } from 'react-router-dom';

import { upload, validateEmail, validateUsername, validateSelect, areEqual, checkEvent } from '../../util/functions.js'

const formDivCss = "input-field col s6"
const buttonCss = "btn-large waves-effect waves-light"


function Signup (props) {
  const [ image, setImage ] = useState(null);
  const [ progress, setProgress ] = useState(0);
  const [ hasUploaded, setHasUploaded ] =useState(false);
  const passRef = useRef(null)


  //combines all input validations to check if all form inputs are valid
  const validateInputs = e => {
    e.preventDefault();
    if(checkEvent(e)){
      const { email, username, password, passwordConfirm, borough } = e.target.parentElement.parentElement.elements;

    let currentProgress = 0;
    //adds 20 points per each validated user input
    currentProgress += validateEmail(email.value) ? 20 : 0;

    currentProgress += validateUsername(username.value) ?  20 : 0;

    currentProgress += validateSelect(borough.value) ? 20 : 0;
 
    currentProgress += areEqual(passwordConfirm.value,password.value) ? 20 : 0;

    currentProgress += hasUploaded ? 20: 0;

    setProgress(currentProgress)
    }
    else return
    
    
  }

  //create user based on input
  const createNewUser = e => {
    debugger
    e.preventDefault();
    if(checkEvent(e)) {
      console.log("returning")
      return
    }
    const email = e.target.children[0].childNodes[1].value
    const username = e.target.children[1].childNodes[1].value
    const borough = e.target.children[2].childNodes[0].value
    const password = e.target.children[3].childNodes[1].value
    
    let newuserData = {
      username: username,
      password:password,
      email:email,
      community_id:Number(borough),
      avatar_img:image
    }
    props.newUser(newuserData);
  }
  // checks if user selected a files and then sets it to image
  const handleImage = e => {
    if(e.target.files[0]) {
      setImage(e.target.files[0])
    }
  }

  //upload profile image
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
    props.checkAuthenticateStatus()
  },[])
  return(
    <div className='container SignUpContainer'>
      <div className='container'>
      <h4>Sign Up</h4>
        <label htmlFor="progress">Progress{` ${progress}%`}</label>
        <div className={"my-range"}>
          <div className={"signup-progress"} style={{width:`${progress}%`,background:`${ progress === 100 ? "rgb(1,53,107)" : "rgb(142,228,175)"}`}}  name="progress">  </div>
        </div>
      </div>

    <form className={`${formDivCss} formContainer`} onSubmit={createNewUser} onBlur={validateInputs}>
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
          <button className={buttonCss} onClick={uploadImage}>Upload</button>
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
        className={` ${buttonCss} ${hasUploaded && progress === 100 ? "" : ""}`} 
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

export default Signup
