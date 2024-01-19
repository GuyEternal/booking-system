import express from "express";
import Hotel from "../models/Hotel.js"
import { createError } from "../utils/error.js";
import { createHotel, deleteHotel, getHotel, getHotels, updateHotel } from "../controllers/hotel.js";
import { verifyAdmin } from "../utils/verify.js";
const router = express.Router();

//CREATE
// post since we're creating [async bcoz creating a hotel will take up async time]
router.post("/", verifyAdmin, createHotel)
// UPDATE
router.put("/:id", verifyAdmin, updateHotel)
// DELETE
router.delete("/:id", verifyAdmin, deleteHotel)
// GET
router.get("/:id", getHotel)
// GET ALL
router.get("/", verifyAdmin, getHotels)

export default router;