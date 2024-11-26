import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {FirebaseContext} from './store/Context'
import Context from './store/Context'
// import firebase from './firebase/config';
import {app} from './firebase/config'; 
import { auth, db } from './firebase/config';
ReactDOM.render(
<FirebaseContext.Provider value={{app, auth, db}}>
    <Context>
    <App />
    </Context>
    
</FirebaseContext.Provider>, 
document.getElementById('root'));
