import User from "../models/User.js"

export const updateUser = async (req, res) => {
	try {
		const updatedUser = await User.findByIdAndUpdate(req.params.id, { $set: req.body}, { new: true})
		 res.status(200).json(updatedUser)
	} catch (error) {
		res.status(500).json(error)
	}
}

export const deleteUser = async (req, res) => {
	try {
		await User.findByIdAndDelete(req.params.id)
		 res.status(200).json("User has been deleted successfully!")
	} catch (error) {
		res.status(500).json(error)
	}
}

export const getUser = async (req, res) => {
	try {
		const user = await User.findById(req.params.id);
		res.status(200).json(user);
	} catch (error) {
		res.status(500).json(error);
	}
}

export const getUsers = async (req, res, next) => {
	console.log("Hi I'm printed when request is called inside User get all route")
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
		const arrayOfUsers = await User.find()
        for(var i = 0; i < arrayOfUsers.size;i++){
            const {password, ...otherDetails} = arrayOfUsers[i]._id;
        }
		res.status(200).json(arrayOfUsers);
	} catch (error) {
		// Send error to error handling middleware
		next(error)
		// res.status(500).json(err);
	}
}