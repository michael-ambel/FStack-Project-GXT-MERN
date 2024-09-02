import { useState } from "react";
import { useLogIn } from "../hooks/useLogIn";

const Login = () => {

    const {login, isLoading, error} = useLogIn()
    const [email, setEmail] =useState('')
    const [password, setPassword] =useState('')

    const submitHandler = async (e) => {
        e.preventDefault()
        login(email, password)
    }

    return (        
        <form className="login" onSubmit={submitHandler}>
            <h3>Log in</h3>
            <label>Email:</label>
            <input 
            type="email"
            name="email"
            onChange={(e) => setEmail(e.target.value)} 
            value =  {email}
            />
            <label>Password:</label>
            <input 
            type="password"
            name="password"
            onChange={(e) => setPassword(e.target.value)} 
            value =  {password}
            />
            <button disabled= {isLoading}>Log in</button>
            {error && <div className="error">{error}</div>}
        </form>
     );
}
 
export default Login;