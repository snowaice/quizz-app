import logo from './logo.svg';
import './App.css';
import React from 'react';
import { Routes, Route } from "react-router-dom";
import Accueil from './pages/accueil';

function App() {
  return (
    <main  style={{minHeight : "88vh"}}>
      <Routes>
            <Route path='/' element={<Accueil/>}/>
      </Routes>
    </main>
  );
}

export default App;
