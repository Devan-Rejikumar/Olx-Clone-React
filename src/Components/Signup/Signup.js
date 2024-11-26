// import React, { useState, useContext } from 'react';
// import { createUserWithEmailAndPassword, updateProfile, getAuth} from "firebase/auth";
// // import { useNavigate } from 'react-router-dom';
// import { useHistory } from 'react-router-dom';
// import Logo from '../../olx-logo.png';
// import './Signup.css';
// import { getFirestore, collection, addDoc } from "firebase/firestore"
// import { FirebaseContext } from '../../store/FirebaseContext';
// // import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
// export default function Signup() {
//   // const navigate = useNavigate();
//   const history = useHistory();
//   const [username, setUsername] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [phone, setPhone] = useState('');
//   const { app } = useContext(FirebaseContext);
//   const auth = getAuth(app);
//   const db = getFirestore(app)
//   const handleSubmit = (e) => {
//     e.preventDefault();
  
//     createUserWithEmailAndPassword(auth, email, password)
//       .then((result) => {
//         updateProfile(result.user, { displayName: username }).then(() => {
//           const db = getFirestore(app); // Import and use Firestore
//           db.collection('user')
//             .add({
//               id: result.user.uid,
//               username: username,
//               phone: phone,
//             })
//             .then(() => {
//               history.push("/login"); // Use navigate instead of history.push
//             });
//         });
//       })
//       .catch((error) => {
//         console.error('Error creating user:', error.message);
//       });
//   };
//   // const handleSubmit = async (e) => {
//   //   e.preventDefault();

//   //   try {
//   //     const userCredential = await createUserWithEmailAndPassword(auth, email, password);
//   //     const user = userCredential.user;
//   //     await updateProfile(user, { displayName: username });
//   //     console.log('User created and profile updated:', user);
//   //   } catch (error) {
//   //     console.error('Error signing up:', error.message);
//   //   }
//   // };

//   return (
//     <div>
//       <div className="signupParentDiv">
//         <img width="200px" height="200px" src={Logo}></img>
//         <form onSubmit={handleSubmit}>
//           <label htmlFor="fname">Username</label>
//           <br />
//           <input
//             className="input"
//             type="text"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//             id="fname"
//             name="name"
//             defaultValue="John"
//           />
//           <br />
//           <label htmlFor="fname">Email</label>
//           <br />
//           <input
//             className="input"
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             id="fname"
//             name="email"
//             defaultValue="John"
//           />
//           <br />
//           <label htmlFor="lname">Phone</label>
//           <br />
//           <input
//             className="input"
//             type="number"
//             value={phone}
//             onChange={(e) => setPhone(e.target.value)}
//             id="lname"
//             name="phone"
//             defaultValue="Doe"
//           />
//           <br />
//           <label htmlFor="lname">Password</label>
//           <br />
//           <input
//             className="input"
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             id="lname"
//             name="password"
//             defaultValue="Doe"
//           />
//           <br />
//           <br />
//           <button>Signup</button>
//         </form>
//         <a>Login</a>
//       </div>
//     </div>
//   );
// }
import React, { useState, useContext } from 'react';
import { createUserWithEmailAndPassword, updateProfile, getAuth } from "firebase/auth";
import { useHistory } from 'react-router-dom'; // Use useHistory for React Router v5
import Logo from '../../olx-logo.png';
import './Signup.css';
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { FirebaseContext } from '../../store/Context';

export default function Signup() {
  const history = useHistory(); // Using useHistory hook from React Router v5
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const { app } = useContext(FirebaseContext);
  const auth = getAuth(app);
  const db = getFirestore(app);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password.length < 6) {
      alert("Password should be at least 6 characters.");
      return;
    }
  
    console.log('Form Submitted')

    // Create user with email and password
    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        // Update user's profile with the username
        updateProfile(result.user, { displayName: username }).then(() => {
          // Add user data to Firestore
          const usersCollection = collection(db, 'user');
          addDoc(usersCollection, {
            id: result.user.uid,
            username: username,
            phone: phone,
          })
            .then(() => {
              // Navigate to the login page
              history.replace("/login"); // Use history.push() to navigate in React Router v5
            })
            .catch((error) => {
              console.error("Error adding document to Firestore:", error.message);
            });
        });
      })
      .catch((error) => {
        console.error('Error creating user:', error.message);
      });
  };
 

  return (
    <div>
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo} alt="Logo" />
        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className="input"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            id="fname"
            name="name"
          />
          <br />
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id="fname"
            name="email"
          />
          <br />
          <label htmlFor="lname">Phone</label>
          <br />
          <input
            className="input"
            type="number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            id="lname"
            name="phone"
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            id="lname"
            name="password"
          />
          <br />
          <br />
          <button type="submit">Signup</button>
        </form>
        <a href="/login">Login</a> {/* Use a link to navigate to login page */}
      </div>
    </div>
  );
}
