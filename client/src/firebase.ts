// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDB9iPbxgPI1f8MkrLY0MrKQ1lQy53xa_Q",
  authDomain: "tinkerers-8ac13.firebaseapp.com",
  projectId: "tinkerers-8ac13",
  storageBucket: "tinkerers-8ac13.appspot.com",
  messagingSenderId: "593679050490",
  appId: "1:593679050490:web:3c70106d82bf64ec704b43",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;
