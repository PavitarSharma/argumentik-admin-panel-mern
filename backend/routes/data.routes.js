import express from "express";
import { createData, getAllData } from "../controllers/data.controller.js";

import { authorizeRoles, auth } from "../middlewares/auth.js";
const router = express.Router();

router.get("/", auth, authorizeRoles("admin"), getAllData);

router.post("/add", auth, createData);

export default router;
