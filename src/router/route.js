const express = require("express");
const { PostPerformance, GetPerformance, UpdatePerformance, DeletePerformance } = require("../controllers/performance-controller");
const { PostRegister, PostLogin, GetUser } = require("../controllers/user-controller");

const router = express.Router();

router.post("/topperformance" , PostPerformance)
router.get("/topperformance" , GetPerformance)
router.put("/topperformance/:id" , UpdatePerformance)
router.delete("/topperformance/:id" , DeletePerformance)

router.post("/register" , PostRegister)
router.post("/login" , PostLogin)
router.get("/user" , GetUser )

module.exports = router