import React, { useContext, useState } from 'react'
import {JWT_KEY, setLocalStorage, USER_KEY} from "../../services/localStorageService";
import {useNavigate} from "react-router-dom";
import { UserContext } from '../../services/userContextService';

export default function Logout() {
    const navigate = useNavigate()
    const { setUser } = useContext(UserContext)

    //setLocalStorage(JWT_KEY, "")
    setLocalStorage(USER_KEY, "")
    setUser()
    navigate('/')
}