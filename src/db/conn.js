const mongoose = require("mongoose")

mongoose.connect("mongodb+srv://aniketkalawat88:Q5Z7NjX6cHLCUWNV@cluster0.go7bz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
.then(() => {
    console.log("db connected succesfully")
})
.catch((err) => {
    console.log("database error " , err)
})
