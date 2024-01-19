import User from "../models/User.js";
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";
import { createError } from "../utils/error.js";

export const register = async (req, res, next) => {
	try {
		var salt = bcrypt.genSaltSync(10);
		var hash = bcrypt.hashSync(req.body.password, salt);
		const newUser = new User({
			username: req.body.username,
			email: req.body.email,
			password: hash
			// isAdmin: req.body.isAdmin ----> DOn't give such options even for updating details like this in the body or ppl can misuse it
		})

		await newUser.save(); // save() is a method for mongoose.Schema() which is made in ../models/User.js
		res.status(200).send("User has been created.")
	} catch (error) {
		next(error)
	}
}

export const login = async (req, res, next) => {
	try {
		var currUser = await User.findOne({ username: req.body.username })
		var hash;
		if (currUser != null) {
			hash = currUser.password
		} else {
			var newError = createError(401, "Invalid User Credentials. Please check your email and username and try again!")
			return next(newError)
		}
		bcrypt.compare(req.body.password, hash, async (err, correct) => {
			if (!correct) {
				console.log("NNAAAAAAAAAAAAAAAAAAAAAA");
				next(createError(401, "!!Invalid Password!!"))
			}
			const token = jwt.sign({ id: currUser._id, isAdmin: currUser.isAdmin }, process.env.JWT);
			console.log("login successful pls redirect");
			// Redirect to appropriate dashboard or home page when login is successful
			const { password, isAdmin, ...otherDetails } = currUser._doc
			res
				.cookie("access_token", token, {
					httpOnly: true,
				})
				.status(200)
				.json({ details: { ...otherDetails }, isAdmin });
		});

	} catch (error) {
		next(error)
	}
}