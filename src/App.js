import React, { useState, useEffect, useContext } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom/cjs/react-router-dom.min';
import Signup from './Pages/Signup'
import Login from './Pages/Login'
import { FirebaseContext } from './store/Context';
// const { auth } = useContext(FirebaseContext);
import Create from './Pages/Create'

import { AuthContext } from './store/Context'
import './App.css';
import View from './Pages/ViewPost'
import Post from './store/PostContext'
/**
 * ?  =====Import Components=====
 */
import Home from './Pages/Home';

function App() {
  const { user, setUser } = useContext(AuthContext)
  // const {firebase} =useContext(FirebaseContext)
  const { auth } = useContext(FirebaseContext);
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUser(user)
    })
  }, [auth, setUser])
  return (
    <div>
      <Post>
        <Router>
          <Route exact path='/' >
            <Home />
          </Route>
          <Route path='/signup' >
            <Signup />
          </Route>
          <Route path='/login' >
            <Login />
          </Route>
          <Route path='/create' >
            <Create />
          </Route>
          <Route path='/view' >
            <View />
          </Route>

        </Router>
      </Post>

    </div>
  );
}

export default App;
