const mongoose = require("mongoose");

const CompetitorSchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    data:{
        type:String,
        required:true,
    },
    range:{
        type:Number,
        required:true,
    }
})

const competitormodal = mongoose.model("competitor", CompetitorSchema);

module.exports = competitormodal;