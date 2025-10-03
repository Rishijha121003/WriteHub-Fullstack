// backend/routes/user.routes.js
import express from "express";
import {login, logout, register } from "../controller/user.controller.js";

const router = express.Router()

router.route("/signup").post(register); // <-- Yahan change kiya hai
router.route("/login").post(login);
router.route("/logout").post(logout) // Ise bhi POST kar dena for best practice

export default router