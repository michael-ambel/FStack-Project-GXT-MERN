import { UserContext } from "../context/UserContext";
import { useContext } from "react"; 



const useAutUser = () => {
    const context = useContext(UserContext)
    
    if(!context) {
        throw Error('useAuthContext must be used inside an AuthContextProvider')
      }

    return context;
}

export default useAutUser;