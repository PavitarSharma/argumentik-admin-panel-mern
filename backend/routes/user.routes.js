import express from "express";
import {logout, signIn, signUp } from "../controllers/user.controller.js";

const router = express.Router();

router.post("/register", signUp);
router.post("/login", signIn);
router.post("/logout", logout);
export default router;
