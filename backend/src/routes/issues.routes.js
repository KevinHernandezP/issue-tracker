import express from "express";
import { getIssues, createIssue } from "../controllers/issues.controller.js";
import { verifyToken } from "../middleware/auth.middleware.js";

const router = express.Router();
router.get("/", verifyToken, getIssues);
router.post("/", verifyToken, createIssue);

export default router;