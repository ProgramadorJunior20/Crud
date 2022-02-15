import firebase from "firebase/app"
import 'firebase/firestore'
import 'firebase/auth'


const firebaseConfig = {
    apiKey: "AIzaSyCRHDlVRazEiFloTCFop0N6QH-BSCH8Zl8",
    authDomain: "fir-crud-945bd.firebaseapp.com",
    projectId: "fir-crud-945bd",
    storageBucket: "fir-crud-945bd.appspot.com",
    messagingSenderId: "88949704993",
    appId: "1:88949704993:web:9d7e5cb8e2bb3246391660"
};
  
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore()
const auth = firebase.auth()

export {db, auth}
