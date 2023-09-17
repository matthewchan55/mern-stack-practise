import { Link } from "react-router-dom";
import { useLogout } from "../hook/useLogout";
import { useAuthContext } from "../hook/useAuthContext";
import Searchbar from "./Searchbar";

const Navbar = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();

  const handleClick = () => {
    logout();
  };

  return (
    <header>
      <div className="container">
        {/* Link: navigate by clicking or tapping */}
        <Link to="/">
          <h1>Workout Buddy</h1>
        </Link>
        <Searchbar/>
        <nav>
          {/* if user login*/}
          {user && (
            <div>
              <span>{user.email}</span>
              <button onClick={handleClick}>Logout</button>
            </div>
          )}

          {/* if user logout*/}
          {!user && (
            <div>
              <Link to="/login">Login</Link>
              <Link to="/signup">Signup</Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
