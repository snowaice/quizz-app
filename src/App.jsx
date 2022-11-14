import logo from './logo.svg';
import './App.css';
import React from 'react';
import { Routes, Route } from "react-router-dom";
import Accueil from './pages/accueil';
import Header from './components/common/header';
import Register from './pages/compte/register';
import Appscc from './pages/compte/login';
import { contextPrototype, UserContext } from './services/userContextService';
import Footer from './components/common/footer';

function App() {
  return (
    <UserContext.Provider value={contextPrototype}>
      <Header/>
      <main  style={{minHeight : "82vh"}}>
        
        <Routes>
              <Route path='/' element={<Accueil/>}/>
              <Route path='/registration' element={<Register/>}/>
              <Route path='/login' element={<Appscc/>}/>
        </Routes>
      </main>
      <Footer/>
    </UserContext.Provider>
  );
}

export default App;
