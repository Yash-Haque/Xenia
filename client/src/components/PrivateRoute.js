import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ ...rest }) => {
    const { auth } = useSelector((state) => ({ ...state }));

    return auth && auth.token ? <Route {...rest} /> : 
    <Redirect to="/login" />;
};

export default PrivateRoute;

// So this function can now be used instead of Route attribute in App.js
