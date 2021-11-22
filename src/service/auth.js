import firebase from "firebase";
import { fs } from "../config/firebase.js";

const googleAuth = (provider) => {
    return firebase
        .auth()
        .signInWithPopup(provider)
        .then((res) => {
            var user = res.user;
            var providerData = user.providerData[0];
            
            let urlImg = "https://firebasestorage.googleapis.com/v0/b/sky-loja.appspot.com/o/default-image.jpg?alt=media&token=1f5a3516-a00f-4edc-a0ac-743ff0e60814";
            fs.collection('Users').doc(res.user.uid).set({
                url: urlImg,
                nome: providerData.displayName,
                email:  providerData.email,
            })
        })
        .catch((er) => {
            return er;
        })
};

export default googleAuth;