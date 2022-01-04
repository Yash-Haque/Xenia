import expressJwt from "express-jwt";
import Hotel from "../models/hotel";


// Stores and hashes the tokens assigned to each user.
export const requireSingin = expressJwt({
    // Secret Token
    secret: process.env.JSWT_SECRET,
    algorithm: ["HS256"],
    // Expiry Date
});

// Validates the user as a hotel owner.
export const hotelOwner = async (req, res, next) => {
    //findByID is a predefined function for mongoose.
    let hotel = await Hotel.findByID(req.params.hotelId).exec()
    let owner = hotel.postedBy._id.toString() === req.user._id.toString();
    if(!owner) {
        return res.status(403).send("Unauthorized");
    } 
    next();
};
