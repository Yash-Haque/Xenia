import {useState} from "react";
import { toast } from "react-toastify";
import { login } from "../actions/auth";
import LoginForm from "../components/LoginForm";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();

    const navigate = useNavigate();

    // Event Handler Function
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("SEND LOGIN DATA", {username, password});
        try {
            let res = await login({username, password})
            
            if(res.data) {
                console.log("SAVE USER RES IN REDUX AND LOCAL STORAGE THEN REDIRECT");
                console.log(res.data);

                // saving user and token to local storage
                window.localStorage.setItem("auth", JSON.stringify(res.data));
                // save user and token to redux
                dispatch({
                    type: "LOGGED_IN_USER",
                    payload: res.data,
                });
                navigate.push("/dashboard");
            }
        } catch (err) {
            console.log(err)

            //if any error detected, especially regarding toast notification,
            //comment this out and check console
            if(err.response.status === 400) toast.error(err.response.data);
            
        }
    }
    return (
        <>
        <div className="container-fluid bg-secondary p-5 text-center">
            <h1>Login Page</h1>
        </div>

        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <LoginForm 
                    handleSubmit={handleSubmit}
                    username={username}
                    setUserName={setUserName}
                    password={password}
                    setPassword={setPassword}
                    />
                </div>
            </div>
        </div>
        </>
    );
};

export default Login;
