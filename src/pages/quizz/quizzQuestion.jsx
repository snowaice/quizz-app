import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { PATH } from '../../services/communService'
import { UserContext } from '../../services/userContextService'

export default function Question() {
    let { id } = useParams();
    const { user } = useContext(UserContext)
    const [Question, setQuestion] = useState([])
    useEffect(() => {
    fetch(PATH+`/api/questions/${id}`, {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
            "Authorization" : `Basic ${user?.mdp}`
        },
        mode: 'cors',
    }).then(response => response.json())
        .then((data) => {
            console.log(data)
            if(data.error){
                toast.error("Erreur Chargement des Quizz");
            } else {
                setQuestion(data)
            }
        })
    },
    [])
    

    return (
       <>
            <div className='container'>
                <h1 className='text-center mt-3'></h1>
            </div>

            {
                
                Question.map(question =>
                    
                    <>
                    {console.log(question)}
                    <div className="card text-dark mt-5">
                        <div className="card-body d-flex justify-content-between">
                            <h4 className="card-title">{question.title}</h4>

                        </div>
                        <div className='card-footer'>
                            
                            {
                                
                                question.answers.map(answer=>{
                                    return (
                                        <>

                                            <div class="form-check">
                                                <input class="form-check-input" type="radio" name={"radioQuestion"+question.id}  id={"radio" + answer?.id} value={answer?.id}/>
                                                <label class="form-check-label" for={"radio" + answer?.id}>
                                                    {answer?.title}
                                                </label>
                                            </div>
                                       
                                        </>
                                    )
                                })
                            }
                        </div>
                    </div>

                    </>
                )
            
            }
        </>
    )
}