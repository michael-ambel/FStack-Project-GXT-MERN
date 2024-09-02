import {useState} from 'react'
import useAutUser from './useAutUser'



export const useSignUp = () => {
    const {dispatch} = useAutUser()

    const [isLoading, setIsLoading] = useState(null)
    const [error, setError] = useState(null)

    const signup = async (email, password) => {
        setIsLoading(true)
        setError(null)
        const response = await fetch('/signup', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({email, password})
        })

        const data = await response.json()
        
        if(!response.ok){
            setIsLoading(false)
            setError(data.error)
        }
        if(response.ok){
            setIsLoading(false)
            localStorage.setItem('user', JSON.stringify(data))
            dispatch({type: 'LOGIN', payload: data})
        }
    }
    return {signup, isLoading, error}
}