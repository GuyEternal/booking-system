import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import authRoute from "./routes/auth.js";// For importing libraries you don't need extension, but when you are using express specify the extension if you are importing a file or a route
import roomsRoute from "./routes/rooms.js"
import usersRoute from "./routes/users.js"
import hotelsRoute from "./routes/hotels.js"
// const express = require("express"); <-- You can use this too but if you dont want to then you can add: "type": "module", to the package.json file of the project.

const app = express()

dotenv.config()
// Initial Connection to database
const connect = async () => {
	try {
		await mongoose.connect(process.env.MONGO);
		console.log("Connected to MongoDB.");
	} catch (error) {
		throw error
	}
}
mongoose.connection.on("disconnected", () => {
	console.log("MongoDB disconnected!");
})
// mongoose.connection.on("connected", () => {
// 	console.log("MongoDB connected!");
// })
// The actual APIs
// We cant write all out APIs or request files in index.js so we create one more folder named routes
// app.get("/", (req, res) => {
// 	// res.json() OR res.send()
// 	res.send("Hello First Request ak result")
// })
// Middlewares (below):
// Use middleware for JSON
// app.use((req, res, next) => {
// 	// res.send("Response lol")
// 	console.log("Hi This is middleware 1")

// });
// Middlewares
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/auth", authRoute);
app.use("/api/hotels", hotelsRoute);
app.use("/api/rooms", roomsRoute);
app.use("/api/users", usersRoute);



app.use((err, req,
	res, next) => {
	// console.log("Hello from error handling middleware:\n")
	// console.log(err + '\n')
	const errorStatus = err.status || 500
	const errorMessage = err.message || "Some shit went wrong!"
	return res.status(500).json({
		success: false,
		status: errorStatus,
		message: errorMessage,
		stack: err.stack,
	})
})

app.listen(8800, () => {
	connect()
	console.log("Connected to backend");
})
