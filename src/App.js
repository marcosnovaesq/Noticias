import React, { useState, useEffect } from 'react';
import './App.css';
import Routes from './routes';
import jwt from 'jsonwebtoken';
import UserContext from './context/usercontext';
import { getToken } from './config/auth';


function App() {

  const [loggedUser, setLoggedUser] = useState({})

  const getUserFromToken = async () => {
    try {
      const { user } = await jwt.decode(getToken())
      setLoggedUser(user)
    } catch (error) {
      setLoggedUser({})
    }

  }

  useEffect(() => {
    getUserFromToken()
    return () => { }
  }, [])

  return (

    <UserContext.Provider value={{ usuarioLogado: loggedUser, setUsuarioLogado: setLoggedUser }}>
      <Routes />
    </UserContext.Provider>

  );
}

export default App;
