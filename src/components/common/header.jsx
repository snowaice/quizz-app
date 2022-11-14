import React,{ useContext} from 'react'
import NavItem from './navItem'
import { ToastContainer, toast } from 'react-toastify';
import { UserContext } from '../../services/userContextService';

export default function Header() {
    const { user } = useContext(UserContext)
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">Quizz</a>
    

        <div className="collapse navbar-collapse" id="navbarColor03">
          <ul className="navbar-nav me-auto">
            <NavItem url="/" itemName="Accueil" isActive={true} />
            {
            (user?.id) ?
                (
                    <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">{user.username}</a>
                        <div className="dropdown-menu">
                            <a className="dropdown-item" href="/profil">Profil</a>
                            <a className="dropdown-item" href="/admin">Admin</a>
                            <a className="dropdown-item" href="/Logout">Se déconnecter</a>
                        </div>
                    </li>
                ) :
                (
                  <><NavItem url="/login" itemName="Se connecter" isActive={false} /><NavItem url="/registration" itemName="S'enregistrer" isActive={false} /></>
                )
            }
          </ul>-
        </div>
      </div>
      <ToastContainer />
    </nav>
  )
}