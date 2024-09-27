const mongoose = require("mongoose");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const UserSchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    number:{
        type:Number,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        enum: ['admin', 'user'],
        default:"user",
    },
    amount:{
        type:Number,
        default : 0
    }
})


// password hash
UserSchema.pre("save" , async function(next){
    try{
        if(this.isModified("password")){
            const hash_password = await bcrypt.hash(this.password , 10)
            this.password = hash_password
        }
        next()
    }
    catch(err){
        res.status(404).json({message : "error fetching data", error : err })
    }
})


// token send
UserSchema.methods.generateToken = async function(){
    try{
        return jwt.sign(
            {
                userId: this._id.toString(),
                email:this.email
            },
            "thisIsLoginAndRegisteratiionKey",
            {
                expiresIn: "1h"
            }
        )
    }catch(e){
        console.log("error from token");
        
    }
}




const UserModal = mongoose.model("User", UserSchema)

module.exports = UserModal;