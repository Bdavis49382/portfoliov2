import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyChmc1qG6oexSh988coGFMR9QJEZXmqVr0",
  authDomain: "portfolio-d9972.firebaseapp.com",
  projectId: "portfolio-d9972",
  storageBucket: "portfolio-d9972.appspot.com",
  messagingSenderId: "689754287581",
  appId: "1:689754287581:web:0e9f47944fb0bfd0945a34",
  
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export { firebase };