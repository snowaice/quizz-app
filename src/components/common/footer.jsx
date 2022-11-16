import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {

    return (
        <footer className="bg-light text-center text-lg-start">

            <div className="text-center p-3">
            <p className="text-dark">Copyright © 2022. Tous droits réservés.</p>
            <div className='d-flex justify-content-center'> 
                <Link to="/"><i className="fa-brands fa-facebook ms-2 fs-3 text-primary"></i></Link>
                <Link to="/"><i className="fa-brands fa-instagram ms-2 fs-3" style={{ color: "#833ab4" }} ></i></Link>
                <Link to="/"><i className="fa-brands fa-twitter ms-2 fs-3" style={{ color: "rgb(72 216 223)" }} ></i></Link>
            </div>
            </div>
    
        </footer>
    )
}