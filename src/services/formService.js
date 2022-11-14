export function handleForm(event, observable, majFonction){

    const key = event.target.name
    const value = event.target.value
    majFonction({ ...observable, [key]: value })
  
}
export function checkChamps(form){
    console.log(form)

}
