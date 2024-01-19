import mongoose from "mongoose";

const RoomSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    capacity: {
        type: Number,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    roomNumbers: [{ number: Number, unavailableDates: [{ type: Date }] }]
},);

// [
//     {number: 102, unavailableDates: [01.05.2022, 02.05.2022]}
//     {number: 102, unavailableDates: [01.05.2022, 02.05.2022]}
//     {number: 102, unavailableDates: [01.05.2022, 02.05.2022]}
//     {number: 102, unavailableDates: [01.05.2022, 02.05.2022]}
// ]


export default mongoose.model("Room", RoomSchema);
