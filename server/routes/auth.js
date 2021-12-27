import express from 'express';



const router = express.Router();

// Controllers
import { register, login } from "../controllers/auth";

// router.get("/:message", showMessage);

router.post("/register", register);

router.post("/login", login);

// Since we used require in middleware, hence the following cmd won't 
// support
// export default router;

module.exports = router;