import React, { useContext, useState } from 'react'
import { checkChamps, checkChampsNotEmpty, handleForm } from '../../services/formService'
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom'
import { setLocalStorage,JWT_KEY,USER_KEY } from '../../services/localStorageService';
import { UserContext } from '../../services/userContextService'
import { PATH } from '../../services/communService';
import {decode as base64_decode, encode as base64_encode} from 'base-64';

export default function Register() {
    const { setUser } = useContext(UserContext)

    const navigate = useNavigate()

    const [form,setForm] = useState({
        firstname:"",
        lastname:"",
        email:"",
        password:"",
        confirmPassword:""
    })

    const handleChange = (event)=>{
        handleForm(event,form,setForm)
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        if(checkChampsNotEmpty(form) == false){
            return
        }
    
        if(form.password != form.confirmPassword)
        {
            toast.error("Mot de passe différent");
            return
        }

        fetch(PATH+"/api/user", {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                userName: form.firstname,
                firstName: form.firstname,
                lastName: form.lastname,
                email: form.email,
                password: form.password,
                confirmPassword: form.confirmPassword
            })
        }).then(response => response.json())
            .then((data) => {
                console.log(data)
                if(data.error){
                    toast.error(data.status+" "+data.error);
                } else {
                    data["mdp"] = base64_encode(form.email+":"+form.password)
                    //setLocalStorage(JWT_KEY, data.jwt)
                    setLocalStorage(USER_KEY, data)
                    setUser(data)
                    navigate('/')
                    toast.success("Compte enregistrer avec succès");
                }
            })
    }
    return (
        <div className='d-flex justify-content-center'>
            <form onSubmit={handleSubmit} className='d-flex flex-column w-50'>
            <div className="form-group">
                    <label htmlFor='lastname' className="form-label mt-4">Nom</label>
                    <input onChange={handleChange} name="lastname" type="text" className="form-control" id="lastname" aria-describedby="lastnameHelp" placeholder="Entrer votre nom" />
                </div>
                <div className="form-group">
                    <label htmlFor='firstname' className="form-label mt-4">Prenom</label>
                    <input onChange={handleChange} name="firstname" type="text" className="form-control" id="firstname" aria-describedby="pseudoHelp" placeholder="Entrer votre prénom" />
                </div>
                <div className="form-group">
                    <label htmlFor='email' className="form-label mt-4">Email</label>
                    <input onChange={handleChange} name="email" type="email" className="form-control" id="email" aria-describedby="emailHelp" placeholder="Entrer votre email" />
                </div>
                <div className="form-group">
                    <label htmlFor="password" className="form-label mt-4">Mot de passe</label>
                    <input onChange={handleChange} name="password" type="password" className="form-control" id="password" placeholder="Mot de passe" />
                </div>
                <div className="form-group">
                    <label htmlFor="confirmPassword" className="form-label mt-4">Confirmation du mot de passe</label>
                    <input onChange={handleChange} name="confirmPassword" type="password" className="form-control" id="confirmPassword" placeholder="Confirmation du mot de passe" />
                </div>
                <button className='btn btn-outline-success align-self-center mt-3' type='submit'>S'enregistrer</button>
            </form>
         
        </div>

    )
}