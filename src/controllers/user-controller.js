const UserController = require("../model/UserSchema");
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken');

const SECRET_KEY = "NOTESAPI"


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
        
        const token = jwt.sign({email : isRegister.email , id :isRegister._id} , SECRET_KEY)
        res.status(201).json({message:"User Created Succesfully" , val: isRegister, token:token})
    }
    catch(err){
        return res.status(404).json({message:"Error creating user" , Error : err})
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
        if(!isPassWord){
            return res.status(401).json({message:"invalid credential"})
        }
        const token = jwt.sign({email : isValid.email , id :isValid._id} , SECRET_KEY)
        res.status(201).json({user:isValid , token : token});
        
    }
    catch(err){
        console.log(err, "error hai")
        res.status(404).json({ message:"Error creating user" , Error : err })
    }
}

const GetUser = async (req ,res) => {
    try{
        const exisitngUser = await UserController.findById(req.user);
        res.status(200).json({message:"get user hai" , user : exisitngUser})
        
    }
    catch(e){
        res.status(401).json({message:"Error fetching User data"})
    }
}

const updateAmount = async (req ,res) => {
    const { amount } = req.body;
    try{
        const user = await UserController.findById(req.user);
        console.log(user, "1234567")
        user.amount += amount;
        await user.save();
        res.json({ message: 'Amount updated successfully', user });
    }
    catch(err){
        return res.status(500).json({message: 'error update amount' , error: err.message });
    }
}

module.exports = { PostRegister , PostLogin , GetUser , updateAmount }