import Hotel from "../models/hotel"
import fs from "fs";

// Refer to hotel model and the server/routes file to learn further context.

// There are a lot of predefined functions here which belong to the mongoose library.

export const create = async (req, res) => {
    console.log("CREATE HOTELS");
    console.log("req.fields", req.fields);
    console.log("req.files", req.files);

    try {
        let fields = req.fields;
        let files = req.files;

        let hotel = new Hotel(fields);
        hotel.postedBy = req.user._id;
        // Handle Image
        if(files.image){
            hotel.image.data = fs.readFileSync(files.image.path);
            hotel.image.contentType = files.image.type;
        }
        hotel.save((err, results) => {
            if(err) {
                console.log("saving hotel error => ", err)
                res.status(400).send("Error saving");
            }
            res.json(result);
        });
    } catch (err) {
        console.log(err);
        res.status(400).json({
            err: err.message,
        });
    }
};

export const hotels = async (req, res) => {
    let all = await Hotel.find({})
    .limit(24)
    .select("-image.data")
    .populate("postedBy", "_id name")
    .exec();
    console.log(all);
    res.json(all);
};

// Handles image data within the homepage
export const image = async (req, res) => {
    let hotel = await Hotel.findById(req.params.hotelId).exec();
    if(hotel && hotel.image && hotel.image.data !== null){
        res.set("Conten-Type", hotel.image.contentType);
        return res.send(hotel.image.data);
    }
};

export const sellerHotels = async (req, res) => {
    let all = await Hotel.find({ postedBy: req.user._id})
    .select("-image.data")
    .populate("postedBy", "_id name")
    .exec();

    res.send(all);
};

export const remove = async (req, res) => {
    let removed = await Hotel.findByIdAndDelete(req.params.hotelId)
    .select("-image.data")
    .exec();
    res.json(removed);
};

export const read = async (req, res) => {
    let hotel = await (await Hotel.findById(req.params.hotelId)
    .select("-image.data")
    .exec());
    console.log("SINGLE HOTEL",hotel);
    res.json(hotel);
};

export const update = async (req, res) => {
    try {
        let fields = req.fields;
        let files = req.files;

        let data = { ...fields };

        if (files.image) {
            let image = {};
            image.data = fs.readFileSync(files.image.path);
            image.contentType = files.image.type;

            data.image = image;
        }

        let updated = await Hotel.findByIdAndUpdate(req.params.hotelId, data
            ,
            {
                new: true,
            }
            ).select("-image.data");
            res.json(updated);
    } catch (err) {
        console.log(err);
        res.status(400).send("Hotel update failed. Try again.");
    }
};

export const userHotelBookings = async (req, res) => {
    const all = await order.find({orderedBy: req.user._id})
    .select("session")
    .populate("hotel", "-image.data")
    .populate("orderedBy", "_id name")
    .exec();
    res.json(all);
}
