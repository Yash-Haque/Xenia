import express from 'express';
import formidable from "express-formidable";

// Places that require sigin are assigned the middleware function requireSignin.
// And the following function always goes first as a parameter before the others.
// Check middlewares folder for more info.  


const router = express.Router();

// Middleware
// import { requireSignin, hotelOwner } from "../middlewares";

// Controllers
import { create, hotels, image, sellerHotels, remove, read, update, userHotelBookings } from "../controllers/hotel";

// router.get("/:message", showMessage);

router.post("/create-hotel", formidable(), create); //requireSignin

router.get("/hotels", hotels);

router.get("/hotel/image/:hotelID", image);

router.get("/seller-hotels", sellerHotels); //requireSignin

// First hotelOwner then requireSignin
router.delete("/delete-hotel/:hotelId", remove);

router.get("/hotel/:hotelId", read);

//first requireSignin then hotelowner
router.put("/update-hotel/:hotelId", formidable(), update);


// Orders
//first requireSignin
router.get("/user-hotel-bookings", userHotelBookings);

// Since we used require in middleware, hence the following cmd won't 
// support
// export default router;

module.exports = router;
