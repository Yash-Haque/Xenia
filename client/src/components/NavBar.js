import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

// React-router-dom is a react hook
// Since NavBar is not wrapped in route, we cannot pass history as a prop

const NavBar = () => {
  
  const dispatch = useDispatch();
  const {auth} = useSelector((state) => ({ ...state })); 
  const navigate = useNavigate();

  // Logout Function
  const Logout = () => {
    dispatch({
      type: "LOGOUT",import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

// Since NavBar is not wrapped in route, we cannot pass history as a prop

const NavBar = () => {
  
  const dispatch = useDispatch();
  const {auth} = useSelector((state) => ({ ...state })); 
  const navigate = useNavigate();

  // Logout Function
  const Logout = () => {
    dispatch({
      type: "LOGOUT",
      payload: null,
    });
    window.localStorage.removeItem("auth");
    navigate.push("/login");
  };
  
  return(
    <div className="nav bg-light d-flex justify-content-between">
    <Link className="nav-link" to="/">
    Home
    </Link>

    {auth !== null && (
      <Link className="nav-link" to="/dashboard">
        Dashboard
      </Link>
    )}

    {auth !== null && (
      <>
      <Link className="nav-link" onClick={Logout}>
        Logout
      </Link>
      </>
    )}
    {auth === null && (
      <>
      <Link className="nav-link" to="/login">
        Login
      </Link>
      <Link className="nav-link" to="/register">
        Register
      </Link>
      </>
    )}
    </div>
  );
  };
  
  export default NavBar;
      payload: null,
    });
    window.localStorage.removeItem("auth");
    navigate.push("/login");
  };
  
  return(
    <div className="nav bg-light d-flex justify-content-between">
    <Link className="nav-link" to="/">
    Home
    </Link>

    {auth !== null && (
      <Link className="nav-link" to="/dashboard">
        Dashboard
      </Link>
    )}

    {auth !== null && (
      <>
      <Link className="nav-link" onClick={Logout}>
        Logout
      </Link>
      </>
    )}
    {auth === null && (
      <>
      <Link className="nav-link" to="/login">
        Login
      </Link>
      <Link className="nav-link" to="/register">
        Register
      </Link>
      </>
    )}
    </div>
  );
  };
  
  export default NavBar;
