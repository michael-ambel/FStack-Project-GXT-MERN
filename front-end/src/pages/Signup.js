import { useState } from "react";
import { useSignUp } from "../hooks/useSignUp";

const Signin = () => {
    const [email, setEmail] =useState('')
    const [password, setPassword] =useState('')

    const {signup, isLoading, error} = useSignUp()

    const submitHandler = async (e) => {
        e.preventDefault()
        signup(email, password)
    }

    return ( 
        <form className="signup" onSubmit={submitHandler}>
            <h3>Sign up</h3>
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
            <button disabled={isLoading}>Sign up</button>
            {error && <div className="error">{error}</div>}
        </form>
     );
}
 
export default Signin;