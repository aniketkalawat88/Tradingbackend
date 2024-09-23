const UserController = require("../model/UserSchema");
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken');
const nodemailer = require("nodemailer")
const cookie = require("cookie-parser")

const SECRET_KEY = process.env.JWT_SECRET_KEY


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

const forgetPassword = async (req ,res) => {
    const {email } = req.body;
    try{
        const oldUser = await UserController.findOne({email : email });
        if(!oldUser){
            return res.status(400).json({message : "User Not Exist"})
        }
        const secret = SECRET_KEY + oldUser.password;
        const token = jwt.sign({email : oldUser.email ,id: oldUser._id} , secret, {
            expiresIn:'5m'
        })

        const link = `http://localhost:8000/api/forget-password/${oldUser._id}/${token}`
        // console.log(link)
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: process.env.MAIL_EMAIL_ADDRESS,
              pass: process.env.MAIL_EMAIL_PASSWORD
            }
          });
          
          var mailOptions = {
            from: 'youremail@gmail.com',
            to: 'aniketkalawat100@gmail.com',
            subject: 'Password reset',
            text: link
          };
          
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
          });

        res.send("done")

    }catch(e){
        return res.status(500).json({message: 'error update amount' , error: err.message });   
    }
}

const getForgetPassword = async ( req ,res) => {
   try{
    const {id , token} = req.params;
    console.log(req.params)
    const oldUser = await UserController.findOne({ _id : id});
    if(!oldUser){
        return res.status(400).json({message : "User Not Exist"})
    }
    const secret = SECRET_KEY + oldUser.password;
    try{
        const verify = jwt.verify(token , secret)
        res.send("verified")
    }
    catch(err){
        res.send("Not Verifid")
    }
    res.send(req.params)
   }
   catch(err){
    return res.send(err)
   }
}

const PostResetPassword = async ( req ,res) => {
   try{
    const {id , token} = req.params;
    const { password } = req.body;

    const oldUser = await UserController.findOne({ _id : id});
    if(!oldUser){
        return res.status(400).json({message : "User Not Exist"})
    }
    const secret = SECRET_KEY + oldUser.password;
    try{
        const verify = jwt.verify(token , secret)
        const encrypt =  await bcrypt.hash(password , 10)
        await UserController.updateOne({
            _id : id
        },
        {
            $set : {
                password : encrypt
            }
        }
    )
    res.json({status : "Password Updated Succesfully"})
    res.render({email: verify.email , status:"verified"})
    }
    catch(err){
        res.send({status : "Something went wrong"})
    }
    res.send(req.params)
   }
   catch(err){
    return res.send(err)
   }
}



module.exports = { PostRegister , PostLogin , GetUser , updateAmount , forgetPassword , getForgetPassword , PostResetPassword }