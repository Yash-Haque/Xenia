import { Link } from "react-router-dom";
import DashboardNav from "../components/DashboardNav";
// import ConnectNav from "../components/ConnectNav";

const Dashboard = () => {
    return (
        <>
            <div className="container-fluid bg-secondary p-5">
                {/* <ConnectNav /> */}
                <h1>User Info through ConnectNav</h1>
            </div>

            <div className="container-fluid p-4">
                <DashboardNav />
            </div>

            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-10">
                        <h2>Your Bookings</h2>
                    </div>
                    {/* Browse Hotels button not working */}
                    <div className="col-md-2">
                        <Link to="/">
                        <button 
                        className="btn btn-primary">Browse Hotels</button>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Dashboard;


// user/Dashboard.js
// show a navbar in Dashboard... it will show 2 component
// 1. will show all the bookings and a button that redirects to browse hotels
// 2. show all the hotels we have posted and a button to add new
// use tabs as navigation