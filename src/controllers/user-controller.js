const UserController = require("../model/UserSchema");
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken');


const PostRegister = async (req , res) => {
    const { name , email , number , password} = req.body;
    const exisitngUser = await UserController.findOne({email : email});
    if(exisitngUser){
        return res.status(400).send("user already exist")
    }
    try{
        const isRegister = await UserController.create({
            name:name,
            email:email,
            number:number,
            password : password
        })
        res.status(201).json({message:"User Created Succesfully" , data : isRegister})
    }
    catch(err){
        res.status(404).json({message:"Error creating user" , Error : err})
    }
}

const PostLogin = async (req ,res) => {
    try{
        const { email , password } = req.body;
        const isValid = await UserController.findOne({email : email});
        if(!isValid){
            return res.status(400).send("User not found")
        }
        const isPassWord = await bcrypt.compare(password , isValid.password )
        if(isPassWord){
            res.status(200).json({message:"Succesfull login" , token : await isValid.generateToken()})
        }
        else{
            res.status(401).json({message:"invalid credential"})
        }
    }
    catch(err){
        console.log(err, "error hai")
        res.status(404).json({ message:"Error creating user" , Error : err })
    }
}

const GetUser = async (req ,res) => {
    try{
        res.status(200).json({message:"get user hai"})
    }
    catch(e){
        res.status(401).json({message:"Error fetching User data"})
    }
}

module.exports = { PostRegister , PostLogin , GetUser }