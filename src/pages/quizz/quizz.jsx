import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { PATH } from '../../services/communService'
import { toArray } from '../../services/formService'
import { UserContext } from '../../services/userContextService'

export default function Quizz() {
    const { user } = useContext(UserContext)
    const [Quizz, setQuizz] = useState([])
    const [QuizzCheck, setQuizzCheck] = useState([])
    let result = false;
    useEffect(() => {

        fetch(PATH+"/api/quizz", {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                "Authorization" : `Basic ${user?.token}`
            },
        }).then(response => response.json())
            .then((data) => {
                console.log(data)
                if(data.error){
                    toast.error("Erreur Chargement des Quizz 1");
                } else {
                    setQuizz(data)
                }
            })
        
    
    if(user?.id != null){
    fetch(PATH+`/api/user/quizz/${user.id}`, {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
            "Authorization" : `Basic ${user?.token}`
        },
    }).then(response => response.json())
        .then((data) => {
            console.log(data)
            if(data.error){
                toast.error("Erreur Chargement des Quizz 2");
            } else {
                setQuizzCheck(data)
            }
        })
    
    }
    },
    [user])

    

    return (
       <>
            <div className='container'>
                <h1 className='text-center mt-3'>Affichage des Quizz</h1>
            </div>
            
            {
                
                Quizz.map(quizz =>
                {   
                    result = false
                    toArray(QuizzCheck).map(quizzCheck =>
                        {
                            if(parseInt(quizzCheck[0]) === parseInt(quizz.id)){
                                result = true
                            }
                            return(<></>)
                        }
                    )
                
                    return(
                    <>

                        <div key={quizz.id} className="card text-dark mt-5">
                            <div className="card-body d-flex justify-content-between">
                                <h4 className="card-title">{quizz.title}</h4>
                                <div>
                                {
                                    
                                    (user?.id) ? (
                                        (result) ? (
                                            <Link to={`/quizz/${quizz.id}`}  state={true}><button className='btn btn-outline-info'>Voir mes résultats</button> </Link>
                                        ):(
                                            <Link to={`/quizz/${quizz.id}`} state={false}><button className='btn btn-outline-info'>Participer</button> </Link>
                                        )
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
                    
                )
            
            }
        </>
    )
}