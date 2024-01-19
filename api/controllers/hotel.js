import Hotel from "../models/Hotel.js"

export const createHotel = async (req, res, next) => {
	const newHotel = new Hotel(req.body)

	try {
		 const savedHotel = await newHotel.save()
		 res.status(200).json(savedHotel)
	} catch (error) {
		res.status(500).json(error)
	}
}

export const updateHotel = async (req, res) => {
	try {
		const updatedHotel = await Hotel.findByIdAndUpdate(req.params.id, { $set: req.body}, { new: true})
		 res.status(200).json(updatedHotel)
	} catch (error) {
		res.status(500).json(error)
	}
}

export const deleteHotel = async (req, res) => {
	try {
		await Hotel.findByIdAndDelete(req.params.id)
		 res.status(200).json("Hotel has been deleted successfully!")
	} catch (error) {
		res.status(500).json(error)
	}
}

export const getHotel = async (req, res) => {
	try {
		const hotel = await Hotel.findById(req.params.id);
		res.status(200).json(hotel);
	} catch (error) {
		res.status(500).json(error);
	}
}

export const getHotels = async (req, res, next) => {
	console.log("Hi I'm printed when request is called inside hotel get all route")
	// const failed = true // made for learning purposes to simulate a task which failed
	// const err = new Error()
	// err.status = 404
	// err.message = "Sorry not found"
	// if(failed)	return next(createError(401, "LOL"))
	// next()
	// return next()
	// setTimeout(() => {
	// 	console.log("Hi I'm printed when middleware is finished")
	// }, 5000);

	try {
		const arrayOfHotels = await Hotel.find()
		res.status(200).json(arrayOfHotels);
	} catch (error) {
		// Send error to error handling middleware
		next(error)
		// res.status(500).json(err);
	}
}