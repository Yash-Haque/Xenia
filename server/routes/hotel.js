import express from 'express';
import formidable from "express-formidable";



const router = express.Router();

// Middleware
// import { requireSignin } from "../middlewares";

// Controllers
import { create, hotels, image } from "../controllers/hotel";

// router.get("/:message", showMessage);

router.post("/create-hotel", formidable(), create);

router.get("/hotels", hotels);

router.get("/hotel/image/:hotelID", image);

// Since we used require in middleware, hence the following cmd won't 
// support
// export default router;

module.exports = router;