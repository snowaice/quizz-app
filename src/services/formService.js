import { toast } from "react-toastify";

export function handleForm(event, observable, majFonction){

    const key = event.target.name
    const value = event.target.value
    majFonction({ ...observable, [key]: value })
  
}

export function checkChampsNotEmpty(form){
    let array = Object.entries(form)
    let flag = true
    array.forEach(element=>{
        if(element[1] == "" || element[1] == null){
            toast.error("Veuillez remplir le champ : "+ element[0]);
            flag = false
        }
    })
   return flag
}
