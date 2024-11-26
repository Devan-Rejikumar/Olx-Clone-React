// // import firebase from 'firebase'
// import { getAuth } from "firebase/auth"; 
// import { getFirestore } from "firebase/firestore"; 
// // import 'firebase/firebase'
// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyA3W-qO5tfTidIKTjJsq-SZ2w73MdyjGzk",
//   authDomain: "olx-clone-cc483.firebaseapp.com",
//   projectId: "olx-clone-cc483",
//   storageBucket: "olx-clone-cc483.firebasestorage.app",
//   messagingSenderId: "452977226069",
//   appId: "1:452977226069:web:d230a15df59b7256e03fdc",
//   measurementId: "G-HZGDDSQFK3"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// // const analytics = getAnalytics(app);

//  const auth = getAuth(app); 
//  const db = getFirestore(app); 
// export {app, auth, db};
import { getAuth } from "firebase/auth"; 
import { getFirestore } from "firebase/firestore"; 
import { initializeApp } from "firebase/app";
// import 'firebase/storage'
import { getStorage } from "firebase/storage";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA3W-qO5tfTidIKTjJsq-SZ2w73MdyjGzk",
  authDomain: "olx-clone-cc483.firebaseapp.com",
  projectId: "olx-clone-cc483",
  storageBucket: "olx-clone-cc483.firebasestorage.app",
  messagingSenderId: "452977226069",
  appId: "1:452977226069:web:d230a15df59b7256e03fdc",
  measurementId: "G-HZGDDSQFK3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app); 
const db = getFirestore(app); 
const storage = getStorage(app);

export { app, auth, db, storage };


