const express = require("express");

const { PostPerformance, GetPerformance, UpdatePerformance, DeletePerformance } = require("../controllers/performance-controller");
const { PostRegister, PostLogin, GetUser, updateAmount } = require("../controllers/user-controller");
const authMiddleware = require("../middlewares/auth-middleware");

const router = express.Router();

router.post("/topperformance" , PostPerformance)
router.get("/topperformance" , GetPerformance)
router.put("/topperformance/:id" , UpdatePerformance)
router.delete("/topperformance/:id" , DeletePerformance)

router.post("/register" , PostRegister)
router.post("/login",authMiddleware , PostLogin)
router.get("/user" , authMiddleware, GetUser )
router.post("/update-amount" , authMiddleware , updateAmount)

module.exports = router;
