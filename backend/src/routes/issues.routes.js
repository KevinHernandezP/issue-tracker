import express from "express";
import { getIssues, createIssue } from "../controllers/issues.controller.js";
import { verifyToken } from "../middleware/auth.middleware.js";
import { validateIssue } from "../middleware/validateIssue.middleware.js";

const router = express.Router();

router.get("/:projectId", verifyToken, getIssues);
router.post("/:projectId", verifyToken,validateIssue, createIssue);

export default router;