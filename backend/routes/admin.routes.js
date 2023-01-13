import express from "express";
import { getAllUsers, updateprofile, updateUserRole } from "../controllers/user.controller.js";
import { authorizeRoles, auth } from "../middlewares/auth.js";
const router = express.Router();

router.get("/users",auth, authorizeRoles("admin"), getAllUsers);

router.put("/users/:id", auth, authorizeRoles("admin"), updateUserRole);


router.put("/users/profile/:id", auth, authorizeRoles("admin"), updateprofile);

export default router;
