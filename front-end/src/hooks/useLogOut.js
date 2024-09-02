import useAutUser from "./useAutUser"
import { useWorkoutContext } from "./useWorkoutContext";


export const  useLogOut = () => {

    const {dispatch} = useAutUser();
    const {dispatch: workoutDispatch} = useWorkoutContext()

    const logout = () =>{
        localStorage.removeItem('user');
        dispatch({type: 'LOGOUT'})
        workoutDispatch({type:'GET_WORKOUT', payload: null})
    }

    return {logout}
}