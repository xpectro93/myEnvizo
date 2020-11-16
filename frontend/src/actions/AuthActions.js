import axios from 'axios'
import Auth from "../util/Auth.js"

export const NEW_USER = "NEW_USER";
export const LOG_IN = "LOG_IN";
export const CURRENT_USER = "CURRENT_USER"

//logs out the user
export const logout = () => dispatch => {
  axios
    .post("/api/sessions/logout")
    .then(() => {
      Auth.deauthenticateUser();
    })
    .then(() => {

      checkAuthenticateStatus();
    });
}
//checks if the user has the same id on the frontend as the user on the backend
export const checkAuthenticateStatus = () => dispatch => {


  axios
    .get("/api/sessions/isLoggedIn").then(user => {

    if (user.data.id === Number(Auth.getToken())){


      dispatch({
        type:LOG_IN,
        payload:user.data
      })

      dispatch(loadCurrent())

    } 
    else {
      if (user.data.id) {
        logout()
      } else {
        Auth.deauthenticateUser();
      }
    }
  })

  ;
}

//creates new user takes in an object as input
export const newUser = newUserData => dispatch => {
  axios
  .post("/api/sessions/new", newUserData)
    .then(res => {
      dispatch({
        type:NEW_USER,
        user:res
      })
      //after creating user, logs in the new user.
      axios
      .post("/api/sessions/login",{username:newUserData.username, password:newUserData.password})
        .then(res => {
          Auth.authenticateUser(res.data.id);
          dispatch({
            type:LOG_IN,
            payload:res.data.id
          })
        })
      .then(()=> {
        checkAuthenticateStatus()
      })
    })

}

//Logsin user
export const logIn = logInData => dispatch => {
  axios
  .post("/api/sessions/login", logInData)
    .then(res => {

      Auth.authenticateUser(res.data.id);
      dispatch({
        type:LOG_IN,
        payload:res.data
      })

    })
    .then(()=> {

      checkAuthenticateStatus();

    })
    .catch(err=> {
      console.log(err);
    })
}

//loads current user based on the local storage token.
export const loadCurrent = () => dispatch => {
  axios
  .get(`/api/users/${+Auth.getToken()}`)
    .then(res => {
      dispatch({
        type:CURRENT_USER,
        payload:res.data.user
      })
    })
    .catch(err => {
      console.log(err);
    })

}
