import express from "express";
import authMiddleware from "../MiddleWare/authmiddleware.js";
import { addGoal, deleteGoal, getAllGoals, getGoalById, updateGoal } from "../Controllers/goal.controller.js";

const router = express.Router();

router.post("/addgoal", authMiddleware("user"), addGoal);
router.put("/edit/:goalId", authMiddleware("user"), updateGoal);
router.delete("/delete/:goalId", authMiddleware("user"), deleteGoal);
router.get("/getallgoals", authMiddleware("user"), getAllGoals);
router.get("/goals/:goalId", authMiddleware("user"), getGoalById);

export default router;
