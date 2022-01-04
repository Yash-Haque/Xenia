import { useSelector } from "react-redux";
import {Card, Avatar} from "antd";
import moment from "moment";


// Uses Ant Design features to display a card that shares the user's account summary.

const { Meta } = Card;

const ConnectNav = () => {
    const { auth } = useSelector((state) => ({ ...state }));
    const { user } = auth;
    
    return (
    <div className="d-flex justify-content-around">
    <Card>
        <Meta avatar={<Avatar>{user.name[0]}</Avatar>} 
        title={user.name}
        description={`Joined ${moment(user.createdAt).fromNow()}`}
         />
    </Card>
    {auth && auth.user && auth.user.stripe_seller && 
    auth.user.stripe_seller.charges_enabled && (<>
        <div>Pending Balance</div>

        <div>Payout Settings</div>
    </>)}

    </div>
    );
};

export default ConnectNav;

// Moment to show the appropriate date user was created
// Ant Design to show user card and user avatar
