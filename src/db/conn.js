const mongoose = require("mongoose")

mongoose.connect("mongodb://localhost:27017/TradingAccount")
.then(() => {
    console.log("db connected succesfully")
})
.catch((err) => {
    console.log("database error " , err)
})