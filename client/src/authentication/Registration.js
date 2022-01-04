import {useState} from "react";
// import { useForm } from "react-hook-form";
import RegisterForm from "../components/RegisterForm";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { register } from "../actions/auth";

const Register = () => {
    const [username, setUserName] = useState('');
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // const [confirmPassword, setConfirmPassword] = useState('');

    const navigate = useNavigate();

    // Event Handler function
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.table({username, fullName, email, password
            // , 
            // confirmPassword
        });
        try{
            const res = await register ({
                username,
                fullName,
                email,
                password,
                // confirmPassword,
        });
        console.log("REGISTER USER ===>", res);
        toast.success("Register success. Please login");
        navigate.push("/login");
    } catch (err) {
        console.log(err);
        if (err.response.status === 400) toast.error(err.response.data);
    };
};

    // const onSubmit = ({firstName, lastName, email, phoneNumber, 
    // password, confirmPassword}) => {
    //     console.log({firstName, lastName, email, phoneNumber, password,
    //     confirmPassword});
    //     addData({firstName, lastName, email, phoneNumber, password,
    //         confirmPassword});
    // };

    // const addData = ({firstName, lastName, email, phoneNumber, password,
    //     confirmPassword}) => {
    //         axios.post(process.env.REACT_APP_API, {firstName, lastName,
    //              email, phoneNumber, password, confirmPassword}).then
    //              (() => {
    //                  this.props.setData
    //              })
    //     }


    console.log(process.env.TEMP_API);

    return (
        <>
        <div className="container-fluid bg-secondary p-5 text-center">
         <h1>Register</h1> 
        </div>


        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <RegisterForm 
                        handleSubmit={handleSubmit}
                        username={username}
                        setUserName={setUserName}
                        fullName={fullName}
                        setFullName={setFullName}
                        email={email}
                        setEmail={setEmail}
                        password={password}
                        setPassword={setPassword}
                        // confirmPassword={confirmPassword}
                        // setConfirmPassword={setConfirmPassword}
                    />
                    {/* TEMP */}
                    {/* <form className="form" onSubmit={handleSubmit(onSubmit)}>

                        <label className="form-label">First Name</label>
                        <input
                            type="text"
                            placeholder="First Name"
                            {...register("firstName")}
                        ></input>
                        <input type="text" placeholder="Rating" {...register("rating")}></input>
                        <input type="text" placeholder="Review" {...register("review")}></input>
                        <input type="submit" placeholder="Review"></input>
                </form> */}
                </div>
            </div>
        </div>
        
        </>
    );

};

export default Register;
