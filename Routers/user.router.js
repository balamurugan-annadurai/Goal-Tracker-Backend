import express from "express";
import { accountActivation,changePassword,  forgotPassword, getUserDetails, login, register, verifyString } from "../Controllers/user.controller.js";
import authMiddleware from './../MiddleWare/authmiddleware.js';

const router = express.Router(); // Create a new router object using Express

// Define routes
router.post("/register", register);
router.post("/login", login);
router.post("/forgotpassword", forgotPassword);
router.post("/verifystring", verifyString);
router.post("/changepassword", changePassword);

router.get("/activateaccount", authMiddleware("user"), accountActivation);
router.get("/profile", authMiddleware("user"), getUserDetails); // Protected route with authentication middleware



export default router;
