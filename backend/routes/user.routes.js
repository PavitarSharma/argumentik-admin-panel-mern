import express from "express";
import {getAllUsers, logout, signIn, signUp, updateprofile, updateUserRole } from "../controllers/user.controller.js";
import { auth, authorizeRoles } from "../middlewares/auth.js";

const router = express.Router();

router.post("/register", signUp);
router.post("/login", signIn);
router.post("/logout", logout);

router.get("/",auth, authorizeRoles("admin"), getAllUsers);

router.put("/:id", auth, authorizeRoles("admin"), updateUserRole);


router.put("/profile/:id", auth, updateprofile);
export default router;
