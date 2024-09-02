
import {createContext, useReducer, useEffect} from 'react'

export const UserContext = createContext();

const userReducer = (state, action) =>{
    switch(action.type){
        case 'LOGIN':
            return {
                user: action.payload
            }
        case 'LOGOUT':
            return {
                user: null
            }
        default:
            return state
        
    }
}

export const UserContextProvider = ({children}) => {

    const [state, dispatch]  = useReducer(userReducer, {
        user: null
    })
    useEffect(()=>{
        const data = JSON.parse(localStorage.getItem('user'));
        if(data){
            dispatch({type:'LOGIN', payload: data})
        }
    },[])
    console.log(state);

    return(
        <UserContext.Provider value = {{...state, dispatch}}>
            {children}
        </UserContext.Provider>
    )
}
