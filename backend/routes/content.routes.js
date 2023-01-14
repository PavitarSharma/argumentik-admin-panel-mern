import express from "express";
import { createContentData, getAllContentData } from "../controllers/content.controller.js";


import { authorizeRoles, auth } from "../middlewares/auth.js";
const router = express.Router();

router.get("/", auth, getAllContentData);

router.post("/add", auth,authorizeRoles("admin"), createContentData);

export default router;
