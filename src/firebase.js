import firebase from 'firebase/app'

const firebaseConfig = {
  apiKey: "AIzaSyD5yTm9kakXhZeqIW0hj_3w0PRyfDCAOqk",
  authDomain: "exless-455f4.firebaseapp.com",
  databaseURL: "https://exless-455f4-default-rtdb.firebaseio.com",
  projectId: "exless-455f4",
  storageBucket: "exless-455f4.appspot.com",
  messagingSenderId: "661553876416",
  appId: "1:661553876416:web:31230c225771e8a8920c25"
};

const fm = firebase.initializeApp(firebaseConfig);

export { fm }