import  { useContext } from 'react'
import { setLocalStorage, USER_KEY} from "../../services/localStorageService";
import {useNavigate} from "react-router-dom";
import { UserContext } from '../../services/userContextService';

export default function Logout() {
    const navigate = useNavigate()
    const { setUser } = useContext(UserContext)

    setLocalStorage(USER_KEY, "")
    setUser()
    navigate('/')
}