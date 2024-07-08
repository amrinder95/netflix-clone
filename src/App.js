import React, { useEffect } from 'react';
import './App.css';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import ProfileScreen from './screens/ProfileScreen';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { auth } from './firebase';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout, selectUser } from './features/userSlice';

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(userAuth => {
      if (userAuth) {
        //Logged In
        dispatch(
          login({
          uid: userAuth.uid,
          email: userAuth.email,
        }));
      } else {
        //Logged Out
        dispatch(logout());
      }
    });

    return unsubscribe;
  }, [dispatch])

  return (
    <div className="app">
      <Router>
        {!user ? (
          <LoginScreen />
        ) : ( 
          <Routes>
            <Route path='/' element={<HomeScreen />} />
            <Route path ='/profile' element={<ProfileScreen />}/>
          </Routes>
          )}
      </Router>
    </div>
  );
}

export default App;
