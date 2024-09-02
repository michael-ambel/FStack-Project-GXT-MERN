import useAutUser from './useAutUser';
import { useState } from 'react';

export const useLogIn = () =>{
    const {dispatch} = useAutUser();

    const [isLoading, setIsLoading] = useState(null);
    const [error, setError] = useState('');

    const login = async (email, password) => {
        setIsLoading(true)
        const response = await fetch('/login', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({email, password})
        })

        const data = await response.json();
        
        if(!response.ok){
            setIsLoading(false)
            setError(data.error)
        }

        if(response.ok){
            localStorage.setItem('user', JSON.stringify(data))
            setIsLoading(false)
            dispatch({type: 'LOGIN', payload: data})
        }
    }
    return {login, isLoading, error}
}