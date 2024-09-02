import { useEffect} from "react";
import WorkoutDetails from "../components/WorkoutDetails";
import WorkoutForm from "../components/WorkoutForm";
import { useWorkoutContext } from "../hooks/useWorkoutContext";
import useAutUser from "../hooks/useAutUser";



const Home = () => {
    const {workouts, dispatch} = useWorkoutContext();
    const {user} = useAutUser();
    
    useEffect(() => {
        const fetchWorkouts = async () => {
            const response = await fetch('/workout', {
                headers: {authorization:`Bearer ${user.token}`}
            })
            const data = await response.json()

            if(response.ok){
                console.log(data);
                dispatch({type:'GET_WORKOUT', payload: data})
            }
            
        }

      if(user){
        fetchWorkouts();
      }  

    }, [dispatch, user])

    return ( 
        <div className="home">

            <WorkoutDetails workouts={workouts} />
            <div className="workoutform">
                <WorkoutForm />
            </div>
            
        </div>
        
     )
}
 
export default Home;