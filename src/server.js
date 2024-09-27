const express = require("express");
const dotenv = require("dotenv")
const cors = require("cors"); 
const app = express();
const cookieParser = require("cookie-parser");

dotenv.config()
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


const PORT = process.env.PORT;
const routerData = require("./router/route")
require("./db/conn")


app.use(cors({
    origin: "https://tradingbackend-1.onrender.com/api/topperformance",
    methods:["GET","POST","PATCH","DELETE","PUT"],
    credentials: true,
}));


app.use(cookieParser());
app.use("/api" , routerData)

app.use("*", (req, res) => {
    return res.status(404).json({msg:"Page not found"});
});

app.listen(PORT , () => {
    console.log(`server is running on port no ${PORT}`);
})
