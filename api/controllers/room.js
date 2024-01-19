import Room from "../models/Room.js"
import Hotel from "../models/Hotel.js"
import { createError } from "../utils/error.js"

export const createRoom = async (req, res, next) => {
    // The idea is to get the hotel id from the params header of the request and create a new Room 
    const hotelId = req.params.hotelid;
    const newRoom = new Room(req.body)
    console.log("insdie createRoom controller")
    try {
        const savedRoom = await newRoom.save()
        try {
            // add saved room id to that hotel in which room is to be added go to Hotel schema (model) and see the attribute rooms which is an array of strings. This array of strings for a given hotel would contain the ids for all the rooms it contains
            await Hotel.findByIdAndUpdate(hotelId, { $push: { rooms: savedRoom._id } })
        } catch (err) {
            next(err)
        }
        // After room has been created and if there is no error either in saving the room or updating the hotel data object/doc of that particular id then send res. saying alright its done
        res.status(200).json(savedRoom)
    } catch (err) {
        next(err)
    }
}

export const updateRoom = async (req, res, next) => {

    const roomId = req.params.id;
    try {
        try {
            // Get the updated Room from the DB by the req params and update it
            const updatedRoom = await Room.findByIdAndUpdate(
                roomId,
                { $set: req.body },
                { new: true }
            );
            res.status(200).json(updatedRoom)
        } catch (err) {
            next(err)
        }

    } catch (err) {
        next(err)
    }
}

export const deleteRoom = async (req, res, next) => {
    const hotelId = req.params.hotelid;
    try {
        await Room.findByIdAndDelete(req.params.id);
        try {
            await Hotel.findByIdAndUpdate(hotelId, {
                $pull: { rooms: req.params.id },
            });
        } catch (err) {
            next(err);
        }
        res.status(200).json("Room has been deleted.");
    } catch (err) {
        next(err);
    }
};
export const getRoom = async (req, res, next) => {
    try {
        const room = await Room.findById(req.params.id);
        res.status(200).json(room);
    } catch (err) {
        next(err)
    }
}

export const getRooms = async (req, res, next) => {
    try {
        const arrayOfRooms = await Room.find()
        res.status(200).json(arrayOfRooms);
    } catch (error) {
        // Send error to error handling middleware
        next(error)
        // rather than do this:
        // res.status(500).json(err);
    }
}
