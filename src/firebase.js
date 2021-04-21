import firebase from 'firebase/app'
import 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCH-ImXFqVX4fmW1kqU3z6Av7zwmgupTBk",
    authDomain: "honeywell-mediscan.firebaseapp.com",
    databaseURL: "https://honeywell-mediscan-default-rtdb.firebaseio.com",
    projectId: "honeywell-mediscan",
    storageBucket: "honeywell-mediscan.appspot.com",
    messagingSenderId: "105799321948",
    appId: "1:105799321948:web:1032cdeeff3d8bb1d7d999"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export {firebase}
