import express from 'express';



const router = express.Router();

// Middlewares
// The following middleware is very volatile as it can crash Server

// import { requireSingin } from '../middlewares';
// requireSignin is sent as an argument in between the URL and createConnectAccount

// Controllers
import { createConnectAccount } from "../controllers/stripe";
// This function allows only logged in users to access stripe.


// router.get("/:message", showMessage);

router.post("/create-connect-account", createConnectAccount);

// Since we used require in middleware, hence the following cmd won't 
// support
// export default router;

module.exports = router;