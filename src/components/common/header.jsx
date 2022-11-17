import React,{ useContext} from 'react'
import NavItem from './navItem'

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UserContext } from '../../services/userContextService';

export default function Header() {
    const { user } = useContext(UserContext)
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">Quizz</a>
    

        <div className="collapse navbar-collapse" id="navbarColor03">
          <ul className="navbar-nav me-auto">
            <NavItem url="/" itemName="Accueil" isActive={true} />
            {
            (user?.id) ?
                (
                    <>        
                      <NavItem url="/classement" itemName="Classement" isActive={false} />
                    </>
                    
              
                ) :
                (
                  <><NavItem url="/login" itemName="Se connecter" isActive={false} /><NavItem url="/registration" itemName="S'enregistrer" isActive={false} /></>
                )
            
            }
          </ul>
          {
             (user?.id) ?(
              <>
                <span className='nav-item'><a class="nav-link">Connecté en tant que : {user.username}</a></span>
                <span className='nav-item'><a class="nav-link" href="/logout">Se déconnecter</a></span>
               
              </>
             ):(
              ""
             )
          }
      
        </div>
      </div>
      <ToastContainer />
    </nav>
  )
}