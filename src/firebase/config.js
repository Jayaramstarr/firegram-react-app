import firebase from 'firebase/app'
import 'firebase/storage'
import 'firebase/firestore'
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBxNxincgZVrNu22rR_Olz1pMksvyxk8aE",
    authDomain: "starr-firegram.firebaseapp.com",
    projectId: "starr-firegram",
    storageBucket: "starr-firegram.appspot.com",
    messagingSenderId: "839063286467",
    appId: "1:839063286467:web:7320dbbfe805d304326876"
}
// Initialize Firebase
firebase.initializeApp(firebaseConfig)

const projectStorage = firebase.storage()
const projectFirestore = firebase.firestore()
const timestamp = firebase.firestore.FieldValue.serverTimestamp

export { projectStorage, projectFirestore, timestamp }