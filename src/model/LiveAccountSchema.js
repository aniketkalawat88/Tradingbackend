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
    number:{
        type:Number,
        required:true,
    },
    amount:{
        type:Number,
        required:true,
    },
    trasitionid:{
        type:String,
        required:false
    },
    imageFront :{
        imageUrl: { type: String, required: false },
        cloudinaryId: { type: String, required: false }
    },
    imageBack: {
        imageUrl: { type: String, required: false },
        cloudinaryId: { type: String, required: false }
    },
    
})

const livemodal = mongoose.model("liveaccount", LiveSchema);

module.exports = livemodal;