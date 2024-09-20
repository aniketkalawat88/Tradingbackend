const jwt = require("jsonwebtoken");
const user = require("../model/UserSchema");

const authMiddleware = async ( req ,res) => {
    const token = req.header("Authorization");
    // const jwtToken = token
}