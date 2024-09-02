import { useWorkoutContext } from "../hooks/useWorkoutContext";
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import useAutUser from "../hooks/useAutUser";


const WorkoutDetails = ({workouts}) => {
    const { user } = useAutUser()
    const {dispatch} = useWorkoutContext()
    const deleteHndler = async (id) => {
        if(!user){
            throw Error('No user is logged in')
            return
        }

        const response = await fetch('/workout/' + id, {
            method: "DELETE",
            headers: {authorization: `Bearer ${user.token}`}
        })
        const data = await response.json();

        if(response.ok){
            dispatch({type: 'DELETE_WORKOUT', payload: data})
        }
    }
    return ( 
        <div className="workouts">
            {workouts && workouts.map((workout) => (
                <div key = {workout._id} className="workout-details">
                    <h4>{workout.title}</h4>
                    <p>Reps:<strong> {workout.rep}</strong></p>
                    <p>Load(kg): <strong>{workout.load}</strong></p>
                    <p>Crated at: {formatDistanceToNow(new Date(workout.createdAt), {addSuffix: true})}</p>
                    <span className="material-symbols-outlined" onClick={()=>{deleteHndler(workout._id)}}>delete_forever</span>
                </div>
            ))}
        </div>
     );
}
 
export default WorkoutDetails;