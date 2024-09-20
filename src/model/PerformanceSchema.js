const mongoose = require("mongoose");

const PerformanceSchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    }
});

const performancemodel = mongoose.model("topperformance" , PerformanceSchema);

module.exports = performancemodel;