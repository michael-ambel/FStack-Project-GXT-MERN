import { createContext, useReducer } from "react";

export const WorkoutContext = createContext();

export const workoutsReduser = (state, action) => {
    switch(action.type){
        case 'GET_WORKOUT':
            return {
                workouts: action.payload
            }
        case 'SET_WORKOUT':
            return {
                workouts: [action.payload, ...state.workouts]
            }
        case 'DELETE_WORKOUT':
            return {
                workouts: state.workouts.filter(workout => workout._id !== action.payload._id)
            }
        default:
            return state
    }
}

export const WorkoutContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(workoutsReduser, {workouts: null})
    return (
        <WorkoutContext.Provider value = {{...state, dispatch}}>
            {children}
        </WorkoutContext.Provider>
      );
}
