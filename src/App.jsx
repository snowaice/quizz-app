import './App.css';
import React, { useState } from 'react';
import { Routes, Route } from "react-router-dom";
import Accueil from './pages/accueil';
import Header from './components/common/header';
import Register from './pages/compte/register';
import { contextPrototype, UserContext } from './services/userContextService';
import Footer from './components/common/footer';
import Login from './pages/compte/login';
import { getLocalStorage, USER_KEY } from './services/localStorageService';
import Logout from './pages/compte/logout';
import Question from './pages/quizz/quizzQuestion';
import Classement from './pages/quizz/classement';

function App() {

  const [user, setuser] = useState(getLocalStorage(USER_KEY))

  contextPrototype.user = user
  contextPrototype.setUser = setuser
  return (
    <UserContext.Provider value={contextPrototype}>
      <Header/>
      <main  style={{minHeight : "82vh"}}>
        
        <Routes>
              <Route path='/' element={<Accueil/>}/>
              <Route path='/registration' element={<Register/>}/>
              <Route path='/login' element={<Login/>}/>
              <Route path='/logout' element={<Logout/>}/>
              <Route path='/classement' element={<Classement/>}/>
              <Route path='/quizz/:id' element={<Question/>}/>
              
        </Routes>
      </main>
      <Footer/>
    </UserContext.Provider>
  );
}

export default App;