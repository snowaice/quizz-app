import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { PATH } from '../../services/communService'
import { UserContext } from '../../services/userContextService'

export default function Quizz() {
    const { user } = useContext(UserContext)
    const [Quizz, setQuizz] = useState([])
    useEffect(() => {
    fetch(PATH+"/api/quizz", {
        method: 'GET',
        headers: {
            'content-type': 'application/json'
        },
        mode: 'cors',
    }).then(response => response.json())
        .then((data) => {
            console.log(data)
            if(data.error){
                toast.error("Erreur Chargement des Quizz");
            } else {
                setQuizz(data)
            }
        })
    },
    [])
    

    return (
       <>
            <div className='container'>
                <h1 className='text-center mt-3'>Affichage des Quizz</h1>
            </div>

            {
                
                Quizz.map(quizz =>
                 
                    <>
                    {console.log(user)}
                    <div className="card text-dark mt-5">
                        <div className="card-body d-flex justify-content-between">
                            <h4 className="card-title">{quizz.title}</h4>
                            <div>
                            {
                               
                                (user?.id) ? (
                                    <Link to={`/quizz/${quizz.id}`} state={quizz} >Participer </Link>
                                  
                                ): (
                                    <button className='btn btn-outline-info btn-sm'>Pour participer aux quizz veuillez vous connecter</button>
                                )
                            }
                            </div>
                        </div>
                    </div>

                    </>
                )
            
            }
        </>
    )
}