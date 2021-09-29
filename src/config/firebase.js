import { initializeApp } from "firebase/app";
import { getAuth} from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyB49qjKQeSdRmqMhCUsmM5H6i2nHPJS2bw",
    authDomain: "sky-loja.firebaseapp.com",
    projectId: "sky-loja",
    storageBucket: "sky-loja.appspot.com",
    messagingSenderId: "899938610348",
    appId: "1:899938610348:web:c35766eb96591c6eea0309",
    measurementId: "G-EL311F8L2K"
  };

  const firebase = initializeApp(firebaseConfig);
  const auth = getAuth();


  export {auth,firebase};