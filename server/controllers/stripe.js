import User from "../models/user";
import Stripe from "stripe";
import queryString from "query-string";

const stripe = Stripe(process.env.STRIPE_SECRET);

export const createConnectAccount = async (req, res) => {
    console.log("REQUEST USER FROM REQUIRE_SIGNIN MIDDLEWARE", req.user);
    console.log("You have arrived the create connect account endpoint.");

    // 1) Find user from DB
    const user = await User.findById(req.user._id).exec();
    console.log("USER ==> ", user);

    // 2) If user don't have stripe_account_id yet, create now
    if( !user.stripe_account_id){
        const account = await stripe.accounts.create({
            type: "express",
        });
        console.log("ACCOUNT ===> ", account);
        user.stripe_account_id = account.id;
        user.save();
    }

    // 3) Create login Link based on account ID (For frontend to complete onboarding)
    let accountLink = await stripe.accountLinks.create({
        account: user.stripe_account_id,
        refresh_url: process.env.STRIPE_URL_REDIRECT,
        return_url: process.env.STRIPE_URL_REDIRECT,
        type: "account_onboarding",
    });
    // prefill any info such as email
    accountLink = Object.assign(accountLink, {
        "stripe_user[email]": user.email || undefined,
    });
    console.log("ACCOUNT LINK", accountLink);
    let link = `${accountLink.url}?${queryString.stringify(accountLink)}`
    console.log("LOGIN LINK", )
    res.send(link);

};