import expressJwt from "express-jwt";

export const requireSingin = expressJwt({
    // Secret Token
    secret: process.env.JSWT_SECRET,
    algorithm: ["HS256"],
    // Expiry Date
});