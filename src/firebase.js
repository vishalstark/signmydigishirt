import firebase from 'firebase';
const firebaseApp = firebase.initializeApp({
        apiKey: "AIzaSyBr7auUt66EL3Z1QujQbi8YHkxMfHWrbWw",
        authDomain: "signmydigishirt.firebaseapp.com",
        databaseURL: "https://signmydigishirt.firebaseio.com",
        projectId: "signmydigishirt",
        storageBucket: "signmydigishirt.appspot.com",
        messagingSenderId: "609083772983",
        appId: "1:609083772983:web:a74f6f3b4ef1a109392fb2",
        measurementId: "G-41GR7D6NEY"
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage }