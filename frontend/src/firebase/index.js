import firebase from "firebase/app";
import "firebase/storage";

const firebaseConfig = {
    apiKey: process.env.REACT_APP_Firebase_APIKEY,
    authDomain: "upload-80d65.firebaseapp.com",
    databaseURL: "https://upload-80d65.firebaseio.com",
    projectId: "upload-80d65",
    storageBucket: "upload-80d65.appspot.com",
    messagingSenderId: "383907250768",
    appId: process.env.REACT_APP_Firebase_AppId,
    measurementId: "G-59M4PQRGJK"
  };
  
  
  firebase.initializeApp(firebaseConfig);
  const storage = firebase.storage();

  export { storage, firebase as default };