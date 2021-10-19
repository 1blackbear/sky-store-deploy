import firebase from 'firebase'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'



const firebaseConfig = {
    apiKey: "AIzaSyB49qjKQeSdRmqMhCUsmM5H6i2nHPJS2bw",
    authDomain: "sky-loja.firebaseapp.com",
    projectId: "sky-loja",
    storageBucket: "sky-loja.appspot.com",
    messagingSenderId: "899938610348",
    appId: "1:899938610348:web:c35766eb96591c6eea0309",
    measurementId: "G-EL311F8L2K"
  };

  const firebaseStart = firebase.initializeApp(firebaseConfig);
  const auth = firebase.auth();
  const fs = firebase.firestore();
  const storage = firebase.storage();


  export {auth,firebaseStart, fs, storage};
