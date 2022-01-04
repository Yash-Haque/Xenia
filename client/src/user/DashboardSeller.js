import { useState, useEffect } from "react";
import DashboardNav from "../components/DashboardNav";
import { Link } from "react-router-dom";
// import ConnectNav from "../components/ConnectNav";
import {useSelector} from "react-redux";
import {HomeOutlined} from "@ant-design/icons";
import {toast} from "react-toastify";
import { createConnectAccount } from "../actions/stripe";
import { sellerHotels, deleteHotel } from "../actions/hotel";
import SmallCard from "../components/cards/SmallCard";

const DashboardSeller = () => {

    const [hotels, setHotels] = useState([]);

    // Calling in user
    const {auth} = useSelector((state) => ({...state}));
    

    useEffect(() => {
        loadSellerHotels();
    }, [])
    // Since redirecting may take a while, we can display that the page is loading

    const [loading, setLoading] = useState(false);

    const loadSellerHotels = async () => {
        let { data } = await sellerHotels(auth.token);
        setHotels(data);
    }

    const handleClick = async () => {
        setLoading(true);
        try {
            let res = await createConnectAccount(auth.token);
            console.log(res); //get login link
            window.location.href= res.data;
        } catch (err) {
            console.log(err);
            toast.error("Stripe connect failed. Please try again.");
            setLoading(false);
        }
    }

    // token to be sent as a parameter
    const handleHotelDelete = async (hotelId) => {
        if (!window.confirm("Are you sure?")) return;
        deleteHotel(auth.token, hotelId)
        .then(res => {
            toast.success("Hotel Deleted");
            loadSellerHotels();
        });
    }

    const connected = () => (

        <div className="container-fluid">
        <div className="row">
            <div className="col-md-10">
                <h2>Your Hotels</h2>
            </div>

            <div className="col-md-2">
                <Link to="/hotels/new">
                <button 
                className="btn btn-primary">+ Add New</button>
                </Link>
            </div>

            <div className="row"> 
                <pre>{JSON.stringify(hotels)}</pre>
                {hotels.map((h) => (
                    <SmallCard key={h._id} 
                    h={h} 
                    showViewMoreButton={false}
                    owner={true}
                    handleHotelDelete={handleHotelDelete}
                    />
                ))}

            </div>
        </div>
    </div>

    );

    const notConnected = () => (

        <div className="container-fluid">
        <div className="row">
            <div className="col-md-6 offset-md-3 text-center">
                <HomeOutlined className="h1" />
                <h4>Setup payouts to post hotel rooms.</h4>
                {/* <p className="lead">Xenia uses Stripe to handle all forms of user transaction.</p> */}
                <button
                 disabled={loading}
                 onClick={handleClick}
                 className="btn btn-primary mb-3">
                     {loading ? "Processing..." : "Setup Payouts"}
                 </button>
                <p className="text-muted">
                    {/* <small>
                        You'll be redirected to Stripe to complete the onboarding process.
                    </small> */}
                </p>
            </div>
        </div>
    </div>

    );

    return (
        <>
            <div className="container-fluid bg-secondary p-5">
                {/* <ConnectNav /> */}
                <h1>User Info through ConnectNav</h1>
            </div>

            <div className="container-fluid p-4">
                <DashboardNav />
            </div>



            {connected()};
            {/* {notConnected()}; */}

            {/* Validation for whether a user is authenticated seller or buyer */}
            
            {/* {auth && auth.user && auth.user.stripe_seller 
            && auth.user.stripe_seller.charges_enabled
            ? connected()
            : notConnected()}; */}

        </>
    );
};

export default DashboardSeller;
