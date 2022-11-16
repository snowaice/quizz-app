import React, { useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { PATH } from '../../services/communService'
import { toArray } from '../../services/formService'
import { UserContext } from '../../services/userContextService'
export default function ClassementUser({quizzId}) {
    const { user } = useContext(UserContext)
    const [UserClassement, setUserClassement] = useState([])
    useEffect(() => {
    if(user?.mdp != null){
        fetch(PATH+`/api/quizz/score/${quizzId}`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                "Authorization" : `Basic ${user?.mdp}`
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
            {
                
                toArray(UserClassement).map(function (value, key) {
                    return (
                        <p> {value[0]} : {value[1]} </p>
                    )
                })
            }
        </>
     )


}
