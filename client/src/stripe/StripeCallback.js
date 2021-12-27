//This page is used to only send a request to stripe to check whether 
//the Stripe Account registration has been successful.  
// And to check whether the charges enabled has been set to true or false.

import { useEffect } from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import { getAccountStatus } from "../actions/stripe";


const StripeCallback = ({navigate}) => {
    const {auth} = useSelector((state) => ({...state}));
    const dispatch = useDispatch();

    useEffect(() => {
        if(auth && auth.token) { accountStatus() }; 
    }, [auth])

    const accountStatus = async () => {
        try{
            const res = await getAccountStatus(auth.token);
            console.log("USER ACCOUNT STATUS ON STRIPE CALLBACK", res);
        } catch(err) {
            console.log(err);
        }
    }

    return (
        <div className="d-flex justify-content-center p-5">
            <LoadingOutlined className="display-1 p-5 text-danger" />
        </div>
    );
};

export default StripeCallback;