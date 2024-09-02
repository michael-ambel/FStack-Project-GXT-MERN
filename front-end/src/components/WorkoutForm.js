import {useState} from 'react';
import { useWorkoutContext } from '../hooks/useWorkoutContext';
import useAutUser from '../hooks/useAutUser';

const WorkoutForm = () => {

    const {user} = useAutUser()

    const [title, setTitle] = useState('')
    const [rep, setRep] = useState('')
    const [load, setLoad] = useState('')
    const [error, setError] = useState('')
    const [emptyFields, setEmptuFields] = useState([])

    const {dispatch} = useWorkoutContext();

    const submitHandler = async (e) => {
        e.preventDefault()

        if(!user){
            setError('No user is logged in')
            return
        }

        const workout = {title, rep, load}
        console.log(workout);
        const response = await fetch('/workout', 
            {
                method: 'POST',
                body: JSON.stringify(workout),
                headers:{
                    'Content-Type': 'application/json',
                    authorization: `Bearer ${user.token}`
                }
            }
        )
        const data = await response.json()
        console.log(data);


        if(response.ok){
            setTitle('')
            setRep('')
            setLoad('')
            setError(null)
            dispatch({type: 'SET_WORKOUT', payload: data})
            setEmptuFields([])
        }
        if(!response.ok){
            setError(data.error)
            setEmptuFields(data.emptyFields)
            console.log(data.error);
        }
    }

    return ( 
        <form className='create' onSubmit={submitHandler}>
            <label>Title:</label>
            <input 
            type="text" 
            onChange={ (e) => {setTitle(e.target.value)}}
            value={title} 
            className={emptyFields.includes('title')? 'error':''}/>

            <label>Reps:</label>
            <input 
            type="number" 
            onChange={ (e) => {setRep(e.target.value)}}
            value={rep} 
            placeholder='Number only'
            className={emptyFields.includes('rep')? 'error':''}/>

            <label>Load:(kg)</label>
            <input 
            type="number" 
            onChange={ (e) => {setLoad(e.target.value)}}
            value={load} 
            placeholder='Number only'
            className={emptyFields.includes('load')? 'error':''}/>

            <button>Add Workout</button>

            {error && <div className="error">{error}</div>}
        </form>
        
     );
}
 
export default WorkoutForm;