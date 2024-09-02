import { Link } from 'react-router-dom';
import { useLogOut } from '../hooks/useLogOut';
import useAutUser from '../hooks/useAutUser'


const Navbar = () => {
    const { user } = useAutUser()
    const {logout} = useLogOut()
  const logoutHandler = () => {
    logout();
  }
    return ( 
        <header>
            <div className="container">
                <Link to='/'><h1>Workout Buddy</h1></Link> 
                <div>
                    <nav>
                        {user? 
                            <div>
                                <span>{user.email}</span>
                                <button onClick={logoutHandler}>Log out</button>
                            </div> 
                            : 
                            <div>
                            <Link to='/signup'>Sign up</Link>
                            <Link to='/login'>Log in</Link>
                            </div>
                        }
                        
                        
                    </nav>
                </div>  
            </div>
            
        </header>
     );
}
 
export default Navbar;