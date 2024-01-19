import express from "express";
import { deleteUser, getUser, getUsers, updateUser } from "../controllers/user.js";
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verify.js";

const router = express.Router();

// router.get('/checkAuth', verifyToken, (req, res, next) => {
//     res.send("Hello User u are logged in >>>")
// })

// router.get('/checkuser/:id', verifyUser, (req, res, next) => {
//     res.send("Hello User u are logged in >>> and u can delete your account")
// })

// router.get('/checkadmin/:id', verifyAdmin, (req, res, next) => {
//     // res.send("Hello Admin bro u are logged in >>> and u can delete any account")
//     console.log("HOIIIOII")
// })

router.put("/:id", verifyUser, updateUser)

router.delete("/:id", verifyUser, deleteUser)
router.get("/:id", verifyUser, getUser)

router.get("/", verifyAdmin, getUsers)


export default router;