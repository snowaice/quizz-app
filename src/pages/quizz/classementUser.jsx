import React, { useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { PATH } from '../../services/communService'
import { toArray } from '../../services/formService'
import { UserContext } from '../../services/userContextService'
export default function ClassementUser({quizzId}) {
    const { user } = useContext(UserContext)
    const [UserClassement, setUserClassement] = useState([])
    useEffect(() => {
    if(user?.token != null){
        fetch(PATH+`/api/quizz/score/${quizzId}`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                "Authorization" : `Basic ${user?.token}`
            },
        }).then(response => response.json())
            .then((data) => {
                console.log(data)
                if(data.error){
                    toast.error("Erreur Chargement des Scores");
                } else {
                    setUserClassement(data)
                }
            })
        
    }
    },
    [user,quizzId])

    

    return (
        
        <>
            <table className="table">
                <thead className="thead-dark bg-dark text-white">
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">Utilisateur</th>
                    <th scope="col">Score</th>
                    </tr>
                </thead>
                <tbody>
                   
            {
                
                toArray(UserClassement).sort((a, b) => b[1] - a[1]).map(function (value, key) {

                    return (
                            <tr className='text-dark'>
                                <th scope="row">{key+1}</th>
                                <td>{value[0]}</td>
                                <td>{value[1]} / 5</td>
                            </tr>
                                
              
                    )
                })
            }
                </tbody>
            </table>
        </>
     )


}
