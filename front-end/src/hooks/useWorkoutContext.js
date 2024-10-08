import { WorkoutContext} from "../context/WorkoutContext";
import { useContext } from "react";

export const useWorkoutContext = () => {
    const context = useContext(WorkoutContext);

    if(!context){
        throw Error('This context must be inside WorkoutContextProvider')
    }
    
    return context;
} 


