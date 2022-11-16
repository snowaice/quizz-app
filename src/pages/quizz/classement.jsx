import React, { useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { PATH } from '../../services/communService'
import { UserContext } from '../../services/userContextService'
import ClassementUser from './classementUser'
export default function Classement() {

 const { user } = useContext(UserContext)
    const [Quizz, setQuizz] = useState([])
    useEffect(() => {
    if(user?.token != null){
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
                    toast.error("Erreur Chargement des Quizz");
                } else {
                    setQuizz(data)
                }
            })
        
    }
    },
    [user])

    

    return (
       <div className='container mb-5'>
            <div className='container'>
                <h1 className='text-center mt-3'>Classment</h1>
            </div>

            {
                
                Quizz.map(quizz =>
                 
                    <>
                    {console.log(user)}
                    <div key={quizz.id} className="card text-dark mt-5">
                        <div className="card-body d-flex justify-content-center">
                            <h4 className="card-title">{quizz.title}</h4>
                            
                        </div>
                        <div className='card-footer'>
                            {
                               
                                (user?.id) ? (
                                  <ClassementUser quizzId={quizz.id} />
                                ): (
                                    ""
                                )
                            }
                            </div>
                    </div>

                    </>
                )
            
            }
        </div>
    )
}