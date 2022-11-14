import React,{ useContext} from 'react'
import NavItem from './navItem'
import { ToastContainer } from "react-toastify";

export default function Header() {
  
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">Quizz</a>
    

        <div className="collapse navbar-collapse" id="navbarColor03">
          <ul className="navbar-nav me-auto">
            <NavItem url="/" itemName="Accueil" isActive={true} />
            <NavItem url="/login" itemName="Connexion" isActive={false} />
            <NavItem url="/registration" itemName="Inscription" isActive={false} />
          </ul>
        </div>
      </div>
      <ToastContainer closeButton={false} position="bottom-right"/>
    </nav>
  )
}