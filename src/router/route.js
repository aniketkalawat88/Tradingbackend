const express = require("express");

const { PostPerformance, GetPerformance, UpdatePerformance, DeletePerformance } = require("../controllers/performance-controller");
const { PostRegister, PostLogin, GetUser, updateAmount, forgetPassword, getForgetPassword, PostResetPassword } = require("../controllers/user-controller");
const authMiddleware = require("../middlewares/auth-middleware");
const { PostCompetitor, GetCompetitor, deleteCompetitor } = require("../controllers/competitor-controller");
const { PostLive, GetLive, DeleteLive } = require("../controllers/liveaccount-controller");

const router = express.Router();

router.post("/topperformance" , PostPerformance)
router.get("/topperformance" , GetPerformance)
router.put("/topperformance/:id" , UpdatePerformance)
router.delete("/topperformance/:id" , DeletePerformance)

router.post("/register" , PostRegister)
router.post("/login" , PostLogin)
router.get("/user" , authMiddleware, GetUser )
router.post("/update-amount" , authMiddleware , updateAmount)
router.post("/forget-password"  , forgetPassword)
router.get("/forget-password/:id/:token"  , getForgetPassword)
router.post("/forget-password/:id/:token"  , PostResetPassword)


router.post("/competitor-data", PostCompetitor);
router.get("/competitor-data", GetCompetitor);
router.delete("/competitor-data/:id", deleteCompetitor);

router.post("/live-data",authMiddleware, PostLive)
router.get("/live-data", GetLive)
router.delete("/live-data/:id", DeleteLive)

module.exports = router;