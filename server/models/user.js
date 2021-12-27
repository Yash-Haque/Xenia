import mongoose from "mongoose";
import bcrypt from "bcrypt";

const {Schema} = mongoose

const userSchema = new Schema({
    firstName: {
        type: String,
        trim: true,
        required: "First Name is required"
    },
    lastName: {
        type: String,
        trim: true,
        required: "Last Name is required",
    },
    phoneNumber: {
        type: String,
        trim: true,
        required: "Phone Number is required",
        unique: true,
    },
    email: {
        type: String,
        trim: true,
        required: "Email is required",
        unique: true,
    },
    password: {
        type: String,
        required: true,
        min: 6,
        max: 64,
    },
    confirmPassword: {
        type: String,
        required: true,
        min: 6,
        max: 64,
    },
    stripe_account_id: "",
    stripe_seller: {},
    stripeSession: {}
    }, 
    { timestamps: true }
);


userSchema.pre("save", function(next) {
    let user = this;
    
    if(user.isModified("password")){
        return bcrypt.hash(user.password, 12, function (err, hash){
            if(err){
                console.log("BCRYPT HASH ERROR", err);
                return next(err);
            }
            user.password = hash;
            return next();
        });
    } else {
        return next();
    }
});

userSchema.method.comparePassword = function(password, next){
    bcrypt.compare(password, this.password, function(err, match){
        if(err){
            console.log("COMPARE PASSWORD ERR", err);
            return next(err, false);
        }
        //if no error, then we will get null
        console.log("MATCH PASSWORD", match);
        return next(null, match); // true
    });
};


export default mongoose.model("User", userSchema);