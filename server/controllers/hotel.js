import Hotel from "../models/hotel"
import fs from "fs";

export const create = async (req, res) => {
    console.log("CREATE HOTELS");
    console.log("req.fields", req.fields);
    console.log("req.files", req.files);

    try {
        let fields = req.fields;
        let files = req.files;

        let hotel = new Hotel(fields);

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

export const image = async (req, res) => {
    let hotel = await Hotel.findById(req.params.hotelID).exec();
    if(hotel && hotel.image && hotel.image.data !== null){
        res.set("Conten-Type", hotel.image.contentType);
        return res.send(hotel.image.data);
    }
};