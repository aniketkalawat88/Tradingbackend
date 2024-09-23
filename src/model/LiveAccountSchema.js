const mongoose = require("mongoose");

const LiveSchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    idcard:{
        type:String,
        required:true,
    },
    amount:{
        type:Number,
        required:true,
    }
})

const livemodal = mongoose.model("liveaccount", LiveSchema);

module.exports = livemodal;