import { render } from '@testing-library/react'
import React, { useContext, useEffect, useState } from 'react'
import { Navigate, useLocation, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { PATH } from '../../services/communService'
import { checkChampsNotEmpty, handleForm, toArray } from '../../services/formService'
import { UserContext } from '../../services/userContextService'

export default function Question() {

    let { state } = useLocation();

    let isAnswered = state;
    const navigation = useNavigate()
    let { id } = useParams();
    const { user } = useContext(UserContext)
    const [Question, setQuestion] = useState([])
    const [AnswerUser, setAnswerUser] = useState([])
    let checked = false;
    let valid = "";
    let isOK = "";
    
    const [form,setForm] = useState({
       
    })

    const handleSubmit = (event) => {
        event.preventDefault()
        if(checkChampsNotEmpty(form) === false){
            return
        }
        let array = Object.values(form)
        
        array.forEach(function(list){
    
            fetch(PATH+`/api/answer`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                    "Authorization" : `Basic ${user?.mdp}`
                },
                body: JSON.stringify({
                    id: parseInt(list),
                    userList:[{
                        id:parseInt(user.id)
                    }]
                })
            }).then(response => response.json())
            .then((data) => {
                
                // OnLogin Successfully
                navigation(`/quizz/${id}`,{state :true, replace:true})
            })
        });

    }

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

        if(isAnswered){
            fetch(PATH+`/api/user/aswers/${user.id}/quizz/${id}`, {
                method: 'GET',
                headers: {
                    'content-type': 'application/json',
                    "Authorization" : `Basic ${user?.mdp}`
                },
                mode: 'cors',
            }).then(response => response.json())
                .then((data) => {
                    if(data.error){
                        toast.error("Erreur Chargement des Quizz");
                    } else {
                        setAnswerUser(data)
                    }
                })
            
        }

    },

   
   
    [id,user,isAnswered])
    
    const handleChange = (event)=>{

        handleForm(event,form,setForm)

    }

    return (
       <>
    
            <div className='container'>
                <h1 className='text-center mt-3'>Questions</h1>
            </div>
            <div className='w-100 d-flex justify-content-center'>
            <form onSubmit={handleSubmit} className='d-flex flex-column w-50'>
            {
                
                Question.map(question =>
   
                    <>
                        <div key={question.id} className="row align-items-md-stretch mt-5">
                            <div className="col-12">
                                <div className="h-100 p-5 bg-dark text-white rounded-3">
                                    <h2 className='text-white'>{question.title}</h2>
                                
                                    {
                                        
                                        question.answers.map(answer=>
                                            {   
                                                checked = false;
                                                valid = "d-block btn btn-outline-info ";
                                                if(isAnswered){
                                                    valid = "d-none btn btn-outline-info ";
                                                    if(answer.rightWrong === true){
                                                        isOK = "form-check-label  text-success";
                                                    }else{
                                                        isOK = "form-check-label  text-danger";
                                                    }

                                                    return(
                                                        <>
                                                            <div key={answer.id} className="form-check fs-5 mt-3">

                                                                {
                                                                
                                                                toArray(AnswerUser).map(answerUser=>
                                                                {
                                                                    if(parseInt(answerUser[1]["id"]) === parseInt(answer.id)){
                                                                        checked =true;
                                                                        
                                                                    }
                                                                })
                                                                
                                                                } 
                                                         
                                                                <input className="form-check-input" checked={checked} disabled type="radio" name={question.id}  id={"radio" + answer?.id} value={answer?.id} required/>
                                                                <label className={isOK}  htmlFor={"radio" + answer?.id}>
                                                                    {answer?.title}
                                                                </label>
                                                                    
                                                            </div> 
                                                            
                                                        </>
                                                    )
                                                
                                                }else{
                                                    return(
                                                        <>
                                                            <div key={answer.id}  className="form-check fs-5 mt-3">
                                                                <input onChange={handleChange} className="form-check-input"  type="radio" name={question.id}  id={"radio" + answer?.id} value={answer?.id} required/>
                                                                <label className="form-check-label" htmlFor={"radio" + answer?.id}>
                                                                    {answer?.title}
                                                                </label>
                                                            </div>
                                                        </>
                                                    )
                                                }
                                            }   
                                            
                                            
                                        )

                                    
                                    }
                                </div>
                            </div>
                        </div>    
                    </>
                )
               
            
            }
                <div className='d-flex justify-content-center mt-5 mb-5'>
                    <button className={valid} name="validateQuizz">Validation du quizz</button>
                </div>
            </form>
            </div>
        </>
    )
}