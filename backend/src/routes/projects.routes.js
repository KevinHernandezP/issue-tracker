import express from "express";
import { getProjects } from "../controllers/projects.controller.js";
import { verifyToken } from "../middleware/auth.middleware.js";

const router = express.Router();
router.get("/", verifyToken,  getProjects);

export default router;
