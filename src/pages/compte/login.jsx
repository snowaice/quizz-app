import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { JWT_KEY, setLocalStorage, USER_KEY } from '../../services/localStorageService'
import { UserContext } from '../../services/userContextService'
import { handleForm } from '../../services/formService'
import { toast } from "react-toastify";
import { PATH } from '../../services/communService'

export default function Login() {

    const [form, setForm] = useState({
        email:"",
        password:""
    })

    const { setUser } = useContext(UserContext)

    const navigate = useNavigate()

    const handleChange = (event) => {
        handleForm(event,form,setForm)
    }

    const handleSubmit = (event) => {
        event.preventDefault()

        fetch(PATH+`/api/user/login`, {
            method: 'post',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                email: form.email,
                password: form.password
            })
        }).then(response => response.json())
            .then((data) => {
                console.log(data)
                if(data.error){
                    toast.error("Erreur de connexion", {
                        position: "top-right",
                        pauseOnHover: true,
                        draggable: false,
                        progress: undefined,
                    });
                } else {
                    setLocalStorage(USER_KEY, data)
                    setUser(data)
                    navigate('/')
                }
            })
    }

    return (
        <div className='d-flex justify-content-center'>
            {console.log(form)}
            <form onSubmit={handleSubmit} className='d-flex flex-column w-50'>
                <div className="form-group">
                    <label htmlFor='exampleInputEmail1' className="form-label mt-4">Email</label>
                    <input onChange={handleChange} name="email" type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Entrer votre email" />
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1" className="form-label mt-4">Mot de passe</label>
                    <input onChange={handleChange} name="password" type="password" className="form-control" id="exampleInputPassword1" placeholder="Mot de passe" />
                </div>
                <button className='btn btn-outline-primary align-self-center mt-3' type='submit'>Connexion</button>
            </form>
        </div>
    )
}