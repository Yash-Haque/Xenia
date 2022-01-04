import User from "../models/user";

import jsonwebtoken, { JsonWebTokenError } from "jsonwebtoken";

// A lot of the function attributes in the following controllers have been removed
// due to suit the needs.

export const register = async (req, res) => {

            try {

                console.log(req.body);
                const {username, fullName, email, password} = req.body;
                //validation
                if(!username) return res.status(400).send("Username is required");
            
                if(!fullName) return res.status(400).send("Full Name is required");
                if(!password || password.length < 6)
                    return res
                        .status(400)
                        .send("Password is required and should be min 6 characters long");
                // if(!(password == confirmPassword)) 
                //     return res
                //     .status(400).send("Passwords don't match. Please try again.");
            
                    let userExist = await User.findOne({email}).exec();
                    if(userExist) return res.status(400).send("Email is taken");
            
                    let usernameExist = await User.findOne({username}).exec();
                    if(usernameExist) return res.status(400).send("Username is taken");
                    // let phoneNumberExist = await User.findOne({phoneNumber}).exec();
                    //     if(phoneNumberExist) return res.status(400).send("An account with the following phone number already exists");
                        //register
                        const user = new User(req.body)

                await user.save();
                // console.log("USER CREATED", user);
                return res.json({ok: true});
            } catch(err) {
                console.log("CREATE USER FAILED", err)
                return res.status(400).send("Error. Try again.");
            }
};

export const login = async (req, res) => {
    console.log(req.body);
    const {email, password} = req.body
    try {
        //checking if user with the particular email exist
        let user = await User.findOne({ email }).exec();
        console.log("USER EXISTS", user);
        if(!user) res.status(400).send("ACCOUNT DOES NOT EXIST");

        //compare password
        user.comparePassword(password, (err, match) => {
            console.log("COMPARE PASSWORD IN LOGIN ERROR", err);
            if(!match || err) 
                return res.status(400).send("Wrong Password");
                console.log("GENERATE A TOKEN THEN SEND AS RESPONSE TO CLIENT");
                
                // Error begins

                // Generating a token then sending it as a response to client.
                
                let token = 
                jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
                    expiresIn: "7d",
                });
                res.json({ token,
                    // Since we do not wanna send the whole user info, with the password, 
                    //user
                    user: {
                        _id: user._id,
                        name: user.name,
                        email: user.email,
                        createdAt: user.createdAt,
                        updatedAt: user.updatedAt,
                    }, 
                });
        });
    } catch (error) {
        console.log("LOGIN ERROR", error);
        res.status(400).send("Signin failed");
    }
};
