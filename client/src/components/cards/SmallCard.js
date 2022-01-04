import { currencyFormatter } from "../../actions/stripe";
import { diffDays } from "../../actions/hotel";
import { Link, useNavigate } from "react-router-dom";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

const SmallCard = ({ h, handleHotelDelete = (f) => f,
owner = true,
showViewMoreButton = true,
 }) => {
    const navigate = useNavigate();
    return(
    <>
        <h2>Show Each Hotels</h2>
        <div className="card mb-3">
            <div className="row no-gutters">
                <div className="col-md-4">
                {h.image && h.image.contentType ? (
                    <img 
                        src={`${process.env.REACT_APP_API}/hotel/image/${h._id}`}
                        alt="default hotel image"
                        className="card-image img img-fluid"
                    /> ) : ( 
                <img src="https://via.placeholder.com/900x500.png?text=MERN+Booking"
                alt="default hotel image"
                className="card-image img img-fluid"
                 />
                )}
                <div className="col-md-8">
                    <div className="card-body">
                        {/* <h3 className="card-title">{h.title}{" "} */}
                        <h3 className="card-title">Hotel Title
                        {/* STRIPE SETTINGS== FOR VIEWING THE PRICE OF THE HOTEL */}
                        <span className="float-right text-primary">
                        currency
                            {
                                currencyFormatter({
                                    amount: h.price,
                                    currency: "bdt",
                                })
                            }
                        </span>
                        </h3>
                        {/* <p className="alert alert-info">{h.location}</p> */}
                        <p className="alert alert-info">Hotel Location</p>
                        {/* <p className="card-text">{`${h.content.substring(1, 200)}...`}</p> */}
                        <p className="card-text">Hotel Content</p>
                        <p className="card-text">
                            {/* <span>
                                for {diffDays(h.from, h.to)}{" "} 
                                {diffDays(h.from, h.to) <= 1 ? " day" : " days"}
                            </span> */}
                            <span>For n number of days</span>
                        </p>
                        {/* <p className="card-text">{h.bed}</p> */}
                        <p className="card-text">No. of beds available</p>
                        {/* <p>Available from {new Date(h.from).toLocaleDateString()}</p> */}
                        <p>Available from Date</p>

                        <div className="d-flex justify-content-between h4">

                        <button 
                        onClick={() => navigate.push(`/hotel/${h._id}`)}
                        className="btn btn-primary"
                        >
                        Show More
                        </button>
                        {
                            owner && (
                                <>
                                <Link to={`/hotel/edit/${h._id}`}>
                            <EditOutlined className="text-warning"/>
                            </Link>
                            <DeleteOutlined onClick={() => 
                            handleHotelDelete(h._id)}
                            className="text-danger"                  
                            />
                                </>
                            )
                        }
                        </div>
                    </div>
                </div>
                </div>
            </div>
        </div>
    </>
)
};

export default SmallCard;
